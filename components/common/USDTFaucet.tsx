import React from "react"
import { useContractWrite } from "wagmi"
import { Button } from "@/components/ui/button"
import { USDT_FAUCET_ADDRESS } from "@/contracts/addresses"
import { useAlert } from "../alert/Alert"

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
  const alert = useAlert()

  const handleFaucetClick = async () => {
    if (isLoading) {
        return
    }
    try {
      const tx = await writeAsync()
      console.log(tx)
    } catch (error: any) {
      alert.error(error?.message?.split('The contract function "faucet" reverted with the following reason:')?.[1])
      console.error("Faucet Error", error)
    }
  }

  return (
    <div className="w-[104px] cursor-pointer rounded-11xl flex flex-row items-center justify-center py-[3.9382238388061523px] px-[7.876447677612305px]">
      <div
        className={`${
          isLoading ? "loading" : ""
        }`}
        onClick={handleFaucetClick}
      >
        {isLoading ? "Loading..." : "Get USDC Faucet"}
      </div>
    </div>
  )
}
