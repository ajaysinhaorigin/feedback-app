import Card from "./shared/Card"
import { FaTimes, FaEdit } from "react-icons/fa"
import { useContext } from "react"
import { feedback } from "../context/FeedbackContext"
import FeedbackContext from "../context/FeedbackContext"

interface Props {
  item: feedback
}

function FeedbackItem({ item }: Props) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext)
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close">
        <FaTimes color="purple" onClick={() => deleteFeedback(item.id)} />
      </button>
      <button className="edit" onClick={() => editFeedback(item)}>
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}

export default FeedbackItem
