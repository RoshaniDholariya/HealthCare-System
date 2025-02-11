import React, { useState } from "react";
import { Menu } from "lucide-react";
import AppointmentsList from "./PatientAppoinmentList";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <main className="flex-1 min-w-0 overflow-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <AppointmentsList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
