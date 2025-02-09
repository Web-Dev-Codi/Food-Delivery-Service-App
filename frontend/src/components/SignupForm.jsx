import { useState } from "react";
import axios from "axios";

function SignupForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [password, setPassword] = useState("");
	const [successMessage, setSuccessMessage] = useState(""); // State for success message
	const [errorMessage, setErrorMessage] = useState(""); // State for error message

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ name, email, contact, street, city, zipCode, password });


		axios
			.post("http://localhost:8000/data/create", {
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
			<form
				className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
				onSubmit={handleSubmit}>
				<h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
					Sign Up
				</h2>
				{/* Display Success or Error Messages */}
				{successMessage && (
					<div className="mb-4 text-green-600">{successMessage}</div>
				)}
				{errorMessage && (
					<div className="mb-4 text-red-600">{errorMessage}</div>
				)}

				<div className="mb-4">
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-600">
						Name
					</label>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-600">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-600">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="contact"
						className="block text-sm font-medium text-gray-600">
						Contact Number
					</label>
					<input
						type="text"
						id="contact"
						name="contact"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={contact}
						onChange={(e) => setContact(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="street"
						className="block text-sm font-medium text-gray-600">
						Street
					</label>
					<input
						type="text"
						id="street"
						name="street"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={street}
						onChange={(e) => setStreet(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="city"
						className="block text-sm font-medium text-gray-600">
						City
					</label>
					<input
						type="text"
						id="city"
						name="city"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="state"
						className="block text-sm font-medium text-gray-600">
						State
					</label>
					<input
						type="text"
						id="state"
						name="state"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={state}
						onChange={(e) => setState(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="zipCode"
						className="block text-sm font-medium text-gray-600">
						Zip Code
					</label>
					<input
						type="text"
						id="zipCode"
						name="zipCode"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={zipCode}
						onChange={(e) => setZipCode(e.target.value)}
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-600">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignupForm;
