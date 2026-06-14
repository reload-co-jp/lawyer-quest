# PLAN.md

# Lawyer Quest 拡張設計・開発計画

## 1. 目的

このドキュメントでは、Lawyer Quest をMVP後に本格的な行政書士試験対策サービスへ拡張するための設計方針をまとめる。

MVPの `SPEC.md` では、DBなし・認証なし・JSON管理の簡易版を定義する。  
本 `PLAN.md` では、以下を見据えた詳細設計を扱う。

- Lawyer Questとしてのブランド設計
- クエスト型学習体験
- 公式ソースに基づく問題データ管理
- 法改正対応
- 過去問管理
- 条文ツリー
- 判例図鑑
- DB化
- ユーザー認証
- 記述式対策
- AI活用
- 管理画面
- 有料サービス化
- 他資格への展開

---

## 2. Lawyer Quest のブランド方針

## 2.1 コアコンセプト

```txt
法律を、冒険のように攻略する。
```

行政書士試験の学習を、単なる暗記や問題演習ではなく、クエスト攻略として体験できるようにする。

---

## 2.2 ブランド体験

Lawyer Questでは、ユーザーの学習行動を以下のように再定義する。

| 通常の学習サイト | Lawyer Quest |
|---|---|
| 科目 | クエスト |
| 分野 | エリア |
| 問題 | チャレンジ |
| 復習 | 再挑戦クエスト |
| 進捗 | 攻略率 |
| 学習履歴 | クエストログ |
| 条文集 | 条文ツリー |
| 判例集 | 判例図鑑 |
| 模試 | ボス戦 / 模試ダンジョン |

---

## 2.3 差別化ポイント

Lawyer Questは、以下の3点で差別化する。

```txt
1. ソース駆動学習
2. クエスト型の進捗管理
3. 条文ツリー・判例図鑑による収集型学習
```

---

## 3. 最重要設計方針

行政書士試験対策サイトでは、情報の正確性が最重要である。

そのため、問題・解説・条文・判例・試験情報には、必ず参照ソースを紐付ける。

### ソース優先順位

```txt
Level 1: 一次情報
- e-Gov法令検索
- 裁判所公式サイト
- 官報
- 各省庁公式資料

Level 2: 公式試験情報
- 行政書士試験研究センター
- 過去の試験問題
- 正解
- 合否判定基準
- 試験案内

Level 3: 政府・公的資料
- 総務省
- 法務省
- 個人情報保護委員会
- デジタル庁
- 白書
- 統計資料

Level 4: 補助資料
- 専門書
- 判例集
- 学習参考書
```

---

## 4. サービス全体像

```txt
Lawyer Quest
├─ 行政書士クエスト
│  ├─ 行政法クエスト
│  ├─ 民法クエスト
│  ├─ 憲法クエスト
│  ├─ 商法・会社法クエスト
│  ├─ 基礎法学クエスト
│  └─ 一般知識クエスト
│
├─ 条文ツリー
├─ 判例図鑑
├─ 再挑戦クエスト
├─ 記述式クエスト
├─ 模試ダンジョン
└─ クエストログ
```

---

## 5. 参照ソース管理

## 5.1 Source

```ts
export type Source = {
  id: string

  type:
    | "law"
    | "case"
    | "exam"
    | "government"
    | "book"
    | "article"
    | "original"

  title: string
  organization: string

  url?: string
  isbn?: string
  author?: string
  publisher?: string
  publishedAt?: string

  lawName?: string
  article?: string
  caseName?: string
  court?: string
  decisionDate?: string
  examYear?: number
  questionNumber?: string

  checkedAt: string
  createdAt: string
  updatedAt: string
}
```

---

## 5.2 SourceLink

1つの問題・条文・判例・記事に複数ソースを紐付ける。

```ts
export type SourceLink = {
  id: string
  sourceId: string
  targetType:
    | "question"
    | "explanation"
    | "law_article"
    | "case_law"
    | "article"
  targetId: string

  note?: string
  createdAt: string
}
```

