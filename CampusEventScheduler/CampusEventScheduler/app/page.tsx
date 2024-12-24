'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import EventList from './components/EventList'
import CampusMap from './components/CampusMap'
import EventRecommendations from './components/EventRecommendations'
import CollaborativePlanning from './components/CollaborativePlanning'
import ARPreview from './components/ARPreview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CampusEventScheduler() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Campus Event Scheduler</h1>
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="w-full flex flex-wrap justify-center mb-4">
          <TabsTrigger value="events" className="flex-grow sm:flex-grow-0">Events</TabsTrigger>
          <TabsTrigger value="map" className="flex-grow sm:flex-grow-0">3D Campus Map</TabsTrigger>
          <TabsTrigger value="collaborate" className="flex-grow sm:flex-grow-0">Collaborate</TabsTrigger>
          <TabsTrigger value="ar" className="flex-grow sm:flex-grow-0">AR Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="events">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <EventList onSelectEvent={setSelectedEvent} />
            <EventRecommendations />
          </div>
        </TabsContent>
        <TabsContent value="map">
          <div className="h-[400px] sm:h-[600px] bg-gray-100 rounded-lg overflow-hidden">
            <Canvas>
              <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2 - 0.1} />
              <Sky sunPosition={[100, 20, 100]} />
              <CampusMap selectedEvent={selectedEvent} />
            </Canvas>
          </div>
        </TabsContent>
        <TabsContent value="collaborate">
          <CollaborativePlanning />
        </TabsContent>
        <TabsContent value="ar">
          <ARPreview selectedEvent={selectedEvent} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

