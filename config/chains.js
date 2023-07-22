import { mainnet, sepolia, polygon, optimism, arbitrum } from "@wagmi/chains"

const polygonMumbai = {
  id: 80001,
  name: "Polygon Mumbai",
  network: "maticmum",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "MATIC"
  },
  rpcUrls: {
    public: { http: ["https://rpc-mumbai.maticvigil.com"] },
    default: { http: ["https://rpc-mumbai.maticvigil.com"] }
  },
  blockExplorers: {
    etherscan: { name: "PolygonScan", url: "https://mumbai.polygonscan.com" },
    default: { name: "PolygonScan", url: "https://mumbai.polygonscan.com" }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 25770160
    }
  }
}

export const chains = {
  mainnet,
  sepolia,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai
}
