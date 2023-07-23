import React from "react"
import Image from "next/image"

const PoolList = ({
  pool,
  tokenAIcon,
  tokenBIcon,
  statusIcon,
  tokenAName,
  tokenBName,
  status,
  liquidity,
  apr,
  currentComponent,
  setCurrentComponent,
  setPoolSelected
}) => {
  return (
    <div className="w-auto h-auto flex justify-center items-center bg-white rounded-lg m-2">
      <button
        className="grid grid-cols-4 gap-6"
        onClick={() => {
          if (currentComponent === "PoolList") {
            setCurrentComponent("DepositCard")
            setPoolSelected(pool)
          } else {
            setPoolSelected(pool)
          }
        }}
      >
        <div className="flex flex-row flex-wrap pl-5 m-1">
          <div className="flex flex-row flex-wrap gap-1">
            <div className="flex flex-row gap-1 items-center border rounded-2xl">
              <div className="w-10 h-10 p-2">
                <Image src={tokenAIcon} className="w-10 h-10" />
              </div>
              <p className="p-2">{tokenAName}</p>
            </div>
            <div className="flex flex-row gap-1 items-center border rounded-2xl">
              <div className="w-10 h-10 p-2">
                <Image src={tokenBIcon} className="w-10 h-10" />
              </div>
              <p className="p-2">{tokenBName}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center m-1">
          <div className="w-10 h-10 p-2">
            <img src={statusIcon} alt="" />
          </div>
          <p>{status}</p>
        </div>
        <div className="flex flex-row gap-10 items-center m-1">
          <div className="flex flex-row gap-1 items-center">
            <p className="p-2">${liquidity}</p>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-10 items-center pr-5 m-1">
          <div className="flex flex-row gap-1 items-center">
            <p className="p-2">{apr}</p>
          </div>
        </div>
      </button>
    </div>
  )
}

export default PoolList
