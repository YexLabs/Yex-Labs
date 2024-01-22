import NavBar from '../components/NavBar';
import Footer from '../components/Footer';


export default function RootLayout({
        children,
    }: {
        children: React.ReactNode
    }) {
    return (
        <>
            <NavBar />
                {children}
            <Footer />
        </>
    )
  }