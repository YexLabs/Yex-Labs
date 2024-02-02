import { useRouter } from "next/router"

export const Header = ({ title }) => {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between">
      <div className="flex">
        <div
          className="text-white cursor-pointer"
          onClick={() => {
            router.push("/launching")
          }}
        >{`<FTO Projects`}</div>
        <div className="text-[rgba(255,255,255,0.50)]">{`/ token`}</div>
      </div>
      <div className="text-white [font-family:Segoe_UI] text-[32px] font-bold leading-[normal]">
        {title}
      </div>
      <div></div>
    </div>
  )
}
