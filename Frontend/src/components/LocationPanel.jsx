import React from 'react';

const LocationPanel = ({ suggestions,setPickup, setDestination, activeField, setPanelOpen, setvehiclePanel }) => {
    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
          setPickup(suggestion.description);
        } else if (activeField === 'destination') {
          setDestination(suggestion.description);
        }// Close panel after selection
      };
  

  return (
    <div>
      {suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)}
                    className="pl-5 flex items-center mb-4 justify-start border-gray-50 border-2 active:border-black">
        
          <h2 className="bg-[#eee] flex items-center justify-center w-10 h-10 rounded-full">
            <i className="ri-map-pin-fill text-xl"></i>
          </h2>
          <h4 className="pl-4 font-medium">{elem.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationPanel;