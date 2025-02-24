import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/images/logo.png"; // Import logo

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
    <div className="min-h-screen flex items-center justify-center bg-[#341206]">
      <form className="bg-[#ff8f00] p-10 rounded-2xl shadow-xl w-full max-w-md" onSubmit={handleSubmit}>
        
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="h-24 w-24 rounded-full border-4 border-yellow-500 shadow-xl transform hover:scale-110 transition duration-300"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome to FoodieExpress!
        </h2>

        {successMessage && (
          <div className="mb-4 text-green-600">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-600">{errorMessage}</div>
        )}

        {[
          { label: "Name", value: name, setter: setName },
          { label: "Email", value: email, setter: setEmail, type: "email" },
          { label: "Contact", value: contact, setter: setContact },
          { label: "Street", value: street, setter: setStreet },
          { label: "City", value: city, setter: setCity },
          { label: "Zip Code", value: zipCode, setter: setZipCode },
        ].map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-sm font-medium text-white">{field.label}</label>
            <input
              type={field.type || "text"}
              required
              className="w-full px-4 py-3 border border-orange-400 rounded-xl bg-[#ff6f00] text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
            />
          </div>
        ))}

        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-white">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            required
            className="w-full px-4 py-3 border border-orange-400 rounded-xl bg-[#ff6f00] text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="absolute right-3 top-9 cursor-pointer text-white" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="flex justify-between items-center mb-4">
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

        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 text-black rounded-xl hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
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
  );
}

export default SignupForm;
