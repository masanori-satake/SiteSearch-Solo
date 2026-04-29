const translations = {
  en: {
    usage: "Usage",
    privacy: "Privacy Policy",
    langEn: "English",
    langJa: "Japanese",
    tagline: "~Local-first Chrome extension for quick context menu searches~",
    cta: "Add to Chrome (Coming Soon)",
    projectOverview: "Project Overview",
    overviewText: "SiteSearch-Solo is a general-purpose site search support tool designed with privacy as the top priority. You can register URLs for frequently used search engines or internal tools and start searching instantly from selected text.",
    features: "Features",
    featureQuick: "Quick Search",
    featureQuickText: "Just select text on a web page and right-click to search on your configured sites.",
    featureLocal: "Full Local Execution",
    featureLocalText: "Configured keywords and URLs are all stored within the browser. No data is ever sent to an external server.",
    featureM3: "Material 3 UI",
    featureM3Text: "Provides an intuitive and modern settings screen using the Google Material 3 (M3) design.",
    install: "Installation",
    installStep1: "Download the source code from this repository.",
    installStep2: "Turn on 'Developer mode' in the Chrome Extensions page.",
    installStep3: "Select 'Load unpacked' and choose the `projects/app` folder.",
    copyright: "&copy; 2026 SiteSearch-Solo. All rights reserved."
  },
  ja: {
    usage: "使い方",
    privacy: "プライバシーポリシー",
    langEn: "English",
    langJa: "日本語",
    tagline: "〜コンテキストメニューからクイック検索を実現するローカル完結型Chrome拡張機能〜",
    cta: "Chrome ウェブストアで追加（準備中）",
    projectOverview: "プロジェクト概要",
    overviewText: "SiteSearch-Soloは、プライバシーを最優先に設計された、汎用的なサイト内検索支援ツールです。よく使う検索エンジンや社内ツールのURLを登録し、選択したテキストから即座に検索を開始できます。",
    features: "特徴",
    featureQuick: "クイック検索",
    featureQuickText: "Webページ上のテキストを選択して右クリックするだけで、設定したサイトでの検索が可能です。",
    featureLocal: "完全ローカル実行",
    featureLocalText: "設定したキーワードやURLはすべてブラウザ内に保存されます。外部サーバーへの送信は一切行われません。",
    featureM3: "Material 3 UI",
    featureM3Text: "Google Material 3 (M3) デザインを採用した、直感的でモダンな設定画面を提供します。",
    install: "インストール方法",
    installStep1: "このリポジトリからソースコードをダウンロードします。",
    installStep2: "Chromeの拡張機能ページで「デベロッパーモード」をONにします。",
    installStep3: "「パッケージ化されていない拡張機能を読み込む」から、`projects/app` フォルダを選択します。",
    copyright: "&copy; 2026 SiteSearch-Solo. All rights reserved."
  }
};

function updateContent(lang) {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll(".lang-switch").forEach(button => {
    button.classList.toggle("active", button.getAttribute("data-lang") === lang);
  });

  document.documentElement.lang = lang;
}

document.querySelectorAll(".lang-switch").forEach(button => {
  button.addEventListener("click", () => {
    const lang = button.getAttribute("data-lang");
    updateContent(lang);
    localStorage.setItem("preferred-lang", lang);
  });
});

const savedLang = localStorage.getItem("preferred-lang") || (navigator.language.startsWith("ja") ? "ja" : "en");
updateContent(savedLang);
