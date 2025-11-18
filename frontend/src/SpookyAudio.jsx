import React, { useState, useEffect, useRef } from 'react'

export default function SpookyAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef(null)
  const oscillatorsRef = useRef([])

  const startAmbientMusic = () => {
    if (audioContextRef.current) return // Already playing
    
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    audioContextRef.current = ctx
    
    // Create ambient spooky background music
    const frequencies = [110, 146.83, 164.81, 220] // A2, D3, E3, A3
    
    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      
      oscillator.type = 'sine'
      oscillator.frequency.value = freq
      
      filter.type = 'lowpass'
      filter.frequency.value = 800
      
      gainNode.gain.value = 0.03 // Very quiet ambient
      
      oscillator.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      // Add slight variation
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.value = 0.1 + i * 0.05
      lfoGain.gain.value = 2
      lfo.connect(lfoGain)
      lfoGain.connect(oscillator.frequency)
      
      oscillator.start()
      lfo.start()
      
      oscillatorsRef.current.push({ oscillator, lfo })
    })
    
    setIsPlaying(true)
  }

  const stopAmbientMusic = () => {
    if (audioContextRef.current) {
      oscillatorsRef.current.forEach(({ oscillator, lfo }) => {
        oscillator.stop()
        lfo.stop()
      })
      audioContextRef.current.close()
      audioContextRef.current = null
      oscillatorsRef.current = []
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    return () => {
      stopAmbientMusic()
    }
  }, [])

  return (
    <button 
      onClick={isPlaying ? stopAmbientMusic : startAmbientMusic}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: isPlaying ? '#39ff14' : '#ff6b35',
        border: 'none',
        borderRadius: '50%',
        width: 50,
        height: 50,
        fontSize: 24,
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        zIndex: 1000
      }}
      title={isPlaying ? 'Stop spooky music' : 'Play spooky music'}
    >
      {isPlaying ? '🔇' : '🎵'}
    </button>
  )
}
