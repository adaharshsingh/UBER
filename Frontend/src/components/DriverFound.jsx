import React from "react";

const DriverFound = (props) => {
  return (
    <div>
      <div>
        <h5
          className="p-1 text-center absolute top-0 w-[93%]"
          onClick={() => {
            props.setisDriverFound(false);
          }}
        >
          <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <div className="flex items-center justify-between"><img
      className="h-14 mb-5"
      src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714471451/assets/27/362eaf-3e88-4568-a460-29b0da41c285/original/UberX-%281%29.png"
      alt="car"/>
      <div className="text-right">
        <h2 className="text-lg font-medium">Adarsh</h2>
        <h4 className="font-semibold text-xl">UP-32 GF 2067</h4>
        <p className="text-sm text-gray-800">Alto K10 VXI</p>
      </div>
    </div>
        <div className="flex flex-col items-center justify-between ">
          <div className="w-full">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium"> F-449 </h3>
                <p className="text-gray-600 -mt-1">Rajajipuram , Lucknow</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium"> F-449 </h3>
                <p className="text-gray-600 -mt-1">Rajajipuram , Lucknow</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 ">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹ 198.6 </h3>
                <p className="text-gray-600 -mt-1">Cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverFound;
