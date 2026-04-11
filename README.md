# JOPT 2026 Grand Final — Event Companion PWA

JOPT 2026 Grand Final（4/24〜5/6, ベルサール高田馬場）の来場者向けイベントコンパニオンPWA。

- **本番URL**: https://jopt-gf-app.vercel.app
- **参考実装**: [I ♥ POKER](https://lovepo.netlify.app/)

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

※ 旧 `/shindan`（診断）タブは 2026-04-09 の UI刷新で廃止。
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
- **トーナメントカード**: 縦並び、タップで詳細展開
  - トーナメントID、名称、開始/終了時間、チップ数、エントリー費
  - Main Event: 青ボーダー + 青背景 + バッジ
  - Satellite: 専用バッジ
- **データ**: 詳細データは `src/data/jopt_gf2026_data.json`（55,000+行）を参照

#### RANKING（`/ranking`）— 未実装
- COMING SOONプレースホルダー表示中
- 将来: GF期間中のポイント集計・リーダーボード表示

#### CHALLENGE（`/contents`）
- **GTO Challenge** を iframe で全画面埋込（本番URL: https://gto-challenge.vercel.app）
- 3分間タイムアタック型ポーカーGTOクイズ。あなたのポーカーIQを証明せよ
- iframe URL は `NEXT_PUBLIC_GTO_URL` 環境変数で切替可能（デフォルト: `https://gto-challenge.vercel.app`）
- レイアウト: `fixed` 位置決め、Header (top=67px) と BottomNav (bottom=57px) の間に正確にフィット
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
| Service Worker | 🔲 未実装（Workboxによるオフラインキャッシュ予定） |
| LINEブラウザ対応 | User-Agentに`Line`を含む場合、外部ブラウザ誘導オーバーレイを表示 |
| バージョン更新通知 | 🔲 未実装（SW更新検知 → 更新モーダル表示予定） |
| レスポンシブ | モバイルファースト 375〜430px幅。PCは430px中央寄せ |
| パフォーマンス | 全ページ静的生成（SSG）。外部API呼び出しなし |
| フォント | Google Fonts `Noto Serif JP`（400/500/700） |
| ホスティング | Vercel（本番）。将来的にJOPT公式ドメインへ移行予定 |

### 1.4 データ仕様

#### `schedule.json`
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

#### `gallery.json`
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

#### `banners.json`（HOMEプロモカルーセル）
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

#### `jopt_gf2026_data.json`
全トーナメントの詳細仕様（ストラクチャー、Players Guide情報等、55,000+行）。`schedule.json` を補完する大型データ。SCHEDULEページで読み込まれる。

> ℹ️ `sponsors.json` は 2026-04-09 UI刷新で廃止。スポンサーグリッドは HOME から削除されました。

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
│   ├── banners/              # プロモカルーセル用画像
│   ├── gallery/              # Gallery 補助画像
│   └── manifest.json         # PWA Web App Manifest
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
│   ├── data/
│   │   ├── schedule.json          # 日別イベント一覧（概要）
│   │   ├── jopt_gf2026_data.json  # 全トーナメント詳細（55,000+行）
│   │   ├── gallery.json           # Flickrアルバム 8イベント分（サムネ付き）
│   │   └── banners.json           # プロモカルーセル用バナー定義
│   └── styles/
├── next.config.ts
├── package.json
└── tsconfig.json
```

> ⚠️ 旧構造のうち `src/app/shindan/`、`src/components/SponsorGrid.tsx`、`src/data/sponsors.json` は 2026-04-09 の UI刷新で削除されています。

### 2.2 技術スタック

| 項目 | 選定 | バージョン |
|------|------|----------|
| フレームワーク | Next.js (App Router) | 16.2.2 |
| 言語 | TypeScript | 5.x |
| スタイリング | Tailwind CSS | v4 (CSS-based config) |
| フォント | Noto Serif JP (Google Fonts) | next/font 経由 |
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
- フォント: `Noto Serif JP` (serif)
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
npx vercel --prod --scope anpanmank2s-projects  # Vercelデプロイ
```

### 3.3 データ更新

トーナメント情報の変更は `src/data/schedule.json` を直接編集してください。
フォーマットは「1.4 データ仕様」を参照。

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

- **`main`**: 本番デプロイ用（Vercel が自動追従）。直接 push 可だが feature branch 経由推奨
- **`feature/<topic>`**: 機能開発用。完了したら `main` に FF merge してpush

### 5.2 Push Gate（必須）

本番反映前に以下を **必ず** 実施する:

1. `npm run build` が成功すること
2. `npm run dev` で起動し、全5タブをブラウザで目視確認
3. README.md の仕様セクション（`1.2 機能要件`）を **同一コミット内で更新**
4. main に FF merge → `git push origin main`
5. Vercel deploy 完了後、本番URLを `curl -sL https://jopt-gf-app.vercel.app` で確認

### 5.3 インシデント履歴

- **2026-04-09 〜 2026-04-11**: `feature/ui-update` に 9コミット（UI全面刷新）を積んだまま main マージ・push を失念。本番が旧4タブ構成のまま2日間放置。README 仕様表も旧構造のまま乖離。→ 2026-04-11 に秘書が検出・同期復旧。以降は本セクションの Push Gate 手順を必須化。
- **2026-04-11**: `/contents` に [GTO Challenge](https://gto-challenge.vercel.app) を iframe 埋込、タブ名を `CONTENTS` → `CHALLENGE` にリネーム。iframe は `<div>` wrapper に `position: fixed` で `top: 67px; bottom: 57px` 指定（`<iframe>` 単独では intrinsic 150px 高さ問題が発生）。PM 山本 Playwright 検証で重複ゼロ・全チェック PASS を確認。
