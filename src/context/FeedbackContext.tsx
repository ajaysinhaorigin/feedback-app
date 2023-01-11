import { useState, createContext, useEffect } from "react"
import { toast } from "react-toastify"
export interface feedback {
  id: string
  rating: number
  text: string
}
type editFeedbackType = {
  item: any
  edit: boolean
}
type Props = {
  children: React.ReactNode
}

const useFeedback = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [feedback, setFeedback] = useState<feedback[]>([])

  const [feedbackEdit, setFeedbackEdit] = useState<editFeedbackType>({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  //Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_POST_URL}?_sort=id&_order=desc`
    )
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  //add feedback
  const addFeedback = async (newFeedback: feedback) => {
    const response = await fetch(`${process.env.REACT_APP_POST_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()
    setFeedback([data, ...feedback])
    // toast.success("Added Successfully" )
  }

  // delete feedback
  const deleteFeedback = async (id: string) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      await fetch(`${process.env.REACT_APP_POST_URL}/${id}`, {
        method: "DELETE",
      })
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  //Update feedback item
  const updateFeedback = async (id: string, updItem: feedback) => {
    const response = await fetch(`${process.env.REACT_APP_POST_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    })

    const data = await response.json()

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
  }

  // set item to be updated
  const editFeedback = (item: feedback) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }
  return {
    feedback,
    feedbackEdit,
    isLoading,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback,
  }
}

const FeedbackContext = createContext({} as ReturnType<typeof useFeedback>)

export const FeedbackContextProvider = ({ children }: Props) => {
  return (
    <FeedbackContext.Provider value={useFeedback()}>
      {children}
    </FeedbackContext.Provider>
  )
}
export default FeedbackContext
