import { useState } from 'react'

function Clue({ clue, clueNumber, totalClues, onCorrect }) {
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState('')

  const checkAnswer = () => {
    const userAnswer = answer.trim().toUpperCase()
    const correctAnswer = clue.answer.trim().toUpperCase()

    if (!userAnswer) {
      setMessage('ENTER AN ANSWER')
      return
    }

    if (userAnswer === correctAnswer) {
      setMessage('✓ ACCESS GRANTED')

      setTimeout(() => {
        onCorrect(clue.digit)
        setAnswer('')
        setMessage('')
      }, 500)
    } else {
      setMessage('✕ INCORRECT — TRY AGAIN')
      setAnswer('')
    }
  }

  return (
    <div className="clue-card">

      <div className="clue-category">
        {clue.category}
      </div>

      <div className="lock-number">
        CLUE {String(clueNumber).padStart(2, '0')} / {String(totalClues).padStart(2, '0')}
      </div>

      <h3>{clue.question}</h3>

      <p className="clue-question">
        {clue.hint}
      </p>

      <input
        className="clue-input"
        type="text"
        value={answer}
        placeholder="ENTER ANSWER"
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            checkAnswer()
          }
        }}
        autoFocus
      />

      <button
        className="start-button clue-submit"
        onClick={checkAnswer}
      >
        SUBMIT
        <span>→</span>
      </button>

      {message && (
        <div className="clue-message">
          {message}
        </div>
      )}

    </div>
  )
}

export default Clue