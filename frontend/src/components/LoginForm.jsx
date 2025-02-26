import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import logo from "../assets/images/logo.png"; // Import your logo
import ffe1 from "../assets/images/ffe1.jpg"; // Import your food image
//import form1Animation from "../assets/animations/form1Animation.json";
//import Lottie from "lottie-react";


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
    <section className="bg-black/40 backdrop-blur-lg">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          
        {/* <Lottie
									animationData={form1Animation}
									loop={true}
									autoPlay={true}
									className="w-full h-full"
								/> */}


                < img src= {ffe1} alt = "image" className =  "w-full h-full rounded-2xl object-cover" />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            {/* Logo Section */}
            <div className="flex justify-center mb-4">
              <img
                src={logo}
                alt="Logo"
                className="h-24 w-24 rounded-full border-4 border-[#F97316] shadow-xl transform hover:scale-110 transition duration-300"
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

            <form
              className=" bg-black/80 backdrop-blur-lg  p-10 rounded-2xl shadow-xl w-full"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-[hsl(24,33%,97%)] rounded-xl bg-black/40
                  text-white outline-none focus:ring-2 focus:ring-[rgb(231,228,225)] focus:border-[rgb(250,248,246)]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 border border-[hsl(26,23%,94%)] rounded-xl bg-black/40
                  text-white outline-none focus:ring-2 focus:ring-[rgb(241,239,237)] focus:border-[rgb(252,251,250)] pr-10"
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
                className="w-full py-3 bg-[#f97316] text-white rounded-xl hover:bg-orange-700 
                           transition duration-300 transform hover:scale-105"
              >
                Login
              </button>

              <p className="text-center mt-4 text-white">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="text-[#F97316] hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default LoginForm;
