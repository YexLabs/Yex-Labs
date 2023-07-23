import React, { useState, useRef } from "react"
import eth_icon from "@/assets/images/pools/eth.png"
import {
  useContractWrite,
  usePrepareContractWrite,
  useBalance,
  useAccount,
  useWaitForTransaction,
  useContractRead
} from "wagmi"
import {
  Mumbai_yexExample_address,
  Mumbai_tokenA_address,
  Mumbai_tokenB_address,
  Mumbai_yexExample_pool2_address
} from "../../../contracts/addresses"
import { Mumbai_yexExample_abi } from "../../../contracts/abis"
import { ethers } from "ethers"
import Image from "next/image"
import { toast } from "react-toastify"

const WithdrawCard_Content = ({ poolSelected }) => {
  const [hash, setHash] = useState("0x")
  const inputAmountLPRef = useRef(null)
  const [inputAmount, setInputAmount] = useState("0")
  const { address } = useAccount()
  const [isLoading_Btn, setIsLoading_Btn] = useState(false)

  const confirmation = useWaitForTransaction({
    hash: hash,
    onSuccess(data) {
      setIsLoading_Btn(false)
      toast.success("Withdraw Success!")
    }
  })

  // User LP balance
  const LPBalance = useBalance({
    address: address,
    token:
      poolSelected.poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
    watch: true
  })

  // get totalSupply LP
  const { data } = useContractRead({
    address:
      poolSelected.poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
    abi: Mumbai_yexExample_abi,
    functionName: "totalSupply"
  })
  const totalSupplyLp = data ? ethers.utils.formatUnits(data, "ether") : 1

  //获取tokenA储备
  const tokenABalance = useBalance({
    address:
      poolSelected.poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
    token: Mumbai_tokenA_address,
    watch: true
  })

  //获取tokenB储备
  const tokenBBalance = useBalance({
    address:
      poolSelected.poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
    token: Mumbai_tokenB_address,
    watch: true
  })

  // 计算预期的tokenA和tokenB数量
  const expectedTokenA = String(
    (Number(inputAmount) / totalSupplyLp) * tokenABalance.data?.formatted
  )
  const expectedTokenB = String(
    (Number(inputAmount) / totalSupplyLp) * tokenBBalance.data?.formatted
  )
  console.log(expectedTokenA, "Expected TokenA")
  console.log(expectedTokenB, "Expected TokenB")

  const handleInputChange = (event) => {
    1
  }

  // prepare approve
  const { config: approveConfig } = usePrepareContractWrite({
    address:
      poolSelected.poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
    abi: Mumbai_yexExample_abi,
    functionName: "approve",
    args: [address, ethers.utils.parseEther(inputAmount || "0")]
  })

  const approveWriteResult = useContractWrite({
    ...approveConfig,
    onError(error) {
      console.log("Approve Error", error)
    }
  })

  const { writeAsync: approveWrite } = approveWriteResult

  const approve = async () => {
    try {
      await approveWrite()
      console.log("Approved successfully")
    } catch (error) {
      console.error("Error approving", error)
    }
  }

  // removeLiquidity config
  const { config: removeLiquidityConfig } = usePrepareContractWrite({
    address:
      poolSelected.poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
    abi: Mumbai_yexExample_abi,
    functionName: "removeLiquidity",
    args: [
      ethers.utils.parseEther(inputAmount || "0"),
      0 // RemoveBoth
    ]
  })
  console.log(inputAmount, "inputAmount")
  console.log(removeLiquidityConfig, "removeLiquidityConfig")

  // removeLiquidity action
  const removeLiquidityWriteResult = useContractWrite({
    ...removeLiquidityConfig,
    onError(error) {
      console.log("Error", error)
    }
  })

  console.log(removeLiquidityWriteResult, "removeLiquidityWriteResult")

  const { writeAsync: removeLiquidityWrite } = removeLiquidityWriteResult

  const removeLiquidity = async () => {
    setIsLoading_Btn(true)
    try {
      await approve()
      console.log("Approved successfully, now removing liquidity")
      await removeLiquidityWrite().then((res) => {
        setHash(res.hash)
      })
      console.log("Liquidity removed successfully")
      setIsLoading_Btn(false)
    } catch (error) {
      setIsLoading_Btn(false)
      console.error("Error removing liquidity", error)
    }
  }

  const inputTokenPercentSelect = (value) => {
    if (inputAmountLPRef !== null) {
      inputAmountLPRef.current.value = LPBalance.data
        ? (Number(LPBalance?.data?.formatted * value) / 100).toFixed(6)
        : "0.0"
      setInputAmount(
        LPBalance.data
          ? (Number(LPBalance?.data?.formatted * value) / 100).toFixed(6)
          : "0.0"
      )
    }
  }

  return (
    <div className="flex-col mt-8">
      <div className="bg-white  bg-opacity-50 rounded-xl p-4 relative">
        <div className="flex-col">
          <div className="flex justify-between">
            <div className="text-2xl">
              <input
                type="number"
                step="0.0000001"
                placeholder="0.0"
                className="bg-transparent border-none text-3xl outline-none   w-full "
                ref={inputAmountLPRef}
                onChange={handleInputChange}
                pattern="[0-9]*"
                onKeyPress={(event) => {
                  if (!/[0-9.]/.test(event.key)) {
                    event.preventDefault()
                  }
                }}
              />
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#494c91"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
              </svg>
            </div>
          </div>
          {/* Available */}
          <div className="flex justify-between mt-3 text-gray-600 text-sm">
            <div>
              {/* {"$" +
                                inputValue.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                    useGrouping: true,
                                })} */}
            </div>
            <div className="">
              {`Balance: ${
                LPBalance.data
                  ? Number(LPBalance?.data?.formatted).toFixed(6)
                  : "0.0"
              } `}
            </div>
          </div>
          {/* 百分比选择 */}
          <div className="flex justify-start gap-7 mt-2 text-sm">
            <div
              className="w-1/5 border-slate-200 border  rounded-xl text-center py-1 hover:cursor-pointer hover:border-slate-400 ripple-btn active:border-slate-600"
              onClick={() => {
                inputTokenPercentSelect(25)
              }}
            >
              25%
            </div>
            <div
              className="w-1/5 border-slate-200 border  rounded-xl text-center py-1 hover:cursor-pointer hover:border-slate-400 ripple-btn active:border-slate-600"
              onClick={() => {
                inputTokenPercentSelect(50)
              }}
            >
              50%
            </div>
            <div
              className="w-1/5 border-slate-200 border  rounded-xl text-center py-1 hover:cursor-pointer hover:border-slate-400 ripple-btn active:border-slate-600"
              onClick={() => {
                inputTokenPercentSelect(75)
              }}
            >
              75%
            </div>
            <div
              className="w-1/5 border-slate-200 border  rounded-xl text-center py-1 hover:cursor-pointer hover:border-slate-400 ripple-btn active:border-slate-600"
              onClick={() => {
                inputTokenPercentSelect(100)
              }}
            >
              100%
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white  bg-opacity-50 rounded-xl p-4 relative mt-4">
        <div className="flex-col">
          <div className="flex flex-row justify-between">
            {/* <button className=" text-center w-full py-2 border border-indigo-500 rounded-xl ripple-btn text-indigo-400">
                            Single
                        </button> */}
            {/* <button className=" text-center w-full py-2 border border-indigo-500 rounded-xl ripple-btn text-indigo-400">
                            Balanced
                        </button> */}
          </div>
          <hr className="mt-4" />
          <div className="flex flex-col">
            <p className="text-sm font-normal mt-4">Expected to receive</p>
            <div className="flex flex-row justify-between mt-4">
              <div className="flex flex-row">
                <div className="w-10 h-10 p-2">
                  <Image src={eth_icon} className="w-10 h-10" />
                </div>
                <p className="p-2">TokenA</p>
              </div>
              <p>{`${
                expectedTokenA ? Number(expectedTokenA).toFixed(6) : "0.0"
              } `}</p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <div className="w-10 h-10 p-2">
                  <Image src={eth_icon} className="w-10 h-10" />
                </div>
                <p className="p-2">TokenB</p>
              </div>
              <p>{`${
                expectedTokenB ? Number(expectedTokenB).toFixed(6) : "0.0"
              } `}</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white  bg-opacity-50 rounded-xl p-4 relative mt-4">
        <div className="flex-col">
          <div className="flex flex-row justify-between">
            <p>Slippage</p>
            <p>0%</p>
          </div>
          <div
            className="flex justify-center items-center text-center font-semibold w-full mt-5 h-12 bg-indigo-400 text-white hover:cursor-pointer py-2 rounded-xl ripple-btn"
            onClick={removeLiquidity}
          >
            {isLoading_Btn && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin h-5 w-5 mr-3 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Withdraw
          </div>
        </div>
      </div>
    </div>
  )
}

export default WithdrawCard_Content
