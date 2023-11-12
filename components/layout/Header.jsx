import React from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import logo from "@/assets/images/yexlab.png"
import { useState } from "react"
import { useNetwork } from "wagmi"
import Image from "next/image"
import { useRouter } from "next/router"

export default function Header() {
  const { chain, chains } = useNetwork()
  const [isPoolHovered, setIsPoolHovered] = useState(false)
  const [hoveredItems, setHoveredItems] = useState({})
  const router = useRouter()
  const handleMouseEnter = (title) => {
    setHoveredItems((prevState) => ({
      ...prevState,
      [title]: true
    }))
  }

  const handleMouseLeave = (title) => {
    setHoveredItems((prevState) => ({
      ...prevState,
      [title]: false
    }))
  }

  const handleHackathonClick = (demoName) => {
    router.push("/" + demoName)
  }

  const MENU_ITEMS = [
    {
      title: "Main",
      href: "",
      hasSubMenu: false
    },
    {
      title: "BatchSwap",
      href: "",
      hasSubMenu: true,
      subMenu: [
        {
          title: "Swap",
          href: "/swap",
          description: "Prototype | Polygon-Testnet"
        },
        {
          title: "Pools",
          href: "/pool",
          description: "Prototype | Polygon-Testnet"
        }
      ]
    },
    {
      title: "Xstarter Beta",
      href: "",
      hasSubMenu: true,
      subMenu: [
        {
          title: "Launching",
          href: "/launching",
          description: "Prototype | Polygon-Testnet"
        },
        {
          title: "Portfolio",
          href: "/portfolio",
          description: "Prototype | Polygon-Testnet"
        }
      ]
    }
    // {
    //   title: "ILO",
    //   href: "/ilo",
    //   hasSubMenu: false
    // }
  ]

  console.log(hoveredItems)

  return (
    <header className="box-border  flex flex-col top-0 left-0 w-full h-[80px] border-b-0 z-10">
      <div className="flex fade-in bg-blue-500 backdrop-blur-md items-center">
        <div className="mx-auto py-[2px] ">
          <p className="m-0 font-inter font-normal leading-5 text-xs text-white">
            {/* Scroll's Alpha Testnet is now live. */}
            {/* {chain?.name} is now live. */}
            We use our invented FTO (fair token offering) algorithm to ensure
            transparent and fair token launch.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="box-border px-3 py-2 pl- absolute w-full backdrop-blur-md">
          <div className="row2 flex flex-row justify-between items-center flex-wrap gap-y-10 max-w-full">
            <div className="flex flex-row items-center gap-6">
              <div className="mb-[2px]">
                <div className="relative">
                  <div onClick={() => handleNavigationClick("")}>
                    <div className="cursor-pointer">
                      <Image
                        src={logo}
                        alt="logo"
                        className="h-[32px] w-[32px] z-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {MENU_ITEMS.map((item) => {
                const isItemHovered = true
                return (
                  <div
                    key={item.title}
                    tabIndex="0"
                    className={`relative ${
                      item.hasSubMenu ? "dropdown dropdown-hover " : ""
                    }`}
                    onMouseEnter={() => handleMouseEnter(item.title)}
                    onMouseLeave={() => handleMouseLeave(item.title)}
                  >
                    <div onClick={() => handleHackathonClick(item.href)}>
                      <div className="flex items-center gap-1 md:gap-1 py-2 cursor-pointer">
                        <p className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          {item.title}
                        </p>
                        {item.hasSubMenu && (
                          <div className="mt-1">
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 8 8"
                              xmlns="http://www.w3.org/2000/svg"
                              className={
                                hoveredItems[item.title]
                                  ? "rotate-180"
                                  : "rotate-0"
                              }
                            >
                              <path
                                fill="#5155a6"
                                fillRule="nonzero"
                                d="M4.036 6.571.5 3.036l.786-.786L4.037 5l2.748-2.75.786.786z"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    {item.hasSubMenu && (
                      <ul
                        tabIndex="0"
                        className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-80 mt-0 z-10"
                      >
                        {item.subMenu.map((subItem) => (
                          <li>
                            <div
                              key={subItem.title}
                              tabIndex="0"
                              className="flex"
                              onClick={() => handleHackathonClick(subItem.href)}
                            >
                              <div className="flex items-center">
                                <Image
                                  src={logo}
                                  className="h-[24px] w-[24px]"
                                />
                              </div>
                              <div className="flex flex-col ml-0">
                                <p>{subItem.title}</p>
                                <p className="text-xs">{subItem.description}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="relative">
                <div className="">
                  <ConnectButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
