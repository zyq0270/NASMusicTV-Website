/**
 * 运行时冒烟：IIFE bundle + jsdom，验证「构建过 ≠ 页面挂」
 *   1. 默认语言（jsdom navigator.language 为 en-US → 英文）首页渲染出关键文案
 *   2. 点击「中」切换到中文：<html lang> 与关键中文文案到位
 *   3. 逐路由 pushState + popstate 切换，六个页面均渲染且无关键字缺失
 *   4. 全程零 console.error / window.onerror / unhandledrejection
 *
 * 运行：node scripts/runtime-smoke.cjs（先构建 vite.smoke.config.ts）
 */
const fs = require("fs");
const path = require("path");

/* jsdom 装在外部隔离目录（CJS require 认 NODE_PATH 兜底） */
let JSDOM;
try {
  JSDOM = require("jsdom").JSDOM;
} catch {
  JSDOM = require(
    "C:/Users/hxzha/.workbuddy/binaries/node/workspace/node_modules/jsdom"
  ).JSDOM;
}

const BUNDLE = path.join(__dirname, "..", ".tmp-smoke-dist", "app.js");
const code = fs.readFileSync(BUNDLE, "utf-8");

const errors = [];
const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "http://localhost/",
  runScripts: "outside-only",
  pretendToBeVisual: true,
});

const { window } = dom;
/* jsdom 缺失 API 补桩 */
window.matchMedia =
  window.matchMedia ||
  ((query) => ({ matches: false, media: query, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
window.scrollTo = window.scrollTo || (() => {});
/* react-router v7 data router 导航时会 new Request(url, init)，jsdom 无 fetch 套件，给最小桩 */
if (!window.Request) {
  window.Request = class Request {
    constructor(url, init) {
      this.url = String(url);
      this.method = String(init?.method ?? "GET").toUpperCase();
      this.signal = init?.signal;
      this.headers = new Map();
      this.credentials = "same-origin";
    }
  };
}

window.addEventListener("error", (e) => errors.push(`window.error: ${e.message}`));
window.addEventListener("unhandledrejection", (e) => errors.push(`unhandledrejection: ${e.reason}`));
const origConsoleError = window.console.error.bind(window.console);
window.console.error = (...args) => {
  errors.push(`console.error: ${args.map(String).join(" ")}`);
  origConsoleError(...args);
};

/* 执行 bundle（React 18 createRoot 渲染是异步调度的，等两拍再断言） */
window.eval(code);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const $ = (sel) => window.document.querySelector(sel);
const text = () => window.document.body.innerHTML;

function assert(cond, label) {
  if (cond) {
    console.log(`  ✓ ${label}`);
  } else {
    console.log(`  ✗ ${label}`);
    process.exitCode = 1;
  }
}

(async () => {
  await sleep(600);

  console.log("[1] 默认语言（en-US）首页渲染");
  const root = $("#root");
  assert(root && root.children.length > 0, "#root 有挂载内容");
  assert(text().length > 8000, `首页内容非空（innerHTML ${text().length} 字符）`);
  assert(text().includes("Bring your NAS library"), "英文首页 Hero 文案");
  assert(text().includes("Download latest APK"), "英文下载按钮");
  assert(text().includes("All features") || text().includes("feature modules"), "英文功能区文案");
  assert(window.document.documentElement.lang === "en-US", "<html lang=en-US>");

  console.log("[2] 切换到中文（点击语言开关第一个按钮）");
  const langBtns = window.document.querySelectorAll(".lang-switch button");
  assert(langBtns.length === 2, "语言开关为两个按钮");
  langBtns[0].dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
  await sleep(300);
  assert(window.document.documentElement.lang === "zh-CN", "<html lang=zh-CN>");
  assert(text().includes("为电视而生的开源多源音乐播放器"), "中文 tagline");
  assert(text().includes("下载最新 APK"), "中文下载按钮");
  assert(window.localStorage.getItem("nasmusictv.lang") === "zh-CN", "localStorage 持久化 zh-CN");

  console.log("[3] 路由切换（六个页面均渲染）");
  const routes = [
    { path: "/features", keyword: "全部功能特性" },
    { path: "/screens", keyword: "界面预览" },
    { path: "/effects", keyword: "特效图集" },
    { path: "/download", keyword: "下载与安装" },
    { path: "/about", keyword: "项目定位" },
    { path: "/", keyword: "客厅 K 歌房" },
  ];
  /* 轮询等待关键字出现（React 调度 + jsdom 下渲染耗时不固定，固定 sleep 会偶发抖动） */
  const waitFor = async (predicate, timeout = 2000) => {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      if (predicate()) return true;
      await sleep(100);
    }
    return false;
  };
  for (const r of routes) {
    window.history.pushState({}, "", r.path);
    window.dispatchEvent(new window.PopStateEvent("popstate"));
    const ok = await waitFor(() => text().includes(r.keyword));
    assert(ok, `${r.path} 渲染「${r.keyword}」`);
  }

  console.log("[4] 切回英文后页面同步");
  const langBtns2 = window.document.querySelectorAll(".lang-switch button");
  langBtns2[1].dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
  await sleep(300);
  assert(window.document.documentElement.lang === "en-US", "<html lang=en-US>");
  assert(text().includes("What it is") || text().includes("Home Dashboard"), "关于/首页英文文案");

  console.log("[5] 错误收集");
  const ignorable = (e) => /Could not load|img|Image/i.test(e);
  const real = errors.filter((e) => !ignorable(e));
  if (real.length > 0) {
    real.slice(0, 10).forEach((e) => console.log(`    ${e}`));
  }
  assert(real.length === 0, `零运行时错误（共 ${errors.length} 条，忽略资源类 ${errors.length - real.length} 条）`);

  console.log("[6] URL 参数直达语言（新开 ?lang=zh 窗口）");
  const dom2 = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
    url: "http://localhost/?lang=zh",
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });
  const w2 = dom2.window;
  w2.matchMedia = window.matchMedia;
  w2.scrollTo = () => {};
  w2.Request = window.Request;
  w2.eval(code);
  await sleep(600);
  assert(w2.document.documentElement.lang === "zh-CN", "?lang=zh → <html lang=zh-CN>");
  assert(w2.document.body.innerHTML.includes("为电视而生的开源多源音乐播放器"), "?lang=zh → 直接渲染中文");
  assert(w2.localStorage.getItem("nasmusictv.lang") === "zh-CN", "?lang=zh 写入 localStorage");

  console.log(process.exitCode ? "\nSMOKE FAIL" : "\nSMOKE PASS");
  process.exit(process.exitCode ?? 0);
})().catch((e) => {
  console.error("smoke script crashed:", e);
  process.exit(1);
});
