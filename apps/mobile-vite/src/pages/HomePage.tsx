import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      <nav className="navbar">
        <span className="logo-icon">🔮</span>
        <span className="logo-text">吉运助手</span>
        <button className="nav-btn">免费体验</button>
      </nav>

      <section className="hero">
        <h1 className="title">探索你的五行能量</h1>
        <p className="subtitle">输入出生信息，了解今日运势</p>
        <div className="input-group">
          <input type="text" placeholder="出生年月" className="input" />
          <input type="text" placeholder="出生时辰" className="input" />
        </div>
        <button className="hero-btn">立即测算</button>
      </section>

      <section className="quick-actions">
        <Link to="/game/shake" className="action-btn">
          <span className="icon">📱</span>
          <span className="text">摇一摇</span>
        </Link>
        <Link to="/game/tarot" className="action-btn">
          <span className="icon">🃏</span>
          <span className="text">塔罗</span>
        </Link>
        <Link to="/game/ten-gods" className="action-btn">
          <span className="icon">⚔️</span>
          <span className="text">十神</span>
        </Link>
      </section>

      <section className="game-entrance">
        <Link to="/games" className="entrance-card">
          <span className="entrance-icon">🎲</span>
          <div className="entrance-info">
            <h3>选择困难？随机择吉</h3>
            <p>摇一摇、抽一张，让命运帮你做决定</p>
          </div>
          <span className="arrow">→</span>
        </Link>
      </section>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item active">
          <span className="nav-icon">🏠</span>
          <span className="nav-label">首页</span>
        </Link>
        <Link to="/games" className="nav-item">
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

export default HomePage
