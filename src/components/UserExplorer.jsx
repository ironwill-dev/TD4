import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { SiStagetimer } from "react-icons/si";

const UserExplorer = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const refreshUsers = () => {
        setLoading(true)
        axios.get('https://jsonplaceholder.typicode.com/users')
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

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            setUsers(res.data)
            setLoading(false)
        })
        .catch(err => {
            setError('Failed to fetch users')
            setLoading(false)
        })
    }, [])

    if (loading) return <SiStagetimer size={40} color='black'/>
    if (error) return <p style={{padding: '0.5rem', backgroundColor: 'whitesmoke', color: 'crimson', borderRadius: '6px', border: 'none'}}>{error}</p>

    return (
        <div>
            <h2>User Explorer</h2>
            {users.map(user => (
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
                    <p>City: {user.address.city}</p>
                </div>
            ))}
            <button onClick={refreshUsers}>Refresh Users</button>
        </div>
    )
}

export default UserExplorer
