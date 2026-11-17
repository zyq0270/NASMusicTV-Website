# NASMusicTV-Website

NAS Music TV 的**官方网站**（落地页）。纯前端单页站点，介绍这款开源的 Android 多源音乐播放器（电视 / 手机 / 平板通用）：聚合 NAS、网络音乐、百度网盘与 Jamendo 多音乐源，支持逐字卡拉OK歌词、K 歌伴奏、MTV、天气电台、27 套公开可视化特效（图集展示 29 张，含 2 套版权未公开快照）与照片墙 70 种转场。

> 本仓库只托管**官网前端**。Android 应用本体在 [hxzhang2000/NASMusicTV](https://github.com/hxzhang2000/NASMusicTV)（Gitee 镜像：[hxzhang2000/NASMusicTV](https://gitee.com/hxzhang2000/NASMusicTV)）。最新版 APK 通过**百度网盘分享**分发，不随站点产物发布。

[![Release](https://img.shields.io/github/v/release/hxzhang2000/NASMusicTV?color=blue&label=App%20Release)](https://github.com/hxzhang2000/NASMusicTV/releases)
[![Website](https://img.shields.io/badge/website-repo-00d4aa?logo=github)](https://github.com/hxzhang2000/NASMusicTV-Website)
[![Gitee](https://img.shields.io/badge/Gitee-NASMusicTV--Website-red?logo=gitee)](https://gitee.com/hxzhang2000/NASMusicTV-Website)

---

## 当前同步状态

| 对象 | 版本 | 日期 | 说明 |
| --- | --- | --- | --- |
| 官网 | v1.3.0 | 2026-11-17 | 性能 / SEO / 可访问性与明暗主题切换优化 |
| Android 应用 | v2.39.18（versionCode 203） | 2026-11-10 | 跨 v2.38.15 → v2.39.18 共 19 个版本 |
| 可视化特效 | 公开版可选 27 套 | — | 图集展示 29 张：27 套公开 + 2 套（像素城市 / 旷野公路）因版权未公开，仅展示快照 |
| 照片墙转场 | 70 种 | — | 新增 33 种，下线 6 个故障效果 |

---

## 技术栈

- **构建**：Vite 5 + TypeScript 5
- **框架**：React 18
- **UI**：Ant Design 5（强制深色主题 `theme.darkAlgorithm`）+ `@ant-design/icons`
- **路由**：`react-router-dom`（`createBrowserRouter` + `RouterProvider`）
- **部署**：腾讯云 EdgeOne Makers（Gitee 源）/ GitHub Pages / 多阶段 Docker（Node 20 → nginx 1.27）

整个网站**不依赖任何后端**：界面截图通过 `index.json` 清单加载，缺失时自动渲染 CSS 空帧占位。

---

## 功能特性（站点本身）

- **6 个路由页**：首页（Hero、统计、What's new、Highlights、功能模块、TV 界面 mockup、CTA）、功能特性、界面预览、特效图集、下载安装、关于项目。
- **v2.39 What's new 区块**：首页新增六卡网格，集中呈现新特效、照片墙转场、浅色主题、洛雪音源、电视实测修复与两轮全库审查。
- **中英双语 + 界面语言切换**：文案集中在 `web/src/i18n/locales/`（tsc 强制两种语言键齐全），顶栏「中 / EN」即时切换并 `localStorage` 持久化；`?lang=en` / `?lang=zh` 分享直达。
- **深色沉浸设计系统**：青绿品牌色 `#00D4AA`、等宽大字统计、卡片悬浮焦点态。
- **纯 CSS 界面 mockup + 内联 SVG 图标**：首屏零图片与零图标字体请求。
- **响应式 + 可访问性**：桌面 / 平板 / 手机三档断点，`prefers-reduced-motion` 全站兜底，键盘 `:focus-visible` 描边。

---

## 目录结构

```
NASMusicTV-Website/
├── edgeone.json              # 腾讯云 EdgeOne Makers 构建配置（输出目录 / SPA 回退 / 缓存头）
├── docs/
│   ├── EDGEONE-DEPLOY.md     # 腾讯云 EdgeOne Makers 部署与排障
│   └── MAOZIYUN-DEPLOY.md    # 帽子云部署与排障
├── Dockerfile                # 多阶段构建：web 构建 → nginx 托管
├── docker-compose.yml        # web 服务编排（部署平台用）
├── deploy/app.conf           # nginx 配置（SPA 回退 + gzip + 健康检查）
├── scripts/sync-build-dir.cjs  # 兼容帽子云默认输出目录 build/（dist 的副本）
├── download/                 # 可选：自建部署的站内 APK（默认不进产物，见下）
├── dist/                     # 构建产物（由 web/dist 复制，git 忽略）
├── db/                       # 占位（本仓库无后端数据库）
└── web/                      # 官网前端工程
    ├── index.html            # 入口 + SEO meta
    ├── vite.config.ts        # 版本注入 + 应用 CHANGELOG 解析 + 可选 APK 拷贝
    ├── package.json          # 网站版本唯一来源（version 字段）
    ├── public/screens/       # 界面截图清单与图片
    ├── public/effects/       # 特效快照
    ├── scripts/              # 截图抓取 / 运行时冒烟
    └── src/
        ├── main.tsx / App.tsx / router.tsx
        ├── i18n/             # 中英词典、store、I18nProvider、LanguageSwitch
        ├── components/       # Layout / Screenshot / TvIcons
        ├── data/             # site.tsx / effects.ts / screenshots.ts / appChangelog.md
        ├── hooks/            # useScreenshots
        ├── pages/            # Home / Features / Screens / Effects / Download / About
        └── styles/           # styles.css / home.css
```

---

## 本地运行

- 环境：Node.js 20+ / npm 9+

```bash
cd web
npm install
npm run dev       # http://localhost:5174
npm run build     # tsc + vite build + 复制到根 dist/
npm run preview   # http://localhost:4173
npm run smoke     # 双语 / 六路由 / 零运行时错误的冒烟护栏
```

---

## APK 分发（百度网盘）

| 项 | 值 |
| --- | --- |
| 版本 | v2.39.18 |
| 文件名 | `NASMusicTV-release-v2-39-18.apk` |
| 体积 | 约 43 MB |
| 主入口 | 百度网盘分享（国内速度快） |
| 提取码 | 在下载页展示，配置于 `web/src/data/site.tsx` |
| 备用 / 历史版本 | GitHub Releases、Gitee Releases |

**为什么不再提供站内直链**：腾讯云 EdgeOne Makers 有**单文件 25 MiB**上限，v2.39.18 的 43 MB 安装包必然触发 `File size limit exceeded`。旧版 v2.38.15 的 24.5 MiB 只是勉强卡线。

发新版只需改 `web/src/data/site.tsx` 三处常量：`APK_VERSION` / `APK_PAN_URL` / `APK_PAN_CODE`；`APK_FILE_NAME`、版本徽标、下载页文案会自动推导。`recentChangelog` 与中英词典 `changelog.*` 需同步追加。

**自建 NAS / Docker 部署**若要恢复站内直链：把 APK 放进仓库根 `download/`，用 `INCLUDE_APK=1 npm run build` 构建（默认不拷贝，避免云端超限），并把 `site.tsx` 的 `APK_DOWNLOAD_URL` 指向 `APK_DIRECT_URL`。

下载页「更新内容」来自应用仓库 `CHANGELOG.md` 最新一节：本地构建优先读 `../NASMusicTV/CHANGELOG.md`，Docker / CI 回落 `web/src/data/appChangelog.md` 快照（已刷新到 v2.39.x 全量段落）。

---

## 部署（腾讯云 EdgeOne Makers · Gitee 源）

配置已固化在仓库根 [`edgeone.json`](edgeone.json)：

```json
{
  "installCommand": "npm install",
  "buildCommand": "npm run build && node -e \"...清理 node_modules...\"",
  "outputDirectory": "./dist",
  "nodeVersion": "20.18.0",
  "rewrites": [{ "source": "/*", "destination": "/index.html" }]
}
```

控制台一次性设置（**项目设置 → 构建部署配置**）：

1. 代码源选 **Gitee → `hxzhang2000/NASMusicTV-Website`**，分支 `main`。
2. 确认安装命令 `npm install`、构建命令以 `npm run build` 开头、**输出目录 `./dist`**。`edgeone.json` 会覆盖控制台默认值，两处保持一致最稳。
3. `rewrites` 的 `/* → /index.html` 是 SPA 深链回退（`/download`、`/features` 直接访问不再 404）。
4. 重新部署。产物应为 **48 个文件 / 约 29 MB / 最大单文件 < 2 MB**。

> 详细排障（含 20,000 文件数上限的成因与三层修复）见 [`docs/EDGEONE-DEPLOY.md`](docs/EDGEONE-DEPLOY.md)。

---

## 部署（帽子云 · 静态网站）

平台在 `framework: none` 时按 Create React App 的默认口径把「输出目录」设成 `build`，而本站是 Vite、产物在 `dist/`，会报 `"/src/build": not found`。

1. **应用详情 → 构建设置 → 输出目录改成 `dist`**，构建命令保持 `npm run build`，根目录留空。
2. 保存后点右上角 **部署 → 立即部署**（改设置不会自动重跑）。
3. 仓库侧已做兜底：`npm run build` 会把 `dist/` 同步一份到 `build/`（`scripts/sync-build-dir.cjs`），即使控制台没改也能发布。
4. 需先把本地提交推送到平台绑定的仓库分支，否则云端仍构建旧代码。

> 详见 [`docs/MAOZIYUN-DEPLOY.md`](docs/MAOZIYUN-DEPLOY.md)。帽子云**不读取** `edgeone.json`，两个平台的配置不通用。

---

## 部署（GitHub Pages）

推送 `main` 触发 [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)，产物发布到 `https://hxzhang2000.github.io/NASMusicTV-Website/`。首次启用需在仓库 **Settings → Pages → Source** 选 **GitHub Actions**。

- Pages 跑在 `/<仓库名>/` 子路径，工作流用 `VITE_BASE` 覆盖 Vite `base`；根域名部署不设该变量。
- 工作流把 `dist/index.html` 复制成 `dist/404.html` 承接深链；`web/public/.nojekyll` 关闭 Jekyll 处理。

---

## 部署（Docker）

```bash
docker compose build
docker build -t nasmtv-web .
docker run --rm -p 8080:80 nasmtv-web   # http://localhost:8080
```

- 多阶段构建：`npm run build` → 拷入 `nginx:1.27-alpine`，由 `deploy/app.conf` 托管。
- `app.conf` 已配置 SPA history 回退、静态资源长缓存、gzip 与 `/nginx-health` 健康检查。

---

## 相关链接

- **官网源码（本站）**：[GitHub](https://github.com/hxzhang2000/NASMusicTV-Website) · [Gitee](https://gitee.com/hxzhang2000/NASMusicTV-Website)
- **应用源码**：[GitHub](https://github.com/hxzhang2000/NASMusicTV) · [Gitee](https://gitee.com/hxzhang2000/NASMusicTV)
- **版本发布记录**：[GitHub Releases](https://github.com/hxzhang2000/NASMusicTV/releases) · [Gitee Releases](https://gitee.com/hxzhang2000/NASMusicTV/releases)
- **问题反馈**：[官网 / 文档](https://github.com/hxzhang2000/NASMusicTV-Website/issues) · [应用 / 功能](https://github.com/hxzhang2000/NASMusicTV/issues)

## 开源协议

本站与 NAS Music TV 应用本体一同以 **GPL v3** 协议开源。

## 版本

- 网站有**独立于 Android 应用**的版本号，唯一来源是 `web/package.json` 的 `version`（当前 `1.3.0`）。
- 版本号与构建时间由 Vite 在构建时注入（`web/src/version.ts` → `SITE_VERSION` / `SITE_BUILD_TIME`），页脚与关于页自动同步。
