import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import {
  Check,
  X,
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  Shield,
  ListChecks,
  FileText,
} from "lucide-react";

const HospitalDetailsView = ({
  selectedHospital,
  handleBack,
  handleStatusUpdate,
  isSidebarOpen,
  setIsSidebarOpen,
  isMobile,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isMobile={isMobile}
      />
      <div
        className={`flex-1 overflow-auto transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : ""
        }`}
      >
        <div className="p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to List
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">
                Hospital Details
              </h1>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {selectedHospital.name}
                  </h2>
                  <Badge className={getStatusColor(selectedHospital.status)}>
                    {selectedHospital.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-700">
                        Basic Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Building2 className="w-5 h-5 text-gray-500 mt-1" />
                          <p className="text-gray-600">
                            {selectedHospital.address}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-5 h-5 text-gray-500" />
                          <p className="text-gray-600">
                            {selectedHospital.contact}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-5 h-5 text-gray-500" />
                          <p className="text-gray-600">
                            {selectedHospital.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-gray-500" />
                          <p className="text-gray-600">
                            Access ID: {selectedHospital.accessId}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-700">Documents</h3>
                      <div className="space-y-3">
                        {[
                          "Registration Certificate",
                          "License",
                          "Accreditation",
                        ].map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{doc}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-700">
                        Specialities
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedHospital.specialities.map((spec, index) => (
                          <Badge key={index} variant="secondary">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-700">Services</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedHospital.services.map((service, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-gray-50 p-2 rounded"
                          >
                            <ListChecks className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedHospital.status === "Pending" && (
                      <div className="pt-4">
                        <h3 className="font-medium text-gray-700 mb-4">
                          Actions
                        </h3>
                        <div className="flex gap-3">
                          <Button
                            className="flex-1"
                            onClick={() =>
                              handleStatusUpdate(
                                selectedHospital.id,
                                "Approved"
                              )
                            }
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            className="flex-1"
                            onClick={() =>
                              handleStatusUpdate(
                                selectedHospital.id,
                                "Rejected"
                              )
                            }
                          >
                            <X className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailsView;
