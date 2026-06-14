import Link from "next/link"
import { getAllArticles, type ArticleMeta, type ArticleSubject } from "lib/articles"

const SUBJECT_CONFIG: Record<ArticleSubject, { label: string; color: string; bg: string; border: string }> = {
  administrative_law: { label: "行政法", color: "#60a5fa", bg: "#0f1f3d", border: "#1e3a5f" },
  civil_law: { label: "民法", color: "#34d399", bg: "#0f2d1f", border: "#1a4a2e" },
  constitutional_law: { label: "憲法", color: "#a78bfa", bg: "#1a0f3d", border: "#2d1a5f" },
}

function ArticleCard({ article }: { article: ArticleMeta }) {
  const cfg = SUBJECT_CONFIG[article.subject]
  return (
    <Link
      href={`/articles/${article.id}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        style={{
          background: cfg.bg,
          border: `1px solid ${cfg.border}`,
          borderRadius: ".5rem",
          padding: "1rem",
          cursor: "pointer",
          transition: "border-color .15s",
        }}
      >
        <p style={{ fontSize: ".7rem", color: cfg.color, fontWeight: 700, margin: "0 0 .4rem", textTransform: "uppercase", letterSpacing: ".05em" }}>
          {cfg.label}
        </p>
        <p style={{ fontSize: ".9375rem", fontWeight: 600, color: "#f1f5f9", margin: 0 }}>
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
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#818cf8", margin: "0 0 .4rem" }}>
          📖 学習記事
        </h1>
        <p style={{ color: "#64748b", fontSize: ".875rem", margin: 0 }}>
          行政書士試験の主要科目を体系的に整理した解説記事。条文・判例引用付き。
        </p>
      </div>

      {(Object.keys(grouped) as ArticleSubject[]).map((subject) => {
        const cfg = SUBJECT_CONFIG[subject]
        const list = grouped[subject]
        if (list.length === 0) return null
        return (
          <section key={subject} style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: cfg.color,
                marginBottom: "1rem",
                paddingBottom: ".4rem",
                borderBottom: `1px solid ${cfg.border}`,
              }}
            >
              {cfg.label}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: ".75rem",
              }}
            >
              {list.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
