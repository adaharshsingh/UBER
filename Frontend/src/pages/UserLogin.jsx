import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { UserDataContext} from '../context/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const { userData, setUserData } = useContext(UserDataContext)
    const navigate = useNavigate()

    const submitHandler = async(e)=>{e.preventDefault();
        const userData={
            email:email,
            password:password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
        if (response.status === 200 )
            {
            const data =response.data
            setUserData(data.user)
            localStorage.setItem('token',data.token)
            navigate('/home')
            alert('User login Successful')
            }
    setEmail('')
    setPassword('')
}
  return (
    <div className='p-7 h-screen flex-col flex justify-between'>
        <div>
        <img className='w-16 mb-10'src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber"/>
        <form onSubmit={(e) => submitHandler(e)}>
        <h3 className='text-lg font-medium mb-2'> What's your email!</h3>
        <input required value={email} onChange={(e)=>{setEmail(e.target.value)}} className='bg-[#eeeeee] mb-7 rounded  px-4 py-2 w-full text-base placeholder:text-sm border'type="email" placeholder='Email@Example.com' />
        <h3 className='text-lg font-medium mb-2'> What's your password</h3>
        <input required value={password} onChange={(e)=>{setPassword(e.target.value)}} className='bg-[#eeeeee] mb-7 rounded  px-4 py-2 w-full text-base placeholder:text-sm border' type="password" placeholder='Your_password' />
        <button className='bg-[#111] text-white font-semi-bold mb-3 rounded  px-4 py-2 w-full text-lg placeholder:text-base ' >Login</button>
        </form>
        <p className='text-center'> new User?  <Link to='/register' className='text-blue-600'>Create new Account</Link>
        </p>
        </div>
        <div>
            <Link to='/captain-login' className='bg-[#111] text-white font semi-bold mb-7 rounded  px-4 py-2 w-full text-lg placeholder:text-base flex items-center justify-center '>Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin
