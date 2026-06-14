import type { QuestId, Subject } from "./quest"

export type QuestionFormat = "true_false" | "multiple_choice"

export type Choice = {
  id: string
  text: string
}

export type QuestionSource = {
  type: "law" | "case" | "exam" | "government" | "book" | "original"
  title: string
  organization: string
  url?: string
  lawName?: string
  article?: string
  caseName?: string
  decisionDate?: string
  checkedAt: string
}

export type LawLink = {
  type: "law" | "case" | "exam"
  title: string
  description?: string
  url?: string
}

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
