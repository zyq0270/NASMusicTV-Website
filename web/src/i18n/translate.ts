/**
 * 多语言体系 · 翻译函数
 *
 * 键为点分路径，支持：
 *   - 字符串取值        t("nav.home")
 *   - {param} 插值      t("footer.copyright", { year, name, version, license })
 *   - 字符串数组        ta("features.nas.items")
 *   - 任意结构化值      tv<{ title: string; desc: ReactNode }[]>("downloadPage.devices")
 * 路径段可为数组下标（数字），如 t("faqs.0.q")。
 */

import type { Lang } from "./types";
import { dictionaries } from "./locales";

/** 按点分路径在词典中取值（对象 / 数组均可下钻；取不到返回 undefined） */
function lookup(lang: Lang, key: string): unknown {
  return key.split(".").reduce<unknown>((node, seg) => {
    if (node == null) return undefined;
    if (Array.isArray(node)) {
      const idx = Number(seg);
      return Number.isInteger(idx) ? node[idx] : undefined;
    }
    return (node as Record<string, unknown>)[seg];
  }, dictionaries[lang]);
}

/** 开发环境下对缺失键告警，便于翻译补全；生产环境静默回退为键名 */
function warnMissing(lang: Lang, key: string): undefined {
  if (import.meta.env.DEV) {
    console.warn(`[i18n] missing key "${key}" for locale "${lang}"`);
  }
  return undefined;
}

/** 取字符串文案，支持 {param} 插值 */
export function translate(
  lang: Lang,
  key: string,
  params?: Record<string, string | number>
): string {
  const raw = lookup(lang, key);
  if (typeof raw !== "string") {
    warnMissing(lang, key);
    return key;
  }
  if (!params) return raw;
  return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match
  );
}

/** 取字符串数组（功能条目、清单项等） */
export function translateArray(lang: Lang, key: string): string[] {
  const raw = lookup(lang, key);
  if (!Array.isArray(raw)) {
    warnMissing(lang, key);
    return [];
  }
  return raw as string[];
}

/** 取任意结构化值（对象数组等），调用方用泛型声明形状 */
export function translateValue<T>(lang: Lang, key: string): T {
  const raw = lookup(lang, key);
  if (raw === undefined) {
    warnMissing(lang, key);
    return [] as unknown as T;
  }
  return raw as T;
}
