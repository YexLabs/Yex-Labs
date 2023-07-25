import useCheckNetwork from "@/hooks/useCheckNetwork"
import React from "react"

const swap = () => {
  const { error } = useCheckNetwork()
  // console.log("checkNetworkError:" + error)
  return <div>swap</div>
}

export default swap
