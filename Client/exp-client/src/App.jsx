import { useState } from 'react'
import './App.css'
import Login from './components/auth/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './components/auth/Register'
import { ProtectRoutes } from './services/protectedRoutes'
import Home from './components/genComp/Home'
import PublicRoutes from './services/PublicRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  

  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<ProtectRoutes />}>
          <Route path='/home' element={<Home />} />

        </Route>


      </Routes>

    </>
  )
}

export default App
