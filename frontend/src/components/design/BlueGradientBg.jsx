import { motion } from "framer-motion";

export const BlueGradientBg = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0.6 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="absolute top-0 left-0 w-[100vw] h-[50vw] 
                 -translate-x-1/2 -translate-y-1/2 
                 bg-radial-gradient from-blue-500 to-blue-300/40 
                 pointer-events-none backdrop-blur-3xl mix-blend-lighten z-0"
    />
  );
};
