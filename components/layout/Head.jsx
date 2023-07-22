import React from "react"
import { default as NextHead } from "next/head"
import { SITE_DESCRIPTION, SITE_NAME } from "@/config/constant"

export default function Head(props) {
  return (
    <NextHead>
      <title>{props.title ?? SITE_NAME}</title>
      <meta
        name="description"
        content={props.description ?? SITE_DESCRIPTION}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>
  )
}
