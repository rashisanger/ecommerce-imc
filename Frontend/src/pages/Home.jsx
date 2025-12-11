import React from 'react'
import Hero from '../components/Layout/Hero'
import ProductCollectionSection from '../components/Products/ProductCollectionSection'
import FeaturedProducts from '../components/Products/FeaturedProducts'
import ProductDetails from '../components/Products/ProductDetails'


const Home = () => {
  return (
    <div>
        <Hero />
        <ProductCollectionSection />
        <FeaturedProducts/>

        {/* Best Seller */}
        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
        <ProductDetails />
    </div>
  )
}

export default Home