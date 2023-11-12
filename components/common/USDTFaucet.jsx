import React from "react"
import { useContractWrite } from "wagmi"
import { Button } from "@/components/ui/button"
import { USDT_FAUCET_ADDRESS } from "@/contracts/addresses"

const FAUCET_ABI = [
  {
    inputs: [],
    name: "faucet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
]

export default function USDTFaucet() {
  const { writeAsync, isLoading } = useContractWrite({
    address: USDT_FAUCET_ADDRESS,
    abi: FAUCET_ABI,
    functionName: "faucet"
  })

  const handleFaucetClick = async () => {
    try {
      const tx = await writeAsync()
      console.log(tx)
    } catch (error) {
      console.error("Faucet Error", error)
    }
  }

  return (
    <Button
      className={`btn btn-outline btn-ghost btn-sm fade-in ${
        isLoading ? "loading" : ""
      }`}
      onClick={handleFaucetClick}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "FAUCET $USDT"}
    </Button>
  )
}
