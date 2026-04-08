'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { MONTHS_SHORT } from '@/lib/calendar-utils'

interface MonthYearPickerProps {
  currentDate: Date
  onSelect: (month: number, year: number) => void
  children: React.ReactNode
}

export function MonthYearPicker({ currentDate, onSelect, children }: MonthYearPickerProps) {
  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(currentDate.getFullYear())
  
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const todayYear = new Date().getFullYear()
  const todayMonth = new Date().getMonth()

  const handleMonthSelect = (month: number) => {
    onSelect(month, viewYear)
    setOpen(false)
  }

  const handlePrevYear = () => setViewYear(prev => prev - 1)
  const handleNextYear = () => setViewYear(prev => prev + 1)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[340px] bg-white dark:bg-[#1A1A2E] border-gray-200 dark:border-[#2D2D44] transition-colors duration-300">
        <DialogHeader>
          <DialogTitle className="text-center text-gray-800 dark:text-white transition-colors duration-300">Select Month</DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-500 dark:text-[#9CA3AF] transition-colors duration-300">
            Choose a month and year to navigate to
          </DialogDescription>
        </DialogHeader>
        
        {/* Year navigation */}
        <div className="flex items-center justify-between py-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevYear}
            aria-label="Previous year"
            className="text-gray-500 dark:text-[#9CA3AF] hover:text-[#FF6B00] hover:bg-[#FF6B00]/20 transition-colors duration-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-300">{viewYear}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextYear}
            aria-label="Next year"
            className="text-gray-500 dark:text-[#9CA3AF] hover:text-[#FF6B00] hover:bg-[#FF6B00]/20 transition-colors duration-300"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-3 gap-2">
          {MONTHS_SHORT.map((month, index) => {
            const isCurrentMonth = index === currentMonth && viewYear === currentYear
            const isToday = index === todayMonth && viewYear === todayYear
            
            return (
              <Button
                key={month}
                variant={isCurrentMonth ? 'default' : 'outline'}
                className={cn(
                  'h-12 transition-colors duration-300',
                  isCurrentMonth && 'bg-[#FF6B00] hover:bg-[#E55F00] text-white border-[#FF6B00]',
                  !isCurrentMonth && 'border-gray-200 dark:border-[#2D2D44] text-gray-600 dark:text-[#9CA3AF] hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 hover:border-[#FF6B00]',
                  isToday && !isCurrentMonth && 'ring-2 ring-[#FF6B00] ring-offset-2 ring-offset-white dark:ring-offset-[#1A1A2E]'
                )}
                onClick={() => handleMonthSelect(index)}
              >
                {month}
              </Button>
            )
          })}
        </div>

        {/* Quick actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            className="flex-1 border-gray-200 dark:border-[#2D2D44] text-gray-600 dark:text-[#9CA3AF] hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 hover:border-[#FF6B00] transition-colors duration-300"
            onClick={() => {
              setViewYear(todayYear)
              handleMonthSelect(todayMonth)
            }}
          >
            Today
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-gray-200 dark:border-[#2D2D44] text-gray-600 dark:text-[#9CA3AF] hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2D2D44] transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
