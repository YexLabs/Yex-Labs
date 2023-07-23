//@xiaochen
import React from "react"
import {
  useAccount,
  useContractReads,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from "wagmi"
import { MUMBAI_ILO_TOKENA_ADDRESS } from "../../contracts/addresses"
import { Mumbai_faucet_abi } from "../../contracts/abis"
import { toast } from "react-toastify"
import { ethers } from "ethers"

export default function Faucet_Mumbai() {
  const { address } = useAccount()
  const [isFaucted_ILOA, setIsFaucted_ILOA] = React.useState(false)
  const [ableILOFaucted_A, setAbleILOFaucted_A] = React.useState(false)
  const [isLoading_ILOA, setIsLoading_ILOA] = React.useState(false)
  const [tokenILOA_balance, settokenILOA_balance] = React.useState(0)
  const [hash, setHash] = React.useState("")
  const faucetClick_ILOA = () => {
    if (isFaucted_ILOA) {
      toast.error("You have already got tokenB")
    } else {
      setIsLoading_ILOA(true)
      faucetILOAConfigWrite?.()
        .then((res) => {
          console.log(res)
          setHash(res.hash)
        })
        .catch((err) => {
          setIsLoading_ILOA(false)
        })
    }
  }

  // confirmation
  const confirmation = useWaitForTransaction({
    hash: hash,
    onSuccess(data) {
      setIsLoading_ILOA(false)
      toast.success("get TTA success!")
    }
  })

  // ILO TokenA
  const faucetILOTokenA_Config = {
    address: MUMBAI_ILO_TOKENA_ADDRESS,
    abi: Mumbai_faucet_abi
  }

  // 获取两种测试币的状态
  const getRouterInfo = useContractReads({
    contracts: [
      {
        ...faucetILOTokenA_Config,
        functionName: "faucetedList",
        args: [address]
      },
      {
        ...faucetILOTokenA_Config,
        functionName: "balanceOf",
        args: [address]
      }
    ],
    watch: true,
    enabled: true,
    onSuccess(data) {
      setIsFaucted_ILOA(data[0])
      setAbleILOFaucted_A(data[0])
      // settokenILOA_balance(
      //   Number(ethers.utils.formatUnits(data[1], "ether"))
      //     .toFixed(6)
      //     .replace(/\.?0+$/, "")
      // )
    }
  })

  // ILO Faucet config
  const { config: faucetILOAConfig } = usePrepareContractWrite({
    address: MUMBAI_ILO_TOKENA_ADDRESS,
    abi: Mumbai_faucet_abi,
    functionName: "faucet",
    args: [],
    account: address,
    enabled: ableILOFaucted_A
  })
  // ILO Faucet
  const { writeAsync: faucetILOAConfigWrite } = useContractWrite({
    ...faucetILOAConfig,
    onError(error) {
      console.log("Error", error)
    }
  })

  return (
    <div>
      <button
        className={`btn btn-outline ml-2 btn-ghost btn-sm fade-in ${
          address ? "" : "hidden"
        } ${isLoading_ILOA ? " loading" : ""} `}
        onClick={faucetClick_ILOA}
      >
        {"Faucet" + " : " + tokenILOA_balance + " " + "$TTA"}
      </button>
    </div>
  )
}
