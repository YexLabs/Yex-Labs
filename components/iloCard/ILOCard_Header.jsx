import React from "react"
import eth_icon from "@/assets/images/pools/eth.png"
import { ILO_ADDRESS } from "../../contracts/addresses"
import { truncateAddress } from "../../utils"
import { toast } from "react-toastify"
import useILOContract from "@/hooks/useILOContract"
import Image from "next/image"
import { ethers } from "ethers"
import ILO_Faucet from "./ILO_Faucet"
import { formatAmount } from "@/lib/number"
import { AmountFormat } from "../amounFormat"

export default function ILOCard_Header({ token }) {
  const {
    depositedTokenA,
    lockedTokenB,
    setRasingPaused,
    ftoState,
    tokenB,
    tokenBbalanceData
  } = useILOContract(token)

  const rasingPaused = async () => {
    try {
      await setRasingPaused()
    } catch (e) {
      toast.error(e?.reason)
    }
  }
  return (
    <div>
      {/* <ILO_Faucet /> */}
      <div className="flex justify-between mt-4 items-center">
        <div className="flex">
          <div className="w-14 h-14 relative">
            <Image src={eth_icon} alt="ETH" fill/>
          </div>
          <div className="flex-col ml-2">
            <div className="text-2xl font-semibold">
              {`${tokenBbalanceData?.symbol} ILO`}
            </div>
            <div className="text-sm flex">
              <div className="text-indigo-600 mr-1">Contract on</div>
              <div>{truncateAddress(tokenB || "0")}</div>
            </div>
          </div>
        </div>
        <div>
          {ftoState == 2 ? (
            <div
              className="rounded-lg bg-indigo-600 animate-bounce text-white p-2"
              // onClick={rasingPaused}
            >
              LIVE
            </div>
          ) : (
            <div
              className={`rounded-lg  ${
                ethers.utils.formatUnits(depositedTokenA || 0, 18) > 0
                  ? " bg-green-400"
                  : "bg-gray-400"
              }  cursor-not-allowed text-white p-2`}
            >
              {ethers.utils.formatUnits(depositedTokenA || 0, 18) > 0
                ? "SUCCESS"
                : "FAILED"}
            </div>
          )}
        </div>
      </div>
      <div className="flex mt-6 px-6 gap-24 justify-center">
        <div className="flex-col justify-center items-center text-center">
          <div className="text-sm text-indigo-600">Uniform Price</div>
          <div className="">
            {lockedTokenB
              ? <AmountFormat amount={ethers.utils.formatUnits(depositedTokenA || 0, 18) /
                ethers.utils.formatUnits(lockedTokenB, 18)}></AmountFormat>
              : "0.0"}
          </div>
        </div>
        <div className="flex-col justify-center items-center text-center">
          <div className="text-sm text-indigo-600">Total Sale Token B</div>
          <div className="flex justify-center items-center">
            <div>
              {lockedTokenB
                ? <AmountFormat amount={ethers.utils.formatUnits(lockedTokenB || 0, 18)}></AmountFormat>
                : "0.0"}
            </div>
            <div className="w-4 h-4 ml-1 relative">
              <Image src={eth_icon} alt="ETH" fill/>
            </div>
          </div>
        </div>
        <div className="flex-col justify-center items-center text-center">
          <div className="text-sm text-indigo-600">User Deposited Token</div>
          <div className="flex justify-center items-center">
            <div>
              {depositedTokenA
                ? ethers.utils.formatUnits(depositedTokenA || 0, 18)
                : "0.0"}
            </div>
            <div className="w-4 h-4 ml-1 relative">
              <Image src={eth_icon} alt="ETH" fill />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
