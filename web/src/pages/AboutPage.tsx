import { Tag } from "antd";
import {
  ApiOutlined,
  CodeOutlined,
  CopyrightOutlined,
  DownloadOutlined,
  GithubOutlined,
  HeartOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { site, stats, APK_DOWNLOAD_URL, APK_VERSION } from "../data/site";
import { useI18n } from "../i18n";

export default function AboutPage() {
  const { t, ta, tv } = useI18n();
  const apiEntries = tv<{ name: string; desc: string; type: string }[]>("api.entries");
  const devices = ta("site.devices").join(" / ");

  return (
    <>
      <section className="download-hero">
        <div className="container">
          <span className="section-eyebrow">About</span>
          <h1 className="section-title">
            {t("aboutPage.aboutTitle")} <span className="gradient-text">{site.name}</span>
          </h1>          <p className="section-desc">{t("site.subtitle")}</p>
          <div style={{ marginTop: 22, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="pill pill-strong">{t("aboutPage.openSource", { license: site.license })}</span>
            <span className="pill">{devices}</span>
            <span className="pill">{t("aboutPage.noAds")}</span>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="stats" style={{ marginBottom: 40 }}>
            {stats.map((s) => (
              <div className="stat-card" key={s.key}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{t(`stats.${s.key}`)}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-2">
            <div className="card">
              <div className="card-icon">
                <CodeOutlined />
              </div>
              <div className="card-title">{t("aboutPage.positionTitle")}</div>
              <div className="card-desc">{t("aboutPage.positionDesc", { name: site.name })}</div>
            </div>
            <div className="card">
              <div className="card-icon">
                <DownloadOutlined />
              </div>
              <div className="card-title">{t("aboutPage.releaseTitle")}</div>
              <div className="card-desc">
                {t("aboutPage.releaseDesc", { version: APK_VERSION.replace(/^v/, "") })}
              </div>
              <div style={{ marginTop: 18 }}>
                <a href={site.releases} target="_blank" rel="noreferrer" className="cta-ghost">
                  <DownloadOutlined /> {t("footer.releases")}
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-2" style={{ marginTop: 20 }}>
            <div className="card">
              <div className="card-icon">
                <SafetyCertificateOutlined />
              </div>
              <div className="card-title">{t("aboutPage.licenseTitle")}</div>
              <div className="card-desc">
                {t("aboutPage.licenseDescBefore")} <Tag color="purple">{site.license}</Tag>{" "}
                {t("aboutPage.licenseDescAfter")}
              </div>
            </div>
            <div className="card">
              <div className="card-icon">
                <HeartOutlined />
              </div>
              <div className="card-title">{t("aboutPage.thanksTitle")}</div>
              <div className="card-desc">{t("aboutPage.thanksDesc")}</div>
            </div>
            <div className="card" style={{ gridColumn: "1 / -1" }}>
              <div className="card-icon">
                <CopyrightOutlined />
              </div>
              <div className="card-title">{t("aboutPage.copyrightTitle")}</div>
              <div className="card-desc">
                {t("aboutPage.copyrightDescBefore")}{" "}
                <a href={`${site.repo}/issues`} target="_blank" rel="noreferrer">
                  {t("aboutPage.copyrightLink")}
                </a>
                {t("aboutPage.copyrightDescAfter")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">API</span>
            <h2 className="section-title">{t("aboutPage.apiTitle")}</h2>
            <p className="section-desc">{t("aboutPage.apiDesc")}</p>
          </div>

          <table className="api-table">
            <thead>
              <tr>
                <th style={{ width: "38%" }}>{t("aboutPage.tableService")}</th>
                <th>{t("aboutPage.tableDesc")}</th>
                <th style={{ width: "16%" }}>{t("aboutPage.tableSource")}</th>
              </tr>
            </thead>
            <tbody>
              {apiEntries.map((a) => (
                <tr key={a.name}>
                  <td>{a.name}</td>
                  <td>{a.desc}</td>
                  <td>{a.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center" }}>
            <div>
              <div className="card-icon">
                <ApiOutlined />
              </div>
              <h2 className="section-title">{t("aboutPage.starTitle")}</h2>
              <p className="section-desc">{t("aboutPage.starDesc")}</p>
              <div style={{ marginTop: 24, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a href={site.repo} target="_blank" rel="noreferrer" className="cta-primary">
                  <GithubOutlined /> {t("aboutPage.starBtn")}
                </a>
                <a href={site.giteeRepo} target="_blank" rel="noreferrer" className="cta-ghost">
                  <CodeOutlined /> {t("aboutPage.giteeBtn")}
                </a>
                <a href={site.stars} target="_blank" rel="noreferrer" className="cta-ghost">
                  {t("aboutPage.historyBtn")}
                </a>
              </div>
            </div>
            <div className="card">
              <div className="card-title">{t("aboutPage.contributeTitle")}</div>
              <ul className="check-list">
                {ta("aboutPage.contributeItems").map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <h3>{t("aboutPage.ctaTitle")}</h3>
            <p>{t("aboutPage.ctaDesc")}</p>
            <div className="cta-band-actions">
              <a href={APK_DOWNLOAD_URL} target="_blank" rel="noreferrer" className="cta-primary">
                <DownloadOutlined /> {t("aboutPage.downloadBtn")}
              </a>
              <a href={`${site.repo}/issues`} target="_blank" rel="noreferrer" className="cta-ghost">
                {t("aboutPage.feedbackBtn")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
