import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Calendar,
  LogOut,
  Settings,
  ChevronRight,
  Building,
} from "lucide-react";
import logo from "../../assets/CureNest_logo.svg";

const Sidebar = ({ activeNav, setActiveNav }) => {
  const navItems = [
    { icon: Settings, name: "Dashboard", path: "/admin/dashboard" },
    // { icon: Building2, name: "Hospitals", path: "/admin-hosp" },
    { icon: Building, name: "Hospital", path: "/admin-add-hosp" },
    { icon: Users, name: "Doctors", path: "/admin-doctors" },
    { icon: Calendar, name: "Patients", path: "/admin-patient-appointments" },
  ];

  return (
    <div className="fixed w-64 h-full bg-white border-r border-gray-200 p-4 shadow-sm">
      <div className="flex items-center space-x-2 mb-8 p-4">
        <img src={logo} alt="Logo" className="h-50 w-100 object-contain" />
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              `w-full flex items-center justify-between text-black-800 hover:bg-teal-50 group transition-all duration-200 p-2 rounded-lg ${
                isActive
                  ? "bg-teal-100 text-teal-800"
                  : "hover:bg-teal-50 active:bg-teal-100"
              }`
            }
            onClick={() => setActiveNav(item.name)}
          >
            <div className="flex items-center">
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </div>
            <ChevronRight className="h-4 w-4 transition-transform duration-200 opacity-0 group-hover:opacity-100" />
          </NavLink>
        ))}

        <div className="p-4 border-t border-teal-600">
          <a href="/adminlogin">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between text-black-800 hover:bg-teal-50 group transition-all duration-200 p-2 rounded-lg "
            >
              <div className="flex items-center justify-center gap-2">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </div>
            </Button>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
