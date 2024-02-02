import React from "react"
import Footer from "./Footer"
import { Header } from "./Header"

export default function Layout(props) {
  return (
    // todo：The background color here needs to be replaced and controlled using a theme file
    <div className="flex flex-col w-full items-center relative  overflow-hidden pb-[436px] px-[24px] box-border tracking-[normal] text-center text-[16px] text-gray-300 font-segoe-ui mq450:gap-[30px] mq450:pl-5 mq450:pr-5 mq450:box-border mq750:gap-[60px] mq750:pl-[65px] mq750:pr-[59px] mq750:box-border">
      <Header />
      <div className="mt-[42px] w-full max-w-[1200px]">{props.children}</div>
      {/* <Footer /> */}
    </div>
  )
}
