/**
 * 多语言体系 · 中文词典（zh-CN）
 *
 * 本文件是词典类型（Dict）的唯一基准：en-US 必须满足此处推导出的类型，
 * tsc 会在编译期强制校验英文键齐全、形状一致。
 *
 * 收录范围：全站公共文案（meta / 导航 / 顶栏 / 页脚 / 站点信息 / 统计 / 语言切换 / mockup 装饰文案）。
 * 业务内容（功能、界面、FAQ、更新日志）见 content.ts，各页面文案见 pages.ts。
 */

export const zhCommon = {
  meta: {
    /** <title> 与 og:title 用（切换语言时同步更新 document.title） */
    title: "NAS Music TV · 为电视而生的开源多源音乐播放器",
  },
  common: {
    download: "下载",
    source: "源码",
    menu: "菜单",
    prev: "上一张",
    next: "下一张",
    panCode: "提取码",
    panDownload: "网盘下载",
    mock: "模拟图",
    realShot: "实机截图",
    switchView: "{name}：切换模拟图 / 实机截图",
    skipToContent: "跳到主内容",
    backToTop: "回到顶部",
  },
  nav: {
    aria: "主导航",
    home: "首页",
    features: "功能特性",
    screens: "界面预览",
    effects: "特效图集",
    download: "下载安装",
    about: "关于项目",
  },
  header: {
    homeAria: "{name} 首页",
    brandSub: "多源音乐 · TV / 手机双端",
    downloadTitle: "在百度网盘下载最新 APK（{version}）",
    themeToggle: "切换深浅主题",
  },
  footer: {
    brandDesc:
      "开源的 Android 音乐播放器（TV / 手机 / 平板通用），聚合 NAS、网络音乐、百度网盘与 Jamendo 多音乐源，支持 27 套可视化特效与照片墙 70 种转场。",
    product: "产品",
    resources: "资源",
    musicSources: "支持的音乐源",
    githubRepo: "GitHub 仓库",
    giteeRepo: "Gitee 仓库",
    giteeReleases: "Gitee 版本下载",
    releases: "版本发布记录",
    docs: "使用文档",
    issues: "问题反馈",
    copyright: "© {year} {name} · 网站 v{version} · 以 {license} 协议开源",
    disclaimer: "与 Jellyfin、Navidrome、Subsonic、百度网盘等第三方服务无隶属关系",
  },
  site: {
    tagline: "为电视而生的开源多源音乐播放器",
    subtitle:
      "聚合 NAS（Jellyfin / Navidrome / Subsonic / 道理鱼 / 飞牛）、本地音乐、网络音乐、百度网盘与 Jamendo 多音乐源，支持逐字卡拉OK歌词、K 歌伴奏、MTV 音乐视频、天气电台、27 套可视化特效与照片墙 70 种转场等电视专属体验。同一 APK 同时适配电视（遥控器）与手机（触屏）。",
    devices: ["Android TV", "手机", "平板"],
  },
  stats: {
    nasBackends: "NAS 后端支持",
    parallelSources: "音乐源并行搜索",
    visualEffects: "可视化特效",
    photoTransitions: "照片墙转场",
    oneApk: "APK 双端通用",
  },
  langSwitch: {
    label: "切换界面语言",
  },
  mockup: {
    currentLine: "当前句 · 平滑滚动",
    karaokeLyric: "逐字高亮 · 卡拉OK歌词",
    karaokeShort: "逐字高亮 · 卡拉OK",
    libraryTitle: "曲库",
    topLyricPill: "顶部胶囊歌词 · 当前句",
    mtvName: "MV · MTV",
    mtvSub: "全屏音乐视频 · 逐字歌词",
  },
};
