/**
 * 多语言体系 · Provider
 *
 * 职责：
 *   1. 订阅语言变化，同步 antd 组件库语言（zh_CN / en_US）；
 *   2. 同步 <html lang> 与 document.title；
 *   3. 包裹全站主题配置（深色算法 + 品牌色，从 main.tsx 迁入此处，随语言一并切换）。
 *
 * 置于 App 最外层，替代 main.tsx 中原有的 ConfigProvider。
 */

import { useEffect, type ReactNode } from "react";
import { App as AntApp, ConfigProvider, theme } from "antd";
import zhAN from "antd/locale/zh_CN";
import enAN from "antd/locale/en_US";
import { useI18n } from "./useI18n";
import type { Lang } from "./types";

function antdLocale(lang: Lang) {
  return lang === "zh-CN" ? zhAN : enAN;
}

export default function I18nProvider({ children }: { children: ReactNode }) {
  const { lang, t } = useI18n();

  /* <title> 随语言切换，保持分享 / 标签页语义 */
  useEffect(() => {
    document.title = t("meta.title");
  }, [t]);

  return (
    <ConfigProvider
      locale={antdLocale(lang)}
      theme={{
        algorithm: theme.darkAlgorithm,
        /* 【美化要点】品牌主色统一为产品 TV 端的青绿选中态 #00D4AA，
           背景基准色对齐深色沉浸设计系统 #0A0E14，全站视觉语言一致。 */
        token: {
          colorPrimary: "#00d4aa",
          colorInfo: "#00d4aa",
          colorLink: "#00d4aa",
          colorTextBase: "#ffffff",
          colorBgBase: "#0a0e14",
          borderRadius: 12,
          fontSize: 14,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      <AntApp>{children}</AntApp>
    </ConfigProvider>
  );
}
