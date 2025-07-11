import React, { useState } from 'react'

const BackgroundVideo: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true)

  const toggleSound = () => {
    setIsMuted(!isMuted)
  }

  return (
    <>
      <video
        autoPlay
        loop
        playsInline
        muted={isMuted}
        className="bg-video"
      >
        <source src="/Background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
        onClick={toggleSound}
        className="fixed top-5 left-5 z-10 px-5 py-2.5 text-base bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:bg-white/90 transition-colors"
      >
        {isMuted ? '🔇 Sound Off' : '🔊 Sound On'}
      </button>
    </>
  )
}

export default BackgroundVideo