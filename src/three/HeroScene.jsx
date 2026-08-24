import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Grid } from "@react-three/drei";
import * as THREE from "three";

function Core({ mouse }) {
  const group = useRef();
  const wire = useRef();
  const outer = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y +=
        delta * 0.12 + (mouse.current.x * 0.35 - group.current.rotation.y) * 0.02;
      group.current.rotation.x +=
        (mouse.current.y * 0.25 - group.current.rotation.x) * 0.02;
    }
    if (wire.current) wire.current.rotation.z = t * 0.2;
    if (outer.current) {
      outer.current.rotation.y = -t * 0.14;
      outer.current.rotation.x = t * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Icosahedron args={[1.05, 1]}>
        <meshBasicMaterial color="#16122a" />
      </Icosahedron>
      <Icosahedron ref={wire} args={[1.32, 1]}>
        <meshBasicMaterial color="#7c5cff" wireframe />
      </Icosahedron>
      <Icosahedron ref={outer} args={[1.85, 0]}>
        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.4}
        />
      </Icosahedron>
    </group>
  );
}

/* Lightweight constellation — squared distance, throttled line rebuild */
function Network({ count = 24 }) {
  const pointsRef = useRef();
  const linesRef = useRef();
  const frame = useRef(0);
  const thresholdSq = 6.25; // 2.5²

  const bounds = useMemo(() => ({ x: 5.5, y: 3.2, z: 2.8 }), []);
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * bounds.x * 2,
        y: (Math.random() - 0.5) * bounds.y * 2,
        z: (Math.random() - 0.5) * bounds.z * 2,
        vx: (Math.random() - 0.5) * 0.005,
        vy: (Math.random() - 0.5) * 0.005,
        vz: (Math.random() - 0.5) * 0.005,
      });
    }
    return arr;
  }, [count, bounds]);

  const pointPositions = useMemo(() => new Float32Array(count * 3), [count]);
  const maxSegments = count * 4;
  const linePositions = useMemo(
    () => new Float32Array(maxSegments * 2 * 3),
    [maxSegments]
  );

  useFrame(() => {
    frame.current += 1;
    const rebuildLines = frame.current % 3 === 0;

    for (let i = 0; i < count; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      n.z += n.vz;
      if (n.x > bounds.x || n.x < -bounds.x) n.vx *= -1;
      if (n.y > bounds.y || n.y < -bounds.y) n.vy *= -1;
      if (n.z > bounds.z || n.z < -bounds.z) n.vz *= -1;
      pointPositions[i * 3] = n.x;
      pointPositions[i * 3 + 1] = n.y;
      pointPositions[i * 3 + 2] = n.z;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (!rebuildLines || !linesRef.current) return;

    let s = 0;
    for (let i = 0; i < count && s < maxSegments; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < count && s < maxSegments; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        if (dx * dx + dy * dy + dz * dz < thresholdSq) {
          const o = s * 6;
          linePositions[o] = a.x;
          linePositions[o + 1] = a.y;
          linePositions[o + 2] = a.z;
          linePositions[o + 3] = b.x;
          linePositions[o + 4] = b.y;
          linePositions[o + 5] = b.z;
          s++;
        }
      }
    }

    const geo = linesRef.current.geometry;
    geo.attributes.position.needsUpdate = true;
    geo.setDrawRange(0, s * 2);
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
          size={0.06}
          color="#9d8cff"
          transparent
          opacity={0.85}
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
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function Dust({ count = 100 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.015;
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
        size={0.028}
        color="#ffffff"
        transparent
        opacity={0.35}
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
      (mouse.current.x * 0.55 - state.camera.position.x) * 0.035;
    state.camera.position.y +=
      (1 + mouse.current.y * 0.3 - state.camera.position.y) * 0.035;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(true);
  const [isMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches
  );
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduceMotion) return undefined;

    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    const hero = document.getElementById("hero");
    const sync = () => {
      const inView =
        !document.hidden &&
        (!hero ||
          hero.getBoundingClientRect().bottom > 80);
      setActive(inView);
    };

    const obs = hero
      ? new IntersectionObserver(
          ([entry]) => setActive(entry.isIntersecting && !document.hidden),
          { rootMargin: "80px 0px", threshold: 0 }
        )
      : null;

    if (hero && obs) obs.observe(hero);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", sync);
      obs?.disconnect();
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return <div className="hero-canvas hero-canvas-static" aria-hidden="true" />;
  }

  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 45 }}
        dpr={isMobile ? 1 : [1, 1.25]}
        frameloop={active ? "always" : "never"}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <Core mouse={mouse} />
          <Network count={isMobile ? 16 : 24} />
          <Dust count={isMobile ? 60 : 100} />
          <Grid
            position={[0, -3.4, 0]}
            args={[24, 24]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#1c2342"
            sectionSize={4}
            sectionThickness={0.9}
            sectionColor="#3a2d7a"
            fadeDistance={isMobile ? 14 : 20}
            fadeStrength={4}
            infiniteGrid={false}
          />
          <Rig mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
