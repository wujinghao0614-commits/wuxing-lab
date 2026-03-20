import { useState } from 'react'
import './App.css'

// 十神塔罗牌（更详细的解读）
const TAROT_CARDS = [
  { 
    name: '比肩', icon: '⚔️', color: '#6366F1', 
    keywords: ['竞争', '合作', '自我'],
    advice: '今日宜主动出击，竞争中求合作。遇到挑战不要退缩，你比想象中更强！',
    luckyColor: '白色', luckyNumber: '7'
  },
  { 
    name: '劫财', icon: '💰', color: '#F59E0B', 
    keywords: ['破财', '冒险', '行动'],
    advice: '今天可能会有意外支出，但都是值得的。冒险精神会带来好运，但切勿冲动！',
    luckyColor: '金色', luckyNumber: '3'
  },
  { 
    name: '食神', icon: '🍚', color: '#10B981', 
    keywords: ['才华', '创作', '享受'],
    advice: '今日灵感爆发！适合创作、美食、艺术创作。放松心情，享受当下。',
    luckyColor: '绿色', luckyNumber: '5'
  },
  { 
    name: '伤官', icon: '🔥', color: '#EF4444', 
    keywords: ['发挥', '叛逆', '表达'],
    advice: '今天你的表达欲很强，适合演讲、写作。但注意说话方式，避免得罪人。',
    luckyColor: '红色', luckyNumber: '9'
  },
  { 
    name: '偏财', icon: '💎', color: '#8B5CF6', 
    keywords: ['横财', '投机', '机会'],
    advice: '意外之财有望！但风险与机遇并存。适合把握机会，但别贪心。',
    luckyColor: '紫色', luckyNumber: '8'
  },
  { 
    name: '正财', icon: '📈', color: '#3B82F6', 
    keywords: ['稳定', '收入', '积累'],
    advice: '稳扎稳打的一天。正财运势旺盛，适合工作、理财。努力会有回报！',
    luckyColor: '蓝色', luckyNumber: '6'
  },
  { 
    name: '七杀', icon: '⚡', color: '#DC2626', 
    keywords: ['挑战', '压力', '成长'],
    advice: '今天会面对一些挑战和压力，但这是成长的机会。勇敢面对，你会更强！',
    luckyColor: '黑色', luckyNumber: '1'
  },
  { 
    name: '正官', icon: '📜', color: '#0D9488', 
    keywords: ['事业', '规则', '名誉'],
    advice: '事业运不错！适合处理官方事务、面试、签合同。保持正直，好运相随。',
    luckyColor: '青色', luckyNumber: '4'
  },
  { 
    name: '偏印', icon: '🌙', color: '#7C3AED', 
    keywords: ['学习', '领悟', '独处'],
    advice: '适合独自思考、学习新知识。今天适合冥想、阅读、总结经验。',
    luckyColor: '银色', luckyNumber: '2'
  },
  { 
    name: '正印', icon: '☀️', color: '#F97316', 
    keywords: ['学业', '长辈', '保护'],
    advice: '得到长辈或上级的帮助。有好事发生，心情愉快。适合学习新技能。',
    luckyColor: '橙色', luckyNumber: '10'
  }
]

function App() {
  const [drawnCard, setDrawnCard] = useState<typeof TAROT_CARDS[0] | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleDraw = () => {
    if (isDrawing) return
    
    setIsDrawing(true)
    setShowResult(false)
    setDrawnCard(null)
    
    // 洗牌动画效果
    let count = 0
    const interval = setInterval(() => {
      setDrawnCard(TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)])
      count++
      if (count > 10) {
        clearInterval(interval)
        const finalCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)]
        setDrawnCard(finalCard)
        setIsDrawing(false)
        setTimeout(() => setShowResult(true), 500)
      }
    }, 100)
  }

  return (
    <div className="app">
      {/* 顶部导航栏 */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🔮</span>
          <span className="logo-text">吉运助手</span>
        </div>
        <button className="nav-btn">免费体验</button>
      </nav>

      {/* 抽卡区域 */}
      <section className="draw-section">
        <h1 className="title">十神塔罗</h1>
        <p className="subtitle">抽取一张十神牌，解读今日命运</p>

        {/* 牌堆展示 */}
        <div className="deck-area" onClick={handleDraw}>
          <div className={`card-back ${isDrawing ? 'shuffling' : ''}`}>
            <span className="card-pattern">?</span>
          </div>
          <p className="draw-hint">{isDrawing ? '洗牌中...' : '点击抽牌'}</p>
        </div>

        {/* 抽出的牌 */}
        {drawnCard && (
          <div className={`drawn-card ${showResult ? 'revealed' : ''}`}>
            <div className="card-front" style={{ backgroundColor: drawnCard.color }}>
              <span className="card-icon">{drawnCard.icon}</span>
              <span className="card-name">{drawnCard.name}</span>
            </div>
          </div>
        )}

        {/* 详细解读 */}
        {showResult && drawnCard && (
          <div className="result-card">
            <h2 className="card-title" style={{ color: drawnCard.color }}>{drawnCard.name}</h2>
            
            <div className="keywords">
              {drawnCard.keywords.map((kw, i) => (
                <span key={i} className="keyword">{kw}</span>
              ))}
            </div>

            <p className="advice">{drawnCard.advice}</p>

            <div className="lucky-info">
              <div className="lucky-item">
                <span className="lucky-label">幸运色</span>
                <span className="lucky-value">{drawnCard.luckyColor}</span>
              </div>
              <div className="lucky-item">
                <span className="lucky-label">幸运数字</span>
                <span className="lucky-value">{drawnCard.luckyNumber}</span>
              </div>
            </div>

            <button className="draw-again-btn" onClick={handleDraw}>
              再抽一张
            </button>
          </div>
        )}
      </section>

      {/* 牌阵说明 */}
      <section className="info-section">
        <h2 className="section-title">十神塔罗说明</h2>
        <div className="info-cards">
          <div className="info-card">
            <span className="info-icon">🎯</span>
            <span className="info-text">每个十神代表不同的能量属性</span>
          </div>
          <div className="info-card">
            <span className="info-icon">💡</span>
            <span className="info-text">结合当日指引做决策</span>
          </div>
          <div className="info-card">
            <span className="info-icon">🔮</span>
            <span className="info-text">每天限抽3次</span>
          </div>
        </div>
      </section>

      {/* 底部导航 */}
      <nav className="bottom-nav">
        <div className="nav-item">
          <span className="nav-icon">🏠</span>
          <span className="nav-label">首页</span>
        </div>
        <div className="nav-item active">
          <span className="nav-icon">🃏</span>
          <span className="nav-label">塔罗</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">⚔️</span>
          <span className="nav-label">十神</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">👤</span>
          <span className="nav-label">我的</span>
        </div>
      </nav>
    </div>
  )
}

export default App
