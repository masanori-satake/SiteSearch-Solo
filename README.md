# SiteSearch-Solo

[![version](https://img.shields.io/badge/version-0.1.0-blue)](projects/app/manifest.json)
[![Privacy-Local Only](https://img.shields.io/badge/Privacy-Local%20Only-brightgreen)](AGENTS.md)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)](projects/app/manifest.json)

〜コンテキストメニューからクイック検索を実現するローカル完結型Chrome拡張機能〜

## プロジェクト概要

SiteSearch-Soloは、プライバシーを最優先に設計された、汎用的なサイト内検索支援ツールです。
ブラウザ上のテキストを選択して右クリックするだけで、あらかじめ登録しておいた任意の検索エンジンや社内ツールで即座に検索を開始できます。

設計思想や行動指針については [AGENTS.md](AGENTS.md) を参照してください。

## 特徴

- **クイック検索**:
  Webページ上のテキストを選択して右クリックするだけで、設定したサイトでの検索が可能です。
- **完全ローカル実行**:
  すべてのデータはブラウザ内の `chrome.storage.local` に保存されます。外部サーバーへの送信は一切行われず、プライバシーを強力に保護します。
- **Vanilla JS & ゼロ依存**:
  外部ライブラリを一切使用せず、ブラウザ標準のAPIのみで構築されています。OSSのEOLリスクを排除し、長期にわたる安定動作を保証します。
- **Material 3 デザイン**:
  Google Material 3 (M3) に準拠したUI。直感的でモダンな設定画面を提供します。
- **オムニボックス対応**:
  アドレスバーから「s + [Tab/Space]」でキーワード検索が可能です。

## インストール方法

### 🛠️ 開発版 (Zip)

1. このリポジトリからソースコードをダウンロードまたはクローンします。
1. ブラウザで拡張機能管理ページを開きます（Chrome: `chrome://extensions`）。
1. 「デベロッパー モード」をオンにします。
1. 「パッケージ化されていない拡張機能を読み込む」ボタンをクリックし、`projects/app` フォルダを選択します。
1. ツールバーの拡張機能アイコンをクリックし、SiteSearch-Solo をピン留めして使用します。

## 使用方法

1. **検索エンジンの登録**: オプション画面から、検索に使用したいサイトのURL（キーワード部分は `%s`）を登録します。
1. **右クリック検索**: Webページ上のテキストを選択し、右クリックメニューから登録したサイトを選択します。
1. **アドレスバー検索**: アドレスバーに `s` と入力した後に検索語句を入力して実行します。

## プライバシーとセキュリティ

- **Local Only**: 本アプリは、外部への通信を一切行わないことが保証されています。
- **トラッキングなし**: アクセス解析や広告、外部サービスへのデータ送信は一切行いません。
- **透明性**: プログラムは Vanilla JS で記述されており、依存関係によるブラックボックスがありません。

______________________________________________________________________

This project uses Material Design 3, an open-source design system by Google.

## 免責事項 (Disclaimer)

【免責事項】
本ソフトウェアは個人開発によるオープンソースプロジェクトであり、無保証です。利用により生じたいかなる損害についても、開発者は一切の責任を負いません。自己責任でご利用ください。

[Disclaimer]
This software is a personal open-source project and is provided "AS IS" without warranty of any kind. Use at your own risk, as per the MIT License.
