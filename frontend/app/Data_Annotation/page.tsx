"use client";

import React, { useEffect } from 'react';
import { ArrowRight, Eye, MessageSquare, Mic, Layers, Database, Target, Award, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import {EnhancedHeader} from '@/components/Header/EnhancedHeader';
import {Footer} from '@/components/Footer';
import {MetricBox} from '@/components/MetricBox';
import EnhancedMetricBox from '@/components/cards/EnhancedMetricBox';
import ScrollReveal from '@/components/animations/ScrollReveal';
import QuickReveal from '@/components/animations/QuickReveal';
import BackToTopButton from '@/components/ui/BackToTopButton';
import '../globals.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


interface AnnotationSectionProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  capabilities: string[];
  industries: string[];
  delay: number;
  icon: React.ReactNode;
}

interface AdvancedSectionProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  capabilities: string[];
  industries: string[];
  delay: number;
  icon: React.ReactNode;
}


const AnnotationSection: React.FC<AnnotationSectionProps> = ({ 
  title, 
  subtitle, 
  imageSrc, 
  imageAlt, 
  capabilities, 
  industries, 
  delay, 
  icon 
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay, hasAnimated]);

  return (
    <div 
      ref={sectionRef}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-700 hover:scale-105 h-full flex flex-col">
        <div className="space-y-8 flex-1">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <div className="text-purple-400 flex-shrink-0">
              {icon}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
              <p className="text-lg text-gray-300">{subtitle}</p>
            </div>
          </div>

          {/* Image */}
          <div className="relative rounded-xl overflow-hidden border border-gray-600">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Capabilities */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Capabilities:</h4>
            <div className="space-y-3">
              {capabilities.map((capability, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm leading-relaxed">{capability}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Industries:</h4>
            <p className="text-gray-300 text-sm">{industries.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvancedSection: React.FC<AdvancedSectionProps> = ({ 
  title, 
  subtitle, 
  imageSrc, 
  imageAlt, 
  capabilities, 
  industries, 
  delay, 
  icon 
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay, hasAnimated]);

  return (
    <div 
      ref={sectionRef}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-700 hover:scale-105 h-full flex flex-col">
        <div className="space-y-8 flex-1">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <div className="text-purple-400 flex-shrink-0">
              {icon}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
              <p className="text-lg text-gray-300">{subtitle}</p>
            </div>
          </div>

          {/* Image */}
          <div className="relative rounded-xl overflow-hidden border border-gray-600">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Capabilities */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Sound Understanding at Scale / Cross-Modal AI Training Data:</h4>
            <div className="space-y-1">
              {capabilities.map((capability, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm leading-relaxed">{capability}</span>
                </div>
              ))}
              {/* Industries as single bullet point */}
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm leading-relaxed">Industries - {industries.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataAnnotationPage: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/contact');
  };

  const handleScheduleConsultation = () => {
    router.push('/contact');
  };

  const annotationSections = [
    {
      title: "Computer Vision Annotation",
      subtitle: "Perception-Optimized Visual Data",
      imageSrc: "/1.avif",
      imageAlt: "Computer Vision Annotation Interface",
      capabilities: [
        "Advanced Object Detection - Multi-class hierarchical labeling with contextual relationships",
        "Precision Segmentation - Pixel-perfect semantic and instance segmentation for medical imaging",
        "3D Spatial Annotation - LiDAR point clouds and stereo vision",
        "Edge Case Optimization - Specialized handling of challenging scenarios and rare events"
      ],
      industries: ["Autonomous", "Medical Imaging", "Manufacturing QC", "Security Systems"],
      icon: <Eye className="w-8 h-8" />
    },
    {
      title: "Language Intelligence & NLP",
      subtitle: "Advanced Text & Speech Intelligence",
      imageSrc: "/2.avif",
      imageAlt: "Language Intelligence & NLP Interface",
      capabilities: [
        "Named entity recognition and sentiment analysis",
        "Speech transcription and speaker identification",
        "Intent & Context Annotation - Multi-turn conversation understanding for conversational AI",
        "Multilingual text classification and translation datasets",
        "Conversational AI and chatbot training data"
      ],
      industries: ["Financial Services", "Customer Support", "Legal", "Media"],
      icon: <MessageSquare className="w-8 h-8" />
    }
  ];

  const advancedSections = [
    {
      title: "Audio & Speech Intelligence",
      subtitle: "Sound Understanding at Scale",
      imageSrc: "/3.avif",
      imageAlt: "Audio & Speech Intelligence Interface",
      capabilities: [
        "Multi-Speaker Diarization - audio segmentation with emotional context",
        "Acoustic Event Classification - Environmental sound recognition",
        "Speech Quality Assessment - Pronunciation, accent, fluency",
        "Biomedical Audio Analysis - Respiratory, cardiac, and diagnostic sound pattern annotation"
      ],
      industries: [
        "Healthcare",
        "EdTech", 
        "Smart Devices",
        "Security"
      ],
      icon: <Mic className="w-8 h-8" />
    },
    {
      title: "Multimodal & Fusion Annotation",
      subtitle: "Cross-Modal AI Training Data",
      imageSrc: "/4.avif",
      imageAlt: "Multimodal & Fusion Annotation Interface",
      capabilities: [
        "Video-Text Alignment - Temporal synchronization for video understanding models",
        "Sensor Fusion Datasets - Multi-sensor correlation for robotics and IoT applications",
        "AR/VR Content Preparation - Spatial computing and immersive experience datasets",
        "Time-Series Correlation - Complex temporal pattern annotation for predictive models"
      ],
      industries: [
        "Robotics",
        "Smart Cities", 
        "Entertainment",
        "Industrial IoT"
      ],
      icon: <Layers className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Enhanced Navigation Bar */}
      <EnhancedHeader transparent={true} isLoggedIn={false} onLoginClick={handleLoginClick} />

      {/* Enhanced Hero Section */}
      <section className="relative pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <QuickReveal direction="up" delay={0} duration={0.6}>
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                Intelligent Annotation Across Every AI Domain
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Purpose-built annotation workflows designed by Experienced Annotators and AI practitioners
              </p>
            </div>
          </QuickReveal>
        </div>
      </section>

      {/* Annotation Sections */}
      <section className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-4">
            {annotationSections.map((section, index) => (
              <AnnotationSection
                key={index}
                title={section.title}
                subtitle={section.subtitle}
                imageSrc={section.imageSrc}
                imageAlt={section.imageAlt}
                capabilities={section.capabilities}
                industries={section.industries}
                delay={index * 200}
                icon={section.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Sections */}
      <section className="pt-8 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-4">
            {advancedSections.map((section, index) => (
              <AdvancedSection
                key={index}
                title={section.title}
                subtitle={section.subtitle}
                imageSrc={section.imageSrc}
                imageAlt={section.imageAlt}
                capabilities={section.capabilities}
                industries={section.industries}
                delay={index * 200}
                icon={section.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hero Text Section */}
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
              Augment your business and workforce potential with AI
            </h2>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
};

export default DataAnnotationPage;
