import React from "react"
interface Props {
  type: "button" | "submit"
  isDisabled: boolean
  children: React.ReactNode
  version: string
}

function Button({ type, isDisabled, children, version }: Props) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version} `}>
      {children}
    </button>
  )
}
Button.defaultProps = {
  version: "primary",
  type: "button",
  isDisabled: false,
}
export default Button
