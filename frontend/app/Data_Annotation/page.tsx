"use client";

import React, { useEffect } from 'react';
import { ArrowRight, Eye, MessageSquare, Mic, Layers } from 'lucide-react';
import {Header} from '@/components/Header/Header';
import '../globals.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface MetricBoxProps {
  value: string;
  label: string;
  delay: number;
}

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

const MetricBox: React.FC<MetricBoxProps> = ({ value, label, delay }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [animatedValue, setAnimatedValue] = React.useState("0");
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const boxRef = React.useRef<HTMLDivElement>(null);

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
      { threshold: 0.3 }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, [delay, hasAnimated]);

  React.useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseFloat(value.replace(/[+$%]/g, ''));
    const suffix = value.replace(/[\d.]/g, '');
    const duration = 1000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = numericValue / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const currentValue = Math.min(increment * currentStep, numericValue);
      setAnimatedValue(Math.floor(currentValue) + suffix);

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedValue(value);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <div 
      ref={boxRef}
      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 font-mono">
        {animatedValue}
      </div>
      <div className="text-sm text-gray-300 font-medium">
        {label}
      </div>
    </div>
  );
};

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
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("DataAnnotationPage: Status:", status, "Session:", !!session);
    
    if (status === "loading") return;
    
    if (session) {
      console.log("DataAnnotationPage: Redirecting authenticated user to /home");
      router.replace('/home');
      return;
    }
  }, [session, status, router]);

  if (session) {
    return null;
  }

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleScheduleConsultation = () => {
    console.log('Schedule consultation clicked');
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
      {/* Navigation Bar */}
      <Header transparent={true} isLoggedIn={false} onLoginClick={handleLoginClick} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Intelligent Annotation Across Every AI Domain
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Purpose-built annotation workflows designed by Experienced Annotators and AI practitioners
            </p>
          </div>
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
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">AI Product Development</a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Workforce AI Enablement</a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">AI Strategy Consulting</a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Custom AI Solutions</a>
              </div>
            </div>
            
            {/* Company Column */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Company</h4>
              <div className="space-y-3">
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Our Expertise</a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Contact Us</a>
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
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Terms & Conditions</a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DataAnnotationPage;
