import Layout from "@/components/layout"
import "@/app/globals.css"
import { useIsMounted } from "@/hooks/useIsMounted"
import { Web3Provider } from "providers/Web3"
import Seo from "@/components/layout/Seo"
import { AlertProvider } from "@/components/alert/Alert"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const isMounted = useIsMounted()
  return (
    <>
      <Seo />

      {/* Same as */}
      <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
      <Web3Provider>
        {isMounted && (
 
            <Layout>
              <Component {...pageProps} />
            </Layout>

        )}
      </Web3Provider>
      <ToastContainer />
    </>
  )
}

export default MyApp
