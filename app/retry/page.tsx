import type { FC } from "react"
import type { Metadata } from "next"
import { RetryClient } from "app/retry/RetryClient"
import { buildNoIndexMetadata } from "lib/seo"

export const metadata: Metadata = buildNoIndexMetadata({
  title: "復習チャレンジ",
  path: "/retry",
})

const Page: FC = () => <RetryClient />

export default Page
