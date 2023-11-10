import { TextField } from '@mui/material'
import React from 'react'
import { Button } from '../components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";


const LoginPage = () => {
    const { isLoading, uploadTypes } = useSelector((state) => state.orders);
  return (
    <div className=' rounded-xl flex justify-around  lg:mx-[30rem]  2xl:mx-[45rem] md:mx-[10rem] mx-[1rem]  my-10 ' >
        <div className='border-2 w-full rounded-xl '>

        <div className='bg-black text-white text-center py-1 '>

        <h3 className='text-2xl font-semibold' >Login </h3>
        </div>
        <div className=' grid col-span-3 px-3 py-1 space-y-4 my-5 '>

        <TextField className='col-span-3' label="Email" />
        <TextField  className='col-span-3' label="Password" />
        <div className='col-span-3' >

<Link to="/home" >
<Button
                text={"login"}
                className="text-white w-full bg-blue-700 hover:bg-blue-800"
                
                variant="btn_submit"
              />   
</Link>
        </div>
        </div>
        </div>
    </div>
  )
}

export default LoginPage