import Head from "@/components/layout/Head"
import Image from "next/image"

import yexbanner from "@/assets/images/intro/yexbanner.png"
import honeypot_banner from "@/assets/images/intro/honeypot.png"
import scroll_banner from "@/assets/images/intro/scroll.png"
import berachain_banner from "@/assets/images/intro/bera.png"
import splatter_banner from "@/assets/images/intro/splatter.png"
import chainlink_banner from "@/assets/images/intro/chainlink.svg"

const Home = () => {
  return (
    <div className="container">
      <Head />
      <main>
        <div className="box-border mx-auto mb-7 min-h-screen md:min-h-auto md:h-auto md:pt-7">
          <div className="mb-[100px] relative">
            <div className="flex flex-col box-border mx-auto w-full max-w-screen-lg pt-40">
              <div className="flex flex-col cursor-default">
                <div className="flex flex-col ml-24 text-left m-2 gap-8">
                  <div className="flex flex-col max-w-1/2">
                    <div>
                      <p className="font-medium text-4xl z-40">
                        A research based Core Contracts development team{" "}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-4xl z-40">
                        Working for{" "}
                        <span className="scrollTextGradient z-40">
                          innovation in Web 3.0
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col fade-in  gap-1">
                    <p className="text-lg font-medium z-40">
                      y=e<sup>x</sup> Lab leads people to a democratic and
                      decentralized Web 3.0 world.
                    </p>
                    <p className=" w-1/2 text-left text-gray-500 mt-2 z-40">
                      We firmly believe that decentralization is
                      community-centric. The community chooses their development
                      team, their front-end, and their smart contracts to
                      realize the products they want. We focus on innovating and
                      ready for call of any community.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center mt-2 mx-2">
                <div className="px-12">
                  <Image src={yexbanner} />
                </div>
              </div>

              <div className="flex flex-col items-center mt-16 mx-2">
                <div className="flex flex-col gap-2 items-center">
                  <p className=" text-4xl font-semibold">Built with the Best</p>
                  <p className="  text-center">
                    Thanks to our best Partners and Services.
                  </p>
                  <div>
                    {" "}
                    <div className=" grid grid-cols-5 gap-6 grid-flow-row mt-8">
                      <Image
                        src={chainlink_banner}
                        className=" mx-4 w-52 h-16"
                      />
                      <Image
                        src={berachain_banner}
                        className=" mx-4 w-52 h-16"
                      />
                      <Image src={scroll_banner} className=" mx-4 w-52 h-16" />
                      <Image
                        src={honeypot_banner}
                        className=" mx-4 w-52 h-16"
                      />
                      <Image
                        src={splatter_banner}
                        className=" mx-4 w-52 h-16"
                      />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
