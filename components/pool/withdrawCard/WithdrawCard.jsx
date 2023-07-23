import React from "react"
import WithdrawCard_Header from "./WithdrawCard_Header"
import WithdrawCard_Content from "./WithdrawCard_Content"

const WithdrawCard = (poolSelected) => {
  return (
    <div className="h-full">
      <div className="flex justify-center items-center">
        <div className="mt-10 w-1/2 bg-white bg-opacity-30 rounded-xl shadow-xl flex-col p-4">
          <WithdrawCard_Header />
          <WithdrawCard_Content poolSelected={poolSelected} />
        </div>
      </div>
    </div>
  )
}

export default WithdrawCard
