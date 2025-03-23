import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    route: "",
    price: 0,
    seat: "",
    Name: "",
  });
  const [publishError, setPublishError] = useState(null);
  const [Cvalidation, setCValidation] = useState(null);

  const navigate = useNavigate();

  // Price mapping based on the route
  const routePrices = {
    "kandy to pilimathalwa": 200,
    "pilimathalawa to kadugannwa": 300,
    "kadugannwa to mawanella": 400,
    "blaummahara to kandy": 500,
    "warakapola to balumaha": 1000,
  };

  // Handle submit for the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/cticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        alert("Successfully submitted!");
        navigate("/");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  // Update the price based on the selected route
  const handleRouteChange = (e) => {
    const selectedRoute = e.target.value;
    setFormData({
      ...formData,
      route: selectedRoute,
      price: routePrices[selectedRoute] || 0, // Set the price based on selected route
    });
  };

  const handleNameChange = (e) => {
    const patientName = e.target.value.trim();
    if (patientName === "") {
      setCValidation(null); // Clear validation error
    } else if (!isNaN(patientName)) {
      setCValidation("Name cannot be a number");
    } else {
      setFormData({ ...formData, patientName });
      setCValidation(null); // Clear validation error
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-t from-blue-500 to-green-400">
      <div className="flex w-full max-w-6xl space-x-8 p-6">
        {/* Add Appointment Form */}
        <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg border border-gray-200 flex-shrink-0">
          {/* Back Button */}
          <div className="flex justify-start">
            <button
              className="text-lg font-semibold text-blue-600 hover:text-blue-400 focus:outline-none"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>

          {/* Header */}
          <div className="my-6 text-center">
            <h1 className="text-3xl font-semibold text-blue-700 uppercase">Ticket</h1>
          </div>

          {/* Form Section */}
          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Patient Name */}
              <div>
                <label htmlFor="patientName" className="text-sm font-medium text-gray-700">
                  Patient Name
                </label>
                <input
                  id="Name"
                  type="text"
                  placeholder="Enter Name"
                  required
                  className="mt-2 w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  onChange={handleNameChange}
                />
                {Cvalidation && <p className="mt-1 text-red-600 text-sm">{Cvalidation}</p>}
              </div>

              {/* Route Selection */}
              <div>
                <label htmlFor="route" className="text-sm font-medium text-gray-700">
                  Select Route
                </label>
                <select
                  id="route"
                  required
                  className="mt-2 w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  onChange={handleRouteChange}
                >
                  <option value="">Select Route</option>
                  <option value="kandy to pilimathalwa">Kandy to Pilimathalwa</option>
                  <option value="pilimathalawa to kadugannwa">Pilimathalawa to Kadugannwa</option>
                  <option value="kadugannwa to mawanella">Kadugannwa to Mawanella</option>
                  <option value="blaummahara to kandy">Blaummahara to Kandy</option>
                  <option value="warakapola to balumaha">Warakapola to Balumaha</option>
                </select>
              </div>

              {/* Display Price */}
              <div>
                <label htmlFor="price" className="text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  id="price"
                  type="text"
                  value={formData.price || ""}
                  readOnly
                  className="mt-2 w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              {/* Seat Number */}
              <div>
                <label htmlFor="seat" className="text-sm font-medium text-gray-700">
                  Seat Number
                </label>
                <input
                  id="seat"
                  type="text"
                  placeholder="Enter Seat Number"
                  required
                  className="mt-2 w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  onChange={(e) => setFormData({ ...formData, seat: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 mt-6 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-500 focus:outline-none transition duration-300"
              >
                Submit
              </button>

              {/* Error Message */}
              {publishError && (
                <p className="mt-4 text-red-600 text-center text-sm">{publishError}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
