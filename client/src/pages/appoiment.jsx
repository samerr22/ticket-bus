import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({});
  console.log(formData)
  const [appointments, setAppointments] = useState([]);
  const [publishError, setPublishError] = useState(null);
  const [Cvalidation, setCValidation] = useState(null);

  const navigate = useNavigate();

  // Fetch appointments when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/Getappointments");
        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array ensures this only runs once



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/cappointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        alert("successfull");
        navigate("/");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };


  const handlepriceChange = (e) => {
    const patientName = e.target.value.trim();
  
    // Check if the price is a number
    if (patientName === "") {
      setCValidation(null); // Clear any previous validation error
    } else if (!isNaN(patientName)) {
      setCValidation("Price cannot be a number");
    } else {
      setFormData({ ...formData, patientName });
      setCValidation(null); // Clear any validation error if it's a valid string
    }
  };

  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");
  

  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...appointments]);
    } else {
      const filteredData = appointments.filter(
        (course) =>
          course.doctorName &&
        course.doctorName.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, appointments]);


    const generatePDF = () => {
      const doc = new jsPDF();
      doc.autoTable({
        head: [[ "Doctor Name", "Date", "Time"]],
        body: filter.map((course) => [
         
          course.doctorName,
          course.Docdate,
          course.Time
        
        ]),
        theme: "grid",
        headStyles: { fillColor: [0, 0, 255] }
      });
      doc.save("ap.pdf");
    };



  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50">
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
          <h1 className="text-3xl font-semibold text-blue-700 uppercase">Add Appointment</h1>
        </div>
  
        {/* Form Section */}
        <div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Patient Name */}
            <div>
              <label htmlFor="patientName" className="text-sm font-medium text-gray-700">Patient Name</label>
              <input
                id="patientName"
                type="text"
                placeholder="Enter Patient Name"
                required
                className="mt-2 w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                onChange={handlepriceChange}
              />
              {Cvalidation && <p className="mt-1 text-red-600 text-sm">{Cvalidation}</p>}
            </div>
  
            {/* Doctor Name */}
            <div>
              <label htmlFor="doctorName" className="text-sm font-medium text-gray-700">Doctor Name</label>
              <select
                id="doctorName"
                required
                className="mt-2 w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
              >
                <option value="">Select a Doctor</option>
                <option value="Dr. Emily Davis">Dr. Emily Davis</option>
                <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                <option value="Dr. John Smith">Dr. John Smith</option>
                <option value="Dr. Robert Taylor">Dr. Robert Taylor</option>
                <option value="Dr. Linda Anderson">Dr. Linda Anderson</option>
                <option value="Dr. Michael Wilson">Dr. Michael Wilson</option>
              </select>
            </div>
  
            {/* Appointment Day */}
            <div>
              <label htmlFor="appointmentDate" className="text-sm font-medium text-gray-700">Appointment Day</label>
              <select
                id="appointmentDate"
                required
                className="mt-2 w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
              >
                <option value="">Select a Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
  
            {/* Appointment Time */}
            <div>
              <label htmlFor="appointmentTime" className="text-sm font-medium text-gray-700">Appointment Time</label>
              <select
                id="appointmentTime"
                required
                className="mt-2 w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
              >
                <option value="">Select a Time</option>
                <option value="02:00 PM to 04:00 PM">02:00 PM to 04:00 PM</option>
                <option value="10:00 AM to 12:00 PM">10:00 AM to 12:00 PM</option>
                <option value="09:30 AM to 11:30 AM">09:30 AM to 11:30 AM</option>
                <option value="01:00 PM to 03:00 PM">01:00 PM to 03:00 PM</option>
                <option value="04:00 PM to 06:00 PM">04:00 PM to 06:00 PM</option>
                <option value="08:00 AM to 10:00 AM">08:00 AM to 10:00 AM</option>
              </select>
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
  
      {/* Appointments Table Section */}
      <div className="w-full max-w-xl flex-grow bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-700 uppercase text-center">Appointments</h2>
        
        {/* Search & PDF Download Section */}
        <div className="flex justify-center items-center space-x-4 mt-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-72 h-10 bg-gray-100 rounded-full border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={generatePDF}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Download PDF
          </button>
        </div>
  
        {/* Appointments Table */}
        <table className="table-auto w-full mt-8 bg-white rounded-lg shadow-lg border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Doctor Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-sm text-gray-500">
                  No appointments available.
                </td>
              </tr>
            ) : (
              filter && filter.length > 0 ? (
                filter.map((appointment) => (
                  <tr key={appointment._id} className="border-b border-gray-200 hover:bg-blue-50">
                    <td className="py-3 px-4 text-sm text-gray-700">{appointment.doctorName}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{appointment.Docdate}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{appointment.Time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-sm text-gray-500">
                    No appointments match your filter.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  
  
  


  );
}
