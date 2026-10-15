import type { AnswerHistory, UserProgress } from "types/progress"
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

// ---- learning stats derived from answer history (single source of truth) ----

export type QuestTotals = Record<QuestId, number>

export type QuestStatus = "not_started" | "in_progress" | "completed"

export type QuestLearning = {
  total: number
  /** distinct questions answered at least once */
  attempted: number
  answers: number
  correct: number
  /** % of distinct questions attempted (攻略率) */
  completionRate: number
  /** % of answers that were correct (正答率) */
  accuracyRate: number
  status: QuestStatus
  lastPlayedAt?: string
}

export type AreaLearning = {
  areaId: string
  questId: QuestId
  answers: number
  correct: number
  accuracyRate: number
}

export type LearningStats = {
  totalAnswers: number
  totalCorrect: number
  accuracyRate: number
  quests: Record<QuestId, QuestLearning>
  areas: AreaLearning[]
  weakAreas: AreaLearning[]
  last?: AnswerHistory
  recent: AnswerHistory[]
  xp: number
  level: number
  xpIntoLevel: number
  xpPerLevel: number
}

export const XP_CORRECT = 10
export const XP_WRONG = 3
export const XP_PER_LEVEL = 200
const WEAK_MIN_ANSWERS = 3
const WEAK_THRESHOLD = 70

export function buildLearningStats(
  history: AnswerHistory[],
  totals: QuestTotals
): LearningStats {
  const quests = {} as Record<QuestId, QuestLearning>
  for (const questId of Object.keys(totals) as QuestId[]) {
    const own = history.filter((h) => h.questId === questId)
    const attempted = new Set(own.map((h) => h.questionId)).size
    const correct = own.filter((h) => h.isCorrect).length
    const total = totals[questId]
    quests[questId] = {
      total,
      attempted,
      answers: own.length,
      correct,
      completionRate: calcCompletionRate(attempted, total),
      accuracyRate: calcAccuracyRate(correct, own.length),
      status:
        attempted === 0
          ? "not_started"
          : attempted >= total
            ? "completed"
            : "in_progress",
      lastPlayedAt: own.at(-1)?.answeredAt,
    }
  }

  const areaMap = new Map<string, AreaLearning>()
  for (const h of history) {
    const a = areaMap.get(h.areaId) ?? {
      areaId: h.areaId,
      questId: h.questId,
      answers: 0,
      correct: 0,
      accuracyRate: 0,
    }
    a.answers += 1
    if (h.isCorrect) a.correct += 1
    a.accuracyRate = calcAccuracyRate(a.correct, a.answers)
    areaMap.set(h.areaId, a)
  }
  const areas = [...areaMap.values()]
  const weakAreas = areas
    .filter(
      (a) => a.answers >= WEAK_MIN_ANSWERS && a.accuracyRate < WEAK_THRESHOLD
    )
    .sort((a, b) => a.accuracyRate - b.accuracyRate)

  const totalCorrect = history.filter((h) => h.isCorrect).length
  const xp =
    totalCorrect * XP_CORRECT + (history.length - totalCorrect) * XP_WRONG

  return {
    totalAnswers: history.length,
    totalCorrect,
    accuracyRate: calcAccuracyRate(totalCorrect, history.length),
    quests,
    areas,
    weakAreas,
    last: history.at(-1),
    recent: history.slice(-10).reverse(),
    xp,
    level: Math.floor(xp / XP_PER_LEVEL) + 1,
    xpIntoLevel: xp % XP_PER_LEVEL,
    xpPerLevel: XP_PER_LEVEL,
  }
}
