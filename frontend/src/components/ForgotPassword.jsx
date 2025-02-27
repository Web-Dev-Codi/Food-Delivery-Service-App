import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png"; // ✅ Import logo
import foodBoy1 from "../assets/animations/foodBoy1.json";
import Lottie from "lottie-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/forgot-password",
        { email }
      );
      setMessage(response.data.message);
      setErrorMessage("");
    } catch (err) {
      console.error("Forgot password error details:", err);
      setErrorMessage(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setMessage("");
    }
  };

  return (
    <section className="bg-black/40  to-[#F44F00] min-h-screen flex items-center justify-center">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 w-full px-4 md:px-8">
        <aside className="relative block h-64 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Lottie
            animationData={foodBoy1}
            loop={true}
            autoPlay={true}
            className="w-full h-full hidden md:block"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl w-full">
            {/* Logo Section */}
            <div className="flex justify-center mb-4">
              <img
                src={logo}
                alt="Logo"
                className="h-24 w-24 rounded-full border-4 border-[#fffff] shadow-xl transform hover:scale-110 transition duration-300"
              />
            </div>

            <h2 className="text-3xl font-bold text-center text-white mb-6">
              Forgot Your Password?
            </h2>

            {message && (
              <div className="mb-4 text-green-600">{message}</div>
            )}
            {errorMessage && (
              <div className="mb-4 text-red-600">{errorMessage}</div>
            )}

            <form
              className="bg-black/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-[hsl(24,33%,97%)] rounded-xl bg-black/40 text-white outline-none focus:ring-2  focus:border-[#FFFFF]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FF5733] text-white rounded-xl hover:bg-[#E74C3C] transition duration-300 transform hover:scale-105"
              >
                Send Reset Link
              </button>

              <p className="text-center mt-4 text-white">
                Remember your password?{" "}
                <button
                  type="button"
                  className="text-[#FF5733] hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default ForgotPassword;
