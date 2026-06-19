import type { FC } from "react"
import type { Metadata } from "next"
import { getQuestionsByQuestId } from "lib/questions"
import { ExamClient } from "components/ExamClient"

export const metadata: Metadata = {
  title: "過去問 模擬試験 | Lawyer Quest",
  description:
    "行政書士試験の過去問から出題する模擬試験。全問解答後にまとめて採点・解説確認。",
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
