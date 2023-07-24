import { useState, useEffect } from "react"
import { useContractRead } from "wagmi"
import { ethers } from "ethers"

export const usePoolContract = (address, abi) => {
  const [reserve0, setReserve0] = useState(0)
  const [reserve1, setReserve1] = useState(0)

  const { data: reservesData } = useContractRead({
    address,
    abi,
    functionName: "getReserves",
    args: [],
    onError: (error) => {
      console.log("Error", error)
    }
  })

  useEffect(() => {
    if (reservesData) {
      const reserves = reservesData.map((reserve) =>
        ethers.utils.formatUnits(reserve, "ether")
      )
      setReserve0(reserves[0])
      setReserve1(reserves[1])
    }
  }, [reservesData])

  return { reserve0, reserve1 }
}
