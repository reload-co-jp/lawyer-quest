import type { FC } from "react"
import type { Metadata } from "next"
import { RetryClient } from "app/retry/RetryClient"

export const metadata: Metadata = { robots: { index: false } }

const Page: FC = () => <RetryClient />

export default Page
