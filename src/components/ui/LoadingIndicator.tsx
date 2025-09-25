'use client'

import React from 'react'

interface LoadingIndicatorProps {
  progress: number;
  isDarkMode: boolean;
}

export function LoadingIndicator({ progress, isDarkMode }: LoadingIndicatorProps) {
  // Розрахунок кількості крапок:
  // 1. Починаємо з 1 крапки (базова)
  // 2. Додаємо до 2 крапок в залежності від прогресу
  // - progress > 0 перевіряє, чи почалось завантаження
  // - progress / 40 ділить прогрес на сегменти (0-40% = 1 крапка, 41-80% = 2 крапки, 81-100% = 3 крапки)
  // - Math.min(2, Math.floor()) обмежує максимальну додаткову кількість крапок до 2
  const dots = '.'.repeat(1 + (progress > 0 ? Math.min(2, Math.floor(progress / 40)) : 0))

  return (
    <div className="flex flex-col items-center space-y-2">
      <p className={`text-sm font-medium ${isDarkMode ? 'text-[#e0e0e0]' : 'text-[#2A4E63]'}`}>
        Loading{dots}
      </p>
      <span className={`text-xs ${isDarkMode ? 'text-[#b0b0b0]' : 'text-gray-500'}`}>
        {Math.floor(progress)}%
      </span>
    </div>
  )
}