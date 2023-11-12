import USDTFaucet from "@/components/common/USDTFaucet"
import React from "react"
import { useAccount } from "wagmi"

const PortCard_Header = () => {
  const { address } = useAccount()

  const formatAddress = (address) => {
    if (address) {
      return address.slice(0, 4) + "...." + address.slice(-4)
    }
    return address
  }

  return (
    <div className="flex justify-between">
      <USDTFaucet />
      <div className="flex">
        <div>{formatAddress(address)}</div>
      </div>
    </div>
  )
}

export default PortCard_Header
