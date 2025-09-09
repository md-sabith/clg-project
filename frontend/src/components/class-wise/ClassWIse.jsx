import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ClassWIse() {
    const navigate = useNavigate()
    const [classes,setClass] = useState([])
    useEffect(()=>{
        
        axios.get("https://clg-project-hsns.onrender.com/classes")
        .then((res)=>{
            setClass(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.error(err);
        })
    },[])

  return (
    <div className="container mx-auto px-4 py-10">
  <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-tight mt-10">
     Class Wise Latest Attendance
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
    {classes.map((cls, index) => (
      <div
      key={index}
      className="bg-green-100 rounded-2xl shadow-md p-6 text-center cursor-pointer 
                 transition-transform transform hover:scale-10 hover:shadow-xl"
    >
      {/* Class Number */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wide text-gray-500">Class</p>
        <h3 className="text-5xl font-extrabold text-indigo-600">
          {cls.class}
        </h3>
      </div>
    
      {/* Stats */}
      <div className="space-y-3 text-sm">
        <p className="text-gray-700">
          👥 Strength:{" "}
          <span className="font-bold text-gray-900">{cls.totalstudents}</span>
        </p>
        <p className="text-gray-700">
          ✅ Present:{" "}
          <span className="font-bold text-green-600">{cls.presentstudents}</span>
        </p>
        <p className="text-gray-700">
          ❌ Absent:{" "}
          <span className="font-bold text-red-600">{cls.absentstudents}</span>
        </p>
        <p className="text-gray-700">
          📊 Percent:{" "}
          <span
            className={`font-bold ${
              cls.percentage >= 75 ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {cls.percentage}%
          </span>
        </p>
      </div>
    </div>
    
    ))}
  </div>
</div>

  )
}

export default ClassWIse