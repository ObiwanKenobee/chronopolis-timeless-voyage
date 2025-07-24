import { useState } from "react";
import { motion } from "framer-motion";
import chronoOrbImage from "@/assets/chrono-orb.jpg";

interface ChronoOrbProps {
  title: string;
  era: string;
  description: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  delay?: number;
}

export const ChronoOrb = ({ 
  title, 
  era, 
  description, 
  onClick, 
  size = "md", 
  delay = 0 
}: ChronoOrbProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="relative group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Main Orb */}
      <motion.div
        className={`cosmic-orb ${sizeClasses[size]} relative overflow-hidden`}
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 360 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          backgroundImage: `url(${chronoOrbImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Energy Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.5, 1, 0.5] : 0.7,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-shimmer" />
      </motion.div>

      {/* Floating Particles */}
      {isHovered && (
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-particle w-2 h-2"
              initial={{ 
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0 
              }}
              animate={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Info Tooltip */}
      <motion.div
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 w-48 text-center"
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.9
        }}
        transition={{ duration: 0.3 }}
      >
        <h4 className="font-futuristic text-primary text-sm font-bold">{title}</h4>
        <p className="text-xs text-secondary font-mythical mb-1">{era}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </motion.div>
    </motion.div>
  );
};