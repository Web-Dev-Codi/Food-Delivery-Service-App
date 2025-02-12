import { motion } from "framer-motion";
import { gradientBg } from "../../assets";

export const GradientBg = () => {
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
      className="absolute inset-0 -translate-x-[25%] -translate-y-[5%] w-[70vw] h-[70vw] opacity-60 mix-blend-color-dodge pointer-events-none"
    >
      <div className="absolute top-1/2 left-1/2 w-[58.85rem] h-[58.85rem] -translate-x-3/4 -translate-y-1/2">
        <img
          className="w-full"
          src={gradientBg}
          width={942}
          height={942}
          alt="Gradient Background"
        />
      </div>
    </motion.div>
  );
};
