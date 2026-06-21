import type { FC } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { BASE_URL, buildMetadata } from "lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "法律初心者向け 行政書士勉強ガイド",
  description:
    "法律を勉強したことがない人向けに、行政書士試験で学ぶ範囲・勉強する意義・難易度をやさしく解説。憲法・民法・行政法の学習順序や合格までの目安時間も紹介。",
  path: "/study-guide",
})

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "法律初心者向け 行政書士勉強ガイド",
  inLanguage: "ja",
  url: `${BASE_URL}/study-guide`,
  description:
    "行政書士試験で学ぶ範囲・勉強する意義・難易度を法律未学習者向けに解説",
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

const SUBJECT_COLORS: Record<string, string> = {
  憲法: "var(--const)",
  民法: "var(--civil)",
  行政法: "var(--admin)",
  "商法・会社法": "var(--text-3)",
  基礎法学: "var(--text-3)",
  一般知識等: "var(--past)",
}

const SUBJECTS = [
  {
    name: "基礎法学",
    weight: "ごく少量",
    difficulty: "易",
    desc: "法律の用語・読み方・裁判制度の基本。最初に触れることで他科目の土台になる。",
  },
  {
    name: "憲法",
    weight: "少量",
    difficulty: "易〜中",
    desc: "国の仕組みと国民の権利義務。条文数が少なく、判例の結論を覚えれば得点しやすい。法律初心者の入り口として最適。",
  },
  {
    name: "民法",
    weight: "多い",
    difficulty: "高",
    desc: "契約・財産・家族・相続など、私人間のルール全般。条文量が多く、事例を読んで誰の権利義務かを整理する力が必要。最も時間がかかる科目。",
  },
  {
    name: "行政法",
    weight: "最多",
    difficulty: "中",
    desc: "役所の手続き・処分の争い方など。配点が最も大きい一方、ルールが定型的で覚えれば得点が安定しやすい「コスパが良い」科目。",
  },
  {
    name: "商法・会社法",
    weight: "少量",
    difficulty: "中〜高",
    desc: "会社の設立・運営ルール。条文量に対して出題数が少なく、後回しにされやすい。",
  },
  {
    name: "一般知識等",
    weight: "中",
    difficulty: "中",
    desc: "政治・経済・社会、情報通信、文章理解。足切り（6問中6問未満で不合格）があるため侮れない。",
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
          法律初心者向け 行政書士勉強ガイド
        </h1>
        <p
          style={{
            fontSize: ".875rem",
            color: "var(--text-2)",
            lineHeight: 1.65,
          }}
        >
          法律を勉強したことがない人向けに、行政書士試験で何を学ぶのか・なぜ学ぶ意味があるのか・どれくらい難しいのかをまとめた。
        </p>
        <p style={{ fontSize: ".8125rem", marginTop: ".5rem" }}>
          <Link
            href="/basics"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            条文の読み方や法律用語にまだ馴染みがない場合は、もっと手前から学べる「法律ゼロから入門」へ
            →
          </Link>
        </p>
      </div>

      {/* なぜ法律を学ぶ意味があるのか */}
      <Section title="勉強する意義">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".75rem",
          }}
        >
          {[
            {
              title: "社会の「ルールの読み方」が身につく",
              desc: "契約書・行政手続き・トラブル対応など、社会生活で必ず関わる法律の基本構造を理解できる。仕事や私生活で「何が問題になるか」に気づけるようになる。",
            },
            {
              title: "資格として開業・キャリアにつながる",
              desc: "合格後は行政書士として登録すれば、許認可申請や書類作成を代理する仕事ができる。法律系資格の入門としても評価されやすい。",
            },
            {
              title: "他の法律資格への足がかりになる",
              desc: "民法・憲法・行政法は司法書士・公務員試験・宅建などとも範囲が重なる。行政書士で基礎を作ると後の学習が楽になる。",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: ".875rem 1rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderLeft: "2px solid var(--accent)",
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
                {item.title}
              </p>
              <p
                style={{
                  fontSize: ".8125rem",
                  color: "var(--text-2)",
                  margin: 0,
                  lineHeight: 1.65,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 勉強する範囲 */}
      <Section title="勉強する範囲（科目ごとの特徴）">
        <p
          style={{
            fontSize: ".8125rem",
            color: "var(--text-2)",
            marginBottom: "1rem",
            lineHeight: 1.65,
          }}
        >
          試験は「法令等科目」（憲法・民法・行政法・商法会社法・基礎法学）と「一般知識等科目」の2部構成。
          配点比重がそのまま勉強時間の配分の目安になる。
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            border: "1px solid var(--border)",
          }}
        >
          {SUBJECTS.map((s) => (
            <div
              key={s.name}
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
                  background: SUBJECT_COLORS[s.name] ?? "var(--accent)",
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: ".5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: ".875rem",
                      color: "var(--text-1)",
                      fontWeight: 600,
                    }}
                  >
                    {s.name}
                  </span>
                  <span
                    style={{
                      fontSize: ".75rem",
                      color: "var(--text-3)",
                      flexShrink: 0,
                    }}
                  >
                    出題量: {s.weight} ／ 難易度: {s.difficulty}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: ".8125rem",
                    color: "var(--text-2)",
                    margin: ".25rem 0 0",
                    lineHeight: 1.6,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: ".375rem",
          }}
        >
          <Link
            href="/exam-guide"
            style={{
              fontSize: ".8125rem",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            配点・合格基準の詳細は試験ガイドへ →
          </Link>
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

      {/* 学習の進め方 */}
      <Section title="法律初心者の学習順序（おすすめ）">
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {[
            {
              step: "1",
              text: "基礎法学・憲法から始める",
              note: "条文量が少なく、法律用語に慣れるのに最適",
            },
            {
              step: "2",
              text: "行政法に進む",
              note: "配点最大。パターンが決まっているので得点が伸びやすい",
            },
            {
              step: "3",
              text: "民法に取り組む",
              note: "最も時間がかかる。事例形式の問題演習を繰り返す",
            },
            {
              step: "4",
              text: "商法・会社法、一般知識等で仕上げ",
              note: "出題数は少ないが足切り回避のため最低限は対策",
            },
            {
              step: "5",
              text: "過去問演習で総仕上げ",
              note: "本番形式で時間配分・解答順序を練習する",
            },
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
      </Section>

      {/* 難易度 */}
      <Section title="難易度のリアル">
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          {[
            {
              label: "合格率",
              value: "例年10〜15%前後",
              note: "国家資格の中では中堅クラス。誰でも受験できる分、対策不十分な受験者も多く含まれる",
              color: "var(--warning)",
            },
            {
              label: "必要な勉強時間",
              value: "目安500〜800時間",
              note: "法律未学習者の場合。半年〜1年の学習期間を見込むのが一般的",
              color: "var(--accent)",
            },
            {
              label: "つまずきやすい点",
              value: "民法の事例問題、記述式の解答作成",
              note: "暗記だけでなく「条文をどう事例に当てはめるか」の読解力が問われる",
              color: "var(--admin)",
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
              <p
                style={{
                  fontSize: ".75rem",
                  color: "var(--text-3)",
                  margin: "0 0 .25rem",
                  fontWeight: 600,
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  fontSize: ".9375rem",
                  color: "var(--text-1)",
                  fontWeight: 600,
                  margin: "0 0 .25rem",
                }}
              >
                {item.value}
              </p>
              <p
                style={{
                  fontSize: ".75rem",
                  color: "var(--text-3)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {item.note}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "1rem",
            padding: ".75rem 1rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "2px solid var(--past)",
            fontSize: ".8125rem",
            color: "var(--text-2)",
            lineHeight: 1.65,
          }}
        >
          法律未学習でも、配点の大きい行政法・民法から優先して取り組み、過去問演習を繰り返すことで合格レベルに到達できる。
          才能より「正しい順序」と「演習量」が結果を分ける試験。
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
          憲法から学習を始める
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
