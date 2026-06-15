import type { Metadata } from "next"
import Link from "next/link"
import { getAllArticles, type ArticleMeta, type ArticleSubject } from "lib/articles"

export const metadata: Metadata = {
  title: "学習記事",
  description: "行政書士試験の主要科目（行政法・民法・憲法）を体系的に整理した解説記事。条文・判例引用付き。",
}

const SUBJECT_CONFIG: Record<ArticleSubject, { label: string; color: string }> = {
  administrative_law: { label: "行政法", color: "var(--admin)" },
  civil_law: { label: "民法", color: "var(--civil)" },
  constitutional_law: { label: "憲法", color: "var(--const)" },
}

function ArticleCard({ article }: { article: ArticleMeta }) {
  const cfg = SUBJECT_CONFIG[article.subject]
  return (
    <Link href={`/articles/${article.id}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: ".875rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: ".75rem",
        }}
      >
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />
        <p style={{ fontSize: ".9375rem", fontWeight: 500, color: "var(--text-1)", margin: 0 }}>
          {article.title}
        </p>
      </div>
    </Link>
  )
}

export default function ArticlesPage() {
  const articles = getAllArticles()

  const grouped: Record<ArticleSubject, ArticleMeta[]> = {
    administrative_law: [],
    civil_law: [],
    constitutional_law: [],
  }
  for (const a of articles) grouped[a.subject].push(a)

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-.02em", marginBottom: ".375rem" }}>
          学習記事
        </h1>
        <p style={{ fontSize: ".875rem", color: "var(--text-2)" }}>
          行政書士試験の主要科目を体系的に整理した解説記事。条文・判例引用付き。
        </p>
      </div>

      {(Object.keys(grouped) as ArticleSubject[]).map((subject) => {
        const cfg = SUBJECT_CONFIG[subject]
        const list = grouped[subject]
        if (list.length === 0) return null
        return (
          <section key={subject} style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".75rem" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: cfg.color }} />
              <h2 style={{ fontSize: ".8125rem", fontWeight: 600, color: "var(--text-2)", letterSpacing: ".04em", textTransform: "uppercase" }}>
                {cfg.label}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
              {list.map((a) => (
                <Link key={a.id} href={`/articles/${a.id}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      padding: ".75rem 1rem",
                      background: "var(--surface)",
                      borderBottom: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ fontSize: ".9375rem", fontWeight: 500, color: "var(--text-1)", margin: 0 }}>
                      {a.title}
                    </p>
                    <span style={{ fontSize: ".875rem", color: "var(--text-3)" }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
