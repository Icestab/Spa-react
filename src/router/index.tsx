import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/login/index'
import Home from '../pages/home/index'
export default function MyRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </HashRouter>
  )
}
