import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import './app.scss'
import BottomNav from './components/BottomNav'

class App extends Component<PropsWithChildren<any>> {
  render() {
    return (
      <View className="app-container">
        {this.props.children}
        <BottomNav />
      </View>
    )
  }
}

export default App
