import React, { useState, useRef, useEffect } from "react"
import useSwapContract from "@/hooks/useSwapContract"
import FTOList from "./FTOList"

export default function FtoCard_Content() {
  const {
    chain,
    hash,
    setInputValue,
    selectedTokenlist,
    setSelectedTokenlist,
    selectedCoin_input,
    setSelectedCoin_input,
    selectedCoin_out,
    setSelectedCoin_out,
    receiveTokenAmount,
    currentInputTokenAllowance,
    inputTokenBalance,
    outTokenBalance,
    isOpen_Alert,
    isLoading_Btn,
    swapClick,
    inputAmountRef,
    outAmountRef,
    isGetReceive
  } = useSwapContract()

  const [isOpen, setIsOpen] = useState(false)

  const inputTokenPercentSelect = (value) => {
    inputAmountRef.current.value = (inputTokenBalance?.formatted * value) / 100
  }

  function openModal_input() {
    setSelectedTokenlist(0)
    setIsOpen(true)
  }

  function openModal_out() {
    setSelectedTokenlist(1)
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div className="flex-col mt-8 w-full">
      <FTOList />
    </div>
  )
}
