'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function EventRecommendations() {
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    // In a real app, this would be an API call to an AI service
    const mockRecommendations = [
      { id: 1, name: 'Tech Talk: AI in Education', score: 0.95 },
      { id: 2, name: 'Campus Music Festival', score: 0.88 },
      { id: 3, name: 'Career Fair 2023', score: 0.82 },
    ]
    setRecommendations(mockRecommendations)
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI-Powered Event Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recommendations.map((event) => (
            <li key={event.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <span className="font-semibold">{event.name}</span>
              <span className="text-sm text-gray-500">
                ({(event.score * 100).toFixed(0)}% match)
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

