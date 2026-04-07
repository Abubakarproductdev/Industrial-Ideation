"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Icosahedron() {
  const meshRef = useRef(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={1} 
      floatIntensity={2}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color={hovered ? "#c9a96e" : "#e0c591"} 
          wireframe={true}
          wireframeLinewidth={2}
          emissive="#c9a96e"
          emissiveIntensity={hovered ? 0.5 : 0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Inner solid core just to give it depth */}
      <mesh scale={0.7}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          roughness={0.5} 
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 opacity-60 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.2} color="#c9a96e" />
        
        <Icosahedron />
        
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={5} 
          blur={2} 
          far={4} 
          color="#000000"
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
