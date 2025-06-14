import ShopFooter from '@/components/frontend/ShopFooter'
import ShopHeader from '@/components/frontend/ShopHeader'
import React, { ReactNode } from 'react'

export default function ShopFrontLayout({children}: {children:ReactNode}) {
  return (
    <div className='bg-white dark:bg-gray'>
        <ShopHeader/>
        {children}
        <ShopFooter/>
    </div>
  )
}
