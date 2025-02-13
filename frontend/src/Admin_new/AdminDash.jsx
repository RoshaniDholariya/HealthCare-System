import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Activity } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard_New = () => {
  const [activeNav, setActiveNav] = useState("Hospitals");
  const { currentUser } = useSelector((state) => state.user || {});
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [dashboardanalytics, setdashboardanalytics] = useState({});

  useEffect(() => {
    if (
      !currentUser?.data?.user.role ||
      currentUser?.data?.user.role !== "ADMIN"
    ) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetchOrganizations();
    dashboardananalytics();
  }, []);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/org`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setOrganizations(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch organizations");
      console.error("Error fetching organizations:", err);
    } finally {
      setLoading(false);
    }
  };

  const dashboardananalytics = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/analytics/dashboard`,
        {
          withCredentials: true,
        }
      );
      setdashboardanalytics(response.data);
    } catch (err) {
      setError("Failed to fetch analytics");
      console.error("Error fetching analytics:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="p-8">
        {/* Header section */}
        <div className="flex justify-between items-center ml-64 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, Admin
            </h1>
            <p className="text-gray-500">Here's what's happening today</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
              <Avatar>
                <AvatarImage src={currentUser.data.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ml-64">
          {[
            {
              title: "Hospitals",
              value: dashboardanalytics.healthOrgs,
              icon: Building2,
              color: "teal",
            },
            {
              title: "Doctors",
              value: dashboardanalytics.doctors,
              icon: Users,
              color: "blue",
            },
            {
              title: "Patients",
              value: dashboardanalytics.users,
              icon: Activity,
              color: "indigo",
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    {item.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-${item.color}-50`}>
                    <item.icon className={`h-6 w-6 text-${item.color}-500`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-800">
                    {item.value}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard_New;
