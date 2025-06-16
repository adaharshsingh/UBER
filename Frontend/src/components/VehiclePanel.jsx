import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={()=>{props.setvehiclePanel(false)}} ><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-4'>Select a ride</h3>
        <div onClick={()=>{props.setconfirmRidePanel(true)}} className='flex p-3 border-2 mb-3 active:border-black bg-gray-100 rounded-xl w-full items-center justify-between'>
          <img className='h-16' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714471451/assets/27/362eaf-3e88-4568-a460-29b0da41c285/original/UberX-%281%29.png' alt='car' />
          <div className=' w-1/2'>
            <h4 className='text-base font-medium'>Uber Go <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className='text-sm font-medium'> 2 minutes away</h5>
            <p className='font-normal text-xs font-medium text-gray-600'> affirdable rides</p>
          </div>
            <p className='text-xl font-semibold'>₹ 200</p>
        </div>
        <div onClick={()=>{props.setconfirmRidePanel(true)}} className='flex p-3 mb-3 border-2 active:border-black bg-gray-100 rounded-xl w-full items-center justify-between'>
          <img className='h-16' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png' alt='moto' />
          <div className=' w-1/2'>
            <h4 className='text-base font-medium'> Moto<span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className='text-sm font-medium'> 1 minutes away</h5>
            <p className='font-normal text-xs font-medium text-gray-600'> affirdable moto rides</p>
          </div>
            <p className='text-xl font-semibold'>₹ 80</p>
        </div>
        <div onClick={()=>{props.setconfirmRidePanel(true)}} className='flex p-3 border-2 active:border-black bg-gray-100 rounded-xl w-full items-center justify-between'>
          <img className='h-16' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png' alt='auto' />
          <div className=' w-1/2'>
            <h4 className='text-base font-medium'>Auto <span><i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className='text-sm font-medium'> 5 minutes away</h5>
            <p className='font-normal text-xs font-medium text-gray-600'> affirdable auto rides</p>
          </div>
            <p className='text-xl font-semibold'>₹ 120</p>
        </div>

      </div>
    
  )
}

export default VehiclePanel
