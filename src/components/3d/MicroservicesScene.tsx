'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MicroservicesScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cleanup: () => void;
  }>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create load balancer (octahedron)
    const loadBalancerGeometry = new THREE.OctahedronGeometry(0.8);
    const loadBalancerMaterial = new THREE.MeshStandardMaterial({
      color: 0x10B981,
      transparent: true,
      opacity: 0.7,
      metalness: 0.8,
      roughness: 0.2,
    });
    const loadBalancer = new THREE.Mesh(loadBalancerGeometry, loadBalancerMaterial);
    loadBalancer.position.set(0, 0, 0);
    scene.add(loadBalancer);

    // Create servers
    const serverPositions = [
      [-3, 0, -2],
      [-1, 0, -2],
      [1, 0, -2]
    ];

    serverPositions.forEach(([x, y, z]) => {
      const serverGeometry = new THREE.BoxGeometry(1, 1.5, 1);
      const serverMaterial = new THREE.MeshStandardMaterial({
        color: 0x10B981,
        transparent: true,
        opacity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
      });
      const server = new THREE.Mesh(serverGeometry, serverMaterial);
      server.position.set(x, y, z);
      scene.add(server);
    });

    // Create message broker
    const brokerGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
    const brokerMaterial = new THREE.MeshStandardMaterial({
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.7,
      metalness: 0.8,
      roughness: 0.2,
    });
    const messageBroker = new THREE.Mesh(brokerGeometry, brokerMaterial);
    messageBroker.position.set(3, 0, -2);
    scene.add(messageBroker);

    // Create static connection lines
    const connectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0x10B981,
      opacity: 0.3,
      transparent: true
    });

    // Add lines from load balancer to servers
    serverPositions.forEach(([x, y, z]) => {
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, connectionMaterial);
      scene.add(line);
    });

    // Add lines from servers to message broker
    serverPositions.forEach(([x, y, z]) => {
      const points = [
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(3, 0, -2)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ 
        color: 0x3B82F6,
        opacity: 0.3,
        transparent: true
      }));
      scene.add(line);
    });

    // Position camera
    camera.position.z = 10;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);

    // Render once
    renderer.render(scene, camera);

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      cleanup: () => {
        renderer.dispose();
        containerRef.current?.removeChild(renderer.domElement);
      }
    };

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      sceneRef.current?.cleanup();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="h-[600px] w-full bg-[#0A1120]"
    />
  );
} 