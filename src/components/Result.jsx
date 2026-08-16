import './Result.css'

export default function Result({ result, correctAnswer, userAnswer, onReset, attemptsUsed }) {
  const isSuccess = result === 'success'

  return (
    <div className={`result-screen ${result}`}>
      <div className="result-content">
        <div className="result-icon">
          {isSuccess ? '🔓' : '🔒'}
        </div>

        <h1 className="result-title">
          {isSuccess ? 'VAULT UNLOCKED' : 'BETTER LUCK NEXT TIME'}
        </h1>

        <p className="result-status">
          {isSuccess
            ? 'Congratulations! You cracked the vault and escaped!'
            : 'You have used all 3 attempts. The vault remains locked.'}
        </p>

        {!isSuccess && (
          <div className="result-details">
            <div className="detail-box">
              <span>ATTEMPTS USED</span>
              <strong>3 / 3</strong>
            </div>
          </div>
        )}

        <button className="start-button" onClick={onReset}>
          TRY ANOTHER VAULT
        </button>
      </div>
    </div>
  )
}