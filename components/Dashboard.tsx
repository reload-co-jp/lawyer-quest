"use client"

import { FC, useEffect, useState } from "react"
import Link from "next/link"
import type { QuestId } from "types/quest"
import { getAllQuests, getAreaById, getQuestById } from "lib/quests"
import { getAnswerHistory, getBookmarks, getWrongQuestions } from "lib/storage"
import { buildLearningStats, LearningStats, QuestTotals } from "lib/stats"
import { QuestCard } from "components/QuestCard"

export const SUBJECT_COLOR: Record<string, string> = {
  administrative_law: "var(--admin)",
  civil_law: "var(--civil)",
  constitutional_law: "var(--const)",
  past_exam: "var(--past)",
}

type Learning = {
  stats: LearningStats
  wrongCount: number
  bookmarkCount: number
  todayAnswers: number
}

export const useLearning = (totals: QuestTotals): Learning | null => {
  const [data, setData] = useState<Learning | null>(null)
  useEffect(() => {
    const history = getAnswerHistory()
    const today = new Date().toDateString()
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage読込はクライアント専用、初回マウント後のみ実行
    setData({
      stats: buildLearningStats(history, totals),
      wrongCount: getWrongQuestions().length,
      bookmarkCount: getBookmarks().length,
      todayAnswers: history.filter(
        (h) => new Date(h.answeredAt).toDateString() === today
      ).length,
    })
  }, [totals])
  return data
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

export const LevelBar: FC<{ stats: LearningStats }> = ({ stats }) => (
  <div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: ".375rem",
      }}
    >
      <span className="pixel" style={{ color: "var(--warning)" }}>
        LV.{stats.level}
      </span>
      <span style={{ fontSize: ".8125rem", color: "var(--text-2)" }}>
        次のレベルまで {stats.xpPerLevel - stats.xpIntoLevel} XP
      </span>
    </div>
    <div
      className="bar"
      role="progressbar"
      aria-label="経験値"
      aria-valuemin={0}
      aria-valuemax={stats.xpPerLevel}
      aria-valuenow={stats.xpIntoLevel}
    >
      <span
        style={{
          width: `${(stats.xpIntoLevel / stats.xpPerLevel) * 100}%`,
          background: "var(--warning)",
        }}
      />
    </div>
  </div>
)

/* ---------- 4.1 今日の学習 ---------- */

