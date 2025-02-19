import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
	const [email, setEmail] = useState("");
	const [responseMessage, setResponseMessage] = useState("");

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("https://formspree.io/f/xvgzvrbb", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

      if (response.ok) {
        setResponseMessage({
          ok: true,
          message: "Thanks for subscribing! 🎉", // Success message with emoji
        });
      } else {
        setResponseMessage({
          ok: false,
          message: "Something went wrong. Please try again. ❌", // Error message with emoji
        });
      }
    } catch {
      setResponseMessage({
        ok: false,
        message: "Something went wrong. Please try again. ❌", // Error message with emoji
      });
    }
  };
  
  return (
    <footer className="flex flex-col bg-gradient-to-r from-[#4436BD] via-[#392679] to-[#050913] text-gray-200 text-center py-6">
      <div className="container mx-auto px-6">
        {/* 🚀 Quick Links */}
        <nav className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs sm:text-sm md:text-base font-medium">
          <Link
            to="/dashboard"
            className="hover:text-white transition-all hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="hover:text-white transition-all hover:scale-105"
          >
            Menu
          </Link>
          <Link
            to="/orders"
            className="hover:text-white transition-all hover:scale-105"
          >
            Orders
          </Link>
          <Link
            to="/about"
            className="hover:text-white transition-all hover:scale-105"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-white transition-all hover:scale-105"
          >
            Contact
          </Link>
        </nav>
				{/* 📢 Newsletter Signup */}
				<div className="mt-6">
					<p className="text-sm">
						Subscribe to our newsletter for updates!
					</p>
					<div className="flex justify-center mt-3">
						<input
							type="email"
							placeholder="Enter your email"
							className="px-4 py-2 rounded-l-lg text-white focus:ring-2 focus:ring-[#D84418] outline-none"
							value={email}
							onChange={handleEmailChange}
						/>
						<button
							onClick={handleSubmit}
							className="bg-gray-900 hover:bg-[#D84418] px-4 py-2 rounded-r-lg transition-all">
							Subscribe
						</button>
					</div>
				</div>
        {/* Display success or error message */}
        {responseMessage && (
          <p
            className={`mt-3 text-sm font-bold flex items-center justify-center ${
              responseMessage.ok ? "text-green-500" : "text-red-500"
            }`}
          >
            <span className="text-lg">{responseMessage.ok ? "🎉" : "❌"}</span>
            <span className="ml-2">{responseMessage.message}</span>
          </p>
        )}

				{/* 🔗 Social Media Icons */}
				<div className="flex justify-center space-x-6 mt-4">
					<a
						href="#"
						className="text-2xl hover:text-white transition-all hover:scale-110">
						<FaFacebookF />
					</a>
					<a
						href="#"
						className="text-2xl hover:text-white transition-all hover:scale-110">
						<FaTwitter />
					</a>
					<a
						href="#"
						className="text-2xl hover:text-white transition-all hover:scale-110">
						<FaInstagram />
					</a>
				</div>

				{/* 📄 Copyright */}
				<p className="mt-4 text-xs">
					© {new Date().getFullYear()} FoodDelivery. All rights
					reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
