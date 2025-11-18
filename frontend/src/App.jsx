import React from 'react'
import SnackScanner from './SnackScanner.jsx'
import SpookyAudio from './SpookyAudio.jsx'

export default function App(){
  return (
    <div className="container">
      <header className="hero-header">
        <div className="title-wrapper">
          <span className="pumpkin-icon">🎃</span>
          <h1 className="main-title">SnackMood</h1>
          <span className="pumpkin-icon">🎃</span>
        </div>
        <p className="tagline">Scan your snack... if you dare!</p>
        <div className="spooky-divider">
          <span>👻</span>
          <span>🦇</span>
          <span>💀</span>
          <span>🦇</span>
          <span>👻</span>
        </div>
      </header>
      <SnackScanner />
      <SpookyAudio />
    </div>
  )
}
