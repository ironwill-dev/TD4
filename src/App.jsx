import './App.css'
import { useState, useEffect } from 'react';
import Input from './components/Input';
import Buttons from './components/Buttons';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('Welcome to TD3')
  const [showGreeting, setShowGreeting] = useState(false)
  const [practice, setPractice] = useState('')

  // Load saved name when app starts
  useEffect(() => {
    const savedName = localStorage.getItem('name')
    if (savedName) setName(savedName)
  }, [])

  // Save name whenever it changes
  useEffect(() => {
    if (name) localStorage.setItem('name', name)
  }, [name])

  const handleInputChange = (e) => setName(e.target.value)
  const handleClick = () => setShowGreeting(true)
  const handleReset = () => {
    setName('')
    localStorage.removeItem('name')
    setShowGreeting(false)
  }
  const handlePractice = (e) => setPractice(e.target.value)

  return (
    <div>
      <header>
        <h1>IronWill Greeting</h1>
        <Navbar />
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App