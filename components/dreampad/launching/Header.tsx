import { useRouter } from "next/router"

export const Header = ({ title }) => {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1">
        <div
          className="text-white cursor-pointer"
          onClick={() => {
            router.push("/launching")
          }}
        >{`<Dreampad beta`}</div>
        <div className="text-[rgba(255,255,255,0.50)]">{`/ token`}</div>
      </div>
      <div className="text-white [font-family:Segoe_UI] text-[32px] font-bold leading-[normal] flex-1">
        {title}
      </div>
      <div className="flex-1"></div>
    </div>
  )
}
