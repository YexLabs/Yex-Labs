import PortFolio from "@/components/fto/PortFolio"
import SwapCard from "@/components/swap/SwapCard"
import useCheckNetwork from "@/hooks/useCheckNetwork"
import React from "react"

const portfolio = () => {
  const { error } = useCheckNetwork()
  // console.log("checkNetworkError:" + error)
  return (
    <div>
      <PortFolio />
    </div>
  )
}

export default portfolio
