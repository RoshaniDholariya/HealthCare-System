// Hospital.jsx - Main Component
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrganizationForm from "./OrganizationForm";
import ServicesSection from "./Services";
import SpecialtiesSection from "./Speciality";

const Hospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState("");
  const [addingOrg, setAddingOrg] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [otherService, setOtherService] = useState("");
  const navigate = useNavigate();
  const [newOrg, setNewOrg] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    certificate: "",
    services: "",
  });
  const [certificates, setCertificates] = useState([]);

  const handleAddOrganization = async (e) => {
    e.preventDefault();
    setAddingOrg(true);
    try {
      const organizationData = {
        ...newOrg,
        specialties: selectedSpecialties,
        services: [
          ...selectedServices,
          ...(otherService ? [otherService] : []),
        ],
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/add`,
        organizationData,
        {
          withCredentials: true,
        }
      );

      setHospitals([...hospitals, response.data.organization]);
      setNewOrg({
        name: "",
        address: "",
        contact: "",
        services: "",
        email: "",
        certificate: "",
      });
      setSelectedSpecialties([]);
      navigate("/");
    } catch (error) {
      setError("Failed to add organization");
      console.error(error);
    } finally {
      setAddingOrg(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <Card className="max-w-7xl mx-auto shadow-xl">
        <CardContent className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Add New Organization
            </h2>
            <p className="text-sm text-gray-600">
              Fill in the details to add a new healthcare organization to our
              network
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleAddOrganization} className="space-y-8">
            <OrganizationForm newOrg={newOrg} setNewOrg={setNewOrg} />

            <ServicesSection
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
              otherService={otherService}
              setOtherService={setOtherService}
              certificates={certificates}
              setCertificates={setCertificates}
            />

            <SpecialtiesSection
              selectedSpecialties={selectedSpecialties}
              setSelectedSpecialties={setSelectedSpecialties}
            />

            <Button
              type="submit"
              className={`w-full h-12 text-base font-medium transition-all duration-300
                ${
                  addingOrg
                    ? "bg-teal-500 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-100 active:transform active:scale-[0.99]"
                }`}
              disabled={addingOrg}
            >
              {addingOrg ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  <span>Adding Organization...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add Organization</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Hospital;
