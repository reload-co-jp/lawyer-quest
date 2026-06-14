import Link from "next/link"
import { getAllArticles, getArticleContent } from "lib/articles"
import "../prose.css"

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ articleId: a.id }))
}

const SUBJECT_COLOR: Record<string, string> = {
  administrative_law: "#60a5fa",
  civil_law: "#34d399",
  constitutional_law: "#a78bfa",
}

export default async function ArticlePage({ params }: { params: Promise<{ articleId: string }> }) {
  const { articleId } = await params
  const result = getArticleContent(articleId)
  if (!result) return <p style={{ color: "#ef4444" }}>記事が見つかりません。</p>

  const { meta, html } = result
  const color = SUBJECT_COLOR[meta.subject] ?? "#818cf8"

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <Link
          href="/articles"
          style={{ fontSize: ".8125rem", color: "#64748b", textDecoration: "none" }}
        >
          ← 記事一覧
        </Link>
        <p
          style={{
            fontSize: ".75rem",
            color,
            fontWeight: 700,
            margin: ".75rem 0 .25rem",
            textTransform: "uppercase",
            letterSpacing: ".05em",
          }}
        >
          {meta.subjectLabel}
        </p>
      </div>

      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div
        style={{
          marginTop: "2.5rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid #2a2a5a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/articles" style={{ fontSize: ".875rem", color: "#818cf8", textDecoration: "none" }}>
          ← 記事一覧に戻る
        </Link>
        <Link
          href={`/challenge/${meta.subject}`}
          style={{
            fontSize: ".875rem",
            fontWeight: 700,
            color: "#0f0f23",
            background: color,
            padding: ".5rem 1rem",
            borderRadius: ".375rem",
            textDecoration: "none",
          }}
        >
          {meta.subjectLabel}のクエストへ →
        </Link>
      </div>
    </div>
  )
}
