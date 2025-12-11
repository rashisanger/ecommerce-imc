import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../../assets/imc1.jpg'

const Hero = () => {
  return <section className='relative'>
    <img src={heroImg} alt="IMC" className='w-full h-[400px md:h-[600px] lg:h-[750px] object-cover' />

    <div className='absolute inset-0 bg-black/5 flex items-center justify-center'>
        <div className='text-center text-white p-6'>
            <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4 text-shadow-lg'>Get Strong.
            </h1>
            <Link
            to='#'
            className='bg-[#46a939] text-white px-6 py-2 rounded-sm text-lg'>
                Shop Now
            </Link>
        </div>
    </div>
  </section>
}

export default Hero