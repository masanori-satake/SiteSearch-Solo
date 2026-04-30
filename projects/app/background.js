/**
 * SiteSearch-Solo - background.js
 *
 * Material 3 Color Tokens (CSS Variables Reference)
 * -----------------------------------------------
 * --md-sys-color-primary: #6750A4;
 * --md-sys-color-on-primary: #FFFFFF;
 * --md-sys-color-primary-container: #EADDFF;
 * --md-sys-color-on-primary-container: #21005D;
 * --md-sys-color-secondary: #625B71;
 * --md-sys-color-on-secondary: #FFFFFF;
 * --md-sys-color-surface: #FEF7FF;
 * --md-sys-color-on-surface: #1D1B20;
 * --md-sys-color-surface-variant: #E7E0EB;
 * --md-sys-color-on-surface-variant: #49454F;
 * --md-sys-color-outline: #79747E;
 * --md-sys-color-error: #B3261E;
 * --md-sys-color-on-error: #FFFFFF;
 * --md-sys-color-error-container: #F9DEDC;
 * --md-sys-color-on-error-container: #410E0B;
 */

/**
 * キーワードが重複しているかチェックします。
 * @param {Array} engines 検索エンジンのリスト
 * @param {string} keyword チェックするキーワード
 * @param {string|null} excludeId 除外するID（編集中の場合）
 * @returns {boolean} 重複している場合はtrue
 */
function isKeywordDuplicate(engines, keyword, excludeId = null) {
  return engines.some(engine => engine.keyword === keyword && engine.id !== excludeId);
}

/**
 * テキストにマッチする検索エンジンを正規表現パターンに基づいてフィルタリングします。
 * @param {Array} engines 検索エンジンのリスト
 * @param {string} text 評価するテキスト
 * @returns {Array} マッチした検索エンジンのリスト
 */
function getMatchedEngines(engines, text) {
  return engines.filter(engine => {
    if (!engine.pattern) return false;
    try {
      // Use a cache or pre-compile patterns in a real-world scenario if performance is critical
      const regex = new RegExp(engine.pattern);
      return regex.test(text);
    } catch (e) {
      console.error("Invalid regex:", engine.pattern);
      return false;
    }
  });
}

/**
 * ストレージから検索エンジンのリストを取得します。
 * @returns {Promise<Array>} 検索エンジンのリスト
 */
async function getEngines() {
  const result = await chrome.storage.local.get('engines');
  return result.engines || [];
}

/**
 * 選択テキストに基づいてコンテキストメニューを更新します。
 * @param {string} selectionText 現在選択されているテキスト
 */
async function updateContextMenus(selectionText = "") {
  await chrome.contextMenus.removeAll();
  const engines = await getEngines();

  if (engines.length === 0) return;

  const matched = selectionText ? getMatchedEngines(engines, selectionText) : [];
  const matchedIds = new Set(matched.map(e => e.id));
  const unmatched = engines.filter(e => !matchedIds.has(e.id));

  // Top level: matched engines
  matched.forEach(engine => {
    chrome.contextMenus.create({
      id: `engine-${engine.id}`,
      title: `Search ${engine.name} for "%s"`,
      contexts: ["selection"]
    }, () => {
      if (chrome.runtime.lastError) console.debug("Menu creation ignored:", chrome.runtime.lastError.message);
    });
  });

  // "Other searches" submenu if there are unmatched engines
  if (unmatched.length > 0) {
    chrome.contextMenus.create({
      id: "other-searches",
      title: "Other Searches",
      contexts: ["selection"]
    }, () => {
      if (chrome.runtime.lastError) console.debug("Menu creation ignored:", chrome.runtime.lastError.message);
    });

    unmatched.forEach(engine => {
      chrome.contextMenus.create({
        id: `engine-${engine.id}`,
        parentId: "other-searches",
        title: engine.name,
        contexts: ["selection"]
      }, () => {
        if (chrome.runtime.lastError) console.debug("Menu creation ignored:", chrome.runtime.lastError.message);
      });
    });
  }
}

// Listeners
chrome.runtime.onInstalled.addListener(() => {
  updateContextMenus();
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId.startsWith("engine-")) {
    const id = info.menuItemId.replace("engine-", "");
    const engines = await getEngines();
    const engine = engines.find(e => e.id === id);
    if (engine && engine.url) {
      const url = engine.url.replace("%s", encodeURIComponent(info.selectionText));
      chrome.tabs.create({ url });
    }
  }
});

// Listen for selection updates or engine changes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SELECTION_CHANGED") {
    updateContextMenus(message.text);
  } else if (message.type === "ENGINES_UPDATED") {
    updateContextMenus();
  }
});

// Omnibox support
chrome.omnibox.onInputEntered.addListener(async (text) => {
  const engines = await getEngines();
  const [kw, ...queryParts] = text.split(/\s+/);
  const query = queryParts.join(" ");
  const engine = engines.find(e => e.keyword === kw);

  if (engine && query) {
    const url = engine.url.replace("%s", encodeURIComponent(query));
    chrome.tabs.create({ url });
  } else if (engines.length > 0) {
    // Default search with first engine if keyword not found
    const url = engines[0].url.replace("%s", encodeURIComponent(text));
    chrome.tabs.create({ url });
  }
});