---

## 6. クエスト設計

## 6.1 Quest

```ts
export type Quest = {
  id: string
  title: string
  subject: Subject
  description: string
  order: number
  status: "draft" | "published" | "archived"
  createdAt: string
  updatedAt: string
}
```

---

## 6.2 QuestArea

```ts
export type QuestArea = {
  id: string
  questId: string
  title: string
  description?: string
  order: number
  requiredQuestionCount?: number
  createdAt: string
  updatedAt: string
}
```

---

## 6.3 行政書士クエスト構成案

```txt
行政法クエスト
├─ 行政法総論
├─ 行政手続法
├─ 行政不服審査法
├─ 行政事件訴訟法
├─ 国家賠償法
└─ 地方自治法

民法クエスト
├─ 総則
├─ 物権
├─ 債権
├─ 親族
└─ 相続

憲法クエスト
├─ 人権
├─ 統治
└─ 重要判例

商法・会社法クエスト
├─ 商法総則
├─ 商行為
└─ 会社法

基礎法学クエスト
├─ 法の一般原則
├─ 裁判制度
└─ 法解釈

一般知識クエスト
├─ 政治
├─ 経済
├─ 社会
├─ 情報通信
├─ 個人情報保護
└─ 文章理解
```

---

## 7. 法令データ設計

## 7.1 Law

```ts
export type Law = {
  id: string
  name: string
  lawNumber?: string
  category?: string

  sourceId: string

  promulgatedAt?: string
  enforcedAt?: string

  createdAt: string
  updatedAt: string
}
```

---

## 7.2 LawArticle

```ts
export type LawArticle = {
  id: string
  lawId: string

  articleNumber: string
  articleTitle?: string
  paragraph?: string
  item?: string

  text: string
  plainText: string

  validFrom?: string
  validTo?: string

  sourceId: string
  checkedAt: string

  createdAt: string
  updatedAt: string
}
```

---

## 7.3 条文ツリー

条文ツリーは、法律ごとの条文をスキルツリーのように表示する機能である。

### 表示例

```txt
行政手続法
├─ 第5条 審査基準 ✓
├─ 第6条 標準処理期間 ✓
├─ 第7条 申請に対する審査、応答
└─ 第8条 理由の提示
```

### 表示項目

- 法律名
- 条文番号
- 条文見出し
- 習得状態
- 関連問題数
- 最終回答日時
- 正答率

---

## 8. 判例データ設計

## 8.1 CaseLaw

```ts
export type CaseLaw = {
  id: string

  name: string
  court: string
  decisionDate: string

  issue: string
  holding: string
  summary: string

  relatedLaws: {
    lawName: string
    article?: string
  }[]

  sourceId: string
  checkedAt: string

  importance: 1 | 2 | 3 | 4 | 5

  createdAt: string
  updatedAt: string
}
```

---

## 8.2 判例図鑑

判例図鑑は、重要判例を収集・確認できる機能である。

### 表示例

```txt
最大判昭和48年4月25日

発見済み
重要度 ★★★★★
関連クエスト: 憲法クエスト
関連エリア: 人権
```

### 表示項目

- 判例名
- 裁判所
- 判決日
- 争点
- 結論
- 重要度
- 発見済み / 未発見
- 関連クエスト
- 関連問題
- 参照ソース

---

## 9. 試験情報・過去問管理

## 9.1 Exam

```ts
export type Exam = {
  id: string
  year: number
  legalAsOf: string

  title: string
  sourceId: string

  createdAt: string
  updatedAt: string
}
```

---

## 9.2 PastExamQuestion

```ts
export type PastExamQuestion = {
  id: string

  examId: string
  questionNumber: string

  subject: Subject
  topic: string
  format:
    | "true_false"
    | "multiple_choice"
    | "written"
    | "reading"

  questionText: string
  choices?: Choice[]
  officialAnswer?: string

  sourceId: string

  createdAt: string
  updatedAt: string
}
```

---

