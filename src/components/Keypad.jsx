import { useState } from 'react'
import './Keypad.css'

export default function Keypad({ onSubmit }) {
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (!answer.trim()) {
      setMessage('Please enter the master key.')
      return
    }
    onSubmit(answer)
  }

  const handleClear = () => {
    setAnswer('')
    setMessage('')
  }

  return (
    <div className="keypad-container">
      <div className="pin-display">
        <input
          type="text"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value)
            setMessage('')
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSubmit()
            }
          }}
          className="pin-input"
          placeholder="Enter master key..."
          autoComplete="off"
          autoFocus
        />
      </div>

      <div className="keypad-actions">
        <button
          className="start-button"
          style={{ width: '100%', marginBottom: '10px' }}
          onClick={handleSubmit}
        >
          SUBMIT MASTER KEY
        </button>
        <button
          className="start-button"
          style={{
            width: '100%',
            background: '#0d1520',
            color: '#a3ff12',
            border: '1px solid #a3ff12',
          }}
          onClick={handleClear}
        >
          CLEAR
        </button>
      </div>

      {message && <p className="keypad-message">{message}</p>}
    </div>
  )
}

// single default export already declared above