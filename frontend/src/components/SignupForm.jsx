import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/images/logo.png"; // Import your logo
import ffe1 from "../assets/images/ffe1.jpg"; // Import your background image

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/data/create", {
        name,
        email,
        contact,
        address: { street, city, zipCode },
        password,
      });
      localStorage.setItem("token", res.data.token);
      if (rememberMe) {
        localStorage.setItem("rememberMe", JSON.stringify({ email, password }));
      }
      setSuccessMessage(res.data.message);
      setErrorMessage("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Signup failed");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/40 backdrop-blur-lg">
      <div className="lg:flex lg:min-h-screen w-full">
        {/* Left side: Form */}
        <div className="flex-1 flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 flex-col">
          <div className="max-w-xl lg:max-w-3xl w-full">
            {/* Logo Section */}
            <div className="flex justify-center mb-6">
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-20 rounded-full border-4 border-yellow-500 shadow-xl transform hover:scale-110 transition duration-300"
              />
            </div>

            <h2 className="text-3xl font-bold text-center text-white mb-6">
              Join the FoodieExpress Community!
            </h2>

            {successMessage && (
              <div className="mb-4 text-green-600">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="mb-4 text-red-600">{errorMessage}</div>
            )}

            <form
              className="bg-black/80 p-10 rounded-2xl shadow-xl w-full"
              onSubmit={handleSubmit}
            >
              {/* Grid layout for large screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-white rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-white rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Contact Number */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">Contact Number</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-white rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>

                {/* Street Address */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">Street Address</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-white rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>

                {/* City */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">City</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-white rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                {/* Zip Code */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">Zip Code</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-white rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>

                {/* Password Field */}
                <div className="mb-6 relative col-span-2">
                  <label className="block text-sm font-medium text-white">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 border border-white rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-3 top-8 cursor-pointer text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                {/* Remember Me */}
                <div className="flex justify-between items-center mb-4 col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="mr-2"
                    />
                    <label className="text-sm text-white">Remember Me</label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-yellow-500 text-black rounded-xl hover:bg-yellow-600 transition duration-300"
              >
                Sign Up
              </button>

              <p className="text-center mt-4 text-white">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-yellow-200 hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* Right side: Image */}
        <div
          className="lg:flex-1 hidden lg:block"
          style={{
            backgroundImage: `url(${ffe1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          {/* Image Section */}
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
