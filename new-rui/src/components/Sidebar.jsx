import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../Assets/Images/logo.png';

const Sidebar = () => {
  return (
    <>
        <div className='fixed top-0 right-0 left-0 bottom-0 border-r-2 border-[#e8e9eb] w-[220px] overflow-hidden z-[99]'>
            <div className='p-3 border-b border-[#d5d5d5] !overflow-y-hidden'>
                <Link to='/'>
                    <img src={logo} alt="logo" className='max-w-full h-max' />
                </Link>
            </div>
            <div className='overflow-y-auto scrollbar'>
                <div className='w-full'>
                    <Link to='/' className='flex item-center py-4 px-5 w-full outline-none border-1 border-b border-slate-400 cursor-pointer no-underline hover:no-underline hover:bg-gray-200 text-[#828282] hover:text-[#000]'>
                        <span className='ml-1'>Home</span>
                    </Link>
                </div>
                <div className='w-full'>
                    <Link to='/uploadfile' className='flex item-center py-4 px-5 w-full outline-none border-1 border-b border-slate-400 cursor-pointer no-underline hover:no-underline hover:bg-gray-200 text-[#828282] hover:text-[#000]'>
                        <span className='ml-1'>Uploadfile</span>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar