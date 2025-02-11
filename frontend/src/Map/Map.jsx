// import React, { useState, useEffect } from "react";
// import { Map, Marker, Popup, Source, Layer } from "react-map-gl";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Navigation2,
//   MapPin,
//   Phone,
//   Building,
//   Loader2,
//   List,
//   Clock,
//   Route,
//   Star,
//   AlertCircle,
//   Heart,
//   X,
//   Menu,
//   Home,
//   FileText,
//   Calendar,
//   Settings,
//   LogOut
// } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Sidebar from "../Patient/PatientSidebar";
// const HospitalLocator = () => {
//  //(keep existing state and token variables)
//     const mytoken = "pk.eyJ1Ijoia3NoaXRpai0tMTIzIiwiYSI6ImNtNTVjbmt4aDFlODUybnNlMXZiYXE5MnkifQ.oMukhMaIA2A129LS8QrmVg";
//   const [viewport, setViewport] = useState({
//     latitude: 0,
//     longitude: 0,
//     zoom: 14,
//     pitch: 50,
//     bearing: 0,
//   });

//   const [hospitals, setHospitals] = useState([]);
//   const [selectedHospital, setSelectedHospital] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showList, setShowList] = useState(false);
//   const [showDirections, setShowDirections] = useState(false);
//   const [routeCoordinates, setRouteCoordinates] = useState(null);
//   const [routeDistance, setRouteDistance] = useState(null);
//   const [routeDuration, setRouteDuration] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setViewport((prev) => ({
//             ...prev,
//             latitude,
//             longitude,
//           }));
//           setUserLocation({ latitude, longitude });
//           fetchNearbyHospitals(latitude, longitude);
//         },
//         (error) => {
//           setError("Unable to access your location. Please enable location services.");
//           setLoading(false);
//         }
//       );
//     }
//   }, []);

//   const fetchNearbyHospitals = async (lat, lon) => {
//     try {
//       const radius = 5000;
//       const query = `
//         [out:json];
//         (
//           node["amenity"="hospital"](around:${radius},${lat},${lon});
//           way["amenity"="hospital"](around:${radius},${lat},${lon});
//           relation["amenity"="hospital"](around:${radius},${lat},${lon});
//         );
//         out body;
//         >;
//         out skel qt;
//       `;
//       const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

//       const response = await fetch(url);
//       const data = await response.json();

//       if (!data.elements || data.elements.length === 0) {
//         throw new Error("No hospitals found in your area");
//       }

//       const processedHospitals = data.elements
//         .filter(element => element.lat && element.lon && element.tags && element.tags.name)
//         .map((element) => ({
//           id: element.id,
//           name: element.tags.name,
//           latitude: element.lat,
//           longitude: element.lon,
//           address: element.tags.address || "Address not available",
//           phone: element.tags["phone"] || "Phone not available",
//           emergency: element.tags["emergency"] === "yes" ? "24/7 Emergency" : "Regular Hours",
//           distance: calculateDistance(lat, lon, element.lat, element.lon),
//           rating: (Math.random() * 2 + 3).toFixed(1), // Simulated rating between 3-5
//         }));

//       setHospitals(processedHospitals.sort((a, b) => a.distance - b.distance));
//       setLoading(false);
//     } catch (error) {
//       setError(error.message || "Error fetching nearby hospitals. Please try again later.");
//       setLoading(false);
//     }
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//               Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//               Math.sin(dLon/2) * Math.sin(dLon/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     return (R * c).toFixed(1);
//   };

//   const getDirections = async (hospital) => {
//     if (userLocation) {
//       setShowDirections(true);
//       try {
//         const response = await fetch(
//           `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${hospital.longitude},${hospital.latitude}?geometries=geojson&overview=full&access_token=${mytoken}`
//         );
//         const data = await response.json();

//         if (data.routes && data.routes[0]) {
//           setRouteCoordinates(data.routes[0].geometry.coordinates);
//           setRouteDistance((data.routes[0].distance / 1000).toFixed(1));
//           setRouteDuration((data.routes[0].duration / 60).toFixed(0));
//         }
//       } catch (error) {
//         console.error("Error fetching directions:", error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
//         <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center">
//           <div className="relative">
//             <Loader2 className="h-16 w-16 animate-spin text-teal-600" />
//             <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-teal-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3">Finding Nearby Hospitals</h2>
//           <p className="text-gray-600 text-center">Locating medical facilities in your vicinity...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen">
//       <Sidebar/>

