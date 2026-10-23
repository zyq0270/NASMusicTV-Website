/**
 * 多语言体系 · React Hook
 *
 * 用法：
 *   const { lang, setLang, t, ta, tv } = useI18n();
 *   t("nav.home")                                  // 字符串
 *   t("footer.copyright", { year, name, version }) // 插值
 *   ta("features.nas.items")                       // 字符串数组
 *   tv<{ title: string }[]>("downloadPage.devices") // 结构化值
 */

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { langStore } from "./store";
import { translate, translateArray, translateValue } from "./translate";

export interface I18n {
  lang: import("./types").Lang;
  setLang: (lang: import("./types").Lang) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  ta: (key: string) => string[];
  tv: <T>(key: string) => T;
}

export function useI18n(): I18n {
  const lang = useSyncExternalStore(langStore.subscribe, langStore.get, langStore.get);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => translate(lang, key, params),
    [lang]
  );
  const ta = useCallback((key: string) => translateArray(lang, key), [lang]);
  const tv = useCallback(<T,>(key: string) => translateValue<T>(lang, key), [lang]);

  return useMemo(() => ({ lang, setLang: langStore.set, t, ta, tv }), [lang, t, ta, tv]);
}
