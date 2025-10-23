import React from 'react'

const Buttons = ({greeting, onClick, showGreeting, name, onReset}) => {
    return (
        <div>
            <button onClick={onClick} disabled={!name.trim()} >Greet Me !</button>
            <button onClick={onReset}>Reset !</button>
            { showGreeting && (
                <p>{greeting}, {name || 'friend'} !</p>
            )}
        </div>
    )
}

export default Buttons
