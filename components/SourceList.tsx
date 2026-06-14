import type { FC } from "react"
import type { QuestionSource } from "types/question"

const SOURCE_TYPE_LABEL: Record<QuestionSource["type"], string> = {
  law: "条文",
  case: "判例",
  exam: "試験",
  government: "公的資料",
  book: "書籍",
  original: "オリジナル",
}

export const SourceList: FC<{ sources: QuestionSource[] }> = ({ sources }) => (
  <div style={{ marginTop: "1rem" }}>
    <p style={{ fontSize: ".75rem", color: "#94a3b8", marginBottom: ".5rem", fontWeight: 600 }}>
      📚 SOURCE
    </p>
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".5rem" }}>
      {sources.map((src, i) => (
        <li
          key={i}
          style={{
            fontSize: ".75rem",
            padding: ".5rem .75rem",
            background: "#0f0f23",
            borderRadius: ".375rem",
            borderLeft: "3px solid #4f46e5",
          }}
        >
          <span style={{ color: "#818cf8", fontWeight: 600 }}>
            [{SOURCE_TYPE_LABEL[src.type]}]
          </span>{" "}
          <span style={{ color: "#e2e8f0" }}>{src.title}</span>
          {src.article && (
            <span style={{ color: "#94a3b8" }}> {src.article}</span>
          )}
          {src.caseName && (
            <span style={{ color: "#94a3b8" }}> {src.caseName}</span>
          )}
          {src.decisionDate && (
            <span style={{ color: "#94a3b8" }}> ({src.decisionDate})</span>
          )}
          <br />
          <span style={{ color: "#64748b" }}>
            {src.organization} · 確認日: {src.checkedAt}
          </span>
          {src.url && (
            <>
              {" "}
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#6366f1", textDecoration: "underline" }}
              >
                リンク
              </a>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
)
