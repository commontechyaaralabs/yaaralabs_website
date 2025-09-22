"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Github, ArrowRight, Send } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';

const EnhancedFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEmail('');
    setIsSubmitting(false);
    // You can add actual newsletter signup logic here
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://www.linkedin.com/company/yaaralabs-ai/',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      href: '#',
      color: 'hover:text-blue-300'
    },
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      href: '#',
      color: 'hover:text-gray-300'
    }
  ];

  const footerSections = [
    {
      title: 'Solutions',
      links: [
        { name: 'AI Product Development', href: '/product_development' },
        { name: 'Workforce AI Enablement', href: '/AI_Training' },
        { name: 'AI Strategy Consulting', href: '/contact' },
        { name: 'Data Annotation Services', href: '/Data_Annotation' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'Our Expertise', href: '#expertise-section' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#' },
        { name: 'Case Studies', href: '#' },
        { name: 'White Papers', href: '#' },
        { name: 'AI Insights', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms & Conditions', href: '/Terms-and-conditions' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'Accessibility', href: '#' }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <footer className="py-16 px-4 bg-black border-t border-gray-800 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-pink-900/5" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Newsletter Section */}
          <ScrollReveal direction="up" delay={0} duration={0.8}>
            <div className="text-center mb-16">
              <motion.h3 
                className="text-3xl font-bold text-white mb-4"
                variants={itemVariants}
              >
                Stay Updated with AI Insights
              </motion.h3>
              <motion.p 
                className="text-gray-300 mb-8 max-w-2xl mx-auto"
                variants={itemVariants}
              >
                Get the latest AI trends, case studies, and implementation strategies delivered to your inbox.
              </motion.p>
              
              <motion.form 
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                variants={itemVariants}
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            </div>
          </ScrollReveal>

          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Logo and Description */}
            <ScrollReveal direction="up" delay={200} duration={0.8}>
              <div className="lg:col-span-2">
                <motion.div 
                  className="flex items-center space-x-3 mb-6"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image 
                      src="/yaaralogo-circle.png" 
                      alt="YaaraLabs Logo" 
                      width={48} 
                      height={48} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <span className="text-white text-xl font-bold">YaaraLabs</span>
                </motion.div>
                
                <motion.p 
                  className="text-gray-300 mb-6 leading-relaxed"
                  variants={itemVariants}
                >
                  Transforming businesses through AI excellence. From strategy to implementation, 
                  we deliver measurable results that drive real business impact.
                </motion.p>

                {/* Social Links */}
                <motion.div 
                  className="flex space-x-4"
                  variants={itemVariants}
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.color} transition-all duration-300 p-2 rounded-lg hover:bg-gray-800`}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <ScrollReveal 
                key={section.title} 
                direction="up" 
                delay={300 + sectionIndex * 100} 
                duration={0.8}
              >
                <div>
                  <motion.h4 
                    className="text-white font-semibold text-lg mb-6"
                    variants={itemVariants}
                  >
                    {section.title}
                  </motion.h4>
                  <motion.div 
                    className="space-y-3"
                    variants={itemVariants}
                  >
                    {section.links.map((link, linkIndex) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        className="block text-gray-400 hover:text-purple-400 text-sm transition-all duration-300 hover:translate-x-1 group"
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                      >
                        <span className="group-hover:text-purple-400 transition-colors duration-300">
                          {link.name}
                        </span>
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom Bar */}
          <ScrollReveal direction="up" delay={800} duration={0.8}>
            <motion.div 
              className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
              variants={itemVariants}
            >
              <motion.p 
                className="text-gray-400 text-sm"
                variants={itemVariants}
              >
                © 2024 YaaraLabs. All rights reserved.
              </motion.p>
              
              <motion.div 
                className="flex items-center space-x-6"
                variants={itemVariants}
              >
                <a 
                  href="mailto:hello@yaaralabs.ai" 
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm">hello@yaaralabs.ai</span>
                </a>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </motion.div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
