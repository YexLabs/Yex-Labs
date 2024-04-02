import BigNumber from "bignumber.js"

export const formatAmount = (amount: number | string) => {
  if (new BigNumber(amount).gt(1)) {
    return {
      start: new BigNumber(new BigNumber(amount).toFixed(6)).toFixed()
    }
  }
  // 查找小数点后连续的零
  const match = String(amount).match(/0\.0*(\d+)/)
  if (match) {
    // 计算连续零的个数
    const zeroCount = match[0].length - match[1].length - 2 // 减去小数点和非零数字的长度
    // 构造新的格式
    return zeroCount > 4 ? {
      start: `0.0`,
      zeroCount,
      end: match[1].substring(0,4)
    } : {
      start: new BigNumber(new BigNumber(amount).toFixed(6)).toFixed()
    }
  }

  return {
    start: String(amount)
  }
}
