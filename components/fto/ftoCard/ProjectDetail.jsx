import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useContractRead } from "wagmi"
import { FTO_FACTORY_ADDRESS } from "@/contracts/addresses"
import {
  MUBAI_FTO_FACTORY_ABI,
  MUBAI_FTO_PAIR_ABI,
  ERC20_ABI
} from "@/contracts/abis"
import { formatEther } from "viem"

export default function ProjectDetail({ index }) {
  const [price, setPrice] = useState(0)
  const router = useRouter()

  const { data: pairAddress } = useContractRead({
    address: FTO_FACTORY_ADDRESS,
    abi: MUBAI_FTO_FACTORY_ABI,
    functionName: "allPairs",
    args: [index]
  })

  const { data: name } = useContractRead({
    address: pairAddress,
    abi: ERC20_ABI,
    functionName: "name"
  })

  const { data: tokenA } = useContractRead({
    address: pairAddress,
    abi: MUBAI_FTO_PAIR_ABI,
    functionName: "deposited_TokenA"
  })

  const { data: tokenB } = useContractRead({
    address: pairAddress,
    abi: MUBAI_FTO_PAIR_ABI,
    functionName: "deposited_TokenB"
  })

  console.log(index, "index index index")
  console.log(tokenA, tokenB, index, "index token A and B")

  useEffect(() => {
    if (tokenA && tokenB) {
      const FloatTokenA = formatEther(tokenA)
      const FloatTokenB = formatEther(tokenB)
      console.log(
        FloatTokenA,
        FloatTokenB,
        index,
        "index+++++++++++++++++++++++++++"
      )

      setPrice(FloatTokenB / FloatTokenA)
    }
  }, [tokenA, tokenB])

  console.log(price, "price")

  const { data: end_time } = useContractRead({
    address: pairAddress,
    abi: MUBAI_FTO_PAIR_ABI,
    functionName: "end_time"
  })

  const calculateTimeLeft = () => {
    const currentTime = Math.floor(Date.now() / 1000)
    const timeDiff = Number(end_time) - currentTime

    const hours = Math.floor(timeDiff / 3600)
    const minutes = Math.floor((timeDiff % 3600) / 60)
    const seconds = timeDiff % 60

    return `${hours}h ${minutes}m ${seconds}s`
  }

  const timeLeft = end_time ? calculateTimeLeft() : "Loading..."

  const handleHackathonClick = (id) => {
    router.push("/ilo" + "/" + id)
  }

  return (
    <div
      onClick={() => handleHackathonClick("1")}
      key={index}
      className={`p-2 border rounded ${
        "status" === "ongoing" ? "" : ""
      } hover:bg-gray-200 hover:cursor-pointer hover:border-4 hover:border-indigo-100 hover:shadow-lg 
                        transition-all ease-in-out duration-300`}
    >
      <span className="font-medium">{name} price: </span>
      {price.toString()} <span className="font-medium">Timeline: </span>
      {timeLeft} <span className="font-medium">Total Raised: </span>
      {tokenB}{" "}
      <span
        className={`font-medium text-${
          "status" === "ongoing" ? "green" : "red"
        }-600`}
      >
        {"status".toUpperCase() + status.slice(1)}
      </span>
    </div>
  )
}
