import Faucet_Mumbai from "@/components/common/Faucet_Mumbai"
import React from "react"
import { Button } from "@/components/ui/button"

export default function FtoCard_Header() {
  return (
    <div className="flex justify-between">
      <Faucet_Mumbai />
      {/* chart_icon */}
      {/* <div className="p-1 hover:cursor-pointer rounded-xl">
        <svg
          className="candleline_icon"
          viewBox="0 0 1026 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M59.733333 910.222222V51.2h-56.888889v910.222222h1024V910.222222z"
          ></path>
          <path
            d="M258.844444 620.088889h56.888889v-85.333333h56.888889v-227.555556h-56.888889v-56.888889h-56.888889v56.888889h-56.888888v227.555556h56.888888zM514.844444 790.755556h56.888889v-256h56.888889v-341.333334h-56.888889v-113.777778h-56.888889v113.777778h-56.888888v341.333334h56.888888zM770.844444 705.422222h56.888889v-142.222222h56.888889v-199.111111h-56.888889v-142.222222h-56.888889v142.222222h-56.888888v199.111111h56.888888z"
          ></path>
        </svg>
      </div> */}
      <div className="flex">
        <Button>Launch My Token</Button>
      </div>
    </div>
  )
}
