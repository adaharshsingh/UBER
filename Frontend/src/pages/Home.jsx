import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='bg-[url(https://statescoop.com/wp-content/uploads/sites/6/2021/02/ken-wyatt-Bt02pzZSlsk-unsplash-1.jpg)] bg-bottom bg-cover h-screen pt-8 w-full flex justify-between flex-col'>
        <img className='w-16 ml-8 'src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber"/>
        <div className='pb-7 bg-white px-4 py-4'>
            <h2 className='text-3xl font-bold'>
                Get Started With Uber
            </h2>
            <Link to='/login' className='flex items-center justify-center  w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
