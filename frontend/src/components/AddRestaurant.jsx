import React from "react";
import { useState } from "react";
import axios from "axios";



function AddRestaurant() {
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [contact, setContact] = useState("");
  const [operatingHours, setOperatingHours] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });

  return (
    <div>
      <h1>Add Restaurant</h1>
      // Display Success or Error Messages
      {successMessage && (
        <div className="mb-4 text-green-600">{successMessage}</div>
      )}
      {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name"> Restaurant Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="location"> Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

           {/* Images */}
        <div>
          <label htmlFor="images"> Images:</label>
          <button type="button" onClick={openCloudinaryWidget}>
            Upload Images
          </button>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} />
          ))}
        </div>

         {/* Contact */}
         <div>
         <label htmlFor="contact">Contact:</label>
         <input
           type="text"
           id="contact"
           name="contact"
           value={contact}
           onChange={(e) => setContact(e.target.value)}
         />
       </div>

         {/* Operating Hours */}
            <div>
            <h3>Operating Hours</h3>
            {Object.entries(operatingHours).map(([day, hours]) => (
                <div key={day}>
                    <label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                    <input
                    type="text"
                    id={day}
                    name={day}
                    value={hours}
                    onChange={(e) =>
                        setOperatingHours({ ...operatingHours, [day]: e.target.value })
                    }
                    />
                </div>
                ))}
            </div>

        <button type="submit">Add Restaurant</button>
           
      </form>
    </div>
  );
}

export default AddRestaurant;
