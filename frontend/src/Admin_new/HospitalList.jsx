import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import { Check, X, Eye } from "lucide-react";

const HospitalListView = ({
  hospitals,
  handleStatusUpdate,
  handleViewDetails,
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
    <div className="flex h-screen">
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
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-teal-700">
                    Hospital Approval Requests
                  </CardTitle>
                  <CardDescription>
                    Manage and approve healthcare facility registrations
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="px-3 py-1">
                  {hospitals.filter((h) => h.status === "Pending").length}{" "}
                  Pending
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-900 text-left">
                      <th className="px-6 py-4 font-semibold text-gray-600">
                        Hospital
                      </th>
                      <th className="px-6 py-4 font-semibold text-gray-600">
                        Contact Info
                      </th>
                      <th className="px-6 py-4 font-semibold text-gray-600">
                        Status
                      </th>
                      <th className="px-6 py-4 font-semibold text-gray-600 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospitals.map((hospital) => (
                      <tr
                        key={hospital.id}
                        className="border-b border-gray-200"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {hospital.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {hospital.address}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div>{hospital.email}</div>
                            <div className="text-gray-500">
                              {hospital.contact}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={getStatusColor(hospital.status)}>
                            {hospital.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(hospital)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Details
                            </Button>
                            {hospital.status === "Pending" && (
                              <>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() =>
                                    handleStatusUpdate(hospital.id, "Approved")
                                  }
                                >
                                  <Check className="w-4 h-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() =>
                                    handleStatusUpdate(hospital.id, "Rejected")
                                  }
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HospitalListView;
