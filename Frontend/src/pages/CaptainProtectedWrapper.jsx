import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {captainData, setCaptainData} = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
                navigate('/captain-login');
                alert('Unauthorized access. Redirecting to login.');
                 return
        }
    
    const response= axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }})
        .then((response) => {
            if (response.status === 200) {
                setCaptainData(response.data);
                console.log('Captain data fetched successfully:', response.data);
                setIsLoading(false);
            } else {
                navigate('/captain-login'); 
            }
        }).catch((error) => {
            console.log('Error fetching captain data:', error.response || error.message);
            localStorage.removeItem('token');
            navigate('/captain-login');
            alert('Session expired. Please log in again.');
    })
}, [token])
    if (isLoading) {
        return <div className="text-center text-lg">Loading...</div>;
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default CaptainProtectedWrapper;