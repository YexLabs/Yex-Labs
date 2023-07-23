import React from "react"
import ILOCard_Header from "./ILOCard_Header"
import ILOCard_Content from "./ILOCard_Content"

const ILOCard = () => {
  return (
    <div className="h-full">
      <div className="flex justify-center items-center">
        <div className="mt-10 w-1/2 bg-white bg-opacity-30 rounded-xl shadow-xl flex-col p-4">
          <ILOCard_Header />
          <ILOCard_Content />
        </div>
      </div>
    </div>
  )
}

export default ILOCard
