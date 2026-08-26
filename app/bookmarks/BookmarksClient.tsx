"use client"

import { FC, useEffect, useState } from "react"
import Link from "next/link"
import type { Bookmark, BookmarkType } from "types/progress"
import { getBookmarks, removeBookmark } from "lib/storage"

const TYPE_LABEL: Record<BookmarkType, string> = {
  glossary: "用語集",
  article: "記事",
  quest: "クエスト",
  question: "問題",
}

export const BookmarksClient: FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage読込はクライアント専用、初回マウント後のみ実行
    setBookmarks(
      getBookmarks().sort(
        (a, b) =>
          new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime()
      )
    )
  }, [])

  const handleRemove = (type: BookmarkType, id: string) => {
    removeBookmark(type, id)
    setBookmarks((prev) => prev.filter((b) => !(b.type === type && b.id === id)))
  }

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "var(--text-1)",
          letterSpacing: "-.02em",
          marginBottom: "1.5rem",
        }}
      >
        栞をつけたページ
      </h1>

      {bookmarks.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔖</p>
          <p style={{ color: "var(--text-2)", fontSize: ".9375rem" }}>
            栞をつけたページはありません
          </p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
          {bookmarks.map((bookmark, i) => (
            <div
              key={`${bookmark.type}-${bookmark.id}`}
              style={{
                padding: ".875rem 1rem",
                background: "var(--surface)",
                borderBottom:
                  i < bookmarks.length - 1 ? "1px solid var(--border)" : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <span
                  style={{
                    fontSize: ".6875rem",
                    padding: ".15rem .5rem",
                    background: "var(--surface-2)",
                    color: "var(--text-2)",
                    border: "1px solid var(--border)",
                    fontWeight: 600,
                    marginBottom: ".375rem",
                    display: "inline-block",
                  }}
                >
                  {TYPE_LABEL[bookmark.type]}
                </span>
                <p
                  style={{
                    margin: ".375rem 0 0",
                    fontSize: ".875rem",
                    color: "var(--text-1)",
                    lineHeight: 1.5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {bookmark.title}
                </p>
              </div>
              <div style={{ display: "flex", gap: ".375rem", flexShrink: 0 }}>
                <Link
                  href={bookmark.path}
                  style={{
                    padding: ".3rem .625rem",
                    background: "transparent",
                    border: "1px solid var(--border-2)",
                    color: "var(--text-2)",
                    fontSize: ".75rem",
                    textDecoration: "none",
                  }}
                >
                  開く
                </Link>
                <button
                  onClick={() => handleRemove(bookmark.type, bookmark.id)}
                  style={{
                    padding: ".3rem .625rem",
                    background: "transparent",
                    border: "1px solid rgba(248,113,113,0.3)",
                    color: "var(--error)",
                    fontSize: ".75rem",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  外す
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
