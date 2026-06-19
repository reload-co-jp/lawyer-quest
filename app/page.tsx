import type { FC } from "react"
import Link from "next/link"
import { getAllQuests } from "lib/quests"
import { getAllArticles } from "lib/articles"

const SUBJECT_VAR: Record<string, string> = {
  administrative_law: "var(--admin)",
  civil_law: "var(--civil)",
  constitutional_law: "var(--const)",
  past_exam: "var(--past)",
}

const Page: FC = () => {
  const quests = getAllQuests()
  const articles = getAllArticles().slice(0, 6)

  return (
    <>
      <div
        className="hero-pixel"
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          marginTop: "-2rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "3.5rem 3rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-pixel)",
              fontSize: ".8125rem",
              letterSpacing: ".05em",
              color: "var(--bg)",
              background: "var(--accent)",
              padding: ".4rem .8rem",
              marginBottom: "1.5rem",
            }}
          >
            LV.1 — 行政書士試験対策
          </span>
          <h1
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "clamp(1.5rem, 5vw, 3rem)",
              color: "var(--text-1)",
              letterSpacing: ".02em",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}
          >
            法律を、冒険のように攻略する。
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-2)",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
              maxWidth: "640px",
            }}
          >
            行政法・民法・憲法の要点を問題演習で定着させる学習サイト。
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/quests"
              className="pixel-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: ".5rem",
                padding: ".875rem 1.75rem",
                background: "var(--accent-btn)",
                border: "2px solid var(--text-1)",
                color: "#fff",
                textDecoration: "none",
                fontFamily: "var(--font-pixel)",
                fontSize: "1rem",
              }}
            >
              ▶ クエストを開始
            </Link>
            <Link
              href="/articles"
              className="pixel-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: ".5rem",
                padding: ".875rem 1.75rem",
                background: "var(--surface)",
                border: "2px solid var(--border-2)",
                color: "var(--text-2)",
                textDecoration: "none",
                fontFamily: "var(--font-pixel)",
                fontSize: "1rem",
              }}
            >
              ▶ 学習記事を読む
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: ".75rem",
            }}
          >
            <p
              style={{
                fontSize: ".6875rem",
                color: "var(--text-3)",
                fontWeight: 600,
                letterSpacing: ".06em",
                textTransform: "uppercase",
              }}
            >
              学習記事
            </p>
            <Link
              href="/articles"
              style={{
                fontSize: ".75rem",
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              すべて見る →
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              border: "1px solid var(--border)",
            }}
          >
            {articles.map((article) => {
              const color = SUBJECT_VAR[article.subject] ?? "var(--accent)"
              return (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: ".625rem .875rem",
                    background: "var(--surface)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".625rem",
                    }}
                  >
                    <div
                      style={{
                        width: "5px",
                        height: "5px",
                        background: color,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{ fontSize: ".875rem", color: "var(--text-1)" }}
                    >
                      {article.title}
                    </span>
                  </div>
                  <span
                    style={{ fontSize: ".75rem", color: color, flexShrink: 0 }}
                  >
                    {article.subjectLabel}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <p
            style={{
              fontSize: ".6875rem",
              color: "var(--text-3)",
              fontWeight: 600,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              marginBottom: ".75rem",
            }}
          >
            演習
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}
          >
            {quests.map((quest) => {
              const color = SUBJECT_VAR[quest.id] ?? "var(--accent)"
              return (
                <Link
                  key={quest.id}
                  href={`/challenge/${quest.id}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: ".875rem 1rem",
                    background: "var(--surface)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: color,
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 600,
                          fontSize: ".9375rem",
                          color: "var(--text-1)",
                        }}
                      >
                        {quest.title}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: ".8125rem",
                          color: "var(--text-2)",
                        }}
                      >
                        {quest.description}
                      </p>
                    </div>
                  </div>
                  <span style={{ color: "var(--text-3)", fontSize: ".875rem" }}>
                    →
                  </span>
                </Link>
              )
            })}

            <Link
              href="/challenge/random"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: ".875rem 1rem",
                background: "var(--surface)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: ".75rem" }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--warning)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      fontSize: ".9375rem",
                      color: "var(--text-1)",
                    }}
                  >
                    ランダムチャレンジ
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: ".8125rem",
                      color: "var(--text-2)",
                    }}
                  >
                    全クエストからランダム10問
                  </p>
                </div>
              </div>
              <span style={{ color: "var(--text-3)", fontSize: ".875rem" }}>
                →
              </span>
            </Link>

            <Link
              href="/retry"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: ".875rem 1rem",
                background: "var(--surface)",
                textDecoration: "none",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: ".75rem" }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--error)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      fontSize: ".9375rem",
                      color: "var(--text-1)",
                    }}
                  >
                    再挑戦クエスト
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: ".8125rem",
                      color: "var(--text-2)",
                    }}
                  >
                    間違えた問題をもう一度解く
                  </p>
                </div>
              </div>
              <span style={{ color: "var(--text-3)", fontSize: ".875rem" }}>
                →
              </span>
            </Link>
          </div>
        </div>

        <div>
          <p
            style={{
              fontSize: ".6875rem",
              color: "var(--text-3)",
              fontWeight: 600,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              marginBottom: ".75rem",
            }}
          >
            学習ガイド
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}
          >
            <Link
              href="/basics"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: ".875rem 1rem",
                background: "var(--surface)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: ".75rem" }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      fontSize: ".9375rem",
                      color: "var(--text-1)",
                    }}
                  >
                    法律ゼロから入門
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: ".8125rem",
                      color: "var(--text-2)",
                    }}
                  >
                    条文の読み方・法律用語をやさしく解説
                  </p>
                </div>
              </div>
              <span style={{ color: "var(--text-3)", fontSize: ".875rem" }}>
                →
              </span>
            </Link>

            <Link
              href="/study-guide"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: ".875rem 1rem",
                background: "var(--surface)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: ".75rem" }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      fontSize: ".9375rem",
                      color: "var(--text-1)",
                    }}
                  >
                    法律初心者向け勉強ガイド
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: ".8125rem",
                      color: "var(--text-2)",
                    }}
                  >
                    勉強する範囲・意義・難易度を解説
                  </p>
                </div>
              </div>
              <span style={{ color: "var(--text-3)", fontSize: ".875rem" }}>
                →
              </span>
            </Link>

            <Link
              href="/exam-guide"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: ".875rem 1rem",
                background: "var(--surface)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: ".75rem" }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--text-3)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      fontSize: ".9375rem",
                      color: "var(--text-1)",
                    }}
                  >
                    試験ガイド
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: ".8125rem",
                      color: "var(--text-2)",
                    }}
                  >
                    試験概要・科目・合格基準・申込み方法
                  </p>
                </div>
              </div>
              <span style={{ color: "var(--text-3)", fontSize: ".875rem" }}>
                →
              </span>
            </Link>

            <Link
              href="/general-knowledge"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: ".875rem 1rem",
                background: "var(--surface)",
                textDecoration: "none",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: ".75rem" }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--past)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      fontSize: ".9375rem",
                      color: "var(--text-1)",
                    }}
                  >
                    基礎知識科目 対策ガイド
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: ".8125rem",
                      color: "var(--text-2)",
                    }}
                  >
                    足切り基準・分野別の対策方法を解説
                  </p>
                </div>
              </div>
              <span style={{ color: "var(--text-3)", fontSize: ".875rem" }}>
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
