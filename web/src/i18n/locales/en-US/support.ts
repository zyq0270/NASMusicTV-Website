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
      a: "Tap Download latest on the download page to open the newest Gitee Release page, then pick the NASMusicTV-release-*.apk attachment and install over the top — no need to uninstall the old version, and playback history and settings are kept. historical versions are on GitHub / Gitee Releases.",
    },
    {
      q: "Why is the main download link on Gitee?",
      a: "The v2.39.28 package is about 43 MB, above the 25 MiB per-file limit of the Tencent Cloud EdgeOne Makers plan hosting this site, so it is not published alongside the site. The main link opens the newest Gitee Release page (/releases/latest) — no login, no access code, fast in China, and it follows the newest release automatically; pick the APK attachment there. GitHub / Gitee Releases keep historical builds.",
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
      a: "Yes. The project is open source under GPL v3, mirrored on GitHub and Gitee (faster in China) — issues and PRs are welcome.",
    },
  ],
  changelog: {
    v2_39_28: "Landed 14 fixes from the 2026-11-25 full-repository two-axis review: the Gitee release script pins commit and tag objects and verifies the remote branch; queue / playlist / stats / weather-radio / netdisk pages share adaptive margins; player idle recovery follows shuffle / sequential / repeat modes; the Quick Dial plays duplicate queue items by real index; local songs support same-directory and embedded lyrics with a 2MiB sidecar cap; accompaniment cache names use safe hashes with directory-boundary checks; low space on external storage still scans old downloads while new writes fall back to internal storage, and a failed completion marker never leaves a partial file on disk.",
    v2_39_27: "Added the semi-circular Quick Dial (the light-theme scrim became a single full-screen overlay that lets the page show through, and duplicate queue items play by real index): a quick-pick icon beside library search boxes rotates candidates along an arc and one tap fills the query; playback gains a queue dial, candidates are only that category's past queries ranked by hotness, and Settings shows per-category stats with detail / clear views. Landed 62 incremental review findings covering truncated response bodies, cross-platform cache collisions, queue resurrection and crash recovery; library search now displays results in place.",
    v2_39_26: "Fixed initial / full pinyin search failing across NAS, Baidu Netdisk and local sources: one shared substring / full-pinyin / initial matcher, server fallback on zero hits for English terms, and multi-word tokens that must all match; switching tabs re-searches in the new dimension and netdisk / radio search also understands pinyin. Also fixed zero-track and missing-cover network artist pages, nine home-flow and six queue-flow defects.",
    v2_39_25: "Fixed five album-detail defects: Back returns to the library, fast album switching no longer mixes tracks, songs get loading / error / empty states, search-result albums keep their cover and resolve tracks, and the misleading inline “Play” label is gone.",
    v2_39_24: "Fixed the play / pause chain: pausing works while buffering, the icon follows user intent, MTV mode can't be resumed by media keys, MEDIA_STOP now stops and returns to the track start, and an unready player reports why.",
    v2_39_23: "Overhauled artist list / detail and album-tab pagination: loading and error states are wired up, backend exceptions are no longer swallowed into empty lists, Jellyfin paging and fields are complete, and same-name albums merge by “album + artist” so tracks no longer cross over; Daoliyu libraries beyond 500 albums are fully listed.",
    v2_39_22: "Landed 14 review findings: log rotation no longer silently fails on old TVs, crash recovery stops marking half-downloaded files complete, high-quality vocal separation works on long tracks, and Baidu Netdisk indexes no longer save partial results; eight low-severity issues were fixed too.",
    v2_39_21: "Gitee becomes the authoritative repository: optional Tencent location-service key for IP geolocation with a keyless fallback; weather radio uses backend search so songs deep in large libraries can match; the “External storage” download location really takes effect and older downloads stay visible; README download entry and badges moved to Gitee Releases.",
    v2_39_20: "Added a Gitee China mirror (GitHub-to-Gitee pull mirror, triggered on demand with scripts to trigger / check status / verify); fixed weather radio on old TVs by embedding the ISRG Root X1 trust anchor (trust added, verification not loosened) and the too-short log retention window (dedicated E-level quota + high-frequency W dedup), so real errors are no longer drowned out",
    v2_39_19: "Added Gitee mirror setup guide and one-command sync scripts: an on-demand GitHub → Gitee pull mirror plus a push-based fallback; when the GitHub account is flagged, sync switches to username + personal access token credentials with no OAuth required",
    v2_39_18: "Photo wall adds 33 transitions and removes 6 broken tile effects, settling at 70; capture-date watermarks and NAS scan status added; the Arcade Collection is now publicly distributed, taking selectable effects from 26 to 27; TV-driven fixes cover FLAC crashes, line-by-line lyric scrolling, cramped settings values and 40+ more, plus 59 findings from the full-codebase review",
    v2_39_17: "New visualizer effect “Arcade Collection”: an embedded Contra auto-play bot that clears all 8 stages in an endless loop, with 489 frames packed into a single 1024×1024 atlas (about 56 KB) — no remote input needed",
    v2_39_16: "154 findings from the full-codebase review landed in one pass: album transitions crashing hardware rendering on API < 26, missing host allow-listing for Bilibili MV URLs, emoji split by String.length in word-by-word lyrics and more",
    v2_39_14: "New visualizer effect “Eco Earth”: 150 trees / 19 animals / mountains / tornadoes / three cloud layers / aurora / meteors and a four-season cycle, with song energy driving rotation and cloud speed — page and models fully offline",
    v2_39_13: "New visualizer effect “Lyric Stage”: one theme holding 5 switchable sub-modes (dot matrix / word light / full overview / tilted rhythm / split guide), switched with the remote's up / down keys or a phone swipe, persisted across tracks",
    v2_39_10: "New visualizer effect “Open Road”: a native OpenGL ES night highway with terrain / sky / fog / three LOD vegetation layers / an autopilot camera, a low-quality tier and automatic downgrade on sustained low FPS; Pixel Cities completes all 57 cities",
    v2_39_8: "LX Music source scripts added for higher-quality playback URLs with per-platform verification; per-source master switches cover NAS / online / Baidu / Jamendo / local — a disabled source disappears site-wide and is never requested",
    v2_39_6: "Light theme added (follow system / dark / light), remote focus highlight on by default, K-song goes full screen; fixed low contrast in light mode and the phone status / navigation bars staying black",
  },
  effects: {
    names: {
      ARCADE_GAMES: "Arcade Collection",
      BEAT_FIREWORK: "Beat Fireworks",
      BIRDS_FLOCK: "Flock of Birds",
      CIRCULAR_RING: "Spectrum Ring",
      CONCENTRIC_GEARS: "Gears",
      CONSTELLATION: "Constellation",
      DESERT_SMOKE: "Desert Smoke",
      DNA: "DNA Helix",
      ECO_GLOBE: "Eco Earth",
      HIGHWAY: "Open Road",
      HYPNOTIC_FUNCTION: "Hypnotic",
      LIGHT_BEAMS: "Light Beams",
      LIQUID_GRID: "Liquid Grid",
      LIQUID_RIPPLE: "Liquid Ripple",
      LOFI_CITY: "Pixel City",
      LYRICS_STAGE: "Lyric Stage",
      MATRIX_RAIN: "Matrix Rain",
      MOLECULE: "Molecule",
      MOONLIT: "Moonlit",
      ORBITAL_RINGS: "Solar System",
      PHOTO_WALL: "Photo Wall",
      QIANLI_SCROLL: "A Thousand Li of Rivers and Mountains",
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
