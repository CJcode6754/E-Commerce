import ShopFooter from '@/components/frontend/ShopFooter'
import ShopHeader from '@/components/frontend/ShopHeader'
import { ThemeProvider } from '@/components/theme-provider'
import React, { ReactNode } from 'react'

export default function ShopFrontLayout({children}: {children:ReactNode}) {
  return (
    <div className='bg-white dark:bg-gray'>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <ShopHeader/>
            {children}
            <ShopFooter/>
        </ThemeProvider>
    </div>
  )
}
