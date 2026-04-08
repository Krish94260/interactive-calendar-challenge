'use client'

import { ChevronLeft, ChevronRight, Calendar, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { MonthYearPicker } from './month-year-picker'

interface CalendarHeaderProps {
  currentDate: Date
  onPrevMonth: () => void
  onNextMonth: () => void
  onToday: () => void
  onMonthSelect: (month: number, year: number) => void
}

export function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  onMonthSelect,
}: CalendarHeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-[#F5F5F5] dark:bg-[#16213E] border-b border-gray-200 dark:border-[#2D2D44] transition-colors duration-300">
      {/* Navigation buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevMonth}
          aria-label="Previous month"
          className="h-7 w-7 hover:bg-[#FF6B00]/10 text-gray-500 dark:text-[#9CA3AF] hover:text-[#FF6B00] transition-colors duration-300"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNextMonth}
          aria-label="Next month"
          className="h-7 w-7 hover:bg-[#FF6B00]/10 text-gray-500 dark:text-[#9CA3AF] hover:text-[#FF6B00] transition-colors duration-300"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToday}
          className="hidden sm:flex ml-1 h-7 text-[10px] font-medium text-gray-500 dark:text-[#9CA3AF] hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 transition-colors duration-300"
        >
          <Calendar className="h-3 w-3 mr-1" />
          Today
        </Button>
      </div>

      {/* Month/Year picker and theme toggle */}
      <div className="flex items-center gap-1.5">
        <MonthYearPicker
          currentDate={currentDate}
          onSelect={onMonthSelect}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-[10px] font-medium text-gray-500 dark:text-[#9CA3AF] hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 transition-colors duration-300"
          >
            Jump to month
          </Button>
        </MonthYearPicker>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="h-7 w-7 hover:bg-[#FF6B00]/10 text-gray-500 dark:text-[#9CA3AF] hover:text-[#FF6B00] transition-colors duration-300"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
