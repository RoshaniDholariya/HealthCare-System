import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  UserRound,
  Building2,
  Menu,
  Search,
  Plus,
  X,
} from "lucide-react";
import AppointmentModal from "./AppointmentModal";
import { useSelector } from "react-redux";
import axios from "axios";
import Sidebar from "../PatientSidebar";

const AppointmentsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user || {});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      Scheduled: "bg-teal-100 text-teal-600 border-teal-200",
      Confirmed: "bg-emerald-100 text-emerald-600 border-emerald-200",
      Pending: "bg-amber-100 text-amber-600 border-amber-200",
      Cancelled: "bg-red-100 text-red-600 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  const getFilteredAppointments = () => {
    if (!Array.isArray(appointments)) return [];
    return appointments.filter((appointment) =>
      appointment?.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleAddAppointment = (newAppointment) => {
    setAppointments((prev) =>
      Array.isArray(prev) ? [...prev, newAppointment] : [newAppointment]
    );
    setShowModal(false);
  };

  const getAppointment = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/appointment/${
          currentUser.data.user.id
        }`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAppointments(
        Array.isArray(response.data.data) ? response.data.data : []
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

  const filteredAppointments = getFilteredAppointments();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-30 w-64 bg-white shadow-xl transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:pl-64 min-h-screen">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <div className="flex items-center gap-3">
                <button
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  My Appointments
                </h1>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="sm:hidden inline-flex items-center p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-sm transition-colors gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Appointment</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-600">Loading appointments...</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden group"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors">
                        <UserRound className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-1">
                          {appointment.doctorName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {appointment.type}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Building2 className="w-5 h-5 text-teal-500 shrink-0" />
                        <span className="line-clamp-1">
                          {appointment.organizationName}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-5 h-5 text-teal-500 shrink-0" />
                        <span className="line-clamp-1">
                          {formatDate(appointment.date)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-600">
                        <Clock className="w-5 h-5 text-teal-500 shrink-0" />
                        <span>{formatTime(appointment.startTime)}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No appointments found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or create a new appointment
              </p>
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <AppointmentModal
          onClose={() => setShowModal(false)}
          onAddAppointment={handleAddAppointment}
        />
      )}
    </div>
  );
};

export default AppointmentsList;
