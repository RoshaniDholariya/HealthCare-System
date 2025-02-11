import React, { useState, useEffect } from "react";
import Sidebar from "../PatientSidebar";
import HospitalCard from "./HospitalDoctorcard";
import HospitalDetails from "./HospitalDetailModel.jsx";
import { Menu, X } from "lucide-react";
import axios from "axios";

const DashboardLayout = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitalDetails, setHospitalDetails] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on smaller screens by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/organizations`
        );
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  }, []);

  const handleHospitalClick = async (hospitalId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/doctors/${hospitalId}`
      );
      const dataAsArray = Array.isArray(response.data)
        ? response.data
        : Object.values(response.data);
      setHospitalDetails(dataAsArray);
      setSelectedHospital(hospitalId);
      // Close sidebar on mobile when selecting a hospital
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    } catch (error) {
      console.error("Error fetching hospital details:", error);
    }
  };

  const handleBack = () => {
    setSelectedHospital(null);
    setHospitalDetails([]);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-30`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      <div className="flex-1 min-w-0 lg:ml-64">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg lg:hidden"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6 m-5" />
          )}
        </button>

        <main className="p-4 lg:p-6">
          {!selectedHospital ? (
            <div className="grid grid-cols-1 gap-4">
              {hospitals.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  hospital={hospital}
                  onClick={() => handleHospitalClick(hospital.id)}
                />
              ))}
            </div>
          ) : (
            <HospitalDetails
              hospitalDetails={hospitalDetails}
              onBack={handleBack}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
