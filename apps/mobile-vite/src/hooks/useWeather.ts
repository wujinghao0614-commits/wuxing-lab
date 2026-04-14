import { useState, useEffect } from 'react'

interface Location {
  latitude: number
  longitude: number
  city?: string
}

interface WeatherData {
  temp: number
  condition: string
  humidity: number
  windSpeed: number
  feelsLike: number
  chanceOfRain: number
}

export function useWeather() {
  const [location, setLocation] = useState<Location | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('浏览器不支持定位')
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
        
        // 调用天气 API
        try {
          const response = await fetch(
            `https://wttr.in/${latitude},${longitude}?format=j1`
          )
          const data = await response.json()
          const current = data.current_condition[0]
          
          setWeather({
            temp: parseInt(current.temp_C),
            condition: current.weatherDesc?.[0]?.value || '未知',
            humidity: parseInt(current.humidity),
            windSpeed: parseInt(current.windspeedKmph),
            feelsLike: parseInt(current.FeelsLikeC),
            chanceOfRain: 0 // wttr.in JSON 格式需要额外解析
          })
        } catch (e) {
          setError('获取天气失败')
        }
        setLoading(false)
      },
      (err) => {
        setError('定位被拒绝')
        setLoading(false)
      }
    )
  }

  return { location, weather, loading, error, getLocation }
}
