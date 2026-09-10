"use client"

import { useMemo, useState, type FC } from "react"
import Link from "next/link"
import type { SearchItem, SearchItemType } from "types/search"

const TYPE_LABEL: Record<SearchItemType, string> = {
  glossary: "用語",
  article: "記事",
  question: "問題",
}

const TYPE_COLOR: Record<SearchItemType, string> = {
  glossary: "var(--admin)",
  article: "var(--const)",
  question: "var(--civil)",
}

function scoreItem(item: SearchItem, terms: string[]): number {
  const title = item.title.toLowerCase()
  const subtitle = (item.subtitle ?? "").toLowerCase()
  const text = item.text.toLowerCase()
  let score = 0
  for (const term of terms) {
    if (!term) continue
    if (title.includes(term)) score += 5
    if (subtitle.includes(term)) score += 2
    if (text.includes(term)) score += 1
    if (score === 0) return -1
  }
  return score
}

function extractSnippet(text: string, terms: string[], max = 90): string {
  const lower = text.toLowerCase()
  const hitIndex = terms
    .map((t) => (t ? lower.indexOf(t) : -1))
    .find((i) => i >= 0)
  const start = hitIndex && hitIndex > 20 ? hitIndex - 20 : 0
  const snippet = text.slice(start, start + max)
  return (start > 0 ? "…" : "") + snippet + (start + max < text.length ? "…" : "")
}

export const SearchClient: FC<{ index: SearchItem[] }> = ({ index }) => {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return []
    return index
      .map((item) => ({ item, score: scoreItem(item, terms) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 50)
      .map(({ item }) => ({ item, terms }))
  }, [query, index])

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="用語・条文・問題を検索…"
        style={{
          width: "100%",
          padding: ".75rem .875rem",
          fontSize: ".9375rem",
          background: "var(--surface)",
          border: "1px solid var(--border-2)",
          borderRadius: "var(--radius-sm)",
          color: "var(--text-1)",
          marginBottom: "1.5rem",
        }}
      />

      {query.trim() === "" && (
        <p style={{ fontSize: ".8125rem", color: "var(--text-3)" }}>
          用語集・記事・演習問題を横断検索する。
        </p>
      )}

      {query.trim() !== "" && results.length === 0 && (
        <p style={{ fontSize: ".8125rem", color: "var(--text-3)" }}>
          「{query}」に一致する結果なし。
        </p>
      )}

      {results.length > 0 && (
        <>
          <p style={{ fontSize: ".75rem", color: "var(--text-3)", marginBottom: ".875rem" }}>
            {results.length}件
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
            {results.map(({ item, terms }) => (
              <Link
                key={item.id}
                href={item.url}
                style={{
                  display: "block",
                  padding: ".875rem 1rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderLeft: `2px solid ${TYPE_COLOR[item.type]}`,
                  textDecoration: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".375rem" }}>
                  <span
                    style={{
                      fontSize: ".6875rem",
                      fontWeight: 600,
                      color: TYPE_COLOR[item.type],
                      letterSpacing: ".04em",
                    }}
                  >
                    {TYPE_LABEL[item.type]}
                  </span>
                  {item.subtitle && (
                    <span style={{ fontSize: ".75rem", color: "var(--text-3)" }}>
                      {item.subtitle}
                    </span>
                  )}
                </div>
                <h3
                  style={{
                    fontSize: ".9375rem",
                    fontWeight: 600,
                    color: "var(--text-1)",
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: ".8125rem",
                    color: "var(--text-2)",
                    margin: ".375rem 0 0",
                    lineHeight: 1.65,
                  }}
                >
                  {extractSnippet(item.text, terms)}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
