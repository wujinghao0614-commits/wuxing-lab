import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

interface NavItem {
  key: string
  icon: string
  label: string
}

const navItems: NavItem[] = [
  { key: 'home', icon: '🏠', label: '首页' },
  { key: 'record', icon: '📝', label: '记录' },
  { key: 'calendar', icon: '📅', label: '日历' },
  { key: 'mine', icon: '👤', label: '我的' }
]

export default function BottomNav() {
  const [activeKey, setActiveKey] = useState('home')

  return (
    <View className="bottom-nav">
      {navItems.map((item) => (
        <View
          key={item.key}
          className={`nav-item ${activeKey === item.key ? 'active' : ''}`}
          onClick={() => setActiveKey(item.key)}
        >
          <Text className="nav-icon">{item.icon}</Text>
          <Text className="nav-label">{item.label}</Text>
        </View>
      ))}
    </View>
  )
}
