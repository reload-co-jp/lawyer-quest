export type QuestId =
  | "administrative_law"
  | "civil_law"
  | "constitutional_law"

export type Subject =
  | "administrative_law"
  | "civil_law"
  | "constitutional_law"

export type Quest = {
  id: QuestId
  title: string
  subject: Subject
  description: string
  order: number
}

export type QuestArea = {
  id: string
  questId: QuestId
  title: string
  description?: string
  order: number
}
