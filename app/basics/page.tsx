import type { FC } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { BASE_URL, buildMetadata } from "lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "法律ゼロから入門",
  description:
    "法律用語を一度も見たことがない人向けに、条文の読み方・法令の種類・要件と効果・裁判所のしくみをやさしく解説。行政書士の勉強を始める前の準備ページ。",
  path: "/basics",
})

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "法律ゼロから入門",
  inLanguage: "ja",
  url: `${BASE_URL}/basics`,
  description:
    "条文の読み方・法令の種類・要件と効果・裁判所のしくみを法律未経験者向けに解説",
  publisher: { "@type": "Organization", name: "Lawyer Quest", url: BASE_URL },
}

const Section: FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
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

const Card: FC<{ title: string; desc: React.ReactNode; color?: string }> = ({
  title,
  desc,
  color,
}) => (
  <div
    style={{
      padding: ".875rem 1rem",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderLeft: `2px solid ${color ?? "var(--accent)"}`,
    }}
  >
    <p
      style={{
        fontSize: ".875rem",
        color: "var(--text-1)",
        fontWeight: 600,
        margin: "0 0 .25rem",
      }}
    >
      {title}
    </p>
    <p
      style={{
        fontSize: ".8125rem",
        color: "var(--text-2)",
        margin: 0,
        lineHeight: 1.65,
      }}
    >
      {desc}
    </p>
  </div>
)

const LAW_HIERARCHY = [
  { name: "憲法", desc: "国の最高法規。これに反する法律・命令は無効。" },
  {
    name: "法律",
    desc: "国会が制定。「〜法」「〜法律」（民法・行政手続法など）。",
  },
  {
    name: "政令・省令",
    desc: "内閣（政令）・各省大臣（省令）が、法律の委任を受けて定める細則。",
  },
  {
    name: "条例",
    desc: "地方議会が制定。その都道府県・市町村の中だけで通用する。",
  },
]

const TERMS = [
  {
    term: "要件と効果",
    desc: "法律の条文は基本的に「〇〇という条件（要件）を満たせば、△△という結果（効果）が生じる」という形をしている。条文を読むときはまず要件と効果を分けて整理する。",
  },
  {
    term: "「みなす」と「推定する」",
    desc: "「みなす」は反証を許さず法的に確定する強い表現。「推定する」は反対の証拠が出れば覆る、ひとまずの仮定にとどまる。",
  },
  {
    term: "善意・悪意",
    desc: "道徳的な良し悪しではない。ある事実を「知らない」状態が善意、「知っている」状態が悪意。",
  },
  {
    term: "本文とただし書",
    desc: "条文中の「ただし、〜」以降はただし書と呼び、本文の原則に対する例外を定める。原則と例外をセットで読む。",
  },
  {
    term: "以上・以下・未満・超える",
    desc: "「以上」「以下」はその数を含む。「未満」「超える」はその数を含まない。条文の数値表現は1字の違いで結論が変わる。",
  },
]

const COURT_STEPS = [
  {
    step: "1",
    text: "簡易裁判所 / 地方裁判所",
    note: "原則はここから始まる（第一審）",
  },
  { step: "2", text: "高等裁判所", note: "第一審の判断に不服があれば控訴" },
  {
    step: "3",
    text: "最高裁判所",
    note: "さらに不服があれば上告。判断は原則ここで確定",
  },
]

