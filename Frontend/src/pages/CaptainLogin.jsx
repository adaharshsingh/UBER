import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const CaptainLogin = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})
    const submitHandler = (e)=>{e.preventDefault();
        setCaptainData({
            email: email,
            password: password
        })
    setEmail('')
    setPassword('')
}
  return (
    <div className='p-7 pt-3 h-screen flex-col flex justify-between'>
        <div>
        <img className='w-[76px] 'src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber"/>
        <form onSubmit={(e) => submitHandler(e)}>
        <h3 className='text-lg font-medium mb-2'> What's your email!</h3>
        <input required value={email} onChange={(e)=>{setEmail(e.target.value)}} className='bg-[#eeeeee] mb-7 rounded  px-4 py-2 w-full text-base placeholder:text-sm border'type="email" placeholder='Email@Example.com' />
        <h3 className='text-lg font-medium mb-2'> What's your password</h3>
        <input required value={password} onChange={(e)=>{setPassword(e.target.value)}} className='bg-[#eeeeee] mb-7 rounded  px-4 py-2 w-full text-base placeholder:text-sm border' type="password" placeholder='Your_password' />
        <button className='bg-[#111] text-white font-semi-bold mb-3 rounded  px-4 py-2 w-full text-lg placeholder:text-base ' >Login</button>
        </form>
        <p className='text-center'> New to fleet?  <Link to='/captain-register' className='text-blue-600'>Create new Account</Link>
        </p>
        </div>
        <div>
            <Link to='/login' className='bg-[#111] text-white font-semibold mb-7 rounded  px-4 py-2 w-full text-lg placeholder:text-base flex items-center justify-center '>Sign in as User</Link>
        </div>
    </div>
  )
}

export default CaptainLogin
