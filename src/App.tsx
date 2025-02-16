import { useState } from 'react'

function App() {
  const [url, setUrl] = useState('')
  const [isAudioOnly, setIsAudioOnly] = useState(false)
  const [outputPath, setOutputPath] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDownload = async () => {
    if (!url || !outputPath) return
    
    setIsProcessing(true)
    
    try {
      const options = {
        url,
        outputPath,
        audioOnly: isAudioOnly
      }
      
      console.log('Download options:', options)
      // The actual implementation will go here
      
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tighter">JAYD</h1>
          <p className="text-zinc-500 text-sm mt-2">Just Another Youtube Downloader</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Paste YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 bg-app-gray border border-zinc-800 rounded-lg focus:outline-none focus:border-zinc-700 transition-colors"
          />
          
          <input
            type="text"
            placeholder="Output folder path"
            value={outputPath}
            onChange={(e) => setOutputPath(e.target.value)}
            className="w-full px-4 py-3 bg-app-gray border border-zinc-800 rounded-lg focus:outline-none focus:border-zinc-700 transition-colors"
          />
          
          <label className="flex items-center justify-between py-2 cursor-pointer group">
            <span className="text-zinc-400 text-sm">Audio Only</span>
            <div
              className="toggle-switch"
              data-checked={isAudioOnly}
              onClick={() => setIsAudioOnly(!isAudioOnly)}
              role="switch"
              aria-checked={isAudioOnly}
            />
          </label>
          
          <button
            onClick={handleDownload}
            disabled={isProcessing || !url || !outputPath}
            className="w-full py-3 bg-app-accent text-black font-semibold rounded-lg transition-all duration-200 
              enabled:hover:bg-opacity-90 enabled:hover:transform enabled:hover:-translate-y-0.5
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Downloading...' : 'Download'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App