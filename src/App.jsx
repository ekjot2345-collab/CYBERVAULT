import { useEffect, useState, useCallback } from 'react'
import Clue from './components/Clue'
import Result from './components/Result'
import { getRandomClueSet } from './data/clues'
import './App.css'

function App() {
  const [started, setStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300)
  const [currentClueIndex, setCurrentClueIndex] = useState(0)
  const [collectedAnswers, setCollectedAnswers] = useState([])
  const [userAnswer, setUserAnswer] = useState('')
  const [result, setResult] = useState(null)
  const [clues, setClues] = useState([])
  const [setNumber, setSetNumber] = useState(0)
  const [attemptsLeft, setAttemptsLeft] = useState(3)

  const resetGameState = () => {
    setStarted(false)
    setTimeLeft(300)
    setCurrentClueIndex(0)
    setCollectedAnswers([])
    setUserAnswer('')
    setResult(null)
    setAttemptsLeft(3)
  }

  const loadNewSet = useCallback(() => {
    const randomClues = getRandomClueSet()
    const setNum = randomClues[0].set
    setClues(randomClues)
    setSetNumber(setNum)
    resetGameState()
  }, [])

  // Select random clue set on component mount
  useEffect(() => {
    // defer to avoid synchronous setState calls during render
    const id = setTimeout(() => loadNewSet(), 0)
    return () => clearTimeout(id)
  }, [loadNewSet])

  // Timer logic
  useEffect(() => {
    if (!started || timeLeft <= 0 || result) return

    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time - 1 <= 0) {
          setResult('failure')
          return 0
        }
        return time - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [started, timeLeft, result])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timeDisplay = `${minutes}:${String(seconds).padStart(2, '0')}`

  // Handle clue solved
  const handleClueSolved = (answer) => {
    const newAnswers = [...collectedAnswers, answer]
    setCollectedAnswers(newAnswers)

    if (newAnswers.length < clues.length) {
      setCurrentClueIndex(currentClueIndex + 1)
    } else {
      // All questions answered correctly - SUCCESS!
      setResult('success')
    }
  }

  // Handle wrong answer
  const handleWrongAnswer = () => {
    const newAttempts = attemptsLeft - 1
    setAttemptsLeft(newAttempts)
    
    if (newAttempts <= 0) {
      // Out of attempts - FAILURE!
      setResult('failure')
    }
  }

  // Reset with new set
  const resetGame = () => {
    loadNewSet()
  }

  if (!clues.length) {
    return <div className="app" style={{ color: '#a3ff12', padding: '50px' }}>Loading...</div>
  }

  /* =========================
     GAME SCREEN
  ========================= */

  if (started) {
    // Show result screen
    if (result) {
      return (
        <div className="game-screen">
          <header className="navbar">
            <div className="logo">
              <span className="logo-symbol">◇</span>
              <span>CYBER VAULT</span>
            </div>
            <div className="game-timer">
              SET&nbsp;&nbsp;
              <strong>{setNumber} / 10</strong>
            </div>
          </header>

          <main className="game-content">
            <Result 
              result={result} 
              correctAnswer={collectedAnswers.join('')}
              userAnswer={userAnswer}
              onReset={resetGame}
              attemptsUsed={3 - attemptsLeft}
            />
          </main>
        </div>
      )
    }

    // Show clue screen
    return (
      <div className="game-screen">
        <header className="navbar">
          <div className="logo">
            <span className="logo-symbol">◇</span>
            <span>CYBER VAULT</span>
          </div>

          <div className="game-timer">
            TIME LEFT&nbsp;&nbsp;
            <strong>{timeDisplay}</strong>
          </div>
        </header>

        <main className="game-content">
          <div className="game-header">
            <div>
              <p className="challenge-label">
                MISSION ACTIVE — SET {setNumber}
              </p>
              <h2>CRACK THE VAULT</h2>
            </div>

            <div className="attempts">
              ATTEMPTS LEFT&nbsp;&nbsp;
              <strong>{attemptsLeft} / 3</strong>
            </div>
          </div>

          <div className="game-card clue-card">
            <div className="lock-number">
              LOCK {currentClueIndex + 1} / {clues.length}
            </div>

            <Clue
              key={clues[currentClueIndex].id}
              clue={clues[currentClueIndex]}
              onSolved={handleClueSolved}
              onWrongAnswer={handleWrongAnswer}
              attemptsLeft={attemptsLeft}
            />
          </div>
        </main>
      </div>
    )
  }

  /* =========================
     LANDING SCREEN
  ========================= */

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span className="logo-symbol">◇</span>
          <span>CYBER VAULT</span>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </div>
      </header>

      <main className="landing">
        <section className="intro">
          <div className="challenge-label">
            SECURITY CHALLENGE
          </div>

          <h1>
            THE VAULT
            <br />
            <span>IS LOCKED.</span>
          </h1>

          <p className="description">
            Three challenges. Three attempts.
            <br />
            Solve the challenges and unlock the vault.
          </p>

          <div className="game-info">
            <div className="info-box">
              <span>CHALLENGES</span>
              <strong>03</strong>
            </div>

            <div className="info-box">
              <span>ATTEMPTS</span>
              <strong>03</strong>
            </div>

            <div className="info-box">
              <span>TIME LIMIT</span>
              <strong>5 MIN</strong>
            </div>
          </div>

          <button
            className="start-button"
            onClick={() => {
              setStarted(true)
              setTimeLeft(300)
            }}
          >
            <span className="play-icon">▶</span>
            <span className="button-text">BEGIN CRACKING</span>
          </button>

          <p className="warning">
            Timer starts when the mission begins.
          </p>
        </section>

        <section className="vault-section">
          <div className="vault">
            <div className="vault-frame">
              <div className="vault-door">
                <div className="door-seam vertical"></div>
                <div className="door-seam horizontal"></div>
                <div className="hinge hinge-top"></div>
                <div className="hinge hinge-bottom"></div>
                <div className="door-bolts">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="vault-lock">
                  <div className="lock-wheel">
                    <div className="wheel-handle handle-top"></div>
                    <div className="wheel-handle handle-right"></div>
                    <div className="wheel-handle handle-bottom"></div>
                    <div className="wheel-handle handle-left"></div>

                    <div className="wheel-ring">
                      <div className="lock-center">🔒</div>
                    </div>
                  </div>
                </div>

                <div className="door-status">
                  <span className="status-dot"></span>
                  VAULT LOCKED
                </div>
              </div>
            </div>
          </div>

          <div className="vault-meta">
            <span>VAULT // 001</span>
            <span>AUTHORIZATION REQUIRED</span>
          </div>
        </section>
      </main>

      <footer className="footer">
        <section className="hacker-section">
          <div className="code-stream code-stream-left">
            <div className="code-line">[SYSTEM] INITIALIZING SECURE CHANNEL...</div>
            <div className="code-line">[AUTH] BYPASS_PROTOCOL --ACTIVE</div>
            <div className="code-line">[NODE] CONNECTION ESTABLISHED @ 127.0.0.1:8443</div>
            <div className="code-line">[SCAN] SEARCHING ENCRYPTED FRAGMENTS...</div>
            <div className="code-line">[VAULT] FIREWALL DETECTED - LAYER_7</div>
            <div className="code-line">[CRYPT] DECRYPTING FRAGMENT_01 █████░░░░░</div>
            <div className="code-line">[CRYPT] DECRYPTING FRAGMENT_02 ███████░░░░</div>
            <div className="code-line">[CRYPT] DECRYPTING FRAGMENT_03 ██████████░</div>
            <div className="code-line">[WARN] INTRUSION DETECTED - EVASION MODE</div>
            <div className="code-line">[TRACE] CONNECTION MASKED - GHOST_PROTOCOL</div>
            <div className="code-line">[ACCESS] AUTHENTICATION REQUIRED</div>
            <div className="code-line">[SYSTEM] INITIALIZING SECURE CHANNEL...</div>
            <div className="code-line">[AUTH] BYPASS_PROTOCOL --ACTIVE</div>
            <div className="code-line">[NODE] CONNECTION ESTABLISHED @ 127.0.0.1:8443</div>
            <div className="code-line">[SCAN] SEARCHING ENCRYPTED FRAGMENTS...</div>
            <div className="code-line">[VAULT] FIREWALL DETECTED - LAYER_7</div>
            <div className="code-line">[CRYPT] DECRYPTING FRAGMENT_01 █████░░░░░</div>
            <div className="code-line">[CRYPT] DECRYPTING FRAGMENT_02 ███████░░░░</div>
            <div className="code-line">[CRYPT] DECRYPTING FRAGMENT_03 ██████████░</div>
            <div className="code-line">[WARN] INTRUSION DETECTED - EVASION MODE</div>
            <div className="code-line">[TRACE] CONNECTION MASKED - GHOST_PROTOCOL</div>
            <div className="code-line">[ACCESS] AUTHENTICATION REQUIRED</div>
          </div>

          <div className="code-stream code-stream-right">
            <div className="code-line">[FIREWALL] PACKET_INSPECTION_ACTIVE</div>
            <div className="code-line">[PROTOCOL] TLS_1.3 HANDSHAKE INITIATED</div>
            <div className="code-line">[SOCKET] PORT 8443 LISTENING</div>
            <div className="code-line">[ENCRYPT] RSA_4096 KEY_PAIR GENERATED</div>
            <div className="code-line">[HASH] SHA256 CHECKSUM VERIFIED</div>
            <div className="code-line">[RELAY] ROUTING THROUGH PROXY_NODES</div>
            <div className="code-line">[QUARANTINE] SUSPICIOUS_PACKET FLAGGED</div>
            <div className="code-line">[MONITOR] ANOMALY_DETECTION THRESHOLD 85%</div>
            <div className="code-line">[BACKUP] VAULT_STATE ENCRYPTED & ARCHIVED</div>
            <div className="code-line">[ALERT] MULTIPLE LOGIN ATTEMPTS BLOCKED</div>
            <div className="code-line">[SEGMENT] NETWORK ISOLATION ACTIVE</div>
            <div className="code-line">[FIREWALL] PACKET_INSPECTION_ACTIVE</div>
            <div className="code-line">[PROTOCOL] TLS_1.3 HANDSHAKE INITIATED</div>
            <div className="code-line">[SOCKET] PORT 8443 LISTENING</div>
            <div className="code-line">[ENCRYPT] RSA_4096 KEY_PAIR GENERATED</div>
            <div className="code-line">[HASH] SHA256 CHECKSUM VERIFIED</div>
            <div className="code-line">[RELAY] ROUTING THROUGH PROXY_NODES</div>
            <div className="code-line">[QUARANTINE] SUSPICIOUS_PACKET FLAGGED</div>
            <div className="code-line">[MONITOR] ANOMALY_DETECTION THRESHOLD 85%</div>
            <div className="code-line">[BACKUP] VAULT_STATE ENCRYPTED & ARCHIVED</div>
            <div className="code-line">[ALERT] MULTIPLE LOGIN ATTEMPTS BLOCKED</div>
            <div className="code-line">[SEGMENT] NETWORK ISOLATION ACTIVE</div>
          </div>
        </section>
      </footer>
    </div>
  )
}

export default App