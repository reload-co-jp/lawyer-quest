import type { FC } from "react"
import type { Metadata } from "next"
import { RandomChallengeClient } from "app/challenge/random/RandomChallengeClient"

export const metadata: Metadata = {
  title: "ランダムチャレンジ",
  description:
    "行政書士試験対策 — 全クエストからランダムに10問出題。行政法・民法・憲法を横断的に演習。",
}

const Page: FC = () => <RandomChallengeClient />

export default Page
