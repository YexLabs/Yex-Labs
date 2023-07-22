import React from "react"
import Footer from "./Footer"
import Header from "./Header"

export default function Layout(props) {
  return (
    // todo：The background color here needs to be replaced and controlled using a theme file
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-gradient-to-r from-purple-100 to-blue-100 overflow-y-auto overflow-x-hidden">
      <Header />
      <div>{props.children}</div>
      <Footer />
    </div>
  )
}
