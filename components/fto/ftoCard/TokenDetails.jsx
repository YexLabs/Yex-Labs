import React from "react"

export default function TokenDetails() {
  return (
    <dialog id="tokenDetails_modal" className="modal">
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg mb-8">Token Details</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium">Token Name</label>
          <input type="text" className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Token Symbol</label>
          <input type="text" className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Supply</label>
          <input type="number" className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium">Decimals</label>
          <input type="number" className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="flex justify-center items-center">
          <div className="btn">Launch My Token</div>
        </div>
      </form>
    </dialog>
  )
}
