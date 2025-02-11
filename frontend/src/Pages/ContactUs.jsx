import React, { useState } from "react";
import { ArrowLeft, Send, Phone, Mail, User } from "lucide-react";
import image1 from "../../assets/contactus.jpg";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
        formData
      );
      setResponseMessage("Message sent successfully!");
      setFormData({ name: "", email: "", phoneNumber: "", message: "" });
    } catch (error) {
      console.error(error);
      setResponseMessage("Failed to send message.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form Section */}
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-teal-600">Contact Us</h1>
                <p className="text-lg text-gray-600 mt-2">
                  We'd love to hear from you. Send us a message and we'll
                  respond as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent min-h-[150px]"
                  required
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>

              {responseMessage && (
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    responseMessage.includes("successfully")
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {responseMessage}
                </div>
              )}
            </div>

            {/* Image Section */}
            <div className="relative h-full min-h-[500px] rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://image.freepik.com/free-photo/hands-unrecognizable-female-doctor-writing-form-typing-laptop-keyboard_1098-20374.jpg"
                alt="Contact Us"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Get in Touch
                </h3>
                <p className="text-gray-200">
                  Our team is here to help you with any questions or concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
