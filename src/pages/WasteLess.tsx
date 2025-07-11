import React, { useEffect } from 'react'

const WasteLess: React.FC = () => {
  useEffect(() => {
    // Redirect to the existing Wasteless application
    window.location.href = 'https://trash-vision-classify-it.vercel.app/'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-xl text-green-700">Redirecting to WasteLess...</p>
        <p className="text-sm text-green-600 mt-2">
          If you're not redirected automatically, 
          <a 
            href="https://trash-vision-classify-it.vercel.app/" 
            className="underline ml-1"
            target="_blank" 
            rel="noopener noreferrer"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  )
}

export default WasteLess