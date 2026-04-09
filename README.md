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

#### 画面構成（4タブ）

| # | 画面 | パス | 状態 | 説明 |
|---|------|------|------|------|
| 1 | HOME | `/` | ✅ 実装済 | ヒーローバナー、YouTube公式リンク、スポンサー一覧、SNSフォローボタン |
| 2 | SCHEDULE | `/schedule` | ✅ 実装済 | 日付タブ（13日分）、トーナメントカード一覧、タップ展開で詳細表示 |
| 3 | 診断 | `/shindan` | 🔲 COMING SOON | ポーカー適性診断（質問→結果→SNSシェア）※後日実装 |
| 4 | GALLERY | `/gallery` | ✅ 実装済 | Flickrアルバムへのリンクカード（過去8イベント分） |

#### HOME（`/`）
- **ヒーローセクション**: 日程、タイトル「GRAND FINAL」、会場名、タグライン
- **YouTube公式リンク**: 1本のリンクカード
- **スポンサー/パートナー**: ピル型バッジで一覧表示（24社）、タップで各社サイトへ
- **SNSフォロー**: X / Instagram / LINE の3ボタン

#### SCHEDULE（`/schedule`）
- **日付タブバー**: 4/24(Fri)〜5/6(Wed) の13日間、横スクロール対応
- **デフォルト選択**: 当日を自動選択（イベント期間外はDay1）
- **イベントカウント**: 「4月24日（金）— 10 events」形式
- **トーナメントカード**: 各イベントを縦並びカードで表示
  - トーナメントID、名称、開始/終了時間、チップ数、エントリー費
  - Main Event: 青ボーダー + 青背景 + バッジ
  - Satellite: 専用バッジ
  - タップで展開 → 詳細情報表示
- **データ**: `schedule.json` に全187トーナメント + 35サテライト収録

#### 診断（`/shindan`）— 未実装
- COMING SOONプレースホルダー表示中
- 将来: 5〜10問の選択式質問 → プレイスタイル分析 → 結果カード → SNSシェア（OGP画像生成）

#### GALLERY（`/gallery`）
- **トップCTA**: Flickr全アルバムへのリンク
- **イベントカード**: 最新順に8イベント表示、LATESTバッジ
- **リンク先**: 各イベントのFlickrアルバム
- **ボトムCTA**: 過去イベント一覧リンク

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
    "stuffAlbumId": "72177720332300800",  // Flickr Stuffアルバム
    "companionAlbumId": "TODO",           // Companionアルバム（未設定）
    "isLatest": true                      // 最新フラグ
  }
]
```

#### `sponsors.json`
```
[
  { "name": "APT", "url": "https://www.theasianpokertour.com/" },
  { "name": "BBO Poker Tables", "url": null }  // URLなしの場合
]
```

### 1.5 外部リンク一覧

| 用途 | URL |
|------|-----|
| YouTube | https://youtube.com/@japanopenpokertour |
| X | https://x.com/japanopenpoker |
| Instagram | https://instagram.com/japanopen |
| LINE | https://lin.ee/8kCSr85 |
| Flickr アルバム一覧 | https://www.flickr.com/photos/190979093@N07/albums/ |
| JOPT公式サイト | https://japanopenpoker.com/ |

---

## 2. 構成説明

### 2.1 ディレクトリ構造

```
jopt-gf-app/
├── public/
│   ├── icons/                # PWAアイコン (192px / 512px)
│   ├── gallery/              # サムネ用画像（将来配置）
│   └── manifest.json         # PWA Web App Manifest
├── src/
│   ├── app/
│   │   ├── layout.tsx        # ルートレイアウト（Header + BottomNav + LINE検知）
│   │   ├── globals.css       # Tailwind v4テーマ + デザインシステム定義
│   │   ├── page.tsx          # HOME (/)
│   │   ├── schedule/
│   │   │   └── page.tsx      # SCHEDULE (/schedule) — クライアントコンポーネント
│   │   ├── shindan/
│   │   │   └── page.tsx      # 診断 COMING SOON (/shindan)
│   │   └── gallery/
│   │       └── page.tsx      # GALLERY (/gallery)
│   ├── components/
│   │   ├── Header.tsx        # 固定ヘッダー
│   │   ├── BottomNav.tsx     # 固定ボトムナビ（4タブ）— "use client"
│   │   ├── HeroBanner.tsx    # HOMEヒーローセクション
│   │   ├── YouTubeLink.tsx   # YouTube公式リンクカード
│   │   ├── SponsorGrid.tsx   # スポンサーピルグリッド
│   │   ├── FollowButtons.tsx # SNSフォロー3ボタン
│   │   ├── EventCard.tsx     # トーナメントカード（展開式）— "use client"
│   │   └── LineOverlay.tsx   # LINEブラウザ検知オーバーレイ — "use client"
│   └── data/
│       ├── schedule.json     # 全13日・222イベント（Players Guide PDF準拠）
│       ├── gallery.json      # Flickrアルバム 8イベント分
│       └── sponsors.json     # スポンサー 24社
├── next.config.ts
├── package.json
└── tsconfig.json
```

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
| `BottomNav` | Client | 4タブナビ。`usePathname()`でアクティブ判定。アイコン+ラベル |
| `HeroBanner` | Server | 青背景のヒーロー。日程、タイトル、会場名、タグライン |
| `YouTubeLink` | Server | YouTubeチャンネルへのリンクカード |
| `SponsorGrid` | Server | `sponsors.json`からピル型バッジをflex-wrap表示 |
| `FollowButtons` | Server | X/Instagram/LINEの3ボタン横並び |
| `EventCard` | Client | トーナメント情報カード。`useState`で展開/折りたたみ |
| `LineOverlay` | Client | LINE UA検知でフルスクリーンオーバーレイ表示 |

### 2.5 ページ別レンダリング

| ページ | レンダリング | 理由 |
|--------|-----------|------|
| `/` | SSG（静的生成） | JSONデータのみ、動的要素なし |
| `/schedule` | SSG + Client hydration | 日付タブ選択・カード展開にClient状態必要 |
| `/shindan` | SSG | 静的プレースホルダー |
| `/gallery` | SSG | JSONデータのみ |

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
| 1 | ストラクチャーデータ追加 | 高 | `schedule.json`の各トーナメントにブラインドストラクチャー表を追加（PDF p.11〜） |
| 2 | Service Worker | 高 | Workboxによる静的アセットキャッシュ、オフライン表示 |
| 3 | バージョン更新通知 | 中 | SW更新検知時に「新しいバージョンがあります / 更新する」モーダル |
| 4 | Flickrサムネイル | 中 | Flickr API or 手動で各アルバムのカバー画像を取得し`/public/gallery/`に配置 |
| 5 | 診断ページ実装 | 中 | 質問コンポーネント、結果表示、SNSシェア（OGP画像生成） |
| 6 | PWAアイコン差し替え | 低 | 現在はプレースホルダー。JOPTロゴの192/512pxアイコンに差し替え |
| 7 | JOPTロゴ配置 | 低 | ヘッダーに `japanopenpoker.com` のロゴ画像を表示 |
