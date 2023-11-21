import { MUBAI_FTO_FACTORY_ABI } from "@/contracts/abis"
import { FTO_FACTORY_ADDRESS } from "@/contracts/addresses"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useContractWrite } from "wagmi"

export default function TokenDetails() {
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

  useEffect(() => {
    setValue("tokenAddress", "0xe33ECF950b53DCC429E6127ed1A6A5085e1918Fe", {
      shouldValidate: true
    })
    setValue("poolHandler", "0x2f2f7197d19A13e8c72c1087dD29d555aBE76C5C", {
      shouldValidate: true
    })
  }, [setValue])

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

  return (
    <dialog id="tokenDetails_modal" className="modal">
      <form
        method="dialog"
        className="modal-box"
        onSubmit={handleSubmit(onSubmit)}
      >
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>{" "}
        </form>
        <h3 className="font-bold text-lg mb-8">Token Details</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium">Token Address</label>
          <input
            type="text"
            defaultValue={"0xe33ECF950b53DCC429E6127ed1A6A5085e1918Fe"}
            disabled
            // {...register("tokenAddress", {
            //   required: "Token Address is required",
            //   pattern: {
            //     value: ethereumAddressPattern,
            //     message: "Invalid Ethereum address"
            //   }
            // })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.tokenAddress && (
            <span className="text-red-500">{errors.tokenAddress.message}</span>
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
          <input type="text" className="mt-1 p-2 w-full border rounded-md" />
          {errors.tokenSymbol && (
            <span className="text-red-500">{errors.tokenSymbol.message}</span>
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
            <span className="text-red-500">{errors.tokenAmount.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Pool Handler</label>
          <input
            type="text"
            defaultValue={"0x2f2f7197d19A13e8c72c1087dD29d555aBE76C5C"}
            disabled
            {...register("poolHandler", {
              required: "Pool Handler is required",
              pattern: {
                value: ethereumAddressPattern,
                message: "Invalid Ethereum address"
              }
            })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.poolHandler && (
            <span className="text-red-500">{errors.poolHandler.message}</span>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium">Rasing Cycle</label>
          <input
            type="number"
            {...register("rasing_cycle", {
              required: "Rasing Cycle is required",
              pattern: {
                value: positiveIntegerPattern,
                message: "Rasing Cycle should be a positive integer"
              }
            })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.rasing_cycle && (
            <span className="text-red-500">{errors.rasing_cycle.message}</span>
          )}
        </div>
        <div className="flex justify-center items-center">
          <button type="submit" className="btn">
            Launch My Token
          </button>
        </div>
      </form>
    </dialog>
  )
}
