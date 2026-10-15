"use client"

import type { FC } from "react"
import Link from "next/link"
import { XP_CORRECT, XP_WRONG, type QuestTotals } from "lib/stats"
import { getAllAreas, getQuestById } from "lib/quests"
import {
  LevelBar,
  QuestList,
  SubjectBars,
  useLearning,
} from "components/Dashboard"

const h2 = { fontSize: "1.0625rem", fontWeight: 700, marginBottom: ".75rem" }

export const ProgressClient: FC<{ totals: QuestTotals }> = ({ totals }) => {
  const data = useLearning(totals)
  if (!data) return null
  const { stats } = data

  if (stats.totalAnswers === 0)
    return (
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>学習状況</h1>
        <div
          className="card"
          style={{ textAlign: "center", padding: "3rem 1rem" }}
        >
          <p aria-hidden style={{ fontSize: "2rem" }}>
            📖
          </p>
          <p className="muted" style={{ margin: "1rem 0 1.5rem" }}>
            まだ問題を解いていません。解答すると攻略率・正答率がここに表示されます。
          </p>
          <Link href="/quests" className="btn btn-primary">
            クエストを始める →
          </Link>
        </div>
      </div>
    )

  const allTotal = Object.values(totals).reduce((s, n) => s + n, 0)
  const attempted = Object.values(stats.quests).reduce(
    (s, q) => s + q.attempted,
    0
  )
  const areaStats = new Map(stats.areas.map((a) => [a.areaId, a]))

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h1 style={{ fontSize: "1.5rem" }}>学習状況</h1>

      <section
        className="card"
        style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
      >
        <LevelBar stats={stats} />
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              label: "学習済みの割合",
              value: `${Math.round((attempted / allTotal) * 100)}%`,
              note: `解いた問題 ${attempted}/${allTotal}問`,
            },
            {
              label: "正答率",
              value: `${stats.accuracyRate}%`,
              note: `${stats.totalCorrect}/${stats.totalAnswers}回 正解`,
            },
            {
              label: "総解答数",
              value: `${stats.totalAnswers}回`,
              note: "解き直しを含む",
            },
            {
              label: "再挑戦待ち",
              value: `${data.wrongCount}問`,
              note: "間違えた問題",
            },
          ].map((s) => (
            <div key={s.label}>
              <dt style={{ fontSize: ".8125rem", color: "var(--text-2)" }}>
                {s.label}
              </dt>
              <dd style={{ fontSize: "1.5rem", fontWeight: 700 }}>{s.value}</dd>
              <dd style={{ fontSize: ".75rem", color: "var(--text-2)" }}>
                {s.note}
              </dd>
            </div>
          ))}
        </dl>
        <p style={{ fontSize: ".75rem", color: "var(--text-2)" }}>
          攻略率＝一度以上解いた問題の割合／正答率＝全解答のうち正解した割合／経験値＝正解{" "}
          {XP_CORRECT}XP・不正解 {XP_WRONG}XP
        </p>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          <Link
            href="/retry"
            className="btn btn-primary"
            aria-disabled={!data.wrongCount || undefined}
          >
            間違えた問題に再挑戦
          </Link>
          <Link href="/wrong" className="btn btn-secondary">
            間違えた問題の一覧
          </Link>
        </div>
      </section>

      <section>
        <h2 style={h2}>科目別の攻略率・正答率</h2>
        <div className="card">
          <SubjectBars stats={stats} />
        </div>
      </section>

      <section>
        <h2 style={h2}>苦手分野</h2>
        <div className="card">
          {stats.weakAreas.length === 0 ? (
            <p className="muted">
              3問以上解答し正答率70%未満の分野はありません。
            </p>
          ) : (
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: ".625rem",
              }}
            >
              {stats.weakAreas.map((a) => (
                <li
                  key={a.areaId}
                  style={{
                    display: "flex",
                    gap: ".75rem",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span className="badge badge-error">✗ {a.accuracyRate}%</span>
                  <span style={{ flex: 1 }}>
                    {getAllAreas().find((x) => x.id === a.areaId)?.title ??
                      a.areaId}
                  </span>
                  <Link
                    href={`/challenge/${a.questId}`}
                    className="section-link"
                  >
                    演習する →
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section>
        <h2 style={h2}>分野別の正答率</h2>
        <div className="card" style={{ padding: 0, overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: ".875rem",
            }}
          >
            <thead>
              <tr style={{ color: "var(--text-2)", textAlign: "left" }}>
                <th style={{ padding: ".75rem 1.25rem", fontWeight: 600 }}>
                  分野
                </th>
                <th
                  style={{
                    padding: ".75rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  解答数
                </th>
                <th
                  style={{
                    padding: ".75rem 1.25rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  正答率
                </th>
              </tr>
            </thead>
            <tbody>
              {getAllAreas().map((area) => {
                const a = areaStats.get(area.id)
                return (
                  <tr
                    key={area.id}
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <td style={{ padding: ".625rem 1.25rem" }}>
                      <Link
                        href={`/quests/${area.questId}`}
                        style={{ textDecoration: "none" }}
                      >
                        {area.title}
                      </Link>
                      <span
                        style={{
                          fontSize: ".75rem",
                          color: "var(--text-2)",
                          marginLeft: ".5rem",
                        }}
                      >
                        {getQuestById(area.questId)?.title}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: ".625rem .75rem",
                        color: "var(--text-2)",
                      }}
                    >
                      {a?.answers ?? 0}回
                    </td>
                    <td style={{ padding: ".625rem 1.25rem", fontWeight: 700 }}>
                      {a ? (
                        `${a.accuracyRate}%`
                      ) : (
                        <span style={{ color: "var(--text-3)" }}>未学習</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 style={h2}>クエスト達成状況</h2>
        <QuestList totals={totals} />
      </section>

      <section>
        <h2 style={h2}>最近の学習履歴</h2>
        <ol className="card" style={{ listStyle: "none", padding: ".25rem 0" }}>
          {stats.recent.map((h, i) => (
            <li
              key={`${h.questionId}-${h.answeredAt}`}
              style={{
                display: "flex",
                gap: ".75rem",
                alignItems: "center",
                flexWrap: "wrap",
                padding: ".625rem 1.25rem",
                borderTop: i ? "1px solid var(--border)" : undefined,
                fontSize: ".875rem",
              }}
            >
              <span
                className={
                  h.isCorrect ? "badge badge-success" : "badge badge-error"
                }
              >
                {h.isCorrect ? "✓ 正解" : "✗ 不正解"}
              </span>
              <Link href={`/questions/${h.questionId}`} style={{ flex: 1 }}>
                {getAllAreas().find((x) => x.id === h.areaId)?.title ??
                  h.areaId}
                の問題
              </Link>
              <span style={{ color: "var(--text-2)", fontSize: ".8125rem" }}>
                {new Date(h.answeredAt).toLocaleString("ja-JP")}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
