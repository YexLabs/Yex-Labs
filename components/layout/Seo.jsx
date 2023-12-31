import React from "react"
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_TWITTER,
  OG_IAMGE
} from "@/config/constant"

import { DefaultSeo } from "next-seo"

export default function Seo() {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : SITE_URL

  return (
    <DefaultSeo
      title={SITE_NAME}
      defaultTitle={SITE_NAME}
      titleTemplate={`%s | ${SITE_NAME}`}
      description={SITE_DESCRIPTION}
      defaultOpenGraphImageWidth={1200}
      defaultOpenGraphImageHeight={630}
      openGraph={{
        type: "website",
        siteName: SITE_NAME,
        url: origin,
        images: [
          {
            url: OG_IAMGE,
            alt: `${SITE_NAME} Open Graph Image`
          }
        ]
      }}
      twitter={{
        handle: `@${SOCIAL_TWITTER}`,
        site: `@${SOCIAL_TWITTER}`,
        cardType: "summary_large_image"
      }}
    />
  )
}
