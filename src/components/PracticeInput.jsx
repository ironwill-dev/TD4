import React from 'react'

const PracticeInput = ({value, onChange, placeholder}) => {
  return (
    <div>
      <input 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default PracticeInput
