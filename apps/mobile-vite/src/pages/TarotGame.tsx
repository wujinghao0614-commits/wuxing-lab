import { useState } from 'react'
import { Link } from 'react-router-dom'
import './TarotGame.css'

const TAROT_CARDS = [
  { name: '比肩', icon: '⚔️', color: '#6366F1', keywords: ['竞争', '合作', '自我'], advice: '今日宜主动出击，竞争中求合作。', luckyColor: '白色', luckyNumber: '7' },
  { name: '劫财', icon: '💰', color: '#F59E0B', keywords: ['破财', '冒险', '行动'], advice: '今天可能会有意外支出，但都是值得的。', luckyColor: '金色', luckyNumber: '3' },
  { name: '食神', icon: '🍚', color: '#10B981', keywords: ['才华', '创作', '享受'], advice: '今日灵感爆发！适合创作、美食。', luckyColor: '绿色', luckyNumber: '5' },
  { name: '伤官', icon: '🔥', color: '#EF4444', keywords: ['发挥', '叛逆', '表达'], advice: '今天你的表达欲很强，适合演讲、写作。', luckyColor: '红色', luckyNumber: '9' },
  { name: '偏财', icon: '💎', color: '#8B5CF6', keywords: ['横财', '投机', '机会'], advice: '意外之财有望！但风险与机遇并存。', luckyColor: '紫色', luckyNumber: '8' },
  { name: '正财', icon: '📈', color: '#3B82F6', keywords: ['稳定', '收入', '积累'], advice: '稳扎稳打的一天。正财运势旺盛。', luckyColor: '蓝色', luckyNumber: '6' },
  { name: '七杀', icon: '⚡', color: '#DC2626', keywords: ['挑战', '压力', '成长'], advice: '今天会面对挑战和压力，但这是成长的机会。', luckyColor: '黑色', luckyNumber: '1' },
  { name: '正官', icon: '📜', color: '#0D9488', keywords: ['事业', '规则', '名誉'], advice: '事业运不错！适合处理官方事务。', luckyColor: '青色', luckyNumber: '4' },
  { name: '偏印', icon: '🌙', color: '#7C3AED', keywords: ['学习', '领悟', '独处'], advice: '适合独自思考、学习新知识。', luckyColor: '银色', luckyNumber: '2' },
  { name: '正印', icon: '☀️', color: '#F97316', keywords: ['学业', '长辈', '保护'], advice: '得到长辈或上级的帮助，有好事发生。', luckyColor: '橙色', luckyNumber: '10' }
]

function TarotGame() {
  const [drawnCard, setDrawnCard] = useState<typeof TAROT_CARDS[0] | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleDraw = () => {
    if (isDrawing) return
    setIsDrawing(true)
    setShowResult(false)
    let count = 0
    const interval = setInterval(() => {
      setDrawnCard(TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)])
      count++
      if (count > 10) {
        clearInterval(interval)
        setDrawnCard(TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)])
        setIsDrawing(false)
        setTimeout(() => setShowResult(true), 500)
      }
    }, 100)
  }

  return (
    <div className="game-page">
      <nav className="navbar">
        <Link to="/games" className="back-btn">←</Link>
        <span className="title">十神塔罗</span>
        <div style={{ width: 40 }} />
      </nav>

      <div className="draw-area">
        <div className={`card-back ${isDrawing ? 'shuffling' : ''}`} onClick={handleDraw}>
          <span>?</span>
        </div>
        <p>{isDrawing ? '洗牌中...' : '点击抽牌'}</p>
      </div>

      {drawnCard && (
        <div className={`drawn-card ${showResult ? 'revealed' : ''}`}>
          <div className="card-front" style={{ backgroundColor: drawnCard.color }}>
            <span className="card-icon">{drawnCard.icon}</span>
            <span className="card-name">{drawnCard.name}</span>
          </div>
        </div>
      )}

      {showResult && drawnCard && (
        <div className="result-card">
          <h3 style={{ color: drawnCard.color }}>{drawnCard.name}</h3>
          <div className="keywords">
            {drawnCard.keywords.map((kw, i) => <span key={i}>{kw}</span>)}
          </div>
          <p className="advice">{drawnCard.advice}</p>
          <div className="lucky-info">
            <span>幸运色: {drawnCard.luckyColor}</span>
            <span>幸运数字: {drawnCard.luckyNumber}</span>
          </div>
        </div>
      )}

      <nav className="bottom-nav">
        <Link to="/" className="nav-item"><span className="nav-icon">🏠</span><span className="nav-label">首页</span></Link>
        <Link to="/games" className="nav-item active"><span className="nav-icon">🎮</span><span className="nav-label">游戏</span></Link>
        <Link to="/profile" className="nav-item"><span className="nav-icon">👤</span><span className="nav-label">我的</span></Link>
      </nav>
    </div>
  )
}

export default TarotGame
