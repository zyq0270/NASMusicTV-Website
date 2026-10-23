/**
 * 多语言体系 · English dictionary (en-US)
 *
 * 公共文案分片：meta / 通用 / 导航 / 顶栏 / 页脚 / 站点信息 / 统计 / 语言切换 / mockup 装饰文案。
 * 分片不做类型标注，由 index.ts 合并后统一对齐 Dict（缺键会在 tsc 报错）。
 */

export const enCommon = {
  meta: {
    title: "NAS Music TV · Open-Source Multi-Source Music Player Built for TV",
  },
  common: {
    download: "Download",
    source: "Source",
    menu: "Menu",
    prev: "Previous",
    next: "Next",
    mock: "Mockup",
    realShot: "Screenshot",
    switchView: "{name}: toggle mockup / screenshot",
  },
  nav: {
    aria: "Main navigation",
    home: "Home",
    features: "Features",
    screens: "Screens",
    effects: "Effects",
    download: "Download",
    about: "About",
  },
  header: {
    homeAria: "{name} home",
    brandSub: "Multi-source music · TV / Phone",
    downloadTitle: "Download the latest APK ({version})",
  },
  footer: {
    brandDesc:
      "Open-source Android music player for TV, phone and tablet, bringing together NAS, online music and Baidu Netdisk sources.",
    product: "Product",
    resources: "Resources",
    musicSources: "Supported music sources",
    githubRepo: "GitHub Repository",
    releases: "Release Notes",
    docs: "Documentation",
    issues: "Report an Issue",
    copyright: "© {year} {name} · Site v{version} · Open source under {license}",
    disclaimer:
      "Not affiliated with Jellyfin, Navidrome, Subsonic, Baidu Netdisk or any other third-party service.",
  },
  site: {
    tagline: "The open-source multi-source music player built for TV",
    subtitle:
      "Bring NAS (Jellyfin / Navidrome / Subsonic / 道理鱼 / 飞牛), local music, online music and Baidu Netdisk together in one player — with word-by-word karaoke lyrics, K-song backing tracks, MTV music videos, weather radio and a visualizer stage made for the big screen. A single APK serves both TV (remote control) and phone (touchscreen).",
    devices: ["Android TV", "Phone", "Tablet"],
  },
  stats: {
    nasBackends: "NAS backends",
    parallelSources: "Music sources searched in parallel",
    visualEffects: "Visualizer effects",
    oneApk: "One APK for TV & phone",
  },
  langSwitch: {
    label: "Switch interface language",
  },
  mockup: {
    currentLine: "Current line · smooth scroll",
    karaokeLyric: "Word highlight · karaoke lyrics",
    karaokeShort: "Word highlight · karaoke",
    libraryTitle: "Library",
    topLyricPill: "Top lyric pill · current line",
    mtvName: "MV · MTV",
    mtvSub: "Full-screen music video · word-by-word lyrics",
  },
};
