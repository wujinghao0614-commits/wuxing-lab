import { useState } from 'react'
import { Link } from 'react-router-dom'
import './WheelGame.css'

const WUXING = [
  { name: '金', color: '#FFD700', icon: '⚔️', desc: '财运滚滚' },
  { name: '木', color: '#00A86B', icon: '🌿', desc: '事业有成' },
  { name: '水', color: '#1E90FF', icon: '💧', desc: '智慧提升' },
  { name: '火', color: '#FF4500', icon: '🔥', desc: '桃花旺盛' },
  { name: '土', color: '#DAA520', icon: '🪨', desc: '身体健康' }
]

function WheelGame() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<typeof WUXING[0] | null>(null)
  const [rotation, setRotation] = useState(0)

  const handleSpin = () => {
    if (isSpinning) return
    setIsSpinning(true)
    setResult(null)
    const winIndex = Math.floor(Math.random() * 5)
    const baseSpins = 5 * 360
    const segmentAngle = 360 / 5
    const targetAngle = baseSpins + (360 - winIndex * segmentAngle - segmentAngle / 2)
    const newRotation = rotation + targetAngle + Math.random() * 30
    setRotation(newRotation)
    setTimeout(() => { setResult(WUXING[winIndex]); setIsSpinning(false) }, 4000)
  }

  return (
    <div className="game-page">
      <nav className="navbar">
        <Link to="/games" className="back-btn">←</Link>
        <span className="title">五行转盘</span>
        <div style={{ width: 40 }} />
      </nav>

      <div className="wheel-container">
        <div className="pointer">▼</div>
        <div className={`wheel ${isSpinning ? 'spinning' : ''}`}
          style={{ transform: `rotate(${rotation}deg)`, transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none' }}>
          {WUXING.map((item, i) => (
            <div key={item.name} className="segment" style={{ transform: `rotate(${i * 72}deg) skewY(-54deg)`, backgroundColor: item.color }}>
              <span style={{ transform: 'skewY(54deg)' }}>{item.icon}</span>
            </div>
          ))}
        </div>
      </div>

      {result && (
        <div className="result-card" style={{ borderColor: result.color }}>
          <span>{result.icon}</span>
          <b style={{ color: result.color }}>{result.name}</b>
          <span>{result.desc}</span>
        </div>
      )}

      <button className="spin-btn" onClick={handleSpin} disabled={isSpinning}>{isSpinning ? '转运中...' : '开始转运'}</button>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item"><span className="nav-icon">🏠</span><span className="nav-label">首页</span></Link>
        <Link to="/games" className="nav-item active"><span className="nav-icon">🎮</span><span className="nav-label">游戏</span></Link>
        <Link to="/profile" className="nav-item"><span className="nav-icon">👤</span><span className="nav-label">我的</span></Link>
      </nav>
    </div>
  )
}

export default WheelGame
