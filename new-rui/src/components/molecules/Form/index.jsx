import React from 'react'
import Button from '../../atoms/Button'

const Form = (props) => {
  return (
    <div>
       <header className="bg-black h-[60px] flex items-center justify-center shadow-lg">
              <h1 className=" text-2xl text-white m-4 font-medium">
                  Add Orders
              </h1>
            </header>
            <div className="md:p-4">{props.children}</div>
            <div className="!p-4 text-right">
                <Button
                text={"Submit"}
                className="text-white bg-blue-700 hover:bg-blue-800"
                onClick={props.onSubmit}
                isLoading={props?.isLoading}
                variant="btn_submit"
              />
             
              
            </div>
    </div>
  )
}

export default Form