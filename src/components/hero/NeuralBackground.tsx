"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const packetsRef = useRef<THREE.InstancedMesh>(null);

  const nodeCount = 60;
  const packetCount = 15;

  const { positions, velocities, edges, packetData } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const vel = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    // Build edges for close nodes
    const edg: [number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 3.5) {
          edg.push([i, j]);
        }
      }
    }

    // Packet data
    const pData = Array.from({ length: packetCount }, () => ({
      edgeIndex: Math.floor(Math.random() * Math.max(edg.length, 1)),
      t: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
    }));

    return { positions: pos, velocities: vel, edges: edg, packetData: pData };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const packetDummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < nodeCount; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.scale.setScalar(0.04);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  useFrame(() => {
    if (!meshRef.current) return;

    // Update node positions
    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // Soft boundary
      for (let a = 0; a < 3; a++) {
        const limit = a === 0 ? 7 : a === 1 ? 5 : 4;
        if (Math.abs(positions[i * 3 + a]) > limit) {
          velocities[i * 3 + a] *= -1;
        }
      }

      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.scale.setScalar(0.04);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update edges
    if (linesRef.current) {
      const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
      for (let e = 0; e < edges.length; e++) {
        const [a, b] = edges[e];
        linePositions[e * 6] = positions[a * 3];
        linePositions[e * 6 + 1] = positions[a * 3 + 1];
        linePositions[e * 6 + 2] = positions[a * 3 + 2];
        linePositions[e * 6 + 3] = positions[b * 3];
        linePositions[e * 6 + 4] = positions[b * 3 + 1];
        linePositions[e * 6 + 5] = positions[b * 3 + 2];
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Update packets
    if (packetsRef.current && edges.length > 0) {
      for (let p = 0; p < packetCount; p++) {
        const pkt = packetData[p];
        pkt.t += pkt.speed;
        if (pkt.t >= 1) {
          pkt.t = 0;
          pkt.edgeIndex = Math.floor(Math.random() * edges.length);
        }

        const [a, b] = edges[pkt.edgeIndex % edges.length];
        const x = positions[a * 3] + (positions[b * 3] - positions[a * 3]) * pkt.t;
        const y = positions[a * 3 + 1] + (positions[b * 3 + 1] - positions[a * 3 + 1]) * pkt.t;
        const z = positions[a * 3 + 2] + (positions[b * 3 + 2] - positions[a * 3 + 2]) * pkt.t;

        packetDummy.position.set(x, y, z);
        packetDummy.scale.setScalar(0.06);
        packetDummy.updateMatrix();
        packetsRef.current.setMatrixAt(p, packetDummy.matrix);
      }
      packetsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(edges.length * 6);
    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e];
      linePositions[e * 6] = positions[a * 3];
      linePositions[e * 6 + 1] = positions[a * 3 + 1];
      linePositions[e * 6 + 2] = positions[a * 3 + 2];
      linePositions[e * 6 + 3] = positions[b * 3];
      linePositions[e * 6 + 4] = positions[b * 3 + 1];
      linePositions[e * 6 + 5] = positions[b * 3 + 2];
    }
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [edges, positions]);

  return (
    <>
      {/* Nodes */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, nodeCount]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.7} />
      </instancedMesh>

      {/* Edges */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#3B82F6" transparent opacity={0.1} />
      </lineSegments>

      {/* Data Packets */}
      <instancedMesh ref={packetsRef} args={[undefined, undefined, packetCount]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.9} />
      </instancedMesh>
    </>
  );
}

export default function NeuralBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <NeuralNodes />
      </Canvas>
    </div>
  );
}
