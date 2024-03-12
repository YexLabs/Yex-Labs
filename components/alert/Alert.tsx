import { createContext, useContext, useEffect, useState } from "react"
import Alert from "@mui/material/Alert"

export const AlertContext = createContext({
  alertLevel: "",
  message: "",
  info(message: string) {},
  success(message: string) {},
  error(message: string) {},
  warning(message: string) {}
})

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error("useAlert must be used within a AlertProvider")
  }
  return context
}

export const GlobalAlert = () => {
  const context = useContext(AlertContext)
  const { alertLevel, message } = context
  switch (alertLevel) {
    case "info":
      return <Alert severity="info">{message}</Alert>
    case "success":
      return <Alert severity="success">{message}</Alert>
    case "error":
      return <Alert severity="error">{message}</Alert>
    case "warning":
      return <Alert severity="warning">{message}</Alert>
    default:
      return null
  }
}

export const AlertProvider = ({ children }) => {
  const [alertLevel, setAlertLevel] = useState("")
  const [message, setMessage] = useState("")
  const info = (message: string) => {
    setAlertLevel("info")
    setMessage(message)
  }
  const success = (message: string) => {
    setAlertLevel("success")
    setMessage(message)
  }
  const error = (message: string) => {
    setAlertLevel("error")
    setMessage(message)
  }
  const warning = (message: string) => {
    setAlertLevel("warning")
    setMessage(message)
  }
  const value = {
    alertLevel,
    message,
    info,
    success,
    error,
    warning,
    
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertLevel("")
      setMessage("")
    }, 3000)
    return () => clearTimeout(timer)
  })

  return (
      // @ts-ignore
    <AlertContext.Provider value={value}>
      <GlobalAlert></GlobalAlert>
      {children}
    </AlertContext.Provider>
  )
}
