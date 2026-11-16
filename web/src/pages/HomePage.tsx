/**
 * 首页 · NAS Music TV 产品介绍页
 *
 * 【美化要点 · 整体设计方向】
 * 深色沉浸 + 电视大屏质感 + 音乐播放器氛围（按「3 米观看距离」定尺寸与对比度）：
 *   Hero（100vh 全屏 + 封面模糊光晕 + 浮动光点粒子 + 电视外框主视觉）
 *   → 统计（JetBrains Mono 等宽大字）
 *   → Highlights（4 列卡片网格，图标 + 短标题 + 一句话）
 *   → Features（16 个模块，3 列卡片瀑布流，图标 + 标题 + 两行描述）
 *   → Screens（6 个 16:9 CSS 绘制的 TV 界面 mockup + 一行核心交互说明）
 *   → 底部 CTA（大号文案 + 青绿下载按钮居中）
 *
 * 【美化要点 · 功能与语义不变】
 * 所有下载 / GitHub 链接、react-router 路由跳转、文案内容均与原页面保持一致，
 * 仅替换视觉表现层；界面预览在 mockup 与实机截图之间可一键切换（原有截图能力保留）。
 *
 * 【美化要点 · 交互与性能】
 * - 卡片 hover / focus：translateY(-4px) + 青绿描边 + 阴影增强，过渡 0.25s ease
 * - 滚动渐入：Intersection Observer 触发 opacity 0→1 + translateY(20px)→0
 * - 粒子与光晕只使用 transform / opacity 做动画（合成层属性，will-change 见 CSS），不触发布局重排
 * - 图标全部为内联 SVG，mockup 全部为 CSS 绘制，页面不新增任何第三方库与图片请求
 *
 * 【多语言体系】全部文案经 useI18n() 的 t() / ta() 从词典取值（中英双语），
 * 结构与图标数据来自 data/site.tsx。
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { site, stats, highlights, featureModules, screenKeys, APK_DOWNLOAD_URL, APK_VERSION } from "../data/site";
import { useScreenshots } from "../hooks/useScreenshots";
import { heroShot, screenShots } from "../data/screenshots";
import { TvIcon } from "../components/TvIcons";
import { useI18n } from "../i18n";
import "../styles/home.css";

/* --------------------------------------------------------------------------
 * 1. 滚动渐入：Intersection Observer（用户关闭动效时直接显示，不做任何动画）
 * -------------------------------------------------------------------------- */
function useRevealOnScroll() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".tv-reveal"));
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

/* --------------------------------------------------------------------------
 * 2. 数据映射：图标 / mockup / 核心交互提示（键与 data/site.tsx 的 key 对应）
 * -------------------------------------------------------------------------- */
/** 9 个核心卖点 → 内联 SVG 图标名 */
const HIGHLIGHT_ICONS: Record<string, string> = {
  "multi-source": "server",
  "karaoke-lyric": "lyric",
  karaoke: "mic",
  mtv: "video",
  "weather-radio": "cloud",
  "dual-device": "devices",
};

/** 16 个功能模块 → 内联 SVG 图标名 */
const FEATURE_ICONS: Record<string, string> = {
  dashboard: "home",
  nas: "server",
  local: "folder",
  online: "globe",
  discover: "compass",
  weather: "cloud",
  baidu: "cloudnet",
  lyric: "lyric",
  playback: "play",
  cover: "image",
  library: "list",
  mine: "heart",
  settings: "settings",
  tv: "tv",
  mobile: "phone",
};

/** 界面 → CSS mockup 类型（前 6 个界面均为 TV 端核心界面） */
type MockKind = "dashboard" | "player" | "karaoke" | "mtv" | "visualizer" | "library";

const SCREEN_MOCKS: Record<string, MockKind> = {
  dashboard: "dashboard",
  player: "player",
  karaoke: "karaoke",
  mtv: "mtv",
  visualizer: "visualizer",
  library: "library",
};

