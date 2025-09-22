"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuickReveal from '../animations/QuickReveal';

interface ServiceCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  buttonText: string;
  icon: React.ReactNode;
  gradient: string;
  onClick?: () => void;
}

interface ServiceCardsSliderProps {
  services: ServiceCard[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  slidesToShow?: number;
}

const ServiceCardsSlider: React.FC<ServiceCardsSliderProps> = ({
  services,
  autoPlay = true,
  autoPlayInterval = 6000,
  slidesToShow = 2
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (autoPlay && !isHovered && services.length > slidesToShow) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => 
          prev + slidesToShow >= services.length ? 0 : prev + 1
        );
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, services.length, slidesToShow, isHovered]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, services.length - slidesToShow) : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => 
      prev + slidesToShow >= services.length ? 0 : prev + 1
    );
  };

  const visibleServices = services.slice(currentIndex, currentIndex + slidesToShow);

  return (
    <QuickReveal direction="up" delay={0} duration={0.6}>
      <div 
        className="relative max-w-7xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slider Container */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
              width: `${(services.length * 100) / slidesToShow}%`
            }}
          >
            {services.map((service, index) => (
              <div
                key={service.id}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / services.length}%` }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 overflow-hidden h-full"
                  style={{
                    backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)`
                  }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                  />

                  {/* Floating particles effect */}
                  <motion.div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400 rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 10}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </motion.div>

                  <div className="relative z-10 space-y-6">
                    {/* Icon and Title Section */}
                    <div className="flex items-start space-x-4">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex-shrink-0"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                          {service.icon}
                        </div>
                      </motion.div>
                      <div className="flex-1">
                        <motion.h3 
                          className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.5 }}
                        >
                          {service.title}
                        </motion.h3>
                        <motion.p 
                          className="text-lg text-purple-300 font-medium"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          {service.subtitle}
                        </motion.p>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <motion.p 
                      className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {service.description}
                    </motion.p>
                    
                    {/* Features List */}
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div 
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + featureIndex * 0.1, duration: 0.4 }}
                          className="flex items-start space-x-3 group/feature"
                        >
                          <motion.div 
                            className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0 group-hover/feature:bg-pink-400 transition-colors duration-300"
                            whileHover={{ scale: 1.5 }}
                            transition={{ duration: 0.2 }}
                          />
                          <motion.span 
                            className="text-gray-300 text-sm group-hover/feature:text-gray-200 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {feature}
                          </motion.span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <motion.button 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={service.onClick}
                      className="group/button w-full bg-gradient-to-r from-white to-gray-100 text-gray-900 px-6 py-4 rounded-lg font-semibold hover:from-purple-50 hover:to-pink-50 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer relative overflow-hidden"
                    >
                      {/* Button shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">{service.buttonText}</span>
                      <motion.div
                        className="relative z-10"
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                  </div>

                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
                      filter: 'blur(20px)'
                    }}
                  />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {Array.from({ length: Math.ceil(services.length / slidesToShow) }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentIndex(index * slidesToShow)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / slidesToShow) === index
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            disabled={currentIndex + slidesToShow >= services.length}
            className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </QuickReveal>
  );
};

export default ServiceCardsSlider;
