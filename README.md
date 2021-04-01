# Read Out

読書をしたあと、記憶の定着化を図るため読書した本をアウトプットする読書アプリを作成しました。

- 読んだ本、ページ、感想をアウトプットできる
- 日々の読書量をグラフ、数値化させ成長を促す
- 読みたい書籍を検索できる検索機能

## URL

下記のページにて、公開中です。

- URL:[https://my-portfolio-986db.web.app/](https://my-portfolio-986db.web.app/)

ゲストボタンでログインができます。

<img width="620px" src="./src/img/portfolio_top_page.png">

## デモ

### 投稿ページ

<img width="520px" src="https://user-images.githubusercontent.com/69884513/113231190-a80c4d80-92d5-11eb-8c80-75406a5ee090.gif">

### 検索ページ

<img width="520px" src="https://user-images.githubusercontent.com/69884513/113231047-5368d280-92d5-11eb-8599-7d65600f935b.gif">

### プロフィールページ

<img width="520px" src="https://user-images.githubusercontent.com/69884513/113230789-c0c83380-92d4-11eb-98e7-3098e9e9b22a.gif">

## 機能一覧

- ログイン、ユーザー作成機能
  - バリデーション機能
- ゲストログイン機能
- 投稿機能
  - 画像追加
  - 削除機能
  - 編集機能
- プロフィール管理機能
- 検索機能
- グラフ機能

## 使用技術

- HTML5
- CSS3
- JavaScript
- TypeScript
  - Atomic Design
- React
- webpack
  - development
  - production
- Firebase
- Google Books API

## 工夫した点

- `Firebase` を使用して、データの保存・取得・編集・削除機能の作成
- `Chart.js` を使用し、日付に応じて投稿した数をグラフ化
- 投稿時に `Google Books API` を使用し、読んだ本のタイトルに合わせた画像の取得

## 著者

こたろー
