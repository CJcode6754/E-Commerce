import ShopBanner from '@/components/frontend/ShopBanner'
import ShopCategory from '@/components/frontend/ShopCategory'
import ShopFeaturedProducts from '@/components/frontend/ShopFeaturedProducts'
import ShopFrontLayout from '@/layouts/ShopFrontLayout'
import { CategoryItem } from '@/types/categories'
import { ProductItem } from '@/types/products'
import React from 'react'

const home = ({categories, products}:{categories:CategoryItem[], products:ProductItem[]}) => {
  return (
    <ShopFrontLayout>
      <div className='min-h-screen'>
        <ShopBanner/>
        <div className="py-16">
          <ShopCategory categories={categories}/>
        </div>

        <div className="py-8">
          <ShopFeaturedProducts products={products}/>
        </div>
      </div>
    </ShopFrontLayout>
  )
}

export default home