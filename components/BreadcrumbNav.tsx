import type { FC } from "react"
import Link from "next/link"
import type { BreadcrumbItem } from "lib/seo"

export const BreadcrumbNav: FC<{ items: BreadcrumbItem[] }> = ({ items }) => (
  <div
    style={{
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: ".5rem",
      flexWrap: "wrap",
    }}
  >
    {items.map((item, index) => {
      const isLast = index === items.length - 1
      return (
        <span
          key={item.path}
          style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
        >
          {index > 0 && (
            <span style={{ color: "var(--text-3)", fontSize: ".8125rem" }}>
              /
            </span>
          )}
          {isLast ? (
            <span style={{ fontSize: ".8125rem", color: "var(--text-2)" }}>
              {item.name}
            </span>
          ) : (
            <Link
              href={item.path}
              style={{
                fontSize: ".8125rem",
                color: "var(--text-3)",
                textDecoration: "none",
              }}
            >
              {item.name}
            </Link>
          )}
        </span>
      )
    })}
  </div>
)
