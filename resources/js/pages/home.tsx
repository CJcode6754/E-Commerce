import ShopBanner from '@/components/frontend/ShopBanner'
import ShopCategory from '@/components/frontend/ShopCategory'
import ShopFeaturedProducts from '@/components/frontend/ShopFeaturedProducts'
import ShopFrontLayout from '@/layouts/ShopFrontLayout'
import React from 'react'

const home = () => {
  return (
    <ShopFrontLayout>
      <div className='min-h-screen'>
        <ShopBanner/>
        
        <div className="py-16">
          <ShopCategory/>
        </div>

        <div className="py-8">
          <ShopFeaturedProducts/>
        </div>
      </div>
    </ShopFrontLayout>
  )
}

export default home