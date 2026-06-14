import type { FC } from "react"
import type { LawLink } from "types/question"

export const LawLinkList: FC<{ lawLinks: LawLink[] }> = ({ lawLinks }) => (
  <div style={{ marginTop: ".75rem" }}>
    <p style={{ fontSize: ".6875rem", color: "var(--text-3)", marginBottom: ".5rem", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>
      Law Link
    </p>
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1px" }}>
      {lawLinks.map((link, i) => (
        <li
          key={i}
          style={{
            fontSize: ".75rem",
            padding: ".5rem .75rem",
            background: "var(--surface-2)",
            borderLeft: "2px solid var(--border-2)",
          }}
        >
          {link.url ? (
            <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-1)", textDecoration: "underline" }}>
              {link.title}
            </a>
          ) : (
            <span style={{ color: "var(--text-1)" }}>{link.title}</span>
          )}
          {link.description && (
            <span style={{ color: "var(--text-3)", display: "block", marginTop: ".125rem" }}>
              {link.description}
            </span>
          )}
        </li>
      ))}
    </ul>
  </div>
)
