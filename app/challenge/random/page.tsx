import type { FC } from "react"
import type { Metadata } from "next"
import { RandomChallengeClient } from "app/challenge/random/RandomChallengeClient"

const BASE_URL = "https://lawyer-quest.reload.co.jp"
const TITLE = "ランダムチャレンジ"
const DESCRIPTION =
  "行政書士試験対策 — 全クエストからランダムに10問出題。行政法・民法・憲法を横断的に演習。"

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/challenge/random` },
  openGraph: {
    title: `${TITLE} | Lawyer Quest`,
    description: DESCRIPTION,
    url: `${BASE_URL}/challenge/random`,
  },
}

const Page: FC = () => <RandomChallengeClient />

export default Page
