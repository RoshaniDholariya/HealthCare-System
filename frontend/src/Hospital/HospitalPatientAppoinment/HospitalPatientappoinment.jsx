import React, { useState, useEffect } from "react";
import Sidebar from "../HospitalSidebar";
import PatientTable from "./HospitalPatientTable";
import PatientModal from "./HospitalPatientModel";
import axios from "axios";
import { Menu, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const PatientDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [patients, setPatients] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const isMobileNow = screenWidth < 768;
      setIsMobile(isMobileNow);

      if (isMobileNow) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/healthorg/getPatient`,
          { withCredentials: true }
        );
        setPatients(response.data.patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const mainContentClass = `
    transition-all duration-300 ease-in-out 
    ${isSidebarOpen && !isMobile ? "md:ml-64" : "md:ml-0"} 
    flex-1 min-h-screen bg-gray-50 relative
  `;

  return (
    <div className="flex h-screen bg-gray-50">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
      />

      <div className={mainContentClass}>
        <div className="bg-white border-b sticky top-0 z-10 md:hidden">
          <div className="px-4 py-3 flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 mr-4"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Appointment Management
            </h1>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-12 w-12 text-teal-500 animate-spin" />
                <span className="text-teal-500 text-lg">
                  Loading Appointments...
                </span>
              </div>
            </div>
          ) : (
            <Card className="w-full">
              <div className="p-2 sm:p-4">
                <PatientTable
                  patients={patients}
                  handleViewDetails={handleViewDetails}
                  isLoading={isLoading}
                />
              </div>
            </Card>
          )}
        </div>

        <PatientModal
          isViewModalOpen={isViewModalOpen}
          selectedPatient={selectedPatient}
          setIsViewModalOpen={setIsViewModalOpen}
        />
      </div>
    </div>
  );
};

export default PatientDashboard;
