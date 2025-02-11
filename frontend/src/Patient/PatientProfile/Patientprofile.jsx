import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Award,
  Heart,
  MapPin,
  FileText,
  Calendar,
  Edit2,
  Save,
  Clock,
  Star,
  Building2,
} from "lucide-react";

const DoctorProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Wilson",
    age: "35",
    gender: "Female",
    contact: "+1 (555) 123-4567",
    email: "sarah.wilson@medical.com",
    qualifications: "MD, PhD in Cardiology",
    specialty: "Cardiologist",
    bloodGroup: "A+",
    address: "123 Medical Center Drive, New York, NY",
    postalCode: "10001",
    bio: "Experienced cardiologist with over 10 years of practice in interventional cardiology. Specialized in complex cardiac procedures and preventive cardiology.",
  });
  const nextAppointments = [
    { time: "09:00 AM", patient: "John Doe", type: "Checkup" },
    { time: "10:30 AM", patient: "Jane Smith", type: "Consultation" },
    { time: "02:00 PM", patient: "Mike Johnson", type: "Follow-up" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-teal-500 to-teal-600"></div>
          <div className="relative px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20 mb-4 sm:mb-0">
              <div className="relative">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-teal-500 p-2 rounded-full text-white hover:bg-teal-600">
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900">
                  Dr. {profileData.firstName} {profileData.lastName}
                </h1>
                <p className="text-teal-600 font-medium">
                  {profileData.specialty}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {profileData.qualifications}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="mt-6 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {["overview"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      About Me
                    </h3>
                    <p className="text-gray-600">{profileData.bio}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Today's Appointments
                    </h3>
                    <div className="space-y-4">
                      {nextAppointments.map((apt, index) => (
                        <div
                          key={index}
                          className="flex items-center p-4 bg-gray-50 rounded-xl"
                        >
                          <Clock className="w-5 h-5 text-teal-500 mr-4" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {apt.time} - {apt.patient}
                            </p>
                            <p className="text-sm text-gray-500">{apt.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-teal-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Age</p>
                          <p className="font-medium">{profileData.age} years</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 text-teal-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Blood Group</p>
                          <p className="font-medium">
                            {profileData.bloodGroup}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-teal-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{profileData.contact}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-teal-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{profileData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-teal-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">{profileData.address}</p>
                          <p className="text-sm text-gray-500">
                            Postal: {profileData.postalCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