const Page: FC = () => {
  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "1.5rem 1rem 3rem",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ marginBottom: "1.75rem" }}>
        <Link
          href="/"
          style={{
            fontSize: ".8125rem",
            color: "var(--text-3)",
            textDecoration: "none",
          }}
        >
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
          法律ゼロから入門
        </h1>
        <p
          style={{
            fontSize: ".875rem",
            color: "var(--text-2)",
            lineHeight: 1.65,
          }}
        >
          「条」「項」「みなす」といった言葉に馴染みがない人向けの準備ページ。
          ここを読んでから憲法・基礎法学に進むと条文がぐっと読みやすくなる。
        </p>
      </div>

      {/* そもそも法律とは */}
      <Section title="そもそも法律とは">
        <Card
          title="社会のルールを文章にしたもの"
          desc="「契約は守らなければならない」「人を傷つけたら賠償する」といった社会の決まりを、誰が読んでも同じ結論になるよう文章化したものが法律。行政書士試験はこの文章（条文）の意味を正確に読み解く力を測る試験。"
        />
      </Section>

      {/* 法令の種類 */}
      <Section title="法令の種類（強さの順）">
        <p
          style={{
            fontSize: ".8125rem",
            color: "var(--text-2)",
            marginBottom: "1rem",
            lineHeight: 1.65,
          }}
        >
          法令には上下関係がある。上位のルールに矛盾する下位のルールは無効になる。
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            border: "1px solid var(--border)",
          }}
        >
          {LAW_HIERARCHY.map((item, i) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                gap: ".75rem",
                padding: ".75rem .875rem",
                background: "var(--surface)",
                borderBottom: "1px solid var(--border)",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: ".8125rem",
                  color: "var(--accent)",
                  fontWeight: 700,
                  flexShrink: 0,
                  width: "1.25rem",
                }}
              >
                {i + 1}
              </span>
              <div>
                <p
                  style={{
                    fontSize: ".875rem",
                    color: "var(--text-1)",
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    fontSize: ".8125rem",
                    color: "var(--text-2)",
                    margin: ".125rem 0 0",
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 条文の読み方 */}
      <Section title="条文の読み方">
        <div
          style={{
            padding: ".875rem 1rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            marginBottom: ".875rem",
            fontFamily: "monospace",
            fontSize: ".8125rem",
            color: "var(--text-2)",
            lineHeight: 1.8,
          }}
        >
          {/* eslint-disable no-irregular-whitespace -- 条文の全角スペースは正式な表記 */}
          第3条　成年に達しない者が法律行為をするには、その法定代理人の同意を得なければならない。
          <br />
          　２　前項の規定に反する法律行為は、取り消すことができる。
          <br />
          　　一　日常生活に関する行為
          <br />
          　　二　法定代理人が許した範囲内の行為
          {/* eslint-enable no-irregular-whitespace */}
        </div>
        <p
          style={{
            fontSize: ".8125rem",
            color: "var(--text-2)",
            lineHeight: 1.65,
          }}
        >
          条文は「条」→「項」→「号」の順に細かくなる。最初の項には番号を振らないことが多く（第1項扱い）、
          2番目以降は「２」「３」と算用数字で続く。号は「一」「二」と漢数字で列挙される。
        </p>
      </Section>

      {/* 法律用語 */}
      <Section title="最低限おさえる法律用語">
        <div
          style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}
        >
          {TERMS.map((t) => (
            <Card key={t.term} title={t.term} desc={t.desc} />
          ))}
        </div>
      </Section>

      {/* 裁判所のしくみ */}
      <Section title="裁判所のしくみ（三審制）">
        <p
          style={{
            fontSize: ".8125rem",
            color: "var(--text-2)",
            marginBottom: "1rem",
            lineHeight: 1.65,
          }}
        >
          1つの事件につき、原則3回まで審理を受けられる。行政法・民法の判例問題はこの三審制を前提に出題される。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {COURT_STEPS.map((item) => (
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
                  color: "var(--accent)",
                  fontWeight: 700,
                  flexShrink: 0,
                  width: "1.25rem",
                }}
              >
                {item.step}
              </span>
              <div>
                <p
                  style={{
                    fontSize: ".875rem",
                    color: "var(--text-1)",
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {item.text}
                </p>
                <p
                  style={{
                    fontSize: ".75rem",
                    color: "var(--text-3)",
                    margin: ".125rem 0 0",
                  }}
                >
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: ".75rem",
            padding: ".75rem 1rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "2px solid var(--past)",
            fontSize: ".8125rem",
            color: "var(--text-2)",
            lineHeight: 1.65,
          }}
        >
          事件の種類も3つに分かれる。私人間のトラブル＝民事事件、犯罪の処罰＝刑事事件、
          役所の処分を争う＝行政事件。行政書士試験で扱うのは主に民事事件と行政事件。
        </div>
      </Section>

      {/* CTA */}
      <div
        style={{
          padding: "1.25rem",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderLeft: "2px solid var(--accent)",
          display: "flex",
          flexDirection: "column",
          gap: ".75rem",
        }}
      >
        <p
          style={{
            fontSize: ".875rem",
            color: "var(--text-1)",
            fontWeight: 600,
            margin: 0,
          }}
        >
          ここまで読めたら準備完了
        </p>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          <Link
            href="/study-guide"
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
            勉強ガイドへ進む →
          </Link>
          <Link
            href="/quests"
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
            クエストで学ぶ
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
