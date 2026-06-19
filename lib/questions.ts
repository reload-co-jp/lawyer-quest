import type { Question } from "types/question"
import type { QuestId } from "types/quest"
import adminLawQuestions from "data/questions/administrative-law.json"
import civilLawQuestions from "data/questions/civil-law.json"
import constitutionalLawQuestions from "data/questions/constitutional-law.json"
import pastExamQuestions from "data/questions/past-exam.json"
import { shuffle } from "lib/shuffle"

const allQuestions: Question[] = [
  ...(adminLawQuestions as Question[]),
  ...(civilLawQuestions as Question[]),
  ...(constitutionalLawQuestions as Question[]),
  ...(pastExamQuestions as Question[]),
]

export function getAllQuestions(): Question[] {
  return allQuestions
}

export function getQuestionsByQuestId(questId: QuestId): Question[] {
  return allQuestions.filter((q) => q.questId === questId)
}

export function getQuestionById(id: string): Question | undefined {
  return allQuestions.find((q) => q.id === id)
}

export function getQuestionsByIds(ids: string[]): Question[] {
  return ids.map((id) => allQuestions.find((q) => q.id === id)).filter(Boolean) as Question[]
}

const ARTICLE_TAGS: Record<string, string[]> = {
  "admin-01-overview": ["行政法総論", "行政行為", "行政行為の種類"],
  "admin-02-procedures": ["行政手続法", "申請", "処分", "審査基準", "処分基準"],
  "admin-03-appeal": ["行政不服審査法", "審査請求", "裁決"],
  "admin-04-litigation": ["行政事件訴訟法", "取消訴訟", "抗告訴訟"],
  "admin-05-disposability": ["処分性", "取消訴訟"],
  "admin-06-standing": ["原告適格", "取消訴訟", "訴えの利益"],
  "admin-07-guidance": ["行政指導"],
  "admin-08-disclosure": ["情報公開", "個人情報保護法"],
  "admin-09-enforcement": ["行政強制", "代執行", "即時強制", "行政上の強制執行", "行政上の秩序罰"],
  "admin-10-compensation": ["国家賠償", "国家賠償法"],
  "admin-11-local-government": ["地方自治", "地方公共団体"],
  "admin-12-administrative-penalty": ["行政罰", "秩序罰", "行政上の秩序罰"],
  "admin-13-unfavorable-disposition": ["不利益処分", "聴聞"],
  "admin-14-appeal-review": ["行政不服審査法", "審査請求", "審査請求前置主義"],
  "admin-15-injunction": ["義務付け訴訟", "差止め訴訟", "申請型"],
  "admin-16-organization": ["行政組織"],
  "admin-17-planning": ["行政計画"],
  "admin-18-loss-compensation": ["損失補償"],
  "civil-01-general": ["民法総則", "意思表示", "代理", "時効", "権利能力", "失踪宣告"],
  "civil-02-property": ["物権", "所有権", "担保物権", "占有権"],
  "civil-03-obligations": ["債権総論", "不法行為", "不当利得"],
  "civil-04-family-inheritance": ["親族", "相続", "婚姻", "離婚", "養子縁組"],
  "civil-05-contracts": ["売買", "賃貸借", "請負", "使用貸借", "消費貸借"],
  "civil-06-torts": ["不法行為", "709条", "工作物責任", "監督義務者責任"],
  "civil-07-security": ["抵当権", "質権", "留置権", "先取特権"],
  "civil-08-prescription": ["時効", "取得時効", "消滅時効", "完成猶予", "更新"],
  "civil-09-agency": ["代理", "無権代理", "表見代理", "復代理"],
  "civil-10-intention": ["錯誤", "詐欺", "強迫", "意思表示", "公序良俗"],
  "civil-11-real-rights": ["物権変動", "登記", "混同"],
  "civil-12-succession": ["相続", "相続放棄", "限定承認", "法定相続分", "遺産分割"],
  "const-01-human-rights": ["基本的人権", "私人間効力", "外国人の人権", "法人の人権"],
  "const-02-freedoms": ["経済的自由", "社会権", "職業選択の自由", "財産権"],
  "const-03-governance": ["国会", "内閣", "裁判所", "統治機構"],
  "const-04-cases": ["判例", "違憲"],
  "const-05-equality": ["14条", "法の下の平等", "平等権", "尊属殺"],
  "const-06-economic-freedom": ["職業選択の自由", "財産権", "22条", "29条", "損失補償"],
  "const-07-voting-rights": ["選挙権", "一票の格差", "参政権"],
  "const-08-social-rights": ["生存権", "25条", "教育を受ける権利", "労働基本権"],
  "const-09-criminal-procedure": ["31条", "黙秘権", "令状主義", "二重の危険禁止", "人身の自由"],
  "const-10-cabinet": ["内閣", "議院内閣制", "69条", "内閣総理大臣"],
  "const-11-diet": ["国会", "衆議院の優越", "会期", "国会議員"],
  "const-12-judicial-review": ["違憲審査制", "81条", "付随的審査制", "統治行為"],
}

type Field = "行政法" | "民法" | "憲法"

const SUBJECT_FIELD: Partial<Record<Question["subject"], Field>> = {
  administrative_law: "行政法",
  civil_law: "民法",
  constitutional_law: "憲法",
}

const PAST_EXAM_AREA_FIELD: Record<string, Field> = {
  past_exam_admin: "行政法",
  past_exam_civil: "民法",
  past_exam_const: "憲法",
}

export function getFieldLabel(q: Question): Field | undefined {
  return SUBJECT_FIELD[q.subject] ?? PAST_EXAM_AREA_FIELD[q.areaId]
}

// 行政書士試験本番の科目別出題比率（行政法19:民法9:憲法5）を20問にスケールした構成
const MOCK_EXAM_FIELD_COUNTS: { field: Field; count: number }[] = [
  { field: "行政法", count: 12 },
  { field: "民法", count: 5 },
  { field: "憲法", count: 3 },
]

export function buildBalancedMockExam(): Question[] {
  const byField: Record<Field, Question[]> = { 行政法: [], 民法: [], 憲法: [] }
  for (const q of allQuestions) {
    const field = getFieldLabel(q)
    if (field) byField[field].push(q)
  }

  const selected = MOCK_EXAM_FIELD_COUNTS.flatMap(({ field, count }) => shuffle(byField[field]).slice(0, count))
  return shuffle(selected)
}

export function getRelatedQuestions(articleId: string, limit = 5): Question[] {
  const tags = ARTICLE_TAGS[articleId]
  if (!tags || tags.length === 0) return []

  const prefix = articleId.startsWith("admin-")
    ? "administrative_law"
    : articleId.startsWith("civil-")
    ? "civil_law"
    : "constitutional_law"

  const scored = allQuestions
    .filter((q) => q.questId === prefix || (q.questId === "past_exam" && q.subject === prefix))
    .map((q) => {
      const qtags = q.tags ?? []
      const score = tags.filter((t) => qtags.includes(t)).length
      return { q, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map(({ q }) => q)
}
