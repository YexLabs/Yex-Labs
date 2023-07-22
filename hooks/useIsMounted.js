import { useState, useEffect } from "react"

export function useIsMounted() {
  let [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}
