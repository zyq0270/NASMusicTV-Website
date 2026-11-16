# 腾讯云 EdgeOne Makers 部署与排障

> 适用于从 **Gitee `hxzhang2000/NASMusicTV-Website`** 拉取源码、在 EdgeOne Makers 构建并发布静态站点的场景。
> 最近一次修复：2026-11-16，官网 v1.2.0。

---

## 1. 故障原文

```
12:26:09.038 Checking output
12:26:09.452 Error: File count exceeds the per-build limit: 20,127 files found, maximum 20,000. Reduce the number of files in the build output and redeploy.
12:26:09.612 Build error
```

## 2. 根因：统计的是「构建输出」，而输出目录被设成了项目根目录

平台限制（官方排障指南）：

| 限制项 | 阈值 |
| --- | --- |
| 单次构建产物文件数 | 20,000 |
| 单文件体积 | 25 MiB |
| 账户总存储 | 5 GiB |

本项目目录（不含 `.git`）共 **20,209 个文件**，构成如下：

| 分类 | 文件数 | 体积 | 是否进 git | 处置 |
| --- | ---: | ---: | --- | --- |
| `web/node_modules/` | 19,955 | 149 MB | ❌ 已忽略 | 云端 `npm install` 会重新生成，删本地无用 |
| `dist/`（最终产物） | 49 | 53 MB | ❌ 已忽略 | EdgeOne 唯一应上传的目录 |
| `web/dist/`（中间产物） | 49 | 53 MB | ❌ 已忽略 | 与根 `dist/` 重复 |
| `docs/snapshot/` | 25 | 21 MB | ✅ | 快照原图备份，保留 |
| `web/public/effects/` | 25 | 21 MB | ✅ | 站点特效图，保留 |
| `web/public/screens/` | 19 | 6.7 MB | ✅ | 站点截图，保留 |
| 源码 / 文档 / 配置 | 77 | 1.6 MB | ✅ | 必需 |
| `download/` 旧 APK | 1 | 24.5 MB | 已从索引移除 | 改用网盘分发 |
| AI 工具缓存 | 9 | 1 MB | ❌ 已忽略 | 可清理 |

**git 实际只跟踪 148 个文件**。云端 `clone(148) + npm install(≈19,955) + build(49) ≈ 20,152`，与报错 20,127 吻合——即平台把**含 node_modules 的整个工作目录**当成了构建输出。

> ⚠️ 结论：**删本地 `node_modules` 治标不治本**，云端每次构建都会重新生成。必须改「输出目录」，并让构建结束后的工作目录也保持精简。

## 3. 三层修复（已落地）

### 第一层：`edgeone.json` 指定输出目录

```json
{
  "installCommand": "npm install",
  "buildCommand": "npm run build && node -e \"const fs=require('fs');['node_modules','web/node_modules'].forEach(d=>fs.rmSync(d,{recursive:true,force:true}))\"",
  "outputDirectory": "./dist",
  "nodeVersion": "20.18.0",
  "rewrites": [{ "source": "/*", "destination": "/index.html" }]
}
```

- `outputDirectory: "./dist"` 覆盖控制台配置，只上传 48 个产物文件。
- `rewrites` 是官方识别的 SPA fallback 精确写法：仅在未命中静态资源 / 函数时回退 `/index.html`，深链不再 404。
- `headers` 给 `/assets/`、`/effects/`、`/screens/` 设置缓存策略。

### 第二层：构建命令末尾清理依赖

即便平台按整个工作目录统计，构建完成后 `node_modules` 已被删除，工作目录只剩约 **200 个文件**（148 源码 + 48 产物），远低于 20,000。清理用 Node `fs.rmSync` 而非 `rm -rf`，兼容 Windows / Linux。

### 第三层：移除超限大文件

- v2.39.18 APK 为 **43 MB > 25 MiB**，改由百度网盘分享，不再随站点发布。
- `vite.config.ts` 的 APK 插件默认不拷贝，仅 `INCLUDE_APK=1` 时供自建 NAS / Docker 使用。
- `download/NASMusicTV-release-v2-38-15.apk`（24.5 MB）从 git 索引移除，本地文件保留不删。
- `.gitignore` 补齐 `web/dist/`、`dist/`、`download/*.apk`、`.codegraph/`、`.claude/`、`.workbuddy-ai/`。

## 4. 控制台操作步骤

1. **项目设置 → 构建部署配置**
   - 安装命令：`npm install`
   - 构建命令：`npm run build && node -e "const fs=require('fs');['node_modules','web/node_modules'].forEach(d=>fs.rmSync(d,{recursive:true,force:true}))"`
   - **输出目录：`./dist`** ← 本次故障的直接修复点
   - Node 版本：`20.18.0`
2. **代码源**：Gitee → `hxzhang2000/NASMusicTV-Website`，分支 `main`。
3. 保存后重新部署，观察构建日志是否出现 `[edgeone] build deps cleaned` 与 `Copied web/dist -> root dist/`。
4. 部署完成后验证深链：`/download`、`/features`、`/screens`、`/effects`、`/about` 直接访问应正常渲染。

> `edgeone.json` 会覆盖控制台同名配置；若控制台改过值，以仓库文件为准（建议两处保持一致）。

## 5. 验收清单

| 检查项 | 期望值 |
| --- | --- |
| `dist/` 文件数 | 48 |
| `dist/` 总体积 | 约 28.8 MB |
| 最大单文件 | < 2 MB（远低于 25 MiB） |
| `dist/download/` | 不存在（APK 不随站点发布） |
| 深链 | `/download` 等直接访问返回 `index.html` 并正常渲染 |
| 中英切换 | `?lang=en` / `?lang=zh` 生效 |

本地复核：

```bash
cd web && npm run build && npm run smoke
cd .. && find dist -type f | wc -l
```

## 6. 常见错误对照

| 报错 | 原因 | 处理 |
| --- | --- | --- |
| `File count exceeds ... maximum 20,000` | 输出目录设成根目录 / 留空，node_modules 被计入 | 设 `./dist`，并检查 buildCommand 的清理段 |
| `File size limit exceeded ... 25 MiB` | 产物含 APK 等大文件 | 移出产物，改外链；默认构建已不拷贝 APK |
| `Output directory build does not exist!` | 输出目录写错（如 `build/`） | 改为 `./dist` |
| 直接上传后页面 404 | 上传目录根缺 `index.html` | 上传 `dist/` 整个目录，不要传仓库根 |
| 深链 404 | 缺 SPA fallback | 保留 `rewrites` 的 `/* → /index.html` |
| `The account storage limit is 5 GiB` | 历史部署记录堆积 | 在控制台删除旧部署记录 |

## 7. 可选：本地清理建议（不影响云端）

以下命令**只删可再生的产物 / 缓存**，不会动源码。执行前请确认无需离线预览：

```bash
# 可再生的构建产物（下次 npm run build 自动重建）
rm -rf web/dist dist

# AI 工具缓存
rm -rf .codegraph .claude .workbuddy-ai
```

`web/node_modules/` 是本地开发依赖，**不建议删除**（删后需 `npm install` 重装）；它不影响云端，因为已通过 `outputDirectory` 与构建后清理双重隔离。
