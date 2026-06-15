# Lawyer Quest

行政書士試験の学習を「法律を攻略するクエスト」として体験できる学習サイト。

**URL:** http://lawyer-quest.reload.co.jp

---

## 概要

- 科目別クイズ（正誤問題・4択問題）
- 解答解説・ひっかけポイント・参照ソース
- 間違えた問題の保存と復習（再挑戦クエスト）
- 科目別攻略率・正答率の可視化
- 学習記事（行政法・民法・憲法の解説）
- 過去問クエスト（行政書士試験過去問）

---

## 問題数

| クエスト | 問題数 |
|---|---|
| 行政法クエスト | 30問 |
| 民法クエスト | 30問 |
| 憲法クエスト | 30問 |
| 過去問クエスト | 200問 |
| **合計** | **290問** |

記事: 42本（行政法18本・民法12本・憲法12本）

---

## 技術スタック

- **Next.js 16.2.9** — App Router、`output: "export"`（静的エクスポート）
- **React 19** / **TypeScript**
- **CSS custom properties** — Tailwind なし、CSS変数でデザインシステム構築
- **Kaisei Tokumin** — `next/font/google` で自己ホスト
- **marked** — 記事MD→HTML変換
- **localStorage** — 学習履歴・進捗をブラウザに保存
- **Google Analytics G-1PYPBQGLTQ** — 本番環境のみ注入
- **JSON-LD** — Schema.org（WebSite・Article・Quiz・LearningResource）

---

## 画面構成

```
/                          トップ（クエスト一覧・記事リンク・進捗サマリー）
/quests                    クエスト一覧
/quests/[questId]          クエスト詳細（エリア一覧・チャレンジ開始）
/challenge/[questId]       クエストチャレンジ
/challenge/random          ランダム10問チャレンジ
/retry                     再挑戦クエスト（間違えた問題のみ）
/wrong                     間違えた問題一覧
/progress                  進捗・攻略率
/questions/[questionId]    問題詳細（解説・ソース・Law Link）
/articles/[articleId]      学習記事
```

---

## ディレクトリ構成

```
app/
├── layout.tsx             ルートレイアウト（font・metadata・JSON-LD・GA）
├── reset.css              CSS変数・グローバルスタイル
├── page.tsx
├── articles/[articleId]/
├── quests/[questId]/
├── challenge/[questId]/
├── challenge/random/
├── retry/
├── wrong/
├── progress/
└── questions/[questionId]/

components/
├── HeaderNav.tsx          モバイルハンバーガーメニュー（"use client"）
├── ChallengeClient.tsx    問題出題UI（"use client"）
├── QuestCard.tsx
├── ProgressSummary.tsx
├── ChoiceList.tsx
├── ExplanationBox.tsx
├── SourceList.tsx
└── LawLinkList.tsx

data/
├── quests.json
├── areas.json
├── articles/              記事MDファイル（42本）
└── questions/
    ├── administrative-law.json
    ├── civil-law.json
    ├── constitutional-law.json
    └── past-exam.json

lib/
├── questions.ts
├── quests.ts
├── storage.ts
├── articles.ts
├── shuffle.ts
└── stats.ts

types/
├── quest.ts
├── question.ts
└── progress.ts
```

---

## 主要な型

```ts
export type QuestId =
  | "administrative_law"
  | "civil_law"
  | "constitutional_law"
  | "past_exam"

export type QuestionFormat = "true_false" | "multiple_choice"
```

---

## データ設計

問題データはJSONで管理。学習履歴・進捗はlocalStorageに保存（DB・認証なし）。

```ts
// localStorage keys
{
  lawyer_quest_answer_history: AnswerHistory[]
  lawyer_quest_user_progress: UserProgress
  lawyer_quest_wrong_questions: WrongQuestion[]
}
```

---

## デザインシステム（CSS変数）

```css
:root {
  --bg: #0a0a0a;
  --surface: #111111;
  --accent: #00b8cc;          /* テキスト・ボーダー用アクセント */
  --accent-btn: #007a8a;      /* ボタン用アクセント（暗め） */
  --admin: #009fc4;           /* 行政法 */
  --civil: #00c97a;           /* 民法 */
  --const: #9b44e0;           /* 憲法 */
  --past: #d97706;            /* 過去問 */
}
```

---

## ビルド・開発

```bash
pnpm install
pnpm dev        # 開発サーバー
pnpm build      # 静的ビルド（out/ に出力）
```

---

## 実装しないもの（MVP外）

- ユーザー登録・ログイン・DB
- AI採点・記述式添削
- 模試モード
- 商法・会社法・一般知識
- 管理画面・問題投稿
