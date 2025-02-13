// OrganizationForm.jsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OrganizationForm = ({ newOrg, setNewOrg }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 font-medium">
            Organization Name
          </Label>
          <Input
            id="name"
            value={newOrg.name}
            onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
            placeholder="Enter organization name"
            className="transition-all duration-200 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-gray-700 font-medium">
            Address
          </Label>
          <Input
            id="address"
            value={newOrg.address}
            onChange={(e) => setNewOrg({ ...newOrg, address: e.target.value })}
            placeholder="Enter full address"
            className="transition-all duration-200 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="contact" className="text-gray-700 font-medium">
            Contact Number
          </Label>
          <Input
            id="contact"
            value={newOrg.contact}
            onChange={(e) => setNewOrg({ ...newOrg, contact: e.target.value })}
            placeholder="Enter contact number"
            className="transition-all duration-200 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={newOrg.email}
            onChange={(e) => setNewOrg({ ...newOrg, email: e.target.value })}
            placeholder="Enter email address"
            className="transition-all duration-200 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default OrganizationForm;
