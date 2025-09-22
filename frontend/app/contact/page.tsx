"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer';
import emailjs from '@emailjs/browser';
import '../globals.css';

// Add custom styles for dark dropdown
const dropdownStyles = `
  select option {
    background-color: black !important;
    color: white !important;
  }
  
  select:focus option {
    background-color: #1a1a1a !important;
    color: white !important;
  }
  
  select option:hover {
    background-color: #333333 !important;
    color: white !important;
  }
`;
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
    
    try {
      // EmailJS configuration
      const serviceId = 'service_3w9l4pw'; // Your EmailJS service ID
      const templateId = 'template_tfmbjgr'; // You'll need to create this template
      const publicKey = '5OsI-rhOm1vCrq-xM'; // You'll need to get this from EmailJS dashboard
      
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        inquiry_type: formData.subject,
        message: formData.message
      };
      
      // Send email using EmailJS
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      console.log('Email sent successfully:', result);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
      
      alert('Thank you for your message! We will get back to you soon.');
      
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Sorry, there was an error sending your message. Please try again or contact us directly at hello@yaaralabs.ai');
    } finally {
      setIsSubmitting(false);
    }
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
    "AI Development Services",
    "Workforce AI Training", 
    "AI Strategy Consulting",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-black">
      <style dangerouslySetInnerHTML={{ __html: dropdownStyles }} />
      {/* Navigation Bar */}
      <Header transparent={true} isLoggedIn={false} onLoginClick={handleLoginClick} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Let's Transform Your Business with AI Excellence
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Connect with our AI experts to explore how we can accelerate your innovation, enable your workforce, and drive measurable business results.
            </p>
          </div>
        </div>
      </section>


      {/* Contact Form */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Contact us</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                Inquiry Type *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-transparent border border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white'
                }}
              >
                <option value="" style={{ backgroundColor: 'black', color: 'white' }}>Choose one</option>
                <option value="AI Development Services" style={{ backgroundColor: 'black', color: 'white' }}>AI Development Services</option>
                <option value="Workforce AI Training" style={{ backgroundColor: 'black', color: 'white' }}>Workforce AI Training</option>
                <option value="AI Strategy Consulting" style={{ backgroundColor: 'black', color: 'white' }}>AI Strategy Consulting</option>
                <option value="Other" style={{ backgroundColor: 'black', color: 'white' }}>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Full name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-transparent border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Full name"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                Business Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-transparent border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter ur business or company name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-transparent border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-transparent border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Drop your project or training requirement, timeline and time zone"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="mt-1 w-4 h-4 text-purple-600 bg-transparent border-white rounded focus:ring-purple-500 focus:ring-2"
                />
                <label htmlFor="privacy" className="text-sm text-white">
                  I agree to the Privacy Policy and Terms of Service *
                </label>
              </div>
              
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1 w-4 h-4 text-purple-600 bg-transparent border-white rounded focus:ring-purple-500 focus:ring-2"
                />
                <label htmlFor="consent" className="text-sm text-white">
                  I consent to being contacted about AI Solutions and Services *
                </label>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
                    Sending...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
