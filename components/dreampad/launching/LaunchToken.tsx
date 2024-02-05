import { MUBAI_FTO_FACTORY_ABI } from "@/contracts/abis"
import { FTO_FACTORY_ADDRESS, FTO_ROUTER_ADDRESS, USDT_FAUCET_ADDRESS } from "@/contracts/addresses"
import { TextField } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { set, useForm } from "react-hook-form"
import { useContractWrite } from "wagmi"
import LaunchTokenStyles from "./LaunchToken.module.css"
import { Header } from "./Header"
import { Button } from "@/components/button/Button"
export const LaunchToken = () => {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: FTO_FACTORY_ADDRESS,
    abi: MUBAI_FTO_FACTORY_ABI,
    functionName: "createFTO"
  })

  const {
    register,
    handleSubmit,
    
    setValue,
    formState: { errors }
  } = useForm()

  // useEffect(() => {
  //   setValue("tokenAddress", "0xe33ECF950b53DCC429E6127ed1A6A5085e1918Fe", {
  //     shouldValidate: true
  //   })
  //   setValue("poolHandler", "0x2f2f7197d19A13e8c72c1087dD29d555aBE76C5C", {
  //     shouldValidate: true
  //   })
  // }, [setValue])

  const onSubmit = (data) => {
    const {
      tokenAddress,
      tokenName,
      tokenSymbol,
      tokenAmount,
      poolHandler,
      rasing_cycle
    } = data
    write({
      args: [
        tokenAddress,
        tokenName,
        tokenSymbol,
        tokenAmount,
        poolHandler,
        rasing_cycle
      ]
    })
  }

  const ethereumAddressPattern = /^(0x)[0-9A-Fa-f]{40}$/
  const positiveIntegerPattern = /^[1-9]\d*$/
  const minimumTimePattern = /^(6[1-9]|[7-9][0-9]|[1-9][0-9]{2,})$/
  return (
    <>
      <Header title="Dreampad beta"></Header>
      <div className="mt-[91px] flex justify-center">
        <div className="flex w-[620px] h-[851px] justify-center items-center gap-[5px] shrink-0 border border-[color:var(--b-5-dce-1,rgba(181,220,225,0.50))] [background:#1C1C2D] backdrop-blur-[100px] px-[5px] py-0 rounded-[54px] border-solid">
          <form
            method="dialog"
            className={LaunchTokenStyles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium">Token Address</label>
              <input
                type="text"
                // defaultValue={USDT_FAUCET_ADDRESS}
                disabled
                {...register("tokenAddress", {
                  value: USDT_FAUCET_ADDRESS
                
                  // required: "Token Address is required",
                  // pattern: {
                  //   value: ethereumAddressPattern,
                  //   message: "Invalid Ethereum address"
                  // }
                })}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.tokenAddress && (
                <span className="text-red-500">
                  {errors.tokenAddress.message as any}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Token Name</label>
              <input
                type="text"
                {...register("tokenName", { required: true })}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.tokenName && (
                <span className="text-red-500">Token Name is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Token Symbol</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.tokenSymbol && (
                <span className="text-red-500">
                  {errors.tokenSymbol.message as any}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Token Amount</label>
              <input
                type="text"
                {...register("tokenAmount", {
                  required: "Token Amount is required",
                  pattern: {
                    value: positiveIntegerPattern,
                    message: "Token Amount should be a positive integer"
                  }
                })}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.tokenAmount && (
                <span className="text-red-500">
                  {errors.tokenAmount.message as any}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Pool Handler</label>
              <input
                type="text"
                // defaultValue={FTO_ROUTER_ADDRESS}
                disabled
                {...register("poolHandler", {
                  value: FTO_ROUTER_ADDRESS
                  // required: "Pool Handler is required",
                  // pattern: {
                  //   value: ethereumAddressPattern,
                  //   message: "Invalid Ethereum address"
                  // }
                })}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.poolHandler && (
                <span className="text-red-500">
                  {errors.poolHandler.message as any}
                </span>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium">
                Compaign Duration (s)
              </label>
              <input
                type="number"
                {...register("rasing_cycle", {
                  required: "Rasing Cycle is required",
                  pattern: {
                    value: minimumTimePattern,
                    message: "Raising Cycle should be over 60s"
                  }
                })}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.rasing_cycle && (
                <span className="text-red-500">
                  {errors.rasing_cycle.message as any}
                </span>
              )}
            </div>
            <Button
              isLoading={isLoading}
              type="submit"
              className="cursor-pointer flex w-[518px] h-[60px] justify-center items-center gap-2.5 font-bold [background:var(--b-5-dce-1,#B5DCE1)] px-6 py-3 rounded-md border-[5px] border-solid border-[rgba(181,220,225,0.50)]"
            >
              Launch Token
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
