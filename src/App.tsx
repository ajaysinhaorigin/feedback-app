import "./App.css"
import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import FeedbackList from "./components/FeedbackList"
import FeedbackForm from "./components/FeedbackForm"
import { FeedbackContextProvider } from "./context/FeedbackContext"
import AboutPage from "./pages/AboutPage"
import AboutIconLink from "./components/AboutIconLink"
import FeedbackStats from "./components/FeedbackStats"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <>
      <FeedbackContextProvider>
        <Header />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            ></Route>
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <AboutIconLink />
        </div>
        <ToastContainer />
      </FeedbackContextProvider>
    </>
  )
}

export default App
