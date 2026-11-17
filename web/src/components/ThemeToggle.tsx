import { useEffect, useState } from "react";
import { useI18n } from "../i18n";

const STORAGE_KEY = "nasmusictv.theme";
type Theme = "dark" | "light";

/** 读取初始主题：优先 <html data-theme>（由 index.html 内联脚本预设），否则默认深色 */
function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

/**
 * 明暗主题切换按钮。
 *
 * - 通过 <html data-theme="light|dark"> 驱动 theme.css 中的浅色覆盖；
 * - 选择持久化到 localStorage（键 nasmusictv.theme）；
 * - 首屏由 index.html 内联脚本预设，避免闪烁。
 */
export default function ThemeToggle() {
  const { t } = useI18n();
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* 隐私模式等场景忽略持久化失败 */
    }
  }, [theme]);

  const toggle = () => setTheme((v) => (v === "dark" ? "light" : "dark"));

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={t("header.themeToggle")}
      title={t("header.themeToggle")}
    >
      {theme === "dark" ? (
        /* 深色模式下显示「太阳」图标（提示切换到浅色） */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7" />
        </svg>
      ) : (
        /* 浅色模式下显示「月亮」图标（提示切换到深色） */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8z" />
        </svg>
      )}
    </button>
  );
}