## 9.3 過去問利用方針

過去問を利用する場合は、著作権・利用規約・出典表示を確認する。

### 方針

- 公式の過去問題と正解を参照する
- 問題文の転載可否を確認する
- 必要に応じてオリジナル問題へ変換する
- 解説は独自作成する
- 出典を明記する

---

## 10. 問題データ設計

## 10.1 Question

```ts
export type Question = {
  id: string

  questId: string
  areaId: string

  subject: Subject
  topic: string
  subtopic?: string

  format:
    | "true_false"
    | "multiple_choice"
    | "fill_blank"
    | "written"

  question: string
  choices?: Choice[]
  answer: string | string[]

  explanation: string
  point?: string
  commonMistake?: string

  sourceIds: string[]
  relatedLawArticleIds?: string[]
  relatedCaseLawIds?: string[]
  relatedPastExamQuestionIds?: string[]

  difficulty: 1 | 2 | 3 | 4 | 5
  tags: string[]

  legalAsOf?: string
  examYear?: number

  status:
    | "draft"
    | "reviewing"
    | "published"
    | "needs_review"
    | "archived"

  createdBy?: string
  reviewedBy?: string

  createdAt: string
  updatedAt: string
}
```

---

## 10.2 QuestionReview

```ts
export type QuestionReview = {
  id: string
  questionId: string

  reviewerId: string
  status:
    | "approved"
    | "rejected"
    | "needs_fix"

  comment?: string

  reviewedAt: string
}
```

---

## 11. 学習履歴DB設計

MVPではlocalStorageを利用するが、本格版ではDBへ移行する。

## 11.1 User

```ts
export type User = {
  id: string
  email: string
  displayName?: string
  createdAt: string
  updatedAt: string
}
```

---

## 11.2 UserAnswer

```ts
export type UserAnswer = {
  id: string

  userId: string
  questionId: string

  selectedAnswer: string | string[]
  isCorrect: boolean

  timeSpentSec?: number
  mistakeType?: MistakeType

  answeredAt: string
}
```

---

## 11.3 UserQuestionStatus

```ts
export type UserQuestionStatus = {
  id: string

  userId: string
  questionId: string

  status:
    | "unseen"
    | "learning"
    | "wrong"
    | "reviewing"
    | "mastered"

  wrongCount: number
  correctCount: number

  nextReviewAt?: string
  lastAnsweredAt?: string

  createdAt: string
  updatedAt: string
}
```

---

## 11.4 UserQuestProgress

```ts
export type UserQuestProgress = {
  id: string

  userId: string
  questId: string

  totalQuestions: number
  answeredQuestions: number
  correctAnswers: number

  completionRate: number
  accuracyRate: number

  status:
    | "not_started"
    | "in_progress"
    | "cleared"

  lastPlayedAt?: string

  createdAt: string
  updatedAt: string
}
```

---

## 12. 復習スケジューリング

間違えた問題は、一定間隔で再挑戦クエストとして出題する。

### 初期ルール

```txt
1回目の間違い: 翌日
2回目の間違い: 3日後
3回目の間違い: 7日後
4回目以降: 14日後
```

### 将来方針

- SM-2風の間隔反復アルゴリズム
- 科目別の忘却傾向
- 正答速度を加味した習熟度判定
- 苦手エリアの自動提示
- 再挑戦クエストの自動生成

---

## 13. 記述式クエスト

## 13.1 WrittenQuestion

```ts
export type WrittenQuestion = {
  id: string

  questionId: string

  modelAnswer: string
  requiredKeywords: string[]
  optionalKeywords?: string[]

  maxLength: number
  minLength?: number

  scoringPoints: {
    keyword: string
    point: number
    description: string
  }[]

  createdAt: string
  updatedAt: string
}
```

---

## 13.2 採点方針

### Phase 1

- 模範解答表示
- 必須キーワード表示
- 文字数チェック
- 自己採点

### Phase 2

- キーワード一致による簡易採点
- 不足キーワード表示
- 答案例の比較

