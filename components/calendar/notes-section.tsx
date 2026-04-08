'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { CalendarNote, DateRange } from '@/lib/calendar-types'
import { formatDate, getDaysBetween } from '@/lib/calendar-utils'

interface NotesSectionProps {
  dateRange: DateRange
  notes: CalendarNote[]
  onAddNote: (date: Date, content: string) => void
  onUpdateNote: (id: string, content: string) => void
  onDeleteNote: (id: string) => void
  onClearRange: () => void
}

export function NotesSection({
  dateRange,
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}: NotesSectionProps) {
  const [newNote, setNewNote] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  const hasRange = dateRange.start !== null
  const rangeNotes = hasRange
    ? notes.filter(note => {
        const noteDate = new Date(note.date)
        const start = dateRange.start!
        const end = dateRange.end || start
        return noteDate >= start && noteDate <= end
      })
    : notes.slice(0, 5)

  const handleAddNote = () => {
    if (!newNote.trim() || !dateRange.start) return
    onAddNote(dateRange.start, newNote.trim())
    setNewNote('')
  }

  const handleStartEdit = (note: CalendarNote) => {
    setEditingId(note.id)
    setEditContent(note.content)
  }

  const handleSaveEdit = () => {
    if (editingId && editContent.trim()) {
      onUpdateNote(editingId, editContent.trim())
    }
    setEditingId(null)
    setEditContent('')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditContent('')
  }

  const dayCount = dateRange.start && dateRange.end
    ? getDaysBetween(dateRange.start, dateRange.end)
    : dateRange.start ? 1 : 0

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1A1A2E] min-h-[200px] lg:min-h-[320px] transition-colors duration-300">
      {/* Notes Header - Like reference with lined paper style */}
      <div className="px-3 py-2 border-b border-gray-200 dark:border-[#2D2D44] transition-colors duration-300">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-[#FF6B00] rounded-full" />
          <h3 className="text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider transition-colors duration-300">Notes</h3>
        </div>
        {hasRange && (
          <p className="text-[10px] text-[#FF6B00] mt-0.5 ml-3">
            {dayCount} day{dayCount !== 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      {/* Lined paper area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Horizontal lines like reference */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-5 border-b border-gray-200 dark:border-[#2D2D44]/50 transition-colors duration-300"
            />
          ))}
        </div>

        {/* Content over lines */}
        <ScrollArea className="h-full relative z-10">
          <div className="p-2 space-y-1">
            {rangeNotes.length === 0 ? (
              <p className="text-[10px] text-gray-400 dark:text-[#6B7280] italic px-1 py-2 transition-colors duration-300">
                {hasRange ? 'No notes for selection' : 'Select dates to add notes'}
              </p>
            ) : (
              rangeNotes.map((note) => (
                <div
                  key={note.id}
                  className={cn(
                    'group relative px-2 py-1 rounded hover:bg-[#FF6B00]/5 dark:hover:bg-[#FF6B00]/10',
                    'transition-colors duration-150'
                  )}
                >
                  {editingId === note.id ? (
                    <div className="space-y-1">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[36px] text-[10px] resize-none border-[#FF6B00] bg-gray-50 dark:bg-[#16213E] text-gray-800 dark:text-white focus:ring-[#FF6B00] transition-colors duration-300"
                        autoFocus
                      />
                      <div className="flex gap-1 justify-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCancelEdit}
                          className="h-5 px-1.5 text-[10px] text-gray-500 dark:text-[#9CA3AF] hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2D2D44]"
                        >
                          <X className="h-2.5 w-2.5" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          className="h-5 px-1.5 text-[10px] bg-[#FF6B00] hover:bg-[#E55F00] text-white"
                        >
                          <Check className="h-2.5 w-2.5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-[10px] text-gray-700 dark:text-[#E5E7EB] pr-8 leading-relaxed transition-colors duration-300">
                        {note.content}
                      </p>
                      <p className="text-[9px] text-gray-400 dark:text-[#6B7280] mt-0.5 transition-colors duration-300">
                        {formatDate(new Date(note.date))}
                      </p>
                      <div className="absolute top-0.5 right-0.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleStartEdit(note)}
                          className="h-4 w-4 hover:bg-gray-100 dark:hover:bg-[#2D2D44]"
                          aria-label="Edit note"
                        >
                          <Edit2 className="h-2 w-2 text-gray-400 dark:text-[#9CA3AF]" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onDeleteNote(note.id)}
                          className="h-4 w-4 text-red-400 dark:text-[#EF4444] hover:text-red-500 dark:hover:text-[#F87171] hover:bg-gray-100 dark:hover:bg-[#2D2D44]"
                          aria-label="Delete note"
                        >
                          <Trash2 className="h-2 w-2" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Add note input */}
      {hasRange && (
        <div className="p-2 border-t border-gray-200 dark:border-[#2D2D44] bg-gray-50 dark:bg-[#16213E] transition-colors duration-300">
          <Textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[40px] text-[10px] resize-none mb-1 bg-white dark:bg-[#1A1A2E] border-gray-200 dark:border-[#2D2D44] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#6B7280] focus:border-[#FF6B00] focus:ring-[#FF6B00] transition-colors duration-300"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleAddNote()
              }
            }}
          />
          <Button
            size="sm"
            onClick={handleAddNote}
            disabled={!newNote.trim()}
            className="w-full h-6 text-[10px] gap-1 bg-[#FF6B00] hover:bg-[#E55F00] text-white disabled:bg-gray-200 dark:disabled:bg-[#2D2D44] disabled:text-gray-400 dark:disabled:text-[#6B7280]"
          >
            <Plus className="h-2.5 w-2.5" />
            Add Note
          </Button>
        </div>
      )}
    </div>
  )
}
