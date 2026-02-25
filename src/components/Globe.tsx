import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.15;
  });

  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    for (let i = 0; i < 2000; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 2.01;
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  const routes = useMemo(() => {
    const routeData = [
      { start: [40.7, -74], end: [51.5, -0.1] },
      { start: [31.2, 121.5], end: [1.3, 103.8] },
      { start: [35.7, 139.7], end: [33.9, -118.2] },
      { start: [-33.9, 18.4], end: [25.3, 55.3] },
      { start: [22.3, 114.2], end: [51.5, -0.1] },
      { start: [1.3, 103.8], end: [40.7, -74] },
    ];

    return routeData.map(({ start, end }) => {
      const startLat = (start[0] * Math.PI) / 180;
      const startLng = (start[1] * Math.PI) / 180;
      const endLat = (end[0] * Math.PI) / 180;
      const endLng = (end[1] * Math.PI) / 180;
      const r = 2.02;

      const points: THREE.Vector3[] = [];
      for (let t = 0; t <= 1; t += 0.02) {
        const lat = startLat + (endLat - startLat) * t;
        const lng = startLng + (endLng - startLng) * t;
        const altitude = r + 0.15 * Math.sin(Math.PI * t);
        points.push(
          new THREE.Vector3(
            altitude * Math.cos(lat) * Math.cos(lng),
            altitude * Math.sin(lat),
            altitude * Math.cos(lat) * Math.sin(lng)
          )
        );
      }
      return new THREE.CatmullRomCurve3(points);
    });
  }, []);

  return (
    <group>
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshPhongMaterial
          color="#1a4f8a"
          emissive="#0a2a4a"
          emissiveIntensity={0.3}
          transparent
          opacity={0.85}
          wireframe={false}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[2.005, 32, 32]}>
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.08} />
      </Sphere>

      {/* Dots on globe */}
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial color="#60a5fa" size={0.015} transparent opacity={0.6} />
      </points>

      {/* Routes */}
      {routes.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 50, 0.008, 8, false]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.7} />
        </mesh>
      ))}

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#3b82f6" />
    </group>
  );
}

const Globe = () => (
  <div className="w-full h-full">
    <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
      <GlobeMesh />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  </div>
);

export default Globe;
