import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "The Dome", href: "#dome" },
    { name: "Landmarks", href: "#landmarks" },
    { name: "Chrono Orbs", href: "#orbs" },
    { name: "Chrono-Forge", href: "#forge" },
    { name: "About", href: "#about" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/10 border-b border-border/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="text-2xl font-mythical font-bold"
          whileHover={{ scale: 1.05 }}
        >
          <span className="mythical-heading">CHRONOPOLIS</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 futuristic-text relative group"
              whileHover={{ scale: 1.05 }}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button variant="energy" size="sm">
            Enter the Forge
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-6 h-6 relative">
            <motion.span
              className="absolute top-0 left-0 w-full h-0.5 bg-primary transform origin-center transition-all duration-300"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0,
              }}
            />
            <motion.span
              className="absolute top-2 left-0 w-full h-0.5 bg-primary transition-all duration-300"
              animate={{ opacity: isOpen ? 0 : 1 }}
            />
            <motion.span
              className="absolute top-4 left-0 w-full h-0.5 bg-primary transform origin-center transition-all duration-300"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0,
              }}
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 pb-4 space-y-4 bg-background/20 backdrop-blur-sm border-t border-border/20">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="block text-foreground/80 hover:text-primary transition-colors duration-300 futuristic-text py-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
            transition={{ delay: navItems.length * 0.1 }}
          >
            <Button variant="energy" size="sm" className="w-full">
              Enter the Forge
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
};