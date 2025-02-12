import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Building2,
  Users,
  Activity,
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  TrendingUp,
  MapPin,
  UserRound,
  Mail,
  Phone,
  Bell,
  Stethoscope,
  Heart,
  Eye,
  Brain,
  Bone,
  Microscope,
  Baby,
  Pill,
  Sun,
  Scissors,
  FlaskConical,
  Syringe,
} from "lucide-react";
import { GiFrontTeeth } from "react-icons/gi";
import { FaBacteria } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  { name: "Hematology", icon: Microscope, description: "[🔬] Blood disorders" },
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
  { name: "Oncology", icon: FaBacteria, description: "[🦠] Cancer treatment" },
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

const OrganizationForm = ({
  organization,
  selectedSpecialties,
  setSelectedSpecialties,
  onSubmit,
  isSubmitting,
  buttonText,
}) => {
  const [formData, setFormData] = useState(organization);
  console.log(formData);

  useEffect(() => {
    setFormData(organization);
    setSelectedSpecialties(organization.specialities || []);
  }, [organization]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, specialities: selectedSpecialties });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Organization Name</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Enter organization name"
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Enter full address"
              required
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              value={formData.contact || ""}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>

          <div>
            <Label htmlFor="services">Services</Label>
            <Input
              id="services"
              value={formData.services || ""}
              onChange={handleChange}
              placeholder="Enter services (comma-separated)"
              required
            />
          </div>
        </div>
      </div>

      {/* Specialties section */}
      <div className="mt-6">
        <Label className="text-lg font-semibold">Specialties</Label>
        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto p-4 border rounded-lg">
          {SPECIALTIES.map((specialty) => (
            <SpecialtyCard
              key={specialty.name}
              specialty={specialty}
              isSelected={selectedSpecialties.includes(specialty.name)}
              onToggle={(name) => {
                setSelectedSpecialties(
                  selectedSpecialties.includes(name)
                    ? selectedSpecialties.filter((s) => s !== name)
                    : [...selectedSpecialties, name]
                );
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            buttonText
          )}
        </Button>
      </div>
    </form>
  );
};

const AdminDashboard_New = () => {
  const [activeNav, setActiveNav] = useState("Hospitals");
  const { currentUser } = useSelector((state) => state.user || {});
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingOrg, setAddingOrg] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dashboardanalytics, setdashboardanalytics] = useState({});
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [newOrg, setNewOrg] = useState({
    name: "",
    address: "",
    contact: "",
    services: "",
    email: "",
    location: "",
    specialties: [],
  });
  const [editingOrg, setEditingOrg] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (
      !currentUser?.data?.user.role ||
      currentUser?.data?.user.role !== "ADMIN"
    ) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetchOrganizations();
    dashboardananalytics();
  }, []);

  const handleSpecialtyChange = (specialtyName) => {
    const updatedSpecialties = selectedSpecialties.includes(specialtyName)
      ? selectedSpecialties.filter((s) => s !== specialtyName)
      : [...selectedSpecialties, specialtyName];

    setSelectedSpecialties(updatedSpecialties);
  };

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/org`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setOrganizations(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch organizations");
      console.error("Error fetching organizations:", err);
    } finally {
      setLoading(false);
    }
  };

  const dashboardananalytics = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/analytics/dashboard`,
        {
          withCredentials: true,
        }
      );
      setdashboardanalytics(response.data);
    } catch (err) {
      setError("Failed to fetch analytics");
      console.error("Error fetching analytics:", err);
    }
  };

  const handleAddOrganization = async (e) => {
    e.preventDefault();
    try {
      setAddingOrg(true);

      const orgData = {
        name: newOrg.name,
        address: newOrg.address,
        latitude: newOrg.latitude,
        longitude: newOrg.longitude,
        contact: newOrg.contact,
        services: newOrg.services,
        email: newOrg.email,
      };

      console.log("Sending organization data:", orgData);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/add`,
        orgData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.organization) {
        setOrganizations([...organizations, response.data.organization]);

        // Reset form
        setNewOrg({
          name: "",
          address: "",
          contact: "",
          services: "",
          email: "",
          location: "",
        });
        setSelectedSpecialties([]);
        setDialogOpen(false);

        setError(null);
      }
    } catch (error) {
      console.error(
        "Error adding organization:",
        error.response?.data || error
      );
      setError(error.response?.data?.message || "Failed to add organization");
    } finally {
      setAddingOrg(false);
    }
  };

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SpecialtyTag = ({ specialty }) => {
    const specialtyInfo = SPECIALTIES.find((s) => s.name === specialty);
    const IconComponent = specialtyInfo?.icon || Stethoscope;

    return (
      <span className="inline-flex items-center px-2 py-1 bg-teal-50 text-teal-700 rounded-full text-xs gap-1">
        <IconComponent className="h-3 w-3" />
        {specialty} {specialtyInfo?.description.split("]")[0]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="p-8">
        {/* Header section */}
        <div className="flex justify-between items-center ml-64 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, Admin
            </h1>
            <p className="text-gray-500">Here's what's happening today</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
              <Avatar>
                <AvatarImage src={currentUser.data.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ml-64">
          {[
            {
              title: "Hospitals",
              value: dashboardanalytics.healthOrgs,
              icon: Building2,
              color: "teal",
            },
            {
              title: "Doctors",
              value: dashboardanalytics.doctors,
              icon: Users,
              color: "blue",
            },
            {
              title: "Patients",
              value: dashboardanalytics.users,
              icon: Activity,
              color: "indigo",
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    {item.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-${item.color}-50`}>
                    <item.icon className={`h-6 w-6 text-${item.color}-500`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-800">
                    {item.value}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="ml-64 p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Health Organizations
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and monitor healthcare facilities
              </p>
            </div>
          </div>

          {/* Organizations Grid */}
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading organizations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrganizations.map((org) => (
                <Card
                  key={org.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-bold">
                      {org.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-teal-600" />
                        <span>{org.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserRound className="h-4 w-4 text-teal-600" />
                        <span>
                          {org?._count?.doctors || 0} Doctors •{" "}
                          {org?.numberOfPatients || 0} Patients
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-teal-600" />
                        <span>{org.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-teal-600" />
                        <span>{org.contact}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Stethoscope className="h-4 w-4 text-teal-600" />
                          <span className="font-medium text-gray-700">
                            Specialties:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(org.specialities || []).map((specialty) => (
                            <SpecialtyTag
                              key={specialty}
                              specialty={specialty}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="font-medium text-gray-700">Services:</p>
                        <p className="mt-1">
                          {Array.isArray(org.services)
                            ? org.services.join(", ")
                            : org.services}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard_New;
