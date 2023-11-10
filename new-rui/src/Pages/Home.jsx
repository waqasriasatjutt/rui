import React from 'react';

import { toast } from 'react-toastify';
import Form from "../components/molecules/Form"
import AddOrders from '../components/organisms/AddOrdersForm/AddOrders';


const Home = () => {
  return (
    <>
              <div className=' border-2 border-slate-300 rounded-xl m-5 md:mx-4 2xl:mx-[20rem] ' >
                <AddOrders/>
              </div>
          
       
    </>
  )
}

export default Home