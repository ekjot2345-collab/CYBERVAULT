import './Result.css'

export default function Result({ result, correctPin, userPin, onReset }) {
  const isSuccess = result === 'success'

  return (
    <div className={`result-screen ${result}`}>
      <div className="result-content">
        <div className="result-icon">
          {isSuccess ? '🔓' : '🔒'}
        </div>

        <h1 className="result-title">
          {isSuccess ? 'VAULT UNLOCKED' : 'MISSION FAILED'}
        </h1>

        <p className="result-status">
          {isSuccess
            ? 'Congratulations! You cracked the vault and escaped!'
            : 'You were unable to crack the vault in time. The security system locked down.'}
        </p>

        <div className="result-details">
          <div className="detail-box">
            <span>CORRECT PIN</span>
            <strong>{correctPin}</strong>
          </div>

          {!isSuccess && (
            <div className="detail-box">
              <span>YOUR ENTRY</span>
              <strong>{userPin || 'None'}</strong>
            </div>
          )}
        </div>

        <button className="start-button" onClick={onReset}>
          TRY ANOTHER VAULT
        </button>
      </div>
    </div>
  )
}