import React, { useState } from "react";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  ChevronDown,
  Star,
  Award,
  Users,
  CheckCircle,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ContactUs from "./ContactUs";
import image1 from "../../assets/CureNest_logo.svg";
import image2 from "../../assets/hospital1.jpg";
import image3 from "../../assets/hospital2.jpg";
import image4 from "../../assets/hospital3.jpg";
import image5 from "../../assets/hospital4.jpg";

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen fonts-Poppins">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-25">
            <div className="flex items-center">
              <img
                src={image1}
                alt="Logo"
                className="h-50 w-100 object-contain"
              />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-teal-600 font-medium"
              >
                Home
              </a>
              <a
                href="/"
                className="text-gray-700 hover:text-teal-600 font-medium"
              >
                Hospitals
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-teal-600 font-medium"
              >
                Services
              </a>
              <a
                href="/aboutus"
                className="text-gray-700 hover:text-teal-600 font-medium"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-teal-600 font-medium"
              >
                Contact
              </a>
              <a href="/signin">
                <button className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700">
                  Sign In
                </button>
              </a>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden py-4">
              <a href="#" className="block py-2 text-gray-700">
                Home
              </a>
              <a href="#" className="block py-2 text-gray-700">
                Departments
              </a>
              <a href="#" className="block py-2 text-gray-700">
                Services
              </a>
              <a href="#" className="block py-2 text-gray-700">
                About Us
              </a>
              <a href="#" className="block py-2 text-gray-700">
                Contact
              </a>
              <button className="mt-4 w-full bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700">
                Sign In
              </button>
            </div>
          )}
        </div>
      </nav>

      <section className="relative text-black">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="h-screen md:h-[calc(100vh-64px)]"
        >
          <SwiperSlide>
            <div
              className="h-full bg-cover bg-center flex items-center"
              style={{
                backgroundImage: `url('https://wpthemesgrid.com/themes/medikit/img/slider2.jpg')`,
              }}
            >
              <div className="bg-opacity-80 p-4 md:p-8 rounded-lg max-w-xl ml-4 md:ml-12">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  <span className="text-teal-600">Protect</span> Your Health And
                  Take
                  <span className="text-teal-600"> Care</span>
                </h1>
                <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-700">
                  We provide{" "}
                  <span className="font-semibold text-teal-600">
                    special tips
                  </span>{" "}
                  and
                  <span className="text-teal-500"> advice</span> for health care
                  treatment.
                </p>
                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700">
                    Get Appointment
                  </button>
                  <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-md hover:bg-teal-600 hover:text-white">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="h-full bg-cover bg-center flex items-center"
              style={{
                backgroundImage: `url('https://wpthemesgrid.com/themes/medikit/img/slider3.jpg')`,
              }}
            >
              <div className="bg-opacity-80 p-4 md:p-8 rounded-lg max-w-xl ml-4 md:ml-12">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  <span className="text-teal-600">Advanced</span> Health Care
                  <span className="text-black-500"> Technology</span>
                </h1>
                <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-700">
                  Discover cutting-edge medical solutions with our
                  state-of-the-art facilities.
                </p>
                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700">
                    Book a Consultation
                  </button>
                  <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-md hover:bg-teal-600 hover:text-white">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="h-full bg-cover bg-center flex items-center"
              style={{
                backgroundImage: `url("https://wpthemesgrid.com/themes/medikit/img/slider.jpg")`,
              }}
            >
              <div className="bg-opacity-80 p-4 md:p-8 rounded-lg max-w-xl ml-4 md:ml-12">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  <span className="text-teal-600">Quality</span> Healthcare
                  <span className="text-teal-600"> Services</span>
                </h1>
                <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-700">
                  We are dedicated to providing quality healthcare services to
                  ensure your well-being.
                </p>
                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700">
                    Contact Us
                  </button>
                  <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-md hover:bg-teal-600 hover:text-white">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-teal-600 text-3xl md:text-5xl font-semibold">
              Our Services
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
              We Offer Different Services To Improve Your Health
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "General Treatment",
                description: "Comprehensive care for your general health needs",
                icon: "🏥",
              },
              {
                title: "Teeth Whitening",
                description: "Professional dental whitening services",
                icon: "🦷",
              },
              {
                title: "Heart Surgery",
                description: "Advanced cardiac surgical procedures",
                icon: "❤",
              },
              {
                title: "Pediatrics",
                description: "Specialized care for children's health",
                icon: "👶",
              },
              {
                title: "Laboratory Service",
                description: "Advanced diagnostic testing facilities",
                icon: "🔬",
              },
              {
                title: "Neurology",
                description: "Expert care for neurological conditions",
                icon: "🧠",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a
                  href="#"
                  className="text-teal-600 hover:text-teal-700 flex items-center"
                >
                  Learn More <ChevronDown className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { number: "1500+", label: "Happy Clients", icon: Users },
              { number: "150+", label: "Experienced Doctors", icon: Award },
              { number: "350+", label: "Hospital", icon: CheckCircle },
              { number: "15+", label: "Years Experience", icon: Star },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <stat.icon className="w-8 md:w-12 h-8 md:h-12 mb-4" />
                <h3 className="text-2xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </h3>
                <p className="text-teal-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospitals Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-teal-600 text-3xl md:text-5xl font-semibold">
              HealthCare Organization
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
              Outstanding Health Organization
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { name: "Charusat Hospital", location: "Anand", image: image2 },
              { name: "City Hospital", location: "Nadiad", image: image3 },
              { name: "Aditya Hospital", location: "Ahmedabad", image: image4 },
              { name: "Kiran Hospital", location: "Surat", image: image5 },
            ].map((hospital, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    {hospital.name}
                  </h3>
                  <p className="text-teal-600 mt-1">{hospital.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactUs />

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 md:pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">CureNest</h3>
              <p className="text-gray-400 mb-6">
                Leading the way in medical excellence, providing the care you
                deserve.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  "About Us",
                  "Our Services",
                  "Hospitals",
                  "Departments",
                  "Contact",
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2">
                {[
                  "Patient Dashboard",
                  "Registered Hospitals",
                  "Appointment Scheduling",
                  "Location based Hospital",
                  "User Friendly",
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-400">
                    123 charusat university, Anand
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-400">+123 456 7890</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-400">info@curenest.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-400">Mon - Sat: 8:00 - 17:00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 CureNest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
