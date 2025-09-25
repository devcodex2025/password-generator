'use client'

import React, { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { useTheme } from '@/context/ThemeContext'
import { usePathname, useSearchParams } from 'next/navigation'

export function LoadingProgress() {
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const { isDarkMode } = useTheme()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Reset progress when route changes
    setProgress(0)
    setIsAnimating(true)

    // Initial progress jump
    const initialJump = setTimeout(() => {
      setProgress(30)
    }, 50)

    // Simulate gradual progress
    const progressSteps = [
      { value: 50, delay: 200 },
      { value: 70, delay: 400 },
      { value: 85, delay: 600 },
      { value: 90, delay: 800 }
    ]

    const timeouts = progressSteps.map(({ value, delay }) =>
      setTimeout(() => setProgress(value), delay)
    )

    // Complete the progress
    const completion = setTimeout(() => {
      setProgress(100)
      // Hide the progress bar after completion
      setTimeout(() => {
        setIsAnimating(false)
      }, 200)
    }, 1000)

    return () => {
      clearTimeout(initialJump)
      timeouts.forEach(clearTimeout)
      clearTimeout(completion)
    }
  }, [pathname, searchParams])

  if (!isAnimating && progress === 0) {
    return null
  }

  return (
    <div 
      className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-200 ${
        progress === 100 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Progress 
        value={progress} 
        className={`h-1 transition-all duration-300 ease-out ${
          isDarkMode ? 'bg-[#1f2937]' : 'bg-gray-100'
        }`}
      />
    </div>
  )
}