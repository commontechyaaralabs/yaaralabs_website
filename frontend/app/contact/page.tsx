"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header/Header';
import '../globals.css';
import { useRouter } from 'next/navigation';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
      alert('Thank you for your message! We will get back to you soon.');
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "hello@yaaralabs.ai",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 6pm"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      details: "San Francisco, CA",
      description: "Available for meetings"
    }
  ];

  const subjects = [
    "AI Product Development",
    "Workforce AI Enablement", 
    "AI Strategy Consulting",
    "Data Annotation Services",
    "General Inquiry",
    "Partnership Opportunity"
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <Header transparent={true} isLoggedIn={false} onLoginClick={handleLoginClick} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Let's Build Something Amazing Together
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Ready to transform your business with AI? Get in touch with our experts to discuss your project and discover how we can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-center border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:scale-105">
                <div className="text-purple-400 mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                <p className="text-lg text-purple-300 mb-2">{info.details}</p>
                <p className="text-sm text-gray-400">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Send us a message</h2>
              <p className="text-gray-300">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your project, goals, or any questions you have..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 text-lg mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 25%, rgba(236, 72, 153, 0.1) 50%, rgba(239, 68, 68, 0.1) 75%, rgba(245, 158, 11, 0.1) 100%)'
          }}
        />
        {/* Wave separator */}
        <div 
          className="absolute top-0 left-0 w-full h-1 opacity-30"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(147, 51, 234, 0.5) 25%, rgba(59, 130, 246, 0.5) 50%, rgba(147, 51, 234, 0.5) 75%, transparent 100%)'
          }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 leading-tight">
              Ready to start your AI transformation journey?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Join the companies already leveraging AI to drive innovation and growth. Let's discuss how we can help you achieve your goals.
            </p>
            <button 
              onClick={() => document.getElementById('message')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 text-lg mx-auto"
            >
              <span>GET STARTED TODAY</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 items-start">
            {/* Left Column - Logo and Company Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-500 to-blue-500"></div>
              <span className="text-white text-lg font-semibold">YaaraLabs</span>
            </div>
            
            {/* Solutions Column */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Solutions</h4>
              <div className="space-y-3">
                <a href="/product_development" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">AI Product Development</a>
                <a href="/AI_Training" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Workforce AI Enablement</a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">AI Strategy Consulting</a>
                <a href="/Data_Annotation" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Data Annotation Services</a>
              </div>
            </div>
            
            {/* Company Column */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Company</h4>
              <div className="space-y-3">
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Our Expertise</a>
                <a href="/contact" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Contact Us</a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Accessibility Statement</a>
              </div>
            </div>
            
            {/* Contact & Legal Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <a href="mailto:hello@yaaralabs.ai" className="text-blue-400 hover:text-blue-300 underline text-sm transition-colors">hello@yaaralabs.ai</a>
                <a href="https://www.linkedin.com/company/yaaralabs-ai/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              
              <div className="space-y-3">
                <a href="/Terms-and-conditions" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Terms & Conditions</a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
