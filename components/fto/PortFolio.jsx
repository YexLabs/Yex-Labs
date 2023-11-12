import React from "react"
import "@/styles/Swap.module.css"
import PortCard_Header from "./portCard/PortCard_Header"
import PortCard_Content from "./portCard/PortCard_Content"

export default function PortFolio() {
  return (
    <div className="h-full">
      <div className="">
        <div className="w-full flex justify-center items-center">
          <div className="mt-10 w-2/3 bg-white  bg-opacity-30 rounded-xl shadow-xl flex-col p-4">
            <PortCard_Header />
            <PortCard_Content />
          </div>
        </div>
      </div>
    </div>
  )
}
