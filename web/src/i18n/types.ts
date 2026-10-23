/**
 * 多语言体系 · 类型定义
 *
 * 语言清单与持久化 key 的唯一来源。新增语言时：
 *   1. 在 `Lang` 联合类型与 `LANGS` 中各加一项；
 *   2. 在 `locales/` 下新建对应字典文件，并满足 `Dict` 类型（tsc 会强制校验键齐全）；
 *   3. 在 `dictionaries` 中登记。
 */

/** 站点支持的语言（BCP 47 标签，同时用作 <html lang> 与 antd locale 的键） */
export type Lang = "zh-CN" | "en-US";

/** 全部语言（顺序即语言切换按钮的展示顺序） */
export const LANGS: readonly Lang[] = ["zh-CN", "en-US"];

/** localStorage 持久化 key */
export const LANG_STORAGE_KEY = "nasmusictv.lang";

/** URL 查询参数名：访问 <链接>?lang=en 直接以英文打开（并记住选择） */
export const LANG_PARAM = "lang";

/** 把 URL / localStorage 里的宽松写法归一化为受支持的语言；无法识别返回 null */
export function normalizeLang(input: string | null | undefined): Lang | null {
  if (!input) return null;
  const v = input.trim().toLowerCase().replace(/_/g, "-");
  if (v === "zh" || v === "zh-cn" || v === "cn" || v === "chinese" || v === "中文") return "zh-CN";
  if (v === "en" || v === "en-us" || v === "english") return "en-US";
  return null;
}

/** 每种语言的展示名（用于语言切换按钮与无障碍标签） */
export const LANG_LABELS: Record<Lang, { native: string; short: string }> = {
  "zh-CN": { native: "中文", short: "中" },
  "en-US": { native: "English", short: "EN" },
};
