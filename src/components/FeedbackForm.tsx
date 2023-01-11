import { useState, useContext, useEffect } from "react"
import RatingSelect from "./RatingSelect"
import Button from "./shared/Button"
import Card from "./shared/Card"
import { v4 as uuidv4 } from "uuid"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
  const [text, setText] = useState<string>("")
  const [rating, setRating] = useState<number>(10)
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true)
  const [message, setMessage] = useState<string | null>("")

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (text === "") {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== "" && text.trim().length <= 10) {
      setMessage("Text must be at least 10 characters")
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeedback = {
        id: uuidv4(),
        rating,
        text,
      }
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
      setText("")
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us ?</h2>
        <RatingSelect select={(rating: number) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
