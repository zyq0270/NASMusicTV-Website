import { DownloadOutlined, GithubOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { screenKeys, site } from "../data/site";
import Screenshot from "../components/Screenshot";
import { screenShots } from "../data/screenshots";
import { useI18n } from "../i18n";

export default function ScreensPage() {
  const { t, ta } = useI18n();

  return (
    <>
      <section className="download-hero">
        <div className="container">
          <span className="section-eyebrow">Screens</span>
          <h1 className="section-title">
            {t("screensPage.title")}
            <span className="gradient-text">{t("screensPage.titleSub")}</span>
          </h1>
          <p className="section-desc">{t("screensPage.desc")}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="screens-list">
            {screenKeys.map((key, idx) => {
              const shot = screenShots[key];
              const isReversed = idx % 2 === 1;
              const name = t(`screens.${key}.name`);
              return (
                <div
                  className={`screen-row ${isReversed ? "screen-row-reversed" : ""}`}
                  key={key}
                >
                  <div className="screen-image">
                    {shot ? (
                      <Screenshot {...shot} alt={t("screensPage.screenShotAlt", { name })} />
                    ) : (
                      <div className="screen-thumb">
                        <div className="shot-placeholder">
                          <div className="shot-title">{name}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="screen-text">
                    <div className="screen-name">
                      {name}
                      <span className="tag">{t(`screens.${key}.tag`)}</span>
                    </div>
                    <div className="screen-desc">{t(`screens.${key}.desc`)}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-2" style={{ marginTop: 44 }}>
            <div className="card">
              <div className="card-title">{t("screensPage.tvCardTitle")}</div>
              <ul className="check-list">
                {ta("screensPage.tvCardItems").map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <div className="card-title">{t("screensPage.phoneCardTitle")}</div>
              <ul className="check-list">
                {ta("screensPage.phoneCardItems").map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link to="/download" className="cta-primary">
              <DownloadOutlined /> {t("nav.download")}
            </Link>
            <Link to="/features" className="cta-ghost">
              {t("screensPage.featuresBtn")}
            </Link>
            <a href={site.repo} target="_blank" rel="noreferrer" className="cta-ghost">
              <GithubOutlined /> {t("screensPage.githubBtn")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