### Phase 3

- AI添削
- AIの採点結果は参考扱い
- 公式ソース・模範解答との照合を必須にする

---

## 14. 模試ダンジョン

模試ダンジョンは、本試験に近い形式で制限時間つきの問題演習を行う機能である。

### 機能

- 年度別模試
- 科目別模試
- 弱点克服模試
- 採点
- 合格ライン判定
- 復習クエスト自動生成

### 注意

合否の断定はしない。  
表示は「目安」「参考」とする。

---

## 15. AI活用方針

## 15.1 AIに任せてよいこと

- 解説の下書き
- 条文の要約
- 判例の要点整理
- 間違い理由の分類
- 学習アドバイス生成
- 記述式答案の改善提案
- 次に挑戦するクエストの推薦

## 15.2 AIに任せてはいけないこと

- 未確認情報の公開
- ソースなしの解説作成
- 法的助言としての断定
- 合否判定の断定
- 公式情報の代替

## 15.3 AI生成コンテンツの公開条件

AIで生成したコンテンツは、以下を満たす場合のみ公開する。

- 参照ソースが紐付いている
- 人間または検証処理により確認済み
- 法改正基準日が明記されている
- 誤解を招く断定表現がない

---

## 16. 管理画面設計

## 16.1 管理画面機能

- クエスト管理
- エリア管理
- 問題一覧
- 問題作成
- 問題編集
- 問題レビュー
- ソース管理
- 条文管理
- 判例管理
- 法改正チェック
- 公開・非公開切替
- タグ管理

---

## 16.2 問題作成フロー

```txt
1. 管理者が問題を作成
2. クエストとエリアを設定
3. ソースを紐付ける
4. 解説を書く
5. ステータスを reviewing にする
6. レビュー
7. 問題なければ published
8. 問題があれば needs_fix
```

---

## 17. 法改正対応フロー

```txt
1. e-Gov法令データを取得
2. 前回データと差分比較
3. 変更された条文を特定
4. 関連する問題を抽出
5. 該当問題を needs_review に変更
6. 管理者が確認
7. 解説・正解を修正
8. 再公開
```

---

## 18. DB候補

### Supabase

メリット:

- 認証とDBをまとめて使える
- 小規模サービスで始めやすい
- PostgreSQLベース
- 管理画面もある

### Firebase

メリット:

- 認証が簡単
- フロント中心で作りやすい

デメリット:

- 複雑な検索や集計はPostgreSQLの方が扱いにくい

### 推奨

Lawyer Questでは、問題・ソース・条文・判例・履歴・集計のリレーションが多いため、Supabase/PostgreSQLを推奨する。

---

## 19. 将来の技術構成

```txt
Frontend:
- Next.js
- TypeScript
- Tailwind CSS

Backend:
- Next.js Route Handler
- Supabase
- PostgreSQL

Auth:
- Supabase Auth

Storage:
- Supabase Database
- 必要に応じてStorage

AI:
- OpenAI API
- Claude API

Batch:
- GitHub Actions
- e-Gov法令データ取得
- 法改正差分チェック
```

---

## 20. Phase計画

## Phase 1: MVP

- Lawyer Questトップページ
- JSON問題データ
- クエスト別チャレンジ
- ランダム10問
- 再挑戦クエスト
- localStorage
- Source表示
- Law Link表示

## Phase 2: 学習体験強化

- ブックマーク
- エリア別出題
- 攻略率グラフ
- 復習スケジュール
- 条文ツリー
- 判例図鑑
- クエストログ

## Phase 3: DB化

- Supabase導入
- ユーザー登録
- 学習履歴同期
- 問題DB化
- 管理画面の最小実装

## Phase 4: 本格試験対策

- 記述式クエスト
- 模試ダンジョン
- 年度別過去問
- 弱点マップ
- 学習計画生成

## Phase 5: サービス化

- 有料プラン
- AI添削
- 詳細レポート
- 問題追加運用
- 法改正自動検出
- 管理者レビュー体制

