import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [bookedSeats, setBookedSeats] = useState([]); // State to store booked seat numbers
  const [isSeatBooked, setIsSeatBooked] = useState(false); // State to track if seat is already booked
  console.log(formData);

  const { iddd } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    try {
      const fetchE = async () => {
        const res = await fetch(
          `http://localhost:3000/api/gcticket?upId=${iddd}`
        );
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedE = data.find(
            (course) => course._id === iddd
          );
          if (selectedE) {
            setFormData(selectedE);
          }
        }
      };
      fetchE();
    } catch (error) {
      console.log(error.message);
    }
  }, [iddd]);

  // Price mapping based on the route
  const routePrices = {
    "kandy to pilimathalwa": 200,
    "pilimathalawa to kadugannwa": 300,
    "kadugannwa to mawanella": 400,
    "blaummahara to kandy": 500,
    "warakapola to balumaha": 1000,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      const res = await fetch(`http://localhost:3000/api/upcticket/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),

      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        
        alert("sucsses ")
        generateTicketPDF();
        navigate("/myticket");
        
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  // Fetch booked seats data and check if a seat is already booked
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/gcticket");
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          // Store booked seat numbers in bookedSeats state
          const bookedSeats = data.map((booking) => booking.seat);
          setBookedSeats(bookedSeats);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBookedSeats();
  }, []);

  // Update the price based on the selected route
  const handleRouteChange = (e) => {
    const selectedRoute = e.target.value;
    setFormData({
      ...formData,
      route: selectedRoute,
      price: routePrices[selectedRoute] || 0, // Set the price based on selected route
    });
  };



  // Handle seat number change and check if it's already booked
  const handleSeatChange = (e) => {
    const selectedSeat = e.target.value;
    if (bookedSeats.includes(selectedSeat)) {
      setIsSeatBooked(true); // Mark as booked
    } else {
      setIsSeatBooked(false); // Clear the booking flag
    }

    setFormData({
      ...formData,
      seat: selectedSeat,
    });
  };


  const generateTicketPDF = () => {
    const doc = new jsPDF();
  
    // Set font and size for the title and content
    doc.setFont("helvetica", "normal");
  
    // Create a background color for the ticket
    doc.setFillColor(240, 240, 240); // Light gray background color
    doc.rect(10, 10, 190, 80, "F"); // Fill the rectangle with the background color
  
    // Draw a border with rounded corners
    doc.setDrawColor(0); // Black border color
    doc.setLineWidth(1);
    doc.roundedRect(10, 10, 190, 80, 10, 10); // X, Y, Width, Height, Radius for rounded corners
  
    // Add a header (Ticket Title)
    doc.setFontSize(18);
    doc.setTextColor(0, 51, 102); // Dark blue color for the header
    doc.text("Bus Ticket", 105, 25, { align: "center" });
  
    // Set font size for the content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color for content
  
    // Add the ticket details with styling
    doc.text(`Name: ${formData.Name}`, 20, 40);
    doc.text(`Route: ${formData.route}`, 20, 50);
    doc.text(`Seat: ${formData.seat}`, 20, 60);
    doc.text(`Price: Rs. ${formData.price}`, 20, 70);
  
    // Draw a horizontal line separator before the footer
    doc.setDrawColor(0, 51, 102); // Dark blue color for the line
    doc.setLineWidth(0.5);
    doc.line(10, 75, 200, 75); // X1, Y1, X2, Y2
  
    // Footer with a thank you message
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128); // Gray color for the footer text
    doc.text("Thank you for traveling with us!", 105, 85, { align: "center" });
  
    // Add a small footer with ticket information (optional)
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150); // Light gray for footer text
    doc.text("Ticket generated by Our Bus Service", 105, 95, { align: "center" });
  
    // Save the generated PDF as a bus_ticket.pdf
    doc.save("bus_ticket.pdf");
  };
  
  




  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-t from-blue-500 to-green-400">
      <div className="flex justify-center items-center">
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
               Name
                </label>
                <input
                  id="Name"
                  type="text"
                  placeholder="Enter Name"
                  required
                  className="mt-2 w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                  value={formData.Name}
                />
                <p className="mt-1 text-red-600 text-sm">name can not be number</p>
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
                  value={formData.route}
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
                <select
                  id="seat"
                  required
                  className="mt-2 w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  onChange={handleSeatChange}
                  disabled={isSeatBooked} // Disable the dropdown if the seat is already booked
                  value={formData.seat}
                >
                  <option value="" disabled>Select a seat number</option>
                  {[...Array(50).keys()].map((number) => (
                    <option
                      key={number + 1}
                      value={number + 1}
                      disabled={bookedSeats.includes((number + 1).toString())} // Disable booked seats
                    >
                      {number + 1}
                    </option>
                  ))}
                </select>
                {isSeatBooked && <p className="text-red-600 text-sm">This seat is already booked.</p>}
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
                <p className="mt-4 text-red-600 text-center text-sm">This seat is already booked.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
