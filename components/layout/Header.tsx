import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useRouter } from "next/router"

export const Header = () => {
  const router = useRouter()
  const menus = [
    {
      name: "Swap",
      to: "/"
    },
    {
      name: "Pool",
      to: "/"
    },
    {
      name: "Portfolio",
      to: "/"
    },
    {
      name: "launching",
      to: "/launching"
    }
  ]
  return (
    <header className="w-[100%]  max-w-[1440px] flex flex-row items-center h-[70px] justify-between gap-[20px]  text-left text-lgi-5 text-white font-segoe-ui mq750:w-[335px]">
      <img
        className="h-[43.6px] w-40 relative object-cover cursor-pointer"
        loading="eager"
        alt=""
        onClick={() => router.push("/")}
        src="/logo.png"
      />
      <div className="flex w-[481px] flex-row items-start  justify-between  max-w-full">
        {menus.map((menu, index) => (
          <b onClick={() =>  router.push(menu.to)} className=" cursor-pointer relative tracking-[0.24px]">{menu.name}</b>
        ))}
      </div>
      <ConnectButton />
    </header>
  )
}
