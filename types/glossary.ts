export type GlossaryField = "憲法" | "民法" | "行政法"

export type GlossaryTerm = {
  id: string
  term: string
  reading?: string
  field: GlossaryField
  description: string
  tags: string[]
  source: string
}
