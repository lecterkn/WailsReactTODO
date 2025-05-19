# README

## 概要

WailsとReactを使用したTODOアプリ

- フロントエンドをReact(TypeScript)で作成
- バックエンドにGoで作成
- sqliteを使用してデータを永続化

## 環境

- go version go1.24.3
- nodejs v22.14.0

## 実行方法

### 1. wailsをインストール

```sh
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### 2. 実行

```sh
wails dev
```

## ビルド方法

### 1. ビルドする

```sh
wails build
```

### 実行する

`build/bin/` フォルダに出力された実行ファイルを実行する
※ 実行ファイルがない場合はビルド時のログから確認
