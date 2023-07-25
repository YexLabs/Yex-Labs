import SwapCard from "@/components/swap/SwapCard"
import useCheckNetwork from "@/hooks/useCheckNetwork"
import React from "react"

const swap = () => {
  const { error } = useCheckNetwork()
  // console.log("checkNetworkError:" + error)
  return (
    <div>
      <SwapCard />
    </div>
  )
}

export default swap
