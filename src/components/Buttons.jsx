import React from 'react'

const Buttons = ({greeting, onClick, showGreeting, name}) => {
    return (
        <div>
            <button onClick={onClick} disabled={!name.trim()} >Greet Me !</button>
            { showGreeting && (
                <p>{greeting}, {name || 'friend'} !</p>
            )}
        </div>
    )
}

export default Buttons
