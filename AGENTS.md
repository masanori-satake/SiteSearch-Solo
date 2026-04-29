# AGENTS.md for Team Search Hub (TSH)

## 1. Core Philosophy (Solo Series Heritage)

- **No-Library / Vanilla JS Policy:** 外部ライブラリ、外部CSSフレームワーク（Tailwind等）、ビルドツールを一切禁止する。
- **Material 3 Design Fidelity:** ライブラリを使わず、CSS変数でM3のトークン（色、角丸、余白、タイポグラフィ）をネイティブに再現する。
- **Privacy First (Local Only):** 外部サーバー通信なし。`chrome.storage.local` で完結させる。

## 2. Technical Standards

- **Intelligent Pattern Matching:** `chrome.contextMenus.update` を活用し、選択テキストに応じた動的なメニュー制御を行う。
- **Validation Logic:** キーワードの重複チェックおよび正規表現の妥当性チェックをリアルタイムで行う。
- **CSS Variable Driven:** M3の配色（System tokens）をCSS変数で管理し、ダークモードやステートフィードバック（Hover, Focus, Active）を実装する。

## 3. UI/UX Principles

- **Conflict Awareness:** ユーザーが設定ミス（キーワード重複）に気づけるよう、視覚的な警告（M3準拠のError色）を提示する。
- **State Feedback:** M3の「State Layer」を模したインタラクションを必ず実装する。
