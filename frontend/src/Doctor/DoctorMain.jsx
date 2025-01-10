import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DoctorSchedule from "./DoctorSchedule";
import Sidebar from "./DoctorSidebar/Doctorsidebar";
import { Button } from "@/components/ui/button"; // Ensure this is correctly imported
import { Menu } from "lucide-react"; // Ensure Menu icon is imported

const MainContent = ({ user, healthData }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Detect scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Set scroll condition
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
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
                <Menu className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto px-4 lg:px-6 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-6">
            <Card className="lg:col-span-3 border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-teal-500 to-teal-600 text-white">
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
                    <div className="flex gap-3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DoctorSchedule />
        </main>
      </div>
    </div>
  );
};

export default MainContent;
