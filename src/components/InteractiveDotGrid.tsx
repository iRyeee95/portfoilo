import React, { useRef, useEffect } from 'react';

interface Dot {
  targetX: number;
  targetY: number;
  cx: number;
  cy: number;
  vx: number;
  vy: number;
}

export default function InteractiveDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Fit layout to parent container
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Initialize Dot Grid
      const gap = 24; // spacing between dots
      const cols = Math.floor(rect.width / gap) + 1;
      const rows = Math.floor(rect.height / gap) + 1;
      
      const dots: Dot[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * gap + (rect.width % gap) / 2;
          const y = r * gap + (rect.height % gap) / 2;
          dots.push({
            targetX: x,
            targetY: y,
            cx: x,
            cy: y,
            vx: 0,
            vy: 0
          });
        }
      }
      dotsRef.current = dots;
    };

    handleResize();

    // Resize observer for highly accurate layout fits
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(containerRef.current);
    } else {
      window.addEventListener('resize', handleResize);
    }

    // Global document mousemove so we catch the hover position even outside exact coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
      pointerRef.current.active = true;
    };

    const handleMouseLeave = () => {
      pointerRef.current.active = false;
      pointerRef.current.x = -1000;
      pointerRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let animationFrameId: number;
    const proximity = 140; // Proximity threshold for hover effects

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

      const { x: px, y: py, active: pActive } = pointerRef.current;
      const dots = dotsRef.current;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        // Physics update
        let dx = dot.cx - px;
        let dy = dot.cy - py;
        let distSq = dx * dx + dy * dy;
        let dist = Math.sqrt(distSq);

        if (pActive && dist < proximity) {
          // Push force away from pointer
          const force = (proximity - dist) / proximity;
          const angle = Math.atan2(dy, dx);
          // Apply gentle acceleration push
          dot.vx += Math.cos(angle) * force * 1.5;
          dot.vy += Math.sin(angle) * force * 1.5;
        }

        // Elastic hook force pulling dot back to home
        const springK = 0.06;
        const ax = (dot.targetX - dot.cx) * springK;
        const ay = (dot.targetY - dot.cy) * springK;
        
        dot.vx += ax;
        dot.vy += ay;

        // Friction damping
        const damping = 0.85;
        dot.vx *= damping;
        dot.vy *= damping;

        // Apply velocities
        dot.cx += dot.vx;
        dot.cy += dot.vy;

        // Visual layout render
        // Compute visual fade based on mouse proximity
        let alpha = 0.05; // very transparent when idle as requested
        let colorStr = 'rgba(220, 220, 220, 0.08)';
        let radius = 1.5;

        if (pActive && dist < proximity) {
          const factor = (proximity - dist) / proximity; // 0 to 1
          alpha = 0.05 + factor * 0.95; // Scale up to 1
          
          // Interpolate color from pure white (255, 255, 255) to bright #E1FF39 (225, 255, 57)
          const r = Math.round(255 + (225 - 255) * factor);
          const g = Math.round(255 + (255 - 255) * factor);
          const b = Math.round(255 + (57 - 255) * factor);
          
          colorStr = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          radius = 1.5 + factor * 2; // slightly grow dynamic size for extra juice
        } else {
          // Idle state - extremely low opacity, neutral-ambient
          colorStr = 'rgba(220, 220, 220, 0.08)';
        }

        ctx.beginPath();
        ctx.arc(dot.cx, dot.cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = colorStr;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="block opacity-100 transition-opacity duration-300"
      />
    </div>
  );
}
