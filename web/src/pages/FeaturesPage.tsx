import { Tag } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { featureModules, site } from "../data/site";
import { useI18n } from "../i18n";

export default function FeaturesPage() {
  const { t, ta } = useI18n();
  const pills = [...ta("site.devices"), t("featuresPage.licensePill")];

  return (
    <>
      <section className="download-hero">
        <div className="container">
          <span className="section-eyebrow">Features</span>
          <h1 className="section-title">
            {t("featuresPage.title")}
            <span className="gradient-text">{t("featuresPage.titleCount", { count: featureModules.length })}</span>
          </h1>
          <p className="section-desc">{t("featuresPage.desc")}</p>
          <div style={{ marginTop: 22, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {pills.map((text) => (
              <span className="pill" key={text}>
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="features-layout">
            <aside className="anchor-nav">
              {featureModules.map((m) => (
                <a key={m.key} href={`#${m.key}`}>
                  {t(`features.${m.key}.title`)}
                </a>
              ))}
            </aside>

            <div>
              {featureModules.map((m) => (
                <div className="module-block" id={m.key} key={m.key}>
                  <div className="module-block-head">
                    <span className="card-icon" style={{ margin: 0 }}>
                      {m.icon}
                    </span>
                    <div>
                      <div className="module-block-title">{t(`features.${m.key}.title`)}</div>
                      <div className="card-summary" style={{ margin: "4px 0 0" }}>
                        {t(`features.${m.key}.summary`)}
                      </div>
                    </div>
                  </div>
                  <ul className="check-list" style={{ marginTop: 14 }}>
                    {ta(`features.${m.key}.items`).map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="cta-band" style={{ marginTop: 8 }}>
                <h3>{t("featuresPage.ctaTitle")}</h3>
                <p>{t("featuresPage.ctaDesc")}</p>
                <div className="cta-band-actions">
                  <Link to="/download" className="cta-primary">
                    <DownloadOutlined /> {t("featuresPage.goDownload")}
                  </Link>
                  <a href={site.repo} target="_blank" rel="noreferrer" className="cta-ghost">
                    {t("featuresPage.viewSource")}
                  </a>
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <Tag color="purple">{t("featuresPage.tipTag")}</Tag>
                <span style={{ fontSize: 13, color: "#98a2bf" }}>{t("featuresPage.tipText")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
