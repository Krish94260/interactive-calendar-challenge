'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useCalendar } from '@/hooks/use-calendar'
import { CalendarHeader } from './calendar-header'
import { CalendarGrid } from './calendar-grid'
import { NotesSection } from './notes-section'
import { DateRangeInfo } from './date-range-info'
import { defaultHolidays } from '@/lib/calendar-types'
import { MONTHS } from '@/lib/calendar-utils'

export function WallCalendar() {
  const [isFlipping, setIsFlipping] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const {
    currentDate,
    dateRange,
    notes,
    isMounted,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    goToMonth,
    handleDateClick,
    clearDateRange,
    isDateInRange,
    isDateRangeStart,
    isDateRangeEnd,
    addNote,
    updateNote,
    deleteNote,
    getNotesForDate,
  } = useCalendar()

  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setIsFlipping(true)
    setTimeout(() => {
      if (direction === 'prev') {
        goToPrevMonth()
      } else {
        goToNextMonth()
      }
      setTimeout(() => {
        setIsFlipping(false)
      }, 300)
    }, 150)
  }

  const handleMonthSelect = (newMonth: number, newYear: number) => {
    if (newMonth !== month || newYear !== year) {
      setIsFlipping(true)
      setTimeout(() => {
        goToMonth(newMonth, newYear)
        setTimeout(() => {
          setIsFlipping(false)
        }, 300)
      }, 150)
    }
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-4xl bg-card rounded-sm overflow-hidden shadow-2xl">
          <div className="animate-pulse">
            <div className="h-8 bg-muted" />
            <div className="h-72 bg-muted" />
            <div className="p-4 grid grid-cols-7 gap-2">
              {Array.from({ length: 42 }).map((_, i) => (
                <div key={i} className="aspect-square bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] dark:bg-[#0D0D1A] flex items-center justify-center p-4 lg:p-8 transition-colors duration-300">
      {/* Calendar container */}
      <div className="relative mt-8">
        {/* Hanging Hook - Metal ring at top center (like reference image) */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
          {/* Metal hook ring */}
          <div className="relative">
            <svg width="40" height="32" viewBox="0 0 40 32" className="drop-shadow-md">
              {/* Hook curve */}
              <path
                d="M20 0 C8 0 2 8 2 16 C2 22 6 26 12 26 L28 26 C34 26 38 22 38 16 C38 8 32 0 20 0"
                fill="none"
                className="stroke-[#4A4A4A] dark:stroke-[#888888]"
                strokeWidth="3"
              />
              {/* Highlight */}
              <path
                d="M20 3 C10 3 5 10 5 16"
                fill="none"
                className="stroke-[#6A6A6A] dark:stroke-[#AAAAAA]"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>

        {/* Shadow beneath calendar */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/20 dark:bg-black/40 blur-xl rounded-full" />

        {/* Main calendar card */}
        <div
          className={cn(
            'w-full max-w-[420px] sm:max-w-[520px] lg:max-w-[600px] bg-white dark:bg-[#1A1A2E] overflow-hidden',
            'shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]',
            'rounded-sm transition-colors duration-300',
            isFlipping && 'animate-flip-calendar'
          )}
          style={{ perspective: '1000px' }}
        >
          {/* Spiral binding - Realistic black coils like reference */}
          <div className="relative h-6 bg-gradient-to-b from-[#F5F5F5] to-[#E8E8E8] dark:from-[#2D2D44] dark:to-[#1A1A2E] flex items-center justify-center overflow-visible transition-colors duration-300">
            {/* Spiral coils */}
            <div className="flex items-center justify-center gap-[10px] sm:gap-3 relative">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="relative">
                  {/* Coil ring */}
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[2.5px] border-[#333333] dark:border-[#555555] bg-[#E8E8E8] dark:bg-[#1A1A2E] transition-colors duration-300" />
                  {/* Coil shadow */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-2 sm:w-4 sm:h-2.5 bg-[#333333]/10 dark:bg-black/20 rounded-full blur-[1px]" />
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image Section with diagonal overlay */}
          <div className="relative aspect-[16/10] overflow-hidden bg-[#F0F0F0] dark:bg-[#16213E] transition-colors duration-300">
            <Image
              src="/images/calendar-hero.jpg"
              alt={`${MONTHS[month]} ${year} calendar`}
              fill
              className={cn(
                'object-cover transition-opacity duration-500',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setImageLoaded(true)}
              priority
              sizes="(max-width: 768px) 100vw, 600px"
            />
            
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}

            {/* Diagonal overlay - TakeUForward orange (like reference blue diagonal) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Main orange diagonal */}
              <polygon
                points="45,100 100,100 100,40"
                className="fill-[#FF6B00]"
              />
              {/* Small dark accent */}
              <polygon
                points="0,100 25,100 0,85"
                className="fill-white/90 dark:fill-[#1A1A2E]/90"
              />
            </svg>

            {/* Year and Month display on diagonal */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-right z-10">
              <p className="text-sm sm:text-base font-medium text-white tracking-[0.2em]">
                {year}
              </p>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide uppercase">
                {MONTHS[month]}
              </h1>
            </div>

            {/* TakeUForward logo badge */}
            <div className="absolute top-3 left-3 z-10">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white/90 dark:bg-[#1A1A2E]/90 backdrop-blur-sm rounded shadow-sm transition-colors duration-300">
                <div className="w-5 h-5 rounded bg-[#FF6B00] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-[#1A1A2E] dark:text-white transition-colors duration-300">takeUforward</span>
              </div>
            </div>
          </div>

          {/* Navigation Header */}
          <CalendarHeader
            currentDate={currentDate}
            onPrevMonth={() => handleMonthChange('prev')}
            onNextMonth={() => handleMonthChange('next')}
            onToday={goToToday}
            onMonthSelect={handleMonthSelect}
          />

          {/* Date Range Info */}
          <DateRangeInfo
            dateRange={dateRange}
            onClear={clearDateRange}
          />

          {/* Main content: Notes on LEFT, Calendar Grid on RIGHT (like reference) */}
          <div className="flex flex-col lg:flex-row bg-white dark:bg-[#1A1A2E] transition-colors duration-300">
            {/* Notes Section - LEFT */}
            <div className="order-2 lg:order-1 w-full lg:w-48 xl:w-56 border-t lg:border-t-0 lg:border-r border-gray-200 dark:border-[#2D2D44] transition-colors duration-300">
              <NotesSection
                dateRange={dateRange}
                notes={notes}
                onAddNote={addNote}
                onUpdateNote={updateNote}
                onDeleteNote={deleteNote}
                onClearRange={clearDateRange}
              />
            </div>

            {/* Calendar Grid - RIGHT */}
            <div className="order-1 lg:order-2 flex-1">
              <CalendarGrid
                currentDate={currentDate}
                onDateClick={handleDateClick}
                isDateInRange={isDateInRange}
                isDateRangeStart={isDateRangeStart}
                isDateRangeEnd={isDateRangeEnd}
                getNotesForDate={getNotesForDate}
                holidays={defaultHolidays}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
