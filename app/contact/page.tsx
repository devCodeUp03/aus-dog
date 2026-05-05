'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.email || !formData.message) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage('');
    setTimeout(() => {
      setSubmitMessage('Message sent successfully! We will get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      setCharCount(0);
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    content: "18 Grevillea Drive, Enfield, VIC 3352, Australia",
    bgColor: "bg-[#7ABDE4]",
    iconColor: "text-[#2B698E]"
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+61 449 568 620",
    bgColor: "bg-[#7ABDE4]",
    iconColor: "text-[#2B698E]"
  },
  {
    icon: Mail,
    title: "Email Us",
    content: "info@topdogworkingdog.com",
    bgColor: "bg-[#7ABDE4]",
    iconColor: "text-[#2B698E]"
  }
];

  return (
    <div className="min-h-screen">
      {/* HEADER SECTION */}
      <section className='relative bg-[#ff9167] py-24'>
        <div className='max-w-7xl mx-auto px-6'>
          <h1 className='text-white text-5xl md:text-6xl font-bold mb-6 flex items-center justify-center'>
            CONTACT US
          </h1>
          <div className="w-full h-px bg-white/70" />
        </div>
      </section>

      {/* CONTACT INFO */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10 grid md:grid-cols-3 gap-6">
        {contactInfo.map((info, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
          >
            <div className={`${info.bgColor} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
              <info.icon className={info.iconColor} size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{info.title}</h3>
            <p className="text-gray-700 font-semibold">{info.content}</p>
          </div>
        ))}
      </div>

      {/* FORM SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Partner With Us</h2>
            <p className="text-gray-600 mb-4">
              We welcome collaboration from:
            </p>
            
           
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2B698E] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2B698E] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2B698E] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2B698E] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                maxLength={500}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2B698E] transition-colors resize-none"
              />
              <div className="text-sm text-gray-500 text-right">{charCount} / 500</div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#ff9167] to-[#ec6f3d] hover:from-[#ff9167] hover:to-[#ff9167] text-white font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <Send size={20} />
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            </button>

            {submitMessage && (
              <div className={`p-4 rounded-lg mt-4 ${
                submitMessage.includes('required') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {submitMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
