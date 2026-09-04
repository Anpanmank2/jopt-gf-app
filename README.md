# JOPT 2026 Grand Final — Event Companion PWA

JOPT 2026 Grand Final（4/24〜5/6, ベルサール高田馬場）の来場者向けイベントコンパニオンPWA。

- **本番URL**: https://jopt-gf-app.vercel.app （2026-09-03時点 HTTP 200）
- **参考実装**: [I ♥ POKER](https://lovepo.netlify.app/)

> 断面メモ（2026-09-03）: 対象イベント（2026-04-24〜05-06）は終了済み。最終コミットは 2026-04-15 で、以降の機能追加はありません。本 README は 2026-09-03 時点の main の実装に合わせて記述しています。

---

## 1. 要件定義書

### 1.1 プロダクト概要

| 項目 | 内容 |
|------|------|
| プロダクト名 | JOPT 2026 Grand Final Companion |
| 対象ユーザー | JOPT Grand Final 来場者（日本語話者中心） |
| 目的 | イベントスケジュール確認、会場情報、写真ギャラリーの提供 |
| プラットフォーム | モバイルWebブラウザ（PWA対応） |
| 配信手段 | LINE / X / Instagram 経由のURL共有 |

### 1.2 機能要件

#### 画面構成（5タブ）

BottomNav 並び順: HOME / SCHEDULE / RANKING / GALLERY / CHALLENGE

| # | 画面 | パス | 状態 | 説明 |
|---|------|------|------|------|
| 1 | HOME | `/` | ✅ 実装済 | ヒーロー背景画像、YouTube埋込プレイヤー、プロモカルーセル、会場アクセス、SNSフォロー |
| 2 | SCHEDULE | `/schedule` | ✅ 実装済 | 日付タブ + Players Guide、Game × Stake フィルタ、拡張トーナメントカード |
| 3 | RANKING | `/ranking` | 🔲 COMING SOON | GF期間中のポイント集計・ランキング表示（予定） |
| 4 | GALLERY | `/gallery` | ✅ 実装済 | Flickrサムネイル付きアルバムカード（Staff / Companion 両方へ直リンク） |
| 5 | CHALLENGE | `/contents` | ✅ 実装済 | **GTO Challenge** iframe 埋込（3分間タイムアタック型ポーカーGTOクイズ） |

※ 旧 shindan（診断）タブは 2026-04-09 の UI刷新で廃止（ディレクトリごと削除済み）。
※ `/contents` のルートは維持したまま表示ラベルのみ `CHALLENGE` にリネーム（2026-04-11）。

#### HOME（`/`）
- **ヒーロー**: 背景画像（`public/images/hero-bg.jpg`）+ 日程 / タイトル / 会場名
- **YouTube埋込プレイヤー**: iframe直埋め込み（`YouTubeLink`）
- **プロモカルーセル**: `banners.json` を参照するスワイプ式バナー（`PromoCarousel`）
- **会場アクセス**: 住所・交通情報カード（`VenueAccess`）
- **SNSフォロー**: X / Instagram / LINE の3ボタン
- **スポンサーグリッド**: 2026-04-09 の UI刷新で削除（`SponsorGrid` / `sponsors.json` は廃止）

#### SCHEDULE（`/schedule`）
- **Players Guide セクション**: 各日上部に Players Guide 情報を展開表示
- **日付タブバー**: 4/24(Fri)〜5/6(Wed) の13日間、横スクロール対応、当日自動選択
- **Game × Stake フィルタ**: `src/config/filterConfig.ts` 駆動の2軸フィルタ
  - Game: All / NLH / PLO / MIX / SAT
  - Stake: All / Low (〜¥30,000) / Medium (¥30,001〜¥90,000) / High (¥90,001〜)
  - フィルタロジックは `src/hooks/useEventFilter.ts`
- **カレンダーストリップ**: 日付タブは月ラベル（APR / MAY）付きの sticky 横スクロール帯（`src/app/schedule/page.tsx`、ヘッダー直下 top 52px に吸着）
- **トーナメントカード**: 縦並び、タップで詳細展開
  - トーナメントID、名称、開始/終了時間、チップ数、エントリー費
  - 展開時は **STRUCTURE / INFO の2タブ**（`src/components/EventCard.tsx`。STRUCTURE はレベル表・Reg Close 行・Day2 END 行、INFO は賞金/ルール等）
  - Main Event: 青ボーダー + 青背景 + バッジ
  - Satellite: 専用バッジ
- **データ**: SCHEDULE が読むのは `src/data/jopt_gf2026_data.json` のみ（2026-09-03時点 59,731 行）

#### RANKING（`/ranking`）— 未実装
- COMING SOONプレースホルダー表示中
- 将来: GF期間中のポイント集計・リーダーボード表示

#### CHALLENGE（`/contents`）
- **GTO Challenge** を iframe で全画面埋込（本番URL: https://gto-challenge.vercel.app・2026-09-03時点 HTTP 200）
- 3分間タイムアタック型ポーカーGTOクイズ。あなたのポーカーIQを証明せよ
- iframe URL は `NEXT_PUBLIC_GTO_URL` 環境変数で切替可能（デフォルト: https://gto-challenge.vercel.app ）
- レイアウト: `/contents` だけ Header を非表示にし（`src/components/LayoutShell.tsx`）、iframe は fixed で top 0 〜 BottomNav 直上（bottom 57px）まで使う
- GTO Challenge 側の登録は8桁 gameID + ニックネーム（メール認証なし、軽量）
- タブ名は `CHALLENGE`（★星アイコン）、ルートは `/contents` のまま

#### GALLERY（`/gallery`）
- **Flickrサムネイル付きアルバムカード**: 各イベントのカバー画像をFlickr CDN (`live.staticflickr.com`) から直取得
- **Staff / Companion 両対応**: `stuffAlbumId` と `companionAlbumId` の両アルバムへ直リンク
- **最新順に8イベント表示**、最新には LATEST バッジ
- **リンク形式**: `/albums/{id}`（アルバム直接表示）

### 1.3 非機能要件

| 項目 | 要件 |
|------|------|
| PWA | `manifest.json` 配置済み。ホーム画面追加対応 |
| Service Worker | 🔲 未実装。`next-pwa` は依存に入っているが `next.config.ts` では未設定（2026-09-03時点） |
| LINEブラウザ対応 | User-Agentに`Line`を含む場合、外部ブラウザ誘導オーバーレイを表示 |
| バージョン更新通知 | 🔲 未実装（SW更新検知 → 更新モーダル表示予定） |
| レスポンシブ | モバイルファースト 375〜430px幅。PCは430px中央寄せ |
| パフォーマンス | 全ページ静的生成（SSG）。外部API呼び出しなし |
| フォント | Google Fonts Noto Sans JP（2026-04-15 に Noto Serif JP から変更。japanopenpoker.com に合わせた） |
| 埋め込み制限 | `next.config.ts` が CSP `frame-ancestors` を付与（`'self'` + japanopenpoker.com とそのサブドメインのみ） |
| ホスティング | Vercel（本番）。将来的にJOPT公式ドメインへ移行予定 |

### 1.4 データ仕様

#### `src/data/schedule.json`（2026-09-03時点 未使用）

⚠ どのコンポーネントからも import されていません（`grep -rn "@/data/" src/` の実測ヒットは jopt_gf2026_data.json / gallery.json / banners.json の3本のみ）。SCHEDULE 画面は `src/data/jopt_gf2026_data.json` を直接読みます。以下は残っているファイルの形です。

```
{
  "eventDates": { "start": "2026-04-24", "end": "2026-05-06" },
  "days": [
    {
      "date": "2026-04-24",
      "dayOfWeek": "Fri",
      "dayLabel": "Day 1",
      "events": [
        {
          "id": "02",            // トーナメント番号（"s01"等はサテライト）
          "name": "NLH Warm-up",
          "startTime": "18:00",
          "closeTime": "21:30",  // Reg Close時刻（Day2等はnull）
          "chips": 30000,
          "entry": "¥12,000",
          "isMainEvent": false,
          "isSatellite": false
        }
      ]
    }
  ]
}
```

#### `src/data/gallery.json`（2026-09-03時点 8 イベント）
```
[
  {
    "eventName": "2026 Osaka #01",
    "period": "2026.03.18 – 03.22",
    "stuffAlbumId": "72177720332300800",  // Flickr Staff アルバム
    "companionAlbumId": "72177720332323068", // Companion アルバム
    "imageAlbumId": "72177720332323068",   // Image アルバム（カード直リンク先）
    "flickrLink": "https://www.flickr.com/photos/190979093@N07/albums/72177720332323068",
    "thumbnailUrl": "https://live.staticflickr.com/65535/55153288532_5d80e63cab_z.jpg",
    "isLatest": true
  }
]
```

#### `src/data/banners.json`（HOMEプロモカルーセル・2026-09-03時点 3 件）

⚠ 参照先の画像ディレクトリ（public 配下の banners）はリポジトリに存在しません。カルーセル画像を出すには画像の配置が必要です。

```
[
  {
    "id": 1,
    "image": "/banners/main-event.webp",
    "alt": "JOPT 2026 Grand Final - Main Event",
    "url": "/schedule",
    "active": true
  }
]
```

#### `src/data/jopt_gf2026_data.json`
全トーナメントの詳細仕様（ストラクチャー、Players Guide情報等。2026-09-03時点 59,731 行）。**SCHEDULE 画面が実際に読む唯一のトーナメントデータ**。

> ℹ️ sponsors.json は 2026-04-09 UI刷新で廃止。スポンサーグリッドは HOME から削除されました。

### 1.5 外部リンク一覧

| 用途 | URL |
|------|-----|
| YouTube | https://youtube.com/@japanopenpokertour |
| X | https://x.com/japanopenpoker |
| Instagram | https://instagram.com/japanopen |
| LINE | https://lin.ee/8kCSr85 |
| Flickr アルバム一覧 | https://www.flickr.com/photos/190979093@N07/albums/ |
| JOPT公式サイト | https://japanopenpoker.com/ |
| GTO Challenge (`/contents` で iframe 埋込) | https://gto-challenge.vercel.app |

---

## 2. 構成説明

### 2.1 ディレクトリ構造

```
jopt-gf-app/
├── public/
│   ├── icons/                # PWAアイコン (192px / 512px)
│   ├── images/
│   │   └── hero-bg.jpg       # HOMEヒーロー背景画像
│   └── manifest.json         # PWA Web App Manifest
│   # ⚠ banners/ gallery/ は 2026-09-03時点 未配置（banners.json の参照先が無い）
├── src/
│   ├── app/
│   │   ├── layout.tsx        # ルートレイアウト（LayoutShell: Header + BottomNav + LINE検知）
│   │   ├── globals.css       # Tailwind v4テーマ + デザインシステム定義
│   │   ├── page.tsx          # HOME (/)
│   │   ├── schedule/page.tsx # SCHEDULE (/schedule) — クライアントコンポーネント
│   │   ├── ranking/page.tsx  # RANKING COMING SOON (/ranking)
│   │   ├── gallery/page.tsx  # GALLERY (/gallery)
│   │   └── contents/page.tsx # CHALLENGE: GTO Challenge iframe embed (/contents)
│   ├── components/
│   │   ├── Header.tsx        # 固定ヘッダー
│   │   ├── LayoutShell.tsx   # ルートレイアウトシェル
│   │   ├── BottomNav.tsx     # 固定ボトムナビ（5タブ）— "use client"
│   │   ├── HeroBanner.tsx    # HOMEヒーロー（背景画像）
│   │   ├── YouTubeLink.tsx   # YouTube埋込プレイヤー
│   │   ├── PromoCarousel.tsx # HOMEプロモカルーセル — "use client"
│   │   ├── VenueAccess.tsx   # 会場アクセス情報カード
│   │   ├── FollowButtons.tsx # SNSフォロー3ボタン
│   │   ├── EventCard.tsx     # トーナメントカード（展開式）— "use client"
│   │   ├── EventFilter.tsx   # SCHEDULE Game×Stakeフィルタ — "use client"
│   │   └── LineOverlay.tsx   # LINEブラウザ検知オーバーレイ — "use client"
│   ├── config/
│   │   └── filterConfig.ts   # Game / Stake フィルタ定義（設定駆動）
│   ├── hooks/
│   │   └── useEventFilter.ts # フィルタ適用ロジック
│   └── data/
│       ├── jopt_gf2026_data.json  # 全トーナメント詳細（59,731 行）— SCHEDULE が読む唯一のデータ
│       ├── gallery.json           # Flickrアルバム 8イベント分（サムネ付き）
│       ├── banners.json           # プロモカルーセル用バナー定義
│       └── schedule.json          # 旧・日別イベント一覧（未使用）
├── next.config.ts
├── package.json
└── tsconfig.json
```

> ⚠️ 旧構造のうち shindan ページ、SponsorGrid コンポーネント、sponsors.json は 2026-04-09 の UI刷新で削除済み（いずれもリポジトリに存在しません）。

### 2.2 技術スタック

| 項目 | 選定 | バージョン |
|------|------|----------|
| フレームワーク | Next.js (App Router) | 16.2.2 |
| 言語 | TypeScript | 5.x |
| スタイリング | Tailwind CSS | v4 (CSS-based config) |
| フォント | Noto Sans JP (Google Fonts) | next/font 経由 |
| PWA | manifest.json + meta tags | ネイティブ |
| デプロイ | Vercel | Production |
| データ | 静的JSON (src/data/) | ビルド時読み込み |

### 2.3 デザインシステム

#### カラーパレット（白7 : 青2 : 黒1）
| トークン | 値 | 用途 |
|---------|------|------|
| `bg-primary` | `#FFFFFF` | 背景メイン |
| `bg-secondary` | `#F4F7FB` | セクション背景 |
| `bg-tertiary` | `#EAF0F8` | カード展開エリア |
| `blue-900` | `#1A4B8C` | ヘッダー、メインアクセント |
| `blue-700` | `#2563A8` | Main Eventボーダー |
| `blue-500` | `#3478BE` | セカンダリアクセント |
| `blue-100` | `#D6E4F5` | サテライトバッジ、薄いボーダー |
| `blue-50` | `#EBF1F9` | Main Event背景、スポンサーバッジ |
| `text-primary` | `#111111` | 本文 |
| `text-secondary` | `#444444` | 補足テキスト |
| `text-muted` | `#888888` | 非選択タブ、メタ情報 |
| `border-default` | `#E5E5E5` | カード・区切り線 |

#### タイポグラフィ
- フォント: Noto Sans JP (sans-serif)
- 見出し: `font-weight: 700`
- 本文: `font-weight: 400`
- ラベル/強調: `font-weight: 500`
- セクションヘッダー: 英語大文字、`letter-spacing: 2px`、`color: blue-900`

#### レイアウト
- モバイルファースト: 375〜430px
- PC: `max-width: 430px` 中央寄せ（`body`に適用）
- カード角丸: `rounded-lg` (8px)
- ボーダー: `0.5px solid border-default`
- パディング: カード内 `12px`、セクション `16px`

### 2.4 コンポーネント一覧

| コンポーネント | 種別 | 説明 |
|-------------|------|------|
| `Header` | Server | 固定ヘッダー。「JOPT」ロゴ + 「GRAND FINAL 2026」サブテキスト |
| `LayoutShell` | Client | ルートレイアウトシェル（Header + BottomNav + LineOverlay統合） |
| `BottomNav` | Client | 5タブナビ（HOME/SCHEDULE/RANKING/GALLERY/CHALLENGE）。`usePathname()`でアクティブ判定 |
| `HeroBanner` | Server | 背景画像付きヒーロー。日程、タイトル、会場名、タグライン |
| `YouTubeLink` | Client | YouTube埋込プレイヤー（iframe） |
| `PromoCarousel` | Client | HOMEプロモーションバナーのスワイプカルーセル。`banners.json`駆動 |
| `VenueAccess` | Server | 会場アクセス情報（住所・交通）カード |
| `FollowButtons` | Server | X/Instagram/LINEの3ボタン横並び |
| `EventCard` | Client | トーナメント情報カード。`useState`で展開/折りたたみ |
| `EventFilter` | Client | SCHEDULEのGame×Stakeフィルタ UI。`filterConfig.ts`駆動 |
| `LineOverlay` | Client | LINE UA検知でフルスクリーンオーバーレイ表示 |

### 2.5 ページ別レンダリング

| ページ | レンダリング | 理由 |
|--------|-----------|------|
| `/` | SSG + Client hydration | PromoCarousel / YouTube埋込でClient状態必要 |
| `/schedule` | SSG + Client hydration | 日付タブ選択・フィルタ・カード展開にClient状態必要 |
| `/ranking` | SSG | 静的プレースホルダー（COMING SOON） |
| `/gallery` | SSG | JSONデータのみ |
| `/contents` | SSG | GTO Challenge iframe のみ（動的要素なし） |

---

## 3. 開発ガイド

### 3.1 ローカル開発

```bash
npm install
npm run dev
# → http://localhost:3000
```

### 3.2 ビルド & デプロイ

```bash
npm run build    # 本番ビルド
npx vercel --prod --yes    # Vercel 本番へ手動デプロイ（push だけでは反映されない）
```

### 3.3 データ更新

トーナメント情報の変更は `src/data/jopt_gf2026_data.json` を編集してください（SCHEDULE 画面が読むのはこのファイルのみ。schedule.json は未使用の旧データです）。
ギャラリーは `src/data/gallery.json`、HOME バナーは `src/data/banners.json`。フォーマットは「1.4 データ仕様」を参照。

---

## 4. 未実装タスク（優先度順）

| # | タスク | 優先度 | 説明 |
|---|-------|-------|------|
| 1 | RANKING ページ実装 | 高 | GF期間中のポイント集計・リーダーボード表示 |
| 2 | Service Worker | 高 | Workboxによる静的アセットキャッシュ、オフライン表示 |
| 3 | バージョン更新通知 | 中 | SW更新検知時に「新しいバージョンがあります / 更新する」モーダル |
| 4 | PWAアイコン差し替え | 低 | 現在はプレースホルダー。JOPTロゴの192/512pxアイコンに差し替え |
| 5 | JOPTロゴ配置 | 低 | ヘッダーに `japanopenpoker.com` のロゴ画像を表示 |
| 6 | CHALLENGE iframe の履歴管理 | 低 | iframe 内遷移がブラウザ戻るで親 history を汚染する問題（iOS Safari 現象）対応 |

---

## 5. ブランチ・デプロイ運用

### 5.1 ブランチ戦略

- **`main`**: 本番系のブランチ。直接 push 可だが feature branch 経由を推奨
- feature/<topic>: 機能開発用。完了したら main に FF merge して push
- ⚠ **Vercel は git push では自動デプロイされません**。本番反映は必ず `npx vercel --prod` を手動実行する

### 5.2 Push Gate（必須）

本番反映前に以下を **必ず** 実施する:

1. `npm run build` が成功すること
2. `npm run dev` で起動し、全5タブをブラウザで目視確認
3. README.md の仕様セクション（`1.2 機能要件`）を **同一コミット内で更新**
4. main に FF merge → `git push origin main`
5. `npx vercel --prod --yes` で手動デプロイ（push だけでは本番に出ない）
6. Vercel deploy 完了後、本番URLを `curl -sL https://jopt-gf-app.vercel.app` で確認（CDN キャッシュが強いのでクエリストリングでバストする）

### 5.3 インシデント履歴

- **2026-04-09 〜 2026-04-11**: 機能ブランチに 9コミット（UI全面刷新）を積んだまま main マージ・push を失念。本番が旧4タブ構成のまま2日間放置。README 仕様表も旧構造のまま乖離。→ 2026-04-11 に検出・同期復旧。以降は本セクションの Push Gate 手順を必須化。
- **2026-04-11**: `/contents` に [GTO Challenge](https://gto-challenge.vercel.app) を iframe 埋込、タブ名を CONTENTS → CHALLENGE にリネーム。iframe は wrapper 要素に `position: fixed` を指定（iframe 単独では intrinsic 150px 高さ問題が発生）。PM の Playwright 検証で重複ゼロ・全チェック PASS。
- **2026-04-12**: カレンダーストリップ（月ラベル付き日付タブ）と EventCard の STRUCTURE / INFO タブを追加。
- **2026-04-15**: フォントを Noto Sans JP に統一（`/contents` の Header 非表示化も同時期）。これが最終コミット。
