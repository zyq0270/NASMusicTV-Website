/**
 * 运行时冒烟专用构建配置（IIFE 单文件，供 jsdom 直接 eval）。
 * 不属于正式产物：构建输出到 .tmp-smoke-dist/，验证后删除。
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/* 与主 vite.config.ts 保持一致：package.json version + 构建时间 */
const pkg = JSON.parse(
  readFileSync(fileURLToPath(new URL("./package.json", import.meta.url)), "utf-8")
);

export default defineConfig({
  plugins: [react()],
  // lib 模式不会替换 process.env.NODE_ENV，产物在 jsdom 里首行即抛
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    __APP_VERSION__: JSON.stringify(pkg.version),
    __APP_BUILD_TIME__: JSON.stringify("2026-10-23 12:00"),
    __APP_CHANGELOG_LATEST__: JSON.stringify({ version: "", date: "", summary: "", sections: [] }),
  },
  build: {
    outDir: ".tmp-smoke-dist",
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: false, // 报错行号可读，便于定位
    lib: {
      entry: "src/main.tsx",
      formats: ["iife"],
      name: "SmokeApp",
      fileName: () => "app.js",
    },
  },
});
