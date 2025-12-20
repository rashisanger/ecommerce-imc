import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-4 lg:px-0">
        
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wide">Join Us</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and online offers.
          </p>
          <p className="text-gray-700 mb-4">Sign up and get 10% off on your first order.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 text-sm rounded-r-md hover:bg-green-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wide">Important Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="#" className="hover:text-green-700 hover:underline transition">Home</Link></li>
            <li><Link to="#" className="hover:text-green-700 hover:underline transition">Products</Link></li>
            <li><Link to="#" className="hover:text-green-700 hover:underline transition">Category</Link></li>
            <li><Link to="#" className="hover:text-green-700 hover:underline transition">Blog</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wide">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="#" className="hover:text-green-700 hover:underline transition">Contact Us</Link></li>
            <li><Link to="#" className="hover:text-green-700 hover:underline transition">About Us</Link></li>
            <li><Link to="#" className="hover:text-green-700 hover:underline transition">FAQs</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wide">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a href="https://www.facebook.com/imcbusiness/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-200 hover:bg-green-600 hover:text-white transition"><FaFacebook /></a>
            <a href="https://www.instagram.com/imcbusinessofficial/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-200 hover:bg-green-600 hover:text-white transition"><FaInstagram /></a>
            <a href="https://www.youtube.com/channel/UCOCSKbjwFv3DLAz_oDftSFg" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-200 hover:bg-green-600 hover:text-white transition"><FaYoutube /></a>
            <a href="https://t.me/imcbusinessofficialindia" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-200 hover:bg-green-600 hover:text-white transition"><FaTelegram /></a>
            <a href="https://api.whatsapp.com/send/?phone=918938930098&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-200 hover:bg-green-600 hover:text-white transition"><FaWhatsapp /></a>
          </div>
          <p className="text-gray-500">Call us</p>
          <p className="text-gray-700 font-medium">
            <FiPhoneCall className="inline-block mr-2" /> +91 7069747475
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tight text-center">
          © {new Date().getFullYear()} IMC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;