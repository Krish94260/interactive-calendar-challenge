export interface CalendarNote {
  id: string
  date: string // ISO date string
  content: string
  createdAt: string
}

export interface DateRange {
  start: Date | null
  end: Date | null
}

export interface MonthImage {
  month: number // 0-11
  src: string
  alt: string
}

export interface Holiday {
  date: string // ISO date string (YYYY-MM-DD format, year ignored)
  name: string
  type: 'national' | 'observance' | 'custom'
}

// Default holidays (US focused, but can be customized)
export const defaultHolidays: Holiday[] = [
  { date: '01-01', name: "New Year's Day", type: 'national' },
  { date: '01-15', name: 'Martin Luther King Jr. Day', type: 'national' },
  { date: '02-14', name: "Valentine's Day", type: 'observance' },
  { date: '02-19', name: "Presidents' Day", type: 'national' },
  { date: '03-17', name: "St. Patrick's Day", type: 'observance' },
  { date: '04-01', name: "April Fools' Day", type: 'observance' },
  { date: '05-27', name: 'Memorial Day', type: 'national' },
  { date: '06-19', name: 'Juneteenth', type: 'national' },
  { date: '07-04', name: 'Independence Day', type: 'national' },
  { date: '09-02', name: 'Labor Day', type: 'national' },
  { date: '10-14', name: 'Columbus Day', type: 'national' },
  { date: '10-31', name: 'Halloween', type: 'observance' },
  { date: '11-11', name: "Veterans Day", type: 'national' },
  { date: '11-28', name: 'Thanksgiving', type: 'national' },
  { date: '12-25', name: 'Christmas', type: 'national' },
  { date: '12-31', name: "New Year's Eve", type: 'observance' },
]