/** Hero 浮动光点粒子（低性能消耗：纯 CSS transform 动画） */
const PARTICLES: Array<{
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  purple?: boolean;
}> = [
  { left: "6%", top: "24%", size: 6, delay: "0s", duration: "19s" },
  { left: "16%", top: "68%", size: 4, delay: "2.4s", duration: "23s", purple: true },
  { left: "28%", top: "14%", size: 5, delay: "4.1s", duration: "21s" },
  { left: "38%", top: "80%", size: 7, delay: "1.2s", duration: "26s", purple: true },
  { left: "52%", top: "12%", size: 4, delay: "5.6s", duration: "22s" },
  { left: "62%", top: "72%", size: 6, delay: "3.3s", duration: "24s" },
  { left: "74%", top: "30%", size: 5, delay: "6.4s", duration: "20s", purple: true },
  { left: "84%", top: "62%", size: 4, delay: "2.1s", duration: "25s" },
  { left: "91%", top: "20%", size: 6, delay: "7.2s", duration: "23s" },
  { left: "46%", top: "46%", size: 3, delay: "1.8s", duration: "18s" },
];

/** 音频波形示意条（mockup 内使用） */
const WAVE_BARS = [0.4, 0.75, 1, 0.55, 0.9, 0.35, 0.8, 0.6, 1, 0.45];

/* --------------------------------------------------------------------------
 * 3. TV 界面 mockup：全部由 CSS + 色块绘制（无图片请求），容器 aria-hidden
 *    装饰性文字经 t("mockup.*") 随语言切换
 * -------------------------------------------------------------------------- */
