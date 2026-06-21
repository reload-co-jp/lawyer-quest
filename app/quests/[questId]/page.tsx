import type { FC } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllQuests } from "lib/quests"
import { BASE_URL, buildMetadata } from "lib/seo"

export function generateStaticParams() {
  return getAllQuests().map((q) => ({ questId: q.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ questId: string }>
}): Promise<Metadata> {
  const { questId } = await params
  const quest = (
    getAllQuests() as { id: string; title: string; description: string }[]
  ).find((q) => q.id === questId)
  if (!quest) return {}
  return buildMetadata({
    title: quest.title,
    description: `行政書士試験対策 — ${quest.title}。${quest.description}`,
    path: `/quests/${quest.id}`,
  })
}

import Link from "next/link"
import type { QuestId } from "types/quest"
import { getQuestById, getAreasByQuestId } from "lib/quests"
import { getQuestionsByQuestId } from "lib/questions"

const SUBJECT_COLOR: Record<string, string> = {
  administrative_law: "var(--admin)",
  civil_law: "var(--civil)",
  constitutional_law: "var(--const)",
  past_exam: "var(--past)",
}

type Props = { params: Promise<{ questId: string }> }

const Page: FC<Props> = async ({ params }) => {
  const { questId } = await params
  const quest = getQuestById(questId as QuestId)
  if (!quest) notFound()

  const areas = getAreasByQuestId(quest.id)
  const questions = getQuestionsByQuestId(quest.id)
  const color = SUBJECT_COLOR[quest.id] ?? "var(--accent)"

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: quest.title,
      description: quest.description,
      inLanguage: "ja",
      url: `${BASE_URL}/quests/${quest.id}`,
      educationalLevel: "professional",
      teaches: quest.title,
      numberOfItems: questions.length,
      isPartOf: { "@type": "WebSite", name: "Lawyer Quest", url: BASE_URL },
      publisher: {
        "@type": "Organization",
        name: "Lawyer Quest",
        url: BASE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "クエスト一覧",
          item: `${BASE_URL}/quests`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: quest.title,
          item: `${BASE_URL}/quests/${quest.id}`,
        },
      ],
    },
  ]

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <Link
          href="/quests"
          style={{
            fontSize: ".8125rem",
            color: "var(--text-3)",
            textDecoration: "none",
          }}
        >
          クエスト
        </Link>
        <span style={{ color: "var(--text-3)", fontSize: ".8125rem" }}>/</span>
        <span style={{ fontSize: ".8125rem", color: "var(--text-2)" }}>
          {quest.title}
        </span>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            marginBottom: ".375rem",
          }}
        >
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: color,
            }}
          />
          <h1
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--text-1)",
              letterSpacing: "-.02em",
            }}
          >
            {quest.title}
          </h1>
        </div>
        <p
          style={{
            fontSize: ".875rem",
            color: "var(--text-2)",
            paddingLeft: "1.1875rem",
            marginBottom: ".5rem",
          }}
        >
          {quest.description}
        </p>
        <p
          style={{
            fontSize: ".8125rem",
            color: "var(--text-3)",
            paddingLeft: "1.1875rem",
          }}
        >
          全{questions.length}問
        </p>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{
            fontSize: ".8125rem",
            fontWeight: 600,
            color: "var(--text-3)",
            letterSpacing: ".04em",
            textTransform: "uppercase",
            marginBottom: ".75rem",
          }}
        >
          エリア
        </h2>
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            overflow: "hidden",
          }}
        >
          {areas.map((area, i) => {
            const areaQ = questions.filter((q) => q.areaId === area.id)
            return (
              <div
                key={area.id}
                style={{
                  padding: ".75rem 1rem",
                  background: "var(--surface)",
                  borderBottom:
                    i < areas.length - 1 ? "1px solid var(--border)" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: ".9375rem",
                      fontWeight: 500,
                      color: "var(--text-1)",
                    }}
                  >
                    {area.title}
                  </p>
                  {area.description && (
                    <p
                      style={{
                        margin: ".125rem 0 0",
                        fontSize: ".75rem",
                        color: "var(--text-2)",
                      }}
                    >
                      {area.description}
                    </p>
                  )}
                </div>
                <span
                  style={{
                    fontSize: ".75rem",
                    color: "var(--text-3)",
                    flexShrink: 0,
                  }}
                >
                  {areaQ.length}問
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
        <Link
          href={`/challenge/${quest.id}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: ".625rem 1.25rem",
            background: "var(--accent-btn)",
            borderRadius: "var(--radius-sm)",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: ".9375rem",
            letterSpacing: "-.01em",
          }}
        >
          チャレンジ開始 →
        </Link>
        {quest.id === "past_exam" && (
          <Link
            href="/exam"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: ".625rem 1.25rem",
              background: "transparent",
              border: "1px solid var(--past)",
              borderRadius: "var(--radius-sm)",
              color: "var(--past)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: ".9375rem",
              letterSpacing: "-.01em",
            }}
          >
            模擬試験モード →
          </Link>
        )}
      </div>
    </div>
  )
}

export default Page
