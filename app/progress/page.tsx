import type { FC } from "react"
import type { Metadata } from "next"
import { ProgressClient } from "app/progress/ProgressClient"
import { buildNoIndexMetadata } from "lib/seo"

export const metadata: Metadata = buildNoIndexMetadata({
  title: "学習進捗",
  path: "/progress",
})

const Page: FC = () => <ProgressClient />

export default Page
