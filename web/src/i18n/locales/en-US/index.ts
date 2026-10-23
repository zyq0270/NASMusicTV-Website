/**
 * 多语言体系 · English dictionary (en-US) 汇总
 *
 * 合并各分片；类型必须与 zh-CN 推导出的 Dict 一致（缺键 / 形状不一致会在 tsc 报错）。
 */

import type { Dict } from "../zh-CN";
import { enCommon } from "./common";
import { enHighlights } from "./highlights";
import { enFeatures } from "./features";
import { enScreens } from "./screens";
import { enSupport } from "./support";
import { enPages } from "./pages";

export const enUS: Dict = {
  ...enCommon,
  ...enHighlights,
  ...enFeatures,
  ...enScreens,
  ...enSupport,
  ...enPages,
};
