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

  // const loadPairs = async () => {
  //   if (pairsLength) {
  //     let pairs = []
  //     for (let i = 0; i < pairsLength; i++) {
  //       const pair = await useContractRead({
  //         address: FTO_FACTORY_ADDRESS,
  //         abi: MUBAI_FTO_FACTORY_ABI,
  //         functionName: "allPairs",
  //         args: [i] // 使用索引作为参数
  //       })
  //       pairs.push(pair.data)
  //     }
  //     setAllPairs(pairs)
  //   }
  // }

  useEffect(() => {}, [pairsLength])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">FTO Projects</h1>
      <div className="space-y-4 max-h-[300px] overflow-y-auto flex flex-wrap justify-between">
        {allPairIndexes.map((index) => {
          console.log(index) // 检查 index 是否如预期那样变化
          return <ProjectDetail key={index} index={index} />
        })}
      </div>
    </div>
  )
}
