import { useWeather } from '../hooks/useWeather'
import './WeatherBadge.css'

export function WeatherBadge() {
  const { weather, loading, error, getLocation, location } = useWeather()

  if (!location) {
    return (
      <button className="weather-badge" onClick={getLocation}>
        <span className="weather-icon">📍</span>
        <span className="weather-text">获取天气</span>
      </button>
    )
  }

  if (loading) {
    return (
      <div className="weather-badge loading">
        <span className="weather-icon">⏳</span>
        <span className="weather-text">加载中...</span>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <button className="weather-badge error" onClick={getLocation}>
        <span className="weather-icon">❌</span>
        <span className="weather-text">{error || '获取失败'}</span>
      </button>
    )
  }

  // 根据天气返回穿衣建议
  const getClothingAdvice = () => {
    const temp = weather.temp
    if (temp >= 25) return { color: '🟢 绿色', wuxing: '木', desc: '宜穿绿色系，释放能量' }
    if (temp >= 20) return { color: '🔴 红色', wuxing: '火', desc: '宜穿红色系，热情活力' }
    if (temp >= 15) return { color: '🟡 黄色', wuxing: '土', desc: '宜穿黄色系，稳重踏实' }
    if (temp >= 10) return { color: '⚪ 白色', wuxing: '金', desc: '宜穿白色系，冷静专业' }
    return { color: '🔵 蓝色', wuxing: '水', desc: '宜穿蓝色系，宁静深沉' }
  }

  const advice = getClothingAdvice()

  return (
    <div className="weather-badge">
      <span className="weather-icon">
        {weather.chanceOfRain > 50 ? '🌧️' : weather.temp > 20 ? '☀️' : '⛅'}
      </span>
      <div className="weather-info">
        <span className="weather-temp">{weather.temp}°C</span>
        <span className="weather-desc">{weather.condition}</span>
      </div>
      <div className="weather-advice">
        <span className="advice-color">{advice.color}</span>
        <span className="advice-desc">{advice.desc}</span>
      </div>
    </div>
  )
}
