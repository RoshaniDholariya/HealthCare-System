import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  Eye,
  Plus,
  Heart,
  Sun,
  FlaskConical,
  Pill,
  Scissors,
  UserRound,
  Microscope,
  Stethoscope,
  Activity,
  Brain,
  Baby,
  Syringe,
  Bone,
  Search,
} from "lucide-react";
import { FaBacteria } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SPECIALTIES = [
  {
    name: "Cardiology",
    icon: Heart,
    description: "[❤] Heart and cardiovascular system",
  },
  {
    name: "Dermatology",
    icon: Sun,
    description: "[🌞] Skin conditions and treatments",
  },
  {
    name: "Endocrinology",
    icon: FlaskConical,
    description: "[⚗] Hormone and metabolic disorders",
  },
  {
    name: "Gastroenterology",
    icon: Pill,
    description: "[💊] Digestive system disorders",
  },
  {
    name: "General Surgery",
    icon: Scissors,
    description: "[✂] Surgical procedures",
  },
  { name: "Gynecology", icon: UserRound, description: "[👩] Women's health" },
  {
    name: "Hematology",
    icon: Microscope,
    description: "[🔬] Blood disorders",
  },
  {
    name: "Internal Medicine",
    icon: Stethoscope,
    description: "[👨‍⚕] General adult medicine",
  },
  { name: "Nephrology", icon: Activity, description: "[🫘] Kidney diseases" },
  {
    name: "Neurology",
    icon: Brain,
    description: "[🧠] Nervous system disorders",
  },
  {
    name: "Oncology",
    icon: FaBacteria,
    description: "[🦠] Cancer treatment",
  },
  {
    name: "Ophthalmology",
    icon: Eye,
    description: "[👁] Eye care and surgery",
  },
  {
    name: "Orthopedics",
    icon: Bone,
    description: "[🦴] Musculoskeletal system",
  },
  {
    name: "Otolaryngology",
    icon: UserRound,
    description: "[👂] Ear, nose, and throat",
  },
  { name: "Pediatrics", icon: Baby, description: "[👶] Children's health" },
  {
    name: "Psychiatry",
    icon: Brain,
    description: "[🧠] Mental health treatment",
  },
  {
    name: "Pulmonology",
    icon: Stethoscope,
    description: "[🫁] Respiratory system",
  },
  { name: "Radiology", icon: Syringe, description: "[💉] Medical imaging" },
  {
    name: "Rheumatology",
    icon: Bone,
    description: "[🦴] Joint and autoimmune diseases",
  },
  {
    name: "Urology",
    icon: FlaskConical,
    description: "[🧪] Urinary system disorders",
  },
];

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedViewMode, setSelectedViewMode] = useState("grid");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/doctor`,
        { withCredentials: true }
      );
      setDoctors(response.data);
    } catch (error) {
      setError("Failed to fetch doctors");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty = selectedSpecialty
      ? doctor.specialty === selectedSpecialty
      : true;
    const matchesSearch = searchTerm
      ? `${doctor.firstname} ${doctor.lastname}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.organization?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : true;
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-teal-700">
              Doctors Directory
            </h1>
            <select
              className="px-4 py-2 border rounded-md bg-white"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {SPECIALTIES.map((specialty) => (
                <option key={specialty.name} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center p-4 bg-red-50 rounded-lg">
              {error}
            </div>
          ) : selectedViewMode === "table" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hospital
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDoctors.map((doctor) => (
                    <tr key={doctor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        Dr. {doctor.firstname} {doctor.lastname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {doctor.experience} years
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {doctor.specialty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {doctor.organization?.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
