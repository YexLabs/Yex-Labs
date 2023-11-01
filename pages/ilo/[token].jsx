import React from "react"
import ILOCard from "@/components/iloCard/ILOCard"
import { useRouter } from "next/router"

export default function ilo() {
  const router = useRouter()
  const { token } = router.query // 从路由中获取token

  return (
    <div className="container p-14">
      <ILOCard token={token} />
    </div>
  )
}
