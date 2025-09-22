"use client";

import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../animations/ScrollReveal';
import QuickReveal from '../animations/QuickReveal';

interface EnhancedServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  buttonText: string;
  delay: number;
  onClick?: () => void;
  icon?: React.ReactNode;
  gradient?: string;
}

const EnhancedServiceCard: React.FC<EnhancedServiceCardProps> = ({ 
  title, 
  subtitle, 
  description, 
  features, 
  buttonText, 
  delay, 
  onClick,
  icon,
  gradient = "from-purple-500/20 to-pink-500/20"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0.3, 
      y: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    },
    hover: {
      y: -10,
      scale: 1.02
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0
    },
    hover: {
      scale: 1.1,
      rotate: 5
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    },
    hover: {
      scale: 1.05
    }
  };

  return (
    <QuickReveal direction="up" delay={delay} duration={0.5}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 overflow-hidden h-full flex flex-col"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)`
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
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

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon and Title Section */}
          <div className="flex items-start space-x-4 mb-6">
            {icon && (
              <motion.div
                variants={iconVariants}
                className="flex-shrink-0"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                  {icon}
                </div>
              </motion.div>
            )}
            <div className="flex-1">
              <motion.h3 
                className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (delay / 1000) + 0.1, duration: 0.5 }}
              >
                {title}
              </motion.h3>
              <motion.p 
                className="text-lg text-purple-300 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (delay / 1000) + 0.2, duration: 0.5 }}
              >
                {subtitle}
              </motion.p>
            </div>
          </div>
          
          {/* Description */}
          <motion.p 
            className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (delay / 1000) + 0.3, duration: 0.5 }}
          >
            {description}
          </motion.p>
          
          {/* Features List */}
          <div className="space-y-3 mb-6 flex-1">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={featureVariants}
                custom={index}
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
          
          {/* CTA Button - This will stick to the bottom */}
          <motion.button 
            variants={buttonVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="group/button w-full bg-gradient-to-r from-white to-gray-100 text-gray-900 px-6 py-4 rounded-lg font-semibold hover:from-purple-50 hover:to-pink-50 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer relative overflow-hidden mt-auto"
          >
            {/* Button shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">{buttonText}</span>
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
    </QuickReveal>
  );
};

export default EnhancedServiceCard;
