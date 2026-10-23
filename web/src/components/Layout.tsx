import React, { useEffect, useState } from "react";
import { Button } from "antd";
import {
  PlayCircleFilled,
  GithubOutlined,
  MenuOutlined,
  CloseOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { site, APK_DOWNLOAD_URL, APK_VERSION } from "../data/site";
import { SITE_VERSION } from "../version";
import { useI18n } from "../i18n";
import LanguageSwitch from "../i18n/LanguageSwitch";

/** 导航项：path 为路由，labelKey 为词典 nav.<key> */
const NAV = [
  { path: "/", labelKey: "home" },
  { path: "/features", labelKey: "features" },
  { path: "/screens", labelKey: "screens" },
  { path: "/effects", labelKey: "effects" },
  { path: "/download", labelKey: "download" },
  { path: "/about", labelKey: "about" },
] as const;

/** 页脚「产品」链接列：与导航同构 */
const FOOTER_PRODUCT = NAV.slice(1);

/** 页脚「支持的音乐源」（产品名，不随语言变化） */
const MUSIC_SOURCES = [
  "Jellyfin / Navidrome",
  "Subsonic / 道理鱼 / 飞牛",
  "网络音乐 / 百度网盘",
  "Jamendo / 公共电台",
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  /* 【美化要点 · 导航栏滚动状态】
     滚动超过 100px 后，导航背景由透明渐变为 rgba(10,14,20,.9) + 毛玻璃模糊。
     使用 requestAnimationFrame 节流，避免滚动时高频 setState 造成掉帧。 */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 100);
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

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="header-inner">
          <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label={t("header.homeAria", { name: site.name })}>
            <span className="brand-logo">
              <PlayCircleFilled />
            </span>
            <span>
              {site.name}
              <span className="brand-sub">{t("header.brandSub")}</span>
            </span>
          </Link>

          <nav className={`nav-links${open ? " open" : ""}`} aria-label={t("nav.aria")}>
            {NAV.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={pathname === item.path ? "active" : ""}
                aria-current={pathname === item.path ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {t(`nav.${item.labelKey}`)}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <LanguageSwitch />
            <Button
              className="mobile-menu-btn"
              type="text"
              icon={open ? <CloseOutlined /> : <MenuOutlined />}
              onClick={() => setOpen(!open)}
              aria-label={t("common.menu")}
            />
            <a href={site.repo} target="_blank" rel="noreferrer">
              <Button type="text" icon={<GithubOutlined />} style={{ color: "#98a2bf" }}>
                {t("common.source")}
              </Button>
            </a>
            <a href={APK_DOWNLOAD_URL} download title={t("header.downloadTitle", { version: APK_VERSION })}>
              <Button type="primary" icon={<DownloadOutlined />}>
                {t("common.download")}
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="site-content">{children}</main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Link to="/" className="brand">
                <span className="brand-logo">
                  <PlayCircleFilled />
                </span>
                <span>{site.name}</span>
              </Link>
              <p className="footer-brand-desc">{t("footer.brandDesc")}</p>
            </div>
            <div>
              <div className="footer-title">{t("footer.product")}</div>
              <div className="footer-links">
                {FOOTER_PRODUCT.map((item) => (
                  <Link key={item.path} to={item.path}>
                    {t(`nav.${item.labelKey}`)}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="footer-title">{t("footer.resources")}</div>
              <div className="footer-links">
                <a href={site.repo} target="_blank" rel="noreferrer">
                  {t("footer.githubRepo")}
                </a>
                <a href={site.releases} target="_blank" rel="noreferrer">
                  {t("footer.releases")}
                </a>
                <a href={`${site.repo}#readme`} target="_blank" rel="noreferrer">
                  {t("footer.docs")}
                </a>
                <a href={`${site.repo}/issues`} target="_blank" rel="noreferrer">
                  {t("footer.issues")}
                </a>
              </div>
            </div>
            <div>
              <div className="footer-title">{t("footer.musicSources")}</div>
              <div className="footer-links">
                {MUSIC_SOURCES.map((s) => (
                  <span key={s} style={{ fontSize: 13, color: "#98a2bf" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              {t("footer.copyright", {
                year: new Date().getFullYear(),
                name: site.name,
                version: SITE_VERSION,
                license: site.license,
              })}
            </span>
            <span>{t("footer.disclaimer")}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
