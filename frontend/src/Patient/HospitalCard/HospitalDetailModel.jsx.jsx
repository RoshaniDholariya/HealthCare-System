import React, { useState } from "react";
import {
  ChevronLeft,
  Phone,
  Mail,
  X,
  Search,
  Calendar,
  MapPin,
  Clock,
  Star,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DoctorList = ({ hospitalDetails, onBack }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const openDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const DoctorModal = () => (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-green-600">Available Today</span>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-teal-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            ></button>
          </div>
        </DialogHeader>

        {selectedDoctor && (
          <div className="p-3 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-teal-50 shadow-lg">
                    <img
                      src={selectedDoctor.photo || "/api/placeholder/150/150"}
                      alt={`${selectedDoctor.firstname} ${selectedDoctor.lastname}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-2 w-full">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-teal-600 bg-teal-50 text-sm font-medium">
                    {selectedDoctor.specialty}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedDoctor.firstname} {selectedDoctor.lastname}
                  </h3>
                  {selectedDoctor.qualifications && (
                    <p className="text-gray-600 mt-2 text-sm">
                      {selectedDoctor.qualifications}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Card className="border-teal-100 hover:border-teal-200 transition-colors">
                    <CardContent className="p-4 flex items-center space-x-3">
                      <div className="bg-teal-50 p-2 rounded-lg shrink-0">
                        <Clock className="w-5 h-5 text-teal-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          Available Hours
                        </span>
                        <span className="text-sm text-gray-600">
                          Mon-Fri, 9:00-17:00
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-teal-100 hover:border-teal-200 transition-colors">
                    <CardContent className="p-4 flex items-center space-x-3">
                      <div className="bg-teal-50 p-2 rounded-lg shrink-0">
                        <MapPin className="w-5 h-5 text-teal-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          Location
                        </span>
                        <span className="text-sm text-gray-600">
                          Main Building, Floor 3
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <Tabs defaultValue="info" className="w-full">
              <TabsContent value="info" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDoctor.contact && (
                    <Card className="border-teal-100 hover:border-teal-200 transition-colors">
                      <CardContent className="flex items-center space-x-3 p-4">
                        <div className="bg-teal-50 p-2 rounded-lg shrink-0">
                          <Phone className="w-5 h-5 text-teal-600" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-medium text-gray-900">
                            Phone
                          </span>
                          <span className="text-sm text-gray-600 truncate">
                            {selectedDoctor.contact}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedDoctor.email && (
                    <Card className="border-teal-100 hover:border-teal-200 transition-colors">
                      <CardContent className="flex items-center space-x-3 p-4">
                        <div className="bg-teal-50 p-2 rounded-lg shrink-0">
                          <Mail className="w-5 h-5 text-teal-600" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-medium text-gray-900">
                            Email
                          </span>
                          <span className="text-sm text-gray-600 truncate">
                            {selectedDoctor.email}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {selectedDoctor.bio && (
                  <Card className="border-teal-100">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        About
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {selectedDoctor.bio}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  const MobileView = () => (
    <div className="space-y-3 p-4">
      {hospitalDetails.map((doctor) => (
        <Card
          key={doctor.id}
          className="hover:border-teal-200 transition-colors cursor-pointer"
          onClick={() => openDoctorDetails(doctor)}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 ring-2 ring-teal-50">
                <img
                  src={doctor.photo || "/api/placeholder/150/150"}
                  alt={`${doctor.firstname} ${doctor.lastname}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">
                  {doctor.firstname} {doctor.lastname}
                </h3>
                <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm mt-1">
                  {doctor.specialty}
                </span>
                <p className="text-gray-500 text-sm mt-1">
                  {doctor.qualifications}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const TableView = () => (
    <Card className="border-teal-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-teal-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-teal-900">
                Doctor
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-teal-900">
                Specialty
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-teal-900">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-teal-900">
                Email
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-teal-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-teal-100">
            {hospitalDetails.map((doctor) => (
              <tr
                key={doctor.id}
                className="hover:bg-teal-50/30 transition-colors cursor-pointer"
                onClick={() => openDoctorDetails(doctor)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 ring-2 ring-teal-50">
                      <img
                        src={doctor.photo || "/api/placeholder/150/150"}
                        alt={`${doctor.firstname} ${doctor.lastname}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Dr. {doctor.firstname} {doctor.lastname}
                      </div>
                      <div className="text-sm text-gray-500">
                        {doctor.qualifications}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-3 py-1 text-sm text-teal-600 bg-teal-50 rounded-full">
                    {doctor.specialty}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {doctor.contact}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {doctor.email}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors">
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="ml-2 font-medium">Back to Hospitals</span>
          </button>
        </div>

        <div className="block md:hidden">
          <MobileView />
        </div>
        <div className="hidden md:block">
          <TableView />
        </div>

        <DoctorModal />
      </div>
    </div>
  );
};

export default DoctorList;
