/**
 * 可视化特效截图清单（单一数据源）。
 *
 * - enum：应用内 VisualizerTheme 枚举名，同时也是截图文件名；
 *   资源位于 web/public/effects/<枚举名>.jpg，线上 URL 为 /effects/<枚举名>.jpg
 *
 * 【多语言体系】效果展示名不在本文件维护，按枚举名从词典取：
 *   t(`effects.names.${shot.enum}`)（中英对照见 src/i18n/locales/）。
 * 计数一律用 effects.length 推导，不要在页面上写死套数。
 */
export interface EffectShot {
  /** 应用内枚举名（与截图文件名一致，如 SEASIDE） */
  enum: string;
}

/** 特效截图目录（相对站点基路径，BASE_URL 始终以 "/" 结尾） */
export const EFFECTS_DIR = `${import.meta.env.BASE_URL}effects/`;

export const effects: EffectShot[] = [
  { enum: "BEAT_FIREWORK" },
  { enum: "BIRDS_FLOCK" },
  { enum: "CIRCULAR_RING" },
  { enum: "CONCENTRIC_GEARS" },
  { enum: "CONSTELLATION" },
  { enum: "DESERT_SMOKE" },
  { enum: "DNA" },
  { enum: "ECG_WAVE" },
  { enum: "HYPNOTIC_FUNCTION" },
  { enum: "LIGHT_BEAMS" },
  { enum: "LIQUID_GRID" },
  { enum: "LIQUID_RIPPLE" },
  { enum: "LYRICS_DOT_MATRIX" },
  { enum: "MATRIX_RAIN" },
  { enum: "MILKDROP_FEEDBACK" },
  { enum: "MOLECULE" },
  { enum: "MOONLIT" },
  { enum: "ORBITAL_RINGS" },
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
