import type { AnswerHistory, WrongQuestion, UserProgress } from "types/progress"
import type { QuestId } from "types/quest"
import { STORAGE_KEYS } from "types/progress"

const isClient = typeof window !== "undefined"

export function getAnswerHistory(): AnswerHistory[] {
  if (!isClient) return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.answerHistory) ?? "[]")
  } catch {
    return []
  }
}

export function addAnswerHistory(entry: AnswerHistory): void {
  if (!isClient) return
  const history = getAnswerHistory()
  history.push(entry)
  localStorage.setItem(STORAGE_KEYS.answerHistory, JSON.stringify(history))
}

export function getWrongQuestions(): WrongQuestion[] {
  if (!isClient) return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.wrongQuestions) ?? "[]")
  } catch {
    return []
  }
}

export function saveWrongQuestion(entry: Omit<WrongQuestion, "wrongCount" | "lastWrongAt">): void {
  if (!isClient) return
  const wrongs = getWrongQuestions()
  const idx = wrongs.findIndex((w) => w.questionId === entry.questionId)
  if (idx >= 0) {
    wrongs[idx].wrongCount += 1
    wrongs[idx].lastWrongAt = new Date().toISOString()
  } else {
    wrongs.push({ ...entry, wrongCount: 1, lastWrongAt: new Date().toISOString() })
  }
  localStorage.setItem(STORAGE_KEYS.wrongQuestions, JSON.stringify(wrongs))
}

export function removeWrongQuestion(questionId: string): void {
  if (!isClient) return
  const wrongs = getWrongQuestions().filter((w) => w.questionId !== questionId)
  localStorage.setItem(STORAGE_KEYS.wrongQuestions, JSON.stringify(wrongs))
}

export function getUserProgress(): UserProgress | null {
  if (!isClient) return null
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.userProgress)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (!isClient) return
  localStorage.setItem(STORAGE_KEYS.userProgress, JSON.stringify(progress))
}

export function recordAnswer(history: AnswerHistory): void {
  addAnswerHistory(history)

  if (!history.isCorrect) {
    saveWrongQuestion({
      questionId: history.questionId,
      questId: history.questId,
      areaId: history.areaId,
    })
  }

  updateUserProgress(history)
}

function updateUserProgress(history: AnswerHistory): void {
  const progress = getUserProgress() ?? createEmptyProgress()

  progress.totalChallenges += 1
  if (history.isCorrect) progress.totalCorrect += 1
  progress.lastPlayedAt = history.answeredAt

  const qp = progress.questProgress[history.questId as QuestId]
  if (qp) {
    qp.answeredQuestions += 1
    if (history.isCorrect) {
      qp.correctAnswers += 1
    } else {
      qp.wrongAnswers += 1
    }
    qp.lastPlayedAt = history.answeredAt
    qp.accuracyRate =
      qp.answeredQuestions > 0 ? qp.correctAnswers / qp.answeredQuestions : 0
    qp.completionRate =
      qp.totalQuestions > 0 ? Math.min(qp.answeredQuestions / qp.totalQuestions, 1) : 0
  }

  const wrongIds = getWrongQuestions().map((w) => w.questionId)
  progress.wrongQuestionIds = wrongIds

  saveUserProgress(progress)
}

function createEmptyProgress(): UserProgress {
  return {
    totalChallenges: 0,
    totalCorrect: 0,
    questProgress: {
      administrative_law: {
        questId: "administrative_law",
        totalQuestions: 30,
        answeredQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        completionRate: 0,
        accuracyRate: 0,
      },
      civil_law: {
        questId: "civil_law",
        totalQuestions: 30,
        answeredQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        completionRate: 0,
        accuracyRate: 0,
      },
      constitutional_law: {
        questId: "constitutional_law",
        totalQuestions: 30,
        answeredQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        completionRate: 0,
        accuracyRate: 0,
      },
      past_exam: {
        questId: "past_exam",
        totalQuestions: 200,
        answeredQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        completionRate: 0,
        accuracyRate: 0,
      },
    },
    wrongQuestionIds: [],
  }
}
