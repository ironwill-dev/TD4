import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const {user, logout} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div>
      <h2>Welcome to the Dashboard, {user?.name || 'friend'}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
