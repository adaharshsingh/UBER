import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PickUp = (props) => {
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  
  const submitHandler = async (e) => {
    e.preventDefault()
    

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/ride-started`, {
        params: {
            rideId: props?.ride?._id,
            otp: otp
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (response.status === 200) {
      props.setFinshRiding(true);
    }


}

  return (
    <div>
      <div className="flex flex-col justify-between h-full">
        {/* Show only when OTP is not shown */}
        {!showOTP && (
          <div className="transition-all items-center flex text-center justify-center duration-300 ease-in-out">
            <h2 className="font-bold text-xl flex text-center items-center gap-2">
              <i className="ri-route-line -ml-3"></i> PickUp Point
            </h2>
            <p className="text-lg ml-8 text-gray-700">2.8 Km</p>
          </div>
        )}

        {/* Action Section */}
        <div className="mt-4 w-full">
          {!showOTP ? (
            <button
              onClick={() => setShowOTP(true)}
              className="w-full bg-green-600 text-white p-3 rounded-lg text-lg font-semibold"
            >
              Arrived
            </button>
          ) : (
            <div className="flex flex-col bottom-6 -mt-2 mb-4 items-center justify-between">
              <form onSubmit={submitHandler}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded-lg p-3 text-lg mb-2"
              />
              <button
                className="w-full bg-green-600 text-white p-3 rounded-lg text-lg font-semibold"
              >
                Start Ride
              </button>
             
              <Link to="/captain-home" className="text-blue-600 mt-2">
                Cancel
              </Link>
              </form>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickUp;
