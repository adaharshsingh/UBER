import React, { useState,useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PickUp  from "../components/PickUp";
import 'remixicon/fonts/remixicon.css';
import FinishRide from "../components/FinishRide";
import { useLocation } from 'react-router-dom';
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = (props) => {
  
  const [CaptainRidingPanel, setCaptainRidingPanel] = useState(false)
  const CaptainRidingPanelRef = useRef(null)
  const [FinshRiding, setFinshRiding] = useState(false)
  const FinishRidingRef = useRef(null)
  const location = useLocation();
const ride = location.state?.ride



  useGSAP(()=>{
    if(CaptainRidingPanel){
      gsap.to(CaptainRidingPanelRef.current,{
        translateY:'0%',
        duration:0.5
      })
    }
    else{
      gsap.to(CaptainRidingPanelRef.current, {
        translateY:'100%',
        duration:0.5
      })
    }
  },[CaptainRidingPanel])
  useGSAP(()=>{
    if(FinshRiding){
      gsap.to(FinishRidingRef.current,{
        translateY:'0%',
        duration:0.5
      })
    }
    else{
      gsap.to(FinishRidingRef.current, {
        translateY:'100%',
        duration:0.5
      })
    }
  },[FinshRiding])

  return (
    <div className="h-screen ">
      {/* Header */}
      <div className="fixed p-7 pt-3">
        <img
          className="w-[76px]"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber"
        />
      </div>

      {/* Logout Button */}
      <Link
        to="/captain/logout"
        className="fixed bg-white h-10 w-10 rounded-full flex items-center justify-center top-6 right-10 z-50"
      >
        <i className="text-lg font-medium ri-logout-box-line "></i>
      </Link>

      {/* Map */}
      <div className="h-4/5">
        <LiveTracking/>
      </div>

      {/* Bottom Panel */}
      <div className="h-1/5 p-6 rounded-t-3xl bg-gray-100">
      <div ref={CaptainRidingPanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-14'>
      </div>
      <PickUp setFinshRiding={setFinshRiding} setCaptainRidingPanel={setCaptainRidingPanel}ride={ride}/>
      <div ref={FinishRidingRef} className='fixed w-full z-50 -ml-6 translate-y-full bottom-0 bg-white px-3 py-10 pt-14'>
        <FinishRide setFinshRiding={setFinshRiding} setCaptainRidingPanel={setCaptainRidingPanel} ride={ride}  />
      </div>

        
      </div>
    </div>
  );
};

export default CaptainRiding;
