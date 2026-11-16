/**
 * 部署平台输出目录兼容层。
 *
 * 背景：帽子云在 framework=none 时按 Create React App 的默认口径把「输出目录」
 * 设成 build，执行 `COPY --from=build /src/build /`；而本站是 Vite，产物在 dist/。
 * 平台侧配置改dist之前，这里把根 dist/ 同步一份到 build/，让两种口径都能发布。
 *
 * dist/ 仍是唯一权威产物；build/ 是纯副本，两者内容一致、均被 .gitignore 忽略。
 */
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const src = path.join(root, "dist");
const dst = path.join(root, "build");

if (!fs.existsSync(path.join(src, "index.html"))) {
  console.error("[compat] dist/index.html 不存在，构建未产出站点，跳过 build/ 同步");
  process.exit(1);
}

function countFiles(dir) {
  let n = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    n += entry.isDirectory() ? countFiles(p) : 1;
  }
  return n;
}

fs.rmSync(dst, { recursive: true, force: true });
fs.cpSync(src, dst, { recursive: true });
console.log(`[compat] dist/ -> build/ (${countFiles(dst)} files)`);
