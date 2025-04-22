import React from 'react'
import {Routes, Route} from 'react-router-dom'
import UserLogin from './pages/UserLogin' 
import CaptainLogin from './pages/CaptainLogin'
import UserRegister from './pages/UserSignup'
import CaptainRegister from './pages/CaptainSignup'
import Home from './pages/Home'


const App = () => {
  return (
    <div>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/captain-login' element={<CaptainLogin />} />
      <Route path='/register' element={<UserRegister />} />
      <Route path='/captain-register' element={<CaptainRegister />} />
      <Route path="*" element={<div className="text-white text-2xl">404 - Not Found</div>} />

    </Routes>
    </div>
  )
}

export default App
