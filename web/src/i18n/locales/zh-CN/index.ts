/**
 * 多语言体系 · 中文词典（zh-CN）汇总
 *
 * 合并各分片并推导出 Dict 类型：en-US 必须满足该类型（编译期强制键齐全、形状一致）。
 */

import { zhCommon } from "./common";
import { zhHighlights } from "./highlights";
import { zhFeatures } from "./features";
import { zhScreens } from "./screens";
import { zhSupport } from "./support";
import { zhPages } from "./pages";

export const zhCN = {
  ...zhCommon,
  ...zhHighlights,
  ...zhFeatures,
  ...zhScreens,
  ...zhSupport,
  ...zhPages,
};

/** 词典类型基准：由中文词典推导，其他语言必须与之形状一致 */
export type Dict = typeof zhCN;
