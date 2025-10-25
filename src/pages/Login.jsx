import {useState, useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [name, setName] = useState('')
  const {login} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(name)
    navigate('/dashboard')
  }

  return (
    <form>
      <h2>Login</h2>
      <input type='text' value={name} placeholder='Enter name..' onChange={(e) => setName(e.target.value)}/>
      <button type='submit' onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default Login
