import React from "react"
import { useRouter } from "next/router"

const projects = [
  {
    id: 0,
    status: "ongoing",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "5d:20h:20m:30s",
    totalRaised: 115333.01
  },
  {
    id: 1,
    status: "ongoing",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "5d:20h:20m:30s",
    totalRaised: 115333.01
  },
  {
    id: 2,
    status: "ongoing",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "5d:20h:20m:30s",
    totalRaised: 115333.01
  },
  {
    id: 3,
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  },
  {
    id: 4,
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  },
  {
    id: 5,
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  },
  {
    id: 6,
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  },
  {
    id: 7,
    status: "success",
    tokenName: "ETH",
    price: "0.01 USDT",
    timeline: "-:-:-:-",
    totalRaised: 115333.01
  }
  // 如果有更多项目，继续添加，并确保每个新项目的 id 是自增的。
]

const PortList = () => {
  const router = useRouter()

  const handleHackathonClick = (id) => {
    router.push("/ilo" + "/" + id)
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">FTO Projects</h1>
      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {projects.map((project, index) => (
          <div
            onClick={() => handleHackathonClick(project.id)}
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
            {project.totalRaised.toLocaleString() || "-"}{" "}
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

export default PortList
