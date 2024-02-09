import { MUBAI_FTO_FACTORY_ABI } from "@/contracts/abis"
import { FTO_FACTORY_ADDRESS } from "@/contracts/addresses"
import { useEffect, useState } from "react"
import { useContractRead } from "wagmi"
import { Project } from "./ProjectCard"

export const ProjectList = () => {
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
    console.log("aTimeleft", aTimeleft, typeof aTimeleft)
    console.log("bTimeleft", bTimeleft, typeof bTimeleft)
    if (!aTimeleft && !bTimeleft) {
      return 0
    }

    // processing
    if (aTimeleft >=0 && bTimeleft >= 0) {
      return aTimeleft - bTimeleft  
    }
    if (aTimeleft >= 0 && bTimeleft < 0) {
      return -1
    }
    if (aTimeleft < 0 && bTimeleft >= 0) {
      return 1
    }
    if (aTimeleft < 0 && bTimeleft < 0) {
      return bTimeleft - aTimeleft
    }
    return 0
  }
  const sortedIndexes = allPairIndexes.slice().sort(sortByTimeleft)
  useEffect(() => {
    console.log(projectEndTimes)
  }, [pairsLength, projectEndTimes])
  return (
    <div className="self-stretch flex flex-row flex-wrap items-center justify-center gap-[24px] max-w-full text-center text-2xl">
      <div className="flex-1 flex items-start justify-start gap-[24px] flex-wrap">
        {sortedIndexes.map((index) => (
          <Project
            onEndTimeReceived={handleEndTimeReceived}
            index={index}
            key={index}
          ></Project>
        ))}
      </div>
    </div>
  )
}
