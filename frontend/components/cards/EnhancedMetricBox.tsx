"use client";

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../animations/AnimatedCounter';
import ScrollReveal from '../animations/ScrollReveal';
import QuickReveal from '../animations/QuickReveal';

interface EnhancedMetricBoxProps {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
  icon?: React.ReactNode;
  gradient?: string;
  isAnimated?: boolean;
}

const EnhancedMetricBox: React.FC<EnhancedMetricBoxProps> = ({
  value,
  label,
  prefix = '',
  suffix = '',
  delay = 0,
  icon,
  gradient = 'from-purple-500 to-pink-500',
  isAnimated = true
}) => {
  const boxVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 30
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0
    },
    hover: {
      scale: 1.05,
      y: -5
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0
    },
    hover: {
      scale: 1.2,
      rotate: 10
    }
  };
 
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <QuickReveal direction="scale" delay={delay} duration={0.5}>
      <motion.div
        variants={boxVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)`
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
        />

        {/* Floating particles */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + i * 15}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        <div className="relative z-10 text-center">
          {/* Icon */}
          {icon && (
            <motion.div
              variants={iconVariants}
              className="flex justify-center mb-4"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center text-white`}>
                {icon}
              </div>
            </motion.div>
          )}

          {/* Value */}
          <motion.div
            variants={textVariants}
            className="text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300"
          >
            {isAnimated && typeof value === 'number' ? (
              <AnimatedCounter
                end={value}
                duration={2000}
                prefix={prefix}
                suffix={suffix}
                className="block"
              />
            ) : (
              <span className="block">
                {prefix}{value}{suffix}
              </span>
            )}
          </motion.div>

          {/* Label */}
          <motion.p
            variants={textVariants}
            className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300"
          >
            {label}
          </motion.p>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))`,
            filter: 'blur(20px)'
          }}
        />
      </motion.div>
    </QuickReveal>
  );
};

export default EnhancedMetricBox;
