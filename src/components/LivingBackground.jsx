import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './LivingBackground.css';

export default function LivingBackground() {
    const mountRef = useRef(null);

    useEffect(() => {
        let animationFrameId;
        const currentMount = mountRef.current;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = null; // Important: Make scene background transparent so it blends if needed, but since it's the back layer, black is fine too. Let's force black over standard `#050505`. Actually, user asked for Pure black environment (#000000).
        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.FogExp2(0x000000, 0.0012); // Slightly less dense fog

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 300;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance
        currentMount.appendChild(renderer.domElement);

        // Particles system
        const particleCount = 200; // not too many to keep it clean and performant
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 800; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 800; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 500; // z

            velocities.push({
                x: (Math.random() - 0.5) * 0.2, // very slow
                y: (Math.random() - 0.5) * 0.2,
                z: (Math.random() - 0.5) * 0.2
            });
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Create glowing points
        const pMaterial = new THREE.PointsMaterial({
            color: 0xff003c,
            size: 4, // Intentionally raised
            transparent: true,
            opacity: 1, // Full opacity for red dots 
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particles, pMaterial);
        scene.add(particleSystem);

        // Lines for connecting points (energy web)
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xff003c,
            transparent: true,
            opacity: 0.4, // Higher opacity so the red lines are clearly visible
            blending: THREE.AdditiveBlending
        });

        const linesGeometry = new THREE.BufferGeometry();
        // Safe upper bound for full connections
        const linePositions = new Float32Array(particleCount * particleCount * 6);
        linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
        scene.add(linesMesh);

        // Interaction state
        const pointer = new THREE.Vector2(9999, 9999);
        const targetPointer = new THREE.Vector2(9999, 9999);
        let isPulsing = false;
        let pulseRadius = 0;

        const onPointerMove = (event) => {
            targetPointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            targetPointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const onClick = () => {
            isPulsing = true;
            pulseRadius = 0;
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('click', onClick);

        const raycaster = new THREE.Raycaster();
        const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

        // Animation loop
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Smooth pointer follow
            pointer.x += (targetPointer.x - pointer.x) * 0.05;
            pointer.y += (targetPointer.y - pointer.y) * 0.05;

            // Get pointer 3D position
            raycaster.setFromCamera(pointer, camera);
            const pointer3D = new THREE.Vector3();
            raycaster.ray.intersectPlane(mousePlane, pointer3D);

            const positionsAttr = particles.getAttribute('position');
            const posArray = positionsAttr.array;

            let vertexpos = 0;
            let numConnected = 0;

            const maxConnectionDistance = 140; // Increased radius to ensure a visible web

            // Handle Pulse
            if (isPulsing) {
                pulseRadius += 8;
                if (pulseRadius > 500) isPulsing = false;
            }

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                let px = posArray[i3];
                let py = posArray[i3 + 1];
                let pz = posArray[i3 + 2];

                const vel = velocities[i];
                px += vel.x;
                py += vel.y;
                pz += vel.z;

                // Bounds wrap
                if (px < -400 || px > 400) vel.x *= -1;
                if (py < -400 || py > 400) vel.y *= -1;
                if (pz < -250 || pz > 250) vel.z *= -1;

                // Mouse interaction - bend lines (repel slightly)
                const dx = pointer3D.x - px;
                const dy = pointer3D.y - py;
                const distSq = dx * dx + dy * dy;

                if (distSq < 25000 && pointer3D.z !== undefined) {
                    const force = (25000 - distSq) / 25000;
                    vel.x -= dx * force * 0.0005;
                    vel.y -= dy * force * 0.0005;
                }

                // Pulse interaction
                if (isPulsing) {
                    const distFromCenter = Math.sqrt(dx * dx + dy * dy);
                    if (Math.abs(distFromCenter - pulseRadius) < 40) {
                        vel.x -= dx * 0.002;
                        vel.y -= dy * 0.002;
                    }
                }

                // Friction / restore velocity slightly to avoid exploding speeds
                vel.x *= 0.99;
                vel.y *= 0.99;
                vel.z *= 0.99;

                // Add soft baseline random motion to prevent them from eventually stopping fully
                vel.x += (Math.random() - 0.5) * 0.01;
                vel.y += (Math.random() - 0.5) * 0.01;
                vel.z += (Math.random() - 0.5) * 0.01;

                posArray[i3] = px;
                posArray[i3 + 1] = py;
                posArray[i3 + 2] = pz;

                // Check connections
                for (let j = i + 1; j < particleCount; j++) {
                    const j3 = j * 3;
                    const jx = posArray[j3];
                    const jy = posArray[j3 + 1];
                    const jz = posArray[j3 + 2];

                    const dX = px - jx;
                    const dY = py - jy;
                    const dZ = pz - jz;
                    const dSq = dX * dX + dY * dY + dZ * dZ;

                    if (dSq < maxConnectionDistance * maxConnectionDistance) {
                        linePositions[vertexpos++] = px;
                        linePositions[vertexpos++] = py;
                        linePositions[vertexpos++] = pz;

                        linePositions[vertexpos++] = jx;
                        linePositions[vertexpos++] = jy;
                        linePositions[vertexpos++] = jz;
                        numConnected++;
                    }
                }
            }

            positionsAttr.needsUpdate = true;
            linesGeometry.setDrawRange(0, numConnected * 2);
            linesGeometry.attributes.position.needsUpdate = true;

            // Rotate the entire system very slowly for that heavy, atmospheric feel
            particleSystem.rotation.y += 0.0005;
            linesMesh.rotation.y += 0.0005;

            renderer.render(scene, camera);
        };

        animate();

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('click', onClick);
            cancelAnimationFrame(animationFrameId);
            currentMount.removeChild(renderer.domElement);
            // Dispose geometries and materials
            particles.dispose();
            pMaterial.dispose();
            linesGeometry.dispose();
            lineMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="living-background-container" ref={mountRef} aria-hidden="true" />
    );
}
