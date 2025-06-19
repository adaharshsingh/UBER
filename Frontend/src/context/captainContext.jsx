import React, { useState, createContext } from 'react';

export  CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captainData, setCaptainData] = useState({
        fullName: {
            firstName: "",
            lastName: ""
        },
        email: "",
        password: "",
        vehicle: {
            color: "",
            plate: "",
            capacity: "",
            vehicleType: ""
        }
    });


    return (
        <div>
            <CaptainDataContext.Provider value={{ captainData, setCaptainData }}>
                {children}
            </CaptainDataContext.Provider>
        </div>
    );
};

export default CaptainContext;