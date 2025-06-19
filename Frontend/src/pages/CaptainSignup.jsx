import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

const CaptainSignup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [vehicleColor, setVehicleColor] = useState("")
    const [vehiclePlate, setVehiclePlate] = useState("")
    const [vehicleCapacity, setVehicleCapacity] = useState("")
    const [vehicleType, setVehicleType] = useState("")
    

    const{ captainData, setCaptainData } = useContext(CaptainDataContext)

    const submitHandler = async(e) => {
        e.preventDefault()
        const newData = {
            fullName: {
            firstName: firstName,
            lastName: lastName
            },
            email: email,
            password: password,
            vehicle: {
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity,
            vehicleType: vehicleType
            }
        }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newData)
            if (response.status === 201) {
                const data = response.data
                setCaptainData(data.captain)
                localStorage.setItem('token', data.token)
                navigate('/captain-home')
                alert('Captain registered Successfully')
            } else {
                alert('Error creating captain')
            
        }
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
        }

    return (
        <div className='p-7 pt-3 h-screen flex-col flex justify-between'>
            <div>
            <img className='w-[76px] 'src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber"/>
            <form onSubmit={(e) => submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'> What's your Name!</h3>
                    <div className='flex gap-4'>
                        <input 
                            required 
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg text-base placeholder:text-sm border' 
                            type="text" 
                            placeholder='First Name' 
                            value={firstName} 
                            onChange={(e) => { setFirstName(e.target.value) }} 
                        />
                        <input 
                            required 
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg text-base placeholder:text-sm border' 
                            type="text" 
                            placeholder='Last Name' 
                            value={lastName} 
                            onChange={(e) => { setLastName(e.target.value) }} 
                        />
                    </div>
                    <h3 className='text-lg font-medium mb-2'> What's your email!</h3>
                    <input 
                        required 
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-base placeholder:text-sm border' 
                        type="email" 
                        placeholder='Email@Example.com' 
                        value={email} 
                        onChange={(e) => { setEmail(e.target.value) }} 
                    />
                    <h3 className='text-lg font-medium mb-2'> What's your password</h3>
                    <input 
                        required 
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-base placeholder:text-sm border' 
                        type="password" 
                        placeholder='Your_password' 
                        value={password} 
                        onChange={(e) => { setPassword(e.target.value) }} 
                    />
                    <h3 className='text-lg font-medium mb-2'> Vehicle Information</h3>
                    <div className='flex gap-4'>
                        <input 
                            required 
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg text-base placeholder:text-sm border' 
                            type="text" 
                            placeholder='Vehicle Color' 
                            value={vehicleColor} 
                            onChange={(e) => { setVehicleColor(e.target.value) }} 
                        />
                        <input 
                            required 
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg text-base placeholder:text-sm border' 
                            type="text" 
                            placeholder='Vehicle Plate' 
                            value={vehiclePlate} 
                            onChange={(e) => { setVehiclePlate(e.target.value) }} 
                        />
                    </div>
                    <div className='flex gap-4'>
                        <input 
                            required 
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg text-base placeholder:text-sm border' 
                            type="number" 
                            placeholder='Vehicle Capacity' 
                            value={vehicleCapacity} 
                            onChange={(e) => { setVehicleCapacity(e.target.value) }} 
                        />
                        <select 
                            required 
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg text-base placeholder:text-sm border' 
                            value={vehicleType} 
                            onChange={(e) => { setVehicleType(e.target.value) }}
                        >
                            <option className='text-base' value="" disabled>Select Vehicle Type</option>
                            <option className='text-base' value="auto">auto</option>
                            <option className='text-base' value="motorcycle">motorcycle</option>
                            <option className='text-base' value="car">car</option>
                        </select>
                    </div>
                    <button className='bg-[#111] text-white font-semi-bold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Register</button>
                </form>
                <p className='text-center'> Already have an Account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
            </div>
            <div>
                <p className='text-[10px] leading-tight'> By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
            </div>
        </div>
    )
}

export default CaptainSignup
