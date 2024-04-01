import BigNumber from "bignumber.js"

export const formatAmount = (amount: number | string) => {
  if (new BigNumber(amount).gt(1)) {
    return new BigNumber(new BigNumber(amount).toFixed(6)).toFixed()
  }
  // 查找小数点后连续的零
  const match = String(amount).match(/0\.0*(\d+)/)
  if (match) {
    // 计算连续零的个数
    const zerosCount = match[0].length - match[1].length - 2 // 减去小数点和非零数字的长度
    // 构造新的格式
    return zerosCount > 3 ? `0.0{${zerosCount}}${match[1].substring(0,4)}` : new BigNumber(new BigNumber(amount).toFixed(6)).toFixed()
  }

  return String(amount)
}
