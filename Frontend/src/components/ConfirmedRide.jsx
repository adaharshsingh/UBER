import React from "react";

const ConfirmedRide = (props) => {

  


  const vehicleImages = {
    car: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714471451/assets/27/362eaf-3e88-4568-a460-29b0da41c285/original/UberX-%281%29.png',
    auto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
    motorcycle: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png',
  };

  function splitLocation(location = '') {
    if (!location.includes(', ')) {
      return { city: location, state: '' }; // No comma: only city is filled
    }
  
    const [city, ...rest] = location.split(', ');
    const state = rest.join(', ');
    return { city, state };
  }
const pickupData = splitLocation(props.Pickup);
const destinationData = splitLocation(props.destination);
  return (
    <div>
      <h5
        className="p-1 text-center absolute top-0 w-[93%]"
        onClick={() => {
          props.setconfirmRidePanel(false);
        }}
      >
        <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl -mt-4 font-semibold">Ride Information...</h3>
      <div className="flex flex-col items-center justify-between ">
        <img
          className="h-20 mt-2"
          src={vehicleImages[props.vehicleType] || vehicleImages.car}
          alt="car"
        />
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium"> {pickupData.city}</h3>
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
              <h3 className="text-lg font-medium">₹ {props.fare?.[props.vehicleType] ?? '—'} </h3>
              <p className="text-gray-600 -mt-1">Cash</p>
            </div>
          </div>
        </div>
        <button onClick={()=>{props.setvehicleFound(true);props.createRide()}}className="mt-2 w-full bg-green-600 text-white p-3 rounded-lg text-lg font-semibold">
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
