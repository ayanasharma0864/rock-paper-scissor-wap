import { useState } from "react"
import "./App.css"

const CHOICES = [
  { name: "Rock", emoji: "🪨" },
  { name: "Paper", emoji: "📄" },
  { name: "Scissors", emoji: "✂️" },
]

function getComputerChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)]
}

function getResult(player, computer) {
  if (player === computer) return "Draw!"
  if (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Paper" && computer === "Rock") ||
    (player === "Scissors" && computer === "Paper")
  ) {
    return "You Win!"
  }
  return "You Lose!"
}

export default function App() {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState(null)
  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [rounds, setRounds] = useState(0)
  const [streak, setStreak] = useState(0)
  const [history, setHistory] = useState([])

  function play(choice) {
    const computer = getComputerChoice()
    const outcome = getResult(choice.name, computer.name)

    setPlayerChoice(choice)
    setComputerChoice(computer)
    setResult(outcome)
    setRounds((r) => r + 1)

    if (outcome === "You Win!") {
      setPlayerScore((s) => s + 1)
      setStreak((s) => s + 1)
    } else {
      if (outcome === "You Lose!") setComputerScore((s) => s + 1)
      setStreak(0)
    }

    setHistory((prev) => [
      { player: choice, computer, result: outcome },
      ...prev,
    ].slice(0, 6))
  }

  function reset() {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setPlayerScore(0)
    setComputerScore(0)
    setRounds(0)
    setStreak(0)
    setHistory([])
  }

  return (
    <div className="app">
      <div className="game-card">
        <h1 className="game-title">Rock Paper Scissors</h1>

        <div className="scoreboard">
          <span>Rounds: {rounds}</span>
          <span>Your: {playerScore}</span>
          <span>CPU: {computerScore}</span>
        </div>

        <p className="game-subtitle">Choose your move and beat the computer.</p>

        <div className="choices">
          {CHOICES.map((choice) => (
            <button
              key={choice.name}
              type="button"
              className={`choice-btn ${playerChoice === choice ? "choice-btn--selected" : ""}`}
              onClick={() => play(choice)}
              aria-label={choice.name}
              aria-pressed={playerChoice === choice}
            >
              <span className="choice-emoji">{choice.emoji}</span>
            </button>
          ))}
        </div>

        <div className="streak-panel">
          <span>Winning streak: <strong>{streak}</strong></span>
        </div>

        {result && (
          <div className="result-card">
            <p>
              You chose: <strong>{playerChoice.emoji} {playerChoice.name}</strong>
            </p>
            <p>
              Computer chose: <strong>{computerChoice.emoji} {computerChoice.name}</strong>
            </p>
            <h2 className="result-text">{result}</h2>
          </div>
        )}

        <div className="history-card">
          <h3>Recent moves</h3>
          <ul className="history-list">
            {history.length === 0 ? (
              <li className="history-empty">No moves yet.</li>
            ) : (
              history.map((entry, index) => (
                <li key={index} className="history-item">
                  <span className="history-emoji">{entry.player.emoji} vs {entry.computer.emoji}</span>
                  <span className="history-text">{entry.result}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        <button type="button" className="reset-btn" onClick={reset}>
          Reset Game
        </button>
      </div>
    </div>
  )
}
