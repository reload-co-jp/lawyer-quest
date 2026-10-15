import type { FC } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { getAllArticles } from "lib/articles"
import { getQuestTotals } from "lib/questions"
import { buildMetadata } from "lib/seo"
import {
  QuestList,
  ReviewSection,
  StatsSection,
  SUBJECT_COLOR,
  TodaySection,
} from "components/Dashboard"

export const metadata: Metadata = buildMetadata({
  title: "行政書士試験対策",
  description:
    "行政書士試験対策サイト。行政法・民法・憲法の要点を、クエスト形式の問題演習と学習記事で定着。",
  path: "/",
})

const PRACTICE = [
  { href: "/mock-exam", title: "模擬テスト", note: "本試験形式で実力を確認" },
  {
    href: "/challenge/random",
    title: "ランダム演習",
    note: "全クエストからランダム10問",
  },
]

const GUIDES = [
  {
    href: "/basics",
    title: "法律ゼロから入門",
    note: "条文の読み方・法律用語をやさしく解説",
  },
  {
    href: "/study-guide",
    title: "勉強ガイド",
    note: "勉強する範囲・意義・難易度",
  },
  {
    href: "/exam-guide",
    title: "試験ガイド",
    note: "試験概要・科目・合格基準・申込み",
  },
  {
    href: "/general-knowledge",
    title: "基礎知識科目 対策",
    note: "足切り基準・分野別の対策",
  },
]

const subHeading = {
  fontSize: ".875rem",
  color: "var(--text-2)",
  margin: "0 0 .625rem",
} as const

const LinkCard: FC<{ href: string; title: string; note: string }> = ({
  href,
  title,
  note,
}) => (
  <Link href={href} className="card">
    <p style={{ fontWeight: 700 }}>{title}</p>
    <p
      style={{
        fontSize: ".8125rem",
        color: "var(--text-2)",
        marginTop: ".25rem",
      }}
    >
      {note}
    </p>
  </Link>
)

const Section: FC<{
  id: string
  title: string
  more?: { href: string; label: string }
  children: React.ReactNode
}> = ({ id, title, more, children }) => (
  <section id={id} className="section" aria-labelledby={`${id}-title`}>
    <div className="section-head">
      <h2 id={`${id}-title`} className="section-title">
        {title}
      </h2>
      {more && (
        <Link href={more.href} className="section-link">
          {more.label} →
        </Link>
      )}
    </div>
    {children}
  </section>
)

const Page: FC = () => {
  const totals = getQuestTotals()
  const articles = getAllArticles().slice(0, 6)

  return (
    <>
      <TodaySection totals={totals} />

      <Section
        id="quests"
        title="クエスト一覧"
        more={{ href: "/quests", label: "すべて見る" }}
      >
        <QuestList totals={totals} />
      </Section>

      <Section id="review" title="復習・再挑戦">
        <ReviewSection totals={totals} />
      </Section>

      <Section id="more" title="その他の学習コンテンツ">
        <h3 style={subHeading}>演習</h3>
        <div className="grid" style={{ marginBottom: "1.5rem" }}>
          {PRACTICE.map((l) => (
            <LinkCard key={l.href} {...l} />
          ))}
        </div>

        <h3 style={subHeading}>入門・ガイド</h3>
        <div className="grid" style={{ marginBottom: "1.5rem" }}>
          {GUIDES.map((l) => (
            <LinkCard key={l.href} {...l} />
          ))}
        </div>

        <div className="section-head" style={{ marginBottom: ".625rem" }}>
          <h3 style={{ ...subHeading, margin: 0 }}>学習記事・用語集</h3>
          <span style={{ display: "flex", gap: "1rem" }}>
            <Link href="/articles" className="section-link">
              記事一覧 →
            </Link>
            <Link href="/glossary" className="section-link">
              用語集 →
            </Link>
          </span>
        </div>
        <ul className="card" style={{ listStyle: "none", padding: ".25rem 0" }}>
          {articles.map((article, i) => (
            <li
              key={article.id}
              style={{ borderTop: i ? "1px solid var(--border)" : undefined }}
            >
              <Link
                href={`/articles/${article.id}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: ".75rem 1.25rem",
                  textDecoration: "none",
                }}
              >
                <span>{article.title}</span>
                <span
                  style={{
                    fontSize: ".75rem",
                    color: SUBJECT_COLOR[article.subject] ?? "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  {article.subjectLabel}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="stats"
        title="学習状況"
        more={{ href: "/progress", label: "詳しく見る" }}
      >
        <StatsSection totals={totals} />
      </Section>
    </>
  )
}

export default Page
