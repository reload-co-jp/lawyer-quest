import type { MetadataRoute } from "next"
import { BASE_URL, DEFAULT_DESCRIPTION, SITE_NAME } from "lib/seo"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} - 行政書士試験対策`,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "ja",
    icons: [
      {
        src: `${BASE_URL}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  }
}
