/**
 * 多语言体系 · English dictionary (en-US) · Page copy
 *
 * 收录：首页 / 功能特性页 / 界面预览页 / 特效图集页 / 下载页 / 关于页 的全部页面级文案。
 * 本文件为 .tsx：下载页设备说明含 <code> 行内代码，值为 ReactNode。
 */

import type { ReactNode } from "react";

export const enPages = {
  home: {
    heroBadge: "Open-source Android app",
    heroTitle: "Bring your NAS library, netdisk and online music to the living-room screen",
    downloadLatest: "Download latest APK",
    explore: "See what it can do",
    githubSource: "GitHub source",
    heroNote:
      "One APK for TV, phone and tablet: TV uses the remote focus system, phone uses touch and the MiniPlayer.",
    heroAlt: "NAS Music TV home dashboard preview",
    highlightsTitle: "A living-room karaoke room and a whole-home music hub",
    highlightsLead:
      "From the aggregated multi-source library to word-by-word karaoke lyrics, real-time vocal elimination, Bilibili MVs and weather radio, NAS Music TV fills in every music experience the TV was missing.",
    viewEffects: "Browse the effects gallery →",
    whatsNewEyebrow: "What's new",
    whatsNewTitle: "What shipped in v2.39.18",
    whatsNewVersion: "App {version} · 2026-11-10",
    whatsNewLead:
      "Nineteen releases between October and November: six brand-new visual worlds, 70 photo-wall transitions, a light theme, LX Music sources, per-source master switches and a stability overhaul driven by two full-codebase reviews.",
    whatsNewItems: [
      {
        title: "Six new visual worlds",
        desc: "Pixel Cities (57 cities), Open Road, A Thousand Li of Rivers and Mountains, Lyric Stage (5 sub-modes), Eco Earth and the Contra-driven Arcade Collection — all bundled offline.",
      },
      {
        title: "70 photo-wall transitions",
        desc: "33 added and 6 broken tile effects removed, plus capture-date watermarks and automatic NAS scanning — all the way down to API 22 TVs.",
      },
      {
        title: "Light theme & focus highlight",
        desc: "Theme follows the system or is pinned dark / light; remote focus highlight is on by default, with contrast and phone system bars corrected for light mode.",
      },
      {
        title: "LX Music sources & source switches",
        desc: "Third-party source scripts verified per platform; NAS / online / Baidu / Jamendo / local can each be disabled site-wide, with all requests stopped.",
      },
      {
        title: "TV-tested fixes",
        desc: "40+ real-device fixes: FLAC crashing old TVs, line-by-line lyrics not advancing, cramped settings values, notification covers not refreshing on track change and more.",
      },
      {
        title: "Two full-codebase reviews",
        desc: "154 + 59 findings landed: transition fallbacks on old devices, MV URL host allow-listing, code-point lyric splitting and hop-by-hop outbound redirect guards.",
      },
    ],
    whatsNewMore: "Full release summary →",

    featuresTitlePre: "The complete toolkit for library, lyrics, playback and ",
    featuresTitleAccent: "dual-device interaction",
    featuresLead:
      "{count} feature modules in all, from connecting a NAS backend to local scanning, netdisk streaming and the visualizer stage — ready to use out of the box.",
    viewAllFeatures: "View all {count} feature modules",
    screensTitle: "Interfaces redesigned for the remote and the big screen",
    screensLead:
      "A complete D-Pad focus system, multi-cover rotation every 10 seconds, adjustable Gaussian blur filters and a visualizer spectrum — all polished for TV usage.",
    screensNote: "The above are real TV screens; see all {count} screens in the",
    screensNoteEnd: ".",
    browseAllScreens: "Browse all {count} screens",
    ctaTitle: "Put your NAS library on the big screen",
    ctaDesc:
      "Open source, no sign-up, no ads. Install the APK on your TV and scan the QR code to control the queue and pick songs from your phone.",
    ctaDownload: "Download latest",
    ctaJoin: "Contribute on GitHub",
    screenAria: "{name} screen preview",
    screenShotAlt: "{name} real TV screenshot",
  },
  featuresPage: {
    licensePill: "Open source · GPL v3",
    title: "All features",
    titleCount: " · {count} modules",
    desc: "From NAS backend integration and local scanning to online and netdisk music, the lyric system, playback controls and TV remote / phone touch experience — every module is polished for real big-screen and remote scenarios.",
    ctaTitle: "Seen it all? Install it and give it a try",
    ctaDesc:
      "TV / phone / tablet share the same APK — connect a NAS or listen to online music right after install.",
    goDownload: "Go to download",
    viewSource: "View source",
    tipTag: "Note",
    tipText:
      "Some features depend on third-party services or keys (weather API key, online music endpoints, Jamendo client ID, Baidu Netdisk authorization) and take effect once configured in Settings.",
  },
  screensPage: {
    title: "Screens",
    titleSub: " · designed for the living-room screen and phone landscape",
    desc: "TV keeps the top navigation and remote focus system; phone automatically switches to bottom navigation and the MiniPlayer, with lock-screen controls and car / watch browsing. Below are the real screens.",
    tvCardTitle: "TV-only experience",
    tvCardItems: [
      "Complete D-Pad focus navigation + HDMI-CEC remote media keys",
      "27 selectable visualizer effects and 70 photo-wall transitions (low / medium / high quality); the effect picked on the remote stays fixed",
      "QR code on the K-song / MTV full-screen pages for phone queue control",
      "Foreground notification with previous / play-pause / next",
    ],
    phoneCardTitle: "Phone experience",
    phoneCardItems: [
      "Bottom navigation: Home / Library / Search / Play queue",
      "MiniPlayer, always docked at the bottom of non-playback pages",
      "Progress bar supports tap and drag, with track switching right from the lock screen",
      "Android Auto / Wear OS media browse tree",
    ],
    screenShotAlt: "{name} screenshot",
    featuresBtn: "View the full feature list",
    githubBtn: "View the project on GitHub",
  },
  effectsPage: {
    pillStage: "Full-screen stage",
    pillQuality: "Low / medium / high quality",
    pillCount: "{count} snapshots",
    title: "Effects gallery",
    titleSub: " · {count} snapshots",
    desc: "The visualizer stage fills the screen during playback, with 27 selectable effects in the public build, tiered by device performance into low / medium / high quality and instantly switchable with the remote's left / right keys. This page collects on-device snapshots — tap any frame to enlarge.",
    note: "The above are on-device snapshots; the real look varies slightly with quality tier and device performance. The gallery holds {count} snapshots, of which {publicCount} effects ship in the public build. Pixel City and Open Road are not distributed publicly for licensing reasons — their snapshots are shown here for reference only.",
    restrictedBadge: "Not publicly released",
    restrictedHint: "Not distributed in the public build for licensing reasons — snapshot shown for reference only.",
    zoomAria: "Enlarge: {name}",
    shotAlt: "{name} visualizer effect snapshot",
    lightboxAria: "{name} · enlarged view",
    closeAria: "Close enlarged view",
    lightboxAlt: "{name} visualizer effect",
    lightboxHint: "Esc to close · ← / → for previous / next",
  },
  downloadPage: {
    title: "Download & install",
    titleSub: " · one APK for every device",
    desc: "The latest build is shared via Baidu Netdisk (primary mirror for China): phone / tablet install with a tap after downloading, TV is best installed via USB drive / adb. One package bundles three architectures and adapts automatically — no more picking architectures or versions.",
    latestVersion: "Latest {version}",
    universalApk: "Universal APK · ARM64 / ARMv7 / x86_64 built in",
    allDevices: "Phone · Tablet · TV · Emulator",
    downloadBtn: "Download from Baidu Netdisk ({version} · {size})",
    licenseNote:
      "License: {license} · Open the netdisk link and enter the access code to download; historical versions are on GitHub Releases — please do not download from third-party channels.",
    apkLatest: "Latest · {version}",
    apkTagUniversal: "Universal package · all architectures in one",
    apkTagOverwrite: "Install over the top; playback data is kept",
    changelogTitle: "{range} release summary",
    badgeNew: "NEW",
    directDownload: "Netdisk download",
    viewOnGithub: "View this version on GitHub",
    panCodeLabel: "Access code",
    panCodeHint: "Open the netdisk link and enter code {code} to download",
    panSize: "Package about {size}",
    panWhy: "The {size} package exceeds the 25 MiB per-file limit of the cloud platform hosting this site, so it is shared via Baidu Netdisk; Releases keep historical and fallback builds.",
    giteeReleases: "Gitee Releases fallback",
    apkNote: "When a new version ships, this page's netdisk link, access code and filename update together",
    devicesTitle: "One APK, every device",
    devicesDesc:
      "Phone, tablet, TV, box and emulator all install the same package: device type is detected at runtime — TV uses the remote focus system, phone uses touch and the MiniPlayer, with no interference.",
    devices: [
      {
        title: "Phone",
        desc: "Download the APK and tap to install — no extra permissions needed; local music is enabled on demand in the “Local music” section of Settings.",
      },
      {
        title: "Tablet",
        desc: "The same package as phone; touch interaction and the library grid adapt to screen width, in both landscape and portrait.",
      },
      {
        title: "TV / Box",
        desc: (
          <>
            Copy the APK to a USB drive and plug it into the TV to install; or enable developer debugging
            and push it with <code className="inline">adb install</code>, or use a TV assistant tool — the
            remote focus system works out of the box.
          </>
        ) as ReactNode,
      },
      {
        title: "Emulator / Debug",
        desc: (
          <>
            Install the same APK on an Android emulator, optionally with <code className="inline">adb</code>{" "}
            commands for install and debug.
          </>
        ) as ReactNode,
      },
    ],
    abiTitle: "Three architectures built in — auto-adapted at install",
    abiDesc:
      "The universal APK already includes the three ABIs below; in normal use you can ignore architecture differences and just install.",
    abis: [
      {
        name: "ARM64 (arm64-v8a)",
        desc: "Covers most smart TVs, TV boxes and recent phones, with the best performance and compatibility.",
      },
      {
        name: "ARMv7 (armeabi-v7a)",
        desc: "For older TVs / boxes and low-end devices — the same package adapts automatically.",
      },
      {
        name: "x86_64",
        desc: "For Android emulators or x86 tablets; physical TVs rarely need it.",
      },
    ],
    abiTag: "Built in",
    faqTitle: "FAQ",
    faqDesc:
      "Common questions about installation, music sources and playback are all here; for anything else, open an issue on GitHub.",
    ctaTitle: "Installed? Now set up your music sources",
    ctaDesc:
      "Connect Jellyfin / Navidrome / Subsonic / 道理鱼 / 飞牛, or configure online music endpoints and Baidu Netdisk authorization right in Settings.",
    docsBtn: "Read the docs",
    issueBtn: "Hit a problem? Open an issue",
  },
  aboutPage: {
    aboutTitle: "About",
    openSource: "Open source · {license}",
    noAds: "No ads · No sign-up",
    positionTitle: "What it is",
    positionDesc:
      "{name} is an Android music player for home audio-video setups. It unifies your self-hosted NAS library, on-device local music, online music and Baidu Netdisk music in one interface, and adds TV-specific experiences: word-by-word karaoke lyrics, K-song backing tracks, MTV music videos, weather radio and the visualizer stage.",
    releaseTitle: "How it ships",
    releaseDesc:
      "Released as a single universal APK (currently v{version}) bundling ARM64 / ARMv7 / x86_64 — phone, tablet, TV and emulator share one package, with device type detected at runtime to switch interaction models. As the package exceeds 25 MiB, the latest build is shared via Baidu Netdisk; historical versions are on GitHub / Gitee Releases.",
    licenseTitle: "License",
    licenseDescBefore: "The project is open source under",
    licenseDescAfter:
      ": free to use, modify and distribute (derivative works must be open-sourced under GPL v3 as well). Source is hosted on GitHub — issues and pull requests are welcome.",
    thanksTitle: "Thanks & disclaimer",
    thanksDesc:
      "Thanks to Jellyfin, Navidrome, Subsonic, Jamendo, Open-Meteo, OpenWeatherMap and other open-source and service providers; this project is not affiliated with those services or Baidu Netdisk, and you should follow each provider's terms and copyright rules when using them.",
    copyrightTitle: "Copyright",
    copyrightDescBefore:
      "The online music search feature fetches public data through Meting-API endpoints and only provides a metadata index. All original copyrights belong to their respective owners; this app is an aggregation browsing tool only — it does not store, distribute or resell any media files, and assumes no responsibility for the legality, accuracy or availability of third-party music resources. If a copyright holder believes their rights are infringed, please contact us via",
    copyrightLink: "GitHub Issues",
    copyrightDescAfter: "and we will handle it promptly.",
    apiTitle: "Integrated services & API versions",
    apiDesc:
      "The app's About page shows API versions for all integrated backends / services: backends report real versions fetched at runtime, third-party services show static versions, and services without a version are listed by name only.",
    tableService: "Service / backend",
    tableDesc: "Description",
    tableSource: "Version source",
    starTitle: "Star trend & community",
    starDesc:
      "The project keeps iterating on GitHub — star it to follow updates, and feel free to submit the music sources and TV experiences you'd like to see.",
    starBtn: "Star the project",
    historyBtn: "View Star History",
    contributeTitle: "Contribute",
    contributeItems: [
      "Report bugs: include device model, architecture (ARM64 / ARMv7 / x86_64) and steps to reproduce",
      "Suggest features: describe the scenario (TV / phone / car)",
      "Translations & docs: improve the documentation and FAQ",
      "Code: fork and submit pull requests under GPL v3",
    ],
    ctaTitle: "Let's make the living-room music experience better together",
    ctaDesc:
      "Trying it out, reporting problems and sharing it with your home-audio group all support the project.",
    downloadBtn: "Download the latest APK",
    feedbackBtn: "Report a problem",
  },
};
