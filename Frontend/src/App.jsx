import React from 'react'
import {Routes, Route} from 'react-router-dom'
import UserLogin from './pages/UserLogin' 
import CaptainLogin from './pages/CaptainLogin'
import UserRegister from './pages/UserSignup'
import CaptainRegister from './pages/CaptainSignup'
import Home from './pages/Home'
import Start from './pages/Start'
import UserProtectedWrapper from './pages/userProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'

const App = () => {
  return (
    <div>
     <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/captain-login' element={<CaptainLogin />} />
      <Route path='/register' element={<UserRegister />} />
      <Route path='/captain-register' element={<CaptainRegister />} />
      <Route path="*" element={<div className="text-white text-2xl">404 - Not Found</div>} />
      <Route path="/home" element={
        <UserProtectedWrapper>
          <Home />
        </UserProtectedWrapper>} 
      />
      <Route path='/user/logout' element={<UserProtectedWrapper><UserLogout /></UserProtectedWrapper>} />
      <Route path='/captain-home' element={<CaptainProtectedWrapper><CaptainHome /></CaptainProtectedWrapper>} />
      <Route path='/captain/logout' element={<CaptainProtectedWrapper><CaptainLogout /></CaptainProtectedWrapper>} />
    </Routes>
    </div>
  )
}

export default App
