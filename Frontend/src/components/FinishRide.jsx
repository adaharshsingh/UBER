import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const FinishRide = (props) => {

  const navigate = useNavigate();

  const endRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/ride-completed`, {

      rideId: props.ride._id


  }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })

  if(response.status === 200) {
    navigate('/captain-home')
  } 
}

  console.log(props?.ride);
  console.log(props)
  return (
    <div className="h-full w-full">
      <div className="flex p-4 mt-1/2  justify-between items-center">

        <div className="p-1 text-center absolute top-0 w-[93%]"
        ><Link to='/captain-home'>
          <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
          </Link>
        </div>
        <div className="w-full">
          <h2 className="font-bold itmes-center text-xl ">
            <i className="-ml-3 ri-route-line"></i> Dropoff Point
          </h2>
          <p className="text-l ml-10">5.6 Km</p>
        </div>
        <div className="w-1/2">
          <button onClick={endRide} className="mt-2 w-full bg-green-600 text-white p-3 rounded-lg text-lg font-semibold">
            Complete Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