export const TodaySection: FC<{ totals: QuestTotals }> = ({ totals }) => {
  const data = useLearning(totals)
  const last = data?.stats.last
  const quest = last ? getQuestById(last.questId) : undefined
  const area = last ? getAreaById(last.areaId) : undefined
  const qs = last ? data.stats.quests[last.questId] : undefined

  return (
    <section
      className="card hero-pixel"
      aria-labelledby="today-title"
      style={{ padding: "clamp(1.25rem, 4vw, 2rem)", marginBottom: "2.5rem" }}
    >
      <p
        className="pixel"
        style={{ fontSize: ".8125rem", color: "var(--accent)" }}
      >
        TODAY&apos;S QUEST
      </p>
      <h1
        id="today-title"
        style={{
          fontSize: "clamp(1.375rem, 4vw, 1.875rem)",
          margin: ".375rem 0 1rem",
          lineHeight: 1.4,
        }}
      >
        今日の学習を始める
      </h1>

      {data && last && quest ? (
        <div
          style={{
            display: "grid",
            gap: "1.25rem",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          }}
        >
          <div>
            <p style={{ fontSize: ".8125rem", color: "var(--text-2)" }}>
              前回の学習（{formatDate(last.answeredAt)}）
            </p>
            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                margin: ".25rem 0",
              }}
            >
              {quest.title}
            </p>
            {area && (
              <p className="muted" style={{ fontSize: ".9375rem" }}>
                {area.title}
              </p>
            )}
            {qs && (
              <div style={{ marginTop: ".875rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: ".8125rem",
                    color: "var(--text-2)",
                    marginBottom: ".375rem",
                  }}
                >
                  <span>攻略率</span>
                  <span>
                    {qs.attempted} / {qs.total}問（{qs.completionRate}%）
                  </span>
                </div>
                <div className="bar">
                  <span
                    style={{
                      width: `${qs.completionRate}%`,
                      background: SUBJECT_COLOR[last.questId],
                    }}
                  />
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: ".625rem",
                flexWrap: "wrap",
                marginTop: "1.25rem",
              }}
            >
              <Link
                href={`/challenge/${last.questId}?resume=1`}
                className="btn btn-primary"
              >
                ▶ 続きから再開
              </Link>
              <Link href="/challenge/random" className="btn btn-secondary">
                ランダム10問
              </Link>
            </div>
          </div>
          <div
            style={{
              background: "var(--surface-2)",
              borderRadius: "var(--radius)",
              padding: "1rem 1.125rem",
              display: "flex",
              flexDirection: "column",
              gap: ".875rem",
            }}
          >
            <LevelBar stats={data.stats} />
            <dl
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: ".75rem",
              }}
            >
              <div>
                <dt style={{ fontSize: ".75rem", color: "var(--text-2)" }}>
                  今日の解答数
                </dt>
                <dd style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  {data.todayAnswers}問
                </dd>
              </div>
              <div>
                <dt style={{ fontSize: ".75rem", color: "var(--text-2)" }}>
                  再挑戦待ち
                </dt>
                <dd
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: data.wrongCount ? "var(--error)" : undefined,
                  }}
                >
                  {data.wrongCount}問
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <div>
          <p className="muted" style={{ maxWidth: "36rem", lineHeight: 1.8 }}>
            行政法・民法・憲法の要点を、クエスト形式の問題演習で定着させましょう。まずは科目を選ぶか、法律の基礎から始められます。
          </p>
          <div
            style={{
              display: "flex",
              gap: ".625rem",
              flexWrap: "wrap",
              marginTop: "1.25rem",
            }}
          >
            <Link href="#quests" className="btn btn-primary">
              ▶ クエストを選ぶ
            </Link>
            <Link href="/basics" className="btn btn-secondary">
              法律ゼロから入門
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

/* ---------- 4.2 クエスト一覧 ---------- */

export const QuestList: FC<{ totals: QuestTotals }> = ({ totals }) => {
  const data = useLearning(totals)
  return (
    <div className="grid">
      {getAllQuests().map((quest) => (
        <QuestCard
          key={quest.id}
          quest={quest}
          total={totals[quest.id] ?? 0}
          learning={data?.stats.quests[quest.id]}
        />
      ))}
    </div>
  )
}

/* ---------- 4.3 復習・再挑戦 ---------- */

const ReviewCard: FC<{
  href: string
  title: string
  value: string
  note: string
  tone?: "error" | "warning"
}> = ({ href, title, value, note, tone }) => (
  <Link href={href} className="card">
    <p style={{ fontSize: ".875rem", color: "var(--text-2)" }}>{title}</p>
    <p
      style={{
        fontSize: "1.5rem",
        fontWeight: 700,
        margin: ".125rem 0",
        color: tone ? `var(--${tone})` : "var(--text-1)",
      }}
    >
      {value}
    </p>
    <p style={{ fontSize: ".8125rem", color: "var(--text-2)" }}>{note} →</p>
  </Link>
)

