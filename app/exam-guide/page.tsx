import type { FC } from "react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "行政書士試験 ガイド | Lawyer Quest",
  description:
    "行政書士試験の概要・試験科目・合格基準・申込み方法・試験日程を解説。受験資格は不問。法令等244点＋一般知識等56点の計300点満点。",
}

const BASE_URL = "https://lawyer-quest.reload.co.jp"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "行政書士試験 ガイド",
  inLanguage: "ja",
  url: `${BASE_URL}/exam-guide`,
  description: "行政書士試験の概要・試験科目・合格基準・申込み方法",
  publisher: { "@type": "Organization", name: "Lawyer Quest", url: BASE_URL },
}

const Section: FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section style={{ marginBottom: "2rem" }}>
    <h2
      style={{
        fontSize: ".75rem",
        fontWeight: 600,
        color: "var(--text-3)",
        letterSpacing: ".06em",
        textTransform: "uppercase",
        marginBottom: ".875rem",
        paddingBottom: ".5rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {title}
    </h2>
    {children}
  </section>
)

const Row: FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div
    style={{
      display: "flex",
      gap: "1rem",
      padding: ".625rem 0",
      borderBottom: "1px solid var(--border)",
      alignItems: "flex-start",
    }}
  >
    <span style={{ fontSize: ".8125rem", color: "var(--text-3)", flexShrink: 0, width: "8rem" }}>{label}</span>
    <span style={{ fontSize: ".875rem", color: "var(--text-1)", flex: 1, lineHeight: 1.65 }}>{value}</span>
  </div>
)

