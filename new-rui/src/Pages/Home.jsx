import React from 'react';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <>
    <div className='flex flex-nowrap overflow-hidden max-w-[100vw] h-[100vh]'>
        {/* <Sidebar /> */}
        <div className='mx-2 w-[calc(100vw-220px)] ml-[220px]'>
            <div className='p-[21.5px] border-b border-[#d5d5d5] !overflow-y-hidden'>
                <div className='flex justify-center items-center'>
                    <h1 className='text-2xl font-bold uppercase'>Home</h1>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home