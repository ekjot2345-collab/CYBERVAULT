import { useState } from 'react'
import './Keypad.css'

export default function Keypad({ onSubmit }) {
  const [pin, setPin] = useState('')
  const [message, setMessage] = useState('')

  const handleDigitClick = (digit) => {
    if (pin.length < 4) {
      setPin(pin + digit)
      setMessage('')
    }
  }

  const handleBackspace = () => {
    setPin(pin.slice(0, -1))
    setMessage('')
  }

  const handleSubmit = () => {
    if (pin.length !== 4) {
      setMessage('PIN must be 4 digits.')
      return
    }
    onSubmit(pin)
  }

  const handleClear = () => {
    setPin('')
    setMessage('')
  }

  return (
    <div className="keypad-container">
      <div className="pin-display">
        <input
          type="password"
          value={pin}
          readOnly
          className="pin-input"
          placeholder="••••"
        />
      </div>

      <div className="keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <button
            key={digit}
            className="keypad-btn"
            onClick={() => handleDigitClick(String(digit))}
          >
            {digit}
          </button>
        ))}
        <button
          className="keypad-btn keypad-special"
          onClick={() => handleDigitClick('0')}
        >
          0
        </button>
        <button
          className="keypad-btn keypad-special"
          onClick={handleBackspace}
        >
          ← DEL
        </button>
      </div>

      <div className="keypad-actions">
        <button
          className="start-button"
          style={{ width: '100%', marginBottom: '10px' }}
          onClick={handleSubmit}
        >
          SUBMIT PIN
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