import { useState, useCallback, useEffect, useRef } from "react"
import {
  useNetwork,
  useAccount,
  useWaitForTransaction,
  useBalance,
  useContractWrite
} from "wagmi"
import {
  readContracts,
  watchReadContracts,
  prepareWriteContract,
  writeContract,
  waitForTransaction
} from "@wagmi/core"
import {
  Mumbai_yexExample_address,
  Mumbai_tokenA_address,
  Mumbai_tokenB_address
} from "@/contracts/addresses"
import { Mumbai_faucet_abi, Mumbai_yexExample_abi } from "@/contracts/abis"
import { ethers } from "ethers"

export default function useSwapContract() {
  const { chain } = useNetwork()
  const [hash, setHash] = useState()
  const { address } = useAccount()
  const [inputValue, setInputValue] = useState("0.0")
  const [selectedTokenlist, setSelectedTokenlist] = useState(0) // 0 input of tokenlist,1 out of tokenlist
  const [selectedCoin_input, setSelectedCoin_input] = useState("tokenA")
  const [selectedCoin_out, setSelectedCoin_out] = useState("tokenB")
  const [receiveTokenAmount, setReceiveTokenAmount] = useState("0.0")
  const [isOpen_Alert, setIsOpen_Alert] = useState(false)
  const [isLoading_Btn, setIsLoading_Btn] = useState(false)
  const [isGetReceive, setIsGetReceive] = useState(false)
  const [currentInputTokenContract, setCurrentInputTokenContract] = useState(
    Mumbai_tokenA_address
  )
  const [currentOutTokenContract, setCurrentOutTokenContract] = useState(
    Mumbai_tokenB_address
  )
  const [currentInputTokenAllowance, setCurrentInputTokenAllowance] =
    useState(0.0)

  const inputAmountRef = useRef(null)
  const outAmountRef = useRef(null)

  const yexSwapContractConfig = {
    address: Mumbai_yexExample_address,
    abi: Mumbai_yexExample_abi
  }

  const currentInputTokenContractConfig = {
    address: currentInputTokenContract,
    abi: Mumbai_faucet_abi
  }

  const currentOutTokenContractConfig = {
    address: currentOutTokenContract,
    abi: Mumbai_faucet_abi
  }

  // Fetch inputToken balance
  const { data: inputTokenBalance } = useBalance({
    address: address,
    token: selectedCoin_input === "ETH" ? undefined : currentInputTokenContract, // undefined is for querying ETH balance
    watch: true
  })

  // Fetch outToken balance
  const { data: outTokenBalance } = useBalance({
    address: address,
    token: selectedCoin_out === "ETH" ? undefined : currentOutTokenContract, // undefined is for querying ETH balance
    watch: true
  })
  // Fetch inputToken allowance
  const fetchContractData = useCallback(() => {
    const unwatch = watchReadContracts(
      {
        contracts: [
          {
            ...currentInputTokenContractConfig,
            functionName: "allowance",
            args: [address, Mumbai_yexExample_address]
          },
          {
            ...yexSwapContractConfig,
            functionName: "getExpectedAmountOut",
            args: [
              currentInputTokenContract,
              ethers.utils.parseEther(inputValue || "0")
            ]
          }
        ],
        listenToBlock: true,
        allowFailure: true
      },
      (data) => {
        console.log("data", data)
        const allowancedAmount = ethers.utils.formatUnits(
          data[0].result,
          "ether"
        )
        const receiveAmount = Number(
          ethers.utils.formatUnits(data[1].result, "ether")
        )
          .toFixed(6)
          .replace(/\.?0+$/, "")

        if (Number(receiveAmount) !== 0) {
          setReceiveTokenAmount(receiveAmount)
          setCurrentInputTokenAllowance(allowancedAmount)
        }
      }
    )

    return unwatch
  }, [inputValue, currentInputTokenContract, currentOutTokenContract, address])

  const contractTransaction = useCallback(
    async ({ address, abi, functionName, args }) => {
      const config = await prepareWriteContract({
        address,
        abi,
        functionName,
        args
      })
      const { hash } = await writeContract(config)
      await waitForTransaction({ hash })
      return hash
    },
    []
  )

  const approve = useCallback(async () => {
    return contractTransaction({
      address: currentInputTokenContract,
      abi: Mumbai_faucet_abi,
      functionName: "approve",
      args: [
        Mumbai_yexExample_address,
        ethers.utils.parseEther(inputValue || "0")
      ]
    })
  }, [contractTransaction, currentInputTokenContract, inputValue])

  const swap = useCallback(async () => {
    return contractTransaction({
      address: Mumbai_yexExample_address,
      abi: Mumbai_yexExample_abi,
      functionName: "deposit",
      args: [
        selectedCoin_input === "tokenA"
          ? ethers.utils.parseEther(inputValue.toString() || "0")
          : "0",
        selectedCoin_input === "tokenB"
          ? ethers.utils.parseEther(inputValue.toString() || "0")
          : "0"
      ]
    })
  }, [contractTransaction, selectedCoin_input, inputValue])

  const swapClick = useCallback(async () => {
    if (Number(receiveTokenAmount) === 0) {
      return
    }
    if (inputTokenBalance?.formatted < inputAmountRef.current?.value) {
      return
    }
    try {
      setIsLoading_Btn(true)

      if (Number(inputValue) > Number(inputTokenBalance)) {
        setIsOpen_Alert(true)
        setIsLoading_Btn(false)
        return
      }

      if (Number(currentInputTokenAllowance) < Number(inputValue)) {
        const hash = await approve()
        setHash(hash)
      } else {
        const hash = await swap()
        setHash(hash)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading_Btn(false)
    }
  }, [inputValue, inputTokenBalance, currentInputTokenAllowance, approve, swap])

  // Waiting for transaction confirmation
  const confirmation = useWaitForTransaction({
    hash: hash,
    onSuccess(data) {
      setIsLoading_Btn(false)
      setIsOpen_Alert(true)
      setTimeout(() => {
        setIsOpen_Alert(false)
      }, 5000)
    }
  })

  const handleWheel = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    let unwatch
    if (inputValue && Number(inputValue) !== 0) {
      unwatch = fetchContractData()
    }

    return () => {
      if (unwatch) {
        setIsGetReceive(false) //
        unwatch()
      }
    }
  }, [fetchContractData])

  useEffect(() => {
    if (Number(inputAmountRef.current?.value) === 0) {
      setReceiveTokenAmount("0.0")
    }
    setInputValue(inputAmountRef.current?.value)
    setIsGetReceive(true)
  }, [inputAmountRef.current?.value])

  useEffect(() => {
    if (Number(inputAmountRef.current?.value) === 0) {
      setReceiveTokenAmount("0.0")
    }
    if (Number(receiveTokenAmount) !== 0)
      outAmountRef.current.value = receiveTokenAmount
  }, [receiveTokenAmount])
  useEffect(() => {
    if (selectedCoin_input === "tokenA") {
      setCurrentInputTokenContract(Mumbai_tokenA_address)
    }
    if (selectedCoin_input === "tokenB") {
      setCurrentInputTokenContract(Mumbai_tokenB_address)
    }
    if (selectedCoin_input === "USDC") {
      setCurrentInputTokenContract("0x")
    }
    if (selectedCoin_input === "WETH") {
      setCurrentInputTokenContract("0x")
    }
    // 将 passive 选项设置为 false，以将事件监听器更改为主动事件监听器，保证阻止input框滚动默认事件
    if (inputAmountRef.current)
      inputAmountRef.current.addEventListener("wheel", handleWheel, {
        passive: false
      })
  }, [selectedCoin_input])
  useEffect(() => {
    if (selectedCoin_out === "tokenA") {
      setCurrentOutTokenContract(Mumbai_tokenA_address)
    }
    if (selectedCoin_out === "tokenB") {
      setCurrentOutTokenContract(Mumbai_tokenB_address)
    }
    if (selectedCoin_out === "USDC") {
      setCurrentOutTokenContract("0x")
    }
    if (selectedCoin_out === "WETH") {
      setCurrentOutTokenContract("0x")
    }
  }, [selectedCoin_out])

  return {
    chain,
    hash,
    setHash,
    address,
    inputValue,
    setInputValue,
    selectedTokenlist,
    setSelectedTokenlist,
    selectedCoin_input,
    setSelectedCoin_input,
    selectedCoin_out,
    setSelectedCoin_out,
    receiveTokenAmount,
    setReceiveTokenAmount,
    currentInputTokenContract,
    setCurrentInputTokenContract,
    currentOutTokenContract,
    setCurrentOutTokenContract,
    currentInputTokenAllowance,
    inputTokenBalance,
    outTokenBalance,
    confirmation,
    isOpen_Alert,
    setIsOpen_Alert,
    isLoading_Btn,
    setIsLoading_Btn,
    approve,
    swap,
    swapClick,
    inputAmountRef,
    outAmountRef,
    isGetReceive
  }
}
