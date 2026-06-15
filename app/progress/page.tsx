import type { FC } from "react"
import type { Metadata } from "next"
import { ProgressClient } from "app/progress/ProgressClient"

export const metadata: Metadata = { robots: { index: false } }

const Page: FC = () => <ProgressClient />

export default Page
