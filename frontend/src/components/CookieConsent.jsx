import React, { useEffect, useState } from 'react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
      setShowBanner(true); // Show banner if no consent yet
    } else {
      setShowBanner(false); // Hide banner if consent is given
    }

    // Clean up event listener when the component unmounts
    const handleBeforeUnload = () => {
      // Clear cookiesAccepted in localStorage on unload
      localStorage.removeItem('cookiesAccepted');
    };

    // Add the beforeunload event listener to clear localStorage on unload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleAcceptCookies = () => {
    // Store the user's consent in localStorage
    localStorage.setItem('cookiesAccepted', 'true');
    
    // Hide the banner after accepting
    setShowBanner(false);
  };

  if (!showBanner) return null; // Don't show banner if accepted

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 px-6 text-sm flex justify-between items-center z-50">
      <p className="m-0">
        We use cookies to improve your experience. By continuing to browse the site, you consent to our use of cookies.
      </p>
      <button 
        onClick={handleAcceptCookies}
        className="ml-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Accept All Cookies
      </button>
    </div>
  );
};

export default CookieConsent;
