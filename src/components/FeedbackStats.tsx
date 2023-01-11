import { useContext } from "react"
import FeedbackContext from "../context/FeedbackContext"
type averageType = number | string

function FeedbackStats() {
  //calculate ratings avg
  const { feedback } = useContext(FeedbackContext)
  let average: averageType =
    feedback.reduce((acc, crr) => {
      return acc + crr.rating
    }, 0) / feedback.length
  average = average.toFixed(1).replace(/[/.,]0$/, "")

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews </h4>
      <h4>Average Rating: {average}</h4>
    </div>
  )
}

export default FeedbackStats
