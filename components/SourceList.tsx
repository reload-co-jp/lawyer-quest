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
    <p
      style={{
        fontSize: ".6875rem",
        color: "var(--text-3)",
        marginBottom: ".5rem",
        fontWeight: 600,
        letterSpacing: ".06em",
        textTransform: "uppercase",
      }}
    >
      Source
    </p>
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "1px",
      }}
    >
      {sources.map((src, i) => (
        <li
          key={i}
          style={{
            fontSize: ".75rem",
            padding: ".5rem .75rem",
            background: "var(--surface-2)",
            borderLeft: "2px solid var(--accent)",
          }}
        >
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>
            [{SOURCE_TYPE_LABEL[src.type]}]
          </span>{" "}
          <span style={{ color: "var(--text-1)" }}>{src.title}</span>
          {src.article && (
            <span style={{ color: "var(--text-2)" }}> {src.article}</span>
          )}
          {src.caseName && (
            <span style={{ color: "var(--text-2)" }}> {src.caseName}</span>
          )}
          {src.decisionDate && (
            <span style={{ color: "var(--text-3)" }}>
              {" "}
              ({src.decisionDate})
            </span>
          )}
          <br />
          <span style={{ color: "var(--text-3)" }}>
            {src.organization} · {src.checkedAt}
          </span>
          {src.url && (
            <>
              {" · "}
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)", textDecoration: "underline" }}
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
