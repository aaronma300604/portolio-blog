'use client'; 

import { useEffect } from 'react';
import styles from '@/styles/Particles.module.css';

export default function ParticlesBackground({ children }) {
useEffect(() => {
    const particlesContainer = document.getElementById('particles');
    const numParticles = 75;

    for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = `${styles.particle} ${styles.fall}`;
    
    const size = Math.random() * 2 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.position = 'absolute';
    particle.style.color = Math.random() < 0.4 ? 'var(--br-principal)' : 'var(--particles-fill)'; 

    particlesContainer.appendChild(particle);
    }
}, []);

return (
    <div
    id="particles"
    className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-[0]"
    /> 

);
}
