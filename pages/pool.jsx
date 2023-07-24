import React, { useState } from "react"
import ethicon from "../assets/images/pools/eth.png"
import Sidebar from "@/components/pool/Sidebar"
import PoolList from "@/components/pool/PoolList"
import {
  Mumbai_yexExample_address,
  Mumbai_yexExample_pool2_address
} from "../contracts/addresses"
import { Mumbai_yexExample_abi } from "../contracts/abis"

import DepositCard from "@/components/pool/depositCard/DepositCard"
import WithdrawCard from "@/components/pool/withdrawCard/WithdrawCard"
import { usePoolContract } from "@/hooks/usePoolContract"

const Pools = () => {
  const [currentComponent, setCurrentComponent] = useState("PoolList")
  const [poolSelected, setPoolSelected] = useState("")

  const { reserve0: pool1Reserve0, reserve1: pool1Reserve1 } = usePoolContract(
    Mumbai_yexExample_address,
    Mumbai_yexExample_abi
  )
  const { reserve0: pool2Reserve0, reserve1: pool2Reserve1 } = usePoolContract(
    Mumbai_yexExample_pool2_address,
    Mumbai_yexExample_abi
  )

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
                    pool={"AMM1"}
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
                    pool={"AMM2"}
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

export default Pools
