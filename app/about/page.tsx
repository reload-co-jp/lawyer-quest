import type { FC } from "react"
import type { Metadata } from "next"
import { BASE_URL, buildBreadcrumbJsonLd, buildMetadata } from "lib/seo"
import { BreadcrumbNav } from "components/BreadcrumbNav"

export const metadata: Metadata = buildMetadata({
  title: "運営者情報・サイトについて",
  description:
    "Lawyer Questの運営者情報、コンテンツ方針（参照ソース必須・レビュー体制）、法律相談ではない旨の免責事項を掲載。",
  path: "/about",
})

const breadcrumbItems = [
  { name: "ホーム", path: "/" },
  { name: "運営者情報・サイトについて", path: "/about" },
]

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "運営者情報・サイトについて",
    url: `${BASE_URL}/about`,
    inLanguage: "ja",
    isPartOf: { "@type": "WebSite", name: "Lawyer Quest", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "株式会社Reload",
      url: "https://reload.co.jp",
    },
  },
  buildBreadcrumbJsonLd(breadcrumbItems),
]

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

const Page: FC = () => {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "1.5rem 1rem 3rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BreadcrumbNav items={breadcrumbItems} />

      <h1
        style={{
          fontSize: "1.375rem",
          fontWeight: 700,
          color: "var(--text-1)",
          letterSpacing: "-.02em",
          marginBottom: "1.5rem",
        }}
      >
        運営者情報・サイトについて
      </h1>

      <Section title="運営者">
        <p style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.75, margin: 0 }}>
          Lawyer Questは
          <a
            href="https://reload.co.jp"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            株式会社Reload
          </a>
          が運営する、行政書士試験対策の学習サイト。
        </p>
      </Section>

      <Section title="コンテンツ方針">
        <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
          {[
            {
              title: "参照ソース必須",
              desc: "問題・解説・条文・判例には、e-Gov法令検索や裁判所公式サイトなどの一次情報、または公式試験情報を可能な限り紐付けている。",
            },
            {
              title: "公開前レビュー",
              desc: "コンテンツは公開前に内容を確認する運用とし、誤りが判明した場合は速やかに修正する。",
            },
            {
              title: "AI生成コンテンツの扱い",
              desc: "解説の下書きや要約作成にAIを利用する場合がある。AI生成文はソースとの照合・確認を経た上で公開し、参考情報として位置づける。",
            },
            {
              title: "法改正への対応",
              desc: "法改正が判明した場合、関連する問題・解説を確認し、必要に応じて修正する。",
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

      <Section title="免責事項">
        <div
          style={{
            padding: "1.125rem 1.25rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "2px solid var(--warning)",
          }}
        >
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.125rem",
              fontSize: ".8125rem",
              color: "var(--text-2)",
              lineHeight: 1.8,
            }}
          >
            <li>Lawyer Questは行政書士試験対策の学習サービスであり、法律相談・法的助言を提供するものではない。</li>
            <li>個別の法的判断が必要な場合は、弁護士・行政書士などの専門家に相談すること。</li>
            <li>模擬試験・攻略率などの表示は学習の目安であり、本試験の合否を保証するものではない。</li>
            <li>掲載内容の正確性には配慮しているが、最新の法改正等により内容が実情と異なる場合がある。重要な判断の際は公式情報を確認すること。</li>
          </ul>
        </div>
      </Section>

      <Section title="お問い合わせ">
        <p style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.75, margin: 0 }}>
          サイトに関するお問い合わせは
          <a
            href="https://reload.co.jp"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            運営会社（株式会社Reload）のサイト
          </a>
          より受け付けている。
        </p>
      </Section>
    </div>
  )
}

export default Page
