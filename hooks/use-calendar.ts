'use client'

import { useState, useCallback, useEffect } from 'react'
import type { DateRange, CalendarNote } from '@/lib/calendar-types'

const NOTES_STORAGE_KEY = 'calendar-notes'
const RANGE_STORAGE_KEY = 'calendar-date-range'

export function useCalendar(initialDate?: Date) {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date())
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null })
  const [notes, setNotes] = useState<CalendarNote[]>([])
  const [isSelectingRange, setIsSelectingRange] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Load saved data from localStorage after mounting
  useEffect(() => {
    setIsMounted(true)
    try {
      const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY)
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes))
      }

      const savedRange = localStorage.getItem(RANGE_STORAGE_KEY)
      if (savedRange) {
        const parsed = JSON.parse(savedRange)
        setDateRange({
          start: parsed.start ? new Date(parsed.start) : null,
          end: parsed.end ? new Date(parsed.end) : null,
        })
      }
    } catch (error) {
      console.error('Error loading calendar data:', error)
    }
  }, [])

  // Save notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes))
    } catch (error) {
      console.error('Error saving notes:', error)
    }
  }, [notes])

  // Save date range to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(RANGE_STORAGE_KEY, JSON.stringify({
        start: dateRange.start?.toISOString() || null,
        end: dateRange.end?.toISOString() || null,
      }))
    } catch (error) {
      console.error('Error saving date range:', error)
    }
  }, [dateRange])

  const goToNextMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }, [])

  const goToPrevMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }, [])

  const goToToday = useCallback(() => {
    setCurrentDate(new Date())
  }, [])

  const goToMonth = useCallback((month: number, year: number) => {
    setCurrentDate(new Date(year, month, 1))
  }, [])

  const handleDateClick = useCallback((date: Date) => {
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      // Start new selection
      setDateRange({ start: date, end: null })
      setIsSelectingRange(true)
    } else {
      // Complete selection
      if (date < dateRange.start) {
        setDateRange({ start: date, end: dateRange.start })
      } else {
        setDateRange({ start: dateRange.start, end: date })
      }
      setIsSelectingRange(false)
    }
  }, [dateRange])

  const clearDateRange = useCallback(() => {
    setDateRange({ start: null, end: null })
    setIsSelectingRange(false)
  }, [])

  const isDateInRange = useCallback((date: Date) => {
    if (!dateRange.start || !dateRange.end) return false
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const start = new Date(dateRange.start.getFullYear(), dateRange.start.getMonth(), dateRange.start.getDate())
    const end = new Date(dateRange.end.getFullYear(), dateRange.end.getMonth(), dateRange.end.getDate())
    return d > start && d < end
  }, [dateRange])

  const isDateRangeStart = useCallback((date: Date) => {
    if (!dateRange.start) return false
    return (
      date.getFullYear() === dateRange.start.getFullYear() &&
      date.getMonth() === dateRange.start.getMonth() &&
      date.getDate() === dateRange.start.getDate()
    )
  }, [dateRange])

  const isDateRangeEnd = useCallback((date: Date) => {
    if (!dateRange.end) return false
    return (
      date.getFullYear() === dateRange.end.getFullYear() &&
      date.getMonth() === dateRange.end.getMonth() &&
      date.getDate() === dateRange.end.getDate()
    )
  }, [dateRange])

  const addNote = useCallback((date: Date, content: string) => {
    const newNote: CalendarNote = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: date.toISOString().split('T')[0],
      content,
      createdAt: new Date().toISOString(),
    }
    setNotes(prev => [...prev, newNote])
    return newNote
  }, [])

  const updateNote = useCallback((id: string, content: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, content } : note
    ))
  }, [])

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }, [])

  const getNotesForDate = useCallback((date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return notes.filter(note => note.date === dateStr)
  }, [notes])

  const getNotesForRange = useCallback(() => {
    if (!dateRange.start) return []
    const endDate = dateRange.end || dateRange.start
    
    return notes.filter(note => {
      const noteDate = new Date(note.date)
      return noteDate >= dateRange.start! && noteDate <= endDate
    })
  }, [notes, dateRange])

  return {
    currentDate,
    dateRange,
    notes,
    isSelectingRange,
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
    getNotesForRange,
  }
}
