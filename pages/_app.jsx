import Layout from "@/components/layout"
import "@/app/globals.css"
import { useIsMounted } from "@/hooks/useIsMounted"
import { Web3Provider } from "providers/Web3"
import Seo from "@/components/layout/Seo"
import {AlertProvider} from "@/components/alert/Alert"

function MyApp({ Component, pageProps }) {
  const isMounted = useIsMounted()
  return (
    <>
      <Seo />
      <Web3Provider>
        {isMounted && (
          <AlertProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AlertProvider>
        )}
      </Web3Provider>
    </>
  )
}

export default MyApp
