import { createContext, use, useCallback, useContext, useEffect, useRef, useState } from "react"
import Alert from "@mui/material/Alert"
import { set } from 'react-hook-form';

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
  const timer = useRef<any>()
  const setAlert = useCallback((level, message) => {
    clearTimeout(timer.current)
    setAlertLevel(level)
    setMessage(message)
    timer.current = setTimeout(() => {
      console.log("clear")
      setAlertLevel("")
      setMessage("")
    }, 3000)
  }, [setAlertLevel, setMessage])
  const info = (message: string) => {
    setAlert("info", message)
  }
  const success = (message: string) => {
    setAlert("success", message)
  }
  const error = (message: string) => {
    setAlert("error", message)
  }
  const warning = (message: string) => {
    setAlert("warning", message)
  }
  const value = {
    alertLevel,
    message,
    info,
    success,
    error,
    warning,
    
  }

  return (
      // @ts-ignore
    <AlertContext.Provider value={value}>
      <GlobalAlert></GlobalAlert>
      {children}
    </AlertContext.Provider>
  )
}
