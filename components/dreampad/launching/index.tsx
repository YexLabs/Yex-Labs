import { FunctionComponent, useState } from "react";
import { Project } from "./ProjectCard";
import { ProjectList } from "./ProjectList";
import Modal1 from "@/app/components/Modal1";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";

export const Launching: FunctionComponent = () => {
  const router = useRouter();
  return (
    <>
      <section className="w-full flex flex-col items-center justify-center gap-[25px] text-left text-[32px] text-white font-segoe-ui">
        <div className="self-stretch flex flex-row items-center justify-between gap-[20px] mq675:flex-wrap">
          <h1 className="m-0 h-[43px] relative text-inherit font-bold font-inherit inline-block mq450:text-[19px] mq750:text-[26px]">{`Dreampad beta `}</h1>
          <div className="h-[30px] w-[260px] flex flex-row items-start justify-start gap-[8px] text-center text-xs text-baseblue">
            <button onClick={() => router.push('/launchtoken')} className="cursor-pointer py-[3.9382238388061523px] px-[7.876447677612305px] bg-baseblue h-[33.28px] flex-1 rounded-11xl box-border overflow-hidden flex flex-row items-center justify-center gap-[3.28px] border-[2px] border-solid border-borderColor">
              <b className="relative text-xs leading-[5.25px] font-segoe-ui text-black text-center">
                Launch Token
              </b>
            </button>
            <div className="self-stretch rounded-11xl overflow-hidden flex flex-row items-center justify-center py-[3.9382238388061523px] px-[7.876447677612305px] gap-[3.28px]">
              <img
                className="h-[5.3px] w-[5.3px] relative object-cover hidden"
                alt=""
              />
              <b className="relative leading-[5.25px]">Get USDC Faucet</b>
              <img
                className="h-[5.3px] w-[5.3px] relative object-cover hidden"
                alt=""
              />
            </div>
          </div>
        </div>
        <ProjectList></ProjectList>
      </section>
      </>
  );
}
