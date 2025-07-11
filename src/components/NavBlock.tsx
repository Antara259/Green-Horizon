import React from 'react'
import { Link } from 'react-router-dom'

interface NavBlockProps {
  to: string
  title: string
  icon: string
  variant: 'green' | 'light-green'
  external?: boolean
}

const NavBlock: React.FC<NavBlockProps> = ({ to, title, icon, variant, external = false }) => {
  const baseClasses = `
    relative flex flex-col items-center justify-center text-center p-8 rounded-lg
    text-white overflow-hidden shadow-lg transition-all duration-300 ease-in-out
    hover:-translate-y-1 hover:shadow-xl group
  `
  
  const variantClasses = variant === 'green' 
    ? 'bg-gradient-to-br from-green-400 to-green-600'
    : 'bg-gradient-to-br from-green-300 to-green-500'

  const content = (
    <>
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div className="text-xl font-medium mb-2">{title}</div>
      <div className="text-xs uppercase tracking-wider font-light opacity-80">
        Explore
      </div>
      <svg 
        className="absolute bottom-0 right-0 w-20 h-20 stroke-white opacity-30 transform rotate-45 scale-75 animate-leafSway"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    </>
  )

  if (external) {
    return (
      <a href={to} className={`${baseClasses} ${variantClasses}`} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return (
    <Link to={to} className={`${baseClasses} ${variantClasses}`}>
      {content}
    </Link>
  )
}

export default NavBlock