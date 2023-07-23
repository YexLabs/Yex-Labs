import React, { useState, useRef, useEffect } from "react"
import {
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from "wagmi"
import {
  Mumbai_yexExample_address,
  Mumbai_tokenA_address,
  Mumbai_tokenB_address,
  Mumbai_yexExample_pool2_address
} from "../../../contracts/addresses"
import {
  Mumbai_faucet_abi,
  Mumbai_yexExample_abi
} from "../../../contracts/abis"
import { ethers } from "ethers"
import { toast } from "react-toastify"
import TokenListModal from "@/components/iloCard/TokenlistModal"

const DepositCard_Content = ({ poolSelected }) => {
  const [hash, setHash] = useState("0x")
  const { address } = useAccount()
  const [inputValue, setInputValue] = useState(1781.84)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTokenlist, setSelectedTokenlist] = useState(0) // 0 input of tokenlist,1 out of tokenlist
  const [selectedCoin_input, setSelectedCoin_input] = useState("tokenA")
  const [selectedCoin_out, setSelectedCoin_out] = useState("tokenB")
  const inputAmountRef = useRef(null)
  const inputBmountRef = useRef(null)
  const [receiveTokenAmount, setReceiveTokenAmount] = useState("0.0")
  const [inputTokenPriceForOutToken, setInputTokenPriceForOutToken] =
    useState("0.0")

  const [currentInputTokenContract, setCurrentInputTokenContract] =
    useState("0x")
  const [currentOutTokenContract, setCurrentOutTokenContract] = useState("0x")

  const [isOpen_Alert, setIsOpen_Alert] = useState(false)
  const [isLoading_Btn, setIsLoading_Btn] = useState(false)

  // const [poolSelected, setPoolSelected] = useState("pool1");

  const confirmation = useWaitForTransaction({
    hash: hash,
    onSuccess(data) {
      setIsLoading_Btn(false)
      toast.success("Deposit Success!")
    }
  })

  const updatePool1Selected = (pool) => {
    setPool1Selected(pool)
  }

  //获取tokenA余额
  const { data: tokenABalance } = useBalance({
    address: address,
    token: selectedCoin_input === "ETH" ? undefined : currentInputTokenContract, // undefined是查询ETH余额
    watch: true
  })

  //获取tokenB余额
  const { data: tokenBBalance } = useBalance({
    address: address,
    token: selectedCoin_out === "ETH" ? undefined : currentOutTokenContract, // undefined是查询ETH余额
    watch: true
  })

  // approve tokenA config
  const { config: approveTokenAConfig } = usePrepareContractWrite({
    address: currentInputTokenContract,
    abi: Mumbai_faucet_abi,
    functionName: "approve",
    args: [
      poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
      ethers.utils.parseEther(inputAmountRef.current?.value || "0")
    ]
  })
  // approve tokenA action
  const { writeAsync: approveTokenAWrite } = useContractWrite({
    address: currentInputTokenContract,
    abi: Mumbai_faucet_abi,
    functionName: "approve",
    args: [
      poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
      ethers.utils.parseEther(inputAmountRef.current?.value || "0")
    ],
    onError(error) {
      console.log("Error", error)
    }
  })

  // approve tokenB config
  const { config: approveTokenBConfig } = usePrepareContractWrite({
    address: currentOutTokenContract,
    abi: Mumbai_faucet_abi,
    functionName: "approve",
    args: [
      poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
      ethers.utils.parseEther(inputBmountRef.current?.value || "0")
    ]
  })
  // approve tokenB action
  const { writeAsync: approveTokenBWrite } = useContractWrite({
    address: currentOutTokenContract,
    abi: Mumbai_faucet_abi,
    functionName: "approve",
    args: [
      poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
      ethers.utils.parseEther(inputBmountRef.current?.value || "0")
    ],
    onError(error) {
      console.log("Error", error)
    }
  })

  // addLiquidity config
  const { config: addLiquidityConfig } = usePrepareContractWrite({
    address:
      poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
    abi: Mumbai_yexExample_abi,
    functionName: "addLiquidity",
    args: [
      ethers.utils.parseEther(inputAmountRef.current?.value || "0"),
      ethers.utils.parseEther(inputBmountRef.current?.value || "0")
    ]
  })

  // addLiquidity action
  const { writeAsync: addLiquidityWrite } = useContractWrite({
    address:
      poolSelected === "pool1"
        ? Mumbai_yexExample_address
        : Mumbai_yexExample_pool2_address,
    abi: Mumbai_yexExample_abi,
    functionName: "addLiquidity",
    account: address,
    args: [
      ethers.utils.parseEther(inputAmountRef.current?.value || "0"),
      ethers.utils.parseEther(inputBmountRef.current?.value || "0")
    ],
    onMutate({ args, overrides }) {
      console.log("Mutate", { args, overrides })
    },
    onError(error) {
      console.log("Error", error)
    }
  })

  const addLiquidity = async () => {
    setIsLoading_Btn(true)
    try {
      // Approve token A
      const approveTokenAResult = await approveTokenAWrite()
      console.log("Approve Token A Result:", approveTokenAResult)

      // Approve token B
      const approveTokenBResult = await approveTokenBWrite()
      console.log("Approve Token B Result:", approveTokenBResult)

      // Send addLiquidity transaction
      const addLiquidityResult = await addLiquidityWrite().then((res) => {
        setHash(res.hash)
      })
      console.log("Add Liquidity Result:", addLiquidityResult)

      setIsLoading_Btn(false)
    } catch (err) {
      console.log(err)
      setIsLoading_Btn(false)
    }
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
  useEffect(() => {
    if (Number(inputAmountRef.current?.value) === 0) {
      setReceiveTokenAmount("0.0")
    }
  }, [inputAmountRef.current?.value])
  useEffect(() => {
    if (Number(inputBmountRef.current?.value) === 0) {
      setReceiveTokenAmount("0.0")
    }
  }, [inputBmountRef.current?.value])

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

  const inputTokenAPercentSelect = (value) => {
    inputAmountRef.current.value = tokenABalance
      ? ((tokenABalance?.formatted * value) / 100).toFixed(6)
      : "0.0"
  }

  const inputTokenBPercentSelect = (value) => {
    inputBmountRef.current.value = tokenBBalance
      ? ((tokenBBalance?.formatted * value) / 100).toFixed(6)
      : "0.0"
  }

  return (
    <div className="flex-col mt-8">
      {/* tokenA */}
      <div className=" bg-white  bg-opacity-50 rounded-xl p-4 relative">
        <div className="flex-col">
          <div className="flex justify-between">
            <div className="text-2xl w-[calc(100%-130px)]">
              <input
                type="number"
                step="0.0000001"
                placeholder="0.0"
                className="bg-transparent border-none text-3xl outline-none w-full "
                ref={inputAmountRef}
                pattern="[0-9]*"
                onKeyPress={(event) => {
                  if (!/[0-9.]/.test(event.key)) {
                    event.preventDefault()
                  }
                }}
              />
            </div>
            {/* coinlist */}
            <div
              className="flex bg-white rounded-full shadow-lg items-center px-3 hover:cursor-pointer hover:bg-opacity-0"
              onClick={openModal_input}
            >
              <div className="w-[24px] h-[24px]">
                <img
                  alt=""
                  src="data:image/png;base64,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"
                />
              </div>
              <div className="ml-2">{selectedCoin_input}</div>
              <div className="ml-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-0"
                >
                  <path
                    fill="#5155a6"
                    fillRule="nonzero"
                    d="M4.036 6.571.5 3.036l.786-.786L4.037 5l2.748-2.75.786.786z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          {/* Balance */}
          <div className="flex justify-between mt-3 text-gray-600 text-sm">
            <div>
              {/* {"$" +
                                inputValue.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                    useGrouping: true,
                                })} */}
            </div>
            <div className="">{`Balance: ${
              tokenABalance
                ? Number(tokenABalance?.formatted).toFixed(6)
                : "0.0"
            } `}</div>
          </div>
          {/* 百分比选择 */}
          <div className="flex justify-start gap-7 mt-2 text-sm">
            <div
              className="w-1/5 border-slate-200 border  rounded-xl text-center py-1 hover:cursor-pointer hover:border-slate-400 ripple-btn active:border-slate-600"
              onClick={() => {
                inputTokenAPercentSelect(25)
              }}
            >
              25%
            </div>
            <div
              className="w-1/5 border-slate-200 border  rounded-xl text-center py-1 hover:cursor-pointer hover:border-slate-400 ripple-btn active:border-slate-600"
              onClick={() => {
                inputTokenAPercentSelect(50)
              }}
            >
              50%
            </div>
            <div
              className="w-1/5 border-slate-200 border  rounded-xl text-center py-1 hover:cursor-pointer hover:border-slate-400 ripple-btn active:border-slate-600"
              onClick={() => {
                inputTokenAPercentSelect(75)
              }}
            >
              75%
            </div>
            <div
              className="w-1/5 border-slate-200 border  rounded-xl text-center py-1 hover:cursor-pointer hover:border-slate-400 ripple-btn active:border-slate-600"
              onClick={() => {
                inputTokenAPercentSelect(100)
              }}
            >
              100%
            </div>
          </div>
        </div>
      </div>
      {/* tokenB */}
      <div className=" bg-white  bg-opacity-50 rounded-xl p-4 relative mt-4">
        <div className="flex-col">
          <div className="flex justify-between">
            <div className="text-2xl w-[calc(100%-130px)]">
              <input
                type="number"
                step="0.0000001"
                placeholder="0.0"
                className="bg-transparent border-none text-3xl outline-none w-full "
                ref={inputBmountRef}
                pattern="[0-9]*"
                onKeyPress={(event) => {
                  if (!/[0-9.]/.test(event.key)) {
                    event.preventDefault()
                  }
                }}
              />
            </div>
            {/* coinlist */}
            <div
              className="flex bg-white rounded-full shadow-lg items-center px-3 hover:cursor-pointer hover:bg-opacity-0"
              onClick={openModal_out}
            >
              <div className="w-[24px] h-[24px]">
                <img
                  alt=""
                  src="data:image/png;base64,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"
                />
              </div>
              <div className="ml-2">{selectedCoin_out}</div>
              <div className="ml-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-0"
                >
                  <path
                    fill="#5155a6"
                    fillRule="nonzero"
                    d="M4.036 6.571.5 3.036l.786-.786L4.037 5l2.748-2.75.786.786z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          {/* Balance */}
          <div className="flex justify-between mt-3 text-gray-600 text-sm">
            <div>
              {/* {"$" +
                                inputValue.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                    useGrouping: true,
                                })} */}
            </div>
            <div className="">{`Balance: ${
              tokenBBalance
                ? Number(tokenBBalance?.formatted).toFixed(6)
                : "0.0"
            } `}</div>
          </div>
          {/* 百分比选择 */}
          <div className="flex justify-start gap-7 mt-2 text-sm">
            <div
              className="w-1/5 border-slate-200 border  rounded-xl text-center py-1 hover:cursor-pointer hover:border-slate-400 ripple-btn active:border-slate-600"
              onClick={() => {
                inputTokenBPercentSelect(25)
              }}
            >
              25%
            </div>
            <div
              className="w-1/5 border-slate-200 border  rounded-xl text-center py-1 hover:cursor-pointer hover:border-slate-400 ripple-btn active:border-slate-600"
              onClick={() => {
                inputTokenBPercentSelect(50)
              }}
            >
              50%
            </div>
            <div
              className="w-1/5 border-slate-200 border  rounded-xl text-center py-1 hover:cursor-pointer hover:border-slate-400 ripple-btn active:border-slate-600"
              onClick={() => {
                inputTokenBPercentSelect(75)
              }}
            >
              75%
            </div>
            <div
              className="w-1/5 border-slate-200 border  rounded-xl text-center py-1 hover:cursor-pointer hover:border-slate-400 ripple-btn active:border-slate-600"
              onClick={() => {
                inputTokenBPercentSelect(100)
              }}
            >
              100%
            </div>
          </div>
        </div>
      </div>
      {/* button */}
      <div
        className="flex justify-center items-center text-center font-semibold w-full mt-5 h-12 bg-indigo-400 text-white hover:cursor-pointer py-2 rounded-xl ripple-btn"
        onClick={addLiquidity}
      >
        {isLoading_Btn && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin h-5 w-5 mr-3 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        Deposit
      </div>
      {/* 代币列表modal */}
      <TokenListModal
        isOpen={isOpen}
        closeModal={closeModal}
        selectedTokenlist={selectedTokenlist}
        selectedCoin_input={selectedCoin_input}
        setSelectedCoin_input={setSelectedCoin_input}
        selectedCoin_out={selectedCoin_out}
        setSelectedCoin_out={setSelectedCoin_out}
      />
    </div>
  )
}

export default DepositCard_Content