export const ReviewSection: FC<{ totals: QuestTotals }> = ({ totals }) => {
  const data = useLearning(totals)
  if (!data) return <div className="grid" style={{ minHeight: "7rem" }} />
  const weak = data.stats.weakAreas.slice(0, 3)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".875rem" }}>
      <div className="grid">
        <ReviewCard
          href="/retry"
          title="再挑戦"
          value={`${data.wrongCount}問`}
          note={
            data.wrongCount
              ? "間違えた問題をもう一度解く"
              : "間違えた問題はありません"
          }
          tone={data.wrongCount ? "error" : undefined}
        />
        <ReviewCard
          href="/wrong"
          title="間違えた問題"
          value={`${data.wrongCount}問`}
          note="一覧と解説を確認"
        />
        <ReviewCard
          href="/bookmarks"
          title="栞に保存した項目"
          value={`${data.bookmarkCount}件`}
          note="栞を開く"
          tone={data.bookmarkCount ? "warning" : undefined}
        />
      </div>
      <div className="card">
        <p
          style={{
            fontSize: ".875rem",
            color: "var(--text-2)",
            marginBottom: ".625rem",
          }}
        >
          復習が必要な分野（3問以上解答・正答率70%未満）
        </p>
        {weak.length === 0 ? (
          <p className="muted" style={{ fontSize: ".9375rem" }}>
            {data.stats.totalAnswers === 0
              ? "問題を解くと、ここに苦手分野が表示されます。"
              : "現在、該当する分野はありません。"}
          </p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
            }}
          >
            {weak.map((a) => (
              <li
                key={a.areaId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".75rem",
                  flexWrap: "wrap",
                }}
              >
                <span className="badge badge-error">
                  正答率 {a.accuracyRate}%
                </span>
                <Link
                  href={`/quests/${a.questId}`}
                  style={{ color: "var(--text-1)" }}
                >
                  {getAreaById(a.areaId)?.title ?? a.areaId}
                </Link>
                <span style={{ fontSize: ".8125rem", color: "var(--text-2)" }}>
                  {a.correct}/{a.answers}問正解
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/* ---------- 4.5 学習状況 ---------- */

export const StatsSection: FC<{ totals: QuestTotals }> = ({ totals }) => {
  const data = useLearning(totals)
  if (!data) return <div className="card" style={{ minHeight: "10rem" }} />
  const { stats } = data
  if (stats.totalAnswers === 0)
    return (
      <div className="card">
        <p className="muted">
          まだ問題を解いていません。解答すると攻略率・正答率がここに表示されます。
        </p>
      </div>
    )
  const allTotal = Object.values(totals).reduce((s, n) => s + n, 0)
  const attempted = Object.values(stats.quests).reduce(
    (s, q) => s + q.attempted,
    0
  )
  return (
    <div
      className="card"
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
    >
      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(7.5rem, 1fr))",
          gap: "1rem",
        }}
      >
        {[
          {
            label: "学習済みの割合",
            value: `${Math.round((attempted / allTotal) * 100)}%`,
            note: `${attempted}/${allTotal}問`,
          },
          {
            label: "正答率",
            value: `${stats.accuracyRate}%`,
            note: `${stats.totalCorrect}/${stats.totalAnswers}回`,
          },
          {
            label: "レベル",
            value: `LV.${stats.level}`,
            note: `${stats.xp} XP`,
          },
        ].map((s) => (
          <div key={s.label}>
            <dt style={{ fontSize: ".75rem", color: "var(--text-2)" }}>
              {s.label}
            </dt>
            <dd style={{ fontSize: "1.5rem", fontWeight: 700 }}>{s.value}</dd>
            <dd style={{ fontSize: ".75rem", color: "var(--text-2)" }}>
              {s.note}
            </dd>
          </div>
        ))}
      </dl>
      <SubjectBars stats={stats} />
    </div>
  )
}

export const SubjectBars: FC<{ stats: LearningStats }> = ({ stats }) => (
  <ul
    style={{
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: ".875rem",
    }}
  >
    {getAllQuests().map((quest) => {
      const q = stats.quests[quest.id as QuestId]
      if (!q) return null
      return (
        <li key={quest.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: ".5rem",
              flexWrap: "wrap",
              fontSize: ".875rem",
              marginBottom: ".375rem",
            }}
          >
            <span>{quest.title}</span>
            <span style={{ color: "var(--text-2)" }}>
              攻略率{" "}
              <b style={{ color: "var(--text-1)" }}>{q.completionRate}%</b>
              {"　"}正答率{" "}
              <b style={{ color: "var(--text-1)" }}>
                {q.answers ? `${q.accuracyRate}%` : "—"}
              </b>
            </span>
          </div>
          <div className="bar" aria-hidden>
            <span
              style={{
                width: `${q.completionRate}%`,
                background: SUBJECT_COLOR[quest.id],
              }}
            />
          </div>
        </li>
      )
    })}
  </ul>
)
