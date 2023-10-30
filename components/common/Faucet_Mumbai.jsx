//@xiaochen
import React from "react"
import {
  useAccount,
  useContractRead,
  useContractReads,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from "wagmi"
import {
  Mumbai_tokenA_address,
  Mumbai_tokenB_address,
  MUMBAI_ILO_TOKENA_ADDRESS
} from "@/contracts/addresses"
import { Mumbai_faucet_abi } from "@/contracts/abis"
import { ethers } from "ethers"
import { formatEther } from "viem"
import { Button } from "@/components/ui/button"

export default function Faucet_Mumbai() {
  const { address } = useAccount()
  const [isFaucted_A, setIsFaucted_A] = React.useState(false)
  const [isFaucted_B, setIsFaucted_B] = React.useState(false)
  const [isFaucted_ILOA, setIsFaucted_ILOA] = React.useState(false)
  const [ableFaucted_A, setAbleFaucted_A] = React.useState(false)
  const [ableFaucted_B, setAbleFaucted_B] = React.useState(false)
  const [ableILOFaucted_A, setAbleILOFaucted_A] = React.useState(false)
  const [isLoading_A, setIsLoading_A] = React.useState(false)
  const [isLoading_B, setIsLoading_B] = React.useState(false)
  const [isLoading_ILOA, setIsLoading_ILOA] = React.useState(false)
  const [tokenA_balance, setTokenABalance] = React.useState(0)
  const [tokenB_balance, setTokenBBalance] = React.useState(0)
  const [tokenILOA_balance, settokenILOA_balance] = React.useState(0)
  const [hash, setHash] = React.useState("")
  const faucetClick_A = () => {
    if (isFaucted_A) {
      // message.error("You have already got tokenA")
    } else {
      setIsLoading_A(true)
      faucetAConfigWrite?.()
        .then((res) => {
          console.log(res)
          setHash(res.hash)
        })
        .catch((err) => {
          setIsLoading_A(false)
        })
    }
  }
  const faucetClick_B = () => {
    if (isFaucted_B) {
      // message.error("You have already got tokenB")
    } else {
      setIsLoading_B(true)
      faucetBConfigWrite?.()
        .then((res) => {
          console.log(res)
          setHash(res.hash)
        })
        .catch((err) => {
          setIsLoading_B(false)
        })
    }
  }
  const faucetClick_ILOA = () => {
    if (isFaucted_ILOA) {
      // message.error("You have already got tokenB")
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
      setIsLoading_A(false)
      setIsLoading_B(false)
      // message.success({
      //   content: "success",
      //   duration: 1,
      //   className: "mt-3"
      // })
    }
  })

  const faucetTokenA_Config = {
    address: Mumbai_tokenA_address,
    abi: Mumbai_faucet_abi
  }

  const faucetTokenB_Config = {
    address: Mumbai_tokenB_address,
    abi: Mumbai_faucet_abi
  }

  // ILO TokenA
  const faucetILOTokenA_Config = {
    address: MUMBAI_ILO_TOKENA_ADDRESS,
    abi: Mumbai_faucet_abi
  }

  // 获取两种测试币的状态
  const getRouterInfo = useContractReads({
    contracts: [
      {
        ...faucetTokenA_Config,
        functionName: "faucetedList",
        args: [address]
      },
      {
        ...faucetTokenB_Config,
        functionName: "faucetedList",
        args: [address]
      },
      {
        ...faucetILOTokenA_Config,
        functionName: "faucetedList",
        args: [address]
      },
      {
        ...faucetTokenA_Config,
        functionName: "balanceOf",
        args: [address]
      },
      {
        ...faucetTokenB_Config,
        functionName: "balanceOf",
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
      console.log(data)
      setIsFaucted_A(data[0].result)
      setIsFaucted_B(data[1].result)
      setIsFaucted_ILOA(data[2].result)
      setAbleFaucted_A(!data[0].result)
      setAbleFaucted_B(!data[1].result)
      setAbleILOFaucted_A(!data[2].result)

      setTokenABalance(
        Number(formatEther(data[3]?.result || 0))
          .toFixed(6)
          .replace(/\.?0+$/, "")
      )
      console.log(
        "tokenA balance",
        Number(formatEther(data[3].result || 0))
          .toFixed(6)
          .replace(/\.?0+$/, "")
      )
      setTokenBBalance(
        Number(formatEther(data[4].result || 0))
          .toFixed(6)
          .replace(/\.?0+$/, "")
      )
      settokenILOA_balance(
        Number(formatEther(data[5].result || 0))
          .toFixed(6)
          .replace(/\.?0+$/, "")
      )
    }
  })

  // get tokenD balance
  // const getTokeDBalance = useContractRead({
  //   address: Mumbai_tokenA_address,
  //   abi: Mumbai_faucet_abi,
  //   functionName: "balanceOf",
  //   args: [address],
  //   watch: true,
  //   onSuccess(data) {
  //     const amount = ethers.utils.formatUnits(data, "ether");
  //     setTokenABalance(amount);
  //   },
  // });

  // Faucet config
  const { config: faucetAConfig } = usePrepareContractWrite({
    address: Mumbai_tokenA_address,
    abi: Mumbai_faucet_abi,
    functionName: "faucet",
    args: [],
    account: address,
    enabled: ableFaucted_A
  })
  // Faucet
  const {
    data: faucetConfigData,
    isSuccess,
    writeAsync: faucetAConfigWrite
  } = useContractWrite({
    ...faucetAConfig,
    onError(error) {
      console.log("Error", error)
    }
  })

  // Faucet config
  const { config: faucetBConfig } = usePrepareContractWrite({
    address: Mumbai_tokenB_address,
    abi: Mumbai_faucet_abi,
    functionName: "faucet",
    args: [],
    account: address,
    enabled: ableFaucted_B
  })
  // Faucet
  const { writeAsync: faucetBConfigWrite } = useContractWrite({
    ...faucetBConfig,
    onError(error) {
      console.log("Error", error)
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
    <div className=" z-20">
      <Button
        className={`btn btn-outline btn-ghost btn-sm fade-in ${
          address ? "" : "hidden"
        } ${isLoading_A ? " loading text-black " : ""} ${
          isFaucted_A ? "disabled:bg-slate-300 disabled:text-gray-500" : ""
        }`}
        onClick={faucetClick_A}
        disabled={isFaucted_A}
      >
        {isLoading_A ? "loading" : "Faucet $A"}
        {/* {"Faucet" + " : " + tokenA_balance + " " + "$A"} */}
      </Button>
      <Button
        className={`btn btn-outline ml-2 btn-ghost btn-sm fade-in ${
          address ? "" : "hidden"
        } ${isLoading_B ? " loading  text-black" : ""} ${
          isFaucted_B ? "disabled:bg-slate-300 disabled:text-gray-500" : ""
        } `}
        onClick={faucetClick_B}
        disabled={isFaucted_B}
      >
        {isLoading_B ? "loading" : "Faucet $B"}
        {/* {"Faucet" + " : " + tokenB_balance + " " + "$B"} */}
      </Button>
      {/* <button
        className={`btn btn-outline ml-2 btn-ghost btn-sm fade-in ${
          address ? "" : "hidden"
        } ${isLoading_ILOA ? " loading" : ""} `}
        onClick={faucetClick_ILOA}
      >
        {"Faucet" + " : " + tokenILOA_balance + " " + "$TTA"}
      </button> */}
    </div>
  )
}
