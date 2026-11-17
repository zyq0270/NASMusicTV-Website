import { useEffect, useState } from "react";
import { useI18n } from "../i18n";

/**
 * 回到顶部按钮。
 *
 * 行为：滚动超过 400px 后淡入，点击平滑滚动回顶，回到顶部附近淡出。
 * 可访问性：按钮可见时可通过 Tab 聚焦，带 aria-label；用户系统开启 reduced-motion
 * 时退回即时滚动（不做平滑动画）。
 */
export default function BackToTop() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 400);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => {
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={toTop}
      aria-label={t("common.backToTop")}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
