/**
 * 多语言体系 · English dictionary (en-US) · Screens
 *
 * 收录：界面预览页 / 首页 Screens 区的 17 个界面。
 */

export const enScreens = {
  screens: {
    dashboard: {
      name: "Home Dashboard",
      tag: "TV / Phone",
      desc: "Current playback status, recent play history, live weather, an animated equalizer preview and a quick search entry — all at a glance.",
      hint: "Move focus with the remote's up / down keys; press OK to open the player",
    },
    player: {
      name: "Player",
      tag: "TV / Phone",
      desc: "Album cover on the left and lyrics on the right, with cover filters (Gaussian blur + dark mask), a progress bar, control buttons, a visualizer spectrum and a song details panel; online songs show a NET badge.",
      hint: "Left / right keys change tracks; OK plays / pauses",
    },
    karaoke: {
      name: "K-Song",
      tag: "TV only",
      desc: "Full-screen immersive K-song: title and artist centered on top, two lines of word-by-word lyrics advancing on a frosted-glass card in the middle (the current word turns yellow), large play / previous / next buttons and a gradient progress bar at the bottom, and one-tap switching for pitch shift, playback speed, original / backing track and quality lock on the right. Instant preview is supported: ←/→ changes the setting live in the dialog, only confirming saves it, and going back restores the previous setting. Pairs with the phone QR remote.",
      hint: "Left / right keys on the remote switch original / backing track",
    },
    mtv: {
      name: "MTV Player",
      tag: "TV / Phone",
      desc: "Full-screen immersive music video: the MV frame fills the entire screen, with a cinematic glowing title and word-by-word lyrics in the center, one-tap back in the bottom-left, previous / pause / next and a thin gradient progress bar at the bottom, and “Lyrics” / “Switch” in the bottom-right to jump back to lyrics or change to another MV.",
      hint: "OK toggles lyrics; left / right keys switch to another MV",
    },
    visualizer: {
      name: "Visualizer Stage",
      tag: "TV / Phone",
      desc: "27 selectable full-screen visualizer effects in the public build (the classic 26 plus the Arcade Collection), alongside experimental Pixel Cities (57 cities), Open Road, A Thousand Li of Rivers and Mountains, Lyric Stage and Eco Earth; low / medium / high quality tiers, one-tap exit in the top-left, the current lyric line in the top pill, the song title and artist always visible bottom-left, and progress dots at the bottom; the effect you pick on the remote stays fixed, particles pulse with the beat and the lyric dot matrix auto-scales its font.",
      hint: "Left / right keys instantly switch between the 27 effects",
    },
    "photo-wall": {
      name: "Photo Wall",
      tag: "TV / Phone",
      desc: "Full-screen photo slideshow visualizer: three mixed sources (gallery / external storage / Jellyfin), 70 random transitions, a red capture-date watermark in the bottom-right after each photo settles, slow Ken Burns push-in, optional audio reaction (beat pulse / bass breathing); full-screen or complete fit modes, on-device face detection showing only photos containing portraits, and automatic NAS scanning with status shown in Settings.",
    },
    library: {
      name: "Library",
      tag: "TV / Phone",
      desc: "Under the large “Library” title, all tabs — Search / Discover / Albums / Artists / Songs / Genres / Eras / Radio — are laid out in one row, with the tab bar horizontally scrollable and a persistent “Search songs, albums…” input on the right; the content area shows counts (e.g. “Artists (1960)”) and a vertical A–Z letter index on the right (the current letter highlighted), with a large rounded cover grid filling the screen.",
      hint: "Left / right to switch tabs, OK to select",
    },
    discover: {
      name: "Discover",
      tag: "TV / Phone",
      desc: "Switch to the “Discover” tab under the “Library” title: six rows of filter groups (language / instrumental / era / nostalgia / style / theme) in one view (each row pairs a group name with a row of teal pill buttons, “All” selected by default); selecting filters the aggregated NAS + online + Baidu + Jamendo result cards and song rows below.",
    },
    search: {
      name: "Search",
      tag: "TV / Phone",
      desc: "Switch to the “Search” tab under the “Library” title: enter keywords in the top-right search box (with a one-tap clear ×), with a row of pill switches below for search sources (NAS / online / Baidu / Jamendo / local) lit one by one, or tap “Light all” to turn them all on at once; the result area has “Play all” / “Add to queue” pills plus a hit count (e.g. 68) on the left, and each row below shows index, cover, title and source tag (online / NAS / Baidu…), artist, with duration and download / favorite / add to queue / add to playlist icons at the end; pinyin initials match too.",
    },
    "weather-radio": {
      name: "Weather Radio",
      tag: "TV / Phone",
      desc: "“← Back” and the “Weather Radio” title in the top-left, with “▶ Play all” in the top-right to start everything at once; the weather card on the left shows the icon and current temperature (e.g. 30°C · Beijing · Few clouds), two rows of weather scene pills on the right (sunny·light music / cloudy·folk / rainy·piano / snowy·warm / windy·upbeat / thunderstorm·epic) with the active one highlighted in teal; below are the “Radio songs (N)” count title and song list (index, rounded cover, title, source tag, artist, duration and download button at the end).",
    },
    detail: {
      name: "Detail Page",
      tag: "TV / Phone",
      desc: "Album / artist details: back key + large title, circular avatar on the left, song list on the right (index, square cover, title, source tag, artist, duration and inline icons), with “Play all” / “Add to queue” and the total song count in the top-right.",
    },
    queue: {
      name: "Play Queue",
      tag: "TV / Phone",
      desc: "The large “Play queue” title with a track count (e.g. “3 tracks”) and a “Clear” button; a fixed large cover card for the current track on the left (with the song title centered below) and the queue list on the right: index, title, artist, with the playing row fully highlighted in teal (index and title in teal too), source / status tags distinguishing “Downloaded” (blue-teal) and “Online” (green), and 0:00 duration plus download ↓ / move up ↑ / remove × actions at the end of each row.",
    },
    mine: {
      name: "My Page",
      tag: "TV / Phone",
      desc: "A now-playing bar at the top (cover + ▶ + title and artist + source tag + inline download / heart / queue / add icons); below are the large “Local playlists” title with a “+ New playlist” button, playlist rows showing name and track count, and play / rename / remove actions at the end of each row. Favorites and recent plays both include online songs.",
    },
    settings: {
      name: "Settings",
      tag: "TV / Phone",
      desc: "Split left / right: a gear + “Settings” card on the left listing General / Playback / Download / Server with the active one highlighted in teal; the “General” panel on the right shows language (follow system / 中文 / English), theme (follow system / dark / light), focus highlight and interface animation switches, with the teal “✓ On” state directly visible; playback mode, in-app volume, visualizer quality (low / medium / high), the local music master switch, lyric scaling, cover filters, last separation failure details, log level filter, weather API key and endpoint configuration are all managed on the same page.",
    },
    connection: {
      name: "Connection",
      tag: "TV / Phone",
      desc: "The centered “Server configuration” card: five backend types (Jellyfin / Navidrome / Subsonic / 道理鱼 / 飞牛) in one row with the active one as a teal pill, a server address input below (example http://192.168.8.183:8096) and a “Test connection” button, with the default port switching automatically when you change type; fnOS Music also provides an access code (security code) field that can be left empty when access-code protection is off, and connection failures distinguish address / credentials / network / access code and report the specific cause.",
    },
    about: {
      name: "About",
      tag: "TV / Phone",
      desc: "Settings navigation on the left (Cache management / Network check / Netdisk / Data management / About) and the teal “About” title on the right, with an info table of label-value rows: app name NAS Music TV, version v2.39.20, build type release, license GPL v3, supported backends Jellyfin / Navidrome / Subsonic / 道理鱼 / 飞牛, and real backend API versions and connection status viewable at runtime.",
    },
    remote: {
      name: "Phone Remote",
      tag: "Phone only",
      desc: "The remote page opened by scanning with your phone: “Play queue / Search” dual tabs at the top, a “Now playing” card showing the current track and source, queue rows supporting ↓ download / ↑↓ reorder / × remove, and search to add songs to the TV.",
    },
  },
  screenHintDefault: "Left / right to switch, OK to select",
};
