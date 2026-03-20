import { useState } from 'react'
import { Link } from 'react-router-dom'
import './DrawGame.css'

const WUXING = [
  { name: '金', color: '#FFD700', icon: '⚔️', emoji: '🗡️' },
  { name: '木', color: '#00A86B', icon: '🌿', emoji: '🌲' },
  { name: '水', color: '#1E90FF', icon: '💧', emoji: '🌊' },
  { name: '火', color: '#FF4500', icon: '🔥', emoji: '🔥' },
  { name: '土', color: '#DAA520', icon: '🪨', emoji: '⛰️' }
]

type CardType = typeof WUXING[0]

function drawCard(): CardType { return WUXING[Math.floor(Math.random() * WUXING.length)] }

function calculateResult(cards: CardType[]) {
  const counts: Record<string, number> = {}
  cards.forEach(card => { counts[card.name] = (counts[card.name] || 0) + 1 })
  const maxSame = Math.max(...Object.values(counts))
  if (maxSame === 5) return { rank: 'S', title: '五行归一', desc: '超级好运！' }
  if (maxSame === 4) return { rank: 'A', title: '四星连珠', desc: '非常好运！' }
  if (maxSame === 3) return { rank: 'B', title: '三星高照', desc: '好运来临！' }
  if (maxSame === 2) return { rank: 'C', title: '双星相伴', desc: '一般般~' }
  return { rank: 'D', title: '五行分散', desc: '今日需低调' }
}

function DrawGame() {
  const [cards, setCards] = useState<CardType[]>([])
  const [result, setResult] = useState<{ rank: string; title: string; desc: string } | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const handleDraw = () => {
    setIsDrawing(true)
    setResult(null)
    let count = 0
    const interval = setInterval(() => {
      setCards(Array.from({ length: 5 }, () => drawCard()))
      count++
      if (count > 8) {
        clearInterval(interval)
        const finalCards = Array.from({ length: 5 }, () => drawCard())
        setCards(finalCards)
        setResult(calculateResult(finalCards))
        setIsDrawing(false)
      }
    }, 100)
  }

  const rankColor: Record<string, string> = { S: '#FFD700', A: '#C0C0C0', B: '#CD7F32', C: '#8B5CF6', D: '#6B7280' }

  return (
    <div className="game-page">
      <nav className="navbar">
        <Link to="/games" className="back-btn">←</Link>
        <span className="title">五行抽卡</span>
        <div style={{ width: 40 }} />
      </nav>

      <div className="cards-row">
        {cards.length === 0 ? <p className="placeholder">点击下方按钮开始抽卡</p> : cards.map((card, i) => (
          <div key={i} className={`card ${isDrawing ? 'shaking' : ''}`} style={{ backgroundColor: card.color, animationDelay: `${i * 0.1}s` }}>
            <span>{card.emoji}</span>
            <b>{card.name}</b>
          </div>
        ))}
      </div>

      {result && (
        <div className="result-card" style={{ borderColor: rankColor[result.rank] }}>
          <span className="rank" style={{ color: rankColor[result.rank] }}>{result.rank}</span>
          <b>{result.title}</b>
          <span>{result.desc}</span>
        </div>
      )}

      <button className="draw-btn" onClick={handleDraw} disabled={isDrawing}>{isDrawing ? '抽卡中...' : '开始抽卡'}</button>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item"><span className="nav-icon">🏠</span><span className="nav-label">首页</span></Link>
        <Link to="/games" className="nav-item active"><span className="nav-icon">🎮</span><span className="nav-label">游戏</span></Link>
        <Link to="/profile" className="nav-item"><span className="nav-icon">👤</span><span className="nav-label">我的</span></Link>
      </nav>
    </div>
  )
}

export default DrawGame
