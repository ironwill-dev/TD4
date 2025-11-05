import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { SiStagetimer } from "react-icons/si";

const UserExplorer = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const refreshUsers = () => {
        setLoading(true)
        axios.get('/data/users.json')
            .then(res => {
                setUsers(res.data)
                setLoading(false)
            })
            .catch(err => {
                setError('Failed to fetch data')
                setLoading(false)
            })
    }

    useEffect(() => {
        refreshUsers()        
    }, [])

    //Simulated CRUD functions
    const simulateRequest = (callback) => {
        setLoading(true)
        setTimeout(() => {
            try {
                callback()
            } catch (err) {
                setError('Something went wrong')
            } finally {
                setLoading(false)
            }
        }, 700)
    }

    const addUser = (newUser) => {
        simulateRequest(() => {
            setUsers(prev => [...prev, {id: Date.now(), ...newUser}])
        })
    }

    const updateUser = (id, updatedData) => {
        simulateRequest(() => {
            setUsers(prev =>
                prev.map(user => (user.id === id ? {...user, ...updatedData} : user))
            )
        })
    }

    const deleteUser = (id) => {
        simulateRequest(() => {
            setUsers(prev => prev.filter(user => user.id !== id))
        })
    }

    if (loading) return <SiStagetimer size={40} color='black'/>
    if (error) return <p style={{padding: '0.5rem', backgroundColor: 'whitesmoke', color: 'crimson', borderRadius: '6px', border: 'none'}}>{error}</p>

    return (
        <div>
            <h2>User Explorer</h2>
            <input placeholder='Search Users...' onChange={(e) => setSearchTerm(e.target.value)} />
            {users
            .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(user => (
                <div key={user.id} 
                    style={{
                        padding: '1rem', 
                        backgroundColor: 'whitesmoke', 
                        color: 'black', 
                        borderRadius: '10px', 
                        border: '1px solid gray', 
                        marginBottom: '1rem',
                        transition: 'transform .3s'
                    }}

                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 0 10px gray';
                    }}

                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <h3>Name: {user.name}</h3>
                    <p>Email: {user.email}</p>
                    <p>City: {user.address.city || 'Unknown'}</p>
                </div>
            ))}
            <button onClick={refreshUsers}>Refresh Users</button>
            <button onClick={() => addUser({ name: 'Burt Accounting', email: 'accounting@gmail.com', address: {city: 'Whoville'} })}>Add User</button>
            <button onClick={() => updateUser(users[0]?.id, {name: 'Updated Name'})}>Edit First User</button>
            <button onClick={() => deleteUser(users[0]?.id)}>Delete First User</button>
        </div>
    )
}

export default UserExplorer
