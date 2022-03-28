import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import http from '../../config'
export default function Home() {
  useEffect(() => {
    http
      .get('/user/1')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.data.msg)
      })
  }, [])
  return (
    <div>
      home
      <button onClick={ToLogin}>login</button>
    </div>
  )
}

function ToLogin() {
  const navigate = useNavigate()
  navigate('/login', { replace: true })
}
