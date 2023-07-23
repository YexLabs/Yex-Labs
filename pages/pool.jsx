import React, { useState, useEffect } from "react"
import ethicon from "../assets/images/pools/eth.png"
import Sidebar from "@/components/pool/Sidebar"
import PoolList from "@/components/pool/PoolList"

import {
  Mumbai_yexExample_address,
  Mumbai_yexExample_pool2_address
} from "../contracts/addresses"
import { useContractRead } from "wagmi"
import { Mumbai_yexExample_abi } from "../contracts/abis"
import { ethers } from "ethers"
import DepositCard from "@/components/pool/depositCard/DepositCard"
import WithdrawCard from "@/components/pool/withdrawCard/WithdrawCard"

const pool = () => {
  const [currentComponent, setCurrentComponent] = useState("PoolList")
  const [pool1Reserve0, setPool1Reserve0] = useState(0)
  const [pool1Reserve1, setPool1Reserve1] = useState(0)

  const [pool2Reserve0, setPool2Reserve0] = useState(0)
  const [pool2Reserve1, setPool2Reserve1] = useState(0)

  const [poolSelected, setPoolSelected] = useState("")

  // get pool1 Reserves
  const { data: reservesPool1Data } = useContractRead({
    address: Mumbai_yexExample_address,
    abi: Mumbai_yexExample_abi,
    functionName: "getReserves",
    args: [],
    onError: (error) => {
      console.log("Error", error)
    }
  })

  // get pool2 Reserves
  const { data: reservesPool2Data } = useContractRead({
    address: Mumbai_yexExample_pool2_address,
    abi: Mumbai_yexExample_abi,
    functionName: "getReserves",
    args: [],
    onError: (error) => {
      console.log("Error", error)
    }
  })

  useEffect(() => {
    if (reservesPool1Data) {
      const reserves = reservesPool1Data.map((reserve) =>
        ethers.utils.formatUnits(reserve, "ether")
      )
      setPool1Reserve0(reserves[0])
      setPool1Reserve1(reserves[1])
    }
  }, [reservesPool1Data])

  useEffect(() => {
    if (reservesPool2Data) {
      const reserves = reservesPool2Data.map((reserve) =>
        ethers.utils.formatUnits(reserve, "ether")
      )
      setPool2Reserve0(reserves[0])
      setPool2Reserve1(reserves[1])
    }
  }, [reservesPool2Data])

  return (
    <div className="container">
      <div className="flex-col justify-center px-12">
        <div>
          <div className="justify-center items-center flex flex-col">
            {true && (
              <div>
                <div className="bg-white bg-opacity-30 mt-10 rounded-xl shadow-xl flex-col p-4">
                  <div className="p-1 hover:cursor-pointer rounded-xl">
                    <p>Pool Lists</p>
                  </div>
                  <PoolList
                    pool={"pool1"}
                    tokenAIcon={ethicon}
                    tokenBIcon={ethicon}
                    tokenAName={"TokenA"}
                    tokenBName={"TokenB"}
                    status={"Openning"}
                    liquidity={Number(pool1Reserve0) + Number(pool1Reserve1)}
                    currentComponent={currentComponent}
                    setCurrentComponent={setCurrentComponent}
                    setPoolSelected={setPoolSelected}
                  />
                  <PoolList
                    pool={"pool2"}
                    tokenAIcon={ethicon}
                    tokenBIcon={ethicon}
                    tokenAName={"TokenA"}
                    tokenBName={"TokenB"}
                    status={"Openning"}
                    liquidity={Number(pool2Reserve0) + Number(pool2Reserve1)}
                    currentComponent={currentComponent}
                    setCurrentComponent={setCurrentComponent}
                    setPoolSelected={setPoolSelected}
                  />
                </div>
                {currentComponent !== "PoolList" && (
                  <div className="flex justify-between w-full px-12">
                    <div className="">
                      <Sidebar
                        onSelectComponent={setCurrentComponent}
                        poolSelected={poolSelected}
                      />
                    </div>
                    <div className="w-full">
                      <div>
                        {currentComponent === "DepositCard" && (
                          <DepositCard poolSelected={poolSelected} />
                        )}
                      </div>
                      <div>
                        {currentComponent === "WithdrawCard" && (
                          <WithdrawCard poolSelected={poolSelected} />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default pool
