import type { Metadata } from "next"
import { buildSearchIndex } from "lib/search"
import { buildBreadcrumbJsonLd, buildMetadata } from "lib/seo"
import { BreadcrumbNav } from "components/BreadcrumbNav"
import { SearchClient } from "components/SearchClient"

export const metadata: Metadata = buildMetadata({
  title: "検索",
  description: "行政書士試験対策の用語集・記事・演習問題を横断検索する。",
  path: "/search",
})

const breadcrumbItems = [
  { name: "ホーム", path: "/" },
  { name: "検索", path: "/search" },
]

export default function SearchPage() {
  const index = buildSearchIndex()
  const jsonLd = buildBreadcrumbJsonLd(breadcrumbItems)

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "1.5rem 1rem 3rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BreadcrumbNav items={breadcrumbItems} />

      <div style={{ marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontSize: "1.375rem",
            fontWeight: 700,
            color: "var(--text-1)",
            letterSpacing: "-.02em",
            marginBottom: ".375rem",
          }}
        >
          検索
        </h1>
        <p style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.65 }}>
          用語集・記事・演習問題をまとめて検索する。
        </p>
      </div>

      <SearchClient index={index} />
    </div>
  )
}
