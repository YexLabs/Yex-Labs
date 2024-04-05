import React, { useCallback, useState } from "react"
import {
  MUMBAI_ILO_TOKENA_ADDRESS,
  MUMBAI_ILO_TOKENB_ADDRESS,
  FTO_FACADE_ADDRESS
  // ILO_ADDRESS
} from "../contracts/addresses"
import {
  MUMBAI_YEX_ILO_EXAMPLE_ABI,
  MUBAI_FTO_PAIR_ABI,
  MUBAI_FTO_FACADE_ABI
} from "../contracts/abis"

import {
  useAccount,
  useContractRead,
  useContractWrite,
  useBalance,
  erc20ABI,
  useWaitForTransaction
} from "wagmi"
import { ethers } from "ethers"
import { toast } from "react-toastify"

export default function useILOContract(tokenAddress) {
  const ILO_ADDRESS = tokenAddress
  const MUMBAI_YEX_ILO_EXAMPLE_ABI = MUBAI_FTO_PAIR_ABI
  const { address } = useAccount()
  const [depositAmount, setDepositAmount] = useState("0")
  const [depositLoading, setDepositLoading] = useState(false)
  const { data: tokenB } = useContractRead({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "tokenB"
  })

  const {data: tokenBName} = useContractRead({
    address: tokenB,
    abi: erc20ABI,
    functionName: "name"
  })

  const { data: tokenA } = useContractRead({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "tokenA"
  })

  const { data: tokenB_provider } = useContractRead({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "tokenB_provider"
  })

  const { refetch: refetchTokenABalance, data: tokenAbalanceData } = useBalance({
    token: tokenA,
    address: address
  })

  const { refetch: refetchTokenBBalance, data: tokenBbalanceData } = useBalance({
    token: tokenB,
    address: address
  })

  const { data: totalSupply, isLoading: isTotalSupplyLoading } =
    useContractRead({
      address: tokenB,
      abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
      functionName: "totalSupply"
    })

  const { writeAsync: addLiquidityWrite } = useContractWrite({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "addLiquidity",
    account: address,
    args: [ethers.utils.parseEther("0.5"), ethers.utils.parseEther("1")],
    onError(error) {
      toast.error(error.shortMessage)
    }
  })

  const {  refetch: allownedTokenToFTORefetch, data: allownedTokenToFTO } = useContractRead({
    address: tokenA,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address, FTO_FACADE_ADDRESS],
    onError(error) {
      setDepositLoading(false)
      console.log("Error", error)
    },
    onSuccess() {
      // toast.success("allownedTokenToFTO!")
    }
  })

  const { data: approveTokenAData, writeAsync: approveTokenAWrite } = useContractWrite({
    address: tokenA,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "approve",
    args: [FTO_FACADE_ADDRESS, ethers.constants.MaxInt256],
    onError(error) {
      setDepositLoading(false)
      toast.error(error.shortMessage)
      console.log("Error", error)
    },
  })
  useWaitForTransaction({
    hash: approveTokenAData?.hash,
    onError(error) {
      setDepositLoading(false)
      toast.error(error.shortMessage)
      console.log("Error", error)
    },
    onSuccess () {
      allownedTokenToFTORefetch()
      toast.success("Approve Success!")
    }
  })

  const { writeAsync: approveTokenBWrite } = useContractWrite({
    address: MUMBAI_ILO_TOKENB_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "approve",
    args: [ILO_ADDRESS, ethers.constants.MaxInt256],
    onError(error) {
      console.log("Error", error)
    },
    onSuccess() {
  
    }
  })

  const { data:depositData,  writeAsync: depositWrite } = useContractWrite({
    address: FTO_FACADE_ADDRESS,
    abi: MUBAI_FTO_FACADE_ABI,
    functionName: "deposit",
    account: address,
    args: [
      tokenA,
      tokenB,
      ethers.utils.parseEther(depositAmount || "0"),
      ethers.utils.parseEther("0")
    ],
    onError(error) {
      setDepositLoading(false)
      toast.error(error.shortMessage)
      console.log("Error", error)
    },
  })
  useWaitForTransaction({
    hash: depositData?.hash,
    onError(error) {
      setDepositLoading(false)
      toast.error(error.shortMessage)
      console.log("Error", error)
    },
    onSuccess () {
      setDepositLoading(false)
      refetchTokenABalance()
      toast.success("Deposit Success!")
    }
  })

  const { data: claimLPData, writeAsync: claimLPWrite } = useContractWrite({
    address: FTO_FACADE_ADDRESS,
    abi: MUBAI_FTO_FACADE_ABI,
    functionName: "claimLP",
    account: address,
    args: [tokenA, tokenB],
    onError(error) {
      setDepositLoading(false)
      toast.error(error.shortMessage)
      // toast.error(error.shortMessage)
    },
  })
  useWaitForTransaction({
    hash: claimLPData?.hash,
    onError(error) {
      setDepositLoading(false)
      toast.error(error.shortMessage)
      console.log("Error", error)
    },
    onSuccess () {
      refetchTokenABalance()
      setDepositLoading(false)
      toast.success("CliaimLP Success!")
    }
  })

  const { data: providerData, writeAsync: providerWithdraw } = useContractWrite({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "withdraw",
    account: address,
    args: [address],
    onError(error) {
      setDepositLoading(false)
      toast.error(error.shortMessage)
      console.log("Error", error)
    },
  })

  useWaitForTransaction({
    hash: providerData?.hash,
    onError(error) {
      setDepositLoading(false)
      toast.error(error.shortMessage)
      console.log("Error", error)
    },
    onSuccess () {
      refetchTokenABalance()
      setDepositLoading(false)
      toast.success("CliaimLP Success!")
    }
  })

  const { writeAsync: performUpKeepWrite } = useContractWrite({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "performUpkeep",
    account: address,
    args: ["0x"],
    onError(error) {
      toast.error(error.shortMessage)
    }
  })

  const { writeAsync: setRasingPaused } = useContractWrite({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "setRasingPaused",
    onError(error) {
      toast.error(error.shortMessage)
      console.log("Error", error)
    },
    onSuccess() {
      setDepositLoading(false)
      toast.success("LP allocated Success!")
    }
  })

  const { data: lockedTokenB } = useContractRead({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "deposited_TokenB"
  })

  const { data: depositedTokenA } = useContractRead({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "deposited_TokenA"
  })

  const { data: ftoState } = useContractRead({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "ftoState"
  })

  const { data: claimableLP } = useContractRead({
    address: ILO_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "claimableLP",
    args: [address]
  })

  return {
    approveTokenAWrite,
    approveTokenBWrite,
    setDepositAmount,
    depositWrite,
    claimLPWrite,
    addLiquidityWrite,
    performUpKeepWrite,
    setRasingPaused,
    setDepositLoading,
    depositLoading,
    ftoState,
    lockedTokenB,
    depositedTokenA,
    totalSupply,
    claimableLP,
    tokenA,
    tokenB,
    tokenBName,
    tokenB_provider,
    tokenAbalanceData,
    tokenBbalanceData,
    providerWithdraw,
    allownedTokenToFTO,
    refetchTokenABalance,
    refetchTokenBBalance
  }
}

export const useFaucetContract = () => {
  return useContractWrite({
    address: USDT_FAUCET_ADDRESS,
    abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
    functionName: "mint",
    account: address,
    args: [ethers.utils.parseEther("100")]
  })
}