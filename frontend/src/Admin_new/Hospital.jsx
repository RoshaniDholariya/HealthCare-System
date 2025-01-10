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
  Bone,
  Syringe,
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
import { Checkbox } from "@/components/ui/checkbox";

const Hospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [addingOrg, setAddingOrg] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [newOrg, setNewOrg] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    contact: "",
    services: "",
    email: "",
    location: "",
  });

  const SPECIALTIES = [
    {
      name: "Cardiology",
      icon: Heart,
      description: "[❤️] Heart and cardiovascular system",
    },
    {
      name: "Dermatology",
      icon: Sun,
      description: "[🌞] Skin conditions and treatments",
    },
    {
      name: "Endocrinology",
      icon: FlaskConical,
      description: "[⚗️] Hormone and metabolic disorders",
    },
    {
      name: "Gastroenterology",
      icon: Pill,
      description: "[💊] Digestive system disorders",
    },
    {
      name: "General Surgery",
      icon: Scissors,
      description: "[✂️] Surgical procedures",
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
      description: "[👨‍⚕️] General adult medicine",
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
      description: "[👁️] Eye care and surgery",
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

  const SpecialtyCard = ({ specialty, isSelected, onToggle }) => {
    const IconComponent = specialty.icon;

    return (
      <div className="p-3 rounded-lg border transition-all">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-full ${
              isSelected ? "bg-teal-100" : "bg-gray-100"
            }`}
          >
            <IconComponent
              className={`h-4 w-4 ${
                isSelected ? "text-teal-600" : "text-gray-600"
              }`}
            />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{specialty.name}</p>
            <p className="text-xs text-gray-500">{specialty.description}</p>
          </div>
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggle(specialty.name)}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/org`,
          {
            withCredentials: true,
          }
        );
        setHospitals(response.data.data);
      } catch (error) {
        setError("Failed to fetch hospital data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

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
        latitude: "",
        longitude: "",
        contact: "",
        services: "",
        email: "",
        location: "",
      });
      setSelectedSpecialties([]);
      setDialogOpen(false);
    } catch (error) {
      setError("Failed to add organization");
      console.error(error);
    } finally {
      setAddingOrg(false);
    }
  };

  const handleViewDetails = (hospital) => {
    setSelectedHospital(hospital);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-teal-600">Hospitals</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Organization
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Add New Health Organization</DialogTitle>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto mt-4">
                <form onSubmit={handleAddOrganization}>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Left column */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Organization Name</Label>
                        <Input
                          id="name"
                          value={newOrg.name}
                          onChange={(e) =>
                            setNewOrg({ ...newOrg, name: e.target.value })
                          }
                          placeholder="Enter organization name"
                          required
                        />
                      </div>
                      <div>
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
                      <div>
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
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="latitude">Latitude</Label>
                          <Input
                            id="latitude"
                            type="number"
                            step="any"
                            value={newOrg.latitude}
                            onChange={(e) =>
                              setNewOrg({
                                ...newOrg,
                                latitude: e.target.value,
                              })
                            }
                            placeholder="Latitude"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="longitude">Longitude</Label>
                          <Input
                            id="longitude"
                            type="number"
                            step="any"
                            value={newOrg.longitude}
                            onChange={(e) =>
                              setNewOrg({
                                ...newOrg,
                                longitude: e.target.value,
                              })
                            }
                            placeholder="Longitude"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="contact">Contact</Label>
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
                      <div>
                        <Label htmlFor="email">Email</Label>
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
                      <div>
                        <Label htmlFor="services">Services</Label>
                        <Input
                          id="services"
                          value={newOrg.services}
                          onChange={(e) =>
                            setNewOrg({ ...newOrg, services: e.target.value })
                          }
                          placeholder="Enter services (comma-separated)"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Specialties Section */}
                  <div className="mt-6">
                    <Label className="text-lg font-semibold">Specialties</Label>
                    <p className="text-sm text-gray-500 mb-4">
                      Select the medical specialties offered at this facility
                    </p>
                    <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-4 border rounded-lg">
                      {SPECIALTIES.map((specialty) => (
                        <SpecialtyCard
                          key={specialty.name}
                          specialty={specialty}
                          isSelected={selectedSpecialties.includes(
                            specialty.name
                          )}
                          onToggle={handleSpecialtyChange}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <Button
                      type="submit"
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      disabled={addingOrg}
                    >
                      {addingOrg ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Adding Organization...
                        </div>
                      ) : (
                        "Add Organization"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p>Loading hospitals...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-teal-600 font-semibold">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Location</th>
                  <th className="px-4 py-2 border">Doctors</th>
                  <th className="px-4 py-2 border">Patients</th>
                  <th className="px-4 py-2 border">View</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital, index) => (
                  <tr
                    key={hospital.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } text-gray-700`}
                  >
                    <td className="px-4 py-2 border">{hospital.name}</td>
                    <td className="px-4 py-2 border">{hospital.address}</td>
                    <td className="px-4 py-2 border">
                      {hospital._count?.doctors || 0}
                    </td>
                    <td className="px-4 py-2 border">
                      {hospital.numberOfPatients || 0}
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        className="text-teal-600 hover:underline"
                        onClick={() => handleViewDetails(hospital)}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View Hospital Details Dialog */}
        <Dialog
          open={selectedHospital !== null}
          onOpenChange={() => setSelectedHospital(null)}
        >
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{selectedHospital?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>
                <strong>Location:</strong> {selectedHospital?.address}
              </p>
              <p>
                <strong>Contact:</strong> {selectedHospital?.contact}
              </p>
              <p>
                <strong>Services:</strong> {selectedHospital?.services}
              </p>
              <p>
                <strong>Email:</strong> {selectedHospital?.email}
              </p>
              {selectedHospital?.specialties && (
                <div>
                  <strong>Specialties:</strong>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {selectedHospital.specialties.map((specialty) => (
                      <div
                        key={specialty}
                        className="p-2 bg-teal-50 text-teal-700 rounded"
                      >
                        {specialty}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Hospital;
