import React, { useState, useEffect } from "react";
import {
  Menu,
  TrendingUp,
  Users,
  Clock,
  BedDouble,
  HeartPulse,
} from "lucide-react";
import Sidebar from "./HospitalSidebar.jsx";

const HospitalDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const doctors = [
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Cardiology",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      name: "Dr. Sarah Thompson",
      specialty: "Pediatrics",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      name: "Dr. David Kim",
      specialty: "Orthopedics",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
      name: "Dr. Jessica Liu",
      specialty: "Oncology",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    },
  ];

  const statsCards = [
    {
      icon: BedDouble,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
      label: "Bed Occupancy",
      value: "82%",
      trend: "↑ 3% this week",
      trendColor: "text-teal-600",
    },
    {
      icon: Users,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      label: "Active Patients",
      value: "346",
      trend: "↑ 12 today",
      trendColor: "text-indigo-600",
    },
    {
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      label: "Avg. Wait Time",
      value: "18m",
      trend: "↓ 2m from avg",
      trendColor: "text-amber-600",
    },
    {
      icon: TrendingUp,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      label: "Revenue",
      value: "$52.4k",
      trend: "↑ 8% this month",
      trendColor: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isMobile={isMobile}
      />

      <div
        className={`
          flex-1 transition-all duration-300 
          ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}
        `}
      >
        <nav className="bg-white shadow-sm border-b px-6 flex items-center">
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </nav>

        <div className="p-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-xl p-6 mb-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome Back, City Hospital
                </h1>
                <p className="text-sm md:text-base opacity-80">
                  Access ID: CN_ORG_505D2E4B
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <HeartPulse className="w-12 h-12 text-white opacity-70" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className="
                  bg-white rounded-xl p-6 border border-gray-100 
                  hover:shadow-md transition-all duration-300
                "
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 ${card.iconBg} rounded-lg`}>
                    <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{card.label}</p>
                    <h4 className="text-2xl font-bold text-gray-900">
                      {card.value}
                    </h4>
                    <p className={`text-xs ${card.trendColor}`}>{card.trend}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Doctors Section */}
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">
              Hospital Doctors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor, index) => (
                <div
                  key={index}
                  className="
                    flex items-center space-x-4 
                    p-4 bg-gray-50 rounded-xl 
                    hover:bg-gray-100 transition-colors
                  "
                >
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {doctor.name}
                    </h4>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
