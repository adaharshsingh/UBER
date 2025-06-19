import React from "react";
import { Link } from "react-router-dom";

const RidePopUp = (props) => {
  function splitLocation(location = '') {
    if (!location.includes(', ')) {
      return { city: location, state: '' }; // No comma: only city is filled
    }
  
    const [city, ...rest] = location.split(', ');
    const state = rest.join(', ');
    return { city, state };
  }
  
const pickupData = splitLocation(props.ride?.pickupLocation);
const destinationData = splitLocation(props.ride?.destination);
    
    const submitHandler = (e) => {
        e.preventDefault();
    }
  return (
    <div>
      <h5
        className="p-1 text-center absolute top-0 w-[93%]"
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
      >
        <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl mb-6 -mt-6 font-semibold">Available Trips...</h3>
      <div className="flex items-center bg-gray-100 justify-between mb-5">
        <div className="flex items-center gap-3  ">
          <i className="rounded-full bg-gray-100 text-2xl py-3 px-4 ri-id-card-fill"></i>
          <h2 className="text-xl font-medium ">{props?.ride?.user?.fullName?.firstName} {props?.ride?.user?.fullName?.lastName}</h2>
        </div>
        <h5 className="mr-4 font-semibold">2.4 km</h5>
      </div>
      <div className="flex flex-col items-center justify-between ">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium"> {pickupData.city} </h3>
              <p className="text-gray-600 -mt-1">{pickupData.state}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium"> {destinationData.city} </h3>
              <p className="text-gray-600 -mt-1">{destinationData.state}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹ {props.ride?.fare} </h3>
              <p className="text-gray-600 -mt-1">Cash</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 w-[63%]">
          <Link to="/captain-riding" className="w-full">
            <button
              onClick={() => {
                props.confirmRide()
              }}
              className="mt-2 w-full bg-green-600 text-white p-3 rounded-lg text-lg font-semibold">
              Accept
            </button>
          </Link>
          <button
            onClick={() => {
              props.setRidePopUpPanel(false);
              
            }}
            className="mt-2 w-full bg-gray-400 text-white p-3 rounded-lg text-lg font-semibold">
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
