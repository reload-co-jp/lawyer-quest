"use client"

import { useState } from "react"
import Link from "next/link"

const NAV_LINKS = [
  { href: "/study-guide", label: "勉強ガイド" },
  { href: "/articles", label: "記事" },
  { href: "/quests", label: "クエスト" },
  { href: "/challenge/random", label: "ランダム" },
  { href: "/retry", label: "再挑戦" },
  { href: "/progress", label: "攻略率" },
]

const linkStyle = {
  padding: ".3rem .625rem",
  fontSize: ".8125rem",
  color: "var(--text-2)",
  textDecoration: "none",
  fontWeight: 500,
  letterSpacing: "-.01em",
} as const

export const HeaderNav = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* desktop nav */}
      <nav
        style={{ display: "flex", alignItems: "center", gap: ".25rem" }}
        className="header-nav-desktop"
      >
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} style={linkStyle} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
      </nav>

      {/* mobile hamburger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="header-nav-burger"
        aria-label="メニュー"
        style={{
          background: "none",
          border: "1px solid var(--border-2)",
          padding: ".3rem .5rem",
          cursor: "pointer",
          color: "var(--text-2)",
          fontSize: ".8125rem",
          lineHeight: 1,
          display: "none",
        }}
      >
        {open ? "✕" : "☰"}
      </button>

      {/* mobile dropdown */}
      {open && (
        <div
          className="header-nav-dropdown"
          style={{
            position: "fixed",
            top: "44px",
            left: 0,
            right: 0,
            background: "rgba(10,10,10,0.97)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border)",
            zIndex: 49,
            padding: ".5rem 0",
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: ".75rem 1.25rem",
                fontSize: ".9375rem",
                color: "var(--text-1)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 600px) {
          .header-nav-desktop { display: none !important; }
          .header-nav-burger { display: block !important; }
        }
      `}</style>
    </>
  )
}
