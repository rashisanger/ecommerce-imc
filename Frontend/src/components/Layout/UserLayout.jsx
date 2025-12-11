import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import BenefitsStrip from './BenefitStrip'

const UserLayout = () => {
  return (
    <>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <BenefitsStrip/>
        <Footer/>
    </>
  )
}

export default UserLayout