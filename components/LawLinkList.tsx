import type { FC } from "react"
import type { LawLink } from "types/question"

const LINK_TYPE_ICON: Record<LawLink["type"], string> = {
  law: "⚖️",
  case: "🏛️",
  exam: "📝",
}

export const LawLinkList: FC<{ lawLinks: LawLink[] }> = ({ lawLinks }) => (
  <div style={{ marginTop: "1rem" }}>
    <p style={{ fontSize: ".75rem", color: "#94a3b8", marginBottom: ".5rem", fontWeight: 600 }}>
      🔗 LAW LINK
    </p>
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".375rem" }}>
      {lawLinks.map((link, i) => (
        <li
          key={i}
          style={{
            fontSize: ".75rem",
            padding: ".5rem .75rem",
            background: "#0f0f23",
            borderRadius: ".375rem",
            borderLeft: "3px solid #0891b2",
          }}
        >
          <span style={{ marginRight: ".25rem" }}>{LINK_TYPE_ICON[link.type]}</span>
          {link.url ? (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#38bdf8", textDecoration: "underline" }}
            >
              {link.title}
            </a>
          ) : (
            <span style={{ color: "#e2e8f0" }}>{link.title}</span>
          )}
          {link.description && (
            <span style={{ color: "#64748b", display: "block", marginTop: ".125rem" }}>
              {link.description}
            </span>
          )}
        </li>
      ))}
    </ul>
  </div>
)
