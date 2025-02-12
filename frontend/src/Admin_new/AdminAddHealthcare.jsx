import React, { useState, useEffect } from "react";
import HospitalListView from "./HospitalList";
import HospitalDetailsView from "./Hospital";

const AdminAddHealthcare = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [view, setView] = useState("list");

  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "City General Hospital",
      address: "123 Healthcare Ave, Medical District",
      contact: "+1 (555) 123-4567",
      status: "Pending",
      email: "info@citygeneral.com",
      services: ["Emergency Care", "Surgery", "Pediatrics"],
      accessId: "CGH001",
      specialities: ["Cardiology", "Neurology", "Orthopedics"],
    },
    {
      id: 2,
      name: "Metro Medical Center",
      address: "456 Wellness Blvd, Health Zone",
      contact: "+1 (555) 987-6543",
      status: "Pending",
      email: "contact@metromedical.com",
      services: ["ICU", "Radiology", "Laboratory"],
      accessId: "MMC002",
      specialities: ["Oncology", "Dermatology", "Psychiatry"],
    },
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    setHospitals(
      hospitals.map((hospital) =>
        hospital.id === id ? { ...hospital, status: newStatus } : hospital
      )
    );
  };

  const handleViewDetails = (hospital) => {
    setSelectedHospital(hospital);
    setView("details");
  };

  const handleBack = () => {
    setSelectedHospital(null);
    setView("list");
  };

  return view === "list" ? (
    <HospitalListView
      hospitals={hospitals}
      handleStatusUpdate={handleStatusUpdate}
      handleViewDetails={handleViewDetails}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      isMobile={isMobile}
    />
  ) : (
    <HospitalDetailsView
      selectedHospital={selectedHospital}
      handleBack={handleBack}
      handleStatusUpdate={handleStatusUpdate}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      isMobile={isMobile}
    />
  );
};

export default AdminAddHealthcare;
