import type { Metadata } from "next"

export const BASE_URL = "https://lawyer-quest.reload.co.jp"
export const SITE_NAME = "Lawyer Quest"
export const DEFAULT_DESCRIPTION =
  "法律を、冒険のように攻略する。行政書士試験対策サイト。行政法・民法・憲法の要点を問題演習で定着。"

const DEFAULT_KEYWORDS = [
  "行政書士",
  "行政書士試験",
  "行政書士試験対策",
  "行政法",
  "民法",
  "憲法",
  "過去問",
  "模擬試験",
]

export const OG_IMAGE = {
  url: `${BASE_URL}/opengraph-image.png`,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} - 行政書士試験対策`,
}

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const url = `${BASE_URL}${path}`
  const socialTitle = `${title} | ${SITE_NAME}`
  return {
    title,
    description,
    keywords: DEFAULT_KEYWORDS,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ja_JP",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
  }
}
