import './App.css'
import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Settings from './pages/Settings';
import UserExplorer from './components/UserExplorer';

function App() {
  const [name, setName] = useState('')

  // Load saved name when app starts
  useEffect(() => {
    const savedName = localStorage.getItem('name')
    if (savedName) setName(savedName)
  }, [])

  // Save name whenever it changes
  useEffect(() => {
    if (name) localStorage.setItem('name', name)
  }, [name])

  return (
    <div>
      <header>
        <h1>IronWill Greeting</h1>
        <Navbar />
      </header>

      <main>
        <UserExplorer />
        {/* <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
        </Routes> */}
      </main>

      <Footer />
    </div>
  )
}

export default App