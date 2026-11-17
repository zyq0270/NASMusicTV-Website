import { useCallback, useState } from "react";

/**
 * 通用布尔开关，用于视图 / 模式之间的简单切换
 * （例如截图卡片的「模拟图 / 实机截图」）。
 *
 * 返回 [当前值, 切换函数, 直接设值函数]，供多个组件统一切换逻辑。
 */
export function useToggle(
  initial = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle, setValue];
}
