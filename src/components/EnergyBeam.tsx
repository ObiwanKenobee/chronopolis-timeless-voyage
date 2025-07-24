import { motion } from "framer-motion";
import energyBeamImage from "@/assets/energy-beam.jpg";

interface EnergyBeamProps {
  height?: string;
  intensity?: "low" | "medium" | "high";
  animated?: boolean;
}

export const EnergyBeam = ({ 
  height = "400px", 
  intensity = "medium", 
  animated = true 
}: EnergyBeamProps) => {
  const intensityClasses = {
    low: "opacity-60",
    medium: "opacity-80", 
    high: "opacity-100"
  };

  return (
    <div className="relative flex justify-center">
      {/* Main Beam */}
      <motion.div
        className={`energy-beam w-8 relative ${intensityClasses[intensity]}`}
        style={{ 
          height,
          backgroundImage: `url(${energyBeamImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y"
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ 
          scaleY: 1, 
          opacity: 1,
          backgroundPositionY: animated ? ["0%", "100%"] : "0%"
        }}
        transition={{ 
          scaleY: { duration: 1.5, ease: "easeOut" },
          opacity: { duration: 1, delay: 0.5 },
          backgroundPositionY: { 
            duration: 3, 
            repeat: Infinity, 
            ease: "linear" 
          }
        }}
      >
        {/* Core Light */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-secondary/30 to-cosmic/20 blur-sm" />
        
        {/* Energy Pulses */}
        {animated && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-x-0 h-8 bg-gradient-to-r from-transparent via-energy/60 to-transparent"
                animate={{
                  y: ["-2rem", height],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "linear"
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Side Emanations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-12 bg-gradient-to-t from-primary/40 to-transparent"
            style={{
              transformOrigin: "bottom center",
              transform: `rotate(${i * 45}deg) translateY(-24px)`,
            }}
            animate={{
              scaleY: animated ? [0.5, 1, 0.5] : 1,
              opacity: animated ? [0.3, 0.8, 0.3] : 0.5,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};