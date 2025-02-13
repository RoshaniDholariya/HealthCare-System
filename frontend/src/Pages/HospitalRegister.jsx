import React, { useState } from "react";
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
  Bone,
  Syringe,
} from "lucide-react";
import { FaBacteria } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
    location: "",
    latitude: "",
    longitude: "",
  });

  const SERVICES = [
    "Diagnostics",
    "Nursing",
    "Pharmacy",
    "Education",
    "Research",
    "Preventive care",
    "Long-term care",
    "Community health services",
    "Surgery",
    "Emergency services",
    "Rehabilitation",
    "Mental health care",
    "Other",
  ];

  const SPECIALTIES = [
    {
      name: "Cardiology",
      icon: Heart,
      description: "Heart and cardiovascular system",
    },
    {
      name: "Dermatology",
      icon: Sun,
      description: "Skin conditions and treatments",
    },
    {
      name: "Endocrinology",
      icon: FlaskConical,
      description: "Hormone and metabolic disorders",
    },
    {
      name: "Gastroenterology",
      icon: Pill,
      description: "Digestive system disorders",
    },
    {
      name: "General Surgery",
      icon: Scissors,
      description: "Surgical procedures",
    },
    { name: "Gynecology", icon: UserRound, description: "Women's health" },
    {
      name: "Hematology",
      icon: Microscope,
      description: "Blood disorders",
    },
    {
      name: "Internal Medicine",
      icon: Stethoscope,
      description: "General adult medicine",
    },
    { name: "Nephrology", icon: Activity, description: "Kidney diseases" },
    {
      name: "Neurology",
      icon: Brain,
      description: "Nervous system disorders",
    },
    {
      name: "Oncology",
      icon: FaBacteria,
      description: "Cancer treatment",
    },
    {
      name: "Ophthalmology",
      icon: Eye,
      description: "Eye care and surgery",
    },
    {
      name: "Orthopedics",
      icon: Bone,
      description: "Musculoskeletal system",
    },
    {
      name: "Otolaryngology",
      icon: UserRound,
      description: "Ear, nose, and throat",
    },
    { name: "Pediatrics", icon: Baby, description: "Children's health" },
    {
      name: "Psychiatry",
      icon: Brain,
      description: "Mental health treatment",
    },
    {
      name: "Pulmonology",
      icon: Stethoscope,
      description: "Respiratory system",
    },
    { name: "Radiology", icon: Syringe, description: "Medical imaging" },
    {
      name: "Rheumatology",
      icon: Bone,
      description: "Joint and autoimmune diseases",
    },
    {
      name: "Urology",
      icon: FlaskConical,
      description: "Urinary system disorders",
    },
  ];

  const SpecialtyCard = ({ specialty, isSelected, onToggle }) => {
    const IconComponent = specialty.icon;
    return (
      <div
        className="relative group cursor-pointer hover:shadow-md transition-all duration-200 p-3 rounded-lg border bg-white"
        onClick={() => onToggle(specialty.name)}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-full transition-colors duration-200 ${
              isSelected ? "bg-teal-100" : "bg-gray-100 group-hover:bg-teal-50"
            }`}
          >
            <IconComponent
              className={`h-4 w-4 ${
                isSelected
                  ? "text-teal-600"
                  : "text-gray-600 group-hover:text-teal-500"
              }`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{specialty.name}</p>
            <p className="text-xs text-gray-500 truncate">
              {specialty.description}
            </p>
          </div>
          <Checkbox
            checked={isSelected}
            className="transition-transform duration-200 group-hover:scale-110"
          />
        </div>
      </div>
    );
  };

  const handleServiceChange = (service) => {
    setSelectedServices((prev) => {
      if (prev.includes(service)) {
        return prev.filter((s) => s !== service);
      }
      return [...prev, service];
    });
  };

  const handleSpecialtyChange = (specialtyName) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialtyName)
        ? prev.filter((s) => s !== specialtyName)
        : [...prev, specialtyName]
    );
  };

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
        location: "",
      });
      setSelectedSpecialties([]);
      navigate("/");
      // setDialogOpen(false);
    } catch (error) {
      setError("Failed to add organization");
      console.error(error);
    } finally {
      setAddingOrg(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <Card className="max-w-7xl mx-auto">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Add New Organization
            </h2>
            <p className="text-sm text-gray-500">
              Fill in the details to add a new healthcare organization
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleAddOrganization} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Organization Name</Label>
                  <Input
                    id="name"
                    value={newOrg.name}
                    onChange={(e) =>
                      setNewOrg({ ...newOrg, name: e.target.value })
                    }
                    placeholder="Enter organization name"
                    className="transition-all duration-200 focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newOrg.location}
                    onChange={(e) =>
                      setNewOrg({ ...newOrg, location: e.target.value })
                    }
                    placeholder="Enter city/location"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newOrg.address}
                    onChange={(e) =>
                      setNewOrg({ ...newOrg, address: e.target.value })
                    }
                    placeholder="Enter full address"
                    required
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    value={newOrg.contact}
                    onChange={(e) =>
                      setNewOrg({ ...newOrg, contact: e.target.value })
                    }
                    placeholder="Enter contact number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newOrg.email}
                    onChange={(e) =>
                      setNewOrg({ ...newOrg, email: e.target.value })
                    }
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Services</Label>
                    <p className="text-sm text-gray-500 mb-2">
                      Select the services offered
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICES.map((service) => (
                      <div
                        key={service}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={service}
                          checked={selectedServices.includes(service)}
                          onCheckedChange={() => handleServiceChange(service)}
                        />
                        <Label htmlFor={service} className="text-sm">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {selectedServices.includes("Other") && (
                    <div className="mt-2">
                      <Input
                        placeholder="Specify other service"
                        value={otherService}
                        onChange={(e) => setOtherService(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-lg font-semibold">Specialties</Label>
                <p className="text-sm text-gray-500">
                  Select the medical specialties offered at this facility
                </p>
              </div>

              <ScrollArea className="h-[400px] rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                  {SPECIALTIES.map((specialty) => (
                    <SpecialtyCard
                      key={specialty.name}
                      specialty={specialty}
                      isSelected={selectedSpecialties.includes(specialty.name)}
                      onToggle={handleSpecialtyChange}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200"
              disabled={addingOrg}
            >
              {addingOrg ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  <span>Adding Organization...</span>
                </div>
              ) : (
                "Add Organization"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Hospital;
