import React from "react"
import { useRouter } from "next/router"
import { useContractRead } from "wagmi"

const projects = [
  {
    id: 0,
    status: "ongoing",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "5d:20h:20m:30s",
    totalRaised: 115333.01
  },
  {
    id: 1,
    status: "ongoing",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "5d:20h:20m:30s",
    totalRaised: 115333.01
  },
  {
    id: 2,
    status: "ongoing",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "5d:20h:20m:30s",
    totalRaised: 115333.01
  },
  {
    id: 3,
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  },
  {
    id: 4,
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  },
  {
    id: 5,
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  },
  {
    id: 6,
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  },
  {
    id: 7,
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  }
  // 如果有更多项目，继续添加，并确保每个新项目的 id 是自增的。
]

export default function FTOList() {
  const {
    data: allPairs,
    isError,
    isLoading
  } = useContractRead({
    address: "address",
    abi: "abi",
    functionName: "allPairs"
  })

  const router = useRouter()

  const handleHackathonClick = (id) => {
    router.push("/ilo" + "/" + id)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">FTO Projects</h1>
      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {allPairs &&
          allPairs.map((pairAddress) => (
            <ProjectDetail key={pairAddress} pairAddress={pairAddress} />
          ))}
      </div>
    </div>
  )
}
