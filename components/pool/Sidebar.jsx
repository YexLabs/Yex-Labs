import React, { useState } from "react"

const Sidebar = ({ onSelectComponent, poolSelected }) => {
  const componentConfig = [
    { name: "DepositCard", displayName: "Deposit" },
    { name: "WithdrawCard", displayName: "Withdraw" }
  ]

  const [selectedComponent, setSelectedComponent] = useState("DepositCard")

  const handleClick = (componentName) => {
    onSelectComponent(componentName)
    setSelectedComponent(componentName)
  }

  return (
    <div className="h-screen text-gray-600 mt-10">
      {componentConfig.map((config) => (
        <button
          key={config.name}
          className={`p-1 m-2 w-full text-left ${
            selectedComponent === config.name ? "bg-white rounded-md" : ""
          }`}
          onClick={() => handleClick(config.name)}
        >
          {`${config.displayName} (${poolSelected})`}
        </button>
      ))}
    </div>
  )
}

export default Sidebar
