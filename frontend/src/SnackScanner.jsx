import React, {useState, useEffect} from 'react'

export default function SnackScanner(){
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [ghosts, setGhosts] = useState([])

  // Play spooky sound effect
  const playSpookySound = (score) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    if (score < 30) {
      // Evil laugh for bad scores
      playEvilLaugh(audioContext)
    } else if (score < 50) {
      // Ghost sound for medium scores
      playGhostSound(audioContext)
    } else if (score < 75) {
      // Mysterious sound
      playMysteriousSound(audioContext)
    } else {
      // Success chime
      playSuccessSound(audioContext)
    }
  }

  const playEvilLaugh = (ctx) => {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.frequency.setValueAtTime(200, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5)
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.5)
  }

  const playGhostSound = (ctx) => {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(300, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3)
    oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.6)
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.6)
  }

  const playMysteriousSound = (ctx) => {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.type = 'triangle'
    oscillator.frequency.setValueAtTime(400, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.4)
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.4)
  }

  const playSuccessSound = (ctx) => {
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.frequency.value = freq
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.2)
      
      oscillator.start(ctx.currentTime + i * 0.1)
      oscillator.stop(ctx.currentTime + i * 0.1 + 0.2)
    })
  }

  useEffect(() => {
    if (result) {
      // Play spooky sound
      playSpookySound(result.score)
      
      // Create floating ghosts when result appears
      const newGhosts = Array.from({length: 5}, (_, i) => ({
        id: i,
        emoji: ['👻', '🎃', '🦇', '💀', '🕷️'][i],
        left: Math.random() * 80 + 10,
        top: Math.random() * 60 + 20,
        delay: Math.random() * 2
      }))
      setGhosts(newGhosts)
      
      // Clear ghosts after animation
      const timer = setTimeout(() => setGhosts([]), 8000)
      return () => clearTimeout(timer)
    }
  }, [result])

  async function handleFile(e){
    const file = e.target.files[0]
    if(!file) return
    setLoading(true)
    const fd = new FormData()
    fd.append('image', file)
    try{
      const upl = await fetch('http://localhost:3000/api/upload', { method:'POST', body: fd })
      const { ingredients, nutrition } = await upl.json()
      const analyze = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ ingredients, nutrition })
      })
      const data = await analyze.json()
      setResult(data)
    }catch(err){
      alert('Error: ' + err.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div style={{position:'relative', flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
      {!result ? (
        <label className="upload">
          <input type="file" accept="image/*" style={{display:'none'}} onChange={handleFile} />
          {loading ? <span className="loading-ghost">👻 Analyzing...</span> : '📸 Drop your snack photo here (or click to pick)'}
        </label>
      ) : (
        <div className="card">
          {/* Floating ghosts */}
          {ghosts.map(ghost => (
            <div 
              key={ghost.id} 
              className="ghost-float" 
              style={{
                left: `${ghost.left}%`, 
                top: `${ghost.top}%`,
                animationDelay: `${ghost.delay}s`
              }}
            >
              {ghost.emoji}
            </div>
          ))}
          
          <div style={{textAlign:'center'}}>
            <div className="emoji-result" style={{fontSize:48}}>{result.emoji}</div>
            <h2 className="result-title" style={{color:'#ff6b35'}}>{result.verdict}</h2>
            <div className="result-score" style={{fontSize:28}}>Score: {result.score}/100</div>
          </div>
          <div className="concerns-list" style={{marginTop:12}}>
            <h4>Top Concerns</h4>
            <ul>{result.topConcerns.map((c,i)=>(<li key={i}>💀 {c}</li>))}</ul>
          </div>
          <div className="vibe-message" style={{marginTop:12,fontStyle:'italic'}}>{result.vibeMessage}</div>
          <div className="suggestion-box" style={{marginTop:12}}><strong>Suggestion:</strong> {result.suggestion}</div>
          <div style={{marginTop:16,textAlign:'center'}}>
            <button onClick={()=>setResult(null)}>🎃 Scan Another Snack</button>
          </div>
        </div>
      )}
    </div>
  )
}
