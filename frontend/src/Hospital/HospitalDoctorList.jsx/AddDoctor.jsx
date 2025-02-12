import React, { useState } from "react";
import { Users, Award } from "lucide-react";

const SPECIALTIES = [
  {
    name: "Cardiology",
  },
  {
    name: "Dermatology",
  },
  {
    name: "Endocrinology",
  },
  {
    name: "Gastroenterology",
  },
  {
    name: "General Surgery",
  },
  { name: "Gynecology" },
  { name: "Hematology" },
  {
    name: "Internal Medicine",
  },
  { name: "Nephrology" },
  {
    name: "Neurology",
  },
  { name: "Oncology" },
  {
    name: "Ophthalmology",
  },
  {
    name: "Orthopedics",
  },
  {
    name: "Otolaryngology",
  },
  { name: "Pediatrics" },
  {
    name: "Psychiatry",
  },
  {
    name: "Pulmonology",
  },
  { name: "Radiology" },
  {
    name: "Rheumatology",
  },
  {
    name: "Urology",
  },
];

const QUALIFICATIONS = [
  "Bachelor of Medicine and Surgery (MBBS)",
  "Bachelor of Dental Surgery (BDS)",
  "Bachelor of Siddha Medicine & Surgery (BSMS)",
  "Bachelor of Unani Medicine & Surgery (BUMS)",
  "Bachelor of Ayurveda, Medicine, & Surgery (BAMS)",
  "Bachelor of Homeopathic Medicine & Surgery (BHMS)",
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const AddDoctor = ({ onClose }) => {
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
    experience: "",
  });
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

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
    <div className="bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
      <div className="p-6">
        {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-teal-600" />
          Add New Doctor
        </h2> */}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Enter First Name"
                  disabled={isCompleted}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Enter Last Name"
                  disabled={isCompleted}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Enter Age"
                  disabled={isCompleted}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience (Years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Enter Years of Experience"
                  disabled={isCompleted}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                  disabled={isCompleted}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                  disabled={isCompleted}
                >
                  <option value="">Select Blood Group</option>
                  {BLOOD_GROUPS.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Enter Mobile Number"
                  disabled={isCompleted}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Enter Email Address"
                  disabled={isCompleted}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Enter Address"
                  disabled={isCompleted}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Enter Postal Code"
                  disabled={isCompleted}
                />
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualification <span className="text-red-500">*</span>
                </label>
                <select
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                  disabled={isCompleted}
                >
                  <option value="">Select Qualification</option>
                  {QUALIFICATIONS.map((qual) => (
                    <option key={qual} value={qual}>
                      {qual}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty <span className="text-red-500">*</span>
                </label>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                  disabled={isCompleted}
                >
                  <option value="">Select Specialty</option>
                  {SPECIALTIES.map((specialty) => (
                    <option key={specialty.name} value={specialty.name}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all min-h-[120px]"
                  placeholder="Write your professional bio here..."
                  disabled={isCompleted}
                />
              </div>
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Profile Photo
            </h3>
            <div className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50">
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
                className={`px-6 py-3 bg-teal-50 text-teal-600 rounded-lg inline-block
                  ${
                    isCompleted
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-teal-100 transition-colors"
                  }`}
              >
                Upload Photo
              </label>
              {photo && (
                <div className="mt-4">
                  <img
                    src={photo}
                    alt="Preview"
                    className="max-w-xs mx-auto rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={isSubmitting || isCompleted}
              className={`px-6 py-2.5 bg-teal-600 text-white rounded-lg 
                ${
                  isSubmitting || isCompleted
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-teal-700 transition-colors"
                }`}
            >
              {isSubmitting ? "Creating Profile..." : "Create Doctor Profile"}
            </button>
          </div>
        </form>

        {/* Messages */}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mt-4 p-4 bg-green-50 text-green-600 rounded-lg">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDoctor;
