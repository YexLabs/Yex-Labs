import React, { useState } from "react"
import Image from "next/image"
import logo from "@/assets/images/yexlab.png"

export default function Footer() {
  const [isDocsHovered, setIsDocsHovered] = useState(false)

  const docsList = [
    { name: "YexFund", link: "/whitePaper" },
    { name: "Splatter", link: "/" }
  ]

  const handleMouseEnter = () => {
    setIsDocsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsDocsHovered(false)
  }

  return (
    <footer>
      <div className="px-32 mt-16 h-[180px] text-center">
        <div className="grid grid-cols-5 gap-8">
          <Image src={logo} className="w-14 h-14" />
          <div className="flex flex-col gap-4">
            <p className=" text-gray-500">Community</p>

            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://discord.gg/93fkRv5DgB"
                target="_blank"
                rel="noreferrer"
              >
                <p>Discord</p>
              </a>
              <p></p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className=" text-gray-500">News</p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://twitter.com/yex_lab"
                target="_blank"
                rel="noreferrer"
              >
                <p>Twitter</p>
              </a>
              <a href="#">
                <p>Mirror</p>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className=" text-gray-500">Resources</p>
            <div className="flex flex-col gap-2 text-sm">
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex flex-col gap-2 text-sm"
              >
                <div className="flex justify-center items-center">
                  <div className=" hover:cursor-pointer">Docs</div>
                  <div className="mt-1">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 8 8"
                      xmlns="http://www.w3.org/2000/svg"
                      className={isDocsHovered ? "rotate-180" : "rotate-0"}
                    >
                      <path
                        fill="#5155a6"
                        fillRule="nonzero"
                        d="M4.036 6.571.5 3.036l.786-.786L4.037 5l2.748-2.75.786.786z"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div
                  className={`flex flex-col gap-2 text-sm ${
                    !isDocsHovered ? "hidden" : ""
                  }`}
                >
                  {docsList &&
                    docsList.map((item) => (
                      <div key={item.name}>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-4"
                        >
                          {item.name}
                        </a>
                      </div>
                    ))}
                </div>
              </div>

              <a
                href="https://github.com/yexlab"
                target="_blank"
                rel="noreferrer"
              >
                <p>Github</p>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className=" text-gray-500">Links</p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://scroll.io/alpha/bridge"
                target="_blank"
                rel="noreferrer"
              >
                <p>Bridge</p>
              </a>
              <a
                href="https://blockscout.scroll.io/"
                target="_blank"
                rel="noreferrer"
              >
                <p>Explorer</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
