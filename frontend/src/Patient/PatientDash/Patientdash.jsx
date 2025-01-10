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
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import Sidebar from "../PatientSidebar";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  const { currentUser } = useSelector((state) => state.user || {});
  console.log(currentUser);
  const [user, setUser] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log(currentUser.data.user.id);
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-teal-600 font-medium">
            Loading your health dashboard...
          </p>
        </div>
      </div>
    );
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <header
          className={`sticky top-0 z-10 transition-all duration-300 ${
            isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md" : "bg-white"
          }`}
        >
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10"
                onClick={toggleSidebar}
              >
                <Menu className="h-6 w-6" />
              </Button>

              <div className="flex items-center gap-4 flex-1 justify-end lg:justify-between">
                <div className="hidden lg:block relative max-w-md">
                  {" "}
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Welcome back, {user?.username}! 👋
                  </h1>
                  <p className="text-gray-600 text-sm lg:text-base">
                    Here's an overview of your health status and upcoming
                    appointments.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-all">
                        <Avatar className="h-10 w-10 ring-2 ring-teal-500/30">
                          <AvatarImage
                            src={user?.avatar}
                            alt={user?.username}
                          />
                          <AvatarFallback className="bg-teal-50 text-teal-700">
                            {user?.username?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="hidden lg:block">
                          <span className="font-medium text-gray-900">
                            {user?.username}
                          </span>
                          <p className="text-sm text-teal-600">Patient</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-teal-500 ml-2" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 p-2">
                      <Link
                        to="/contact"
                        className="p-2 rounded-lg cursor-pointer hover:bg-teal-50"
                      >
                        Help Center
                      </Link>
                      <br />
                      <Link
                        to="/signin"
                        className="p-2 rounded-lg cursor-pointer hover:bg-red-50 text-red-600"
                      >
                        Sign Out
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto px-4 lg:px-6 py-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-6">
            <Card className="lg:col-span-2 border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-teal-500 to-teal-600 text-white">
              <CardContent className="p-10 w-auto">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24 ring-4 ring-white/30 transition-transform hover:scale-105">
                    <AvatarImage src={user?.avatar} alt={user?.username} />
                    <AvatarFallback className="bg-white text-teal-700 text-2xl">
                      {user?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">Health Overview</h2>
                    <p className="opacity-90 mb-4">Patient ID: #{user?.id}</p>
                    <div className="flex gap-3">
                      <Badge className="bg-white/20 hover:bg-white/30 transition-colors">
                        Blood Type: {healthData?.bloodType}
                      </Badge>
                      <Badge className="bg-white/20 hover:bg-white/30 transition-colors">
                        {healthData?.insuranceProvider}
                      </Badge>
                    </div>
                  </div>
                  <Link
                    to="/patient-appointments"
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-teal-600 bg-white rounded-lg shadow-md hover:bg-teal-50 hover:text-teal-700 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Appointment
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>
                      Your next scheduled visits
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {appointments
                    .filter((apt) => apt.status === "BOOKED")
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all hover:shadow-md group"
                      >
                        <Avatar className="h-12 w-12 ring-2 ring-teal-100 transition-transform group-hover:scale-105">
                          <AvatarImage
                            src={appointment.doctor.photo}
                            alt={`${appointment.doctor.firstname} ${appointment.doctor.lastname}`}
                          />
                          <AvatarFallback className="bg-teal-50 text-teal-700">
                            {`${appointment.doctor.firstname[0]}${appointment.doctor.lastname[0]}`}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium text-gray-900">
                                {appointment.doctor.firstname}{" "}
                                {appointment.doctor.lastname}
                              </p>
                              <p className="text-sm text-gray-600">
                                {format(
                                  new Date(appointment.date),
                                  "EEEE, MMMM d"
                                )}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-teal-50 border-teal-100 text-teal-600"
                            >
                              {format(new Date(appointment.startTime), "HH:mm")}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Emergency Information</CardTitle>
                    <CardDescription>
                      Important contacts and info
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
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
                      className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all hover:shadow-md group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-100 transition-colors">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-2">
                            {item.title}
                          </h3>
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
              </CardContent>
            </Card>
          </div>
        </main>
        {/* Custom scrollbar styles */}
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
