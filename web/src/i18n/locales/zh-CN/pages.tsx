/**
 * 多语言体系 · 中文词典（zh-CN）· 页面文案
 *
 * 收录：首页 / 功能特性页 / 界面预览页 / 特效图集页 / 下载页 / 关于页 的全部页面级文案。
 * 本文件为 .tsx：下载页设备说明含 <code> 行内代码，值为 ReactNode。
 */

import type { ReactNode } from "react";

export const zhPages = {
  home: {
    heroBadge: "Android 开源应用",
    heroTitle: "把 NAS 曲库、网盘与网络音乐搬进客厅大屏",
    downloadLatest: "下载最新 APK",
    explore: "看看能做什么",
    githubSource: "GitHub 源码",
    heroNote: "电视、手机、平板共用同一 APK：电视走遥控器焦点体系，手机走触屏与 MiniPlayer。",
    heroAlt: "NAS Music TV 首页仪表盘界面预览",
    highlightsTitle: "客厅 K 歌房，也是全屋音乐中枢",
    highlightsLead:
      "从多源聚合曲库，到逐字卡拉OK歌词、实时人声消除、B 站 MV 与天气电台，NAS Music TV 把电视端缺失的音乐体验一次性补齐。",
    viewEffects: "查看特效图集 →",
    whatsNewEyebrow: "What's new",
    whatsNewTitle: "v2.39.18 带来了什么",
    whatsNewVersion: "应用 {version} · 2026-11-10",
    whatsNewLead:
      "从 10 月到 11 月，应用连续迭代 19 个版本：六套全新画面特效、照片墙转场扩到 70 种、浅色主题、洛雪音源与音乐源总开关，以及两轮全库代码审查带来的稳定性大修。",
    whatsNewItems: [
      {
        title: "六套全新画面特效",
        desc: "像素城市 57 座城、旷野公路、千里江山、歌词舞台（5 个子模式）、生态地球与魂斗罗驱动的「街机合集」，全部离线内置。",
      },
      {
        title: "照片墙 70 种转场",
        desc: "新增 33 种并下线 6 个拼块故障效果，补上拍摄日期水印与 NAS 自动扫描，API 22 老电视同样可用。",
      },
      {
        title: "浅色主题与焦点高亮",
        desc: "主题支持跟随系统 / 深色 / 浅色三态，遥控器焦点高亮默认开启；浅色下对比度与手机状态栏底色同步校正。",
      },
      {
        title: "洛雪音源与音乐源总开关",
        desc: "第三方音源脚本逐平台验证可用性；NAS / 网络 / 百度 / Jamendo / 本地各自可关，关闭后全站不再出现也不再请求。",
      },
      {
        title: "电视实测驱动的大修",
        desc: "FLAC 在老电视整进程崩溃、逐行歌词不跳行、设置页长值被压成三行、切歌通知封面不刷新等 40 余项逐条修复。",
      },
      {
        title: "两轮全库代码审查",
        desc: "154 项 + 59 项发现落地：老设备转场降级、B 站 MV 直链主机白名单、歌词按码点切分、出站重定向逐跳地址守卫。",
      },
    ],
    whatsNewMore: "查看完整更新摘要 →",

    featuresTitlePre: "覆盖曲库、歌词、播放与双端交互的",
    featuresTitleAccent: "完整能力",
    featuresLead:
      "共 {count} 大功能模块，从连接 NAS 后端到本地扫描、网盘串流与可视化舞台，开箱即用，无需折腾。",
    viewAllFeatures: "查看全部 {count} 个功能模块",
    screensTitle: "为遥控器和大屏重新设计的界面",
    screensLead:
      "完整的 D-Pad 焦点系统、10 秒轮播的多封面、可调高斯模糊滤镜与可视化频谱，全部按电视使用场景打磨。",
    screensNote: "以上为电视端实机界面；完整 {count} 个界面见",
    screensNoteEnd: "。",
    browseAllScreens: "浏览全部 {count} 个界面",
    ctaTitle: "把 NAS 曲库搬上大屏",
    ctaDesc: "开源、免注册、无广告。下载 APK 装上电视，扫码即可用手机遥控队列与点歌。",
    ctaDownload: "下载最新版",
    ctaJoin: "参与开源",
    screenAria: "{name}界面预览",
    screenShotAlt: "{name} 电视端实机界面截图",
  },
  featuresPage: {
    licensePill: "开源 GPL v3",
    title: "全部功能特性",
    titleCount: " · {count} 大模块",
    desc: "从 NAS 后端接入、本地扫描、网络与网盘音乐，到歌词系统、播放控制、TV 遥控与手机触屏体验，每个模块都按大屏与遥控器场景实际打磨。",
    ctaTitle: "功能都看完了？直接装上试试",
    ctaDesc: "电视 / 手机 / 平板共用同一 APK，安装后即可连接 NAS 或直接听网络音乐。",
    goDownload: "前往下载",
    viewSource: "查看源码",
    tipTag: "提示",
    tipText: "部分功能依赖第三方服务或密钥（天气 API Key、网络音乐端点、Jamendo Client ID、百度网盘授权），在设置页配置后生效。",
  },
  screensPage: {
    title: "界面预览",
    titleSub: " · 为客厅大屏与手机横屏而设计",
    desc: "电视端保持顶部导航 + 遥控器焦点体系；手机端自动切换为底部导航 + MiniPlayer 迷你播放条，并支持锁屏控制与车机 / 手表浏览。以下为各界面实机效果。",
    tvCardTitle: "TV 专属体验",
    tvCardItems: [
      "完整 D-Pad 焦点导航 + HDMI-CEC 遥控器媒体键",
      "可视化舞台公开版 27 套可选特效 + 照片墙 70 种转场，低 / 中 / 高三档画质，遥控器选定即恒定显示",
      "K 歌 / MTV 全屏页二维码，手机扫码遥控队列",
      "前台通知栏支持上一首 / 播放暂停 / 下一首",
    ],
    phoneCardTitle: "手机端体验",
    phoneCardItems: [
      "底部导航：首页 / 曲库 / 搜索 / 播放队列",
      "MiniPlayer 迷你播放条，常驻非播放页底部",
      "进度条支持点击与拖拽，锁屏可直接切歌",
      "Android Auto / Wear OS 媒体浏览树",
    ],
    screenShotAlt: "{name} 界面截图",
    featuresBtn: "查看完整功能清单",
    githubBtn: "在 GitHub 查看项目",
  },
  effectsPage: {
    pillStage: "全屏舞台",
    pillQuality: "低 / 中 / 高三档画质",
    pillCount: "{count} 张快照",
    title: "特效图集",
    titleSub: " · {count} 套画面快照",
    desc: "可视化舞台在播放时铺满全屏，公开版可选 27 套效果，按设备性能分低 / 中 / 高三档画质，遥控器左右键即时切换。本页汇总经典效果的画面快照，点击任意画面可放大浏览。",
    note: "以上为端上实拍画面快照，实际观感随画质档位与设备性能略有差异；v2.39.x 新增的像素城市、旷野公路、千里江山、歌词舞台、生态地球、街机合集等效果快照尚未收录，数量以本页列出的为准。",
    zoomAria: "放大查看：{name}",
    shotAlt: "{name} 可视化特效画面快照",
    lightboxAria: "{name} · 大图浏览",
    closeAria: "关闭大图",
    lightboxAlt: "{name} 可视化特效画面",
    lightboxHint: "Esc 关闭 · ← / → 切换上一张 / 下一张",
  },
  downloadPage: {
    title: "下载与安装",
    titleSub: " · 一个 APK 通吃所有设备",
    desc: "最新版安装包通过百度网盘分享（国内主入口），手机 / 平板下载后点击即可安装，电视端建议用 U 盘 / adb 安装。同一个安装包内置三种架构并自动适配设备，无需再挑架构、挑版本。",
    latestVersion: "最新版本 {version}",
    universalApk: "通用 APK · 内置 ARM64 / ARMv7 / x86_64",
    allDevices: "手机 · 平板 · 电视 · 模拟器",
    downloadBtn: "从百度网盘下载（{version} · {size}）",
    licenseNote: "当前协议：{license} · 打开网盘链接后输入提取码即可下载；历史版本见 GitHub Releases，请勿从第三方渠道下载。",
    apkLatest: "Latest · {version}",
    apkTagUniversal: "通用安装包 · 全架构合一",
    apkTagOverwrite: "覆盖安装，播放数据自动保留",
    changelogTitle: "{range} 更新摘要",
    badgeNew: "NEW",
    directDownload: "网盘下载",
    viewOnGithub: "到 GitHub 查看该版本",
    panCodeLabel: "提取码",
    panCodeHint: "打开网盘链接后输入提取码 {code} 即可下载",
    panSize: "安装包约 {size}",
    panWhy: "安装包 {size} 超过官网所部署云平台单文件 25 MiB 上限，故改由百度网盘分享，历史版本与备用入口见 Releases。",
    giteeReleases: "Gitee Releases 备用",
    apkNote: "新版本发布后，本页网盘链接、提取码与文件名随版本同步更新",
    devicesTitle: "一个 APK，全设备适配",
    devicesDesc:
      "手机、平板、电视、盒子与模拟器装的是同一个安装包：运行时自动识别设备类型，电视走遥控器焦点体系，手机走触屏与 MiniPlayer，互不影响。",
    devices: [
      {
        title: "手机",
        desc: "直接下载 APK 点击安装即可，无需额外权限；本地音乐在设置页「本地音乐」分区按需开启。",
      },
      {
        title: "平板",
        desc: "与手机同一个安装包，触屏交互与曲库网格随屏幕宽度自适应，横竖屏都好用。",
      },
      {
        title: "电视 / 盒子",
        desc: (
          <>
            把 APK 拷入 U 盘插入电视安装；或开启开发者调试后用{" "}
            <code className="inline">adb install</code>{" "}
            推送，也可用电视助手类工具安装，遥控器焦点体系开箱即用。
          </>
        ) as ReactNode,
      },
      {
        title: "模拟器 / 调试",
        desc: (
          <>
            直接安装同一个 APK 到 Android 模拟器，可配合 <code className="inline">adb</code>{" "}
            命令安装与调试。
          </>
        ) as ReactNode,
      },
    ],
    abiTitle: "安装包内置三种架构，安装时自动适配",
    abiDesc: "通用 APK 已包含以下三种 ABI，正常情况无需关注架构差异，直接安装即可。",
    abis: [
      {
        name: "ARM64 (arm64-v8a)",
        desc: "绝大多数智能电视、电视盒子与近几年的手机，性能与兼容性最佳。",
      },
      {
        name: "ARMv7 (armeabi-v7a)",
        desc: "面向较早的老电视 / 老盒子与低配置设备，同一安装包自动适配。",
      },
      {
        name: "x86_64",
        desc: "用于 Android 模拟器或 x86 架构平板，实体电视一般不会用到。",
      },
    ],
    abiTag: "已内置",
    faqTitle: "常见问题",
    faqDesc: "安装、音乐源与播放相关的常见疑问都在这里；还有问题可以到 GitHub 提 Issue。",
    ctaTitle: "装好了？接着配置你的音乐源",
    ctaDesc:
      "连接 Jellyfin / Navidrome / Subsonic / 道理鱼 / 飞牛，或直接在设置页配置网络音乐端点与百度网盘授权。",
    docsBtn: "查看使用文档",
    issueBtn: "遇到问题？提 Issue",
  },
  aboutPage: {
    aboutTitle: "关于",
    openSource: "{license} 开源",
    noAds: "无广告 · 无注册",
    positionTitle: "项目定位",
    positionDesc:
      "{name} 是一款面向家庭影音场景的 Android 音乐播放器。它把自建 NAS 音乐库、设备本地音乐、网络音乐与百度网盘音乐统一在一个界面里，并为电视端补上逐字卡拉OK歌词、K 歌伴奏、MTV 音乐视频、天气电台与可视化舞台等专属体验。",
    releaseTitle: "发布方式",
    releaseDesc:
      "以单个通用 APK 发布（当前 v{version}），内置 ARM64 / ARMv7 / x86_64 三种架构，手机、平板、电视与模拟器共用同一份安装包，运行时自动识别设备类型并切换交互体系。因安装包超过 25 MiB，最新版通过百度网盘分享，历史版本见 GitHub / Gitee Releases。",
    licenseTitle: "开源协议",
    licenseDescBefore: "项目以",
    licenseDescAfter:
      "协议开源，可自由使用、修改与分发（衍生作品需同样以 GPL v3 开源）。源码托管在 GitHub，欢迎 Issue 反馈与 Pull Request 贡献。",
    thanksTitle: "致谢与声明",
    thanksDesc:
      "感谢 Jellyfin、Navidrome、Subsonic、Jamendo、Open-Meteo、OpenWeatherMap 等开源与服务提供方；本项目与上述服务及百度网盘无隶属关系，使用时应遵守各服务方的条款与版权规定。",
    copyrightTitle: "版权说明",
    copyrightDescBefore:
      "本应用涉及的网络音乐搜索功能通过 Meting-API 端点获取公开数据，仅提供元数据索引。原始版权归原始版权方所有，本应用仅为聚合浏览工具，不存储、分发或转售任何媒体文件，也不对第三方音乐资源的合法性、准确性及可用性承担任何责任。如版权方认为其合法权益受到侵害，请通过",
    copyrightLink: "GitHub Issues",
    copyrightDescAfter: "联系我们，我们将及时处理。",
    apiTitle: "已接入服务与 API 版本",
    apiDesc:
      "应用「关于页」集中展示所有已接入后端 / 服务的 API 版本号：后端类型运行时获取真实版本，第三方服务展示静态版本，无版本号的服务仅列服务名。",
    tableService: "服务 / 后端",
    tableDesc: "说明",
    tableSource: "版本来源",
    starTitle: "Star 趋势与社区",
    starDesc: "项目在 GitHub 持续迭代，欢迎 Star 关注更新，也欢迎提交你希望支持的音乐源与电视端体验建议。",
    starBtn: "Star 项目",
    historyBtn: "查看 Star History",
    contributeTitle: "参与贡献",
    contributeItems: [
      "提交 Bug：附带设备型号、架构（ARM64 / ARMv7 / x86_64）与复现步骤",
      "提交功能建议：说明使用场景（电视 / 手机 / 车机）",
      "翻译与文档：完善使用说明与常见问题",
      "代码贡献：Fork 后按 GPL v3 协议提交 Pull Request",
    ],
    ctaTitle: "一起把客厅音乐体验做得更好",
    ctaDesc: "下载体验、反馈问题、分享给你的家庭影音群，都是对项目的支持。",
    downloadBtn: "直接下载最新 APK",
    feedbackBtn: "反馈问题",
  },
};
