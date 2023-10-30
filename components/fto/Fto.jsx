import React from "react"
import "@/styles/Swap.module.css"
import Image from "next/image"
import FtoCard_Header from "./ftoCard/FtoCard_Header"
import FtoCard_Content from "./ftoCard/FtoCard_Content"
import chainlinkIcon from "../../assets/images/projects/chainlink.png"

export default function Fto() {
  return (
    <div className="h-full">
      {/* 写一个swap卡片样式,上下左右都居中 */}
      <div className="">
        <div className="w-full flex justify-center items-center">
          <div className="mt-10  w-2/3  bg-white  bg-opacity-30 rounded-xl shadow-xl flex-col p-4">
            <FtoCard_Header />
            <FtoCard_Content />
          </div>
        </div>
      </div>
    </div>
  )
}
