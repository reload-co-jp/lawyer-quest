import type { FC } from "react"
import type { Metadata } from "next"
import { WrongClient } from "app/wrong/WrongClient"
import { buildNoIndexMetadata } from "lib/seo"

export const metadata: Metadata = buildNoIndexMetadata({
  title: "間違えた問題",
  path: "/wrong",
})

const Page: FC = () => <WrongClient />

export default Page
