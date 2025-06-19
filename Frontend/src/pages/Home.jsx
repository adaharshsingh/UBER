import React, { useState,useContext,useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import "remixicon/fonts/remixicon.css";
import LocationPanel from "../components/LocationPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import DriverSearch from "../components/DriverSearch";
import DriverFound from "../components/DriverFound";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import {UserDataContext} from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [Pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [PanelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelClose = useRef(null);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false);
  const [isDriverFound, setisDriverFound] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [ vehicleType, setVehicleType ] = useState(null)
  const vehiclePanelRef = useRef(null);
  const confirmRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const DriverFoundRef = useRef(null);
  const [fare, setFare] = useState(null)
  const {userData} = useContext(UserDataContext);
  const [ride, setRide] = useState(null)
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  socket.on('ride-confirm', ride => {
    setisDriverFound(true);
    setRide(ride);
    console.log("Ride confirmed:", ride);
})

socket.on('ride-started', ride => {
  console.log("ride")
  setisDriverFound(false)
  navigate('/riding', { state: { ride } }) 
})


  useEffect(() => {
    socket.emit("join", { userType: "user", userId: userData._id })
  },[userData]);


    async function FindTrip() {
      setvehiclePanel(true)
      setPanelOpen(false)

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
          params: { pickupLocation: Pickup, destination:destination },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      setFare(response.data.fare)
      ;
    }

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (PanelOpen) {
      gsap.to(panelRef.current, {
        height: "100%",
        opacity: 1,
      });
      gsap.to(panelClose.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        opacity: 0,
      });
      gsap.to(panelClose.current, {
        opacity: 0,
      });
    }
  }, [PanelOpen]);
  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        translateY: "0%",
        duration: 0.5,
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        translateY: "100%",
        duration: 0.5,
      });
    }
  }, [vehiclePanel]);
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRef.current, {
        translateY: "0%",
        duration: 0.5,
      });
    } else {
      gsap.to(confirmRef.current, {
        translateY: "100%",
        duration: 0.5,
      });
    }
  }, [confirmRidePanel]);
  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        translateY: "0%",
        duration: 0.5,
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        translateY: "100%",
        duration: 0.5,
      });
    }
  }, [vehicleFound]);
  useGSAP(() => {
    if (isDriverFound) {
      gsap.to(DriverFoundRef.current, {
        translateY: "0%",
        duration: 0.5,
      });
    } else {
      gsap.to(DriverFoundRef.current, {
        translateY: "100%",
        duration: 0.5,
      });
    }
  }, [isDriverFound]);

  async function createRide() {
    const response= await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/rides/create-ride`,
        {
          pickupLocation: Pickup,
          destination: destination,
          vehicleType: vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error creating ride:", error);
      });
  }
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <img
        className="w-16 absolute ml-7 mt-7 mb-10"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber"
      />
      <div
        onClick={() => {
          setvehiclePanel(false);
        }}
        className="h-screen w-screen"
      >
        <LiveTracking/>
      </div>
      <div className="flex flex-col justify-end absolute top-0 h-screen  w-full rounded-full">
        <div className="h-[230px] relative p-5 bg-white">
          <h5
            ref={panelClose}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="text-2xl opacity-0 top-2 absolute right-2 "
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold mb-5">Find a ride</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={Pickup}
              onChange={handlePickupChange}
              type="text"
              placeholder="Where to?"
              className="bg-[#eeeeee] mb-7 rounded  px-8 py-2 w-full rounded-lg text-base placeholder:text-sm border"
            />
            <div className="line absolute bg-gray-700 h-16 w-1 top-[96px] ml-4 rounded-full"></div>
            <input
            onClick={() => {
              setPanelOpen(true);
              setActiveField("destination");
            }}
              value={destination}
              onChange={handleDestinationChange}
              type="text"
              placeholder="Where from?"
              className="bg-[#eeeeee] rounded  px-8 py-2 w-full  rounded-lg text-base placeholder:text-sm border"
            />
          </form>
        </div>
        <div
          ref={panelRef}
          className=" overflow-hidden opacity-0 bg-white h-0 transition-all duration-10"
        >
          <LocationPanel
            vehiclePanel={vehiclePanel}
            setvehiclePanel={setvehiclePanel}
            setPanelOpen={setPanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
          />
          <div className="flex justify-center mt-6">
  <button
    onClick={FindTrip}
    className="bg-black bottom-0 w-[33%] items-center text-white p-3 rounded-lg text-lg font-semibold"
  >
    Search
  </button>
</div>
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-14"
      >
        <VehiclePanel
          setconfirmRidePanel={setconfirmRidePanel}
          setvehiclePanel={setvehiclePanel}
          fare={fare}
          setVehicleType={setVehicleType}
        />
      </div>
      <div
        ref={confirmRef}
        className="fixed w-full z-20 translate-y-full bottom-0 bg-white px-3 py-10 pt-14"
      >
        <ConfirmedRide
        createRide={createRide}
          setconfirmRidePanel={setconfirmRidePanel}
          setvehicleFound={setvehicleFound}
          Pickup={Pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-30 translate-y-full bottom-0 bg-white px-3 py-10 pt-14"
      >
        <DriverSearch
          setconfirmRidePanel={setconfirmRidePanel}
          setvehicleFound={setvehicleFound}
          Pickup={Pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>
      <div
        ref={DriverFoundRef}
        className="fixed w-full z-40 translate-y-full bottom-0 bg-white px-3 py-10 pt-14"
      >
        <DriverFound
          setisDriverFound={setisDriverFound}
          setvehicleFound={setvehicleFound}
          ride={ride}
          DriverFound={DriverFound}
        />
      </div>
    </div>
  );
};

export default Home;
