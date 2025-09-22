"use client";

import React, { useEffect } from 'react';
import { ArrowRight, Brain, Users, Target, Award, TrendingUp, CheckCircle, Clock, BookOpen, Zap } from 'lucide-react';
import {EnhancedHeader} from '@/components/Header/EnhancedHeader';
import {Footer} from '@/components/Footer';
import {MetricBox} from '@/components/MetricBox';
import EnhancedMetricBox from '@/components/cards/EnhancedMetricBox';
import ScrollReveal from '@/components/animations/ScrollReveal';
import QuickReveal from '@/components/animations/QuickReveal';
import BackToTopButton from '@/components/ui/BackToTopButton';
import '../globals.css';
import { useRouter } from 'next/navigation';


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
    router.push('/contact');
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
        "30-Minute AI Readiness Assessment",
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
      {/* Enhanced Navigation Bar */}
      <EnhancedHeader transparent={true} isLoggedIn={false} onLoginClick={handleLoginClick} />

      {/* Enhanced Hero Section */}
      <section className="relative pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <QuickReveal direction="up" delay={0} duration={0.6}>
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                Build AI-Confident Organizations from the Ground Up
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                Our proven three-tier methodology delivers 100%+ knowledge improvement and measurable business impact. Industry-focused curriculum that transforms teams from AI-anxious to AI-champion in weeks, not months.
              </p>
            </div>
          </QuickReveal>
        </div>
      </section>

      {/* Three-Tier Training Methodology Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <QuickReveal direction="up" delay={0} duration={0.6}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Three-Tier Training Methodology
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Our proven pyramid approach transforms your organization from AI-anxious to AI-champion
              </p>
            </div>
          </QuickReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Foundation Level */}
            <QuickReveal direction="up" delay={100} duration={0.5}>
              <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-8 border border-purple-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold text-white mb-4">Foundation Level (AI Literacy)</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="text-gray-200"><strong>Duration:</strong> 1-2 days</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="text-gray-200"><strong>Audience:</strong> All employees</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="text-gray-200"><strong>Outcome:</strong> Basic AI understanding and confidence</span>
                </div>
              </div>
              </div>
            </QuickReveal>

            {/* Champions Level */}
            <QuickReveal direction="up" delay={200} duration={0.5}>
              <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-8 border border-purple-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold text-white mb-4">Champions Level (AI Application)</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="text-gray-200"><strong>Duration:</strong> 3-5 days</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="text-gray-200"><strong>Audience:</strong> Department leaders and key users</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="text-gray-200"><strong>Outcome:</strong> Hands-on AI tool proficiency</span>
                </div>
              </div>
              </div>
            </QuickReveal>

            {/* Strategy Partners Level */}
            <QuickReveal direction="up" delay={300} duration={0.5}>
              <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-8 border border-purple-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold text-white mb-4">Strategy Partners Level (AI Leadership)</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="text-gray-200"><strong>Duration:</strong> Executive workshops</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="text-gray-200"><strong>Audience:</strong> C-suite and senior management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="text-gray-200"><strong>Outcome:</strong> AI strategy and governance expertise</span>
                </div>
              </div>
              </div>
            </QuickReveal>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <MetricBox 
              value="+102%" 
              label="AI Knowledge Improvement" 
              delay={0}
            />
            <MetricBox 
              value="$40M+" 
              label="Business Impact" 
              delay={200}
            />
            <MetricBox 
              value="97%" 
              label="Participant Satisfaction" 
              delay={400}
            />
            <MetricBox 
              value="12+" 
              label="Use Cases Identified per Program" 
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
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Industry-Focused Curriculum Examples
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto text-center mb-8">
              All programs include industry-specific use cases and real-world examples
            </p>
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
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              All programs include hands-on practice with no-code AI tools and real industry scenarios
            </p>
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

export default AITrainingPage;
