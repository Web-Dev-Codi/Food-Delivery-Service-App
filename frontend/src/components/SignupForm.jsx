import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import ffe1 from "../assets/images/ffe1.jpg";

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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 bg-black/40 backdrop-blur-lg">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl shadow-xl rounded-2xl overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 bg-black/40">
          <div className="w-full max-w-lg">
            <div className="flex justify-center mb-6">
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-20 rounded-full border-4 border-yellow-500 shadow-xl transform hover:scale-110 transition duration-300"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
              Join the FoodieExpress Community!
            </h2>

            {successMessage && (
              <div className="mb-4 text-green-600">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="mb-4 text-red-600">{errorMessage}</div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  required
                  className="input-field"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  required
                  className="input-field"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="City"
                  required
                  className="input-field"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  required
                  className="input-field"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="input-field pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4"
                />
                <label className="text-white text-sm">Remember Me</label>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#f97316] text-black rounded-xl hover:bg-yellow-600 transition duration-300"
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
        <div
          className="hidden lg:flex lg:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${ffe1})` }}
        ></div>
      </div>
    </div>
  );
}

export default SignupForm;
