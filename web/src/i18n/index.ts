/**
 * 多语言体系 · 统一出口
 *
 * 使用方式：
 *   import { useI18n, I18nProvider, LanguageSwitch } from "../i18n";
 */

export { default as I18nProvider } from "./I18nProvider";
export { default as LanguageSwitch } from "./LanguageSwitch";
export { useI18n } from "./useI18n";
export type { I18n } from "./useI18n";
export { langStore } from "./store";
export { LANGS, LANG_LABELS, LANG_STORAGE_KEY, type Lang } from "./types";
