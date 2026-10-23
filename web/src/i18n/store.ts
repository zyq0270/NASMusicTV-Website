/**
 * 多语言体系 · 语言状态存储
 *
 * 选择优先级：用户手动切换（localStorage 持久化）> 浏览器语言（navigator.language）。
 * 与 React 解耦：任何模块都能读写当前语言；组件通过 useSyncExternalStore 订阅。
 */

import { LANGS, LANG_PARAM, LANG_STORAGE_KEY, normalizeLang, type Lang } from "./types";

/**
 * 初始语言探测，优先级从高到低：
 *   1. URL 查询参数 ?lang=en / ?lang=zh —— 分享链接可直达指定语言（显式意图，最高优先）
 *   2. localStorage 中用户上次的选择
 *   3. 浏览器语言 navigator.language（中文 → zh-CN，其余 → en-US）
 * 命中第 1 项时会写回 localStorage，后续站内跳转（不带参数）保持该语言。
 */
function detectInitialLang(): Lang {
  try {
    const param = new URLSearchParams(window.location.search).get(LANG_PARAM);
    const fromParam = normalizeLang(param);
    if (fromParam) {
      window.localStorage.setItem(LANG_STORAGE_KEY, fromParam);
      return fromParam;
    }
  } catch {
    // location / localStorage 不可用时继续向下探测
  }
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && (LANGS as readonly string[]).includes(stored)) {
      return stored as Lang;
    }
  } catch {
    // localStorage 不可用（隐私模式等）时走浏览器语言推断
  }
  const nav = typeof navigator !== "undefined" ? navigator.language ?? "" : "";
  return nav.toLowerCase().startsWith("zh") ? "zh-CN" : "en-US";
}

let current: Lang = detectInitialLang();
const listeners = new Set<() => void>();

/** 同步 <html lang>，保证无障碍与 SEO 语义随语言切换 */
function syncHtmlLang(lang: Lang): void {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
  }
}

syncHtmlLang(current);

export const langStore = {
  /** 当前语言（快照，供 useSyncExternalStore 使用） */
  get: (): Lang => current,

  /** 切换语言：持久化 + 同步 <html lang> + 通知订阅者 */
  set: (lang: Lang): void => {
    if (lang === current) return;
    current = lang;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // 持久化失败不影响本次切换
    }
    syncHtmlLang(lang);
    listeners.forEach((listener) => listener());
  },

  /** 订阅语言变化，返回取消订阅函数 */
  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
