import React from 'react'

const LocationPanel = (props) => {
    console.log(props)
    const locations = [
        'Gomti Nagar, Lucknow, Uttar Pradesh, India',
        'Connaught Place, Delhi, National Capital Territory, India',
        'Bandra West, Mumbai, Maharashtra, India',
        'T. Nagar, Chennai, Tamil Nadu, India',
        'Salt Lake City, Kolkata, West Bengal, India',
        'Banjara Hills, Hyderabad, Telangana, India'
      ];
      
return (
    <div>
        {
            locations.map((elem,index) => {
                return (
                    <div key={index} onClick={()=>{
                        props.setPanelOpen(false)
                        setTimeout(() => {
                            props.setvehiclePanel(true);
                          }, 500);
                        
                       
                    }} className="pl-5 flex items-center mb-4 justify-start border-gray-50 border-2 active:border-black  ">
                        <h2 className='bg-[#eee] flex items-center justify-center w-10 h-10 rounded-full'>
                            <i className="ri-map-pin-fill text-xl"></i>
                        </h2>
                        <h4 className='pl-4 font-medium'>{elem}</h4>
                    </div>
                )
            })
        }
        
    </div>
)
}

export default LocationPanel