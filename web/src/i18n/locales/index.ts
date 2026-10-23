/**
 * 多语言体系 · 词典登记表
 *
 * 新增语言时在此登记（字典文件需满足 Dict 类型，见 locales/zh-CN）。
 */

import type { Lang } from "../types";
import type { Dict } from "./zh-CN";
import { zhCN } from "./zh-CN";
import { enUS } from "./en-US";

export const dictionaries: Record<Lang, Dict> = {
  "zh-CN": zhCN,
  "en-US": enUS,
};
