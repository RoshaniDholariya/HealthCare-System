import React, { useState } from "react";
import { Users, Award } from "lucide-react";

const AddDoctor = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    qualifications: "",
    specialty: "",
    bloodGroup: "",
    address: "",
    postalCode: "",
    bio: "",
  });
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const tabs = [
    { id: "personal", label: "Personal Details", icon: Users },
    { id: "profile", label: "Profile and Bio", icon: Award },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      photo: photo,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/healthorg/add-doctor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error(`Server returned an error: ${response.status}`);
      }

      setSuccessMessage("Doctor profile created successfully!");
      setErrorMessage("");
      setIsCompleted(true);
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      setErrorMessage(error.message || "An unknown error occurred.");
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              disabled={isCompleted}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-teal-500 text-teal-500"
                  : "border-transparent hover:border-gray-300"
              } ${isCompleted ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === "personal" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter First Name"
                disabled={isCompleted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Last Name"
                disabled={isCompleted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Age"
                disabled={isCompleted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                disabled={isCompleted}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Mobile Number"
                disabled={isCompleted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Email Address"
                disabled={isCompleted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Qualification <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Qualification"
                disabled={isCompleted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Specialty <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Specialty"
                disabled={isCompleted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Blood Group <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Blood Group"
                disabled={isCompleted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Address"
                disabled={isCompleted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Postal Code"
                disabled={isCompleted}
              />
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <div className="mb-4">Click here to upload your photo</div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
                disabled={isCompleted}
              />
              <label
                htmlFor="photo-upload"
                className={`px-4 py-2 bg-blue-50 text-teal-600 rounded-lg ${
                  isCompleted
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Upload Photo
              </label>
              {photo && (
                <div className="mt-4">
                  <img
                    src={photo}
                    alt="Preview"
                    className="max-w-xs mx-auto rounded-lg"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Write Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 min-h-[200px]"
                placeholder="Write your bio here..."
                disabled={isCompleted}
              />
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t flex justify-end">
          {!isCompleted && activeTab === "profile" && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-3 bg-teal-600 text-white rounded-lg ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-teal-700"
              }`}
            >
              {isSubmitting ? "Creating Profile..." : "Create Doctor Profile"}
            </button>
          )}
        </div>

        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mt-4">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default AddDoctor;
