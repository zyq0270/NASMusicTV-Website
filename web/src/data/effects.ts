/**
 * 可视化特效截图清单（单一数据源）。
 *
 * - enum：应用内 VisualizerTheme 枚举名，同时也是截图文件名；
 *   资源位于 web/public/effects/<枚举名>.jpg，线上 URL 为 /effects/<枚举名>.jpg
 * - restricted：因第三方版权 / 授权原因未随应用公开版分发的私有效果，
 *   图集仅展示快照并显式标注，不计入「公开版可选」口径
 *
 * 【多语言体系】效果展示名不在本文件维护，按枚举名从词典取：
 *   t(`effects.names.${shot.enum}`)（中英对照见 src/i18n/locales/）。
 * 计数一律用 effects.length 推导，不要在页面上写死套数。
 */
export interface EffectShot {
  /** 应用内枚举名（与截图文件名一致，如 SEASIDE） */
  enum: string;
  /** 因版权 / 授权原因未随公开版分发（仅展示快照，不进公开版计数） */
  restricted?: boolean;
}

/** 特效截图目录（相对站点基路径，BASE_URL 始终以 "/" 结尾） */
export const EFFECTS_DIR = `${import.meta.env.BASE_URL}effects/`;

export const effects: EffectShot[] = [
  { enum: "ARCADE_GAMES" },
  { enum: "BEAT_FIREWORK" },
  { enum: "BIRDS_FLOCK" },
  { enum: "CIRCULAR_RING" },
  { enum: "CONCENTRIC_GEARS" },
  { enum: "CONSTELLATION" },
  { enum: "DESERT_SMOKE" },
  { enum: "DNA" },
  { enum: "ECO_GLOBE" },
  { enum: "HIGHWAY", restricted: true },
  { enum: "HYPNOTIC_FUNCTION" },
  { enum: "LIGHT_BEAMS" },
  { enum: "LIQUID_GRID" },
  { enum: "LIQUID_RIPPLE" },
  { enum: "LOFI_CITY", restricted: true },
  { enum: "LYRICS_STAGE" },
  { enum: "MATRIX_RAIN" },
  { enum: "MOLECULE" },
  { enum: "MOONLIT" },
  { enum: "ORBITAL_RINGS" },
  { enum: "PHOTO_WALL" },
  { enum: "QIANLI_SCROLL" },
  { enum: "RADAR_GRID" },
  { enum: "SEASIDE" },
  { enum: "SNOW_CEDAR" },
  { enum: "STAR_TRAILS" },
  { enum: "TRIPOD_FOG" },
  { enum: "VINTAGE_TV" },
  { enum: "WORLD" },
];

/** 单张截图地址：/effects/SEASIDE.jpg */
export const effectSrc = (shot: EffectShot): string => `${EFFECTS_DIR}${shot.enum}.jpg`;

/** 图集中因版权原因未公开的效果（仅展示快照） */
export const restrictedEffects = effects.filter((s) => s.restricted);

/** 公开版可选特效数 = 图集总数 − 未公开数（当前 29 − 2 = 27，与应用公开版一致） */
export const publicEffectCount = effects.length - restrictedEffects.length;
