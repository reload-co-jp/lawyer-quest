"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const PRIMARY_LINKS = [
  { href: "/quests", label: "クエスト" },
  { href: "/articles", label: "学習記事" },
  { href: "/glossary", label: "用語集" },
  { href: "/bookmarks", label: "栞" },
  { href: "/progress", label: "学習状況" },
]

const MORE_LINKS = [
  { href: "/challenge/random", label: "ランダム演習" },
  { href: "/mock-exam", label: "模擬テスト" },
  { href: "/retry", label: "再挑戦" },
  { href: "/wrong", label: "間違えた問題" },
  { href: "/basics", label: "ゼロから入門" },
  { href: "/study-guide", label: "勉強ガイド" },
  { href: "/exam-guide", label: "試験ガイド" },
  { href: "/general-knowledge", label: "基礎知識科目" },
]

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`)

export const HeaderNav = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const moreRef = useRef<HTMLDetailsElement>(null)

  // close menus on navigation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- ページ遷移時にメニューを閉じる
    setOpen(false)
    moreRef.current?.removeAttribute("open")
  }, [pathname])

  const link = (href: string, label: string, className: string) => (
    <Link
      key={href}
      href={href}
      className={className}
      aria-current={isActive(pathname, href) ? "page" : undefined}
    >
      {label}
    </Link>
  )

  return (
    <>
      <nav className="nav-desktop" aria-label="メインメニュー">
        <Link
          href="/search"
          className="nav-search"
          aria-current={isActive(pathname, "/search") ? "page" : undefined}
        >
          <span aria-hidden>⌕</span> 検索
        </Link>
        {PRIMARY_LINKS.map(({ href, label }) => link(href, label, "nav-link"))}
        <details className="nav-more" ref={moreRef}>
          <summary className="nav-link">その他 ▾</summary>
          <div className="nav-more-menu">
            {MORE_LINKS.map(({ href, label }) =>
              link(href, label, "nav-menu-link")
            )}
          </div>
        </details>
      </nav>

      <div className="nav-mobile">
        <Link href="/search" className="nav-icon-btn" aria-label="検索">
          ⌕
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="nav-icon-btn"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="nav-drawer" aria-label="メニュー">
          <p className="nav-drawer-label">メイン</p>
          {PRIMARY_LINKS.map(({ href, label }) =>
            link(href, label, "nav-menu-link")
          )}
          <p className="nav-drawer-label">演習・ガイド</p>
          {MORE_LINKS.map(({ href, label }) =>
            link(href, label, "nav-menu-link")
          )}
        </nav>
      )}
    </>
  )
}
