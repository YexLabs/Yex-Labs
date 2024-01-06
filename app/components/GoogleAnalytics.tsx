'use client'

import Script from "next/script";
import * as gtag from "@/utils/gtag.js";

export default function GoogleAnalytics() {
    // Only run google analytics in prod: 
    if (process.env.NODE_ENV === 'development') {
        return null;
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gtag.GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                    });
                    `,
                }}
            />
        </>
    )
}
