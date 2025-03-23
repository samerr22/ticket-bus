import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/gcticket`);
        const data = await res.json();
        if (res.ok) {
          setInfo(data);
          setLoading(false);  // Set loading to false when data is fetched
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchinfo();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/deletcticket/${DId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInfo((prev) => prev.filter((ticket) => ticket._id !== DId));
        alert("Ticket cancelled successfully!");
      }
    } catch (error) {
      console.log(error.message);
      alert("Error deleting ticket");
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...Info]);
    } else {
      const filteredData = Info.filter(
        (ticket) =>
          ticket.Name &&
          ticket.Name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  return (
    <div className="h-full relative bg-gradient-to-t from-blue-500 to-green-400">
      <div className="flex justify-center items-center py-6">
        <div className="w-full max-w-6xl px-4">
          <div className="text-center mb-6">
            <Link to="/add">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300">
                Check Seat
              </button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by patient name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {loading ? (
            <div className="text-center text-gray-500 py-4">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filter.length > 0 ? (
                filter.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      Name: {ticket.Name}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      <strong>route:</strong> {ticket.route}
                    </p>
                    <p className="text-gray-600 mt-2">
                      <strong>Price:</strong> Rs {ticket.price}
                    </p>
                    <p className="text-gray-600 mt-2">
                      <strong>Seat Number:</strong> {ticket.seat}
                    </p>

                    <div className="flex justify-between mt-4">
                      <Link to={`/updateee/${ticket._id}`}>
                        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setformId(ticket._id);
                          handleDeleteUser();
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">No records found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
