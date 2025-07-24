import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChronoOrb } from "./ChronoOrb";
import { EnergyBeam } from "./EnergyBeam";
import chronopolisHero from "@/assets/chronopolis-hero.jpg";

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const beamOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const cityScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const textY = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const timelineEvents = [
    {
      title: "Ancient Civilizations",
      era: "3000 BCE",
      description: "The foundation stones of eternal knowledge"
    },
    {
      title: "Medieval Mysticism", 
      era: "1200 CE",
      description: "Gothic spires reaching toward the infinite"
    },
    {
      title: "Renaissance Innovation",
      era: "1500 CE", 
      description: "Art and science merge in perfect harmony"
    },
    {
      title: "Digital Revolution",
      era: "2000 CE",
      description: "Information flows like rivers of light"
    },
    {
      title: "Quantum Future",
      era: "2500 CE",
      description: "Reality bends to consciousness itself"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-cosmic" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-particle w-1 h-1"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main City View */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ scale: cityScale }}
      >
        <div 
          className="relative w-full max-w-6xl h-96 rounded-2xl overflow-hidden dome-effect"
          style={{
            backgroundImage: `url(${chronopolisHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
          }}
        >
          {/* Dome Shimmer */}
          <div className="absolute inset-0 bg-gradient-dome animate-pulse" />
          
          {/* Central Energy Beam */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ opacity: beamOpacity }}
          >
            <EnergyBeam height="600px" intensity="high" />
          </motion.div>
        </div>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4"
        style={{ y: textY }}
      >
        <motion.h1
          className="mythical-heading text-6xl md:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          CHRONOPOLIS
        </motion.h1>
        
        <motion.p
          className="futuristic-text text-xl md:text-2xl text-secondary mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Where Time and Eternity Converge
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <Button variant="chronos" size="xl">
            Enter the City
          </Button>
          <Button variant="ethereal" size="xl">
            Explore Timelines
          </Button>
        </motion.div>

        {/* Timeline Orbs */}
        <motion.div
          className="flex flex-wrap gap-8 justify-center max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {timelineEvents.map((event, index) => (
            <ChronoOrb
              key={event.title}
              title={event.title}
              era={event.era}
              description={event.description}
              delay={1.8 + index * 0.2}
              onClick={() => console.log(`Exploring ${event.title}`)}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-muted-foreground text-sm mb-2">Discover More</p>
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full mx-auto relative">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full absolute left-1/2 top-2 -translate-x-1/2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};