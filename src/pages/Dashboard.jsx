import React from 'react'
import { AuthContext } from '../context/AuthContext'

const Dashboard = () => {
  const {user, logout} = useContext(AuthContext)

  return (
    <div>
      <h1>Welcome back, {user?.name || 'friend'}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard
