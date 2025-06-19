import React ,{useEffect,useContext} from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useState, useRef } from "react";
import{ useGSAP} from '@gsap/react';
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css';
import { SocketContext} from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const { socket } = useContext(SocketContext);
  const { captainData } = useContext(CaptainDataContext);
  const [RidePopUpPanel, setRidePopUpPanel] = useState(false)
  const [ride, setride] = useState(null)
  const RidePopUpPanelRef = useRef(null)
  const Navigate = useNavigate();

  async function confirmRide()
  {
      const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`,{

          rideId: ride._id,
          captainId: captainData._id,


      }, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      if (response.status === 200) {
        // Navigate to captain-riding and pass ride data
        Navigate('/captain-riding', { state: {ride}});
      }

  }

  console.log(ride, "ride in captain home");
  

  useEffect(() => {
    socket.emit('join',{userId:captainData._id,userType:'captain'});

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          
          socket.emit('update-location-captain', {
              userId: captainData._id,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            })
          })
        }
      }
      
      const locationInterval = setInterval(updateLocation, 10000)
      updateLocation()
    })

    socket.on('new-ride', (ride) => {
      console.log('New ride received:', ride);
      setRidePopUpPanel(true);
      setride(ride);
    })

  useGSAP(()=>{
    if(RidePopUpPanel){
      gsap.to(RidePopUpPanelRef.current,{
        translateY:'0%',
        duration:0.5
      })
    }
    else{
      gsap.to(RidePopUpPanelRef.current, {
        translateY:'100%',
        duration:0.5
      })
    }
  },[RidePopUpPanel])
  return (
    <div>
      <div className="h-screen">
        <div className="fixed p-7 pt-3">
          <img
            className="w-[76px] "
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt="Uber"
          />
        </div>
        <Link
          to="/captain/logout"
          className=" fixed bg-white h-10 w-10 rounded-full flex items-center justify-center top-6 right-10 z-50"
        >
          <i className=" text-lg font-medium ri-logout-box-line "></i>
        </Link>
        <div className="h-3/5">
          <LiveTracking/>
        </div>
        <div className="h-2/5 p-6">
          <CaptainDetails />
        </div>
        <div ref={RidePopUpPanelRef} className='fixed w-full z-40  bottom-0 bg-white px-3 py-10 pt-14'>
          <RidePopUp setRidePopUpPanel={setRidePopUpPanel} ride={ride} confirmRide={confirmRide} />
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