//       <div className="flex-1 ml-64 relative">
//         <Map
//           {...viewport}
//           onMove={(evt) => setViewport(evt.viewState)}
//           style={{ width: "100%", height: "100%" }}
//           mapStyle="mapbox://styles/mapbox/streets-v12"
//           mapboxAccessToken={mytoken}
//         >
//           {/* User Location Marker */}
//           {userLocation && (
//             <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>
//               <div className="relative">
//                 <div className="absolute -top-3 -left-3 w-10 h-10 bg-teal-500 rounded-full opacity-20 animate-ping" />
//                 <div className="absolute -top-3 -left-3 w-10 h-10 bg-teal-500 rounded-full opacity-10 animate-pulse" />
//                 <div className="relative z-10 bg-teal-600 rounded-full p-2 shadow-xl">
//                   <Navigation2 className="h-5 w-5 text-white" />
//                 </div>
//               </div>
//             </Marker>
//           )}

//           {/* Hospital Markers */}
//           {hospitals.map((hospital) => (
//             (!showDirections || (selectedHospital && hospital.id === selectedHospital.id)) && (
//               <Marker
//                 key={hospital.id}
//                 latitude={hospital.latitude}
//                 longitude={hospital.longitude}
//               >
//                 <button
//                   onClick={() => {
//                     setSelectedHospital(hospital);
//                     getDirections(hospital);
//                   }}
//                   className="transform transition-all duration-300 hover:scale-110"
//                 >
//                   <div className="relative">
//                     <div className="absolute -top-3 -left-3 w-10 h-10 bg-teal-500 rounded-full opacity-10 animate-pulse" />
//                     <div className="relative z-10 bg-white rounded-full p-2 shadow-xl border-2 border-teal-500">
//                       <Heart className="h-5 w-5 text-red-500" />
//                     </div>
//                   </div>
//                 </button>
//               </Marker>
//             )
//           ))}

//           {/* Popup */}
//           {selectedHospital && (
//             <Popup
//               latitude={selectedHospital.latitude}
//               longitude={selectedHospital.longitude}
//               closeButton={false}
//               maxWidth="320px"
//               className="hospital-popup"
//             >
//               <Card className="w-80 shadow-2xl border-0 overflow-hidden">
//                 <CardHeader className="pb-3 bg-gradient-to-r from-teal-600 to-teal-800 text-white relative">
//                   <button
//                     onClick={() => {
//                       setSelectedHospital(null);
//                       setShowDirections(false);
//                       setRouteCoordinates(null);
//                     }}
//                     className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20 transition-colors"
//                   >
//                     <X className="h-5 w-5 text-white" />
//                   </button>
//                   <CardTitle className="text-lg font-semibold">{selectedHospital.name}</CardTitle>
//                   <p className="text-sm text-teal-100">{selectedHospital.distance} km away</p>
//                 </CardHeader>
//                 <CardContent className="p-4 space-y-3">
//                   <div className="flex items-center gap-2">
//                     <Clock className="h-4 w-4 text-teal-600" />
//                     <span className="text-sm text-teal-600 font-medium">{selectedHospital.emergency}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Building className="h-4 w-4 text-gray-600" />
//                     <span className="text-sm text-gray-600">{selectedHospital.address}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Phone className="h-4 w-4 text-gray-600" />
//                     <span className="text-sm text-gray-600">{selectedHospital.phone}</span>
//                   </div>
//                   <div className="flex gap-2 mt-4">
//                     <Button
//                       className="flex-1 bg-teal-600 hover:bg-teal-700 text-sm h-9"
//                       onClick={() => getDirections(selectedHospital)}
//                     >
//                       <Route className="h-4 w-4 mr-2" />
//                       Directions
//                     </Button>
//                     <Button
//                       className="flex-1 bg-teal-600 hover:bg-teal-700 text-sm h-9"
//                       onClick={() => {
//                         const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${selectedHospital.latitude},${selectedHospital.longitude}&travelmode=driving`;
//                         window.open(url, "_blank");
//                       }}
//                     >
//                       <Navigation2 className="h-4 w-4 mr-2" />
//                       Navigate
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Popup>
//           )}

