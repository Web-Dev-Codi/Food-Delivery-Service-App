import { useEffect, useState } from "react";

const CookieConsent = () => {
	const [showBanner, setShowBanner] = useState(false);

	useEffect(() => {
		// Check if the user has already accepted cookies
		if (localStorage.getItem("cookiesAccepted")) {
			setShowBanner(false); // Hide banner if consent is given
		} else {
			setShowBanner(true); // Show banner if no consent yet
		}

		// Use sessionStorage to detect if this is a new browser session
		const isNewSession = !sessionStorage.getItem("sessionStarted");
		if (isNewSession) {
			sessionStorage.setItem("sessionStarted", "true");
		}

		// Add event listener to clear cookies when the user closes the tab/browser
		// This won't trigger on page refreshes, only when the tab/browser is closed
		const handleUnload = () => {
			// Only clear if this is the last tab of the site being closed
			if (isNewSession) {
				localStorage.removeItem("cookiesAccepted");
			}
		};

		window.addEventListener("unload", handleUnload);

		// Cleanup the event listener when the component is unmounted
		return () => {
			window.removeEventListener("unload", handleUnload);
		};
	}, []);

	const handleAcceptCookies = () => {
		// Store the user's consent in localStorage
		localStorage.setItem("cookiesAccepted", "true");

		// Hide the banner after accepting
		setShowBanner(false);
	};

	if (!showBanner) return null; // Don't show banner if accepted

	return (
		<div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 px-6 text-sm flex justify-between items-center z-50">
			<p className="m-0">
				We use cookies to improve your experience. By continuing to
				browse the site, you consent to our use of cookies.
			</p>
			<button
				type="button"
				onClick={handleAcceptCookies}
				className="ml-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
				Accept All Cookies
			</button>
		</div>
	);
};

export default CookieConsent;
