"use client";

import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import {Header} from '@/components/Header/Header';
import '../globals.css';
import { useRouter } from 'next/navigation';

interface MetricBoxProps {
  value: string;
  label: string;
  delay: number;
}

interface EducationTrackProps {
  trackNumber: string;
  title: string;
  items: string[];
  delay: number;
  hasBlueBackground: boolean;
}

interface LearningExperienceProps {
  title: string;
  details: string[];
  delay: number;
}

interface ConsultationColumnProps {
  title: string;
  items: string[];
  delay: number;
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

const EducationTrack: React.FC<EducationTrackProps> = ({ trackNumber, title, items, delay, hasBlueBackground }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay, hasAnimated]);

  return (
    <div 
      ref={cardRef}
      className={`h-full p-6 rounded-xl transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } bg-gradient-to-br from-gray-800 to-gray-900`}
    >
      <div className="space-y-6 h-full flex flex-col">
        <div className="flex-shrink-0">
          <div className="text-sm font-bold text-purple-400 mb-3">{trackNumber}</div>
          <h3 className="text-lg font-bold text-white mb-6 leading-tight">{title}</h3>
        </div>
        
        <div className="space-y-3 flex-1">
          {items.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-white text-sm leading-relaxed break-words whitespace-normal">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LearningExperience: React.FC<LearningExperienceProps> = ({ title, details, delay }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay, hasAnimated]);

  return (
    <div 
      ref={cardRef}
      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 transition-all duration-700 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        
        <div className="space-y-3">
          {details.map((detail, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-white text-sm leading-relaxed">{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ConsultationColumn: React.FC<ConsultationColumnProps> = ({ title, items, delay }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay, hasAnimated]);

  return (
    <div 
      ref={cardRef}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
        </div>
        
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-white text-sm leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AITrainingPage: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleScheduleConsultation = () => {
    // Add your consultation scheduling logic here
    console.log('Schedule consultation clicked');
  };

  const educationTracks = [
    {
      trackNumber: "01",
      title: "Executive Leadership Track",
      items: [
        "AI Strategy & Governance (C-Suite/Board Level)",
        "AI Investment & ROI Planning (Finance/Strategy Leaders)",
        "AI Ethics & Risk Management (Compliance/Legal Teams)",
        "Change Management for AI (HR/Operations Leaders)"
      ],
      hasBlueBackground: true
    },
    {
      trackNumber: "02",
      title: "Business Leadership Track",
      items: [
        "AI Applications by Function (Department Heads)",
        "AI Project Management (Program Managers)",
        "AI-Driven Decision Making (Business Analysts)",
        "Customer Experience with AI (Sales/Marketing Teams)"
      ],
      hasBlueBackground: true
    },
    {
      trackNumber: "03",
      title: "Technical Professional Track",
      items: [
        "AI/ML Implementation (Software Engineers)",
        "Data Science & Analytics (Data Teams)",
        "MLOps & AI Infrastructure (DevOps/IT Teams)",
        "AI Security & Compliance (Security Teams)"
      ],
      hasBlueBackground: false
    },
    {
      trackNumber: "04",
      title: "General Workforce Track",
      items: [
        "AI Literacy Fundamentals (All Employees)",
        "AI Tools & Productivity (Operations Teams)",
        "AI Ethics & Responsibility (Company-wide)",
        "Future of Work with AI (Career Development)"
      ],
      hasBlueBackground: false
    }
  ];

  const learningExperiences = [
    {
      title: "Executive Workshops",
      details: [
        "Format: 4-8 hour intensive sessions",
        "Group Size: 8-15 senior leaders",
        "Focus: Strategic decision-making and governance",
        "Delivery: In-person or virtual executive sessions"
      ]
    },
    {
      title: "Multi-Day Bootcamps",
      details: [
        "Format: 1,2-5 day intensive programs",
        "Group Size: 15-25 participants per track",
        "Focus: Comprehensive skill development",
        "Delivery: Hybrid learning with hands-on practice"
      ]
    },
    {
      title: "Weekly Learning Series",
      details: [
        "Format: 1-2 hour weekly sessions over 8-12 weeks",
        "Group Size: 20-30 participants",
        "Focus: Progressive skill building",
        "Delivery: Virtual or in-person ongoing education"
      ]
    },
    {
      title: "Company-Wide Programs",
      details: [
        "Format: Blended learning approach",
        "Group Size: 50-500+ employees",
        "Focus: Organization-wide AI transformation",
        "Delivery: Multi-modal, scalable deployment"
      ]
    }
  ];

  const consultationColumns = [
    {
      title: "Training Needs Assessment",
      items: [
        "30-Minute AI Development Assessment",
        "Current capability evaluation",
        "Custom program recommendations",
        "Implementation timeline and approach"
      ]
    },
    {
      title: "Custom Program Development",
      items: [
        "Comprehensive Training Program Proposal",
        "Detailed curriculum design",
        "Delivery methodology and schedule",
        "Investment and resource requirements"
      ]
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-16 leading-tight" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Build AI-Confident Organizations from the Ground Up
            </h1>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <MetricBox 
              value="Multiple" 
              label="AI Trainers" 
              delay={0}
            />
            <MetricBox 
              value="Multi Industry" 
              label="Experience" 
              delay={200}
            />
            <MetricBox 
              value="Custom+" 
              label="Curriculum" 
              delay={400}
            />
            <MetricBox 
              value="35%+" 
              label="Improvement" 
              delay={600}
            />
          </div>

          {/* Schedule Consultation Button */}
          <div className="flex justify-center mb-20">
            <button 
              onClick={handleScheduleConsultation}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 text-lg"
            >
              <span>SCHEDULE CONSULTATION</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Comprehensive AI Education Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Comprehensive AI Education for Every Organizational Level
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {educationTracks.map((track, index) => (
              <EducationTrack
                key={index}
                trackNumber={track.trackNumber}
                title={track.title}
                items={track.items}
                delay={index * 150}
                hasBlueBackground={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Flexible Learning Experiences Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Flexible Learning Experiences Designed for Your Organisation
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningExperiences.slice(0, 3).map((experience, index) => (
              <LearningExperience
                key={index}
                title={experience.title}
                details={experience.details}
                delay={index * 150}
              />
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 mt-6">
            <div className="lg:col-span-1 lg:mx-auto lg:max-w-md">
              <LearningExperience
                title={learningExperiences[3].title}
                details={learningExperiences[3].details}
                delay={450}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Transform Your Workforce Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Ready to Transform Your Workforce with AI Training?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 mb-12">
            {consultationColumns.map((column, index) => (
              <ConsultationColumn
                key={index}
                title={column.title}
                items={column.items}
                delay={index * 200}
              />
            ))}
          </div>

          {/* Schedule Consultation Button */}
          <div className="flex justify-center">
            <button 
              onClick={handleScheduleConsultation}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 text-lg"
            >
              <span>SCHEDULE CONSULTATION</span>
              <ArrowRight className="w-5 h-5" />
            </button>
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

export default AITrainingPage;
