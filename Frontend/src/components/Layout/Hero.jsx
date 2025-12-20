import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../../assets/hero1.jpg'

const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="IMC"
        className="w-full h-[350px] md:h-[500px] lg:h-[600px] object-cover"
      />

      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
  <div className="text-center text-white p-6">
    <Link
      to="/collections/all"
      className="bg-[#42ad33] text-white px-8 py-3 rounded-md text-lg font-medium shadow-lg hover:bg-[#3d8f32] transition-all duration-300"
    >
      Shop Now
    </Link>
  </div>
</div>
    </section>
  )
}

export default Hero