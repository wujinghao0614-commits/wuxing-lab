import { View, Text, Image } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

// 五行颜色常量
const WUXING_COLORS = {
  金: '#FFD700',
  木: '#00A86B',
  水: '#1E90FF',
  火: '#FF4500',
  土: '#DAA520'
}

// 模拟用户数据
const mockUserData = {
  avatar: 'https://via.placeholder.com/80',
  name: '张三',
  wuxing: ['金', '木', '水', '火', '土'],
  energyScore: 85,
  energyLabel: '充盈'
}

// 功能卡片数据
const featureCards = [
  { id: 'wuxing', title: '五行平衡', icon: '⚖️', color: '#00A86B' },
  { id: 'fortune', title: '今日运势', icon: '🔮', color: '#9B59B6' },
  { id: 'bugu', title: '辟谷指南', icon: '🍃', color: '#27AE60' }
]

export default function Home() {
  const [userData] = useState(mockUserData)

  return (
    <View className="home-page">
      {/* 用户信息区域 */}
      <View className="user-header">
        <Image className="avatar" src={userData.avatar} mode="aspectFill" />
        <View className="user-info">
          <Text className="name">{userData.name}</Text>
          <View className="wuxing-tags">
            {userData.wuxing.map((item) => (
              <Text
                key={item}
                className="wuxing-tag"
                style={{ backgroundColor: WUXING_COLORS[item] }}
              >
                {item}
              </Text>
            ))}
          </View>
        </View>
      </View>

      {/* 能量仪表盘 */}
      <View className="energy-gauge">
        <View className="gauge-circle">
          <View className="gauge-inner">
            <Text className="score">{userData.energyScore}</Text>
            <Text className="label">{userData.energyLabel}</Text>
          </View>
        </View>
        <Text className="gauge-title">今日能量</Text>
      </View>

      {/* 快捷入口 */}
      <View className="quick-actions">
        <View className="action-btn">
          <Text className="icon">📝</Text>
          <Text className="text">记录</Text>
        </View>
        <View className="action-btn">
          <Text className="icon">📅</Text>
          <Text className="text">日历</Text>
        </View>
        <View className="action-btn">
          <Text className="icon">📊</Text>
          <Text className="text">分析</Text>
        </View>
      </View>

      {/* 功能卡片 */}
      <View className="feature-cards">
        {featureCards.map((card) => (
          <View key={card.id} className="feature-card" style={{ borderColor: card.color }}>
            <Text className="card-icon">{card.icon}</Text>
            <Text className="card-title">{card.title}</Text>
          </View>
        ))}
      </View>

      {/* 底部占位 */}
      <View className="bottom-spacer" />
    </View>
  )
}
