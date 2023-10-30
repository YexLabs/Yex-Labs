import React, { useState } from "react"
import {
  MUMBAI_ILO_TOKENA_ADDRESS,
  MUMBAI_ILO_TOKENB_ADDRESS
  // ILO_ADDRESS
} from "../contracts/addresses"
import { MUMBAI_YEX_ILO_EXAMPLE_ABI } from "../contracts/abis"
import YEX_ILO_ABI from "../contracts/abis/YexILOExample.json"
import { useAccount, useContractRead, useContractWrite } from "wagmi"
import { ethers } from "ethers"
import { toast } from "react-toastify"

export default function useILOContract(tokenAddress) {
  const ILO_ADDRESS = tokenAddress
  const { address } = useAccount()
  const [amountA, setAmountA] = useState("0")
  const [depositLoading, setDepositLoading] = useState(false)
  const { data: totalSupply, isLoading: isTotalSupplyLoading } =
    useContractRead({
      address: ILO_ADDRESS,
      abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
      functionName: "totalSupply"
    })

  const { writeAsync: addLiquidityWrite } = useContractWrite({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "addLiquidity",
    account: address,
    args: [ethers.utils.parseEther("0.5"), ethers.utils.parseEther("1")]
  })

  const { writeAsync: approveTokenAWrite } = useContractWrite({
    address: MUMBAI_ILO_TOKENA_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "approve",
    args: [ILO_ADDRESS, ethers.utils.parseEther("100")],
    onError(error) {
      setDepositLoading(false)
      console.log("Error", error)
    },
    onSuccess() {
      toast.success("Approve TTA Success!")
    }
  })

  const { writeAsync: approveTokenBWrite } = useContractWrite({
    address: MUMBAI_ILO_TOKENB_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "approve",
    args: [ILO_ADDRESS, ethers.utils.parseEther("100")],
    onError(error) {
      console.log("Error", error)
    }
  })

  const { writeAsync: depositWrite } = useContractWrite({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "depositTokenA",
    account: address,
    args: [ethers.utils.parseEther(amountA), ethers.utils.parseEther("0")],
    onError(error) {
      setDepositLoading(false)
      console.log("Error", error)
    },
    onSuccess() {
      setDepositLoading(false)
      toast.success("Deposit Success!")
    }
  })

  const { writeAsync: claimLPWrite } = useContractWrite({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "claimLP",
    account: address,
    args: [address],
    onError(error) {
      setDepositLoading(false)
      console.log("Error", error)
    },
    onSuccess() {
      setDepositLoading(false)
      toast.success("Deposit Success!")
    }
  })

  const { writeAsync: performUpKeepWrite } = useContractWrite({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "performUpkeep",
    account: address,
    args: ["0x"],
    onError(error) {
      console.log("Error", error)
    }
  })

  const { writeAsync: setRasingPaused } = useContractWrite({
    address: ILO_ADDRESS,
    abi: YEX_ILO_ABI,
    functionName: "setRasingPaused",
    onError(error) {
      console.log("Error", error)
    },
    onSuccess() {
      setDepositLoading(false)
      toast.success("LP allocated Success!")
    }
  })

  const { data: lockedTokenB } = useContractRead({
    address: ILO_ADDRESS,
    abi: YEX_ILO_ABI,
    functionName: "deposited_TokenB"
  })

  const { data: depositedTokenA } = useContractRead({
    address: ILO_ADDRESS,
    abi: YEX_ILO_ABI,
    functionName: "deposited_TokenA"
  })

  const { data: isPaused } = useContractRead({
    address: ILO_ADDRESS,
    abi: YEX_ILO_ABI,
    functionName: "ftoState"
  })

  const { data: claimableLP } = useContractRead({
    address: ILO_ADDRESS,
    abi: YEX_ILO_ABI,
    functionName: "claimableLP",
    args: [address]
  })

  return {
    approveTokenAWrite,
    approveTokenBWrite,
    setAmountA,
    depositWrite,
    claimLPWrite,
    addLiquidityWrite,
    performUpKeepWrite,
    setRasingPaused,
    setDepositLoading,
    depositLoading,
    isPaused,
    lockedTokenB,
    depositedTokenA,
    totalSupply,
    claimableLP
  }
}
