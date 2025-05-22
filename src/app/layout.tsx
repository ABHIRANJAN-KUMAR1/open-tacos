'use client'

import '@/public/fonts/fonts.css'
import './global.css'

import { SessionProvider } from 'next-auth/react'

/**
 * Root layout for the not-found page
 */
export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): any {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className='relative'>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
