import type { FC } from "react"
import type { Metadata } from "next"
import { getQuestionsByQuestId } from "lib/questions"
import { ExamClient } from "components/ExamClient"

const BASE_URL = "https://lawyer-quest.reload.co.jp"
const TITLE = "過去問 模擬試験"
const DESCRIPTION =
  "行政書士試験の過去問から出題する模擬試験。全問解答後にまとめて採点・解説確認。"

export const metadata: Metadata = {
  title: `${TITLE} | Lawyer Quest`,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/exam` },
  openGraph: {
    title: `${TITLE} | Lawyer Quest`,
    description: DESCRIPTION,
    url: `${BASE_URL}/exam`,
  },
}

const Page: FC = () => {
  const questions = getQuestionsByQuestId("past_exam")
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem 1rem" }}
    >
      <ExamClient allQuestions={questions} />
    </div>
  )
}

export default Page
