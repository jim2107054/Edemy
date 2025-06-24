import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  // Added smooth scroll to top for navigation links
  const handleSmoothScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div>
          <img src={assets.logo_dark} alt="logo" />
          <p className='mt-6 text-center md:text-left text-sm text-white/80'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit architecto vel totam labore aliquid aliquam voluptas quae quaerat vitae eius.</p>
        </div>
        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold text-white mb-5'>Company</h2>
          <ul className='flex text-center md:text-start flex-col w-full justify-between text-sm text-white/80 md:space-y-2'>
            <Link className='hover:text-yellow-500 transition-all duration-300' to={'/'} onClick={()=> {handleSmoothScroll} }>Home</Link>
            <Link className='hover:text-yellow-500 transition-all duration-300' to={'/about'} onClick={()=> {handleSmoothScroll}}>About Us</Link>
            <Link className='hover:text-yellow-500 transition-all duration-300' to={'/course-list'} onClick={()=> {handleSmoothScroll}}>Courses</Link>
            <Link className='hover:text-yellow-500 transition-all duration-300' to={'/contact'} onClick={()=> {handleSmoothScroll}}>Contact Us</Link>
            <Link className='hover:text-yellow-500 transition-all duration-300' to={'/privacy'} onClick={()=> {handleSmoothScroll}}>Privacy Policy</Link>
          </ul>
        </div>
        <div></div>
      </div>
      {/*-------- show the copy@right message--------*/}
      <p className='text-xs md:text-sm text-white/70 text-center py-2'>Copyright 2025 © Edemy. All Right Reserved.</p>
    </footer>
  )
}

export default Footer