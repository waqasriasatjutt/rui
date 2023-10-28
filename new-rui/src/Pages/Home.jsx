import React from 'react';
import Sidebar from '../components/Sidebar';
import Form from '../components/molecules/Form';
import AddOrders from './Orders/AddOrders';

const Home = () => {
  return (
    <>
    <div className='flex flex-nowrap overflow-hidden max-w-[100vw] h-[100vh]'>
        {/* <Sidebar /> */}
        <div className='w-full'>
            <div className='p-[21.5px] border-[#d5d5d5] !overflow-y-hidden'>
                <AddOrders/>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home