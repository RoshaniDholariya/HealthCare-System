import React from "react";
import {
  Eye,
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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const handleClick = (e) => {
    // Prevent click event if clicking on the checkbox itself
    if (e.target.tagName !== "INPUT") {
      onToggle(specialty.name);
    }
  };

  return (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? "bg-teal-50 border border-teal-200"
            : "hover:bg-gray-50 border border-transparent hover:border-gray-200"
        }`}
      onClick={handleClick}
    >
      <div
        className={`p-2 rounded-full transition-colors duration-200 
          ${isSelected ? "bg-teal-100" : "bg-gray-100"}`}
      >
        <IconComponent
          className={`h-4 w-4 ${
            isSelected ? "text-teal-600" : "text-gray-600"
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium cursor-pointer ${
            isSelected ? "text-teal-700" : "text-gray-700"
          }`}
        >
          {specialty.name}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {specialty.description}
        </p>
      </div>
      <Checkbox
        checked={isSelected}
        onCheckedChange={() => onToggle(specialty.name)}
        className="border-gray-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
      />
    </div>
  );
};

const SpecialtiesSection = ({
  selectedSpecialties,
  setSelectedSpecialties,
}) => {
  const handleSpecialtyChange = (specialtyName) => {
    setSelectedSpecialties((prev) => {
      if (prev.includes(specialtyName)) {
        return prev.filter((s) => s !== specialtyName);
      }
      return [...prev, specialtyName];
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-t pt-6">
        <Label className="text-xl font-semibold text-gray-900">
          Medical Specialties
        </Label>
        <p className="text-sm text-gray-600 mt-1">
          Select all specialties available at this facility
        </p>
      </div>

      <ScrollArea className="h-[450px] rounded-xl border border-gray-200 bg-gray-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
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
  );
};

export default SpecialtiesSection;
