import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, getMonth, getYear } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const DoctorSchedule = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [monthlyAppointments, setMonthlyAppointments] = useState([]);
  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  // Existing fetch functions remain the same
  const fetchAppointments = async (selectedDate) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/doctor/api/doctor/today-appointments?date=${selectedDate.toISOString()}`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointments(data.appointments);
      setDoctorSchedule(data.schedule);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyAppointments = async (month, year) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/doctor/api/doctor/schedule?&month=${month + 1}&year=${year}`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch monthly appointments");
      const data = await response.json();
      setMonthlyAppointments(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAppointments(date);
  }, [date]);

  useEffect(() => {
    const currentMonth = getMonth(date);
    const currentYear = getYear(date);
    fetchMonthlyAppointments(currentMonth, currentYear);
  }, [date]);

  const getStatusBadgeStyles = (status) => {
    const baseStyles = "font-medium transition-colors duration-200";
    switch (status) {
      case "BOOKED":
        return `${baseStyles} bg-teal-100 text-teal-800 hover:bg-teal-200`;
      case "CANCELLED":
        return `${baseStyles} bg-red-100 text-red-800 hover:bg-red-200`;
      default:
        return `${baseStyles} bg-gray-100 text-gray-800 hover:bg-gray-200`;
    }
  };

  const renderAppointmentCard = (appointment) => (
    <div
      key={appointment.id}
      className="transform transition-all duration-200 hover:translate-y-[-2px]"
    >
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-teal-200 transition-all">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-teal-600 font-medium">
              {format(new Date(appointment.startTime), "HH:mm")} -
              {format(new Date(appointment.endTime), "HH:mm")}
            </span>
            <Badge className={getStatusBadgeStyles(appointment.status)}>
              {appointment.status}
            </Badge>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col space-y-1">
          <span className="text-gray-900 font-medium">
            {appointment.patientName}
          </span>
          <span className="text-gray-500 text-sm">
            {appointment.patientEmail}
          </span>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => {
    if (loading) {
      return Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="mb-4">
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        ));
    }

    if (appointments.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No appointments scheduled</p>
          <p className="text-gray-400 text-sm">
            Schedule is clear for this day
          </p>
        </div>
      );
    }

    return appointments.map(renderAppointmentCard);
  };

  const getTileClassName = ({ date }) => {
    const appointments = monthlyAppointments.filter(
      (apt) =>
        format(new Date(apt.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );

    if (appointments.length === 0) return "";

    const hasBookedAppointments = appointments.some(
      (apt) => apt.status === "BOOKED"
    );
    const hasCancelledAppointments = appointments.some(
      (apt) => apt.status === "CANCELLED"
    );

    if (hasBookedAppointments && hasCancelledAppointments)
      return "mixed-appointments";
    if (hasBookedAppointments) return "has-appointments";
    if (hasCancelledAppointments) return "cancelled-appointments";
    return "";
  };

  return (
    <div className="p-4 lg:p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {appointments[0]?.doctor && (
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <span className="text-teal-600 font-medium text-lg">
                    {appointments[0].doctor.firstname[0]}
                    {appointments[0].doctor.lastname[0]}
                  </span>
                </div>
                <div>
                  <CardTitle className="text-xl lg:text-2xl text-gray-900">
                    Dr. {appointments[0].doctor.firstname}{" "}
                    {appointments[0].doctor.lastname}
                  </CardTitle>
                  <p className="text-gray-500">
                    {appointments[0].doctor.specialty}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-0 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                onChange={setDate}
                value={date}
                tileClassName={getTileClassName}
                className="react-calendar border-none shadow-none w-full"
              />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                {format(date, "MMMM d, yyyy")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-24rem)] pr-4">
                <div className="space-y-4">{renderSchedule()}</div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .react-calendar {
          font-family: inherit;
        }
        .react-calendar button {
          font-family: inherit;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .react-calendar__tile--active {
          background: #14b8a6 !important;
          border-radius: 0.5rem;
        }
        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
          background: #0d9488 !important;
        }
        .has-appointments {
          background-color: #ccfbf1;
          color: #0d9488;
          border-radius: 0.5rem;
        }
        .cancelled-appointments {
          background-color: #fee2e2;
          color: #991b1b;
          border-radius: 0.5rem;
        }
        .mixed-appointments {
          background: linear-gradient(45deg, #ccfbf1 50%, #fee2e2 50%);
          border-radius: 0.5rem;
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: #f0fdfa;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default DoctorSchedule;
