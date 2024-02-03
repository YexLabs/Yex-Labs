import React, { useState, useEffect } from "react"

import { useContractRead } from "wagmi"
import { FTO_FACTORY_ADDRESS } from "@/contracts/addresses"
import { MUBAI_FTO_FACTORY_ABI } from "@/contracts/abis"
import ProjectDetail from "./ProjectDetail"

const projects = [
  {
    id: "0xa5885ef4c6F8E14e9d97d7243C3481718E63Fd9E",
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
  const [allPairs, setAllPairs] = useState([])
  const [projectEndTimes, setProjectEndTimes] = useState({})
  const { data: pairsLength } = useContractRead({
    address: FTO_FACTORY_ADDRESS,
    abi: MUBAI_FTO_FACTORY_ABI,
    functionName: "allPairsLength"
  })

  // 根据 pairsLength 生成一个地址数组
  const allPairIndexes = Array.from(
    { length: Number(pairsLength) || 0 },
    (_, index) => index
  )

  const handleEndTimeReceived = (projectId, endTime) => {
    setProjectEndTimes((prevEndTimes) => ({
      ...prevEndTimes,
      [projectId]: endTime
    }))
  }
  const sortByTimeleft = (aIndex, bIndex) => {
    const aTimeleft = projectEndTimes[aIndex] || 0
    const bTimeleft = projectEndTimes[bIndex] || 0
    console.log(aTimeleft, typeof aTimeleft)
    console.log(bTimeleft, typeof bTimeleft)

    // Sort by timeleft, placing items with timeleft > 0 first and smaller timeleft earlier
    if (aTimeleft !== "0" && bTimeleft === "0") {
      return -1
    } else if (aTimeleft === "0" && bTimeleft !== "0") {
      return 1
    } else {
      return aTimeleft - bTimeleft
    }
  }
  const sortedIndexes = allPairIndexes.slice().sort(sortByTimeleft)
  console.log(allPairIndexes)
  console.log(sortedIndexes)

  useEffect(() => {
    console.log(projectEndTimes)
  }, [pairsLength, projectEndTimes])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dreampad beta</h1>
      <div className="space-x-0 max-h-[300px] overflow-y-auto flex flex-wrap justify-between items-center">
        {sortedIndexes.map((index) => {
          return (
            <ProjectDetail
              key={index}
              index={index}
              onEndTimeReceived={handleEndTimeReceived}
            />
          )
        })}
      </div>
    </div>
  )
}
