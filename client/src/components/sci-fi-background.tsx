import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SciFiBackground() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(66,66,66,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(66,66,66,0.2)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Animated particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-primary/20"
          initial={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Glowing orbs */}
      <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
      <div className="absolute -right-20 top-3/4 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
    </div>
  );
}
