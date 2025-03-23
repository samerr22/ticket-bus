import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");




  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/gcticket`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setInfo(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, []);

  

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/ppointments/${DId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInfo((prev) => prev.filter((course) => course._id !== DId));
        alert("Deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...Info]);
    } else {
      const filteredData = Info.filter(
        (course) =>
          course.name &&
          course.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);


 


  return (
    <div className="h-[800px] relative">
    <div className="items-center justify-center flex">
      <div className="items-center">
        {/* Add Appointment Button */}
        <div className="w-full text-center mt-4 mb-6">
          <Link to="/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300">
              booking ticaket
            </button>
          </Link>
        </div>
  
        <div className="lg:w-[1200px] mt-8 rounded-3xl shadow-xl bg-white overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filter && filter.length > 0 ? (
              filter.map((course) => (
                <div
                  key={course._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    Patient: {course.Name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <strong>Doctor:</strong> {course.route}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Appointment Date:</strong> {course.price}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Seat number:</strong> {course.seat}
                  </p>
  
                  <div className="flex justify-between mt-4">
                    <Link to={`/updatee/${course._id}`}>
                      <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setformId(course._id);
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
              <div className="text-center text-gray-500 py-4">
                No records found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}
