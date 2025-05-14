
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const TShirtModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Load saved model parameters from localStorage
    let modelParams: any;
    try {
      const savedParams = localStorage.getItem('waisatsu-3d-model');
      modelParams = savedParams ? JSON.parse(savedParams) : null;
    } catch (error) {
      console.error('Error loading 3D model params:', error);
      modelParams = null;
    }
    
    // Default parameters if none stored
    if (!modelParams) {
      modelParams = {
        type: 'box',
        color: '#ffffff',
        rotationSpeed: 0.01,
        geometry: {
          width: 2,
          height: 3,
          depth: 0.2
        },
        shininess: 30
      };
    }

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

    // Create geometry based on selected type
    let geometry;
    switch (modelParams.type) {
      case 'torus':
        geometry = new THREE.TorusGeometry(
          modelParams.geometry.radius || 1.5,
          modelParams.geometry.tube || 0.5,
          16, 
          100
        );
        break;
      case 'cylinder':
        geometry = new THREE.CylinderGeometry(
          modelParams.geometry.radiusTop || 1,
          modelParams.geometry.radiusBottom || 1,
          modelParams.geometry.height || 3,
          32
        );
        break;
      case 'box':
      default:
        geometry = new THREE.BoxGeometry(
          modelParams.geometry.width || 2,
          modelParams.geometry.height || 3,
          modelParams.geometry.depth || 0.2
        );
        break;
    }
    
    // Material with texture
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(modelParams.color),
      shininess: modelParams.shininess || 30,
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
    let rotationSpeed = modelParams.rotationSpeed || 0.01;

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
      tshirt.rotation.x += modelParams.rotationX || 0;
      tshirt.rotation.y += modelParams.rotationY || rotationSpeed;
      tshirt.rotation.z += modelParams.rotationZ || 0;
      
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