## Phase 6: プラットフォーム化

```txt
Lawyer Quest
├─ 行政書士
├─ 宅建
├─ 社労士
├─ 司法書士
├─ FP
└─ 公務員試験
```

---

## 21. 有料化案

### 無料

- 一部クエスト
- 一問一答
- 再挑戦クエスト
- 基本進捗

### 有料

- 全クエスト
- 記述式クエスト
- 模試ダンジョン
- AI添削
- 詳細弱点分析
- 復習スケジュール
- 法改正対応まとめ

---

## 22. SEO設計

## 22.1 SEO対象ページ

- 行政書士 行政法 一問一答
- 行政書士 民法 一問一答
- 行政書士 憲法 一問一答
- 行政手続法 一問一答
- 行政不服審査法 一問一答
- 行政事件訴訟法 一問一答
- 国家賠償法 一問一答
- 地方自治法 一問一答
- 民法総則 一問一答
- 行政書士 記述式 対策
- Lawyer Quest 行政書士

## 22.2 SEO記事方針

- クエストページと解説記事を連携する
- 条文ごとの解説記事を作る
- 判例ごとの解説記事を作る
- 各記事に関連チャレンジを表示する

---

## 23. リスク

## 23.1 正確性リスク

法律学習サイトでは誤情報が致命的になりやすい。

対応:

- ソース必須
- レビュー必須
- 法改正チェック
- 更新日表示

## 23.2 著作権リスク

過去問や参考書の転載には注意が必要。

対応:

- 利用条件確認
- 出典表示
- 必要に応じてオリジナル問題化
- 市販参考書の丸写し禁止

## 23.3 AI誤回答リスク

AI生成解説は誤りを含む可能性がある。

対応:

- AI生成文は下書き扱い
- ソース照合必須
- 公開前レビュー
- ユーザー向けに参考扱いであることを明記

## 23.4 ブランド誤認リスク

Lawyer Questという名称は、弁護士向け・法律相談サービスと誤認される可能性がある。

対応:

- サイト説明に「行政書士試験対策」を明記する
- 法律相談ではないことを明記する
- 法的助言を提供しない旨を明記する
- キャッチコピーで学習サービスであることを伝える

---

## 24. 長期的な理想形

最終的には、以下のようなサービスを目指す。

- 行政書士試験の全科目に対応
- 過去問・オリジナル問題・条文・判例を横断検索できる
- 受験者ごとに弱点を分析する
- 復習スケジュールを自動作成する
- 記述式答案を添削する
- 法改正に追従する
- 公式ソースに基づく信頼性の高い学習サイトにする
- 他の法律系資格にも展開する

---

## 25. 最初にやるべきこと

MVP開発前に、以下を決める。

```txt
1. ロゴ
2. デザイン方向
3. 問題データのJSON形式
4. 初期問題250問の作成ルール
5. 参照ソースの記載ルール
6. 法令基準日
7. 公開範囲
8. 過去問を使うか、オリジナル問題だけにするか
9. Lawyer Questのサブタイトル
10. 法律相談ではない旨の表示
```

---

## 26. 推奨初期開発順

```txt
1. 型定義
2. Questデータ
3. Areaデータ
4. 問題JSON
5. 問題取得関数
6. クエスト一覧
7. チャレンジ画面
8. 解答・解説表示
9. Source表示
10. Law Link表示
11. localStorage保存
12. 間違い問題一覧
13. 再挑戦クエスト
14. 進捗画面
```

---

## 27. 判断

最初から大規模な学習サービスを作るより、まずは以下に絞る。

```txt
行政法・民法・憲法の一問一答を、根拠ソース付きで攻略できるサイト
```

Lawyer Questの独自性は、MVP時点では以下の3点に集約する。

```txt
1. クエスト形式の見せ方
2. Source必須の信頼性
3. 再挑戦クエストによる復習
```

その後、条文ツリー・判例図鑑・模試ダンジョンを追加して、既存の過去問サイトとの差別化を強める。
