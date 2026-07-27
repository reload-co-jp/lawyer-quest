import type { GlossaryField, GlossaryTerm } from "types/glossary"
import type { Question } from "types/question"
import glossaryData from "data/glossary.json"
import { getAllQuestions } from "lib/questions"

const allTerms = glossaryData as GlossaryTerm[]

export function getAllTerms(): GlossaryTerm[] {
  return allTerms
}

export const GLOSSARY_FIELDS: GlossaryField[] = ["憲法", "民法", "行政法"]

export function getTermsByField(field: GlossaryField): GlossaryTerm[] {
  return allTerms.filter((t) => t.field === field)
}

export function getTermById(id: string): GlossaryTerm | undefined {
  return allTerms.find((t) => t.id === id)
}

export function getAdjacentTerms(term: GlossaryTerm): {
  prev?: GlossaryTerm
  next?: GlossaryTerm
} {
  const siblings = getTermsByField(term.field)
  const index = siblings.findIndex((t) => t.id === term.id)
  return {
    prev: index > 0 ? siblings[index - 1] : undefined,
    next: index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined,
  }
}

export function getRelatedQuestionsForTerm(
  term: GlossaryTerm,
  limit = 3
): Question[] {
  const scored = getAllQuestions()
    .map((q) => {
      const qtags = q.tags ?? []
      let score = qtags.filter((t) => term.tags.includes(t)).length * 3
      if (q.topic?.includes(term.term)) score += 2
      if (q.subtopic?.includes(term.term)) score += 1
      if (q.question.includes(term.term)) score += 1
      return { q, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map(({ q }) => q)
}
