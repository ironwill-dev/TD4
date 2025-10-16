import './App.css'
import { useState } from 'react'

function App() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('Welcome to TD3')
  const [showGreeting, setShowGreeting] = useState(false)

  const handleInputChange = (e) => {
    setName(e.target.value)
  }

  const handleClick = () => {
    setShowGreeting(true)
  }

  return (
    <div>
      <header>
        <h1>IronWill Greeting</h1>
      </header>

      <main>
        <input type='text' value={name} onChange={handleInputChange} placeholder='Enter name here..' />
        <button onClick={handleClick}>Greet Me !</button>
        { showGreeting && (
          <p>{greeting}, {name || 'friend'} !</p>
        ) }
      </main>

      <footer>
        &copy; 2025 IronWill. All rights reserved.
      </footer>
    </div>
  )
}

export default App
