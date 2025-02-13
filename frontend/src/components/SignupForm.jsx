import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
        name, email, contact, address: { street, city, zipCode }, password,
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

		axios
			.post("http://localhost:5173/data/create", {
				name,
				email,
				contact,
				address: { street, city, zipCode },
				password,
			})
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				setSuccessMessage(res.data.message);
				setErrorMessage("");
				console.log(res.data);
			})
			.catch((err) => {
				setErrorMessage(err.response.data.message);
				setSuccessMessage("");
				console.error(err);
			});
	};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
        {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}
        {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input type="text" required className="w-full px-4 py-2 border rounded-lg"
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input type="email" required className="w-full px-4 py-2 border rounded-lg"
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Contact</label>
          <input type="text" required className="w-full px-4 py-2 border rounded-lg"
            value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Street</label>
          <input type="text" required className="w-full px-4 py-2 border rounded-lg"
            value={street} onChange={(e) => setStreet(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">City</label>
          <input type="text" required className="w-full px-4 py-2 border rounded-lg"
            value={city} onChange={(e) => setCity(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Zip Code</label>
          <input type="text" required className="w-full px-4 py-2 border rounded-lg"
            value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input type={showPassword ? "text" : "password"} required
            className="w-full px-4 py-2 border rounded-lg pr-10"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <span className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="mb-4 flex items-center">
          <input type="checkbox" id="rememberMe"
            className="mr-2" checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)} />
          <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember Me</label>
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;