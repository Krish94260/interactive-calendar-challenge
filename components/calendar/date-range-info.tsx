'use client'

import { CalendarRange, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { DateRange } from '@/lib/calendar-types'
import { formatDateRange, getDaysBetween } from '@/lib/calendar-utils'

interface DateRangeInfoProps {
  dateRange: DateRange
  onClear: () => void
  className?: string
}

export function DateRangeInfo({ dateRange, onClear, className }: DateRangeInfoProps) {
  const hasRange = dateRange.start !== null
  const hasEnd = dateRange.end !== null
  
  if (!hasRange) return null

  const dayCount = hasEnd 
    ? getDaysBetween(dateRange.start!, dateRange.end!)
    : 1

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 bg-[#FF6B00]/10 dark:bg-[#FF6B00]/10 border-b border-[#FF6B00]/20 transition-colors duration-300',
        className
      )}
    >
      <CalendarRange className="h-3.5 w-3.5 text-[#FF6B00] shrink-0" />
      
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-800 dark:text-white truncate transition-colors duration-300">
          {formatDateRange(dateRange.start, dateRange.end)}
          <span className="text-gray-500 dark:text-[#9CA3AF] ml-2 transition-colors duration-300">
            ({dayCount} day{dayCount !== 1 ? 's' : ''})
          </span>
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5 shrink-0 text-gray-500 dark:text-[#9CA3AF] hover:text-gray-800 dark:hover:text-white hover:bg-[#FF6B00]/20 transition-colors duration-300"
        onClick={onClear}
        aria-label="Clear selection"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}
