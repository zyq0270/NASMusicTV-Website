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
} from "@ant-design/icons";

/**
 * 站点结构化数据（单一数据源）。
 *
 * 【多语言体系】本文件只保留「语言无关」的内容：图标、稳定 key、版本号、外链。
 * 全部界面文案（标题 / 描述 / 条目）集中在 src/i18n/locales/ 下的中英词典中维护，
 * 页面通过 useI18n() 的 t() / ta() / tv() 按键取值，新增语言只需加一份词典。
 */

export const site = {
  name: "NAS Music TV",
  repo: "https://github.com/hxzhang2000/NASMusicTV",
  releases: "https://github.com/hxzhang2000/NASMusicTV/releases",
  stars: "https://www.star-history.com/?repos=hxzhang2000%2Fnasmusictv&type=date&legend=top-left",
  license: "GPL v3",
};

/**
 * 最新 APK 版本信息（下载页 / 首页 / 关于页共用，唯一来源）。
 *
 * 发新版本时只需两步：
 *   1. 把新 APK 放进仓库根目录的 download/，文件名随版本号变化
 *      （如 NASMusicTV-release-v2-38-11.apk -> NASMusicTV-release-v2-38-15.apk），删掉旧文件；
 *   2. 更新下面这一处 APK_VERSION（"v2.38.11" -> "v2.38.15"）。
 * 文件名、下载直链与页面展示的版本号都会自动同步，无需改其他代码。
 * 下载页「更新内容」来自应用仓库 CHANGELOG.md：构建时优先读 ../NASMusicTV/CHANGELOG.md，
 * Docker / CI 无应用仓库时回落到 web/src/data/appChangelog.md 快照（更新应用 CHANGELOG 后记得刷新快照）。
 */
export const APK_VERSION = "v2.38.15";

/**
 * 下载页「版本说明」：从上一个大版本到当前最新版的核心更新摘要。
 * 发版时手动更新此数组即可（summary 文案在 i18n 词典 changelog.<版本号点转下划线> 中维护）。
 */
export interface RecentChangelogEntry {
  version: string;
  date: string;
  /** 可选标记：是否为大版本更新（用于视觉突出） */
  highlight?: boolean;
}

export const recentChangelog: RecentChangelogEntry[] = [
  { version: "v2.38.15", date: "10-17" },
  { version: "v2.38.14", date: "10-17" },
  { version: "v2.38.13", date: "10-15", highlight: true },
  { version: "v2.38.12", date: "10-15", highlight: true },
];

/** 下载页「版本说明」标题范围：v2.38.12 → v2.38.15 */
export const CHANGELOG_RANGE = "v2.38.12 → v2.38.15";

/** 由版本号推导 APK 文件名：v2.36.5 -> NASMusicTV-release-v2-36-5.apk（点号转连字符） */
export const APK_FILE_NAME = `NASMusicTV-release-${APK_VERSION.replace(/\./g, "-")}.apk`;

/** APK 站内直链（构建时 download/ 下的 APK 会自动拷贝到 dist/download/ 随站点发布；前缀随部署基路径变化） */
export const APK_DOWNLOAD_URL = `${import.meta.env.BASE_URL}download/${APK_FILE_NAME}`;

/** GitHub 最新 Release 页（始终指向最新发布的版本） */
export const APK_RELEASES_LATEST = `${site.repo}/releases/latest`;

/** 首页 / 关于页统计项：value 为数字本体，label 文案在词典 stats.<key> 中维护 */
export interface StatItem {
  key: string;
  value: string;
}

export const stats: StatItem[] = [
  { key: "nasBackends", value: "5" },
  { key: "parallelSources", value: "4" },
  { key: "visualEffects", value: "26" },
  { key: "oneApk", value: "1" },
];

export interface Highlight {
  key: string;
  icon: React.ReactNode;
}

/** 首页 9 张 Highlights 卡片：title / desc 在词典 highlights.<key> 中维护 */
export const highlights: Highlight[] = [
  { key: "multi-source", icon: <CloudServerOutlined /> },
  { key: "karaoke-lyric", icon: <CustomerServiceOutlined /> },
  { key: "karaoke", icon: <PlayCircleOutlined /> },
  { key: "visualizer", icon: <PictureOutlined /> },
  { key: "photo-wall", icon: <PictureOutlined /> },
  { key: "mtv", icon: <DesktopOutlined /> },
  { key: "weather-radio", icon: <CloudOutlined /> },
  { key: "phone-remote", icon: <MobileOutlined /> },
  { key: "dual-device", icon: <MobileOutlined /> },
];

export interface FeatureModule {
  key: string;
  icon: React.ReactNode;
}

/** 16 个功能模块：title / summary / items 在词典 features.<key> 中维护 */
export const featureModules: FeatureModule[] = [
  { key: "dashboard", icon: <HomeOutlined /> },
  { key: "nas", icon: <CloudServerOutlined /> },
  { key: "local", icon: <FolderOpenOutlined /> },
  { key: "online", icon: <GlobalOutlined /> },
  { key: "discover", icon: <CompassOutlined /> },
  { key: "weather", icon: <CloudOutlined /> },
  { key: "baidu", icon: <BaiduOutlined /> },
  { key: "lyric", icon: <CustomerServiceOutlined /> },
  { key: "playback", icon: <PlayCircleOutlined /> },
  { key: "cover", icon: <PictureOutlined /> },
  { key: "photo-wall", icon: <PictureOutlined /> },
  { key: "library", icon: <UnorderedListOutlined /> },
  { key: "mine", icon: <HeartOutlined /> },
  { key: "settings", icon: <SettingOutlined /> },
  { key: "tv", icon: <DesktopOutlined /> },
  { key: "mobile", icon: <MobileOutlined /> },
];

/**
 * 界面预览的 17 个界面（有序）：name / desc / tag / 遥控交互 hint 在词典 screens.<key> 中维护。
 * key 同时作为 data/screenshots.ts 中截图配置的键。
 */
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
