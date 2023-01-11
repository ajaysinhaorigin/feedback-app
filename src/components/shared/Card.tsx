import React from "react"
interface Props {
  children: React.ReactNode
  reverse: boolean
}

function Card({ children, reverse }: Props) {
  return (
    <div
      className="card"
      style={{
        backgroundColor: reverse ? "rgba(0,0,0,0.4)" : "#fff",
        color: reverse ? "#fff" : "#000",
      }}
    >
      {children}
    </div>
  )
}
Card.defaultProps = {
  reverse: false,
}

export default Card
