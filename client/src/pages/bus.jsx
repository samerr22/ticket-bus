import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  const [seats, setSeats] = useState(new Array(50).fill(false)); // Initialize 50 seats as unbooked
  const [loading, setLoading] = useState(true);  // Loading state

  // Fetch the ticket information
  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/gcticket`);
        const data = await res.json();
        if (res.ok) {
          setInfo(data);
          setLoading(false);  // Set loading to false when data is fetched
          
          // Mark booked seats
          const bookedSeats = data.map((ticket) => parseInt(ticket.seat, 10)); // Get all booked seat numbers
          setSeats((prevSeats) =>
            prevSeats.map((_, index) => bookedSeats.includes(index + 1)) // Mark booked seats as true
          );
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchinfo();
  }, []);

  // Handle seat selection (if needed)
  const handleSeatClick = (index) => {
    // If the seat is not already booked, handle booking logic here
    if (!seats[index]) {
      console.log(`Seat ${index + 1} selected`);
      // You can add further functionality to mark seat as booked or fetch updates.
    }
  };

  return (
    <div className="h-full relative bg-gradient-to-t from-blue-500 to-green-400">
  <div className="flex justify-center items-center py-6">
    <div className="w-full max-w-6xl px-4">
      <div className="flex gap-4">
        <div className="text-center mb-6">
          <Link to="/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300">
              Book New Ticket
            </button>
          </Link>
        </div>

        <div className="text-center mb-6">
          <Link to="/myticket">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300">
              My Ticket
            </button>
          </Link>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-gray-500 py-4">Loading...</div>
      ) : (
        <div>
          <h3 className="text-center text-white text-2xl font-semibold mb-6">
            Available Bus Seats
          </h3>

          {/* Front Section */}
          <div className="mb-4">
            <h4 className="text-center text-white text-xl font-semibold mb-2">
              Front Section (Seats 1-10)
            </h4>
            <div className="grid grid-cols-10 gap-4">
              {seats.slice(0, 10).map((isBooked, index) => (
                <div
                  key={index}
                  onClick={() => handleSeatClick(index)}
                  className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg cursor-pointer ${
                    isBooked ? "bg-blue-500" : "bg-white"
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Middle Section */}
          <div className="mb-4">
            <h4 className="text-center text-white text-xl font-semibold mb-2">
              Middle Section (Seats 11-30)
            </h4>
            <div className="grid grid-cols-10 gap-4">
              {seats.slice(10, 30).map((isBooked, index) => (
                <div
                  key={index + 10}
                  onClick={() => handleSeatClick(index + 10)}
                  className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg cursor-pointer ${
                    isBooked ? "bg-blue-500" : "bg-white"
                  }`}
                >
                  {index + 11}
                </div>
              ))}
            </div>
          </div>

          {/* Back Section */}
          <div className="mb-4">
            <h4 className="text-center text-white text-xl font-semibold mb-2">
              Back Section (Seats 31-50)
            </h4>
            <div className="grid grid-cols-10 gap-4">
              {seats.slice(30, 50).map((isBooked, index) => (
                <div
                  key={index + 30}
                  onClick={() => handleSeatClick(index + 30)}
                  className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg cursor-pointer ${
                    isBooked ? "bg-blue-500" : "bg-white"
                  }`}
                >
                  {index + 31}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

  );
}
