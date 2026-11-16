# 帽子云部署与排障

> 适用于从 Gitee / GitHub 拉取源码、以**静态网站**方式发布到 CDN 的场景。
> 与 `edgeone.json`（腾讯云 EdgeOne Makers）**互不相干**：帽子云不读取该文件，输出目录只能在控制台「构建设置」里改。
> 最近一次修复：2026-11-16，官网 v1.2.1。

---

## 1. 故障日志关键行

```
| outputDir      | build                 |
| framework      | none                  |
...
#10 5.170 Copied web/dist -> root dist/
#11 [output 1/1] COPY --from=build /src//build /
#11 ERROR: "/src/build": not found
Failed to build image: ... "/src/build": not found
```

## 2. 根因

| 项 | 值 | 说明 |
| --- | --- | --- |
| 平台识别的框架 | `none` | 根 `package.json` 里没有 vite 依赖（vite 在 `web/` 子目录），平台没识别出 Vite |
| 平台默认输出目录 | `build` | Create React App 的默认值 |
| 本站真实产物目录 | `dist/` | Vite 输出 `web/dist`，构建脚本复制到根 `dist/` |
| 平台执行 | `COPY --from=build /src/build /` | 目录不存在 ⇒ 构建失败 |

日志中的 `nas-music-tv-website@1.0.5` / `web@1.1.0` 还说明：**平台拉到的是旧提交**（当时 1.2.0 改版尚未推送到该仓库）。

> 帽子云官方口径（[构建设置](https://maoziyun.com/docs/deploy/env-vars)）：静态网站「输出目录」常见取值为 **Vite/Vue: `dist`；Create React App: `build`；Next.js 静态导出: `out`**。本项目属第一种。

## 3. 修复（两层，建议都做）

### 第一层：控制台把输出目录改成 `dist`（正确做法）

1. 打开应用详情页 → **构建设置** 标签页。
2. 「静态网站 → 输出目录」由 `build` 改为 **`dist`**。
3. 构建命令保持 `npm run build`，根目录留空（不要填 `web`，否则产物路径会错位）。
4. 保存后**必须重新部署**：详情页右上角 **部署** → 选分支 → **立即部署**（改设置不会自动重跑）。

### 第二层：仓库侧兼容（已落地，防止配置遗漏）

根 `package.json` 的 `build` 拆成两步：

```json
"build": "npm run build:web && npm run build:sync",
"build:web": "cd web && npm run build",
"build:sync": "node scripts/sync-build-dir.cjs"
```

`scripts/sync-build-dir.cjs` 把根 `dist/` 完整复制一份到 `build/`。因此**即使平台仍按 `framework=none` 默认选 `build`，`COPY --from=build /src/build /` 也能命中**。

- `dist/` 是唯一权威产物，`build/` 是纯副本，内容逐字节一致。
- 两者均在 `.gitignore` 中，不会进仓库；`.dockerignore` 也已排除，避免本地残留被拷进构建上下文。
- 代价：多一份约 29 MB 的副本、约 48 个文件，仍远低于任何平台的文件数上限。

### 前提：把新提交推送到平台拉取的仓库

帽子云只认它绑定的仓库分支。本地提交 `709bf2b`（v1.2.0）与本次 v1.2.1 若未推送，云端仍会构建旧代码。

```bash
# 推送到 Gitee（清空坏代理）
env -u http_proxy -u https_proxy -u HTTP_PROXY -u HTTPS_PROXY \
  git -c http.proxy= -c https.proxy= push gitee main
```

## 4. 验收清单

| 检查项 | 期望值 |
| --- | --- |
| 构建日志 BUILD PLAN 的 `outputDir` | `dist`（或 `build`，两者现在都有产物） |
| 构建日志出现 | `[compat] dist/ -> build/ (48 files)` |
| 构建日志出现 | `Copied web/dist -> root dist/` |
| `COPY --from=build` | 成功，不再报 `"/src/build": not found` |
| 产物文件数 | 48 / 约 28.8 MB / 最大单文件 < 2 MB |
| `dist/download/` | 不存在（APK 走百度网盘，避免 25 MiB 单文件限制） |

本地复核：

```bash
npm run build
ls dist/index.html build/index.html
```

## 5. 两个平台别混淆

| 平台 | 配置位置 | 输出目录字段 | 仓库内配置 |
| --- | --- | --- | --- |
| 帽子云 | 控制台「构建设置」 | 输出目录 | ❌ 不支持，靠 `scripts/sync-build-dir.cjs` 兜底 |
| 腾讯云 EdgeOne Makers | 控制台「项目设置 → 构建部署配置」 | 输出目录 | ✅ `edgeone.json` 的 `outputDirectory` |

## 6. 待验证：SPA 深链

本站用 `react-router-dom` 的 history 模式，`/download`、`/features` 等深链需要服务端回退到 `index.html`。

- EdgeOne Makers 已通过 `edgeone.json` 的 `rewrites: /* → /index.html` 解决。
- 帽子云文档未说明静态网站是否提供 SPA 回退。若直接访问深链 404，需在平台侧配置回退规则或联系平台支持；首页与站内跳转不受影响。

## 7. 常见错误对照

| 报错 | 原因 | 处理 |
| --- | --- | --- |
| `"/src/build": not found` | outputDir=build 但产物在 dist | 控制台改 `dist`，或依赖 `build/` 兼容副本 |
| `Output directory build does not exist!` | 同上（EdgeOne 的措辞） | 改 `./dist` |
| 构建成功但页面 404 | 上传目录根缺 `index.html` | 确认输出目录指向 `dist` / `build`，不是仓库根 |
| 部署后仍是旧页面 | 改了设置但未重新部署 / 代码未推送 | 保存设置后点「立即部署」；确认分支已推送 |
| `File count exceeds ... 20,000` | 输出目录设成仓库根，node_modules 被计入 | 见 `docs/EDGEONE-DEPLOY.md` |
