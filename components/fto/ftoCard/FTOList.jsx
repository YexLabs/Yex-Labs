import React from "react"

const projects = [
  {
    status: "ongoing",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "5d:20h:20m:30s",
    totalRaised: 115333.01
  },
  {
    status: "ongoing",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "5d:20h:20m:30s",
    totalRaised: 115333.01
  },
  {
    status: "ongoing",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "5d:20h:20m:30s",
    totalRaised: 115333.01
  },
  {
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  },
  {
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  },
  {
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  },
  {
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  },
  {
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  }
  // 添加更多项目
]

export default function FTOList() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">FTO Projects</h1>
      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`p-2 border rounded ${
              project.status === "ongoing" ? "" : ""
            } hover:bg-gray-200 hover:cursor-pointer hover:border-4 hover:border-indigo-100 hover:shadow-lg 
                        transition-all ease-in-out duration-300`}
          >
            <span className="font-medium">{project.tokenName} price: </span>
            {project.price} <span className="font-medium">Timeline: </span>
            {project.timeline}{" "}
            <span className="font-medium">Total Raised: </span>
            {project.totalRaised.toLocaleString()}{" "}
            <span
              className={`font-medium text-${
                project.status === "ongoing" ? "green" : "red"
              }-600`}
            >
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
