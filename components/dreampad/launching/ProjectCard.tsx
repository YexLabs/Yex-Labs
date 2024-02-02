import {
  ERC20_ABI,
  MUBAI_FTO_FACTORY_ABI,
  MUBAI_FTO_PAIR_ABI
} from "@/contracts/abis"
import { FTO_FACTORY_ADDRESS } from "@/contracts/addresses"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { formatEther } from "viem"
import { useContractRead } from "wagmi"
import BigNumber from "bignumber.js"

type Project = {
  name: string
  timeline: string
  totalRaised: number
  price: number
  state: string
  toDetail: () => void
}
export const Project = ({ onEndTimeReceived, index }) => {
  const [price, setPrice] = useState("")
  const [state, setState] = useState("")
  const router = useRouter()

  const { data: pairAddress } = useContractRead({
    address: FTO_FACTORY_ADDRESS,
    abi: MUBAI_FTO_FACTORY_ABI,
    functionName: "allPairs",
    args: [index]
  })

  const { data: tokenAAddress } = useContractRead({
    address: pairAddress as any,
    abi: MUBAI_FTO_PAIR_ABI,
    functionName: "tokenA"
  })

  const { data: tokenBAddress } = useContractRead({
    address: pairAddress as any,
    abi: MUBAI_FTO_PAIR_ABI,
    functionName: "tokenB"
  })

  const { data: ftoState } = useContractRead({
    address: pairAddress as any,
    abi: MUBAI_FTO_PAIR_ABI,
    functionName: "ftoState"
  })

  const { data: name } = useContractRead({
    address: tokenBAddress as any,
    abi: ERC20_ABI,
    functionName: "name",
    onSuccess: (data) => {},
    onError: (error) => {}
  })

  const { data: tokenA } = useContractRead({
    address: pairAddress as any,
    abi: MUBAI_FTO_PAIR_ABI,
    functionName: "deposited_TokenA"
  })

  const { data: tokenB } = useContractRead({
    address: pairAddress as any,
    abi: MUBAI_FTO_PAIR_ABI,
    functionName: "deposited_TokenB"
  })

  useEffect(() => {
    if (tokenA && tokenB) {
      const FloatTokenA = formatEther(tokenA as any)
      const FloatTokenB = formatEther(tokenB as any)

      setPrice(BigNumber(FloatTokenB).div(FloatTokenA).toFormat(2))
    }
  }, [tokenA, tokenB])

  const { data: end_time } = useContractRead({
    address: pairAddress as any,
    abi: MUBAI_FTO_PAIR_ABI,
    functionName: "end_time"
  })

  const getTimeDiff = () => {
    return Number(end_time) - Math.floor(Date.now() / 1000)
  }

  const calculateTimeLeft = () => {
    const timeDiff = getTimeDiff()

    const hours = Math.floor(timeDiff / 3600)
    const minutes = Math.floor((timeDiff % 3600) / 60)
    const seconds = timeDiff % 60

    return timeDiff > 0 ? `${hours}h ${minutes}m ${seconds}s` : "0"
  }

  useEffect(() => {
    if (ftoState == 0) {
      setState("Success")
    } else if (ftoState == 1) {
      setState("Failed")
    } else if (getTimeDiff() <= 0) {
      // console.log(ftoState)
      setState("campaign completed")
    } else {
      // console.log(ftoState)
      setState("processing")
    }
  }, [ftoState])

  const timeLeft = end_time ? calculateTimeLeft() : "Loading..."

  useEffect(() => {
    onEndTimeReceived(index, timeLeft)
  }, [timeLeft])

  const handleHackathonClick = () => {
    router.push("/ilo" + "/" + pairAddress)
  }
  return (
    <div className="w-[380px] font-[700]  box-border max-w-full self-stretch rounded-xl bg-gray-400 flex flex-col items-center justify-start pt-8 px-3 pb-3 gap-[6px] border-[0.2px] border-solid border-borderColor">
      <div className="self-stretch h-[159px] flex flex-col items-center justify-start py-0 px-[22px] box-border gap-[16px] mq450:h-auto">
        <div className="flex flex-row items-start justify-start py-0 px-0 gap-[6px]">
          <img
            className="h-[27.2px] w-[27.2px] relative object-cover"
            alt=""
            src="/mask-group-1@2x.png"
          />
          <h2 className="m-0 relative text-inherit font-bold font-inherit mq450:text-mid">
            {name as any}
          </h2>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between py-0 px-px gap-[20px] text-left text-xs text-lightsteelblue-100 mq450:flex-wrap mq450:justify-center">
          <div className="flex flex-col flex-1 items-center justify-start gap-[8px]">
            <b className="relative">Timeline</b>
            <div className="flex flex-row items-center justify-center pt-[5px] pb-[7px] pr-2.5 pl-2 text-center text-2xl text-white">
              <b className="h-7 relative inline-block mq450:text-mid">
                {timeLeft}
              </b>
            </div>
          </div>
          <div className="flex flex-col flex-1 items-center justify-start gap-[8px]">
            <b className="relative">Total Raised</b>
            <div className="flex flex-row items-center justify-center pt-[5px] pb-[7px] pr-[17px] pl-4 text-center text-2xl text-white">
              <b className="h-7 relative inline-block mq450:text-mid">
                {tokenA ? formatEther(tokenA as any).toString() : "0"}
              </b>
            </div>
          </div>
          <div className="flex flex-col flex-1 items-center justify-start gap-[8px]">
            <b className="relative">Price</b>
            <div className="flex flex-col items-center justify-start gap-[1px] text-center text-2xl text-white font-jetbrains-mono">
              <b className="h-7 relative inline-block mq450:text-mid">
                {price ? `$${price}` : '-'}
              </b>
              {/* <div className="relative text-xs text-lightsteelblue-200 text-left">
                  ~$294.349.90
                </div> */}
            </div>
          </div>
        </div>
        <button       onClick={handleHackathonClick} className="cursor-pointer pt-2 px-2 pb-[9px] bg-baseblue  w-[288.28px] h-[33.28px] rounded-md box-border overflow-hidden shrink-0 flex flex-row items-center justify-center gap-[3.28px] border-[2px] border-solid border-borderColor">
          <b
      
            className="relative text-xs leading-[5.25px] flex font-segoe-ui text-black text-center items-center justify-center h-[13px]"
          >
            View Project
          </b>
        </button>
      </div>
      <div className="flex flex-row items-start justify-start py-0 pr-0 pl-3.5 text-left text-xs text-gray-100">
        <b className="relative">{state.toUpperCase()}</b>
      </div>
    </div>
  )
}


