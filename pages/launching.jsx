import Fto from "@/components/fto/Fto"
import useCheckNetwork from "@/hooks/useCheckNetwork"
import React from "react"

const launching = () => {
  const { error } = useCheckNetwork()
  // console.log("checkNetworkError:" + error)
  return (
    <div>
      <Fto />
    </div>
  )
}

export default launching
