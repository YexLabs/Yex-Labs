import { Launching } from "@/components/dreampad/launching"
import Fto from "@/components/fto/Fto"
import useCheckNetwork from "@/hooks/useCheckNetwork"
import React from "react"

const launching = () => {
  const { error } = useCheckNetwork()
  // console.log("checkNetworkError:" + error)
  return (
    <div className="flex flex-col items-center">
      <Launching />
    </div>
  )
}

export default launching
