import fs from "fs"
import path from "path"
import { execFileSync } from "child_process"
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
  excerpt: string
  lastModified: string
}

function getLastModified(filePath: string): string {
  try {
    const output = execFileSync(
      "git",
      ["log", "-1", "--format=%aI", "--", filePath],
      { cwd: process.cwd(), encoding: "utf-8" }
    ).trim()
    return output || new Date().toISOString()
  } catch {
    return new Date().toISOString()
  }
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

function extractExcerpt(content: string): string {
  let inCodeBlock = false
  for (const raw of content.split("\n")) {
    const line = raw.trim()
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (
      inCodeBlock ||
      line === "" ||
      /^#{1,6}\s/.test(line) ||
      line.startsWith(">") ||
      /^-{3,}$/.test(line) ||
      line.startsWith("|")
    )
      continue

    const plain = line
      .replace(/^[-*]\s+/, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim()
    if (plain.length < 8) continue
    return plain.length > 80 ? plain.slice(0, 80) + "…" : plain
  }
  return ""
}

export function getAllArticles(): ArticleMeta[] {
  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
  return files.map((file, i) => {
    const id = file.replace(/\.md$/, "")
    const filePath = path.join(ARTICLES_DIR, file)
    const content = fs.readFileSync(filePath, "utf-8")
    const title = extractTitle(content)
    const excerpt = extractExcerpt(content)
    const { subject, subjectLabel } = detectSubject(id)
    const lastModified = getLastModified(filePath)
    return { id, title, subject, subjectLabel, order: i, excerpt, lastModified }
  })
}

export function getArticleContent(
  id: string
): { meta: ArticleMeta; html: string } | null {
  const filePath = path.join(ARTICLES_DIR, `${id}.md`)
  if (!fs.existsSync(filePath)) return null
  const content = fs.readFileSync(filePath, "utf-8")
  const title = extractTitle(content)
  const excerpt = extractExcerpt(content)
  const { subject, subjectLabel } = detectSubject(id)
  const lastModified = getLastModified(filePath)
  const meta: ArticleMeta = {
    id,
    title,
    subject,
    subjectLabel,
    order: 0,
    excerpt,
    lastModified,
  }
  const html = marked(content) as string
  return { meta, html }
}
