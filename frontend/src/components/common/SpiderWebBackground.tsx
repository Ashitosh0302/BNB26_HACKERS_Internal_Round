import React, { useEffect, useRef } from 'react';
import { useUIStore } from '../../stores/useUIStore';

export const SpiderWebBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isReducedMotion = useUIStore((s) => s.isReducedMotion);

  useEffect(() => {
    if (isReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const nodeCount = Math.floor(Math.min(width, 1400) / 32);
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      glowColor: string;
    }[] = [];

    const colors = [
      { fill: 'rgba(229, 9, 47, 0.7)', glow: 'rgba(229, 9, 47, 0.4)' }, // Spider Red
      { fill: 'rgba(23, 105, 255, 0.7)', glow: 'rgba(23, 105, 255, 0.4)' }, // Electric Blue
      { fill: 'rgba(242, 245, 247, 0.5)', glow: 'rgba(242, 245, 247, 0.2)' } // Web White
    ];

    for (let i = 0; i < nodeCount; i++) {
      const c = colors[i % colors.length];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        color: c.fill,
        glowColor: c.glow
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const maxDistance = 140;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle radial spider glow from mouse
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, 320);
      gradient.addColorStop(0, 'rgba(229, 9, 47, 0.04)');
      gradient.addColorStop(0.5, 'rgba(23, 105, 255, 0.025)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw web strands between close nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(242, 245, 247, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Draw web strands to mouse cursor if close
        const mdx = node.x - mouseX;
        const mdy = node.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          const mAlpha = (1 - mdist / 160) * 0.35;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(229, 9, 47, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = node.glowColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReducedMotion]);

  if (isReducedMotion) {
    return <div className="fixed inset-0 pointer-events-none z-0 web-grid-bg opacity-30" />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full opacity-60" />
      <div className="absolute inset-0 web-grid-bg opacity-20" />
    </div>
  );
};
