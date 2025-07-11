import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { User, LogIn } from 'lucide-react'

const AuthButton: React.FC = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
    )
  }

  if (user) {
    return (
      <Link to="/account">
        <motion.div
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:bg-white/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <span className="text-green-700 font-medium">Account</span>
        </motion.div>
      </Link>
    )
  }

  return (
    <Link to="/login">
      <motion.div
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogIn size={16} />
        <span className="font-medium">Sign In</span>
      </motion.div>
    </Link>
  )
}

export default AuthButton