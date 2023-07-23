import {
  MUMBAI_ILO_TOKENA_ADDRESS,
  MUMBAI_ILO_TOKENB_ADDRESS,
  ILO_ADDRESS
} from "../contracts/addresses"
import { MUMBAI_YEX_ILO_EXAMPLE_ABI } from "../contracts/abis"
import { useAccount, useContractRead, useContractWrite } from "wagmi"
import { ethers } from "ethers"

export default function useILOContract() {
  const address = useAccount()
  const { data: totalSupply, isLoading: isTotalSupplyLoading } =
    useContractRead({
      address: ILO_ADDRESS,
      abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
      functionName: "totalSupply"
    })
  const { data: checkUpKeep, isLoading: isCheckUpKeepLoading } =
    useContractRead({
      address: ILO_ADDRESS,
      abi: MUMBAI_YEX_ILO_EXAMPLE_ABI,
      functionName: "checkUpkeep",
      args: ["0x"]
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
      console.log("Error", error)
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
    functionName: "deposit",
    account: address,
    args: [ethers.utils.parseEther("0.1"), ethers.utils.parseEther("1")],
    onError(error) {
      console.log("Error", error)
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

  return {
    approveTokenAWrite,
    approveTokenBWrite,
    depositWrite,
    addLiquidityWrite,
    performUpKeepWrite,
    totalSupply,
    checkUpKeep,
    isLoading: isTotalSupplyLoading || isCheckUpKeepLoading
  }
}
