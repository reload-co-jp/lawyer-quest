import Link from "next/link"
import { getAllArticles, getArticleContent } from "lib/articles"
import "../prose.css"

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ articleId: a.id }))
}

const SUBJECT_COLOR: Record<string, string> = {
  administrative_law: "var(--admin)",
  civil_law: "var(--civil)",
  constitutional_law: "var(--const)",
}

export default async function ArticlePage({ params }: { params: Promise<{ articleId: string }> }) {
  const { articleId } = await params
  const result = getArticleContent(articleId)
  if (!result) return <p style={{ color: "var(--error)" }}>記事が見つかりません。</p>

  const { meta, html } = result
  const color = SUBJECT_COLOR[meta.subject] ?? "var(--accent)"

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: ".5rem" }}>
        <Link href="/articles" style={{ fontSize: ".8125rem", color: "var(--text-3)", textDecoration: "none" }}>
          記事
        </Link>
        <span style={{ color: "var(--text-3)", fontSize: ".8125rem" }}>/</span>
        <span style={{ fontSize: ".8125rem", color: "var(--text-2)" }}>{meta.subjectLabel}</span>
      </div>

      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />

      <div
        style={{
          marginTop: "2.5rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Link href="/articles" style={{ fontSize: ".875rem", color: "var(--text-2)", textDecoration: "none" }}>
          ← 記事一覧
        </Link>
        <Link
          href={`/challenge/${meta.subject}`}
          style={{
            padding: ".4375rem .875rem",
            background: "var(--accent-btn)",
            borderRadius: "var(--radius-sm)",
            color: "#fff",
            fontSize: ".8125rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          {meta.subjectLabel}のクエストへ →
        </Link>
      </div>
    </div>
  )
}
