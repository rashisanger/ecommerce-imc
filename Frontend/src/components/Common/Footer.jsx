import React from 'react'
import {Link} from 'react-router-dom'
import {FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaTelegram} from 'react-icons/fa'
import {FiPhoneCall} from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className='border-t py-12 px-6'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 gx-4 lg:px-0'>
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Join Us</h3>
                    <p className='text-gray-500 mb-4'>
                        Be the first to hear about new products, exclusive events, and online offers.
                    </p>
                    <p>Sign up and get 10% off on your first order.</p>

                    {/* Newsletter form */}
                    <form className='flex'>
                        <input 
                            type="email"
                            placeholder='enter your email'
                            className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-gray-500 transition-all' required
                        />
                        <button type='submit' className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>Subscribe</button>
                    </form>
                </div>
                
                {/* =======shop links ======*/}
                <div>
                        <h3 className='text-lg text-gray-800 mb-4'>Important Links</h3>
                        <ul className='space-y-2 text-gray-600'>
                            <li>
                                <Link to='#' className='hover:text-gray-500 transition-colors'>Home</Link>
                            </li>
                            <li>
                                <Link to='#' className='hover:text-gray-500 transition-colors'>Products</Link>
                            </li>
                            <li>
                                <Link to='#' className='hover:text-gray-500 transition-colors'>Category</Link>
                            </li>
                            <li>
                                <Link to='#' className='hover:text-gray-500 transition-colors'>Blog</Link>
                            </li>
                        </ul>
                </div>

                {/* ======Support Links=========*/}
                <div>
                        <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
                        <ul className='space-y-2 text-gray-600'>
                            <li>
                                <Link to='#' className='hover:text-gray-500 transition-colors'>Contact us</Link>
                            </li>
                            <li>
                                <Link to='#' className='hover:text-gray-500 transition-colors'>About Us</Link>
                            </li>
                            <li>
                                <Link to='#' className='hover:text-gray-500 transition-colors'>FAQs</Link>
                            </li>
                        </ul>
                </div>
                
                {/* =======Follow Us====== */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Follow us</h3>
                    <div className='flex items-center space-x-4 mb-6'>
                        <a href="https://www.facebook.com/imcbusiness/" target='_blank' rel='noopener noreferrer' className="hover:text-black"><FaFacebook /></a>
                        <a href="https://www.instagram.com/imcbusinessofficial/" target='_blank' rel='noopener noreferrer' className="hover:text-black"><FaInstagram /></a>
                        <a href="https://www.youtube.com/channel/UCOCSKbjwFv3DLAz_oDftSFg" target='_blank' rel='noopener noreferrer' className="hover:text-black"><FaYoutube /></a>
                        <a href="https://t.me/imcbusinessofficialindia" target='_blank' rel='noopener noreferrer'  className="hover:text-black"><FaTelegram /></a>
                        <a href="https://api.whatsapp.com/send/?phone=918938930098&text&type=phone_number&app_absent=0" target='_blank' rel='noopener noreferrer' className="hover:text-black"><FaWhatsapp /></a>
                    </div>
                    <p className='text-gray-500'>Call us</p>
                    <p>
                        <FiPhoneCall className='inline-block mr-2'/> +91 7069747475
                    </p>
                </div>
                
        </div>
        {/* Footer Bottom */}
        <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
            <p className='text-gray-500 text-sm tracking-tighter text-center'>© {new Date().getFullYear()} IMC. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer