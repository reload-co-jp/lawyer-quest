import type { QuestId } from "./quest"

export type AnswerHistory = {
  questionId: string
  questId: QuestId
  areaId: string
  selectedAnswer: string
  isCorrect: boolean
  answeredAt: string
  timeSpentSec?: number
}

export type WrongQuestion = {
  questionId: string
  questId: QuestId
  areaId: string
  wrongCount: number
  lastWrongAt: string
  lastReviewedAt?: string
}

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

export type UserProgress = {
  totalChallenges: number
  totalCorrect: number
  questProgress: Record<QuestId, QuestProgress>
  wrongQuestionIds: string[]
  lastPlayedAt?: string
}

export const STORAGE_KEYS = {
  answerHistory: "lawyer_quest_answer_history",
  userProgress: "lawyer_quest_user_progress",
  wrongQuestions: "lawyer_quest_wrong_questions",
} as const
