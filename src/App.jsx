import './App.css'
import { useState, useEffect } from 'react';
import Input from './components/Input';
import Buttons from './components/Buttons';

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
      </header>

      <main>
        <Input 
          value={name}          
          onChange={handleInputChange} 
          placeholder='Enter name here..' 
        />

        <Buttons 
          greeting={greeting} 
          onClick={handleClick} 
          showGreeting={showGreeting} 
          name={name}
          onReset={handleReset}
        />
      </main>

      <footer>
        &copy; 2025 IronWill. All rights reserved.
      </footer>
    </div>
  )
}

export default App