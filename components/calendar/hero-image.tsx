'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { MONTHS } from '@/lib/calendar-utils'

interface HeroImageProps {
  month: number
  year: number
  imageSrc?: string
  isFlipping?: boolean
}

// Default images for each month (using the generated hero image)
const defaultMonthImages: Record<number, string> = {
  0: '/images/calendar-hero.jpg', // January
  1: '/images/calendar-hero.jpg', // February
  2: '/images/calendar-hero.jpg', // March
  3: '/images/calendar-hero.jpg', // April
  4: '/images/calendar-hero.jpg', // May
  5: '/images/calendar-hero.jpg', // June
  6: '/images/calendar-hero.jpg', // July
  7: '/images/calendar-hero.jpg', // August
  8: '/images/calendar-hero.jpg', // September
  9: '/images/calendar-hero.jpg', // October
  10: '/images/calendar-hero.jpg', // November
  11: '/images/calendar-hero.jpg', // December
}

export function HeroImage({ month, year, imageSrc, isFlipping }: HeroImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const src = imageSrc || defaultMonthImages[month] || defaultMonthImages[0]

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-muted',
        'transition-transform duration-500 ease-in-out',
        isFlipping && 'animate-flip-calendar'
      )}
      style={{ perspective: '1000px' }}
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden">
        <Image
          src={src}
          alt={`${MONTHS[month]} ${year} calendar image`}
          fill
          className={cn(
            'object-cover transition-opacity duration-500',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}

        {/* Diagonal overlay with month/year */}
        <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute bottom-0 right-0 w-full h-full"
          >
            <polygon
              points="40,100 100,100 100,60"
              className="fill-primary"
            />
          </svg>
          
          {/* Month and year text */}
          <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 text-right">
            <p className="text-lg lg:text-xl font-medium text-primary-foreground tracking-wide">
              {year}
            </p>
            <h1 className="text-2xl lg:text-4xl font-bold text-primary-foreground tracking-tight uppercase">
              {MONTHS[month]}
            </h1>
          </div>
        </div>

        {/* Left diagonal accent */}
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-full"
          >
            <polygon
              points="0,100 30,100 0,70"
              className="fill-card"
            />
          </svg>
        </div>
      </div>

      {/* Spiral binding effect */}
      <div className="absolute -top-1 left-0 right-0 flex justify-center gap-3 lg:gap-4 z-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-muted-foreground/30 border-2 border-muted-foreground/50 shadow-sm"
            style={{
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
