import React from "react"
import ILOCard from "@/components/iloCard/ILOCard"
import { useRouter } from "next/router"
import {ProjectDetail} from '@/components/dreampad/launching/ProjectDetail'

export default function ilo() {
  const router = useRouter()
  const { token } = router.query // 从路由中获取token

  return (
    <div>
      <ProjectDetail token={token} />
    </div>
  )
}
