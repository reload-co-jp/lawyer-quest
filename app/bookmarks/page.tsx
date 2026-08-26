import type { FC } from "react"
import type { Metadata } from "next"
import { BookmarksClient } from "app/bookmarks/BookmarksClient"
import { buildNoIndexMetadata } from "lib/seo"

export const metadata: Metadata = buildNoIndexMetadata({
  title: "栞をつけたページ",
  path: "/bookmarks",
})

const Page: FC = () => <BookmarksClient />

export default Page
