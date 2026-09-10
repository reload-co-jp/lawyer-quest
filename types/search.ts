export type SearchItemType = "glossary" | "article" | "question"

export type SearchItem = {
  id: string
  type: SearchItemType
  title: string
  subtitle?: string
  text: string
  url: string
}
