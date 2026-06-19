import fs from "fs"
import path from "path"
import { marked } from "marked"

const ARTICLES_DIR = path.join(process.cwd(), "data/articles")

export type ArticleSubject =
  | "administrative_law"
  | "civil_law"
  | "constitutional_law"

export type ArticleMeta = {
  id: string
  title: string
  subject: ArticleSubject
  subjectLabel: string
  order: number
}

function detectSubject(id: string): {
  subject: ArticleSubject
  subjectLabel: string
} {
  if (id.startsWith("admin-"))
    return { subject: "administrative_law", subjectLabel: "行政法" }
  if (id.startsWith("civil-"))
    return { subject: "civil_law", subjectLabel: "民法" }
  return { subject: "constitutional_law", subjectLabel: "憲法" }
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : "記事"
}

export function getAllArticles(): ArticleMeta[] {
  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
  return files.map((file, i) => {
    const id = file.replace(/\.md$/, "")
    const content = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8")
    const title = extractTitle(content)
    const { subject, subjectLabel } = detectSubject(id)
    return { id, title, subject, subjectLabel, order: i }
  })
}

export function getArticleContent(
  id: string
): { meta: ArticleMeta; html: string } | null {
  const filePath = path.join(ARTICLES_DIR, `${id}.md`)
  if (!fs.existsSync(filePath)) return null
  const content = fs.readFileSync(filePath, "utf-8")
  const title = extractTitle(content)
  const { subject, subjectLabel } = detectSubject(id)
  const meta: ArticleMeta = { id, title, subject, subjectLabel, order: 0 }
  const html = marked(content) as string
  return { meta, html }
}
