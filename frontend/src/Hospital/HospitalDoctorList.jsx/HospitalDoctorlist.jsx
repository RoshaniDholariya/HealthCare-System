import React, { useState, useEffect } from "react";
import {
  Menu,
  Plus,
  X,
  UserX,
  Loader2,
  Filter,
  Award,
  Mail,
  Phone,
  MapPin,
  Info,
  User,
  Droplet,
} from "lucide-react";
import Sidebar from "../HospitalSidebar";
import axios from "axios";
import AddDoctor from "./AddDoctor";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DoctorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const SPECIALTIES = [
    {
      name: "Cardiology",
    },
    {
      name: "Dermatology",
    },
    {
      name: "Endocrinology",
    },
    {
      name: "Gastroenterology",
    },
    {
      name: "General Surgery",
    },
    { name: "Gynecology" },
    {
      name: "Hematology",
    },
    {
      name: "Internal Medicine",
    },
    { name: "Nephrology" },
    {
      name: "Neurology",
    },
    {
      name: "Oncology",
    },
    {
      name: "Ophthalmology",
    },
    {
      name: "Orthopedics",
    },
    {
      name: "Otolaryngology",
    },
    { name: "Pediatrics" },
    {
      name: "Psychiatry",
    },
    {
      name: "Pulmonology",
    },
    { name: "Radiology" },
    {
      name: "Rheumatology",
    },
    {
      name: "Urology",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 768);
      setIsSidebarOpen(screenWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/healthorg/getDoctor`,
        { withCredentials: true }
      );
      setDoctors(response.data.doctors || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDoctorSuccess = () => {
    fetchDoctors();
    setShowAddDoctor(false);
  };

  const filteredDoctors = Array.isArray(doctors)
    ? doctors.filter((doctor) => {
        const matchesDepartment = selectedDepartment
          ? doctor.specialty === selectedDepartment
          : true;
        const matchesSearch = searchTerm
          ? doctor.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.lastname.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
        return matchesDepartment && matchesSearch;
      })
    : [];

  const FilterDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
      >
        <Filter className="h-5 w-5" />
        <span className="hidden sm:inline">Filter by Department</span>
      </button>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-4 z-50">
          <div className="space-y-2">
            <button
              onClick={() => {
                setSelectedDepartment("");
                setShowFilters(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedDepartment === ""
                  ? "bg-teal-50 text-teal-600"
                  : "hover:bg-gray-50"
              }`}
            >
              All Departments
            </button>
            {SPECIALTIES.map((specialty) => (
              <button
                key={specialty.name}
                onClick={() => {
                  setSelectedDepartment(specialty.name);
                  setShowFilters(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedDepartment === specialty.name
                    ? "bg-teal-50 text-teal-600"
                    : "hover:bg-gray-50"
                }`}
              >
                {specialty.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  const DoctorModal = ({ doctor, onClose }) => {
    if (!doctor) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
        <Card className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
          <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b p-4 flex justify-between items-center z-10">
            <h2 className="text-2xl font-bold text-gray-900">Doctor Profile</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <img
                    src={doctor.photo || "/api/placeholder/160/160"}
                    alt={`${doctor.firstname} ${doctor.lastname}`}
                    className="w-40 h-40 rounded-2xl object-cover shadow-lg ring-4 ring-white"
                  />
                  <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-teal-500 hover:bg-teal-600 px-4 py-1.5">
                    {doctor.specialty}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  <Badge variant="outline" className="px-3 py-1">
                    <Award className="w-4 h-4 mr-1" />
                    {doctor.qualifications}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {`Dr. ${doctor.firstname} ${doctor.lastname}`}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-5 h-5" />
                        <span>{doctor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-5 h-5" />
                        <span>{doctor.contact}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <span>{doctor.address}</span>
                      </div>
                      {/* <div className="flex items-center gap-2 text-gray-600">
                        <Info className="w-5 h-5" />
                        <span>ID: {doctor.accessId}</span>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium text-gray-500">
                        Age
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        {doctor.age}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium text-gray-500">
                        Gender
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        {doctor.gender}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium text-gray-500">
                        Blood Group
                      </span>
                      <div className="flex items-center gap-1">
                        <Droplet className="w-4 h-4 text-red-500" />
                        <span className="text-lg font-semibold text-gray-900">
                          {doctor.BloodGroup}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium text-gray-500">
                        Experience
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        {doctor.experience}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Info className="w-5 h-5" />
                      <span>ID: {doctor.accessId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const mainContentClass = `
  transition-all duration-300 ease-in-out 
  ${isSidebarOpen && !isMobile ? "md:ml-64" : "md:ml-0"} 
  flex-1 min-h-screen bg-gray-50
`;
  return (
    <div className="flex h-screen bg-gray-50">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`
        fixed top-0 left-0 h-full bg-white shadow-lg z-50
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        ${isMobile ? "w-64" : "w-64"}
      `}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      <div className={mainContentClass}>
        <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {isMobile && (
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Menu className="h-6 w-6 text-gray-600" />
                  </button>
                )}
                <h1 className="text-2xl font-semibold text-gray-800">
                  Doctor Management
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <FilterDropdown />

                <button
                  onClick={() => setShowAddDoctor(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm whitespace-nowrap"
                >
                  <Plus className="h-5 w-5" />
                  <span className="hidden sm:inline">Add Doctor</span>
                </button>
              </div>
            </div>

            {selectedDepartment && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">Filtered by:</span>
                <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm flex items-center gap-2">
                  {selectedDepartment}
                  <button
                    onClick={() => setSelectedDepartment("")}
                    className="hover:bg-teal-100 rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          {showAddDoctor ? (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Add New Doctor
                </h2>
                <button
                  onClick={() => setShowAddDoctor(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <AddDoctor onSuccess={handleAddDoctorSuccess} />
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
                <span className="text-gray-600">Loading doctors...</span>
              </div>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
              <UserX className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Doctors Found
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                {searchTerm || selectedDepartment
                  ? "No doctors match your search criteria. Try adjusting your filters."
                  : "There are currently no doctors registered. Click the 'Add Doctor' button to get started."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="group hover:shadow-lg transition-all duration-300"
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <img
                          src={doctor.photo || "/api/placeholder/96/96"}
                          alt={doctor.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-teal-500 text-white px-3 py-1 rounded-full text-xs">
                          {doctor.specialty}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-center mb-1 group-hover:text-teal-600 transition-colors">
                        {doctor.firstname} {doctor.lastname}
                      </h3>
                      <p className="text-gray-600 text-sm">{doctor.contact}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {isModalOpen && (
          <DoctorModal
            doctor={selectedDoctor}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedDoctor(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
