import type { Quest, QuestArea, QuestId } from "types/quest"
import questsData from "data/quests.json"
import areasData from "data/areas.json"

export function getAllQuests(): Quest[] {
  return questsData as Quest[]
}

export function getQuestById(id: QuestId): Quest | undefined {
  return (questsData as Quest[]).find((q) => q.id === id)
}

export function getAllAreas(): QuestArea[] {
  return areasData as QuestArea[]
}

export function getAreasByQuestId(questId: QuestId): QuestArea[] {
  return (areasData as QuestArea[])
    .filter((a) => a.questId === questId)
    .sort((a, b) => a.order - b.order)
}

export function getAreaById(id: string): QuestArea | undefined {
  return (areasData as QuestArea[]).find((a) => a.id === id)
}

export const QUEST_COLORS: Record<QuestId, string> = {
  administrative_law: "#3b82f6",
  civil_law: "#10b981",
  constitutional_law: "#8b5cf6",
}
