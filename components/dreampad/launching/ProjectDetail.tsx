import React, { useState, useMemo, useEffect } from "react"
import { useAccount, useContractRead } from "wagmi"
import { toast } from "react-toastify"
import useILOContract from "@/hooks/useILOContract"
import { formatEther, parseEther } from "viem"
import { truncateAddress } from "@/utils"
import { ethers } from "ethers"
import { Button } from "@/components/button/Button"
import { useRouter } from "next/router"
import { Header } from "./Header"
import BigNumber from "bignumber.js"
import { MUBAI_FTO_PAIR_ABI } from "@/contracts/abis"
import { Copy } from "../../copy/index"
import { waitForTransaction } from "@wagmi/core"
import { AmountFormat } from "@/components/amounFormat"

const LabelGroup = ({ list, onChange }) => {
  const [selected, setSelected] = useState(0)
  return (
    <div className=" flex flex-row items-center justify-between gap-[6.56px] text-left text-4xs-4 text-gray-600 font-segoe-ui">
      {list.map((item, index) => (
        <div
          onClick={() => {
            setSelected(item.value)
            onChange(item)
          }}
          className={
            item.value == selected
              ? " cursor-pointer flex w-[45.952px] justify-center h-[24px] items-center shrink-0 border-[color:var(--b-5-dce-1,rgba(181,220,225,0.50))] [background:var(--b-5-dce-1,#B5DCE1)] p-[5.968px] rounded-[17.903px] border-[1.194px] border-solid"
              : "cursor-pointer flex w-[45.952px] justify-center  h-[24px] items-center gap-[2.984px] shrink-0 border-[color:var(--b-5-dce-1,rgba(181,220,225,0.50))] [background:var(--b-5-dce-1,rgba(181,220,225,0.50))] p-[5.968px] rounded-[17.903px] border-[0.597px] border-solid"
          }
        >
          <div className="relative">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

export const ProjectDetail = ({ token }) => {
  const { address } = useAccount()

  const [amount, setAmount] = useState(0)

  const [isOpen, setIsOpen] = useState(false)
  const [selectedTokenlist, setSelectedTokenlist] = useState(0)
  const [selectedCoin_input, setSelectedCoin_input] = useState("TTA")
  const [selectedCoin_out, setSelectedCoin_out] = useState("USDC")
  const [balance, setBalance] = useState("0")
  const [depositLoading, setDepositLoading] = useState(false)
  const {
    depositedTokenA,
    lockedTokenB,
    setRasingPaused,
    tokenB,
    tokenBName,
    tokenBbalanceData,
    approveTokenAWrite,
    setDepositAmount,
    depositWrite,
    ftoState,
    tokenA,
    tokenAbalanceData,
    claimableLP,
    tokenB_provider,
    claimLPWrite,
    providerWithdraw,
    allownedTokenToFTO
  } = useILOContract(token)
  const needApprove = useMemo(() => {
    return new BigNumber(
      formatEther((allownedTokenToFTO as any) || 0)
    ).isLessThan(amount || 0)
  }, [amount, allownedTokenToFTO])
  const deposit = async () => {
    setDepositLoading(true)
    setDepositAmount(String(amount))
    try {
      if (needApprove) {
        const { hash } = await approveTokenAWrite()
        await waitForTransaction({ hash })
      }
      const { hash } = await depositWrite()
      await waitForTransaction({ hash })
      // await approveTokenAWrite()
    } catch (e) {
      toast.error(e?.reason)
    }
    setDepositLoading(false)
  }

  const claim = async () => {
    setDepositLoading(true)
    setDepositAmount(String(amount))
    try {
      // await approveTokenAWrite()

      const { hash } = await claimLPWrite()
      await waitForTransaction({ hash })
    } catch (e) {
      toast.error(e?.reason)
    }
    setDepositLoading(false)
  }

  const { data: end_time } = useContractRead({
    address: token as any,
    abi: MUBAI_FTO_PAIR_ABI,
    functionName: "end_time"
  })

  const getTimeDiff = () => {
    return Number(end_time) - Math.floor(Date.now() / 1000)
  }

  const provider_claim = async () => {
    setDepositLoading(true)
    setDepositAmount(String(amount))
    try {
      // await approveTokenAWrite()

      const { hash } = await providerWithdraw()
      await waitForTransaction({ hash })
    } catch (e) {
      toast.error(e?.reason)
    }
    setDepositLoading(false)
  }

  const openModal_input = () => {
    setSelectedTokenlist(0)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const onSetPercent = (percent) => {
    if (!tokenAbalanceData) return
    setAmount((Number(tokenAbalanceData.formatted || 0) * percent) / 100)
  }

  useEffect(() => {
    setDepositAmount(String(amount))
  }, [amount])
  const router = useRouter()
  const isProgress = ftoState == 2 && getTimeDiff() >= 0
  return (
    <>
      <Header title={tokenBName}></Header>
      <div className="flex justify-center mt-[91px]">
        <div className=" overflow-hidden relative w-[443px] pb-[24px] shrink-0 border border-[color:var(--b-5-dce-1,rgba(181,220,225,0.50))] [background:#1C1C2D] pt-12 px-5 rounded-[14px] border-solid">
          {isProgress ? (
            <div className="bg-[rgba(67,217,163,0.50)] absolute w-[114px] h-[27px] flex items-center justify-center text-[#42F6B6] text-center [font-family:Open_Sans] text-[13px] font-normal leading-[normal] left-[0] top-[0]">
              Currently Live
            </div>
          ) : Number(
              ethers.utils.formatUnits((depositedTokenA as any) || 0, 18)
            ) > 0 ? (
            <div className="bg-[rgba(67,217,163,0.50)] absolute w-[114px] h-[27px] flex items-center justify-center text-[#42F6B6] text-center [font-family:Open_Sans] text-[13px] font-normal leading-[normal] left-[0] top-[0]">
              SUCCESS
            </div>
          ) : (
            <div className="bg-[rgba(128,128,128,0.5)] absolute w-[114px] h-[27px] flex items-center justify-center text-[rgba(128,128,128,1)] text-center [font-family:Open_Sans] text-[13px] font-normal leading-[normal] left-[0] top-[0]">
              FAILED
            </div>
          )}
          <div className="h-[64px]">
            <div className="flex items-center justify-center">
              <img
                className="h-[27.2px] w-[27.2px] relative object-cover"
                alt=""
                src="/mask-group-1@2x.png"
              />
              <div className="ml-[6px]">{tokenBName}</div>
            </div>
            <div className="mt-[8px] flex justify-center">
              <div className="text-[#B5DCE1]">Contract on: </div>
              <div className="ml-[6px] flex align-middle  text-[rgba(255,255,255,0.50)]">
                {truncateAddress(tokenB || "0")}
                <Copy value={tokenB as string} />
              </div>
            </div>
          </div>
          <div className="mt-[8px] flex h-[60px] justify-between items-center [background:#272738] rounded-[14px]">
            <div>
              <div className="text-white text-center text-xs font-bold leading-[normal]">
                Uniform Price
              </div>
              <div className="mt-[8px] w-[124px] h-4 text-[rgba(255,255,255,0.50)] text-center text-xs font-bold leading-[normal]">
                {lockedTokenB
                  ? <AmountFormat amount={
                    BigNumber(
                      ((ethers.utils.formatUnits(
                        (depositedTokenA as any) || 0,
                        18
                      ) as any) /
                        //@ts-ignore
                        ethers.utils.formatUnits(
                          lockedTokenB as any,
                          18
                        )) as any
                    ).toFixed()
                  }></AmountFormat>
                  : "0.0"}
              </div>
            </div>
            <div>
              <div className="text-white text-center text-xs font-bold leading-[normal]">
                Total Sale Token B
              </div>
              <div className="mt-[8px] w-[124px] h-4 text-[rgba(255,255,255,0.50)] text-center text-xs font-bold leading-[normal]">
                {lockedTokenB
                  ? <AmountFormat amount={ethers.utils.formatUnits((lockedTokenB as any) || 0, 18)}></AmountFormat>
                  : "0.0"}
              </div>
            </div>
            <div>
              <div className="text-white text-center text-xs font-bold leading-[normal]">
                User Deposited Token
              </div>
              <div className="mt-[8px] w-[124px] h-4 text-[rgba(255,255,255,0.50)] text-center text-xs font-bold leading-[normal]">
                {depositedTokenA
                  ? <AmountFormat amount={ ethers.utils.formatUnits(
                    (depositedTokenA as any) || 0,
                    18
                  )}></AmountFormat>
                  : "0.0"}
              </div>
            </div>
          </div>
          {isProgress && getTimeDiff() >= 0 ? (
            <>
              <div className="mt-[25px] w-[411px] h-[52px] [background:#272738] px-4 py-0 rounded-[11.563px]">
                <input
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value as any)}
                  className="h-[31px] p-0 outline-none w-full  border-none rounded-md text-[#FAFAFC] [background:#272738]  [font-family:JetBrains_Mono] text-[15.176px] font-bold leading-[17.344px]"
                ></input>
                <div className="mt-[4px] text-left text-[#9E9DA3] [font-family:JetBrains_Mono] text-[10.117px] font-bold leading-[8.672px] tracking-[0.101px]">
                  Balance: {tokenAbalanceData?.formatted || "0.0"}
                </div>
              </div>
              <div className="mt-[12px] flex justify-end">
                <LabelGroup
                  list={[
                    { label: "25%", value: 25 },
                    { label: "50%", value: 50 },
                    { label: "75%", value: 75 },
                    { label: "100%", value: 100 }
                  ]}
                  onChange={(item) => {
                    onSetPercent(item.value)
                  }}
                ></LabelGroup>
              </div>
            </>
          ) : (
            <div className="mt-[16px]">
              {formatEther((claimableLP as any) || 0)}
            </div>
          )}
          <div className="mt-[24px] flex  justify-center">
            {isProgress ? (
              <Button
                isLoading={depositLoading}
                onClick={deposit}
                className=" cursor-pointer border-[4px solid var(--b-5-dce-1, rgba(181, 220, 225, 0.50))] flex w-[362px] h-[45px] justify-center items-center gap-2.5 border-[color:var(--b-5-dce-1,rgba(181,220,225,0.50))] [background:var(--b-5-dce-1,#B5DCE1)] px-6 py-3 rounded-md border-4 border-solid text-black text-center [font-family:Segoe_UI] text-base font-bold leading-4"
              >
                Deposit
              </Button>
            ) : ftoState === 0 ? (
              <Button
                isLoading={depositLoading}
                onClick={claim}
                className=" cursor-pointer border-[4px solid var(--b-5-dce-1, rgba(181, 220, 225, 0.50))] flex w-[362px] h-[45px] justify-center items-center gap-2.5 border-[color:var(--b-5-dce-1,rgba(181,220,225,0.50))] [background:var(--b-5-dce-1,#B5DCE1)] px-6 py-3 rounded-md border-4 border-solid text-black text-center [font-family:Segoe_UI] text-base font-bold leading-4"
              >
                Claim LP
              </Button>
            ) : (
              tokenB_provider == address && (
                <Button
                  isLoading={depositLoading}
                  onClick={provider_claim}
                  className=" cursor-pointer border-[4px solid var(--b-5-dce-1, rgba(181, 220, 225, 0.50))] flex w-[362px] h-[45px] justify-center items-center gap-2.5 border-[color:var(--b-5-dce-1,rgba(181,220,225,0.50))] [background:var(--b-5-dce-1,#B5DCE1)] px-6 py-3 rounded-md border-4 border-solid text-black text-center [font-family:Segoe_UI] text-base font-bold leading-4"
                >
                  Provider Withdraw
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}
