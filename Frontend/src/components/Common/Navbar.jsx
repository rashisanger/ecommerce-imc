import React from 'react'
import { useState } from 'react'
import {HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight} from 'react-icons/hi2'
import { IoMdClose } from 'react-icons/io'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import SeachBar from './SeachBar'
import CartDrawer from '../Layout/CartDrawer'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navDrawerOpen, setNavDrawerOpen] = useState(false)
    const cart = useSelector((state) => state.cart)
    const cartItemCount = cart.products?.reduce((total, product) => total+product.quantity, 0) || 0;
    const {user} = useSelector((state) => state.auth)

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
        <nav className="absolute top-14 left-1/2 transform -translate-x-1/2 
                bg-white/95 backdrop-blur-md rounded-full 
                border border-white/60 shadow-lg shadow-gray-200/50 
                px-4 py-1 flex items-center justify-between 
                w-[90%] max-w-6xl z-50">

            {/*left logo*/}
            <Link to="/" className="text-2xl font-medium">
                <img src={logo} alt="logo" className='h-12 w-auto'/>
            </Link>
            {/*Center - navigation Links*/}
            <div className='hidden md:flex space-x-10'>
                <Link to="/" className='text-gray-700 hover:text-black text-m font-medium uppercase'>
                    Home
                </Link>
                <Link to="/collections/all" className='text-gray-700 hover:text-black text-m font-medium uppercase'>
                    Products
                </Link>
                <Link to="/collections/all?category=Baby Care" className='text-gray-700 hover:text-black text-m font-medium uppercase'>
                    Baby
                </Link>
                <Link to={`/collections/all?category=${encodeURIComponent("Health & Nutrition")}`} className='text-gray-700 hover:text-black text-m font-medium uppercase'>
                    Health
                </Link>
                <Link to="/collections/all?category=Personal Care" className='text-gray-700 hover:text-black text-m font-medium uppercase'>
                    Personal
                </Link>
                <Link to="/collections/all?category=Skin Care" className='text-gray-700 hover:text-black text-m font-medium uppercase'>
                    Skin
                </Link>
            </div>
            {/*Right - icons*/}
            <div className='flex items-center space-x-4'>
                {user && user.role === "admin" && (
                    <Link to='/admin' className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>
                )}
                

                {/* Right -Serach icon */}
                <SeachBar/>

                <Link to="profile" className='hover:text-black'> 
                    <HiOutlineUser />
                </Link>
                
                <button onClick={toggleCartDrawer} className='relative hover:text-black'>
                    <HiOutlineShoppingBag className='h-6 w-6 text-gray-700'/>
                    {cartItemCount > 0 && (
                        <span className='absolute -top-1 bg-[#46a939] text-white text-sm rounded-full px-2 py-0.5'>
                            {cartItemCount}
                        </span>
                    )}
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
                    <Link to="/"
                    onClick={toggleNavDrawer}
                    className='block text-gray-600 hover:text-black'>
                        Home
                    </Link>
                    <Link to="/collections/all?category=Personal Care"
                    onClick={toggleNavDrawer}
                    className='block text-gray-600 hover:text-black'>
                        Personal Care
                    </Link>
                    <Link to="/collections/all?category=Baby Care"
                    onClick={toggleNavDrawer}
                    className='block text-gray-600 hover:text-black'>
                        Baby Care
                    </Link>
                    <Link to={`/collections/all?category=${encodeURIComponent("Health & Nutrition")}`}
                    onClick={toggleNavDrawer}
                    className='block text-gray-600 hover:text-black'>
                        Health Care
                    </Link>
                    <Link to="/collections/all?category=Skin Care"
                    onClick={toggleNavDrawer}
                    className='block text-gray-600 hover:text-black'>
                        Skin Care
                    </Link>
                </nav>
            </div>
        </div>
    </>
  )
}

export default Navbar