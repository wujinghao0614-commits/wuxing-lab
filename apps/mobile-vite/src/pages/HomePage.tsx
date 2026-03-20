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
        <h1 className="title">掌握命运的每一步</h1>
        <p className="subtitle">基于传统八字理论，结合五行能量变化，为您提供精准的运势分析与生活决策建议。</p>
        <div className="input-group">
          <input type="text" placeholder="出生日期（如：1990-01-01）" className="input" />
          <input type="text" placeholder="出生时辰（如：上午9点）" className="input" />
        </div>
        <select className="input select">
          <option>性别</option>
          <option>男</option>
          <option>女</option>
        </select>
        <button className="hero-btn">立即生成我的八字报告</button>
        <p className="hint">首次使用免费，无需注册</p>
      </section>

      <section className="features">
        <Link to="/analysis" className="feature-card">
          <h3>八字原局分析</h3>
          <p>输入生日时辰，自动生成您的五行能量分布、日主强弱、十神关系图谱</p>
        </Link>
        <Link to="/fortune" className="feature-card">
          <h3>大运流年预测</h3>
          <p>结合当前大运与流年，分析事业、财运、姻缘趋势，助您顺势而为</p>
        </Link>
        <Link to="/daily" className="feature-card">
          <h3>每日运势指南</h3>
          <p>获取今日穿衣颜色、宜忌事项、投资时机等生活化建议</p>
        </Link>
      </section>

      <section className="game-entrance">
        <h2 className="section-title">🎮 吉运游戏厅</h2>
        <p className="section-desc">选择你喜欢的小游戏</p>
        <Link to="/games" className="entrance-card">
          <span className="entrance-icon">🎲</span>
          <div className="entrance-info">
            <h3>选择困难？随机择吉</h3>
            <p>摇一摇、抽一张，让命运帮你做决定</p>
          </div>
          <span className="arrow">→</span>
        </Link>
      </section>

      <footer className="footer">
        <p>© 2026 吉运助手. 保留所有权利.</p>
      </footer>

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
