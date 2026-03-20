import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GameCenter from './pages/GameCenter'
import ShakeGame from './pages/ShakeGame'
import TarotGame from './pages/TarotGame'
import TenGodsGame from './pages/TenGodsGame'
import WheelGame from './pages/WheelGame'
import MatchGame from './pages/MatchGame'
import DrawGame from './pages/DrawGame'
import ProfilePage from './pages/ProfilePage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GameCenter />} />
        <Route path="/game/shake" element={<ShakeGame />} />
        <Route path="/game/tarot" element={<TarotGame />} />
        <Route path="/game/ten-gods" element={<TenGodsGame />} />
        <Route path="/game/wheel" element={<WheelGame />} />
        <Route path="/game/match" element={<MatchGame />} />
        <Route path="/game/draw" element={<DrawGame />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
