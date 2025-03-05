import { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    // Prevents multiple script injections
    if (window.Tawk_API) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Create and append the Tawk.to script with the new widget ID
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/67c82ba118121519097569b0/1iliuks08"; // New widget ID
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    // Insert the script tag into the document
    script.onload = () => {
      if (window.Tawk_API) {
        // Set the pre-chat message after the script has loaded
        window.Tawk_API.onLoad = function() {
          window.Tawk_API.setAttributes({
            prechat_message: "How can I help you today?" // Set the pre-chat message
          });
        };
      }
    };

    document.body.appendChild(script);
  }, []);

  return null; // No need to return anything since this is a background script
};

export default TawkToChat;
