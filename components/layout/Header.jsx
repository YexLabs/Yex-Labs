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
  const router = useRouter()
  const handleMouseEnter = () => {
    setIsPoolHovered(true)
  }
  const handleMouseLeave = () => {
    setIsPoolHovered(false)
  }
  const handleHackathonClick = (demoName) => {
    router.push("/" + demoName)
  }
  return (
    <header className="box-border  flex flex-col top-0 left-0 w-full h-[80px] z-30 border-b-0">
      <div className="flex fade-in bg-blue-500 backdrop-blur-md items-center">
        <div className="mx-auto py-[2px] ">
          <p className="m-0 font-inter font-normal leading-5 text-xs text-white">
            {/* Scroll's Alpha Testnet is now live. */}
            {chain?.name} is now live.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="box-border px-3 py-2 pl- absolute w-full backdrop-blur-md ">
          <div className="row2 flex flex-row justify-between items-center flex-wrap gap-y-10 max-w-full">
            <div className="flex flex-row items-center gap-6">
              <div className="mb-[2px]">
                <div className=" relative">
                  <div
                    onClick={() => {
                      handleHackathonClick("")
                    }}
                  >
                    <div className="cursor-pointer">
                      <Image src={logo} className="h-[32px] w-[32px] z-1" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Main */}
              <div className="flex items-center space-x-4 md:space-x-6 mb-[2px]">
                <div className="relative">
                  <div
                    onClick={() => {
                      handleHackathonClick("")
                    }}
                  >
                    <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                      <p className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                        Main
                      </p>
                    </div>
                  </div>
                </div>
                {/* Pool */}
                {/* <div className="relative">
                  <div>
                    <a
                      href="#"
                      className="no-underline text-current cursor-default"
                    >
                      <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="dropdown dropdown-hover"
                      >
                        <div
                          tabindex="0"
                          className="flex items-center gap-1 md:gap-1 py-2 cursor-pointer flex-row"
                        >
                          <div className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                            Pool
                          </div>
                          <div className="mt-1">
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 8 8"
                              xmlns="http://www.w3.org/2000/svg"
                              className={isPoolHovered ? "rotate-180" : "rotate-0"}
                            >
                              <path
                                fill="#5155a6"
                                fillRule="nonzero"
                                d="M4.036 6.571.5 3.036l.786-.786L4.037 5l2.748-2.75.786.786z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <ul
                          tabindex="0"
                          className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-80 mt-0"
                        >
                          <li>
                            <a href="PoolLists">
                              <div className="flex">
                                <div className="flex items-center">
                                  <Image
                                    src={logo}
                                    className="h-[24px] w-[24px] z-1"
                                  />
                                </div>
                                <div className="flex flex-col ml-3">
                                  <p>PoolLists</p>
                                  <p className=" text-xs">
                                    Explore all pools on yexdex
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a>
                              <div className="flex">
                                <div className="flex items-center">
                                  <Image
                                    src={logo}
                                    className="h-[24px] w-[24px] z-1"
                                  />
                                </div>
                                <div className="flex flex-col ml-3">
                                  <p>Pool</p>
                                  <p className=" text-xs">
                                    Explore all pools on yexdex
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a>
                              <div className="flex">
                                <div className="flex items-center">
                                  <Image
                                    src={logo}
                                    className="h-[24px] w-[24px] z-1"
                                  />
                                </div>
                                <div className="flex flex-col ml-3">
                                  <p>Pool</p>
                                  <p className=" text-xs">
                                    Explore all pools on yexdex
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </a>
                  </div>
                </div> */}
                {/* Hacker Demo */}
                {/* <div className="relative">
                  <div>
                    <div
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="dropdown dropdown-hover"
                    >
                      <div
                        tabIndex="0"
                        className="flex items-center gap-1 md:gap-1 py-2 cursor-pointer flex-row"
                      >
                        <div className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          BatchSwap
                        </div>
                        <div className="mt-1">
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            xmlns="http://www.w3.org/2000/svg"
                            className={
                              isPoolHovered ? "rotate-180" : "rotate-0"
                            }
                          >
                            <path
                              fill="#5155a6"
                              fillRule="nonzero"
                              d="M4.036 6.571.5 3.036l.786-.786L4.037 5l2.748-2.75.786.786z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <ul
                        tabIndex="0"
                        className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-80 mt-0"
                      >
                        <li>
                          <div
                            className="flex"
                            onClick={() => {
                              handleHackathonClick("demo1_swap")
                            }}
                          >
                            <div className="flex items-center">
                              <Image
                                src={logo}
                                className="h-[24px] w-[24px] z-1"
                              />
                            </div>
                            <div className="flex flex-col ml-0">
                              <p>Swap</p>
                              <p className=" text-xs">
                                Prototype | Polygon-Testnet
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div
                            className="flex"
                            onClick={() => {
                              handleHackathonClick("demo1_pool")
                            }}
                          >
                            <div className="flex items-center">
                              <Image
                                src={logo}
                                className="h-[24px] w-[24px] z-1"
                              />
                            </div>
                            <div className="flex flex-col ml-0">
                              <p>Pools</p>
                              <p className=" text-xs">
                                Prototype | Polygon-Testnet
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
                {/* <div className="relative">
                  <div
                    onClick={() => {
                      handleHackathonClick("ilo")
                    }}
                  >
                    <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                      <p className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                        ILO
                      </p>
                    </div>
                  </div>
                </div> */}
                {/* <div className="relative">
                  <div>
                    <a
                      href="#"
                      className="no-underline text-current cursor-default"
                    >
                      <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          Pool
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div>
                    <a
                      href="#"
                      className="no-underline text-current cursor-default"
                    >
                      <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          Launch
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div>
                    <a
                      href="#"
                      className="no-underline text-current cursor-default"
                    >
                      <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          Protfolio
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div>
                    <a
                      href="https://scroll.io/alpha/bridge"
                      className="no-underline text-current cursor-default"
                      target="_blank"
                    >
                      <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          Bridge
                        </p>
                      </div>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="flex flex-row items-center gap-3">
              {/* {chain?.id !== 80001 ? "" : <Faucet_Mumbai />} */}
              <div className=" relative">
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
