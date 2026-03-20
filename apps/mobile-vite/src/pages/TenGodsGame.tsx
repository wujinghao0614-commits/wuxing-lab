import { useState } from 'react'
import { Link } from 'react-router-dom'
import './TenGodsGame.css'

const TEN_GODS = [
  { name: '比肩', icon: '⚔️', color: '#6366F1', power: '攻击力+10' },
  { name: '劫财', icon: '💰', color: '#F59E0B', power: '暴击率+15%' },
  { name: '食神', icon: '🍚', color: '#10B981', power: '技能伤害+20%' },
  { name: '伤官', icon: '🔥', color: '#EF4444', power: '暴击伤害+25%' },
  { name: '偏财', icon: '💎', color: '#8B5CF6', power: '金币+30%' },
  { name: '正财', icon: '📈', color: '#3B82F6', power: '生命+100' },
  { name: '七杀', icon: '⚡', color: '#DC2626', power: '穿透+15%' },
  { name: '正官', icon: '📜', color: '#0D9488', power: '经验+20%' },
  { name: '偏印', icon: '🌙', color: '#7C3AED', power: '冷却-10%' },
  { name: '正印', icon: '☀️', color: '#F97316', power: '全属+5%' }
]

type GodType = typeof TEN_GODS[0]

function TenGodsGame() {
  const [cards, setCards] = useState<GodType[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [fortune, setFortune] = useState<{ rank: string; title: string } | null>(null)

  const handleDraw = () => {
    setIsDrawing(true)
    setFortune(null)
    let count = 0
    const interval = setInterval(() => {
      setCards(Array.from({ length: 3 }, () => TEN_GODS[Math.floor(Math.random() * 10)]))
      count++
      if (count > 6) {
        clearInterval(interval)
        const final = Array.from({ length: 3 }, () => TEN_GODS[Math.floor(Math.random() * 10)])
        setCards(final)
        const unique = new Set(final.map(c => c.name)).size
        if (unique === 1) setFortune({ rank: 'S', title: '天选之人' })
        else if (unique <= 3) setFortune({ rank: 'A', title: '人中龙凤' })
        else if (unique <= 5) setFortune({ rank: 'B', title: '运势不错' })
        else setFortune({ rank: 'C', title: '一般般' })
        setIsDrawing(false)
      }
    }, 150)
  }

  const rankColor: Record<string, string> = { S: '#FFD700', A: '#C0C0C0', B: '#CD7F32', C: '#8B5CF6' }

  return (
    <div className="game-page">
      <nav className="navbar">
        <Link to="/games" className="back-btn">←</Link>
        <span className="title">十神挑战</span>
        <div style={{ width: 40 }} />
      </nav>

      <div className="cards-row">
        {cards.length === 0 ? <p className="placeholder">点击抽取十神</p> : cards.map((c, i) => (
          <div key={i} className={`card ${isDrawing ? 'shaking' : ''}`} style={{ backgroundColor: c.color }}>
            <span className="card-icon">{c.icon}</span>
            <span className="card-name">{c.name}</span>
          </div>
        ))}
      </div>

      {cards.length > 0 && (
        <div className="cards-detail">
          {cards.map((c, i) => <div key={i}><b style={{ color: c.color }}>{c.name}</b> - {c.power}</div>)}
        </div>
      )}

      {fortune && (
        <div className="fortune-result" style={{ borderColor: rankColor[fortune.rank] }}>
          <span style={{ color: rankColor[fortune.rank], fontSize: 32 }}>{fortune.rank}</span>
          <span>{fortune.title}</span>
        </div>
      )}

      <button className="draw-btn" onClick={handleDraw} disabled={isDrawing}>{isDrawing ? '抽取中...' : '抽取十神'}</button>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item"><span className="nav-icon">🏠</span><span className="nav-label">首页</span></Link>
        <Link to="/games" className="nav-item active"><span className="nav-icon">🎮</span><span className="nav-label">游戏</span></Link>
        <Link to="/profile" className="nav-item"><span className="nav-icon">👤</span><span className="nav-label">我的</span></Link>
      </nav>
    </div>
  )
}

export default TenGodsGame
