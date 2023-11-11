import React, { useEffect } from "react"
import { useNetwork, useSwitchNetwork } from "wagmi"
import { useRouter } from "next/router"
import { ETH_CHAINS } from "@/config/constant"

export default function useCheckNetwork() {
  const router = useRouter()
  const pathsUsingSecondChain = ["/launching", "/ilo", "/portfolio"]
  // check if the current chain is the same as the first chain in the ETH_CHAINS array
  const currentChain = pathsUsingSecondChain.includes(router.pathname)
    ? ETH_CHAINS[1]
    : ETH_CHAINS[0]

  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork({
      chainId: currentChain.id
    })
  useEffect(() => {
    if (chain?.id !== currentChain.id && switchNetwork) {
      switchNetwork()
    }
  }, [switchNetwork])
  return { chains, error }
}
