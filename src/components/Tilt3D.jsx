import React, { useRef, useState } from 'react';

export default function Tilt3D({ children, className = '' }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    setIsHovered(true);
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Limits tilting to max 10 degrees on hover
    const angleX = (yc - y) / 10; 
    const angleY = (x - xc) / 10; 
    
    el.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.boxShadow = `0 15px 30px rgba(59, 130, 246, 0.15)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    setIsHovered(false);
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    el.style.boxShadow = `none`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${isHovered ? '' : 'transition-all duration-500 ease-out'} will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
