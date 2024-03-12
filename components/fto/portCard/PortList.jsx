import React, { useState, useEffect } from "react"

import { useContractRead, useAccount } from "wagmi"
import { FTO_FACTORY_ADDRESS } from "@/contracts/addresses"
import { MUBAI_FTO_FACTORY_ABI } from "@/contracts/abis"
import ProjectDetail from "./PortProjectDetail"

export default function PortList() {
  const { address } = useAccount()
  const [allPairs, setAllPairs] = useState([])
  const { data: pairsLength } = useContractRead({
    address: FTO_FACTORY_ADDRESS,
    abi: MUBAI_FTO_FACTORY_ABI,
    functionName: "allPairsLength"
  })
  const { data: pairOk } = useContractRead({
    address: FTO_FACTORY_ADDRESS,
    abi: MUBAI_FTO_FACTORY_ABI,
    functionName: "events",
    args: [address]
  })
  console.log(pairOk, "pairOkpairOkpairOk")
  useEffect(() => {
    setAllPairs(pairOk)
  }, [pairOk])

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
      <h1 className="text-2xl font-bold mb-4">Dreampad beta</h1>
      <div className="space-x-4 max-h-[300px] overflow-y-auto flex  justify-between items-center">
        {allPairs?.map((pair, index) => {
          console.log(pair, index) // 检查 index 是否如预期那样变化
          return <ProjectDetail key={index} pair={pair} index={index} />
        })}
      </div>
    </div>
  )
}
