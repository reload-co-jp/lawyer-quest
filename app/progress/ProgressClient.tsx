"use client"

import { FC, useEffect, useState } from "react"
import Link from "next/link"
import type { UserProgress } from "types/progress"
import { getUserProgress } from "lib/storage"
import { ProgressSummary } from "components/ProgressSummary"

export const ProgressClient: FC = () => {
  const [progress, setProgress] = useState<UserProgress | null | undefined>(
    undefined
  )

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage読込はクライアント専用、初回マウント後のみ実行
    setProgress(getUserProgress())
  }, [])

  if (progress === undefined) return null

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--text-1)",
            letterSpacing: "-.02em",
          }}
        >
          攻略率・進捗
        </h1>
        <Link
          href="/wrong"
          style={{
            fontSize: ".8125rem",
            color: "var(--text-2)",
            textDecoration: "none",
          }}
        >
          間違い一覧 →
        </Link>
      </div>

      {progress === null ? (
        <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>📖</p>
          <p
            style={{
              color: "var(--text-2)",
              marginBottom: "2rem",
              fontSize: ".9375rem",
            }}
          >
            まだ問題を解いていません
          </p>
          <Link
            href="/quests"
            style={{
              padding: ".5rem 1.125rem",
              background: "var(--accent-btn)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: ".875rem",
            }}
          >
            クエストを始める →
          </Link>
        </div>
      ) : (
        <ProgressSummary progress={progress} />
      )}
    </div>
  )
}
