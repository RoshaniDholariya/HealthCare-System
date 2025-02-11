import React, { useState, useEffect } from "react";
import {
  Menu,
  Bell,
  Search,
  Settings,
  Calendar,
  FileText,
  Users,
  Clock,
  ChevronDown,
  Activity,
  AlertCircle,
  Plus,
  Heart,
  LayoutDashboard,
} from "lucide-react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../PatientSidebar";

const PatientDashboard = () => {
  const { currentUser } = useSelector((state) => state.user || {});
  const [user, setUser] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, healthResponse, appointmentsResponse] =
          await Promise.all([
            fetch(
              `${import.meta.env.VITE_BACKEND_URL}/temp/profile/${
                currentUser.data.user.id
              }`
            ),
            fetch(
              `${import.meta.env.VITE_BACKEND_URL}/temp/health-data/${
                currentUser.data.user.id
              }`
            ),
            fetch(
              `${import.meta.env.VITE_BACKEND_URL}/temp/appointments/${
                currentUser.data.user.id
              }`
            ),
          ]);

        const [userData, healthData, appointmentsData] = await Promise.all([
          userResponse.json(),
          healthResponse.json(),
          appointmentsResponse.json(),
        ]);

        setUser(userData);
        setHealthData(healthData);
        setAppointments(appointmentsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-teal-600 font-medium text-lg">
            Loading your health dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Header */}
        <header
          className={`sticky top-0 z-10 transition-all duration-300 ${
            isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"
          }`}
        >
          <div className="px-4 py-4 mx-auto max-w-7xl">
            <div className="flex items-center justify-between gap-4">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>

              <div className="flex-1">
                <div className="hidden lg:block">
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    Welcome back, {user?.username}! 👋
                  </h1>
                  <p className="text-gray-600">
                    Here's your health overview for today
                  </p>
                </div>
                <div className="lg:hidden">
                  <h1 className="text-xl font-bold text-gray-900">
                    Hi, {user?.username}!
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-all"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-teal-500/30">
                      {user?.avatar ? (
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6upkc6jjdNBwfdiHyTHtOv0M4C2YHf4nmCQ&s"
                          alt={user.username}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium">
                          {user?.username?.[0]?.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="hidden lg:block">
                      <p className="font-medium text-gray-900">
                        {user?.username}
                      </p>
                      <p className="text-sm text-teal-600">Patient</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <Link
                        to="/contact"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Help Center
                      </Link>
                      <Link
                        to="/signin"
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto px-4 lg:px-6 py-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Overview Card */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-xl p-6 lg:p-8 text-white">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white/30 shadow-lg">
                  {user?.avatar ? (
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6upkc6jjdNBwfdiHyTHtOv0M4C2YHf4nmCQ&s"
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white flex items-center justify-center text-teal-600 text-2xl font-bold">
                      {user?.username?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                    Health Overview
                  </h2>
                  <p className="text-teal-100 mb-4">Patient ID: #{user?.id}</p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      Blood Type: {healthData?.bloodType}
                    </span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {healthData?.insuranceProvider}
                    </span>
                  </div>
                </div>

                <Link
                  to="/patient-appointments"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-teal-600 rounded-xl shadow-lg hover:bg-teal-50 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">New Appointment</span>
                </Link>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Appointments Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Upcoming Appointments
                    </h3>
                    <p className="text-gray-500">Your scheduled visits</p>
                  </div>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {appointments
                    .filter((apt) => apt.status === "BOOKED")
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-teal-100">
                          {appointment.doctor.photo ? (
                            <img
                              src={appointment.doctor.photo}
                              alt={`${appointment.doctor.firstname} ${appointment.doctor.lastname}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-teal-50 flex items-center justify-center text-teal-600 font-medium">
                              {`${appointment.doctor.firstname[0]}${appointment.doctor.lastname[0]}`}
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">
                                Dr. {appointment.doctor.firstname}{" "}
                                {appointment.doctor.lastname}
                              </p>
                              <p className="text-sm text-gray-600">
                                {format(
                                  new Date(appointment.date),
                                  "EEEE, MMMM d"
                                )}
                              </p>
                            </div>
                            <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm">
                              {format(new Date(appointment.startTime), "HH:mm")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Emergency Info Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Emergency Information
                    </h3>
                    <p className="text-gray-500">
                      Important contacts and details
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Primary Contact",
                      content: [
                        healthData?.emergencyContactName || "Not set",
                        healthData?.emergencyContactNumber ||
                          "No number provided",
                      ],
                      icon: <Users className="w-5 h-5" />,
                    },
                    {
                      title: "Blood Type",
                      content: [healthData?.bloodType || "Not specified"],
                      icon: <Activity className="w-5 h-5" />,
                    },
                    {
                      title: "Insurance Details",
                      content: [
                        `Provider: ${
                          healthData?.insuranceProvider || "Not specified"
                        }`,
                        `Policy: ${
                          healthData?.policyNumber || "Not available"
                        }`,
                      ],
                      icon: <FileText className="w-5 h-5" />,
                    },
                    {
                      title: "Allergies & Conditions",
                      content: [
                        healthData?.allergies || "No known allergies",
                        healthData?.chronicConditions ||
                          "No chronic conditions",
                      ],
                      icon: <AlertCircle className="w-5 h-5" />,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-100 transition-colors">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {item.title}
                          </h4>
                          {item.content.map((line, idx) => (
                            <p key={idx} className="text-sm text-gray-600">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Custom Scrollbar Styles */}
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #0d9488;
            border-radius: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #0f766e;
          }

          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #0d9488 #f1f5f9;
          }

          @media (max-width: 768px) {
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PatientDashboard;
