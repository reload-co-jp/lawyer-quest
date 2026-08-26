"use client"

import { FC, useEffect, useState } from "react"
import type { BookmarkType } from "types/progress"
import { isBookmarked, toggleBookmark } from "lib/storage"

type Props = {
  type: BookmarkType
  id: string
  title: string
  path: string
}

export const BookmarkButton: FC<Props> = ({ type, id, title, path }) => {
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage読込はクライアント専用、初回マウント後のみ実行
    setBookmarked(isBookmarked(type, id))
  }, [type, id])

  const handleClick = () => {
    setBookmarked(toggleBookmark({ type, id, title, path }))
  }

  return (
    <button
      onClick={handleClick}
      aria-pressed={bookmarked}
      aria-label={bookmarked ? "栞を外す" : "栞を挟む"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: ".25rem",
        padding: ".3rem .625rem",
        background: bookmarked ? "rgba(250,204,21,0.1)" : "transparent",
        border: `1px solid ${bookmarked ? "var(--warning)" : "var(--border-2)"}`,
        color: bookmarked ? "var(--warning)" : "var(--text-2)",
        fontSize: ".75rem",
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      <span>{bookmarked ? "★" : "☆"}</span>
      <span>{bookmarked ? "栞あり" : "栞を挟む"}</span>
    </button>
  )
}
