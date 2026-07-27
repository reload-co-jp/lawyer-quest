import type { Metadata } from "next"
import Link from "next/link"
import {
  getAdjacentTerms,
  getAllTerms,
  getRelatedQuestionsForTerm,
  getTermById,
} from "lib/glossary"
import { BASE_URL, buildBreadcrumbJsonLd, buildMetadata } from "lib/seo"
import { BreadcrumbNav } from "components/BreadcrumbNav"
import type { GlossaryField } from "types/glossary"
import type { QuestId } from "types/quest"

export function generateStaticParams() {
  return getAllTerms().map((t) => ({ termId: t.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ termId: string }>
}): Promise<Metadata> {
  const { termId } = await params
  const term = getTermById(termId)
  if (!term) return {}
  return buildMetadata({
    title: `${term.term}とは｜${term.field}用語の意味・根拠をわかりやすく解説`,
    description: `${term.term}の意味を解説。${term.description}`,
    path: `/glossary/${term.id}`,
  })
}

const FIELD_COLOR: Record<GlossaryField, string> = {
  憲法: "var(--const)",
  民法: "var(--civil)",
  行政法: "var(--admin)",
}

const FIELD_QUEST_ID: Record<GlossaryField, QuestId> = {
  憲法: "constitutional_law",
  民法: "civil_law",
  行政法: "administrative_law",
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ termId: string }>
}) {
  const { termId } = await params
  const term = getTermById(termId)
  if (!term) return <p style={{ color: "var(--error)" }}>用語が見つかりません。</p>

  const color = FIELD_COLOR[term.field]
  const related = getRelatedQuestionsForTerm(term, 5)
  const { prev, next } = getAdjacentTerms(term)

  const breadcrumbItems = [
    { name: "ホーム", path: "/" },
    { name: "法律用語集", path: "/glossary" },
    { name: term.term, path: `/glossary/${term.id}` },
  ]

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: term.term,
      description: term.description,
      inDefinedTermSet: `${BASE_URL}/glossary`,
      url: `${BASE_URL}/glossary/${term.id}`,
      inLanguage: "ja",
      citation: term.source,
    },
    buildBreadcrumbJsonLd(breadcrumbItems),
  ]

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "1.5rem 1rem 3rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BreadcrumbNav items={breadcrumbItems} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          marginBottom: ".625rem",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: color,
          }}
        />
        <span
          style={{
            fontSize: ".75rem",
            fontWeight: 600,
            color: "var(--text-3)",
            letterSpacing: ".04em",
            textTransform: "uppercase",
          }}
        >
          {term.field}
        </span>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--text-1)",
            letterSpacing: "-.02em",
            marginBottom: ".25rem",
          }}
        >
          {term.term}
        </h1>
        {term.reading && (
          <p style={{ fontSize: ".8125rem", color: "var(--text-3)", margin: 0 }}>
            {term.reading}
          </p>
        )}
      </div>

      <div
        style={{
          padding: "1.125rem 1.25rem",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderLeft: `2px solid ${color}`,
          marginBottom: "1.5rem",
        }}
      >
        <p
          style={{
            fontSize: ".9375rem",
            color: "var(--text-1)",
            margin: 0,
            lineHeight: 1.75,
          }}
        >
          {term.description}
        </p>
        <p
          style={{
            fontSize: ".75rem",
            color: "var(--text-3)",
            margin: ".75rem 0 0",
            paddingTop: ".625rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          根拠: {term.source}
        </p>
      </div>

      {related.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <p
            style={{
              fontSize: ".75rem",
              color: "var(--text-3)",
              fontWeight: 600,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              marginBottom: ".75rem",
            }}
          >
            「{term.term}」に関連する問題
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {related.map((q) => (
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
                <span
                  style={{
                    flexShrink: 0,
                    color: "var(--text-3)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {"★".repeat(q.difficulty)}
                </span>
                <span style={{ flex: 1 }}>
                  {q.question.length > 70 ? q.question.slice(0, 70) + "…" : q.question}
                </span>
                <span
                  style={{ flexShrink: 0, color: "var(--text-3)", fontSize: ".6875rem" }}
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1.5rem",
          fontSize: ".8125rem",
        }}
      >
        {prev ? (
          <Link
            href={`/glossary/${prev.id}`}
            style={{ color: "var(--text-2)", textDecoration: "none" }}
          >
            ← {prev.term}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/glossary/${next.id}`}
            style={{ color: "var(--text-2)", textDecoration: "none" }}
          >
            {next.term} →
          </Link>
        ) : (
          <span />
        )}
      </div>

      <div
        style={{
          paddingTop: "1.25rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/glossary"
          style={{ fontSize: ".875rem", color: "var(--text-2)", textDecoration: "none" }}
        >
          ← 用語集一覧
        </Link>
        <Link
          href={`/challenge/${FIELD_QUEST_ID[term.field]}`}
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
          {term.field}のクエストへ →
        </Link>
      </div>
    </div>
  )
}
