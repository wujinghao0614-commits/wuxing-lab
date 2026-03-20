import { Link } from 'react-router-dom'
import './GameCenter.css'

const GAMES = [
  { 
    id: 'shake', 
    name: '摇一摇测运', 
    icon: '📱', 
    color: '#8B5CF6',
    desc: '摇动手机获取今日运势',
    path: '/game/shake'
  },
  { 
    id: 'tarot', 
    name: '十神塔罗', 
    icon: '🃏', 
    color: '#7C3AED',
    desc: '抽取十神牌解读命运',
    path: '/game/tarot'
  },
  { 
    id: 'ten-gods', 
    name: '十神挑战', 
    icon: '⚔️', 
    color: '#6366F1',
    desc: '抽取3张十神卡牌',
    path: '/game/ten-gods'
  },
  { 
    id: 'wheel', 
    name: '五行转盘', 
    icon: '🎡', 
    color: '#F59E0B',
    desc: '转出你的五行好运',
    path: '/game/wheel'
  },
  { 
    id: 'match', 
    name: '五行配对', 
    icon: '🃏', 
    color: '#10B981',
    desc: '翻牌配对记忆游戏',
    path: '/game/match'
  },
  { 
    id: 'draw', 
    name: '五行抽卡', 
    icon: '🎴', 
    color: '#EF4444',
    desc: '抽取五行卡牌算运',
    path: '/game/draw'
  }
]

function GameCenter() {
  return (
    <div className="game-center">
      {/* 顶部导航 */}
      <nav className="navbar">
        <Link to="/" className="back-btn">←</Link>
        <span className="logo-text">游戏中心</span>
        <div style={{ width: 40 }} />
      </nav>

      {/* 标题 */}
      <header className="header">
        <h1 className="title">🎮 吉运游戏厅</h1>
        <p className="subtitle">选择你喜欢的小游戏</p>
      </header>

      {/* 游戏列表 */}
      <div className="games-grid">
        {GAMES.map((game) => (
          <Link 
            key={game.id} 
            to={game.path}
            className="game-card"
            style={{ borderColor: game.color }}
          >
            <div 
              className="game-icon" 
              style={{ backgroundColor: game.color }}
            >
              {game.icon}
            </div>
            <div className="game-info">
              <h3 className="game-name">{game.name}</h3>
              <p className="game-desc">{game.desc}</p>
            </div>
            <span className="play-icon">▶</span>
          </Link>
        ))}
      </div>

      {/* 底部导航 */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <span className="nav-icon">🏠</span>
          <span className="nav-label">首页</span>
        </Link>
        <Link to="/games" className="nav-item active">
          <span className="nav-icon">🎮</span>
          <span className="nav-label">游戏</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <span className="nav-icon">👤</span>
          <span className="nav-label">我的</span>
        </Link>
      </nav>
    </div>
  )
}

export default GameCenter
