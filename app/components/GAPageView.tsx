'use client'

import { useEffect } from "react";
import { pageview } from "@/utils/gtag";
import { usePathname } from 'next/navigation'

export default function GAPageView() {
    const pathname = usePathname();

    useEffect(()=> {
        console.log(`Recording pageview for ${pathname}`);
        pageview(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <></>
    )
}
