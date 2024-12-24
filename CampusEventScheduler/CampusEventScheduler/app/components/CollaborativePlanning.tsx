'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function CollaborativePlanning() {
  const [planningNotes, setPlanningNotes] = useState('')

  const handleNotesChange = (e) => {
    setPlanningNotes(e.target.value)
    // In a real app, we would use a WebSocket to broadcast changes to other users
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Collaborative Event Planning</h2>
      <div className="mb-4">
        <Textarea
          value={planningNotes}
          onChange={handleNotesChange}
          placeholder="Add your ideas here..."
          className="w-full h-32"
        />
      </div>
      <Button className="w-full sm:w-auto">Save Changes</Button>
    </div>
  )
}

