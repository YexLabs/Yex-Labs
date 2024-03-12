import { CopyIcon } from "@chakra-ui/icons"
import { chakra, ChakraProps, Tooltip } from "@chakra-ui/react"
import { observer, useLocalObservable } from "mobx-react-lite"
import React from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"

interface CopyProps extends ChakraProps {
  value?: string
  //whether or not address convert
  isConvert?: boolean 
  copyTip?: string
}

export const Copy = observer(({ value = '', isConvert = true, copyTip = "Copy address to clipboard", ...restProps }: CopyProps) => {
  const store = useLocalObservable(() => ({
    copied: false,
    isTooltipOpen: false,
    setCopied(copied: boolean) {
      this.copied = copied
    },
    setIsTooltipOpen(isTooltipOpen: boolean) {
      this.isTooltipOpen = isTooltipOpen
    },
  }))

  const CopyTrigger = observer(({ onClick }: { onClick?: any }) => {
    return (
      <Tooltip color="white" hasArrow={true} placement="top" isOpen={store.isTooltipOpen} label={store.copied ? "Copied" : copyTip}>
        <CopyIcon
          onClick={() => {
            onClick?.()
          }}
          onMouseEnter={() => {
            store.setIsTooltipOpen(true)
          }}
          onMouseLeave={() => {
            store.setIsTooltipOpen(false)
            store.setCopied(false)
          }}
          cursor="pointer"
          {...restProps}
        />
      </Tooltip>
    )
  })
  return (
    <span className="ml-[8px]">
      <CopyToClipboard
        text={value}
        onCopy={() => {
          store.setCopied(true)
        }}
      >
        <CopyTrigger />
      </CopyToClipboard>
    </span>
  )
})

Copy.displayName = "Copy"
