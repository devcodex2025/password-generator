'use client'
import React from 'react'

export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0b0b0b]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-[#2A4E63] border-t-transparent animate-spin" aria-label="Loading" />
        <div className="h-4 w-40 bg-gray-200 dark:bg-[#1f2937] rounded animate-pulse" />
      </div>
    </div>
  )
}