//           {/* Route Display */}
//           {showDirections && routeCoordinates && (
//             <Source type="geojson" data={{
//               type: 'Feature',
//               properties: {},
//               geometry: {
//                 type: 'LineString',
//                 coordinates: routeCoordinates
//               }
//             }}>
//               <Layer
//                 id="route"
//                 type="line"
//                 paint={{
//                   'line-color': '#0d9488',
//                   'line-width': 5,
//                   'line-opacity': 0.8
//                 }}
//               />
//             </Source>
//           )}
//         </Map>

//         {/* List View Button */}
//         <div className="absolute top-4 right-4 z-10">
//           <Button
//             className="bg-white text-gray-800 shadow-xl hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
//             onClick={() => setShowList(true)}
//           >
//             <List className="h-5 w-5 mr-2 text-teal-600" />
//             View List
//           </Button>
//         </div>

//         {/* Hospital List Sheet */}
//         <Sheet open={showList} onOpenChange={setShowList}>
//           <SheetContent className="w-full sm:max-w-lg p-0">
//             <SheetHeader className="p-6 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
//               <SheetTitle className="flex items-center gap-2 text-xl text-white">
//                 <Heart className="h-6 w-6" />
//                 Nearby Hospitals ({hospitals.length})
//               </SheetTitle>
//             </SheetHeader>
//             <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
//               {hospitals.map((hospital) => (
//                 <Card
//                   key={hospital.id}
//                   className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
//                   onClick={() => {
//                     setSelectedHospital(hospital);
//                     setViewport(prev => ({
//                       ...prev,
//                       latitude: hospital.latitude,
//                       longitude: hospital.longitude,
//                       zoom: 15
//                     }));
//                     setShowList(false);
//                   }}
//                 >
//                   <CardContent className="p-4">
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-start">
//                         <h3 className="font-semibold flex items-center gap-2 text-gray-800">
//                           <Heart className="h-4 w-4 text-teal-500" />
//                           {hospital.name}
//                         </h3>
//                         <span className="text-sm bg-teal-50 text-teal-600 px-2 py-1 rounded-full flex items-center gap-1">
//                           <Navigation2 className="h-4 w-4" />
//                           {hospital.distance} km
//                         </span>
//                       </div>
//                       {/* ... (rest of the hospital card content remains the same, just update colors to teal) */}
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </SheetContent>
//         </Sheet>

//         {/* Bottom Info Bar */}
//         {showDirections && routeCoordinates && (
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
//             <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl rounded-2xl">
//               <CardContent className="p-6 flex items-center gap-6">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-teal-100 rounded-xl">
//                     <Route className="h-6 w-6 text-teal-600" />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-sm font-medium text-gray-600">Distance</span>
//                     <span className="text-2xl font-bold text-teal-600">{routeDistance} km</span>
//                   </div>
//                 </div>
//                 <div className="w-px h-16 bg-gray-200" />
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-teal-100 rounded-xl">
//                     <Clock className="h-6 w-6 text-teal-600" />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-sm font-medium text-gray-600">Duration</span>
//                     <span className="text-2xl font-bold text-teal-600">{routeDuration} mins</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HospitalLocator;

import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, Source, Layer } from "react-map-gl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Navigation2,
  MapPin,
  Phone,
  Building,
  Loader2,
  List,
  Clock,
  Route,
  Star,
  AlertCircle,
  Heart,
  X,
  Menu,
  Home,
  FileText,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "../Patient/PatientSidebar";
