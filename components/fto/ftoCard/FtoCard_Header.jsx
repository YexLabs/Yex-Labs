import React from "react"
import { Button } from "@/components/ui/button"
import TokenDetails from "./TokenDetails"
import USDTFaucet from "@/components/common/USDTFaucet"

export default function FtoCard_Header() {
  return (
    <div className="flex justify-between">
      <USDTFaucet />
      <div className="flex">
        <Button onClick={() => window.tokenDetails_modal.showModal()}>
          Launch My Token
        </Button>
        <TokenDetails />
      </div>
    </div>
  )
}
