import { Link } from 'react-router-dom'
import './ProfilePage.css'

function ProfilePage() {
  return (
    <div className="profile-page">
      <nav className="navbar">
        <span className="title">我的</span>
      </nav>

      <div className="profile-header">
        <div className="avatar">🔮</div>
        <h2>未登录用户</h2>
        <p>登录后查看更多功能</p>
      </div>

      <div className="stats-row">
        <div className="stat-item"><span className="stat-num">0</span><span className="stat-label">连续签到</span></div>
        <div className="stat-item"><span className="stat-num">0</span><span className="stat-label">抽卡次数</span></div>
        <div className="stat-item"><span className="stat-num">0</span><span className="stat-label">游戏记录</span></div>
      </div>

      <div className="menu-list">
        <div className="menu-item">📜 签到记录</div>
        <div className="menu-item">📊 运势历史</div>
        <div className="menu-item">⚙️ 设置</div>
        <div className="menu-item">❓ 帮助中心</div>
      </div>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <span className="nav-icon">🏠</span>
          <span className="nav-label">首页</span>
        </Link>
        <Link to="/games" className="nav-item">
          <span className="nav-icon">🎮</span>
          <span className="nav-label">游戏</span>
        </Link>
        <Link to="/profile" className="nav-item active">
          <span className="nav-icon">👤</span>
          <span className="nav-label">我的</span>
        </Link>
      </nav>
    </div>
  )
}

export default ProfilePage
