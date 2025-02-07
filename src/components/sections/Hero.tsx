'use client';

import Link from 'next/link';
import { Button } from '../ui/Button';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/abdiesu04',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/abdiesayas/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    )
  }
];

const technologies = ['Go', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB'];



const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [displayedTexts, setDisplayedTexts] = useState<string[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const terminalTexts = [
    'class FullStackDeveloper {',
    '  name = "Abdi Esayas";',
    '  role = "Software Engineer";',
    '  location = "Ethiopia";',
    '  skills = {',
    '    frontend: ["React", "Next.js"],',
    '    backend: ["Node", "Go", "Python"],',
    '    database: ["MongoDB", "PostgreSQL"],',
    '    cloud: ["AWS", "Docker"]',
    '  };',
    '',
    '  buildAmazingThings() {',
    '    return Innovation.create({',
    '      clean: true,',
    '      scalable: true,',
    '      beautiful: true',
    '    });',
    '  }',
    '}'
  ];

  useEffect(() => {
    let currentIndex = 0;
    const textInterval = setInterval(() => {
      if (currentIndex < terminalTexts.length) {
        setDisplayedTexts(prev => [...prev, terminalTexts[currentIndex]]);
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(textInterval);
      }
    }, 150); // Faster typing speed

    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    const updateSize = () => {
      if (!container || !canvas) return;
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      setDimensions({ width, height });
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    class Particle {
      x: number;
      y: number;
      speed: number;
      size: number;
      opacity: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
      glowSize: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = 0.2 + Math.random() * 0.3;
        this.size = 1 + Math.random() * 1.5;
        this.opacity = 0.1 + Math.random() * 0.4;
        this.color = Math.random() > 0.6 
          ? 'rgba(16, 185, 129, 0.8)'
          : Math.random() > 0.3 
            ? 'rgba(59, 130, 246, 0.8)'
            : 'rgba(168, 85, 247, 0.8)';
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
        this.glowSize = this.size * 2;
      }

      update(width: number, height: number) {
        this.y += this.speed;
        if (this.y > height) {
          this.y = -10;
          this.x = Math.random() * width;
        }
        this.pulse += this.pulseSpeed;
        this.opacity = (0.1 + Math.sin(this.pulse) * 0.1) + Math.random() * 0.1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.glowSize
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = this.opacity * 0.5;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 17, 32, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, otherParticle.color);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = Math.max(0.05, (1 - distance / 120) * 0.2);
            ctx.lineWidth = Math.max(0.5, (1 - distance / 120) * 2);
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      particles.forEach(particle => {
        if (Math.random() < 0.01) {
          ctx.beginPath();
          const sparkleSize = particle.size * 4;
          ctx.moveTo(particle.x - sparkleSize, particle.y);
          ctx.lineTo(particle.x + sparkleSize, particle.y);
          ctx.moveTo(particle.x, particle.y - sparkleSize);
          ctx.lineTo(particle.x, particle.y + sparkleSize);
          ctx.strokeStyle = particle.color;
          ctx.globalAlpha = particle.opacity * 0.5;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[600px] bg-[#0A1120]/0">
      {/* Creative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-blue-400/5 to-purple-400/5" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
      
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full"
      />

      {/* Terminal overlay with enhanced styling */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="w-[600px] text-left space-y-4 
          bg-gradient-to-br from-[#0D1627]/90 via-[#1A2942]/85 to-[#0D1627]/90 
          p-8 rounded-lg backdrop-blur-lg
          border border-emerald-400/30 
          shadow-[0_0_50px_rgba(16,185,129,0.15),inset_0_0_20px_rgba(16,185,129,0.1)]
          hover:shadow-[0_0_80px_rgba(16,185,129,0.2),inset_0_0_30px_rgba(16,185,129,0.15)] 
          transition-all duration-500
          group">
          {/* Terminal Header */}
          <div className="flex items-center justify-between text-emerald-400/90 font-mono text-sm mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/90 group-hover:bg-red-400 transition-colors duration-300 shadow-lg" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/90 group-hover:bg-yellow-400 transition-colors duration-300 shadow-lg" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/90 group-hover:bg-green-400 transition-colors duration-300 shadow-lg" />
              </div>
              <div className="flex items-center ml-3 text-emerald-400/70">
                <span className="mr-1">~/</span>
                <span className="text-emerald-400/90">abdi-esayas</span>
                <span className="mx-1">/</span>
                <span className="text-blue-400/90">code</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="px-1.5 py-0.5 text-xs rounded-md bg-emerald-400/10 text-emerald-400/90 border border-emerald-400/20">
                TypeScript
              </div>
            </div>
          </div>
          
          {/* Terminal Content with Enhanced Styling */}
          <div className="font-mono text-sm leading-relaxed relative">
            <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-400/0 via-emerald-400/20 to-emerald-400/0" />
            {displayedTexts.map((text, index) => (
              <div 
                key={index} 
                className={`${
                  index === displayedTexts.length - 1 && !isTypingComplete ? 'typing-effect' : ''
                } ${
                  text && typeof text === 'string' ? (
                    text.includes('class') || text.includes('buildAmazingThings') 
                      ? 'text-blue-400/90 font-semibold' 
                      : text.includes('name') || text.includes('role') || text.includes('location')
                      ? 'text-emerald-400/90'
                      : text.includes('skills') || text.includes('return')
                      ? 'text-purple-400/90'
                      : text.includes('frontend') || text.includes('backend') || text.includes('database') || text.includes('cloud')
                      ? 'text-yellow-400/90'
                      : text.includes('true')
                      ? 'text-green-400/90'
                      : 'text-gray-400/90'
                  ) : 'text-gray-400/90'
                }`}
              >
                {text}
              </div>
            ))}
            {/* Blinking cursor at the end */}
            {!isTypingComplete && (
              <div className="inline-block w-2 h-4 ml-1 align-middle bg-emerald-400/90 animate-blink" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
  return (
    <div className="min-h-[90vh] relative overflow-hidden bg-[#0A1120]">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-blue-400/5 to-purple-400/10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1)_0%,transparent_60%)]" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-40 right-40 w-72 h-72 bg-purple-400/10 rounded-full filter blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Rest of the hero content */}
      <div className="max-w-7xl mx-auto h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-8 px-4">
          {/* Left Side - Content */}
          <div className="relative z-20 space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 backdrop-blur-sm">
              <span className="w-1 h-1 rounded-full bg-emerald-400 mr-2" />
              <span className="text-xs font-mono text-emerald-400">Available for opportunities</span>
            </div>

            {/* Name and Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="relative inline-block">
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-white">
                    ABDI ESAYAS
                  </span>
                </span>
              </h1>
              <div className="text-lg text-secondary-dark">
                <span className="relative inline-block">
                  Software Engineer
                </span>
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-full bg-[#1E2D4A] text-secondary-light border border-gray-800 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-secondary-dark hover:text-emerald-400 transition-colors duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* Call to Action */}
            <div className="flex items-center space-x-4">
              <Link href="#projects">
                <Button variant="outline">
                  <span className="relative z-10">View Projects</span>
                  <span className="relative z-10 ml-2 inline-block">→</span>
                </Button>
              </Link>

              <a 
                href="https://flowcv.com/resume/feswa5vi0s" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="bg-emerald-400/10 border-emerald-400/20 hover:bg-emerald-400/20 hover:border-emerald-400/30"
                >
                  <span className="relative z-10">See Resume</span>
                  <span className="relative z-10 ml-2 inline-block">↗</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Side - Code Animation */}
          <div className="relative hidden lg:block h-[600px]">
            <CodeRain />
          </div>
        </div>
      </div>
    </div>
  );
} 