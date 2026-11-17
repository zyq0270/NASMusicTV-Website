import React from "react";
import {
  HomeOutlined,
  CloudServerOutlined,
  FolderOpenOutlined,
  GlobalOutlined,
  CompassOutlined,
  CloudOutlined,
  BaiduOutlined,
  CustomerServiceOutlined,
  PlayCircleOutlined,
  PictureOutlined,
  UnorderedListOutlined,
  DesktopOutlined,
  HeartOutlined,
  MobileOutlined,
  SettingOutlined,
  ApiOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";

/**
 * 站点结构化数据（单一数据源）。
 *
 * 【多语言体系】本文件只保留「语言无关」的内容：图标、稳定 key、版本号、外链。
 * 全部界面文案集中在 src/i18n/locales/ 下的中英词典中维护。
 */

export const site = {
  name: "NAS Music TV",
  repo: "https://github.com/hxzhang2000/NASMusicTV",
  releases: "https://github.com/hxzhang2000/NASMusicTV/releases",
  giteeRepo: "https://gitee.com/hxzhang2000/NASMusicTV",
  giteeReleases: "https://gitee.com/hxzhang2000/NASMusicTV/releases",
  websiteRepo: "https://github.com/hxzhang2000/NASMusicTV-Website",
  websiteGitee: "https://gitee.com/hxzhang2000/NASMusicTV-Website",
  stars: "https://www.star-history.com/?repos=hxzhang2000%2Fnasmusictv&type=date&legend=top-left",
  license: "GPL v3",
};

/**
 * 应用最新版本（下载页 / 首页 / 关于页共用，唯一来源）。
 * 当前对应应用仓库 v2.39.20 / versionCode 205（2026-11-16）。
 */
export const APK_VERSION = "v2.39.20";

/**
 * APK 分发方式（网站 1.3.3 起）：
 * v2.39.20 安装包约 43 MB，超过腾讯云 EdgeOne Makers 单文件 25 MiB 上限，
 * 因此不随站点产物发布。主入口为「Gitee 最新 Release 页面」（/releases/latest），
 * 浏览器访问会 302 到最新版本的 Release 页，用户在该页点 APK 附件下载；
 * 好处是发版后无需改官网链接即可指向最新版。
 * GitHub / Gitee Releases 收录历史版本。发新版只需改 APK_VERSION（版本号 / 文件名 / 文案随动）。
 */
export const APK_SIZE = "43 MB";

/** 文件名仅用于版本卡展示；由版本号自动推导 */
export const APK_FILE_NAME = `NASMusicTV-release-${APK_VERSION.replace(/\./g, "-")}.apk`;

/**
 * 固定版本 APK 直链（备用 / 供需要直链的场景使用）。
 * 由 APK_VERSION 自动推导，已实测匿名可下载（302 → CDN，无需 token / 登录）。
 * 注意 Gitee 不支持 releases/latest/download/<文件> 写法（会 404），必须带版本号。
 */
export const APK_GITEE_URL = `${site.giteeRepo}/releases/download/${APK_VERSION}/${APK_FILE_NAME}`;

/**
 * 主下载入口：Gitee 最新 Release 页面（网站 1.3.3 起，替代固定 APK 直链）。
 * 浏览器带正常 Accept 头访问 /releases/latest 会 302 → /releases/tag/<最新版>，
 * 页面列出 APK 附件供用户点选；发版后无需改官网即可指向最新版。
 */
export const APK_GITEE_LATEST = `${site.giteeRepo}/releases/latest`;

/** 全站下载按钮统一指向此处：Gitee 最新 Release 页面（见 APK_GITEE_LATEST） */
export const APK_DOWNLOAD_URL = APK_GITEE_LATEST;

/** 历史版本 / 备用入口 */
export const APK_RELEASES_LATEST = `${site.repo}/releases/latest`;
export const APK_RELEASES_GITEE = site.giteeReleases;

/**
 * 自建 NAS / Docker 部署可选的站内直链：把 APK 放进仓库根 download/ 并设
 * INCLUDE_APK=1 重新构建即可启用（云端 EdgeOne 构建不要开启）。
 */
export const APK_DIRECT_URL = `${import.meta.env.BASE_URL}download/${APK_FILE_NAME}`;

/** 下载页「版本说明」：从上一个对外版本到当前最新版的核心更新摘要（文案在词典 changelog.*） */
export interface RecentChangelogEntry {
  version: string;
  date: string;
  highlight?: boolean;
}

export const recentChangelog: RecentChangelogEntry[] = [
  { version: "v2.39.20", date: "11-16", highlight: true },
  { version: "v2.39.19", date: "11-16", highlight: true },
  { version: "v2.39.18", date: "11-10" },
  { version: "v2.39.17", date: "11-10" },
  { version: "v2.39.16", date: "11-09" },
  { version: "v2.39.14", date: "11-08", highlight: true },
  { version: "v2.39.13", date: "11-06", highlight: true },
  { version: "v2.39.10", date: "11-01" },
  { version: "v2.39.8", date: "10-28" },
  { version: "v2.39.6", date: "10-21" },
];

/** 下载页「版本说明」标题范围 */
export const CHANGELOG_RANGE = "v2.38.15 → v2.39.20";

/** 首页统计项：value 为数字本体，label 文案在词典 stats.<key> 中维护 */
export interface StatItem {
  key: string;
  value: string;
}

export const stats: StatItem[] = [
  { key: "nasBackends", value: "5" },
  { key: "parallelSources", value: "4" },
  { key: "visualEffects", value: "27" },
  { key: "photoTransitions", value: "70" },
  { key: "oneApk", value: "1" },
];

export interface Highlight {
  key: string;
  icon: React.ReactNode;
}

/** 首页 12 张 Highlights 卡片：title / desc 在词典 highlights.<key> 中维护 */
export const highlights: Highlight[] = [
  { key: "multi-source", icon: <CloudServerOutlined /> },
  { key: "karaoke-lyric", icon: <CustomerServiceOutlined /> },
  { key: "karaoke", icon: <PlayCircleOutlined /> },
  { key: "visualizer", icon: <PictureOutlined /> },
  { key: "photo-wall", icon: <PictureOutlined /> },
  { key: "new-effects", icon: <PictureOutlined /> },
  { key: "mtv", icon: <DesktopOutlined /> },
  { key: "weather-radio", icon: <CloudOutlined /> },
  { key: "light-theme", icon: <BgColorsOutlined /> },
  { key: "source-switch", icon: <ApiOutlined /> },
  { key: "phone-remote", icon: <MobileOutlined /> },
  { key: "dual-device", icon: <MobileOutlined /> },
];

export interface FeatureModule {
  key: string;
  icon: React.ReactNode;
}

/** 18 个功能模块：title / summary / items 在词典 features.<key> 中维护 */
export const featureModules: FeatureModule[] = [
  { key: "dashboard", icon: <HomeOutlined /> },
  { key: "nas", icon: <CloudServerOutlined /> },
  { key: "local", icon: <FolderOpenOutlined /> },
  { key: "online", icon: <GlobalOutlined /> },
  { key: "luoxue", icon: <ApiOutlined /> },
  { key: "discover", icon: <CompassOutlined /> },
  { key: "weather", icon: <CloudOutlined /> },
  { key: "baidu", icon: <BaiduOutlined /> },
  { key: "lyric", icon: <CustomerServiceOutlined /> },
  { key: "playback", icon: <PlayCircleOutlined /> },
  { key: "cover", icon: <PictureOutlined /> },
  { key: "photo-wall", icon: <PictureOutlined /> },
  { key: "theme", icon: <BgColorsOutlined /> },
  { key: "library", icon: <UnorderedListOutlined /> },
  { key: "mine", icon: <HeartOutlined /> },
  { key: "settings", icon: <SettingOutlined /> },
  { key: "tv", icon: <DesktopOutlined /> },
  { key: "mobile", icon: <MobileOutlined /> },
];

/** 界面预览的 17 个界面（有序）：文案在词典 screens.<key> 中维护 */
export const screenKeys = [
  "dashboard",
  "player",
  "karaoke",
  "mtv",
  "visualizer",
  "photo-wall",
  "library",
  "discover",
  "search",
  "weather-radio",
  "detail",
  "queue",
  "mine",
  "settings",
  "connection",
  "about",
  "remote",
] as const;

export type ScreenKey = (typeof screenKeys)[number];
