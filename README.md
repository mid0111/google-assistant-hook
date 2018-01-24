# google-assistant-hook

[![Build Status](https://travis-ci.org/mid0111/google-assistant-hook.svg?branch=master)](https://travis-ci.org/mid0111/google-assistant-hook)
[![Coverage Status](https://coveralls.io/repos/github/mid0111/google-assistant-hook/badge.svg?branch=master)](https://coveralls.io/github/mid0111/google-assistant-hook?branch=master)

Google Home を機能拡張するためのサーバです。

## できること

### 音声での操作

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/tajima0111185/20180124/20180124171143.png?1516781516)

* テレビ（Bravia）の ON/OFF
* Rebuild FM の最新話の再生
* Google Fit へのアクティビティの追加

### ストリーミング再生

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/tajima0111185/20180124/20180124171123.png?1516781547)

* Rebuild FM のポッドキャスト一覧から再生

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/tajima0111185/20180124/20180124171056.png?1516781560)

* 好きな URL を指定して再生

## インストール

1. node (>=8.0.0) インストール
* yarn, pm2 インストール
    ```bash
    npm install -g yarn
    npm install -g pm2
    ```
* [モジュール](https://github.com/mid0111/google-assistant-hook/releases) をダウンロード
* 解凍＆依存モジュールダウンロード
    ```bash
    mkdir google-assistant-hook; cd $_
    tar tfz build.tar.gz
    yarn --prod
    ```
* 設定ファイルの配備（設定の値は [ブログ](http://mid0111.hatenablog.com/entry/2017/12/23/131954) 参照）
    ```bash
    cp server/config/braviaSecret.json.sample server/config/braviaSecret.json && vi $_
    cp server/config/googleClientSecret.json.sample server/config/googleClientSecret.json && vi $_
    cp server/config/serviceAccountKey.json.sample server/config/serviceAccountKey.json && vi $_
    ```
* 起動
    ```bash
    pm2 start npm -- start
    ```
