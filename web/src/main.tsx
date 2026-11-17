import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { I18nProvider } from "./i18n";
import "./styles.css";
import "./styles/ui-extras.css";
import "./styles/theme.css";

/**
 * 入口：全站为深色背景，antd 深色算法与品牌色配置在 I18nProvider 中
 * （随界面语言一并切换 antd 组件库语言 zh_CN / en_US）。
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>
);
