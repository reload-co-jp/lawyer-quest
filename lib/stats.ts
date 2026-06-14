import type { UserProgress } from "types/progress"
import type { QuestId } from "types/quest"

export function calcAccuracyRate(correct: number, total: number): number {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

export function calcCompletionRate(answered: number, total: number): number {
  if (total === 0) return 0
  return Math.round(Math.min(answered / total, 1) * 100)
}

export function getOverallAccuracy(progress: UserProgress): number {
  return calcAccuracyRate(progress.totalCorrect, progress.totalChallenges)
}

export function getQuestStats(progress: UserProgress, questId: QuestId) {
  const qp = progress.questProgress[questId]
  if (!qp) return null
  return {
    completionRate: calcCompletionRate(qp.answeredQuestions, qp.totalQuestions),
    accuracyRate: calcAccuracyRate(qp.correctAnswers, qp.answeredQuestions),
    answeredQuestions: qp.answeredQuestions,
    correctAnswers: qp.correctAnswers,
    totalQuestions: qp.totalQuestions,
    lastPlayedAt: qp.lastPlayedAt,
  }
}
