import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MatchGame.css'

const WUXING = [
  { name: '金', color: '#FFD700', icon: '⚔️' },
  { name: '木', color: '#00A86B', icon: '🌿' },
  { name: '水', color: '#1E90FF', icon: '💧' },
  { name: '火', color: '#FF4500', icon: '🔥' },
  { name: '土', color: '#DAA520', icon: '🪨' }
]

function generateCards() {
  const cards = [...WUXING, ...WUXING].map((item, index) => ({ id: index, ...item, isFlipped: false, isMatched: false }))
  return cards.sort(() => Math.random() - 0.5)
}

function MatchGame() {
  const [cards, setCards] = useState(generateCards())
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [isWin, setIsWin] = useState(false)
  const [canClick, setCanClick] = useState(true)

  useEffect(() => {
    if (flippedCards.length === 2) {
      setCanClick(false)
      setMoves(m => m + 1)
      const [first, second] = flippedCards
      if (cards[first].name === cards[second].name) {
        setTimeout(() => {
          setCards(prev => prev.map((card, i) => i === first || i === second ? { ...card, isMatched: true } : card))
          setMatchedPairs(p => p + 1)
          setFlippedCards([])
          setCanClick(true)
        }, 500)
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, i) => i === first || i === second ? { ...card, isFlipped: false } : card))
          setFlippedCards([])
          setCanClick(true)
        }, 800)
      }
    }
  }, [flippedCards, cards])

  useEffect(() => { if (matchedPairs === 5) setIsWin(true) }, [matchedPairs])

  const handleCardClick = (index: number) => {
    if (!canClick || cards[index].isFlipped || cards[index].isMatched) return
    setCards(prev => prev.map((card, i) => i === index ? { ...card, isFlipped: true } : card))
    setFlippedCards(prev => [...prev, index])
  }

  const handleRestart = () => {
    setCards(generateCards())
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setIsWin(false)
    setCanClick(true)
  }

  return (
    <div className="game-page">
      <nav className="navbar">
        <Link to="/games" className="back-btn">←</Link>
        <span className="title">五行配对</span>
        <div style={{ width: 40 }} />
      </nav>

      <div className="info-bar">
        <span>步数: {moves}</span>
        <span>配对: {matchedPairs}/5</span>
      </div>

      {isWin && (
        <div className="win-overlay">
          <div className="win-card">
            <span style={{ fontSize: 48 }}>🎉</span>
            <h3>恭喜通关！</h3>
            <p>用时 {moves} 步</p>
            <button onClick={handleRestart}>再玩一次</button>
          </div>
        </div>
      )}

      <div className="cards-grid">
        {cards.map((card, index) => (
          <div key={card.id} className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`} onClick={() => handleCardClick(index)}>
            <div className="card-inner">
              <div className="card-back">?</div>
              <div className="card-front" style={{ backgroundColor: card.color }}>
                <span>{card.icon}</span>
                <b>{card.name}</b>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="restart-btn" onClick={handleRestart}>重新开始</button>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item"><span className="nav-icon">🏠</span><span className="nav-label">首页</span></Link>
        <Link to="/games" className="nav-item active"><span className="nav-icon">🎮</span><span className="nav-label">游戏</span></Link>
        <Link to="/profile" className="nav-item"><span className="nav-icon">👤</span><span className="nav-label">我的</span></Link>
      </nav>
    </div>
  )
}

export default MatchGame
