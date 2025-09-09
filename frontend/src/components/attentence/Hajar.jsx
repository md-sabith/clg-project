import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams,useLocation  } from "react-router-dom";
import { TfiLayoutGrid3,TfiLayoutGrid2  } from "react-icons/tfi";
import { FaHome } from "react-icons/fa";
function Hajar() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [cards,setCards] = useState('No')
  const [summary, setSummary] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [load,setLoad]= useState(false)

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get("date") || "";
  const time = queryParams.get("time") || "Night";
 
  useEffect(() => {
    axios
      .get(`http://localhost:4000/students/`)
      .then((res) => {
        const filtered = res.data
          .filter((student) => student.CLASS === Number(id))
          .sort((a, b) => a.SL - b.SL);

        // set all to Present initially
        const initialAttendance = {};
        filtered.forEach((s) => {
          initialAttendance[s.ADNO] = "Present";
        });

        setStudents(filtered);
        setAttendance(initialAttendance);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleCheckboxChange = (ad, isChecked) => {
    setAttendance((prev) => ({
      ...prev,
      [ad]: isChecked ? "Present" : "Absent",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const payload = students.map((student) => ({
      nameOfStd: student["SHORT NAME"],
      ad: student.ADNO,
      class: student.CLASS,
      status: attendance[student.ADNO] || "Absent",
      SL:student.SL,
      attentenceTime: time,
      attentenceDate:date ||new Date()
    }));

    try {
      setLoad(true)
      await axios.post("http://localhost:4000/set-attentence", payload);

      //  calculate summary
      const strength = students.length;
      const present = Object.values(attendance).filter(
        (s) => s === "Present"
      ).length;
      const absent = strength - present;
      const percent = ((present / strength) * 100).toFixed(1);

      setSummary({ strength, present, absent, percent });
      setShowSummary(true);

      await axios.patch(`http://localhost:4000/classes/by-number/${id}`, {
        totalstudents: strength,
        presentstudents: present,
        absentstudents: absent,
        percentage: percent,
      });

      const payload2 = students.map((student) => ({
        _id:student._id,
        SL:student.SL,
        ADNO: student.ADNO,
        ["FULL NAME"]: student["FULL NAME"],
        ["SHORT NAME"]: student["SHORT NAME"],
        CLASS: student.CLASS,
        Status: attendance[student.ADNO] || "Absent",
        Time: time,
        Date:date ||new Date().toISOString().split("T")[0]
        
      }));

      await axios.patch("http://localhost:4000/students/bulk-update/students",{updates:payload2})
      setLoad(false)
    } catch (err) {
      console.error(err);
      setLoad(false)
      alert("Error submitting attendance"+err);
      
    }
  };

  const handleOk = () => {
    setShowSummary(false);
    navigate("/");
  };

  return (
    <div className="p-6 mt-12">
    <div >
     <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center ">
         Attendance || Class: {id}
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 p-3 rounded-lg shadow-sm mb-1">
        <span className="text-sm md:text-base text-gray-700">
           Date & Time:{" "}
          {date
            ? new Date(date).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })
            : "N/A"} ({time || "N/A"})
        </span>

      </div>



      <div className="flex gap-3 p-2 mb-1">
          <button
            onClick={() => setCards("Cards")}
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition ${
              cards === "Cards"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <TfiLayoutGrid2 className="text-lg" />
            Cards
          </button>

          <button
            onClick={() => setCards("No")}
            type="button"
            className={`flex items-center  gap-2 px-4 py-2 rounded-lg shadow-sm transition ${
              cards === "No"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <TfiLayoutGrid3 className="text-lg" />
            Table
          </button>

        
          <button
            onClick={() => navigate("/edit-attentence-classes")}
            type="button"
            className="block md:hidden ml-14 flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition bg-green-500 text-white"
          >
            <FaHome className="text-lg" />
            Home
          </button>
        </div>

      </div>



     {cards==="No"&& <div>
      <form onSubmit={handleSubmit}>
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">SL</th>
              <th className="border border-gray-300 px-4 py-2">Ad</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.SL}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.ADNO}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student["SHORT NAME"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        handleCheckboxChange(
                          student.ADNO,
                          attendance[student.ADNO] !== "Present"
                        )
                      }
                      className={`px-4 py-1 rounded-full font-medium transition ${
                        attendance[student.ADNO] === "Present"
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {attendance[student.ADNO] === "Present"
                        ? "Present"
                        : "Absent"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No students found in Class {id}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-blue-600 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          >
             Submit Attendance
          </button>
        </div>
      </form>
      </div>}


      {cards==="Cards" && 
      <div>
    <form onSubmit={handleSubmit}>
      <main>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 mt-2">
            {students.length > 0 ? (
              students.map((student, index) => {
                const isPresent = attendance[student.ADNO] === "Present"; //  check attendance
                return (
                  <div
                    key={index}
                    onClick={() =>
                      handleCheckboxChange(student.ADNO, !isPresent)
                    }
                    className={`rounded-2xl p-4 text-center transition-all duration-300 transform  cursor-pointer  ${
                      isPresent
                        ? "bg-green-200 shadow-sm hover:shadow-lg"
                        : "bg-red-100"
                    }`}
                  >
                    {/* Roll Circle */}
                    <div className="flex justify-center mb-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white transition-colors duration-300 ${
                          isPresent ? "bg-indigo-500" : "bg-indigo-500"
                        }`}
                      >
                        {student.SL}
                      </div>
                    </div>

                    {/* Student Info */}
                    <h3 className="text-base font-semibold text-gray-800 truncate">
                      {student["SHORT NAME"]}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Ad No: {student.ADNO}
                    </p>

                   
                  </div>
                );
              })
            ) : (
              <p className="col-span-3 text-center p-4 text-gray-500">
                No students found in Class {id}
              </p>
            )}
          </div>
        </main>

        
        <footer className="mt-8 text-center">
            <button className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit Attendance
            </button>
        </footer>
        </form>
      </div>}

  

      {/*  Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {load &&(
            <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-blue-600 font-semibold">Submitting Attendance...</p>
          </div>
          )}
          {!load && 
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 text-center">
            <h3 className="text-xl font-bold mb-4">📊 Attendance Summary</h3>
            <p className="mb-2">👥 Strength: {summary.strength}</p>
            <p className="mb-2 text-green-600">✅ Present: {summary.present}</p>
            <p className="mb-2 text-red-600">❌ Absent: {summary.absent}</p>
            <p className="mb-4">📈 Presence : {summary.percent}%</p>
            

            <button
              onClick={handleOk}
              className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>}
        </div>
      )}
    </div>
  );
}

export default Hajar;
