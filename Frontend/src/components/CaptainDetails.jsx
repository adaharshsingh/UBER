import React,{useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = () => {

  const {captainData} = useContext(CaptainDataContext);
  
  return (
    <div><div className='flex items-center justify-between'>
    <div className='flex items-center justify-start gap-3'>
      <img
        className="w-16 h-16 rounded-full object-cover"
        src="https://people.com/thmb/gzHtG_UnZBsUuHVJx9xjB5yAfIQ=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(399x0:401x2)/people-headshot-nick-maslow-f21ef38676504bc89a091ec9a5c95e4b.jpg"
        alt="captain"
      />
      <h4 className="text-lg font-medium">{captainData?.fullName?.firstName || "Captain"} {"  "}{captainData?.fullName?.lastName || "Singh"}</h4>
    </div>
    <div>
      <h4 className="text-xl font-semibold">₹296.8</h4>
      <p className="text-sm item-gray-600">Earned</p>
    </div>
  </div>
  <div className="flex mt-6 p-3 bg-gray-100 rounded-l items-start justify-center gap-10">
      <div className="text-center">
      <i className="text-3xl mb-2 font-thin ri-timer-line"></i>
      <h5 className="text-lg font-medium">10.2</h5>
      <p className="text-sm text-gray-800">Hours</p>
      </div>
      <div className="text-center">
      <i className="text-3xl mb-2 font-thin ri-speed-up-fill"></i>
      <h5 className="text-lg font-medium">10.2</h5>
      <p className="text-sm text-gray-800">Hours</p>
      </div>
      <div className="text-center">
        <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
        <h5 className="text-lg font-medium">10.2</h5>
      <p className="text-sm text-gray-800">Hours</p>
        </div>
  </div></div>
  )
}

export default CaptainDetails