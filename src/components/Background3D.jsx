import React, { useEffect, useRef } from 'react';

export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 3D particles coordinates (X, Y, Z centered around 0)
    const particles = [];
    const particleCount = Math.min(100, Math.floor((width * height) / 10000));
    
    // Virtual 3D viewport parameters
    const fov = 400; // perspective focus distance
    const cx = width / 2;
    const cy = height / 2;

    class Particle3D {
      constructor() {
        // Position particles in a sphere/box volume in 3D space
        this.x3d = (Math.random() - 0.5) * width * 1.5;
        this.y3d = (Math.random() - 0.5) * height * 1.5;
        this.z3d = (Math.random() - 0.5) * fov * 2;
        
        this.radius = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.speedZ = (Math.random() - 0.5) * 0.2;
      }

      update() {
        // Slow float
        this.x3d += this.speedX;
        this.y3d += this.speedY;
        this.z3d += this.speedZ;

        // Boundaries check - wrap around in 3D space
        const limitX = width;
        const limitY = height;
        const limitZ = fov;

        if (this.x3d < -limitX) this.x3d = limitX;
        if (this.x3d > limitX) this.x3d = -limitX;
        if (this.y3d < -limitY) this.y3d = limitY;
        if (this.y3d > limitY) this.y3d = -limitY;
        if (this.z3d < -limitZ) this.z3d = limitZ;
        if (this.z3d > limitZ) this.z3d = -limitZ;
      }

      // Rotate coordinates around Y axis (for scroll response) and X axis (for mouse response)
      getProjected(angleY, angleX) {
        // Rotate on Y axis
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        let x1 = this.x3d * cosY - this.z3d * sinY;
        let z1 = this.x3d * sinY + this.z3d * cosY;

        // Rotate on X axis
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        let y2 = this.y3d * cosX - z1 * sinX;
        let z2 = this.y3d * sinX + z1 * cosX;

        // Push forward so particles don't clip behind camera (z2 + fov > 0)
        const depth = z2 + fov * 1.5;
        
        if (depth <= 0) return null;

        // Perspective Projection
        const scale = fov / depth;
        const x2d = cx + x1 * scale;
        const y2d = cy + y2 * scale;
        const size2d = this.radius * scale;
        
        // Calculate alpha based on depth for realism
        const alpha = Math.min(1.0, scale * 0.7);

        return { x: x2d, y: y2d, size: size2d, alpha, depth };
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle3D());
    }

    // Scroll mapping
    let scrollY = window.scrollY;
    let targetAngleY = 0;
    let currentAngleY = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
      // Convert scroll offset to rotation radians
      targetAngleY = (scrollY / height) * 0.5;
    };
    window.addEventListener('scroll', handleScroll);

    // Mouse mapping
    let mouseX = cx;
    let mouseY = cy;
    let targetAngleX = 0;
    let currentAngleX = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetAngleX = ((mouseY - cy) / cy) * 0.15;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate angles for smooth transition
      currentAngleY += (targetAngleY - currentAngleY) * 0.05;
      currentAngleX += (targetAngleX - currentAngleX) * 0.05;

      // Project all particles
      const projected = [];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        const proj = p.getProjected(currentAngleY, currentAngleX);
        if (proj) {
          projected.push({ index: i, ...proj });
        }
      }

      // Sort by depth (painters algorithm) to render back-to-front
      projected.sort((a, b) => b.depth - a.depth);

      // Render connection lines first
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          
          // Connect particles that are near each other in 3D space
          const dx = particles[p1.index].x3d - particles[p2.index].x3d;
          const dy = particles[p1.index].y3d - particles[p2.index].y3d;
          const dz = particles[p1.index].z3d - particles[p2.index].z3d;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < 160) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Connect opacity based on proximity and projected alpha
            const opacity = (1 - dist3D / 160) * 0.08 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      // Render particles
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * 0.3})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 w-full h-full pointer-events-none bg-[#030712]"
    />
  );
}
