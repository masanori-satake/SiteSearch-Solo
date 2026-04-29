# docs/spec.md: Team Search Hub (TSH) Specification

## 1. Project Overview

社内ツールのURL変更（DCからCloudへの移行等）に柔軟に対応し、パターンマッチによるインテリジェントな遷移を提供する検索ショートカット管理ツール。

## 2. UI/UX Design System (Material 3 Implementation)

- **Color System:** `Primary`, `Surface`, `Error`, `Outline` 等のトーン配色をCSS変数で定義。
- **Components:**
  - **Outlined Text Field:** フォーカス時にラベルが浮き上がるM3スタイルをCSSで再現。
  - **Cards & Lists:** 検索エンジン一覧をM3のリスト形式で表示。
  - **Badges/Alerts:** キーワード競合時に表示するエラーメッセージ。

## 3. Functional Requirements (Details)

### 3.1 Advanced Shortcut Management

- キーワード、名称、URL（%s置換）、正規表現パターンの4項目。
- キーワード重複時の警告表示ロジック。

### 3.2 Intelligent Context Menu

- 選択されたテキストを正規表現で走査し、マッチした設定をメニューのトップに昇格させる動的生成ロジック。
- 未マッチの設定は「その他の検索」サブメニューに集約。

### 3.3 URL Construction Support (Preset)

- プリセット選択時に、定型的なQueryString（例: `?jql=key%3D%s`）を末尾に自動付加。

## 4. Technical Architecture

- `manifest.json`: Manifest V3
- `background.js`: Omnibox監視およびコンテキストメニューの動的更新。
- `options.js`: 設定管理、バリデーション、インポート/エクスポート.
- `storage`: `chrome.storage.local` を使用。
