import type { FC } from "react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "基礎知識科目 対策ガイド",
  description:
    "行政書士試験「基礎知識」科目（政治・経済・社会、情報通信・個人情報保護、文章理解、行政書士法等）の出題範囲・足切り基準・分野別の対策方法を解説。",
}

const BASE_URL = "https://lawyer-quest.reload.co.jp"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "基礎知識科目 対策ガイド",
  inLanguage: "ja",
  url: `${BASE_URL}/general-knowledge`,
  description: "行政書士試験「基礎知識」科目の出題範囲・足切り基準・分野別の対策方法",
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

const FIELDS = [
  {
    name: "政治・経済・社会",
    weight: "7問前後",
    desc: "時事問題・経済の仕組み・社会保障制度など幅広いテーマから出題。範囲が広く対策効率が低いため、深追いせず過去問で頻出テーマだけ拾うのが現実的。",
  },
  {
    name: "情報通信・個人情報保護",
    weight: "3〜4問前後",
    desc: "個人情報保護法・行政手続オンライン化関連法・情報セキュリティ基礎用語が中心。出題範囲が比較的絞られており、得点源にしやすい分野。",
  },
  {
    name: "文章理解",
    weight: "3問",
    desc: "現代文の読解問題。出題形式が毎年安定しているため、過去問演習で型に慣れれば確実に得点できる。",
  },
  {
    name: "行政書士法等",
    weight: "数問",
    desc: "令和6年度試験から新設された出題範囲。行政書士法・戸籍法・住民基本台帳法など、行政書士の業務に直結する法令が出題対象。行政法の学習延長で対応しやすい。",
  },
]

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
        <h1
          style={{
            fontSize: "1.375rem",
            fontWeight: 700,
            color: "var(--text-1)",
            letterSpacing: "-.02em",
            marginBottom: ".375rem",
          }}
        >
          基礎知識科目 対策ガイド
        </h1>
        <p style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.65 }}>
          法令等科目（憲法・民法・行政法など）とは別枠の「基礎知識」科目について、出題範囲・足切り基準・分野別の対策方法をまとめた。
          具体的な出題数・配点は年度により変動するため、最新情報は必ず公式サイトで確認のこと。
        </p>
      </div>

      {/* 科目の位置づけ */}
      <Section title="基礎知識科目とは">
        <div
          style={{
            padding: ".875rem 1rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "2px solid var(--past)",
            fontSize: ".8125rem",
            color: "var(--text-2)",
            lineHeight: 1.7,
          }}
        >
          令和6年度試験から、旧「一般知識等」科目が「基礎知識」科目に名称変更され、出題範囲に「行政書士法等」が追加された。
          14問・56点満点という出題数・配点の枠組みは変わらず、足切り（後述）の対象であることも変わらない。
        </div>
      </Section>

      {/* 分野別の出題範囲 */}
      <Section title="分野別の出題範囲">
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid var(--border)" }}>
          {FIELDS.map((f) => (
            <div
              key={f.name}
              style={{
                display: "flex",
                gap: ".75rem",
                padding: ".75rem .875rem",
                background: "var(--surface)",
                borderBottom: "1px solid var(--border)",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  marginTop: ".4rem",
                  flexShrink: 0,
                  background: "var(--past)",
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: ".5rem" }}>
                  <span style={{ fontSize: ".875rem", color: "var(--text-1)", fontWeight: 600 }}>{f.name}</span>
                  <span style={{ fontSize: ".75rem", color: "var(--text-3)", flexShrink: 0 }}>出題数: {f.weight}</span>
                </div>
                <p style={{ fontSize: ".8125rem", color: "var(--text-2)", margin: ".25rem 0 0", lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 足切り */}
      <Section title="足切りに注意">
        <div
          style={{
            padding: ".875rem 1rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "2px solid var(--warning)",
          }}
        >
          <p style={{ fontSize: ".9375rem", color: "var(--text-1)", fontWeight: 600, margin: "0 0 .375rem" }}>
            14問中6問未満の正解で即不合格
          </p>
          <p style={{ fontSize: ".8125rem", color: "var(--text-2)", margin: 0, lineHeight: 1.65 }}>
            法令等科目でどれだけ高得点でも、基礎知識科目が24点未満（6問未満正解）だと総合点に関係なく不合格になる。
            「後回しでいい科目」ではなく、最低限の対策は必須。
          </p>
        </div>
        <div style={{ marginTop: ".75rem" }}>
          <Link href="/exam-guide" style={{ fontSize: ".8125rem", color: "var(--accent)", textDecoration: "none" }}>
            合格基準の詳細は試験ガイドへ →
          </Link>
        </div>
      </Section>

      {/* 対策の優先順位 */}
      <Section title="対策の優先順位">
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {[
            { step: "1", text: "文章理解を確実に取る", note: "出題形式が安定。過去問演習だけで3問とも安定して取れる" },
            { step: "2", text: "情報通信・個人情報保護を固める", note: "範囲が絞られており、条文知識で得点が安定する" },
            { step: "3", text: "行政書士法等は行政法学習と並行", note: "行政法の知識が活きるため、別科目として身構えなくてよい" },
            { step: "4", text: "政治・経済・社会は深追いしない", note: "範囲が広すぎるため、過去問の頻出テーマだけ拾えば十分" },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                display: "flex",
                gap: "1rem",
                padding: ".75rem .875rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: ".8125rem",
                  color: "var(--past)",
                  fontWeight: 700,
                  flexShrink: 0,
                  width: "1.25rem",
                }}
              >
                {item.step}
              </span>
              <div>
                <p style={{ fontSize: ".875rem", color: "var(--text-1)", margin: 0, fontWeight: 500 }}>{item.text}</p>
                <p style={{ fontSize: ".75rem", color: "var(--text-3)", margin: ".125rem 0 0" }}>{item.note}</p>
              </div>
            </div>
          ))}
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
          法令等科目の対策も進める
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
            href="/exam-guide"
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
            試験ガイドを見る
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
