import { useState, type ReactNode } from "react";
import {
  CheckCircleOutlined,
  DownloadOutlined,
  GithubOutlined,
  LaptopOutlined,
  MobileOutlined,
  TabletOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import {
  APK_DOWNLOAD_URL,
  APK_FILE_NAME,
  APK_RELEASES_LATEST,
  APK_RELEASES_GITEE,
  APK_SIZE,
  APK_VERSION,
  CHANGELOG_RANGE,
  recentChangelog,
  site,
} from "../data/site";
import { useI18n } from "../i18n";

/** 下载页设备卡片图标（与词典 downloadPage.devices 顺序一一对应） */
const DEVICE_ICONS: ReactNode[] = [
  <MobileOutlined key="phone" />,
  <TabletOutlined key="tablet" />,
  <DesktopOutlined key="tv" />,
  <LaptopOutlined key="emulator" />,
];

/** 版本摘要的词典键：v2.39.18 → changelog.v2_39_18（点号转下划线） */
const changelogKey = (version: string) => `changelog.${version.replace(/\./g, "_")}`;

export default function DownloadPage() {
  const { t, tv } = useI18n();

  const abis = tv<{ name: string; desc: string }[]>("downloadPage.abis");
  const devices = tv<{ title: string; desc: ReactNode }[]>("downloadPage.devices");
  const faqs = tv<{ q: string; a: string }[]>("faqs");
  const [showAllChangelog, setShowAllChangelog] = useState(false);
  const visibleChangelog = showAllChangelog
    ? recentChangelog
    : recentChangelog.slice(0, 3);

  return (
    <>
      <section className="download-hero">
        <div className="container">
          <span className="section-eyebrow">Download</span>
          <h1 className="section-title">
            {t("downloadPage.title")}
            <span className="gradient-text">{t("downloadPage.titleSub")}</span>
          </h1>
          <p className="section-desc">{t("downloadPage.desc")}</p>
          <div className="hero-badges" style={{ marginTop: 24 }}>
            <span className="pill pill-strong">{t("downloadPage.latestVersion", { version: APK_VERSION })}</span>
            <span className="pill">{t("downloadPage.universalApk")}</span>
            <span className="pill">{t("downloadPage.allDevices")}</span>
          </div>
          <div style={{ marginTop: 26, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href={APK_DOWNLOAD_URL} target="_blank" rel="noreferrer" className="cta-primary">
              <DownloadOutlined /> {t("downloadPage.downloadBtn", { version: APK_VERSION })}
            </a>
            <a href={APK_RELEASES_LATEST} target="_blank" rel="noreferrer" className="cta-ghost">
              <GithubOutlined /> GitHub Releases
            </a>
          </div>
          <p className="hero-note">
            {t("downloadPage.giteeDirectHint")}
          </p>
          <p className="hero-note">{t("downloadPage.licenseNote", { license: site.license })}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="apk-panel">
            <div className="apk-meta">
            <div className="apk-size-note">{t("downloadPage.sizeWhy", { size: APK_SIZE })}</div>
              <span className="pill pill-strong">{t("downloadPage.apkLatest", { version: APK_VERSION })}</span>
              <div className="apk-filename">{APK_FILE_NAME}</div>
              <div className="apk-tags">
                <span className="pill">{t("downloadPage.apkTagUniversal")}</span>
                <span className="pill">{t("downloadPage.apkTagOverwrite")}</span>
              </div>
              {recentChangelog.length > 0 && (
                <div className="apk-changelog">
                  <div className="apk-changelog-title">
                    {t("downloadPage.changelogTitle", { range: CHANGELOG_RANGE })}
                  </div>
                  <div className="apk-changelog-list">
                    {visibleChangelog.map((entry) => (
                      <div
                        className={`apk-changelog-item${entry.highlight ? " apk-changelog-item--highlight" : ""}`}
                        key={entry.version}
                      >
                        <div className="apk-changelog-header">
                          <span className="apk-changelog-version">{entry.version}</span>
                          <span className="apk-changelog-date">{entry.date}</span>
                          {entry.highlight && <span className="apk-changelog-badge">{t("downloadPage.badgeNew")}</span>}
                        </div>
                        <div className="apk-changelog-summary">{t(changelogKey(entry.version))}</div>
                      </div>
                    ))}
                  </div>
                  {recentChangelog.length > 3 && (
                    <button
                      type="button"
                      className="changelog-toggle"
                      onClick={() => setShowAllChangelog((v) => !v)}
                      aria-expanded={showAllChangelog}
                    >
                      {showAllChangelog
                        ? t("downloadPage.showLessUpdates")
                        : t("downloadPage.showAllUpdates")}
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="apk-actions">
              <a href={APK_DOWNLOAD_URL} target="_blank" rel="noreferrer" className="cta-primary">
                <DownloadOutlined /> {t("downloadPage.directDownload")}
              </a>
              <a href={APK_RELEASES_LATEST} target="_blank" rel="noreferrer" className="cta-ghost">
                <GithubOutlined /> {t("downloadPage.viewOnGithub")}
              </a>
              <a href={APK_RELEASES_GITEE} target="_blank" rel="noreferrer" className="cta-ghost">
                {t("downloadPage.giteeReleases")}
              </a>
              <span className="apk-action-note">{t("downloadPage.apkNote")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">{t("downloadPage.devicesTitle")}</h2>
            <p className="section-desc">{t("downloadPage.devicesDesc")}</p>
          </div>
          <div className="grid grid-4">
            {devices.map((d, i) => (
              <div className="card" key={d.title}>
                <div className="card-icon">{DEVICE_ICONS[i]}</div>
                <div className="card-title">{d.title}</div>
                <div className="card-desc">{d.desc}</div>
              </div>
            ))}
          </div>

          <div className="section-head" style={{ marginTop: 36 }}>
            <h3 className="section-title" style={{ fontSize: 20 }}>
              {t("downloadPage.abiTitle")}
            </h3>
            <p className="section-desc">{t("downloadPage.abiDesc")}</p>
          </div>
          <div className="arch-list">
            {abis.map((a) => (
              <div className="arch-card" key={a.name}>
                <div className="arch-name">
                  <CheckCircleOutlined className="arch-check" />
                  {a.name}
                  <span className="arch-tag">{t("downloadPage.abiTag")}</span>
                </div>
                <div className="arch-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-title">{t("downloadPage.faqTitle")}</h2>
            <p className="section-desc">{t("downloadPage.faqDesc")}</p>
          </div>

          {faqs.map((f) => (
            <div className="faq-item" key={f.q}>
              <details>
                <summary>
                  <span className="faq-q">{f.q}</span>
                </summary>
                <div className="faq-a">{f.a}</div>
              </details>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <h3>{t("downloadPage.ctaTitle")}</h3>
            <p>{t("downloadPage.ctaDesc")}</p>
            <div className="cta-band-actions">
              <a href={site.repo} target="_blank" rel="noreferrer" className="cta-primary">
                <DownloadOutlined /> {t("downloadPage.docsBtn")}
              </a>
              <a href={`${site.repo}/issues`} target="_blank" rel="noreferrer" className="cta-ghost">
                {t("downloadPage.issueBtn")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