function TvMock({ kind }: { kind: MockKind }) {
  const { t } = useI18n();

  if (kind === "dashboard") {
    return (
      <div className="mk" aria-hidden="true">
        <div className="mk-dash-top">
          <span className="mk-pill on" />
          <span className="mk-pill" />
          <span className="mk-pill" />
          <span className="mk-pill" />
          <span className="mk-pill grow" />
        </div>
        <div className="mk-dash-hero">
          <div className="mk-cover" />
          <div className="mk-col">
            <span className="mk-line light" style={{ width: "72%" }} />
            <span className="mk-line dim" style={{ width: "46%" }} />
            <div className="mk-wave">
              {WAVE_BARS.map((h, i) => (
                <span key={i} style={{ height: `${h * 100}%` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="mk-tiles">
          <div className="mk-cover" />
          <div className="mk-cover v2" />
          <div className="mk-cover v3" />
          <div className="mk-cover v4" />
        </div>
      </div>
    );
  }

  if (kind === "player") {
    /* 参考 walkman-tv / ZL-Music TV：左旋转黑胶 + 右逐行滚动歌词 */
    return (
      <div className="mk mk-player" aria-hidden="true">
        <div className="mk-player-left">
          <div className="mk-vinyl" />
          <span className="mk-line light" style={{ width: "72%" }} />
        </div>
        <div className="mk-player-right">
          <span className="mk-line dim" style={{ width: "82%" }} />
          <span className="mk-lyric-active">{t("mockup.currentLine")}</span>
          <span className="mk-ktext">{t("mockup.karaokeLyric")}</span>
          <span className="mk-line dim" style={{ width: "64%" }} />
          <div className="mk-progress">
            <span />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "karaoke") {
    return (
      <div className="mk mk-ktv" aria-hidden="true">
        <div className="mk-col" style={{ flex: "0 0 auto", alignItems: "center", gap: 8 }}>
          <span className="mk-line light" style={{ width: "30%" }} />
          <span className="mk-line dim" style={{ width: "18%" }} />
        </div>
        <div className="mk-glass">
          <span className="mk-line dim" style={{ width: "74%" }} />
          <span className="mk-ktext">{t("mockup.karaokeShort")}</span>
        </div>
        <div className="mk-ktv-bar">
          <span className="mk-btn" />
          <span className="mk-btn big" />
          <span className="mk-btn" />
        </div>
      </div>
    );
  }

  if (kind === "mtv") {
    return (
      <div className="mk mk-mtv" aria-hidden="true">
        <div className="mk-video" />
        <div className="mk-mtv-center">
          <div className="mk-mtv-name">{t("mockup.mtvName")}</div>
          <span className="mk-ktext">{t("mockup.mtvSub")}</span>
        </div>
        <div className="mk-mtv-bar">
          <span className="mk-btn" />
          <span className="mk-btn big" />
          <span className="mk-btn" />
        </div>
        <div className="mk-progress" style={{ margin: "0 6% 5%" }}>
          <span />
        </div>
      </div>
    );
  }

  if (kind === "visualizer") {
    return (
      <div className="mk mk-viz" aria-hidden="true">
        <div className="mk-viz-bg" />
        <div className="mk-viz-particles" />
        <div className="mk-viz-top">
          <span className="mk-lyric-pill">{t("mockup.topLyricPill")}</span>
        </div>
        <div className="mk-viz-bottom">
          <div className="mk-col" style={{ gap: 8, maxWidth: "46%" }}>
            <span className="mk-line light" style={{ width: "60%" }} />
            <span className="mk-line dim" style={{ width: "42%" }} />
          </div>
          <div className="mk-viz-dots">
            <span className="mk-dot on" />
            <span className="mk-dot" />
            <span className="mk-dot" />
            <span className="mk-dot" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mk mk-lib" aria-hidden="true">
      <div className="mk-lib-head">
        <span className="mk-lib-title">{t("mockup.libraryTitle")}</span>
        <div className="mk-lib-tabs">
          <span className="mk-pill" />
          <span className="mk-pill on" />
          <span className="mk-pill" />
          <span className="mk-pill" />
          <span className="mk-pill" />
        </div>
      </div>
      <div className="mk-lib-body">
        <div className="mk-lib-grid">
          <div className="mk-cover" />
          <div className="mk-cover v2" />
          <div className="mk-cover v3" />
          <div className="mk-cover v4" />
          <div className="mk-cover v2" />
          <div className="mk-cover v4" />
          <div className="mk-cover" />
          <div className="mk-cover v3" />
        </div>
        <div className="mk-lib-index">
          {["", "on", "", "", "", "", "", ""].map((c, i) => (
            <i key={i} className={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * 4. 界面预览卡片：默认展示 CSS mockup，可一键切换实机截图
 * -------------------------------------------------------------------------- */
function ScreenCard({
  screenKey,
  shotSrc,
  delay,
}: {
  screenKey: string;
  shotSrc: string | null;
  delay: number;
}) {
  const { t } = useI18n();
  const [showShot, setShowShot] = useState(false);
  const shot = showShot && shotSrc ? shotSrc : null;

  const name = t(`screens.${screenKey}.name`);
  const tag = t(`screens.${screenKey}.tag`);
  const desc = t(`screens.${screenKey}.desc`);
  const kind = SCREEN_MOCKS[screenKey] ?? "dashboard";

  return (
    <article
      className="tv-screen-card tv-reveal"
      style={{ transitionDelay: `${delay}ms` }}
      tabIndex={0}
      aria-label={t("home.screenAria", { name })}
    >
      <div className="tv-screen-frame">
        <div className="tv-screen-16x9">
          {shot ? (
            <img src={shot} alt={t("home.screenShotAlt", { name })} loading="lazy" decoding="async" />
          ) : (
            <TvMock kind={kind} />
          )}
        </div>
        {shotSrc ? (
          <button
            type="button"
            className="tv-screen-toggle"
            onClick={() => setShowShot((v) => !v)}
            aria-pressed={showShot}
            aria-label={t("common.switchView", { name })}
          >
            {showShot ? t("common.mock") : t("common.realShot")}
          </button>
        ) : null}
      </div>

      <div className="tv-screen-body">
        <h3 className="tv-screen-name">
          {name}
          <span className="tv-tag">{tag}</span>
        </h3>
        <p className="tv-screen-desc" title={desc}>
          {desc}
        </p>
        {/* 一行小字：该界面的核心交互（词典 screens.<key>.hint，缺失回退默认文案） */}
        <p className="tv-screen-hint">
          <TvIcon name="remote" size={16} />
          {t(`screens.${screenKey}.hint`) === `screens.${screenKey}.hint`
            ? t("screenHintDefault")
            : t(`screens.${screenKey}.hint`)}
        </p>
      </div>
    </article>
  );
}

/* --------------------------------------------------------------------------
 * 5. 页面
 * -------------------------------------------------------------------------- */
export default function HomePage() {
  const { t, ta, tv } = useI18n();
  const { firstOf } = useScreenshots();
  useRevealOnScroll();

  /** 主视觉：优先复用首页仪表盘等实机截图，缺失时退回 CSS 绘制的播放页 mockup */
  const heroFile = useMemo(
    () => firstOf(heroShot.file, ...(heroShot.fallbackFiles ?? [])),
    [firstOf]
  );

  /** 首屏 6 个核心界面（均为 TV 端主界面） */
  const topScreens = screenKeys.slice(0, 6);

  const devices = ta("site.devices");
  const whatsNew = tv<{ title: string; desc: string }[]>("home.whatsNewItems");

  return (
    <div className="tv-home">
      {/* ================= Hero：100vh 全屏 + 模糊光晕 + 浮动光点粒子 ================ */}
      <section className="tv-hero" aria-labelledby="tv-hero-title">
        <div className="tv-hero-glow" aria-hidden="true" />
        <div className="tv-grid-texture" aria-hidden="true" />
        <div className="tv-particles" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className={`tv-particle${p.purple ? " is-purple" : ""}`}
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        <div className="container">
          <div className="tv-hero-title-full">
            <div className="tv-badges">
              <span className="tv-pill is-brand">
                <TvIcon name="spark" size={14} />
                {t("home.heroBadge")}
              </span>
              <span className="tv-pill">{site.license}</span>
              <span className="tv-pill is-version">{APK_VERSION}</span>
              {devices.map((d) => (
                <span className="tv-pill" key={d}>
                  {d}
                </span>
              ))}
            </div>

            <div className="tv-hero-brand">{site.name}</div>
            <h1 id="tv-hero-title" className="tv-hero-title">
              {t("home.heroTitle")}
            </h1>
          </div>

          <div className="tv-hero-inner">
            <div>
              <p className="tv-hero-lead">{t("site.tagline")}</p>
              <p className="tv-hero-sub">{t("site.subtitle")}</p>

              <div className="tv-hero-actions">
                <a
                  href={APK_DOWNLOAD_URL}
                  target="_blank"
                  rel="noreferrer"
                  title={t("header.downloadTitle", { version: APK_VERSION })}
                  className="tv-btn tv-btn-primary"
                >
                  <TvIcon name="download" size={20} />
                  {t("home.downloadLatest")}
                </a>
                <Link to="/features" className="tv-btn tv-btn-ghost">
                  <TvIcon name="rocket" size={20} />
                  {t("home.explore")}
                </Link>
                <a
                  href={site.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="tv-btn tv-btn-ghost"
                >
                  <TvIcon name="code" size={20} />
                  {t("home.githubSource")}
                </a>
              </div>

              <p className="tv-hero-note">{t("home.heroNote")}</p>
            </div>

            {/* 主视觉：16:9 电视外框 + 屏幕呼吸发光 */}
            <div className="tv-hero-screen tv-reveal">
              <div className="tv-frame tv-breathe">
                <div className="tv-frame-inner">
                  {heroFile ? (
                    <img
                      className="tv-frame-img"
                      src={heroFile}
                      alt={t("home.heroAlt")}
                      loading="eager"
                      decoding="async"
                    />
                  ) : (
                    <TvMock kind="player" />
                  )}
                </div>
              </div>
              <div className="tv-stand" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= 统计数字：等宽大字 ================= */}
      <section className="tv-section">
        <div className="container">
          <div className="tv-stats">
            {stats.map((s, i) => (
              <div
                className="tv-stat tv-reveal"
                key={s.key}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="tv-stat-value">{s.value}</div>
                <div className="tv-stat-label">{t(`stats.${s.key}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= What's new：v2.39.x 新增能力 ================= */}
      <section className="tv-section tv-whatsnew" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="tv-home-head tv-reveal">
            <span className="tv-eyebrow">{t("home.whatsNewEyebrow")}</span>
            <h2 className="tv-h2">{t("home.whatsNewTitle")}</h2>
            <p className="tv-lead">{t("home.whatsNewLead")}</p>
            <span className="tv-pill is-version tv-whatsnew-version">
              {t("home.whatsNewVersion", { version: APK_VERSION })}
            </span>
          </div>
          <div className="tv-whatsnew-grid">
            {whatsNew.map((item, i) => (
              <div
                className="tv-whatsnew-card tv-reveal"
                key={item.title}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                tabIndex={0}
              >
                <div className="tv-whatsnew-index">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="tv-whatsnew-title">{item.title}</h3>
                <p className="tv-whatsnew-desc">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="tv-more tv-reveal">
            <Link to="/download" className="tv-btn tv-btn-ghost">
              {t("home.whatsNewMore")}
              <TvIcon name="arrowRight" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= Highlights：4 列卡片网格 ================= */}
      <section className="tv-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="tv-home-head tv-reveal">
            <span className="tv-eyebrow">Highlights</span>
            <h2 className="tv-h2">{t("home.highlightsTitle")}</h2>
            <p className="tv-lead">{t("home.highlightsLead")}</p>
          </div>

          <div className="tv-grid tv-grid-4">
            {highlights.map((h, i) => {
              const cardClass = "tv-card tv-reveal";
              const cardStyle = { transitionDelay: `${(i % 4) * 80}ms` };
              const body = (
                <>
                  <div className="tv-card-icon">
                    <TvIcon name={HIGHLIGHT_ICONS[h.key] ?? "spark"} size={28} />
                  </div>
                  <h3 className="tv-card-title">{t(`highlights.${h.key}.title`)}</h3>
                  <p className="tv-card-desc" title={t(`highlights.${h.key}.desc`)}>
                    {t(`highlights.${h.key}.desc`)}
                  </p>
                  {h.key === "visualizer" && (
                    <span className="tv-card-more">{t("home.viewEffects")}</span>
                  )}
                </>
              );
              /* 「可视化特效库」整卡即入口，跳转到特效图集页 */
              return h.key === "visualizer" ? (
                <Link to="/effects" className={cardClass} style={cardStyle} key={h.key} tabIndex={0}>
                  {body}
                </Link>
              ) : (
                <div className={cardClass} style={cardStyle} key={h.key} tabIndex={0}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= Features：16 个模块，3 列卡片瀑布流 ================= */}
      <section className="tv-section tv-features" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="tv-home-head tv-reveal">
            <span className="tv-eyebrow">Features</span>
            <h2 className="tv-h2">
              {t("home.featuresTitlePre")}
              <span className="tv-accent">{t("home.featuresTitleAccent")}</span>
            </h2>
            <p className="tv-lead">
              {t("home.featuresLead", { count: featureModules.length })}
            </p>
          </div>

          <div className="tv-feature-grid">
            {featureModules.map((m, i) => (
              <div
                className="tv-feature tv-reveal"
                key={m.key}
                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                tabIndex={0}
              >
                <div className="tv-feature-icon">
                  <TvIcon name={FEATURE_ICONS[m.key] ?? "spark"} size={24} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 className="tv-feature-title">{t(`features.${m.key}.title`)}</h3>
                  <p
                    className="tv-feature-desc"
                    title={
                      ta(`features.${m.key}.items`).join("; ") || t(`features.${m.key}.summary`)
                    }
                  >
                    {t(`features.${m.key}.summary`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="tv-more tv-reveal">
            <Link to="/features" className="tv-btn tv-btn-ghost">
              {t("home.viewAllFeatures", { count: featureModules.length })}
              <TvIcon name="arrowRight" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= Screens：16:9 TV 界面 mockup ================= */}
      <section className="tv-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="tv-home-head tv-reveal">
            <span className="tv-eyebrow">Screens</span>
            <h2 className="tv-h2">{t("home.screensTitle")}</h2>
            <p className="tv-lead">{t("home.screensLead")}</p>
          </div>

          <div className="tv-screens">
            {topScreens.map((key, i) => {
              const shot = screenShots[key];
              const shotSrc = shot
                ? firstOf(shot.file, ...(shot.fallbackFiles ?? []))
                : null;
              return (
                <ScreenCard
                  key={key}
                  screenKey={key}
                  shotSrc={shotSrc}
                  delay={(i % 2) * 90}
                />
              );
            })}
          </div>

          <p className="tv-hero-note tv-reveal" style={{ marginTop: 28 }}>
            {t("home.screensNote", { count: screenKeys.length })}{" "}
            <Link to="/screens" style={{ color: "var(--tv-brand)" }}>
              {t("nav.screens")}
            </Link>
            {t("home.screensNoteEnd")}
          </p>

          <div className="tv-more tv-reveal" style={{ marginTop: 24 }}>
            <Link to="/screens" className="tv-btn tv-btn-ghost">
              {t("home.browseAllScreens", { count: screenKeys.length })}
              <TvIcon name="arrowRight" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 底部 CTA：大号文案 + 青绿下载按钮居中 ================= */}
      <section className="tv-cta">
        <div className="tv-cta-glow" aria-hidden="true" />
        <div className="container">
          <h2 className="tv-cta-title tv-reveal">{t("home.ctaTitle")}</h2>
          <p className="tv-cta-desc tv-reveal">{t("home.ctaDesc")}</p>
          <div className="tv-cta-actions tv-reveal">
            <a
              href={APK_DOWNLOAD_URL}
              target="_blank"
              rel="noreferrer"
              title={t("header.downloadTitle", { version: APK_VERSION })}
              className="tv-btn tv-btn-primary"
            >
              <TvIcon name="download" size={20} />
              {t("home.ctaDownload")}
            </a>
            <a href={site.repo} target="_blank" rel="noreferrer" className="tv-btn tv-btn-ghost">
              <TvIcon name="code" size={20} />
              {t("home.ctaJoin")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
