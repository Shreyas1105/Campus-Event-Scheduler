'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ARPreview({ selectedEvent }) {
  const [isARActive, setIsARActive] = useState(false)

  const toggleAR = () => {
    // In a real app, this would activate the device's camera and overlay AR content
    setIsARActive(!isARActive)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">AR Event Preview</h2>
      {selectedEvent ? (
        <div>
          <p>Preview {selectedEvent.name} in Augmented Reality</p>
          <Button onClick={toggleAR}>
            {isARActive ? 'Deactivate AR' : 'Activate AR'}
          </Button>
          {isARActive && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p>AR preview active. Point your camera at a flat surface to see the event layout.</p>
            </div>
          )}
        </div>
      ) : (
        <p>Select an event to preview in AR</p>
      )}
    </div>
  )
}

