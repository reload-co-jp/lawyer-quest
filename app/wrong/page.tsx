import type { FC } from "react"
import type { Metadata } from "next"
import { WrongClient } from "app/wrong/WrongClient"

export const metadata: Metadata = { robots: { index: false } }

const Page: FC = () => <WrongClient />

export default Page