const HospitalLocator = () => {
  const mytoken =
    "pk.eyJ1Ijoia3NoaXRpai0tMTIzIiwiYSI6ImNtNTVjbmt4aDFlODUybnNlMXZiYXE5MnkifQ.oMukhMaIA2A129LS8QrmVg";
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 14,
    pitch: 50,
    bearing: 0,
  });

  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showList, setShowList] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [routeDistance, setRouteDistance] = useState(null);
  const [routeDuration, setRouteDuration] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setViewport((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
          setUserLocation({ latitude, longitude });
          fetchNearbyHospitals(latitude, longitude);
        },
        (error) => {
          setError(
            "Unable to access your location. Please enable location services."
          );
          setLoading(false);
        }
      );
    }
  }, []);

  const fetchNearbyHospitals = async (lat, lon) => {
    try {
      const radius = 5000;
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:${radius},${lat},${lon});
          way["amenity"="hospital"](around:${radius},${lat},${lon});
          relation["amenity"="hospital"](around:${radius},${lat},${lon});
        );
        out body;
        >;
        out skel qt;
      `;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
        query
      )}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data.elements || data.elements.length === 0) {
        throw new Error("No hospitals found in your area");
      }

      const processedHospitals = data.elements
        .filter(
          (element) =>
            element.lat && element.lon && element.tags && element.tags.name
        )
        .map((element) => ({
          id: element.id,
          name: element.tags.name,
          latitude: element.lat,
          longitude: element.lon,
          address: element.tags.address || "Address not available",
          phone: element.tags["phone"] || "Phone not available",
          emergency:
            element.tags["emergency"] === "yes"
              ? "24/7 Emergency"
              : "Regular Hours",
          distance: calculateDistance(lat, lon, element.lat, element.lon),
          rating: (Math.random() * 2 + 3).toFixed(1), // Simulated rating between 3-5
        }));

      setHospitals(processedHospitals.sort((a, b) => a.distance - b.distance));
      setLoading(false);
    } catch (error) {
      setError(
        error.message ||
          "Error fetching nearby hospitals. Please try again later."
      );
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const getDirections = async (hospital) => {
    if (userLocation) {
      setShowDirections(true);
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${hospital.longitude},${hospital.latitude}?geometries=geojson&overview=full&access_token=${mytoken}`
        );
        const data = await response.json();

        if (data.routes && data.routes[0]) {
          setRouteCoordinates(data.routes[0].geometry.coordinates);
          setRouteDistance((data.routes[0].distance / 1000).toFixed(1));
          setRouteDuration((data.routes[0].duration / 60).toFixed(0));
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center">
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-teal-600" />
            <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3">
            Finding Nearby Hospitals
          </h2>
          <p className="text-gray-600 text-center">
            Locating medical facilities in your vicinity...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 lg:ml-64 relative">
        <Map
          {...viewport}
          onMove={(evt) => setViewport(evt.viewState)}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={mytoken}
        >
          {/* Mobile Header */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-md">
            <div className="flex items-center justify-between p-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <Sidebar />
                </SheetContent>
              </Sheet>
              <h1 className="text-lg font-semibold text-gray-900">
                Hospital Locator
              </h1>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setShowList(true)}
              >
                <List className="h-6 w-6" />
              </Button>
            </div>
          </div>{" "}
          {/* User Location Marker */}
          {userLocation && (
            <Marker
              latitude={userLocation.latitude}
              longitude={userLocation.longitude}
            >
              <div className="relative">
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-teal-500 rounded-full opacity-20 animate-ping" />
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-teal-500 rounded-full opacity-10 animate-pulse" />
                <div className="relative z-10 bg-teal-600 rounded-full p-2 shadow-xl">
                  <Navigation2 className="h-5 w-5 text-white" />
                </div>
              </div>
            </Marker>
          )}
          {/* Hospital Markers */}
          {hospitals.map(
            (hospital) =>
              (!showDirections ||
                (selectedHospital && hospital.id === selectedHospital.id)) && (
                <Marker
                  key={hospital.id}
                  latitude={hospital.latitude}
                  longitude={hospital.longitude}
                >
                  <button
                    onClick={() => {
                      setSelectedHospital(hospital);
                      getDirections(hospital);
                    }}
                    className="transform transition-all duration-300 hover:scale-110"
                  >
                    <div className="relative">
                      <div className="absolute -top-3 -left-3 w-10 h-10 bg-teal-500 rounded-full opacity-10 animate-pulse" />
                      <div className="relative z-10 bg-white rounded-full p-2 shadow-xl border-2 border-teal-500">
                        <Heart className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                  </button>
                </Marker>
              )
          )}
          {selectedHospital && (
            <Popup
              latitude={selectedHospital.latitude}
              longitude={selectedHospital.longitude}
              closeButton={false}
              maxWidth="320px"
              className="hospital-popup sm:block"
              offset={25}
            >
              <Card className="w-[280px] sm:w-80 shadow-2xl border-0 overflow-hidden">
                <CardHeader className="pb-3 bg-gradient-to-r from-teal-600 to-teal-800 text-white relative">
                  <button
                    onClick={() => {
                      setSelectedHospital(null);
                      setShowDirections(false);
                      setRouteCoordinates(null);
                    }}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                  <CardTitle className="text-base sm:text-lg font-semibold pr-8">
                    {selectedHospital.name}
                  </CardTitle>
                  <p className="text-sm text-teal-100">
                    {selectedHospital.distance} km away
                  </p>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-teal-600 shrink-0" />
                    <span className="text-sm text-teal-600 font-medium">
                      {selectedHospital.emergency}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-600 shrink-0" />
                    <span className="text-sm text-gray-600 line-clamp-2">
                      {selectedHospital.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-600 shrink-0" />
                    <span className="text-sm text-gray-600">
                      {selectedHospital.phone}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-sm h-8 sm:h-9"
                      onClick={() => getDirections(selectedHospital)}
                    >
                      <Route className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Directions</span>
                      <span className="sm:hidden">Route</span>
                    </Button>
                    <Button
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-sm h-8 sm:h-9"
                      onClick={() => {
                        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${selectedHospital.latitude},${selectedHospital.longitude}&travelmode=driving`;
                        window.open(url, "_blank");
                      }}
                    >
                      <Navigation2 className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Navigate</span>
                      <span className="sm:hidden">Go</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Popup>
          )}
          {/* Route Display */}
          {showDirections && routeCoordinates && (
            <Source
              type="geojson"
              data={{
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: routeCoordinates,
                },
              }}
            >
              <Layer
                id="route"
                type="line"
                paint={{
                  "line-color": "#0d9488",
                  "line-width": 5,
                  "line-opacity": 0.8,
                }}
              />
            </Source>
          )}
        </Map>

        {/* List View Button - Hidden on Mobile */}
        <div className="absolute top-4 right-4 z-10 hidden lg:block">
          <Button
            className="bg-white text-gray-800 shadow-xl hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => setShowList(true)}
          >
            <List className="h-5 w-5 mr-2 text-teal-600" />
            View List
          </Button>
        </div>

        {/* Responsive Hospital List Sheet */}
        <Sheet open={showList} onOpenChange={setShowList}>
          <SheetContent className="w-full sm:max-w-lg p-0">
            <SheetHeader className="p-4 sm:p-6 bg-gradient-to-r from-teal-600 to-teal-800 text-white sticky top-0 z-10">
              <SheetTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
                <Heart className="h-5 sm:h-6 w-5 sm:w-6" />
                Nearby Hospitals ({hospitals.length})
              </SheetTitle>
            </SheetHeader>
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
              {hospitals.map((hospital) => (
                <Card
                  key={hospital.id}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
                  onClick={() => {
                    setSelectedHospital(hospital);
                    setViewport((prev) => ({
                      ...prev,
                      latitude: hospital.latitude,
                      longitude: hospital.longitude,
                      zoom: 15,
                    }));
                    setShowList(false);
                  }}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold flex items-center gap-2 text-gray-800 text-sm sm:text-base">
                          <Heart className="h-4 w-4 text-teal-500 shrink-0" />
                          <span className="line-clamp-2">{hospital.name}</span>
                        </h3>
                        <span className="text-xs sm:text-sm bg-teal-50 text-teal-600 px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                          <Navigation2 className="h-3 sm:h-4 w-3 sm:w-4" />
                          {hospital.distance} km
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-teal-500 shrink-0" />
                        {hospital.emergency}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                        <Building className="h-4 w-4 text-teal-500 shrink-0" />
                        <span className="line-clamp-1">{hospital.address}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Responsive Bottom Info Bar */}
        {showDirections && routeCoordinates && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-10">
            <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl rounded-2xl">
              <CardContent className="p-4 sm:p-6 flex items-center justify-between sm:gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-teal-100 rounded-xl">
                    <Route className="h-4 sm:h-6 w-4 sm:w-6 text-teal-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-medium text-gray-600">
                      Distance
                    </span>
                    <span className="text-lg sm:text-2xl font-bold text-teal-600">
                      {routeDistance} km
                    </span>
                  </div>
                </div>
                <div className="w-px h-12 sm:h-16 bg-gray-200" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-teal-100 rounded-xl">
                    <Clock className="h-4 sm:h-6 w-4 sm:w-6 text-teal-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-medium text-gray-600">
                      Duration
                    </span>
                    <span className="text-lg sm:text-2xl font-bold text-teal-600">
                      {routeDuration} mins
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalLocator;
