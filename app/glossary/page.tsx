import type { Metadata } from "next"
import Link from "next/link"
import { GLOSSARY_FIELDS, getTermsByField } from "lib/glossary"
import { BASE_URL, buildBreadcrumbJsonLd, buildMetadata } from "lib/seo"
import { BreadcrumbNav } from "components/BreadcrumbNav"
import type { GlossaryField } from "types/glossary"

export const metadata: Metadata = buildMetadata({
  title: "法律用語集",
  description:
    "行政書士試験に出てくる専門用語を憲法・民法・行政法の分野別に整理した用語集。用語の意味と関連する演習問題へのリンク付き。",
  path: "/glossary",
})

const breadcrumbItems = [
  { name: "ホーム", path: "/" },
  { name: "法律用語集", path: "/glossary" },
]

const FIELD_COLOR: Record<GlossaryField, string> = {
  憲法: "var(--const)",
  民法: "var(--civil)",
  行政法: "var(--admin)",
}

export default function GlossaryPage() {
  const grouped = GLOSSARY_FIELDS.map((field) => ({
    field,
    terms: getTermsByField(field),
  }))

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: "行政書士試験 法律用語集",
      description:
        "行政書士試験に出てくる専門用語を憲法・民法・行政法の分野別に整理した用語集。",
      url: `${BASE_URL}/glossary`,
      inLanguage: "ja",
      hasDefinedTerm: grouped.flatMap(({ terms }) =>
        terms.map((t) => ({
          "@type": "DefinedTerm",
          name: t.term,
          description: t.description,
          inDefinedTermSet: `${BASE_URL}/glossary`,
          url: `${BASE_URL}/glossary/${t.id}`,
          citation: t.source,
        }))
      ),
    },
    buildBreadcrumbJsonLd(breadcrumbItems),
  ]

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "1.5rem 1rem 3rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BreadcrumbNav items={breadcrumbItems} />

      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "1.375rem",
            fontWeight: 700,
            color: "var(--text-1)",
            letterSpacing: "-.02em",
            marginBottom: ".375rem",
          }}
        >
          法律用語集
        </h1>
        <p
          style={{
            fontSize: ".875rem",
            color: "var(--text-2)",
            lineHeight: 1.65,
          }}
        >
          試験問題に頻出する専門用語を、憲法・民法・行政法の分野別にまとめた。用語ごとに関連する演習問題へリンクしているので、意味を覚えたらそのまま問題で確認できる。
        </p>
      </div>

      {grouped.map(({ field, terms }) => (
        <section key={field} style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              marginBottom: ".875rem",
              paddingBottom: ".5rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: FIELD_COLOR[field],
              }}
            />
            <h2
              style={{
                fontSize: ".8125rem",
                fontWeight: 600,
                color: "var(--text-2)",
                letterSpacing: ".04em",
                textTransform: "uppercase",
              }}
            >
              {field}
            </h2>
            <span style={{ fontSize: ".75rem", color: "var(--text-3)" }}>
              {terms.length}語
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
            {terms.map((term) => (
              <Link
                key={term.id}
                href={`/glossary/${term.id}`}
                style={{
                  display: "block",
                  padding: ".875rem 1rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderLeft: `2px solid ${FIELD_COLOR[field]}`,
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: ".5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <h3
                    style={{
                      fontSize: ".9375rem",
                      fontWeight: 600,
                      color: "var(--text-1)",
                      margin: 0,
                    }}
                  >
                    {term.term}
                  </h3>
                  {term.reading && (
                    <span style={{ fontSize: ".75rem", color: "var(--text-3)" }}>
                      {term.reading}
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontSize: ".8125rem",
                    color: "var(--text-2)",
                    margin: ".375rem 0 0",
                    lineHeight: 1.65,
                  }}
                >
                  {term.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <div
        style={{
          padding: "1.25rem",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderLeft: "2px solid var(--accent)",
          display: "flex",
          flexDirection: "column",
          gap: ".75rem",
        }}
      >
        <p
          style={{
            fontSize: ".875rem",
            color: "var(--text-1)",
            fontWeight: 600,
            margin: 0,
          }}
        >
          用語を覚えたら問題演習で定着させる
        </p>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          <Link
            href="/quests"
            style={{
              padding: ".5rem .875rem",
              background: "var(--accent-btn)",
              color: "#fff",
              textDecoration: "none",
              fontSize: ".875rem",
              fontWeight: 600,
              borderRadius: "var(--radius-sm)",
            }}
          >
            クエストで学ぶ →
          </Link>
          <Link
            href="/articles"
            style={{
              padding: ".5rem .875rem",
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-2)",
              textDecoration: "none",
              fontSize: ".875rem",
              borderRadius: "var(--radius-sm)",
            }}
          >
            記事を読む
          </Link>
        </div>
      </div>
    </div>
  )
}
