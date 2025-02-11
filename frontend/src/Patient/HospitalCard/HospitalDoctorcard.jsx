import React from "react";
import { MapPin, Phone, Mail, Star, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HospitalCard = ({ hospital, onClick }) => {
  return (
    <Card className="w-full h-100 bg-white rounded-2xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-teal-600 transition-all duration-300">
                {hospital.name}
              </h3>
              <div className="mt-2 flex items-start text-gray-600">
                <div className="p-2 bg-teal-50 rounded-lg mr-3">
                  <MapPin className="w-4 h-4 text-teal-600" />
                </div>
                <span className="text-sm line-clamp-2 mt-1">
                  {hospital.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-1">
          {hospital.contact && (
            <div className="flex items-center p-3 rounded-xl transition-colors duration-300">
              <div className="p-2 rounded-lg shadow-sm mr-3">
                <Phone className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Phone</div>
                <div className="text-sm font-medium text-gray-700">
                  {hospital.contact}
                </div>
              </div>
            </div>
          )}
          {hospital.email && (
            <div className="flex items-center p-3 rounded-xl transition-colors duration-300">
              <div className="p-2 rounded-lg shadow-sm mr-3">
                <Mail className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Email</div>
                <div className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                  {hospital.email}
                </div>
              </div>
            </div>
          )}
        </div>
        {hospital.services && hospital.services.length > 0 && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {hospital.services.map((service, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white border-2 border-teal-100 text-teal-700 px-4 py-1.5 rounded-lg 
                           hover:bg-teal-50 hover:border-teal-200 transition-all duration-300 text-sm"
                >
                  {service}
                </Badge>
              ))}
            </div>
            <Button
              onClick={onClick}
              className="w-30 mt-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl py-6 
                     hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform 
                     group-hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span className="font-medium">View Details</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HospitalCard;
