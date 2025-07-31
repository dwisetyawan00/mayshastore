'use client'
import { useEffect, useState } from 'react'

export default function LoadingOverlay() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])
  if (!loading) return null
  return (
    <div className="loading-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-white font-medium">Loading...</div>
      </div>
    </div>
  )
}
