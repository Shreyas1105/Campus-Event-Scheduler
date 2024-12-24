import { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Box, Text, Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const Building = ({ position, name, isHighlighted, setHovered }) => {
  const meshRef = useRef()
  const [x, y, z] = position

  useFrame((state) => {
    if (isHighlighted && meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 + y
    } else {
      meshRef.current.position.y = y
    }
  })

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[1, 2, 1]}
        onPointerOver={() => setHovered(name)}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial color={isHighlighted ? 'hotpink' : 'lightblue'} />
      </Box>
      <Text position={[0, 1.5, 0]} fontSize={0.2} color="white">
        {name}
      </Text>
    </group>
  )
}

const Tree = ({ position }) => {
  return (
    <group position={position}>
      <Sphere args={[0.5, 16, 16]} position={[0, 1, 0]}>
        <meshStandardMaterial color="green" />
      </Sphere>
      <Box args={[0.1, 1, 0.1]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="brown" />
      </Box>
    </group>
  )
}

const Ground = () => {
  const texture = useTexture('/placeholder.svg?height=1024&width=1024')
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default function CampusMap({ selectedEvent }) {
  const { camera } = useThree()
  const [hoveredBuilding, setHoveredBuilding] = useState(null)

  const buildings = useMemo(() => [
    { name: 'Library', position: [-2, 0, 0] },
    { name: 'Student Center', position: [0, 0, 2] },
    { name: 'Auditorium', position: [2, 0, -1] },
    { name: 'Science Lab', position: [-1, 0, -2] },
    { name: 'Sports Complex', position: [3, 0, 2] },
  ], [])

  const trees = useMemo(() => [
    [-3, 0, 3],
    [3, 0, -3],
    [-2, 0, -3],
    [4, 0, 1],
    [-4, 0, 0],
  ], [])

  useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(5, 5, 5), 0.05)
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <Ground />
      {buildings.map((building) => (
        <Building
          key={building.name}
          {...building}
          isHighlighted={selectedEvent?.location === building.name || hoveredBuilding === building.name}
          setHovered={setHoveredBuilding}
        />
      ))}
      {trees.map((position, index) => (
        <Tree key={index} position={position} />
      ))}
      <fog attach="fog" args={['#f0f0f0', 0, 30]} />
    </>
  )
}

