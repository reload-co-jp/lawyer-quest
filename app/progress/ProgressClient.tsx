"use client"

import { FC, useEffect, useState } from "react"
import Link from "next/link"
import type { UserProgress } from "types/progress"
import { getUserProgress } from "lib/storage"
import { ProgressSummary } from "components/ProgressSummary"

export const ProgressClient: FC = () => {
  const [progress, setProgress] = useState<UserProgress | null | undefined>(undefined)

  useEffect(() => {
    setProgress(getUserProgress())
  }, [])

  if (progress === undefined) return null

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e2e8f0", margin: 0 }}>
          攻略率・進捗
        </h1>
        <Link
          href="/wrong"
          style={{ fontSize: ".875rem", color: "#94a3b8", textDecoration: "none" }}
        >
          間違い一覧 →
        </Link>
      </div>

      {progress === null ? (
        <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>📖</p>
          <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>まだ問題を解いていません</p>
          <Link
            href="/quests"
            style={{
              padding: ".875rem 2rem",
              background: "#4f46e5",
              borderRadius: ".75rem",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            クエストを始める
          </Link>
        </div>
      ) : (
        <ProgressSummary progress={progress} />
      )}
    </div>
  )
}
