import Faucet_Mumbai from "@/components/common/Faucet_Mumbai"
import React from "react"
import { Button } from "@/components/ui/button"
import TokenDetails from "./TokenDetails"

export default function FtoCard_Header() {
  return (
    <div className="flex justify-between">
      <Faucet_Mumbai />
      <div className="flex">
        <Button onClick={() => window.tokenDetails_modal.showModal()}>
          Launch My Token
        </Button>
        <TokenDetails />
      </div>
    </div>
  )
}
