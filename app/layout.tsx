import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import { JetBrains_Mono } from 'next/font/google';
import './reset.css';
import './globals.css';
import GoogleAnalytics from './components/GoogleAnalytics';

// const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YexLabs',
  description: 'Building The Future of Web 3.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>
        <GoogleAnalytics />
        <div style={{ height: '50px', width: '20px' }}></div> {/* Spacer for NavBar (same height as navbar)*/}
        {children}
      </body>
    </html>
  )
}
