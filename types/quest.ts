export type QuestId =
  | "administrative_law"
  | "civil_law"
  | "constitutional_law"
  | "past_exam"

export type Subject =
  | "administrative_law"
  | "civil_law"
  | "constitutional_law"
  | "past_exam"

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
