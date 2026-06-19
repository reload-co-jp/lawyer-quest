import { writeFile } from "node:fs/promises"
import { createElement as h } from "react"
import { ImageResponse } from "next/og.js"

const LABEL = "行政書士試験対策"
const TITLE = "Lawyer Quest"
const SUBTITLE = "法律を、冒険のように攻略する。"
const TAGS = [
  { text: "行政法", color: "#00b8cc" },
  { text: "民法", color: "#00c97a" },
  { text: "憲法", color: "#9b44e0" },
]

const loadGoogleFont = async (weight) => {
  const text = Array.from(
    new Set(
      `${LABEL}${TITLE}${SUBTITLE}${TAGS.map((tag) => tag.text).join("")}`
    )
  ).join("")
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@${weight}&text=${encodeURIComponent(text)}`
    )
  ).text()
  const url = css.match(
    /src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/
  )?.[1]
  if (!url) throw new Error("Noto Sans JPフォントURL取得失敗")
  return await (await fetch(url)).arrayBuffer()
}

const buildElement = () =>
  h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#0a0a0a",
        fontFamily: "Noto Sans JP",
      },
    },
    h("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 4,
        height: 630,
        backgroundColor: "#00b8cc",
      },
    }),
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 80,
          paddingRight: 80,
        },
      },
      h(
        "div",
        {
          style: {
            fontSize: 18,
            fontWeight: 700,
            color: "#00b8cc",
            letterSpacing: 4,
          },
        },
        LABEL
      ),
      h(
        "div",
        {
          style: {
            marginTop: 32,
            fontSize: 72,
            fontWeight: 700,
            color: "#f1f1f0",
            letterSpacing: -2,
          },
        },
        TITLE
      ),
      h(
        "div",
        { style: { marginTop: 16, fontSize: 24, color: "#8a8a8a" } },
        SUBTITLE
      ),
      h(
        "div",
        { style: { display: "flex", marginTop: 32, gap: 12 } },
        ...TAGS.map((tag) =>
          h(
            "div",
            {
              key: tag.text,
              style: {
                display: "flex",
                padding: "6px 18px",
                fontSize: 13,
                color: tag.color,
                border: `1px solid ${tag.color}`,
                backgroundColor: `${tag.color}1f`,
              },
            },
            tag.text
          )
        )
      )
    )
  )

const main = async () => {
  const [regular, bold] = await Promise.all([
    loadGoogleFont(400),
    loadGoogleFont(700),
  ])
  const response = new ImageResponse(buildElement(), {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Noto Sans JP", data: regular, weight: 400 },
      { name: "Noto Sans JP", data: bold, weight: 700 },
    ],
  })
  const buffer = Buffer.from(await response.arrayBuffer())
  await writeFile(
    new URL("../app/opengraph-image.png", import.meta.url),
    buffer
  )
  console.log("app/opengraph-image.png 生成完了")
}

main()
