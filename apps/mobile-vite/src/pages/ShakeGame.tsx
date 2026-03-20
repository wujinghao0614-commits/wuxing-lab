import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './ShakeGame.css'

const FORTUNES = [
  { name: '大吉', icon: '🎊', color: '#FFD700', desc: '今日诸事大吉，好运连连！', luck: 100 },
  { name: '吉', icon: '😊', color: '#10B981', desc: '今日运势不错，适合做事。', luck: 80 },
  { name: '中平', icon: '😐', color: '#3B82F6', desc: '今日运势平稳，顺其自然。', luck: 60 },
  { name: '凶', icon: '😟', color: '#F59E0B', desc: '今日需谨慎，低调行事。', luck: 40 },
  { name: '大凶', icon: '💀', color: '#EF4444', desc: '今日不宜冒险，静养为主。', luck: 20 }
]

function getRandomFortune() {
  const rand = Math.random()
  if (rand < 0.05) return FORTUNES[0]
  if (rand < 0.20) return FORTUNES[1]
  if (rand < 0.50) return FORTUNES[2]
  if (rand < 0.80) return FORTUNES[3]
  return FORTUNES[4]
}

function ShakeGame() {
  const [shaking, setShaking] = useState(false)
  const [result, setResult] = useState<typeof FORTUNES[0] | null>(null)
  const [shakeCount, setShakeCount] = useState(0)
  const lastShakeTime = useRef(0)

  useEffect(() => {
    const handleShake = (e: DeviceMotionEvent) => {
      if (!e.accelerationIncludingGravity) return
      const now = Date.now()
      if (now - lastShakeTime.current < 500) return
      const { x, y, z } = e.accelerationIncludingGravity
      const total = Math.abs(x || 0) + Math.abs(y || 0) + Math.abs(z || 0)
      if (total > 15) {
        lastShakeTime.current = now
        handleShakeAction()
      }
    }
    window.addEventListener('devicemotion', handleShake)
    return () => window.removeEventListener('devicemotion', handleShake)
  }, [])

  const handleShakeAction = () => {
    if (shaking) return
    setShaking(true)
    setResult(null)
    let count = 0
    const interval = setInterval(() => {
      setResult(getRandomFortune())
      count++
      if (count > 8) {
        clearInterval(interval)
        const finalResult = getRandomFortune()
        setResult(finalResult)
        setShaking(false)
        setShakeCount(c => c + 1)
      }
    }, 100)
  }

  return (
    <div className="game-page">
      <nav className="navbar">
        <Link to="/games" className="back-btn">←</Link>
        <span className="title">摇一摇测运</span>
        <div style={{ width: 40 }} />
      </nav>

      <div className="shake-area" onClick={handleShakeAction}>
        <div className={`phone ${shaking ? 'shaking' : ''}`}>
          {shaking ? '📱💨' : '📱'}
        </div>
        <p>{shaking ? '摇转运来...' : '点击或摇一摇'}</p>
      </div>

      {result && (
        <div className="result-card" style={{ borderColor: result.color }}>
          <span className="result-icon">{result.icon}</span>
          <span className="result-name" style={{ color: result.color }}>{result.name}</span>
          <p className="result-desc">{result.desc}</p>
          <div className="luck-bar">
            <span>幸运指数</span>
            <div className="luck-track">
              <div className="luck-fill" style={{ width: `${result.luck}%`, backgroundColor: result.color }} />
            </div>
            <span>{result.luck}</span>
          </div>
        </div>
      )}

      <div className="stats">摇了 {shakeCount} 次</div>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item"><span className="nav-icon">🏠</span><span className="nav-label">首页</span></Link>
        <Link to="/games" className="nav-item active"><span className="nav-icon">🎮</span><span className="nav-label">游戏</span></Link>
        <Link to="/profile" className="nav-item"><span className="nav-icon">👤</span><span className="nav-label">我的</span></Link>
      </nav>
    </div>
  )
}

export default ShakeGame
