// usePoolDepositContract.js

import { useState } from "react"
import { useContractWrite, usePrepareContractWrite } from "wagmi"
import { ethers } from "ethers"
import {
  Mumbai_yexExample_address,
  Mumbai_tokenA_address,
  Mumbai_tokenB_address,
  Mumbai_yexExample_pool2_address
} from "../contracts/addresses"
import { Mumbai_faucet_abi, Mumbai_yexExample_abi } from "../contracts/abis"

const usePoolDepositContract = (
  poolSelected,
  inputAmountRef,
  inputBmountRef
) => {
  const [hash, setHash] = useState("0x")

  // approve tokenA action
  const { writeAsync: approveTokenAWrite } = useContractWrite({
    address:
      poolSelected === "pool1" ? Mumbai_tokenA_address : Mumbai_tokenB_address,
    abi: Mumbai_faucet_abi,
    functionName: "approve",
    args: [
      poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
      ethers.utils.parseEther(inputAmountRef.current?.value || "0")
    ]
  })

  // approve tokenB action
  const { writeAsync: approveTokenBWrite } = useContractWrite({
    address:
      poolSelected === "pool1" ? Mumbai_tokenA_address : Mumbai_tokenB_address,
    abi: Mumbai_faucet_abi,
    functionName: "approve",
    args: [
      poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
      ethers.utils.parseEther(inputBmountRef.current?.value || "0")
    ]
  })

  // addLiquidity action
  const { writeAsync: addLiquidityWrite } = useContractWrite({
    address:
      poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
    abi: Mumbai_yexExample_abi,
    functionName: "addLiquidity",
    args: [
      ethers.utils.parseEther(inputAmountRef.current?.value || "0"),
      ethers.utils.parseEther(inputBmountRef.current?.value || "0")
    ]
  })

  const addLiquidity = async () => {
    try {
      const approveTokenAResult = await approveTokenAWrite()
      console.log("Approve Token A Result:", approveTokenAResult)
      const approveTokenBResult = await approveTokenBWrite()
      console.log("Approve Token B Result:", approveTokenBResult)
      const addLiquidityResult = await addLiquidityWrite()
      setHash(addLiquidityResult.hash)
      console.log("Add Liquidity Result:", addLiquidityResult)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    hash,
    addLiquidity
  }
}

export default usePoolDepositContract
