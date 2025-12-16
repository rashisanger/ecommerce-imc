import React from 'react'
import { FaWhatsapp } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="bg-[#1c8d0e] text-white">
        <div className='container mx-auto flex justify-between items-center py-3 px-4'>

                <div className='hidden md:flex items-center space-x-4'>
                    <a href="#" className='hover:text-grey-300'>
                        <FaWhatsapp className='h-5 w-5' />
                    </a>
                </div>
                
                <div className='text-sm text-center grow font-semibold'>
                    <span>We have Most Authentic and Natural Products only for You!</span>
                </div>

                <div className='text-sm hidden md:block'>
                    <a href="tel: +91 7069747475" className='hover:text-gray-300'>
                        +91 7069 74 74 75
                    </a>
                </div>
        </div>
    </div>
  )
}

export default Topbar