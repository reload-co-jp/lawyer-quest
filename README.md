# SPEC.md

# Lawyer Quest MVP仕様書

## 1. 概要

Lawyer Quest は、行政書士試験の学習を「法律を攻略するクエスト」として体験できる学習サイトである。

MVPでは、行政書士試験の主要科目である行政法・民法・憲法を対象に、科目別クイズ、解答解説、ソース表示、間違い復習を提供する。

DB・認証・AI・記述式採点・模試機能はMVPでは実装しない。  
問題データはJSONで管理し、学習履歴はブラウザのlocalStorageに保存する。

---

## 2. サイト名

```txt
Lawyer Quest
```

### キャッチコピー案

```txt
法律を、冒険のように攻略する。
```

または

```txt
Learn Law Like an Adventure.
```

---

## 3. コンセプト

行政書士試験の学習を、単なる問題演習ではなく、以下のような体験として設計する。

- 科目をクエストとして攻略する
- トピックをエリアとして進める
- 条文を発見する
- 判例を収集する
- 間違いを再挑戦クエストとして復習する
- 学習進捗を攻略率として可視化する

---

## 4. MVPの目的

MVPでは以下を実現する。

- 行政法・民法・憲法の問題を解ける
- 解答後に正誤と解説を確認できる
- 全問題に参照ソースを表示する
- 間違えた問題を保存できる
- 間違えた問題だけを復習できる
- 科目ごとの攻略率・正答率を確認できる

---

## 5. MVP対象範囲

### 対象科目

```txt
行政法
民法
憲法
```

### MVP対象外

```txt
商法・会社法
基礎法学
一般知識
文章理解
記述式採点
模試モード
ユーザー登録
DB保存
AI添削
課金
管理画面
```

---

## 6. Lawyer Quest用語定義

| 用語 | 意味 |
|---|---|
| Quest | 科目単位の学習コース |
| Area | 科目内のトピック |
| Challenge | 1問ごとの問題演習 |
| Source | 問題・解説の根拠 |
| Quest Progress | 科目ごとの攻略率 |
| Retry Quest | 間違えた問題の復習 |
| Law Link | 関連条文・判例・ソースへのリンク |
| Quest Log | 学習履歴 |

---

## 7. 画面構成

```txt
/
├── /quests
├── /quests/administrative-law
├── /quests/civil-law
├── /quests/constitutional-law
├── /challenge/[questId]
├── /challenge/random
├── /retry
├── /wrong
├── /progress
└── /questions/[questionId]
```

---

## 8. ページ仕様

## 8.1 トップページ `/`

### 表示内容

- サイト名
- キャッチコピー
- クエスト開始ボタン
- 主要クエスト一覧
- 再挑戦クエストへの導線
- 学習進捗サマリー

### 表示例

```txt
Lawyer Quest
法律を、冒険のように攻略する。

行政法クエストを開始
民法クエストを開始
憲法クエストを開始
再挑戦クエスト
```

---

## 8.2 クエスト一覧 `/quests`

### 表示内容

- クエストカード
- 対象科目
- 問題数
- 攻略率
- 正答率
- 最終学習日時

### MVPクエスト

```txt
行政法クエスト
民法クエスト
憲法クエスト
```

---

## 8.3 クエスト詳細 `/quests/[questId]`

### 表示内容

- クエスト名
- エリア一覧
- 問題数
- 攻略率
- 正答率
- チャレンジ開始ボタン

### エリア例

行政法クエスト:

```txt
行政法総論
行政手続法
行政不服審査法
行政事件訴訟法
国家賠償法
地方自治法
```

民法クエスト:

```txt
総則
物権
債権
親族
相続
```

憲法クエスト:

```txt
人権
統治
重要判例
```

---

## 8.4 チャレンジ画面 `/challenge/[questId]`

### 機能

指定クエストの問題を1問ずつ出題する。

### 表示内容

- クエスト名
- エリア名
- 問題文
- 選択肢
- 解答ボタン
- 正誤表示
- 解説
- ひっかけポイント
- Source
- Law Link
- 次の問題ボタン
- 終了ボタン

### MVP対応形式

```txt
正誤問題
4択問題
```

### MVP非対応形式

```txt
記述式
穴埋め
並べ替え
複数選択
```

---

## 8.5 ランダムチャレンジ `/challenge/random`

### 機能

全クエストからランダムに10問出題する。

### 条件

- 出題数は10問固定
- 出題順は毎回シャッフル
- 解答履歴の有無は問わない

---

## 8.6 再挑戦クエスト `/retry`

### 機能

間違えた問題のみを出題する。

### 条件

- localStorageに保存された間違い問題IDを参照する
- 正解しても自動削除しない
- ユーザーが「攻略済みにする」を押した場合のみ再挑戦リストから外す

---

## 8.7 間違えた問題一覧 `/wrong`

### 表示内容

- 問題
- クエスト名
- エリア名
- 間違えた回数
- 最終回答日時
- 再挑戦ボタン

---

## 8.8 進捗画面 `/progress`

### 表示内容

- 総チャレンジ数
- 総正答数
- 全体正答率
- クエスト別攻略率
- クエスト別正答率
- 再挑戦対象数
- 最終学習日時

---

## 8.9 問題詳細 `/questions/[questionId]`

### 表示内容

- 問題文
- 正解
- 解説
- ひっかけポイント
- 関連条文
- 関連判例
- 参照ソース
- 更新日

---

## 9. データ設計

## 9.1 Quest

```ts
export type Quest = {
  id: QuestId
  title: string
  subject: Subject
  description: string
  order: number
}
```

---

## 9.2 QuestId

```ts
export type QuestId =
  | "administrative_law"
  | "civil_law"
  | "constitutional_law"
```

---

## 9.3 Subject

```ts
export type Subject =
  | "administrative_law"
  | "civil_law"
  | "constitutional_law"
```

---

## 9.4 QuestArea

```ts
export type QuestArea = {
  id: string
  questId: QuestId
  title: string
  description?: string
  order: number
}
```

---

## 9.5 QuestionFormat

```ts
export type QuestionFormat =
  | "true_false"
  | "multiple_choice"
```

---

## 9.6 Question

```ts
export type Question = {
  id: string

  questId: QuestId
  areaId: string

  subject: Subject
  topic: string
  subtopic?: string

  format: QuestionFormat

  question: string
  choices: Choice[]
  answer: string

  explanation: string
  point?: string
  commonMistake?: string

  sources: QuestionSource[]
  lawLinks?: LawLink[]

  difficulty: 1 | 2 | 3 | 4 | 5
  tags: string[]

  examYear?: number
  legalAsOf?: string

  createdAt: string
  updatedAt: string
}
```

---

## 9.7 Choice

```ts
export type Choice = {
  id: string
  text: string
}
```

---

## 9.8 QuestionSource

問題・解説の根拠を明確にするため、MVPでもソースを必須にする。

```ts
export type QuestionSource = {
  type:
    | "law"
    | "case"
    | "exam"
    | "government"
    | "book"
    | "original"

  title: string
  organization: string

  url?: string
  lawName?: string
  article?: string
  caseName?: string
  decisionDate?: string

  checkedAt: string
}
```

---

## 9.9 LawLink

```ts
export type LawLink = {
  type: "law" | "case" | "exam"
  title: string
  description?: string
  url?: string
}
```

---

## 9.10 AnswerHistory

```ts
export type AnswerHistory = {
  questionId: string
  questId: QuestId
  areaId: string
  selectedAnswer: string
  isCorrect: boolean
  answeredAt: string
  timeSpentSec?: number
}
```

---

## 9.11 WrongQuestion

```ts
export type WrongQuestion = {
  questionId: string
  questId: QuestId
  areaId: string
  wrongCount: number
  lastWrongAt: string
  lastReviewedAt?: string
}
```

---

## 9.12 QuestProgress

```ts
export type QuestProgress = {
  questId: QuestId
  totalQuestions: number
  answeredQuestions: number
  correctAnswers: number
  wrongAnswers: number
  completionRate: number
  accuracyRate: number
  lastPlayedAt?: string
}
```

---

## 9.13 UserProgress

```ts
export type UserProgress = {
  totalChallenges: number
  totalCorrect: number

  questProgress: Record<QuestId, QuestProgress>

  wrongQuestionIds: string[]
  lastPlayedAt?: string
}
```

---

## 10. localStorage設計

```ts
export const STORAGE_KEYS = {
  answerHistory: "lawyer_quest_answer_history",
  userProgress: "lawyer_quest_user_progress",
  wrongQuestions: "lawyer_quest_wrong_questions"
} as const
```

---

## 11. 問題データ例

