import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import logo from "../assets/images/logo.png"; // Import your logo

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/data/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setSuccessMessage(res.data.message);
      setErrorMessage("");

      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      if (res.data.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Login failed");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#220b04]">
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 border border-orange-400 rounded-xl bg-[#ff6f00] 
             text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            required
            className="w-full px-4 py-3 border border-orange-400 rounded-xl bg-[#ff6f00] 
             text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2 custom-checkbox"
            />
            <label className="text-sm text-white">Remember Me</label>
          </div>

          <button
            type="button"
            className="text-sm text-white hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 text-black rounded-xl hover:bg-yellow-600 
                     transition duration-300 transform hover:scale-105"
        >
          Login
        </button>

        <p className="text-center mt-4 text-white">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="text-yellow-200 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
