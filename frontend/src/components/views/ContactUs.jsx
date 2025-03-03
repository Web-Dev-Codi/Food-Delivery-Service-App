import { useState } from "react";

const ContactUs = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		message: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log("Form submitted:", formData);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div className="bg-transparent py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				{/* Header Section */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-[#D84418] to-[#FF6B6B] bg-clip-text text-transparent">
						Contact Us
					</h1>
					<p className="text-gray-400 max-w-2xl mx-auto">
						We&apos;re here to help! Whether you have questions
						about your order, need assistance with delivery, or want
						to provide feedback about our service, our support team
						is ready to assist you. For the fastest response, please
						choose the most relevant option below to reach our
						dedicated team members
					</p>
				</div>

				{/* Contact Form */}
				<div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-lg  rounded-xl shadow-lg p-6 sm:px-6 lg:px-8 border border-[#D84418]">
					<form
						onSubmit={handleSubmit}
						className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label
									htmlFor="firstName"
									className="block text-sm font-medium text-gray-300">
									First Name
								</label>
								<input
									type="text"
									name="firstName"
									id="firstName"
									value={formData.firstName}
									onChange={handleChange}
									className="mt-1 p-2 block w-full rounded-md bg-transparent border border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label
									htmlFor="lastName"
									className="block text-sm font-medium text-gray-300">
									Last Name
								</label>
								<input
									type="text"
									name="lastName"
									id="lastName"
									value={formData.lastName}
									onChange={handleChange}
									className="mt-1 p-2 block w-full rounded-md bg-transparent border border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-300">
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									value={formData.email}
									onChange={handleChange}
									className="mt-1 p-2 block w-full rounded-md bg-transparent border border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
									placeholder="support@ffe.com"
								/>
							</div>
							<div>
								<label
									htmlFor="phoneNumber"
									className="block text-sm font-medium text-gray-300">
									Phone Number
								</label>
								<input
									type="tel"
									name="phoneNumber"
									id="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									className="mt-1 p-2 block w-full rounded-md bg-transparent border border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring	-blue-500"
									placeholder="+49 30 1234567"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-gray-300">
								Your message
							</label>
							<textarea
								name="message"
								id="message"
								rows={4}
								value={formData.message}
								onChange={handleChange}
								className="mt-1 p-2 block w-full rounded-md bg-transparent border border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
								placeholder="Leave a comment..."
							/>
						</div>

						<div className="text-sm text-gray-400">
							By submitting this form you agree to our{" "}
							<a
								href="/terms"
								className="text-blue-400 hover:text-blue-300">
								terms and conditions
							</a>{" "}
							and our{" "}
							<a
								href="/privacy"
								className="text-blue-400 hover:text-blue-300">
								privacy policy
							</a>
						</div>

						<button
							type="submit"
							className="w-full bg-[#F97316] text-white font-bold py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors">
							Send message
						</button>
					</form>
				</div>

				{/* Contact Information */}
				<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
					<div className="p-6">
						<div className="text-[#F97316] mb-4">
							<svg
								className="h-8 w-8 mx-auto"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-medium text-white mb-2">
							Email us:
						</h3>
						<p className="text-gray-400">
							Email us for general queries, including marketing
							and partnership opportunities.
						</p>
						<a
							href="mailto:support@ffe.com"
							className="text-[#F97316] hover:text-blue-300 mt-2 inline-block">
							support@ffe.com
						</a>
					</div>

					<div className="p-6">
						<div className="text-[#F97316] mb-4">
							<svg
								className="h-8 w-8 mx-auto"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-medium text-white mb-2">
							Call us:
						</h3>
						<p className="text-gray-400">
							Call us to speak to a member of our team. We are
							always happy to help.
						</p>
						<a
							href="tel:+4930123456"
							className="text-[#F97316] hover:text-blue-300 mt-2 inline-block">
							+49 30 1769 438
						</a>
					</div>

					<div className="p-6">
						<div className="text-[#F97316] mb-4">
							<svg
								className="h-8 w-8 mx-auto"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-medium text-white mb-2">
							Support
						</h3>
						<p className="text-gray-400">
							Email us for general queries, including marketing
							and partnership opportunities.
						</p>
						<a
							href="/support"
							className="text-[#F97316] hover:text-blue-300 mt-2 inline-block">
							Support center
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
