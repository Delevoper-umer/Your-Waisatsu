
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const TShirtModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a0a0a');

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create a simple t-shirt model (placeholder)
    const geometry = new THREE.BoxGeometry(2, 3, 0.2);
    
    // Material with texture
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 30,
    });

    const tshirt = new THREE.Mesh(geometry, material);
    scene.add(tshirt);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Simple rotation instead of OrbitControls
    let rotationSpeed = 0.01;

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the t-shirt
      tshirt.rotation.y += rotationSpeed;
      
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        try {
          containerRef.current.removeChild(renderer.domElement);
        } catch (e) {
          console.error("Could not remove renderer:", e);
        }
        
        // Dispose of Three.js resources
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      }
    };
  }, []);

  return <div ref={containerRef} className="h-[400px] md:h-[600px] w-full" />;
};

export default TShirtModel;