```json
{
  "id": "administrative_law_001",
  "questId": "administrative_law",
  "areaId": "administrative_procedure_act",
  "subject": "administrative_law",
  "topic": "行政手続法",
  "subtopic": "審査基準",
  "format": "true_false",
  "question": "行政庁は、申請に対する処分について、審査基準を定め、原則として公にしておかなければならない。",
  "choices": [
    {
      "id": "true",
      "text": "正しい"
    },
    {
      "id": "false",
      "text": "誤り"
    }
  ],
  "answer": "true",
  "explanation": "行政手続法は、申請により求められた許認可等をするかどうかの判断基準として審査基準を定めることを求めている。審査基準は、行政上特別の支障がある場合を除き、公にしておかなければならない。",
  "point": "審査基準は申請に対する処分、処分基準は不利益処分に関する基準である点を区別する。",
  "commonMistake": "処分基準と審査基準を混同しやすい。",
  "sources": [
    {
      "type": "law",
      "title": "行政手続法",
      "organization": "e-Gov法令検索",
      "url": "https://laws.e-gov.go.jp/",
      "lawName": "行政手続法",
      "article": "第5条",
      "checkedAt": "2026-06-14"
    }
  ],
  "lawLinks": [
    {
      "type": "law",
      "title": "行政手続法 第5条",
      "description": "審査基準に関する条文",
      "url": "https://laws.e-gov.go.jp/"
    }
  ],
  "difficulty": 2,
  "tags": ["行政法", "行政手続法", "審査基準"],
  "examYear": 2026,
  "legalAsOf": "2026-04-01",
  "createdAt": "2026-06-14",
  "updatedAt": "2026-06-14"
}
```

---

## 12. ディレクトリ構成

```txt
src/
├── app/
│   ├── page.tsx
│   ├── quests/
│   │   ├── page.tsx
│   │   └── [questId]/
│   │       └── page.tsx
│   ├── challenge/
│   │   ├── random/
│   │   │   └── page.tsx
│   │   └── [questId]/
│   │       └── page.tsx
│   ├── retry/
│   │   └── page.tsx
│   ├── wrong/
│   │   └── page.tsx
│   ├── progress/
│   │   └── page.tsx
│   └── questions/
│       └── [questionId]/
│           └── page.tsx
├── components/
│   ├── QuestCard.tsx
│   ├── QuestProgress.tsx
│   ├── QuestionCard.tsx
│   ├── ChoiceList.tsx
│   ├── ExplanationBox.tsx
│   ├── SourceList.tsx
│   ├── LawLinkList.tsx
│   └── ProgressSummary.tsx
├── data/
│   ├── quests.json
│   ├── areas.json
│   └── questions/
│       ├── administrative-law.json
│       ├── civil-law.json
│       └── constitutional-law.json
├── lib/
│   ├── questions.ts
│   ├── quests.ts
│   ├── progress.ts
│   ├── storage.ts
│   ├── shuffle.ts
│   └── stats.ts
└── types/
    ├── quest.ts
    ├── question.ts
    └── progress.ts
```

---

## 13. 技術スタック

```txt
Next.js
TypeScript
React
Tailwind CSS
JSON
localStorage
```

---

## 14. UI方針

### トーン

```txt
法律学習
冒険
攻略
信頼性
継続学習
```

### デザイン方向

- RPG風にしすぎず、資格学習サイトとしての信頼性を残す
- 「道場」よりも「地図・冒険・図鑑・クエスト」の印象を強める
- 情報ソースを見やすくする
- スマホで1問ずつ解きやすくする

### 表現例

| 通常表現 | Lawyer Quest表現 |
|---|---|
| 科目 | クエスト |
| 分野 | エリア |
| 問題演習 | チャレンジ |
| 間違い復習 | 再挑戦クエスト |
| 進捗 | 攻略率 |
| 学習履歴 | クエストログ |
| 条文・判例 | Law Link |

---

## 15. 問題作成ルール

### 必須項目

- 問題ID
- クエストID
- エリアID
- 科目
- トピック
- 問題文
- 選択肢
- 正解
- 解説
- ソース
- 難易度
- タグ
- 作成日
- 更新日

### 解説ルール

- 根拠条文・判例・公式資料を明記する
- 初学者にもわかる文章にする
- ひっかけポイントを書く
- 法改正前の内容を混ぜない
- ソース未確認の解説は公開しない

---

## 16. 初期問題数

```txt
行政法クエスト: 100問
民法クエスト: 100問
憲法クエスト: 50問

合計: 250問
```

優先順位:

```txt
1. 行政法
2. 民法
3. 憲法
```

---

## 17. MVPで作らないもの

```txt
ユーザー登録
ログイン
DB
決済
AI採点
記述式添削
模試モード
管理画面
コメント機能
問題投稿機能
講義動画
```

---

## 18. 完了条件

MVPは以下を満たせば完成とする。

- Lawyer Questとしてトップページが表示される
- 行政法・民法・憲法のクエストが存在する
- クエスト別に問題演習できる
- ランダム10問を解ける
- 解答後に正誤と解説を表示できる
- 問題ごとにSourceを表示できる
- Law Linkを表示できる
- 間違えた問題がlocalStorageに保存される
- 再挑戦クエストで間違えた問題を復習できる
- 進捗画面で攻略率・正答率を確認できる
