import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Grid } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* Central wireframe core — a glowing geometric "engine" */
function Core({ mouse }) {
  const group = useRef();
  const wire = useRef();
  const outer = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y +=
        delta * 0.15 + (mouse.current.x * 0.4 - group.current.rotation.y) * 0.02;
      group.current.rotation.x +=
        (mouse.current.y * 0.3 - group.current.rotation.x) * 0.02;
    }
    if (wire.current) wire.current.rotation.z = t * 0.25;
    if (outer.current) {
      outer.current.rotation.y = -t * 0.18;
      outer.current.rotation.x = t * 0.12;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        {/* solid dark core */}
        <Icosahedron args={[1.05, 1]}>
          <meshStandardMaterial
            color="#0c0c16"
            roughness={0.3}
            metalness={0.9}
            emissive="#1a1140"
            emissiveIntensity={0.5}
          />
        </Icosahedron>
        {/* glowing wireframe shell */}
        <Icosahedron ref={wire} args={[1.32, 1]}>
          <meshBasicMaterial color="#7c5cff" wireframe />
        </Icosahedron>
        {/* outer cyan cage */}
        <Icosahedron ref={outer} args={[1.85, 0]}>
          <meshBasicMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.45}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

/* Animated network constellation — nodes + dynamic connecting lines */
function Network({ count = 52 }) {
  const pointsRef = useRef();
  const linesRef = useRef();

  const bounds = useMemo(() => new THREE.Vector3(6.2, 3.6, 3.2), []);
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * bounds.x * 2,
          (Math.random() - 0.5) * bounds.y * 2,
          (Math.random() - 0.5) * bounds.z * 2
        ),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006
        ),
      });
    }
    return arr;
  }, [count, bounds]);

  const pointPositions = useMemo(() => new Float32Array(count * 3), [count]);
  const maxSegments = count * 8;
  const linePositions = useMemo(
    () => new Float32Array(maxSegments * 2 * 3),
    [maxSegments]
  );

  useFrame(() => {
    for (let i = 0; i < count; i++) {
      const n = nodes[i];
      n.pos.add(n.vel);
      if (n.pos.x > bounds.x || n.pos.x < -bounds.x) n.vel.x *= -1;
      if (n.pos.y > bounds.y || n.pos.y < -bounds.y) n.vel.y *= -1;
      if (n.pos.z > bounds.z || n.pos.z < -bounds.z) n.vel.z *= -1;
      pointPositions[i * 3] = n.pos.x;
      pointPositions[i * 3 + 1] = n.pos.y;
      pointPositions[i * 3 + 2] = n.pos.z;
    }

    let s = 0;
    const threshold = 2.5;
    for (let i = 0; i < count && s < maxSegments; i++) {
      for (let j = i + 1; j < count && s < maxSegments; j++) {
        const d = nodes[i].pos.distanceTo(nodes[j].pos);
        if (d < threshold) {
          linePositions[s * 6] = nodes[i].pos.x;
          linePositions[s * 6 + 1] = nodes[i].pos.y;
          linePositions[s * 6 + 2] = nodes[i].pos.z;
          linePositions[s * 6 + 3] = nodes[j].pos.x;
          linePositions[s * 6 + 4] = nodes[j].pos.y;
          linePositions[s * 6 + 5] = nodes[j].pos.z;
          s++;
        }
      }
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (linesRef.current) {
      const geo = linesRef.current.geometry;
      geo.attributes.position.needsUpdate = true;
      geo.setDrawRange(0, s * 2);
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={pointPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#9d8cff"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxSegments * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#3aa0ff"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* Background dust */
function Dust({ count = 360 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Rig({ mouse }) {
  useFrame((state) => {
    state.camera.position.x +=
      (mouse.current.x * 0.7 - state.camera.position.x) * 0.04;
    state.camera.position.y +=
      (1 + mouse.current.y * 0.4 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 45 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 4, 5]} intensity={2.4} color="#7c5cff" />
          <pointLight position={[-5, -2, -3]} intensity={2.6} color="#22d3ee" />

          <Core mouse={mouse} />
          <Network count={isMobile ? 32 : 52} />
          <Dust count={isMobile ? 180 : 360} />

          <Grid
            position={[0, -3.4, 0]}
            args={[40, 40]}
            cellSize={0.8}
            cellThickness={0.6}
            cellColor="#1c2342"
            sectionSize={4}
            sectionThickness={1}
            sectionColor="#3a2d7a"
            fadeDistance={isMobile ? 18 : 26}
            fadeStrength={4}
            infiniteGrid
          />

          <Rig mouse={mouse} />

          <EffectComposer enabled={!isMobile}>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.5}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
