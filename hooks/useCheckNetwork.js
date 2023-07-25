import React, { useEffect } from "react"
import { useNetwork, useSwitchNetwork } from "wagmi"
import { ETH_CHAINS } from "@/config/constant"

export default function useCheckNetwork() {
  // check if the current chain is the same as the first chain in the ETH_CHAINS array
  const currentChain = ETH_CHAINS[0]

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
