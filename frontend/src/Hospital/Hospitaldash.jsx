import React, { useState, useEffect } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  Menu,
  TrendingUp,
  Users,
  Clock,
  BedDouble,
  Heart,
  Activity,
  AlertTriangle,
} from "lucide-react";
import Sidebar from "./HospitalSidebar.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
import axios from "axios";

const HospitalDashboard = ({ hospitalId }) => {
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

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [30000, 35000, 32000, 38000, 42000, 45000],
        fill: true,
        backgroundColor: "rgba(20, 184, 166, 0.1)",
        borderColor: "#14b8a6",
        tension: 0.4,
      },
    ],
  };

  const patientDistribution = {
    labels: ["Emergency", "Outpatient", "Inpatient", "ICU", "Surgery"],
    datasets: [
      {
        data: [25, 35, 20, 10, 10],
        backgroundColor: [
          "#ef4444",
          "#14b8a6",
          "#6366f1",
          "#f59e0b",
          "#8b5cf6",
        ],
      },
    ],
  };

  const occupancyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "ICU",
        data: [85, 82, 88, 87, 86, 83, 84],
        backgroundColor: "#ef4444",
      },
      {
        label: "General",
        data: [75, 78, 72, 76, 74, 70, 73],
        backgroundColor: "#14b8a6",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
        className={`transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
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
          {/* Critical Alerts */}
          <div className="mb-6 bg-teal-50 border border-teal-600 rounded-xl p-4">
            <h1>Welcome Back, City Hospital</h1>
            <h4>email:gadhiyasaloni@gmail.com</h4>
            <h1>Access_id:CN_ORG_505D2E4B</h1>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <BedDouble className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bed Occupancy</p>
                  <h4 className="text-2xl font-bold text-gray-900">82%</h4>
                  <p className="text-xs text-teal-600">↑ 3% this week</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Patients</p>
                  <h4 className="text-2xl font-bold text-gray-900">346</h4>
                  <p className="text-xs text-indigo-600">↑ 12 today</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-lg">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg. Wait Time</p>
                  <h4 className="text-2xl font-bold text-gray-900">18m</h4>
                  <p className="text-xs text-amber-600">↓ 2m from avg</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Revenue</p>
                  <h4 className="text-2xl font-bold text-gray-900">$52.4k</h4>
                  <p className="text-xs text-purple-600">↑ 8% this month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">
                Revenue Trend
              </h3>
              <Line
                data={revenueData}
                options={{
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { beginAtZero: true, grid: { display: false } },
                  },
                }}
              />
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">
                Patient Distribution
              </h3>
              <div className="flex justify-center" style={{ height: "300px" }}>
                <Doughnut
                  data={patientDistribution}
                  options={{
                    maintainAspectRatio: false,
                    cutout: "70%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
