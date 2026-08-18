import './Result.css'

export default function Result({ result, onReset, attemptsUsed = 3 }) {
  const isSuccess = result === 'success'
  const attemptsDepleted = attemptsUsed >= 3

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
            ? 'Congratulations! You cracked all security locks and breached the cyber vault!'
            : attemptsDepleted
              ? 'Security lockdown triggered! You have used all 3 attempts.'
              : 'Security alarm triggered! Time expired before the vault could be unlocked.'}
        </p>

        {!isSuccess && (
          <div className="result-details">
            <div className="detail-box">
              <span>ATTEMPTS USED</span>
              <strong>{attemptsUsed} / 3</strong>
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