'use client'

import { cn } from '@/lib/utils'
import {
  getCalendarDays,
  isToday,
  isWeekend,
  isSameMonth,
  getHolidayForDate,
} from '@/lib/calendar-utils'
import type { Holiday } from '@/lib/calendar-types'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

// Day names matching reference image exactly
const DAYS_FULL = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const DAYS_SHORT = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

interface CalendarGridProps {
  currentDate: Date
  onDateClick: (date: Date) => void
  isDateInRange: (date: Date) => boolean
  isDateRangeStart: (date: Date) => boolean
  isDateRangeEnd: (date: Date) => boolean
  getNotesForDate: (date: Date) => { id: string; content: string }[]
  holidays?: Holiday[]
}

export function CalendarGrid({
  currentDate,
  onDateClick,
  isDateInRange,
  isDateRangeStart,
  isDateRangeEnd,
  getNotesForDate,
  holidays,
}: CalendarGridProps) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const days = getCalendarDays(year, month)

  return (
    <div className="p-3 sm:p-4 bg-white dark:bg-[#1A1A2E] transition-colors duration-300">
      {/* Day headers - Clean like reference: SAT & SUN in orange */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {DAYS_FULL.map((day, index) => (
          <div
            key={day}
            className={cn(
              'text-center text-[9px] sm:text-[10px] font-semibold py-1 tracking-wider uppercase transition-colors duration-300',
              // SAT and SUN (index 5 and 6) are orange like TakeUForward/reference
              index >= 5 
                ? 'text-[#FF6B00]' 
                : 'text-gray-500 dark:text-[#9CA3AF]'
            )}
          >
            <span className="sm:hidden">{DAYS_SHORT[index]}</span>
            <span className="hidden sm:inline">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar days grid - Clean number display like reference */}
      <div className="grid grid-cols-7 gap-y-0">
        {days.map((date, index) => {
          if (!date) return <div key={index} className="aspect-[1.4]" />

          const isCurrentMonth = isSameMonth(date, month, year)
          const isTodayDate = isToday(date)
          const isWeekendDate = isWeekend(date)
          const isInRange = isDateInRange(date)
          const isStart = isDateRangeStart(date)
          const isEnd = isDateRangeEnd(date)
          const holiday = getHolidayForDate(date, holidays)
          const notes = getNotesForDate(date)
          const hasNotes = notes.length > 0

          return (
            <TooltipProvider key={index} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onDateClick(date)}
                    className={cn(
                      'aspect-[1.4] flex items-center justify-center relative',
                      'text-sm sm:text-base font-medium transition-all duration-150',
                      'hover:bg-[#FF6B00]/10 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-1',
                      'active:scale-95 touch-manipulation rounded',
                      // Non-current month days - light gray
                      !isCurrentMonth && 'text-gray-300 dark:text-[#4B5563]',
                      // Weekend days (SAT, SUN) - orange like reference
                      isCurrentMonth && isWeekendDate && 'text-[#FF6B00]',
                      // Weekday style - dark on light, light on dark
                      isCurrentMonth && !isWeekendDate && 'text-gray-800 dark:text-[#E5E7EB]',
                      // Range selection styles
                      isInRange && !isStart && !isEnd && 'bg-[#FF6B00]/10 dark:bg-[#FF6B00]/15',
                      isStart && 'bg-[#FF6B00] text-white rounded-l font-bold',
                      isEnd && 'bg-[#FF6B00] text-white rounded-r font-bold',
                      isStart && isEnd && 'rounded',
                      // Today highlight
                      isTodayDate && !isStart && !isEnd && 'ring-2 ring-[#FF6B00] ring-inset font-bold'
                    )}
                    aria-label={`${date.toDateString()}${holiday ? `, ${holiday.name}` : ''}${hasNotes ? `, has ${notes.length} note(s)` : ''}`}
                    aria-pressed={isStart || isEnd || isInRange}
                  >
                    {date.getDate()}
                    
                    {/* Indicators */}
                    {(holiday || hasNotes) && (
                      <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {holiday && (
                          <span className="w-1 h-1 rounded-full bg-red-500" />
                        )}
                        {hasNotes && (
                          <span className="w-1 h-1 rounded-full bg-[#FF6B00]" />
                        )}
                      </div>
                    )}
                  </button>
                </TooltipTrigger>
                {(holiday || hasNotes) && (
                  <TooltipContent 
                    side="top" 
                    className="max-w-[200px] hidden sm:block bg-white dark:bg-[#16213E] border-gray-200 dark:border-[#2D2D44] text-gray-800 dark:text-white shadow-lg transition-colors duration-300"
                  >
                    {holiday && (
                      <p className="font-semibold text-sm text-[#FF6B00]">{holiday.name}</p>
                    )}
                    {hasNotes && (
                      <p className="text-xs text-gray-500 dark:text-[#9CA3AF] mt-1 transition-colors duration-300">
                        {notes.length} note{notes.length > 1 ? 's' : ''}
                      </p>
                    )}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </div>
    </div>
  )
}
