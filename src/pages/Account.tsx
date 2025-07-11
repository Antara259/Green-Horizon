import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import {
  User,
  Mail,
  Calendar,
  Award,
  Leaf,
  ArrowLeft,
  Edit3,
  Save,
  X,
  Camera,
  Settings,
  LogOut,
  Trophy,
  Target,
  TrendingUp,
} from 'lucide-react'

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
})

type ProfileForm = z.infer<typeof profileSchema>

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  eco_points: number
  created_at: string
  updated_at: string
}

const Account: React.FC = () => {
  const { user, signOut, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single()

      if (error) throw error

      setProfile(data)
      setValue('fullName', data.full_name || '')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: ProfileForm) => {
    setUpdating(true)
    setError('')
    setSuccess('')

    try {
      await updateProfile({ full_name: data.fullName })
      setProfile(prev => prev ? { ...prev, full_name: data.fullName } : null)
      setSuccess('Profile updated successfully!')
      setEditing(false)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setUpdating(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error: any) {
      setError(error.message)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Profile not found</h2>
          <Link to="/" className="text-green-600 hover:text-green-700">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const memberSince = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })

  const ecoLevel = Math.floor(profile.eco_points / 100) + 1
  const pointsToNextLevel = (ecoLevel * 100) - profile.eco_points

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <motion.button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={16} />
            Sign Out
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
              <div className="text-center">
                {/* Avatar */}
                <motion.div
                  className="relative mx-auto w-24 h-24 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <motion.button
                    className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera size={14} />
                  </motion.button>
                </motion.div>

                {/* Name and Edit */}
                <div className="mb-4">
                  {editing ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                      <input
                        {...register('fullName')}
                        className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                        placeholder="Enter your name"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                      )}
                      <div className="flex gap-2 justify-center">
                        <motion.button
                          type="submit"
                          disabled={updating}
                          className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Save size={14} />
                          {updating ? 'Saving...' : 'Save'}
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => setEditing(false)}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <X size={14} />
                          Cancel
                        </motion.button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-green-800 mb-1">
                        {profile.full_name || 'Anonymous User'}
                      </h2>
                      <motion.button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-1 mx-auto text-green-600 hover:text-green-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Edit3 size={14} />
                        Edit Name
                      </motion.button>
                    </>
                  )}
                </div>

                {/* User Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-green-700">
                    <Mail size={16} />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <Calendar size={16} />
                    <span>Member since {memberSince}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <Award size={16} />
                    <span>Eco Level {ecoLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats and Progress */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2 space-y-6"
          >
            {/* Eco Points Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800">Eco Points</h3>
                  <p className="text-green-600">Your environmental impact score</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  className="text-center p-4 bg-green-50 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl font-bold text-green-700">{profile.eco_points}</div>
                  <div className="text-sm text-green-600">Total Points</div>
                </motion.div>

                <motion.div
                  className="text-center p-4 bg-emerald-50 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl font-bold text-emerald-700">{ecoLevel}</div>
                  <div className="text-sm text-emerald-600">Current Level</div>
                </motion.div>

                <motion.div
                  className="text-center p-4 bg-teal-50 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl font-bold text-teal-700">{pointsToNextLevel}</div>
                  <div className="text-sm text-teal-600">To Next Level</div>
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-green-600 mb-2">
                  <span>Level {ecoLevel}</span>
                  <span>Level {ecoLevel + 1}</span>
                </div>
                <div className="w-full bg-green-100 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((profile.eco_points % 100) / 100) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800">Achievements</h3>
                  <p className="text-green-600">Your eco milestones</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-yellow-700">First Steps</div>
                    <div className="text-sm text-yellow-600">Joined Green Horizon</div>
                  </div>
                </motion.div>

                {profile.eco_points >= 100 && (
                  <motion.div
                    className="flex items-center gap-3 p-3 bg-green-50 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-green-700">Eco Warrior</div>
                      <div className="text-sm text-green-600">Earned 100+ points</div>
                    </div>
                  </motion.div>
                )}

                {profile.eco_points >= 500 && (
                  <motion.div
                    className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-emerald-700">Green Champion</div>
                      <div className="text-sm text-emerald-600">Earned 500+ points</div>
                    </div>
                  </motion.div>
                )}

                {ecoLevel >= 10 && (
                  <motion.div
                    className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-purple-700">Eco Legend</div>
                      <div className="text-sm text-purple-600">Reached Level 10</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Account