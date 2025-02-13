import React, { useState } from "react";
import { Eye, Calendar, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PatientTable = ({ patients, handleViewDetails, isLoading }) => {
  const [dateFilter, setDateFilter] = useState("all");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <div className="animate-spin">
            <Calendar className="h-5 w-5 text-teal-600" />
          </div>
          <span className="text-gray-600">Loading patients...</span>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Patient Records</h2>
        {/* <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Contact Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Doctor Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr
                  key={patient.id || index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-teal-700">
                          {patient.patientName.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {patient.patientName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {patient.contactNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {patient.doctorName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(patient.lastVisitDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleViewDetails(patient)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-teal-600 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {patients.length === 0 && !isLoading && (
            <div className="text-center py-8 text-gray-500">
              No patients found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientTable;
