import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='relative'>
        <Topbar/>
        <Navbar/>
    </header>
  )
}

export default Header