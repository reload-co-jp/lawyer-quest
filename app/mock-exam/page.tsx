import type { FC } from "react"
import type { Metadata } from "next"
import { getAllQuestions } from "lib/questions"
import { ExamClient } from "components/ExamClient"

export const metadata: Metadata = {
  title: "模擬テスト | Lawyer Quest",
  description:
    "行政法・民法・憲法を本番試験相当の比率で出題する20問の模擬テスト。",
}

const Page: FC = () => {
  const questions = getAllQuestions()
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem 1rem" }}
    >
      <ExamClient
        allQuestions={questions}
        examCounts={[20]}
        variant="balanced"
        layout="all-in-one"
        title="模擬テスト"
        description="行政法・民法・憲法を本番試験相当の比率で出題。全問解答後にまとめて採点。"
        poolNote={[
          "行政法12問・民法5問・憲法3問の構成（本番試験相当比率）",
          "全クエスト問題と過去問から分野ごとにランダム抽出",
          "解答中は正誤フィードバックなし",
          "経過時間を計測（制限なし）",
        ]}
      />
    </div>
  )
}

export default Page
