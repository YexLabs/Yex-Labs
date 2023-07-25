import React from "react"
import "@/styles/Swap.module.css"
import Image from "next/image"
import SwapCard_Header from "./swapCard/SwapCard_Header"
import SwapCard_Content from "./swapCard/SwapCard_Content"
import chainlinkIcon from "../../assets/images/projects/chainlink.png"

export default function SwapCard() {
  return (
    <div className="h-full">
      {/* 写一个swap卡片样式,上下左右都居中 */}
      <div className="">
        <div className="w-full flex justify-center items-center">
          <div className="mt-10  w-1/2  bg-white  bg-opacity-30 rounded-xl shadow-xl flex-col p-4">
            <SwapCard_Header />
            <SwapCard_Content />
          </div>
        </div>
        <div className="mt-4 flex justify-center items-center">
          <div>
            <div
              className=" text-center text-lg text-gray-400 font-bold
            "
            >
              Powered by
            </div>
            <Image src={chainlinkIcon} />
          </div>
        </div>
      </div>
    </div>
  )
}
