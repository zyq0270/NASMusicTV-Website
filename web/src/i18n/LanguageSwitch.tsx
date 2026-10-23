/**
 * 多语言体系 · 语言切换按钮
 *
 * 顶栏右侧的分段开关（中文 / EN），点击即切换并持久化。
 * 样式见 styles.css 的 .lang-switch。
 */

import { useI18n } from "./useI18n";
import { LANGS, LANG_LABELS } from "./types";

export default function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="lang-switch" role="group" aria-label={t("langSwitch.label")}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className={lang === code ? "on" : ""}
          aria-pressed={lang === code}
          lang={code}
          onClick={() => setLang(code)}
        >
          {LANG_LABELS[code].short}
        </button>
      ))}
    </div>
  );
}
