import SwapCard from "@/components/swap/SwapCard"
import useCheckNetwork from "@/hooks/useCheckNetwork"
import React from "react"

const launchpad = () => {
  const { error } = useCheckNetwork()
  // console.log("checkNetworkError:" + error)
  return <div>launchpad</div>
}

export default launchpad
