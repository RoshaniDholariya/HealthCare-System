// ServicesSection.jsx
import React, { useState } from "react";
import { Upload, X, File, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

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

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ServicesSection = ({
  selectedServices,
  setSelectedServices,
  otherService,
  setOtherService,
  certificates,
  setCertificates,
}) => {
  const [uploadError, setUploadError] = useState("");

  const handleServiceChange = (service) => {
    setSelectedServices((prev) => {
      if (prev.includes(service)) {
        return prev.filter((s) => s !== service);
      }
      return [...prev, service];
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    const errors = [];

    selectedFiles.forEach((file) => {
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        errors.push(`${file.name} is not a supported file type`);
      } else if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} exceeds 5MB size limit`);
      } else {
        validFiles.push({
          file,
          id: crypto.randomUUID(),
          status: "ready",
          progress: 0,
        });
      }
    });

    if (errors.length) {
      setUploadError(errors.join(", "));
      setTimeout(() => setUploadError(""), 5000);
    }

    setCertificates((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (fileId) => {
    setCertificates((prev) => prev.filter((f) => f.id !== fileId));
  };

  return (
    <div className="space-y-2">
      <div>
        <Label className="text-gray-700 font-medium text-lg">Services</Label>
        <p className="text-sm text-gray-500 mt-1">
          Select all applicable services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {SERVICES.map((service) => (
          <div
            key={service}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 
              ${
                selectedServices.includes(service)
                  ? "bg-teal-50 border border-teal-200"
                  : "hover:bg-gray-50 border border-transparent hover:border-gray-200"
              }`}
          >
            <Checkbox
              id={service}
              checked={selectedServices.includes(service)}
              onCheckedChange={() => handleServiceChange(service)}
              className="border-gray-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
            />
            <Label
              htmlFor={service}
              className={`flex-1 text-sm cursor-pointer font-medium 
                ${
                  selectedServices.includes(service)
                    ? "text-teal-700"
                    : "text-gray-700"
                }`}
            >
              {service}
            </Label>
          </div>
        ))}

        {selectedServices.includes("Other") && (
          <div className="mt-2 pl-8">
            <Input
              placeholder="Specify other service"
              value={otherService}
              onChange={(e) => setOtherService(e.target.value)}
              className="transition-all duration-200 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-gray-700 font-medium text-lg">
            Certificates
          </Label>
          <p className="text-sm text-gray-500 mt-1">
            Upload organization certificates and credentials
          </p>
        </div>

        {uploadError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-600">{uploadError}</p>
            </div>
          </div>
        )}

        <div
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-500 transition-colors duration-200"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileChange({ target: { files: e.dataTransfer.files } });
          }}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 bg-teal-50 rounded-full">
              <Upload className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-base font-medium text-gray-700">
                Drag & Drop certificates here
              </p>
              <p className="text-sm text-gray-500 mt-1">
                or click to browse from your computer
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              id="certificate-upload"
              multiple
              accept={ACCEPTED_FILE_TYPES.join(",")}
              onChange={handleFileChange}
            />
            <Button
              type="button"
              onClick={() =>
                document.getElementById("certificate-upload").click()
              }
              variant="outline"
              className="border-teal-200 hover:border-teal-300 hover:bg-teal-50"
            >
              Browse Files
            </Button>
            <p className="text-xs text-gray-500">
              Maximum file size: 5MB | Supported formats: PDF, JPG, PNG
            </p>
          </div>
        </div>

        {certificates.length > 0 && (
          <div className="mt-4 space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-md">
                    <File className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {cert.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(cert.file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(cert.id)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesSection;
