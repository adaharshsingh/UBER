import React from "react";
import { Link } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import {SocketContext} from "../context/SocketContext";
import { useContext,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import LiveTracking from "../components/LiveTracking";

const Riding = () => {

  const location = useLocation();
  const ride = location.state?.ride
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  
  socket.on('ride-completed', ()=> {
    navigate('/home');
  })
    
  
  function splitLocation(location = '') {
      if (!location.includes(', ')) {
        return { city: location, state: '' }; // No comma: only city is filled
      }
    
      const [city, ...rest] = location.split(', ');
      const state = rest.join(', ');
      return { city, state };
    }
  const pickupData = splitLocation(ride?.pickupLocation);
  const destinationData = splitLocation(ride?.destination);
  return (
    <div className="h-screen">
        <Link to='/home' className="bg-white h-10 w-10 rounded-full flex items-center justify-center fixed top-5 left-5 z-50">
        <i className=" text-lg font-medium ri-home-2-line"></i>
        </Link>
      <div className="h-1/2">
        <LiveTracking/>
      </div>
      <div className="h-1/2 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <img
            className="h-14 mb-5"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714471451/assets/27/362eaf-3e88-4568-a460-29b0da41c285/original/UberX-%281%29.png"
            alt="car"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">{ride?.captain?.fullName.firstName+" "+ride?.captain?.fullName.lastName}</h2>
            <h4 className="font-semibold text-xl capitalize">{ride?.captain?.vehicle?.plate}</h4>
            <p className="text-sm text-gray-800">Alto K10 VXI</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between ">
          <div className="w-full">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium"> {pickupData.city}</h3>
                <p className="text-gray-600 -mt-1">{pickupData.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">{destinationData.city}</h3>
                <p className="text-gray-600 -mt-1">{destinationData.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 ">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹ {ride?.fare} </h3>
                <p className="text-gray-600 -mt-1">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="bottom w-full bg-green-600 mb-6 text-white p-2 rounded-lg text-lg font-semibold">
          Pay Now
        </button>
      </div>
      
    </div>
  );
};

export default Riding;
