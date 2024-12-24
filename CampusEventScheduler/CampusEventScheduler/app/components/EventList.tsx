'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Event {
  id: number
  name: string
  date: string
  location: string
}

interface EventListProps {
  onSelectEvent: (event: Event | null) => void
}

export default function EventList({ onSelectEvent }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const mockEvents: Event[] = [
      { id: 1, name: 'Welcome Week Mixer', date: '2023-09-01', location: 'Student Center' },
      { id: 2, name: 'Career Fair', date: '2023-09-15', location: 'Auditorium' },
      { id: 3, name: 'Guest Lecture: AI Ethics', date: '2023-09-22', location: 'Library' },
    ]
    setEvents(mockEvents)
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <div className="flex flex-col">
                <span className="font-semibold">{event.name}</span>
                <span className="text-sm text-gray-500">{event.date} - {event.location}</span>
              </div>
              <Button onClick={() => onSelectEvent(event)} className="w-full sm:w-auto">Select</Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

