import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const UserSignup = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})
    const submitHandler = (e)=>{e.preventDefault();
        setUserData({
            username:{
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password       
         })
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
}
  return (
    <div className='p-7 h-screen flex-col flex justify-between'>
        <div>
        <img className='w-16 mb-10'src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber"/>
        <form onSubmit={(e) => submitHandler(e)}>
        <h3 className='text-lg font-medium mb-2'> What's your Name!</h3>
        <div className='flex gap-4'>
        <input required className='bg-[#eeeeee] mb-7 rounded  px-4 py-2 w-full text-lg text-base placeholder:text-sm border'type="Text" placeholder='First Name' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
        <input required className='bg-[#eeeeee] mb-7 rounded  px-4 py-2 w-full text-lg text-base placeholder:text-sm border'type="Text" placeholder='Last Name' value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
        </div>
        <h3 className='text-lg font-medium mb-2'> What's your email!</h3>
        <input required className='bg-[#eeeeee] mb-7 rounded  px-4 py-2 w-full text-base placeholder:text-sm border'type="email" placeholder='Email@Example.com' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <h3 className='text-lg font-medium mb-2'> What's your password</h3>
        <input required className='bg-[#eeeeee] mb-7 rounded  px-4 py-2 w-full text-base placeholder:text-sm border' type="password" placeholder='Your_password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button className='bg-[#111] text-white font-semi-bold mb-3 rounded  px-4 py-2 w-full text-lg placeholder:text-base ' >Register</button>
        </form>
        <p className='text-center'> Already have a Account? <Link to='/login' className='text-blue-600'>Login here</Link>
        </p>
        </div>
        <div>
            <p className='text-[10px] leading-tight'> By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
        </div>
    </div>
  )
}

export default UserSignup
