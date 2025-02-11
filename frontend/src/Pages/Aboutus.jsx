import React from "react";
import {
  Activity,
  Users,
  Brain,
  Target,
  ChevronRight,
  Heart,
  Shield,
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Hero Section with Animated Background */}
      <div className="relative bg-gradient-to-r from-teal-600 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Revolutionizing Healthcare
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              Empowering healthcare providers with innovative solutions for
              better patient care
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
            <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
              <Brain className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Innovative Solutions
            </h3>
            <p className="text-gray-600">
              Leveraging cutting-edge technology to transform healthcare
              delivery and patient experience.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Patient-Centered Care
            </h3>
            <p className="text-gray-600">
              Focusing on personalized healthcare experiences that put patients
              first.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Quality Excellence
            </h3>
            <p className="text-gray-600">
              Maintaining the highest standards in healthcare management and
              service delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-teal-100 rounded-full text-teal-700 text-sm font-medium mb-6">
                Our Mission
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Transforming Healthcare Through Innovation
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We are dedicated to revolutionizing healthcare management
                through cutting-edge technology and patient-centered solutions.
                Our commitment drives us to create tools that enhance efficiency
                while ensuring optimal patient care.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-teal-600" />
                  <span className="text-gray-700">HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-teal-600" />
                  <span className="text-gray-700">Patient-Focused</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/api/placeholder/600/400"
                alt="Healthcare Innovation"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <Target className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-teal-100">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-teal-100">Healthcare Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-teal-100">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-teal-100">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
