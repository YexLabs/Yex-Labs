import React from "react"
import DepositCard_Header from "./DepositCard_Header"
import DepositCard_Content from "./DepositCard_Content"

const DepositCard = ({ poolSelected }) => {
  return (
    <div className="h-full">
      <div className="flex justify-center items-center">
        <div className="mt-10 w-1/2 bg-white bg-opacity-30 rounded-xl shadow-xl flex-col p-4">
          <DepositCard_Header />
          <DepositCard_Content poolSelected={poolSelected} />
        </div>
      </div>
    </div>
  )
}

export default DepositCard
