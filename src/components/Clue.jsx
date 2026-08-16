import { useState } from 'react'
import './Clue.css'

export default function Clue({ clue, onSolved, onWrongAnswer, attemptsLeft }) {
  const [userAnswer, setUserAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [solved, setSolved] = useState(false)

  // Normalize answer for comparison (trim and lowercase)
  const normalizeAnswer = (answer) => {
    return answer.trim().toLowerCase()
  }

  // Handle answer verification for all question types
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!userAnswer.trim()) {
      setMessage('Please enter an answer.')
      return
    }

    // For HOST_DEFINED answers, accept any non-empty answer
    if (clue.answer === 'HOST_DEFINED') {
      setMessage('✓ Correct! Fragment recovered.')
      setSolved(true)
      setTimeout(() => {
        onSolved(clue.answer)
      }, 800)
      return
    }

    // Normal answer checking (case-insensitive, trimmed)
    if (normalizeAnswer(userAnswer) === normalizeAnswer(clue.answer)) {
      setMessage('✓ Correct! Fragment recovered.')
      setSolved(true)
      setTimeout(() => {
        onSolved(clue.answer)
      }, 800)
    } else {
      onWrongAnswer()
      const remaining = attemptsLeft - 1
      if (remaining > 0) {
        setMessage(`✗ Incorrect. ${remaining} ${remaining === 1 ? 'attempt' : 'attempts'} remaining.`)
        setUserAnswer('')
      }
    }
  }

  return (
    <div className="clue-card">
      <div className="clue-category">
        {clue.category}
      </div>

      <h3>{clue.question}</h3>

      {!solved ? (
        <div className="input-container">
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              className="answer-input"
              placeholder="Enter your answer..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              autoComplete="off"
              autoFocus
            />
            <button type="submit" className="verify-button">
              VERIFY ANSWER
            </button>
          </form>
        </div>
      ) : (
        <div className="clue-success">
          ✓ Fragment {clue.id} recovered: [{clue.answer}]
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