const Page: FC = () => {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "1.5rem 1rem 3rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ marginBottom: "1.75rem" }}>
        <Link href="/" style={{ fontSize: ".8125rem", color: "var(--text-3)", textDecoration: "none" }}>
          ← ホーム
        </Link>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-.02em", marginBottom: ".375rem" }}>
          行政書士試験 ガイド
        </h1>
        <p style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.65 }}>
          行政書士試験の概要・科目・合格基準・申込み方法をまとめた案内ページ。
          情報は例年の傾向に基づくもので、最新情報は必ず公式サイトで確認のこと。
        </p>
      </div>

      {/* 試験概要 */}
      <Section title="試験概要">
        <Row label="正式名称" value="行政書士試験" />
        <Row label="実施機関" value="一般財団法人 行政書士試験研究センター" />
        <Row label="受験資格" value="制限なし（年齢・学歴・国籍不問）" />
        <Row label="試験形式" value="筆記試験（択一式・多岐選択式・記述式）" />
        <Row label="満点" value="300点" />
        <Row label="試験言語" value="日本語" />
      </Section>

      {/* 試験日程・申込み */}
      <Section title="試験日程・申込み（例年の目安）">
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "2px solid var(--accent)",
            padding: ".75rem 1rem",
            marginBottom: "1rem",
            fontSize: ".8125rem",
            color: "var(--text-2)",
          }}
        >
          ※ 日程は毎年変動します。必ず公式サイト（行政書士試験研究センター）で確認してください。
        </div>

        <Row label="申込受付" value="7月下旬〜8月下旬（郵送またはインターネット）" />
        <Row label="受験料" value="10,000円" />
        <Row
          label="試験日"
          value={
            <>
              11月の第2日曜日
              <br />
              <span style={{ fontSize: ".75rem", color: "var(--text-3)" }}>例：2024年は11月10日（日）</span>
            </>
          }
        />
        <Row label="試験時間" value="13:00〜16:00（3時間）" />
        <Row label="合格発表" value="翌年1月下旬" />

        <div style={{ marginTop: "1rem" }}>
          <a
            href="https://gyosei-shiken.or.jp/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".375rem",
              padding: ".5rem .875rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--accent)",
              textDecoration: "none",
              fontSize: ".8125rem",
              fontWeight: 600,
              borderRadius: "var(--radius-sm)",
            }}
          >
            公式サイト（行政書士試験研究センター）↗
          </a>
        </div>
      </Section>

      {/* 試験科目・配点 */}
      <Section title="試験科目・配点">
        <p style={{ fontSize: ".8125rem", color: "var(--text-2)", marginBottom: "1rem", lineHeight: 1.65 }}>
          試験は大きく「法令等科目」と「一般知識等科目」の2部構成。
        </p>

        {/* 法令等 */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            marginBottom: ".75rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: ".625rem 1rem",
              background: "rgba(0,184,204,0.08)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: ".9375rem", color: "var(--accent)" }}>法令等科目</span>
            <span style={{ fontSize: ".8125rem", color: "var(--text-2)" }}>46問 ／ 244点満点</span>
          </div>

          {[
            { subject: "基礎法学", count: "2問", format: "択一式", points: "8点" },
            { subject: "憲法", count: "5問", format: "択一式3問＋多岐選択式1問＋記述式なし", points: "20点" },
            { subject: "行政法（行政手続法・行政不服審査法・行政事件訴訟法・国家賠償法・地方自治法）", count: "19問", format: "択一式15問＋多岐選択式2問＋記述式1問", points: "76点＋16点＋20点" },
            { subject: "民法", count: "9問", format: "択一式7問＋記述式2問", points: "28点＋40点" },
            { subject: "商法・会社法", count: "5問", format: "択一式", points: "20点" },
          ].map((row) => (
            <div
              key={row.subject}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: ".5rem",
                padding: ".625rem 1rem",
                borderBottom: "1px solid var(--border)",
                alignItems: "start",
              }}
            >
              <div>
                <p style={{ fontSize: ".875rem", color: "var(--text-1)", margin: "0 0 .125rem", fontWeight: 500 }}>
                  {row.subject}
                </p>
                <p style={{ fontSize: ".75rem", color: "var(--text-3)", margin: 0 }}>{row.format}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontSize: ".8125rem", color: "var(--text-2)", margin: 0 }}>{row.count}</p>
                <p style={{ fontSize: ".75rem", color: "var(--text-3)", margin: 0 }}>{row.points}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 一般知識等 */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: ".625rem 1rem",
              background: "rgba(0,184,204,0.08)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: ".9375rem", color: "var(--accent)" }}>一般知識等科目</span>
            <span style={{ fontSize: ".8125rem", color: "var(--text-2)" }}>14問 ／ 56点満点</span>
          </div>

          {[
            { subject: "政治・経済・社会", count: "7問前後", format: "択一式", points: "約28点" },
            { subject: "情報通信・個人情報保護", count: "4問前後", format: "択一式", points: "約16点" },
            { subject: "文章理解", count: "3問", format: "択一式", points: "12点" },
          ].map((row) => (
            <div
              key={row.subject}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: ".5rem",
                padding: ".625rem 1rem",
                borderBottom: "1px solid var(--border)",
                alignItems: "start",
              }}
            >
              <div>
                <p style={{ fontSize: ".875rem", color: "var(--text-1)", margin: "0 0 .125rem", fontWeight: 500 }}>
                  {row.subject}
                </p>
                <p style={{ fontSize: ".75rem", color: "var(--text-3)", margin: 0 }}>{row.format}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontSize: ".8125rem", color: "var(--text-2)", margin: 0 }}>{row.count}</p>
                <p style={{ fontSize: ".75rem", color: "var(--text-3)", margin: 0 }}>{row.points}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "1rem" }}>
          <Link
            href="/general-knowledge"
            style={{
              fontSize: ".8125rem",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            一般知識等（基礎知識）科目の対策はこちら →
          </Link>
        </div>
      </Section>

      {/* 合格基準 */}
      <Section title="合格基準（3つ全て満たすこと）">
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          {[
            {
              label: "① 法令等科目",
              value: "122点以上（満点244点の50%以上）",
              note: "択一式・多岐選択式・記述式の合計",
              color: "var(--admin)",
            },
            {
              label: "② 一般知識等科目",
              value: "24点以上（14問中6問以上正解）",
              note: "足切り基準。6問未満は即不合格",
              color: "var(--admin)",
            },
            {
              label: "③ 総合得点",
              value: "180点以上（300点満点の60%以上）",
              note: "①②を満たした上で、総合点が180点以上",
              color: "var(--accent)",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: ".875rem 1rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderLeft: `2px solid ${item.color}`,
              }}
            >
              <p style={{ fontSize: ".75rem", color: "var(--text-3)", margin: "0 0 .25rem", fontWeight: 600 }}>
                {item.label}
              </p>
              <p style={{ fontSize: ".9375rem", color: "var(--text-1)", fontWeight: 600, margin: "0 0 .25rem" }}>
                {item.value}
              </p>
              <p style={{ fontSize: ".75rem", color: "var(--text-3)", margin: 0 }}>{item.note}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "1rem",
            padding: ".75rem 1rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "2px solid var(--warning)",
            fontSize: ".8125rem",
            color: "var(--text-2)",
            lineHeight: 1.65,
          }}
        >
          <span style={{ color: "var(--warning)", fontWeight: 600 }}>合格率：</span>{" "}
          例年10〜15%前後。記述式の採点次第で大きく変動することがある。
        </div>
      </Section>

      {/* 試験当日 */}
      <Section title="試験当日">
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {[
            { time: "12:00〜", text: "会場受付開始（目安）" },
            { time: "12:45", text: "着席完了（遅刻すると入室不可の場合あり）" },
            { time: "13:00", text: "試験開始" },
            { time: "16:00", text: "試験終了" },
          ].map((item) => (
            <div
              key={item.time}
              style={{
                display: "flex",
                gap: "1rem",
                padding: ".625rem .875rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  fontSize: ".8125rem",
                  color: "var(--accent)",
                  fontWeight: 600,
                  flexShrink: 0,
                  width: "3.5rem",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {item.time}
              </span>
              <span style={{ fontSize: ".875rem", color: "var(--text-1)" }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: ".875rem",
            padding: ".875rem 1rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            fontSize: ".8125rem",
            color: "var(--text-2)",
            lineHeight: 1.75,
          }}
        >
          <p style={{ margin: "0 0 .375rem", color: "var(--text-1)", fontWeight: 600, fontSize: ".875rem" }}>
            持ち物
          </p>
          <p style={{ margin: 0 }}>・ 受験票（事前に送付される）</p>
          <p style={{ margin: 0 }}>・ 顔写真付き本人確認書類</p>
          <p style={{ margin: 0 }}>・ HB鉛筆（シャープペンシル可）・消しゴム</p>
          <p style={{ margin: 0 }}>・ 腕時計（スマートウォッチ不可）</p>
        </div>
      </Section>

      {/* 登録・業務 */}
      <Section title="合格後：行政書士登録と業務">
        <div
          style={{
            padding: "1rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            fontSize: ".875rem",
            color: "var(--text-2)",
            lineHeight: 1.75,
          }}
        >
          <p style={{ margin: "0 0 .625rem" }}>
            試験合格後、<strong style={{ color: "var(--text-1)" }}>各都道府県の行政書士会</strong>に登録することで、行政書士として業務を行うことができる。
          </p>
          <p style={{ margin: "0 0 .375rem", color: "var(--text-1)", fontWeight: 600 }}>主な業務</p>
          <p style={{ margin: 0 }}>・ 官公署への提出書類の作成・提出代行</p>
          <p style={{ margin: 0 }}>・ 権利義務・事実証明に関する書類の作成</p>
          <p style={{ margin: 0 }}>・ 許認可申請（建設業・風俗営業・入管等）</p>
          <p style={{ margin: 0 }}>・ 契約書・遺言書・定款の作成</p>
        </div>
      </Section>

      {/* CTA */}
      <div
        style={{
          padding: "1.25rem",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderLeft: "2px solid var(--past)",
          display: "flex",
          flexDirection: "column",
          gap: ".75rem",
        }}
      >
        <p style={{ fontSize: ".875rem", color: "var(--text-1)", fontWeight: 600, margin: 0 }}>
          試験対策を始める
        </p>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          <Link
            href="/quests"
            style={{
              padding: ".5rem .875rem",
              background: "var(--accent-btn)",
              color: "#fff",
              textDecoration: "none",
              fontSize: ".875rem",
              fontWeight: 600,
              borderRadius: "var(--radius-sm)",
            }}
          >
            クエストで学ぶ →
          </Link>
          <Link
            href="/exam"
            style={{
              padding: ".5rem .875rem",
              background: "transparent",
              border: "1px solid var(--past)",
              color: "var(--past)",
              textDecoration: "none",
              fontSize: ".875rem",
              fontWeight: 600,
              borderRadius: "var(--radius-sm)",
            }}
          >
            模擬試験を受ける →
          </Link>
          <Link
            href="/articles"
            style={{
              padding: ".5rem .875rem",
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-2)",
              textDecoration: "none",
              fontSize: ".875rem",
              borderRadius: "var(--radius-sm)",
            }}
          >
            記事を読む
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
