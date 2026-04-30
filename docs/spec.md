# Technical Specification: SiteSearch-Solo

## 1. 概要

コンテキストメニュー（右クリックメニュー）から、選択したテキストをあらかじめ設定したサイトでクイック検索できるChrome拡張機能。
外部ライブラリを一切使用せず、Vanilla JSで構築する。
プライバシーを最優先し、すべての設定データはローカル（chrome.storage.local）に保存される。

## 2. 構成要素 (Zero-Dependency)

- **Manifest**: V3
- **Logic**: Vanilla JavaScript (ES6+)
- **UI**: CSS Variables, Material Design 3 (M3) 準拠のHTML/CSS
- **Storage**:
  - `chrome.storage.local`: 検索サイトの設定（名前、URL、キーワード）

## 3. 主要機能の詳細仕様

### 3.1. 検索エンジンの登録
- ユーザーはオプション画面から、任意の検索URLを登録できる。
- URL内の `%s` が検索キーワードに置き換わる。

### 3.2. コンテキストメニュー連携
- テキスト選択時に右クリックすると、登録したサイトのリストが表示される。
- サイトを選択すると、新しいタブで検索結果が開く。

### 3.3. オムニボックス連携
- ブラウザのアドレスバーに `s` と入力し、スペースまたはタブを押すとキーワード検索が可能。

## 4. セキュリティ・プライバシー

- **Local Only**: 外部サーバーへのデータ送信は一切行わない。
- **最小権限**: `storage` と `contextMenus` 権限のみを使用する。
