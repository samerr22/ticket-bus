import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({});
  console.log(formData)
  const [appointments, setAppointments] = useState([]);
  const [publishError, setPublishError] = useState(null);
  const [Cvalidation, setCValidation] = useState(null);

  const { iddd } = useParams();

  const navigate = useNavigate();



  useEffect(() => {
    try {
      const fetchE = async () => {
        const res = await fetch(
          `http://localhost:3000/api/gappointments?upId=${iddd}`
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
        
      const res = await fetch(`http://localhost:3000/api/uappointments/${formData._id}`, {
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
        navigate("/");
        
      }
    } catch (error) {
      setPublishError("Something went wrong");
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
      doc.save("course.pdf");
    };






  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-100">
    <div className="relative bg-white w-[90%] max-w-[1100px] p-8 md:p-10 rounded-3xl shadow-xl border border-gray-200 flex flex-col md:flex-row gap-8">
      
      {/* Left Section: Add Appointment Form */}
      <div className="w-full md:w-1/2 bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
        <div className="flex justify-start w-full">
          <button
            className="text-lg font-medium text-blue-600 hover:text-blue-400 underline"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
  
        {/* Header */}
        <div className="my-7 flex items-center justify-center w-full">
          <h1 className="text-4xl font-bold text-blue-700 uppercase">Add Appointment</h1>
        </div>
  
        {/* Form Section */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 md:flex-row justify-between">
            <div className="flex-1">
              <label htmlFor="patientName" className="text-sm font-medium text-gray-700">Patient Name</label>
              <input
                className="mt-2 w-full bg-slate-100 shadow-sm p-4 rounded-lg text-gray-700 placeholder-gray-500"
                type="text"
                placeholder="Enter Patient Name"
                required
                id="patientName"
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                value={formData.patientName}
              />
              <p className="mt-0 text-red-600 h-0 rounded-lg text-center">name can not be a number</p>
            </div>
  
            <div className="flex-1">
              <label htmlFor="doctorName" className="text-sm font-medium text-gray-700">Doctor Name</label>
              <select
                id="doctorName"
                required
                className="mt-2 w-full bg-slate-100 shadow-sm p-4 rounded-lg text-gray-700"
                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                value={formData.doctorName}
              >
                <option value="">Select a Doctors</option>
                <option value="Dr. Emily Davis">Dr. Emily Davis</option>
                <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                <option value="Dr. John Smith">Dr. John Smith</option>
                <option value="Dr. Robert Taylor">Dr. Robert Taylor</option>
                <option value="Dr. Linda Anderson">Dr. Linda Anderson</option>
                <option value="Dr. Michael Wilson">Dr. Michael Wilson</option>
              </select>
            </div>
          </div>
  
          <div className="flex flex-col gap-6 md:flex-row justify-between">
            <div className="flex-1">
              <label htmlFor="appointmentDate" className="text-sm font-medium text-gray-700">Appointment Day</label>
              <select
                id="appointmentDate"
                required
                className="mt-2 w-full bg-slate-100 shadow-sm p-4 rounded-lg text-gray-700"
                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                value={formData.appointmentDate}
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
  
            <div className="flex-1">
              <label htmlFor="appointmentTime" className="text-sm font-medium text-gray-700">Appointment Time</label>
              <select
                id="appointmentTime"
                required
                className="mt-2 w-full bg-slate-100 shadow-sm p-4 rounded-lg text-gray-700"
                onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                value={formData.appointmentTime}
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
          </div>
  
          <button
            type="submit"
            className="mt-6 w-full py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Submit
          </button>
  
          {publishError && (
            <p className="mt-5 text-red-600 text-center text-sm">{publishError}</p>
          )}
        </form>
      </div>
  
      {/* Right Section: Appointments Table */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold text-blue-700 uppercase text-center">Appointments</h2>
        <div className="flex justify-center items-center mt-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-[400px] h-10 mt-4 rounded-full shadow-xl border border-slate-400 bg-opacity-10"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={generatePDF}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded ml-5"
          >
            Download PDF
          </button>
        </div>
  
        <table className="table-auto w-full mt-8 bg-white rounded-lg shadow-lg border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-4 text-left text-sm font-medium text-gray-700">Doctor Name</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-sm text-gray-500">
                  No appointments available.
                </td>
              </tr>
            ) : filter && filter.length > 0 ? (
              filter.map((appointment) => (
                <tr key={appointment._id} className="border-b border-gray-200">
                  <td className="p-4 text-sm text-gray-700">{appointment.doctorName}</td>
                  <td className="p-4 text-sm text-gray-700">{appointment.Docdate}</td>
                  <td className="p-4 text-sm text-gray-700">{appointment.Time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-sm text-gray-500">
                  No appointments match your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  

  );
}
