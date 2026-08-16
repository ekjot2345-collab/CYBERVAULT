import { useState } from 'react'
import './Clue.css'

export default function Clue({ clue, onSolved }) {
  const [userAnswer, setUserAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [solved, setSolved] = useState(false)

  // For host-verified questions
  const handleHostVerify = () => {
    setMessage('✓ Host verified! Fragment recovered.')
    setSolved(true)
    setTimeout(() => {
      onSolved(clue.digit)
    }, 800)
  }

  // For input questions
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!userAnswer.trim()) {
      setMessage('Please enter an answer.')
      return
    }

    // Handle HOST_DEFINED answers (host decides)
    if (clue.answer === 'HOST_DEFINED') {
      setMessage('✓ Host will verify! Fragment recovered.')
      setSolved(true)
      setTimeout(() => {
        onSolved(clue.digit)
      }, 800)
      return
    }

    // Normal answer checking (case-insensitive)
    if (userAnswer.toUpperCase() === clue.answer.toUpperCase()) {
      setMessage('✓ Correct! Fragment recovered.')
      setSolved(true)
      setTimeout(() => {
        onSolved(clue.digit)
      }, 800)
    } else {
      setMessage('✗ Incorrect. Try again.')
      setUserAnswer('')
    }
  }

  return (
    <div className="clue-card">
      <div className="clue-category">
        {clue.category}
      </div>

      <h3>{clue.question}</h3>

      <p className="clue-hint">
        💡 {clue.hint}
      </p>

      {!solved ? (
        <>
          {clue.type === 'host-verified' ? (
            // HOST-VERIFIED QUESTION
            <div className="host-verified-section">
              <p className="host-instruction">
                Complete this challenge, then press the button below when ready for verification.
              </p>
              <button
                className="start-button"
                onClick={handleHostVerify}
                style={{ width: '200px' }}
              >
                READY FOR VERIFICATION
              </button>
            </div>
          ) : (
            // INPUT QUESTION
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="clue-input"
                placeholder="Enter your answer..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                autoFocus
              />
              <button type="submit" className="start-button" style={{ width: '150px' }}>
                SUBMIT
              </button>
            </form>
          )}
        </>
      ) : (
        <div className="clue-success">
          ✓ Fragment {clue.id} recovered: [{clue.digit}]
        </div>
      )}

      {message && (
        <p className={`clue-message ${solved ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  )
}