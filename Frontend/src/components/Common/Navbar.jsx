import React from 'react'
import { useState } from 'react'
import {HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight} from 'react-icons/hi2'
import { IoMdClose } from 'react-icons/io'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import SeachBar from './SeachBar'
import CartDrawer from '../Layout/CartDrawer'

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navDrawerOpen, setNavDrawerOpen] = useState(false)

    {/*Hamburger */}
    const toggleNavDrawer = () => {   
        setNavDrawerOpen(!navDrawerOpen);
    }

    {/*Cart Hanling */}
    const toggleCartDrawer = () => {   
        setDrawerOpen(!drawerOpen);
    }

  return (
    <>
        <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
            {/*left logo*/}
            <Link to="/" className="text-2xl font-medium">
                <img src={logo} alt="logo" className='h-10 w-auto'/>
            </Link>
            {/*Center - navigation Links*/}
            <div className='hidden md:flex space-x-6'>
                <Link to="/" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                    Home
                </Link>
                <Link to="/collections/all" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                    Products
                </Link>
                <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                    Category
                </Link>
            </div>
            {/*Right - icons*/}
            <div className='flex items-center space-x-4'>

                {/*Right -Serach icon*/}
                <SeachBar/>

                <Link to="profile" className='hover:text-black'> 
                    <HiOutlineUser />
                </Link>
                
                <button onClick={toggleCartDrawer} className='relative hover:text-black'>
                    <HiOutlineShoppingBag className='h-6 w-6 text-gray-700'/>
                    <span className='absolute -top-1 bg-[#46a939] text-white text-sm rounded-full px-2 py-0.5'>2</span>
                </button>
                

                <button onClick={toggleNavDrawer} className='md:hidden'>
                    <HiBars3BottomRight className='h-6 w-6 text-gray-700 ' />
                </button>
            </div>
        </nav> 

        <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}/>

        {/*Mobile Navigation*/}
        <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className='flex justify-end p-4'>
                <button onClick={toggleNavDrawer}>
                    <IoMdClose className="h-6 w-6 text-gray-600"/> 
                </button>
            </div>
            <div className='p-4'>
                <h2 className='text-xl font-semibold mb-4'>Menu</h2>
                <nav className='space-y-4'>
                    <Link to="#"
                    onClick={toggleNavDrawer}
                    className='block text-gray-600 hover:text-black'>
                        Home
                    </Link>
                    <Link to="#"
                    onClick={toggleNavDrawer}
                    className='block text-gray-600 hover:text-black'>
                        Products
                    </Link>
                    <Link to="#"
                    onClick={toggleNavDrawer}
                    className='block text-gray-600 hover:text-black'>
                        Category
                    </Link>
                </nav>
            </div>
        </div>
    </>
  )
}

export default Navbar