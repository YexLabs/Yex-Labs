import Layout from "@/components/layout"
import "../styles/globals.css"
import { useIsMounted } from "@/hooks/useIsMounted"
import { Web3Provider } from "providers/Web3"
import Seo from "@/components/layout/Seo"

function MyApp({ Component, pageProps }) {
  const isMounted = useIsMounted()
  return (
    <>
      <Seo />
      <Web3Provider>
        {isMounted && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </Web3Provider>
    </>
  )
}

export default MyApp
