import type { Question } from "types/question"
import type { QuestId } from "types/quest"
import adminLawQuestions from "data/questions/administrative-law.json"
import civilLawQuestions from "data/questions/civil-law.json"
import constitutionalLawQuestions from "data/questions/constitutional-law.json"
import pastExamQuestions from "data/questions/past-exam.json"

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
