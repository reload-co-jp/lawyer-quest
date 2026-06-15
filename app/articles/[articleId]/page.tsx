import type { Metadata } from "next"
import Link from "next/link"
import { getAllArticles, getArticleContent } from "lib/articles"
import { getRelatedQuestions } from "lib/questions"
import "../prose.css"

const BASE_URL = "https://lawyer-quest.reload.co.jp"

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ articleId: a.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ articleId: string }> }): Promise<Metadata> {
  const { articleId } = await params
  const result = getArticleContent(articleId)
  if (!result) return {}
  const { meta } = result
  return {
    title: meta.title,
    description: `行政書士試験対策 — ${meta.subjectLabel}「${meta.title}」。条文・判例解説付き。`,
    alternates: { canonical: `${BASE_URL}/articles/${meta.id}` },
    openGraph: {
      title: `${meta.title} | Lawyer Quest`,
      description: `行政書士試験対策 — ${meta.subjectLabel}「${meta.title}」。条文・判例解説付き。`,
      url: `${BASE_URL}/articles/${meta.id}`,
    },
  }
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
  const relatedQuestions = getRelatedQuestions(articleId)

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: meta.title,
      inLanguage: "ja",
      url: `${BASE_URL}/articles/${meta.id}`,
      isPartOf: { "@type": "WebSite", name: "Lawyer Quest", url: BASE_URL },
      about: { "@type": "Thing", name: meta.subjectLabel },
      publisher: { "@type": "Organization", name: "Lawyer Quest", url: BASE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "学習記事", item: `${BASE_URL}/articles` },
        { "@type": "ListItem", position: 3, name: meta.title, item: `${BASE_URL}/articles/${meta.id}` },
      ],
    },
  ]

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: ".5rem" }}>
        <Link href="/articles" style={{ fontSize: ".8125rem", color: "var(--text-3)", textDecoration: "none" }}>
          記事
        </Link>
        <span style={{ color: "var(--text-3)", fontSize: ".8125rem" }}>/</span>
        <span style={{ fontSize: ".8125rem", color: "var(--text-2)" }}>{meta.subjectLabel}</span>
      </div>

      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />

      {relatedQuestions.length > 0 && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1.25rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: `2px solid ${color}`,
          }}
        >
          <p style={{ fontSize: ".75rem", color: "var(--text-3)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: ".875rem" }}>
            この記事に関連する問題
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {relatedQuestions.map((q) => (
              <Link
                key={q.id}
                href={`/questions/${q.id}`}
                style={{
                  padding: ".625rem .75rem",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--text-2)",
                  textDecoration: "none",
                  fontSize: ".8125rem",
                  lineHeight: 1.5,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: ".5rem",
                }}
              >
                <span style={{ flexShrink: 0, color: "var(--text-3)", fontVariantNumeric: "tabular-nums" }}>
                  {"★".repeat(q.difficulty)}
                </span>
                <span style={{ flex: 1 }}>
                  {q.question.length > 70 ? q.question.slice(0, 70) + "…" : q.question}
                </span>
                <span style={{ flexShrink: 0, color: "var(--text-3)", fontSize: ".6875rem" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

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
