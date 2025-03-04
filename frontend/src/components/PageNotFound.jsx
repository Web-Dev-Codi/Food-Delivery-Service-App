import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundImage from '../assets/images/backgroundImage.jpg';  // Your background image path
import scooterImage from '../assets/images/scooterImage.png';  // Your downloaded scooter image path

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100 p-6 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)' // More transparent
      }}
    >

      {/* Wave Animation for Scooter */}
      <motion.img
        src={scooterImage}  // Your custom scooter image path
        alt="Delivery Scooter"
        className="absolute bottom-20 h-48"  // Adjust size as needed
        initial={{ x: "-100vw", y: 0 }}  // Initial position off-screen to the left
        animate={{
          x: ["-100vw", "100vw"],  // Move the scooter from left to right
          y: ["0", "-50px", "0", "50px", "0"],  // Make the scooter move up and down in a wave pattern
        }}
        transition={{
          duration: 10,  // Duration for one cycle (adjust for speed)
          ease: "easeInOut",  // Smooth easing for the movement
          repeat: Infinity,  // Repeat the animation indefinitely
          repeatType: "loop",  // Continues looping after one complete movement
        }}
      />

      {/* 404 Text with 3D Rotation Effect */}
      <motion.h1
        className="text-9xl font-bold text-red-500 mb-4 drop-shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        whileHover={{ rotateY: 180 }}  // Flip the 404 on hover (rotation effect)
      >
        404
      </motion.h1>

      {/* Oops! Delivery Got Lost Text with Hover Effect */}
      <motion.h2
        className="text-6xl font-semibold text-red-500 mb-2"
        whileHover={{ scale: 1.1, color: "#FF6347" }}  // Hover effect with color change
        transition={{ type: "spring", stiffness: 300 }}
      >
        Oops! This Page is Off the Menu! 🍤🥢 🛵
      </motion.h2>

      <p className="text-white-600 text-lg text-center mb-6 max-w-md">
        Looks like you’ve taken a wrong turn we can&apos;t find the page you&apos;re looking for. But don’t worry, delicious food is still just a tap away!
      </p>
      <p className="text-white-800 font-semibold mb-8">
      Stay hungry for <span className="text-green-500">Mexican 🌮, Indian 🍛, Chinese 🥡, or Thai 🍜?</span><p className="text-white-600 text-lg text-center mb-6">
         we’re always cooking up something amazing! 🔪🍽🔥
      </p>
      </p>


      {/* Animated Button with Glowing Hover Effect */}
      <motion.div
        whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255, 99, 71, 0.8)" }}  // Glowing effect
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Link
          to="/"
          className="mt-16 px-8 py-3 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition"
        >
          🍽 Return to Home
        </Link>
      </motion.div>
    </div>
  );
}
