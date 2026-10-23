/**
 * 多语言体系 · English dictionary (en-US) · Support content
 *
 * 收录：API 版本表、FAQ、版本更新摘要、可视化效果名。
 */

export const enSupport = {
  api: {
    entries: [
      { name: "Jellyfin / Navidrome / Subsonic", desc: "Backend types and API versions fetched at runtime", type: "Runtime" },
      { name: "Daoliyu Music (道理鱼) / fnOS Music (飞牛)", desc: "Real server versions fetched after sign-in", type: "Runtime" },
      { name: "Baidu Netdisk", desc: "Open platform API version (static display)", type: "Static" },
      { name: "Jamendo", desc: "Independent music library API version (static display)", type: "Static" },
      { name: "Open-Meteo / OpenWeatherMap", desc: "Weather data sources (static display)", type: "Static" },
    ],
  },
  faqs: [
    {
      q: "Which build should I download?",
      a: "TV, phone, tablet, box and emulator all share the same universal APK — no need to pick by device or architecture. The package bundles ARM64 / ARMv7 / x86_64, and the system automatically uses the right one at install time.",
    },
    {
      q: "How do I update when a new version ships?",
      a: "Tap “Download the latest APK” on the download page and install over the top — no need to uninstall the old version, and playback history and settings are kept. Historical versions are available on GitHub Releases.",
    },
    {
      q: "Can I listen without connecting a NAS backend?",
      a: "Yes. Local music, online music, Baidu Netdisk music and the Jamendo library are all supported; weather radio also searches online sources for mood-matching songs when no NAS is connected.",
    },
    {
      q: "Why can't I see some files in Baidu Netdisk?",
      a: "Under Baidu's open-platform sandbox policy, third-party apps can only access the /apps/NASMusicTV directory and its subdirectories; files outside it cannot be read. Put your music in /apps/NASMusicTV/ (e.g. /apps/NASMusicTV/music/) — the app creates this directory automatically on first use.",
    },
    {
      q: "Why didn't local music scan automatically after install?",
      a: "Local music is now gated behind the master switch in the “Local music” section of Settings: the app no longer requests storage permission at launch — the system prompt only appears when you flip the switch, a denied permission falls back to off, and revoking it while running turns the source off automatically. Downloaded songs are unaffected and always visible.",
    },
    {
      q: "Can songs flagged “may be unlicensed” be played?",
      a: "Playable ones play as usual. These songs are no longer hidden outright — they only carry a “may be unlicensed” flag at the end of the row, and if playback fails the app automatically retries with a playable version of the same title.",
    },
    {
      q: "Where do lyrics and covers come from?",
      a: "Lyrics are fetched in the order embedded → local cache → same-directory LRC file → online match, and once cached they need zero network requests on the next playback; covers are read from embedded audio metadata first, falling back to online album and artist images.",
    },
    {
      q: "How well is the remote control supported?",
      a: "Complete D-Pad focus navigation with HDMI-CEC TV remote media keys; the K-song / MTV full-screen pages show a QR code in the top-right, and scanning it with your phone lets you control the queue and search-add songs.",
    },
    {
      q: "Is the project open source?",
      a: "Yes. The project is open source under GPL v3, hosted on GitHub — issues and PRs are welcome.",
    },
  ],
  changelog: {
    v2_38_15: "Settings → Playback adds “Last high-quality separation failure details”; the K-song page no longer truncates separation failure messages and now attaches device diagnostics such as model, RAM and ONNX Runtime.",
    v2_38_14: "Playback stats “Top Artists” now split duets: both artists of a collaboration are counted once each, while solo and duet tracks are merged per artist.",
    v2_38_13: "Added the 26th visualizer effect “Desert Smoke”: the setting sun sinks into layered sand dunes while a lone wisp of smoke rises straight into the sky, with camel caravans occasionally crossing the ridges; fixed the black screen on entry and the blank first frame.",
    v2_38_12: "Added the 25th visualizer effect “Flock of Birds”: starlings sweep across the wilderness with Boids self-organized flight, banking turns and perching before take-off again; fixed mis-drawn parallax bands.",
  },
  effects: {
    names: {
      BEAT_FIREWORK: "Beat Fireworks",
      BIRDS_FLOCK: "Flock of Birds",
      CIRCULAR_RING: "Spectrum Ring",
      CONCENTRIC_GEARS: "Gears",
      CONSTELLATION: "Constellation",
      DESERT_SMOKE: "Desert Smoke",
      DNA: "DNA Helix",
      ECG_WAVE: "Heartbeat",
      HYPNOTIC_FUNCTION: "Hypnotic",
      LIGHT_BEAMS: "Light Beams",
      LIQUID_GRID: "Liquid Grid",
      LIQUID_RIPPLE: "Liquid Ripple",
      LYRICS_DOT_MATRIX: "Lyric Dot Matrix",
      MATRIX_RAIN: "Matrix Rain",
      MILKDROP_FEEDBACK: "Feedback Trails",
      MOLECULE: "Molecule",
      MOONLIT: "Moonlit",
      ORBITAL_RINGS: "Solar System",
      RADAR_GRID: "Radar",
      SEASIDE: "Seaside",
      SNOW_CEDAR: "Snow Cedar",
      STAR_TRAILS: "Star Trails",
      TRIPOD_FOG: "Fog of War",
      VINTAGE_TV: "Vintage TV",
      WORLD: "3D World Globe",
    },
  },
};
