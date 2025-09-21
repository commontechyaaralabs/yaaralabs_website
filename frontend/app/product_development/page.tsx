"use client";

import React, { useEffect } from 'react';
import { ArrowRight, Network, Settings, CheckCircle, BarChart3 } from 'lucide-react';
import {Header} from '@/components/Header/Header';
import '../globals.css';
import { useRouter } from 'next/navigation';

interface MetricBoxProps {
  value: string;
  label: string;
  delay: number;
}

interface ServiceCardProps {
  title: string;
  features: string[];
  icon: React.ReactNode;
  delay: number;
}

interface ProcessPhaseProps {
  phaseNumber: string;
  title: string;
  duration: string;
  activities: string[];
  delay: number;
  hasGradient: boolean;
}

interface TechColumnProps {
  title: string;
  items: string[];
  delay: number;
}

interface AdvantageCardProps {
  title: string;
  items: string[];
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

const ServiceCard: React.FC<ServiceCardProps> = ({ title, features, icon, delay }) => {
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
      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-700 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
      }}
    >
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="text-purple-400 flex-shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          </div>
        </div>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProcessPhase: React.FC<ProcessPhaseProps> = ({ phaseNumber, title, duration, activities, delay, hasGradient }) => {
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
      className={`rounded-xl p-6 transition-all duration-700 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${
        hasGradient 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
          : 'bg-gray-800 border border-gray-700'
      }`}
    >
      <div className="space-y-6">
        <div>
          <div className="text-sm font-bold text-purple-400 mb-2">{phaseNumber}</div>
          <h3 className="text-lg font-bold text-white uppercase mb-2">{title}</h3>
          <div className="text-sm text-gray-300">{duration}</div>
        </div>
        
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300 text-sm leading-relaxed">{activity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TechColumn: React.FC<TechColumnProps> = ({ title, items, delay }) => {
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
      className={`bg-black border border-purple-400 rounded-xl p-6 transition-all duration-700 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        </div>
        
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-white text-sm leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdvantageCard: React.FC<AdvantageCardProps> = ({ title, items, delay }) => {
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
      className={`bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-8 transition-all duration-700 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        </div>
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-white text-sm leading-relaxed">{item}</span>
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

const CustomAISolutionsPage: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleScheduleConsultation = () => {
    // Add your consultation scheduling logic here
    console.log('Schedule consultation clicked');
  };

  const serviceCards = [
    {
      title: "Agentic AI",
      features: [
        "Multi-agent system architectures",
        "Autonomous reasoning frameworks",
        "Self-learning business systems",
        "Adaptive decision networks"
      ],
      icon: <Network className="w-8 h-8" />
    },
    {
      title: "Automation Systems",
      features: [
        "Intelligent workflow automation",
        "Decision-making algorithms",
        "Process optimization engines",
        "Autonomous operational systems"
      ],
      icon: <Settings className="w-8 h-8" />
    },
    {
      title: "Intelligent Products",
      features: [
        "AI-powered applications and platforms",
        "Machine learning-driven features",
        "Predictive analytics systems",
        "Computer vision and NLP solutions"
      ],
      icon: <CheckCircle className="w-8 h-8" />
    },
    {
      title: "Data Intelligence",
      features: [
        "Advanced analytics dashboards",
        "Real-time insights engines",
        "Predictive modeling systems",
        "Knowledge management platforms"
      ],
      icon: <BarChart3 className="w-8 h-8" />
    }
  ];

  const processPhases = [
    {
      phaseNumber: "01",
      title: "DISCOVER & DESIGN",
      duration: "Weeks 1-3",
      activities: [
        "Requirements and feasibility",
        "Tech Architecture",
        "Data strategy and model selection",
        "Project roadmap and milestone definition"
      ],
      hasGradient: true
    },
    {
      phaseNumber: "02",
      title: "DEVELOP & ITERATE",
      duration: "Weeks 4-10",
      activities: [
        "Agile development with 2-week sprints",
        "Continuous model training and optimization",
        "Regular stakeholder reviews and feedback",
        "Quality assurance and testing protocols"
      ],
      hasGradient: true
    },
    {
      phaseNumber: "03",
      title: "INTEGRATE & TEST",
      duration: "Week 11-14",
      activities: [
        "System integration and API development",
        "Performance optimization and scaling",
        "Security implementation and compliance",
        "User acceptance testing and validation"
      ],
      hasGradient: false
    },
    {
      phaseNumber: "04",
      title: "DEPLOY & ENABLE",
      duration: "Week 15-16",
      activities: [
        "Production deployment and monitoring",
        "Team training and knowledge transfer",
        "Documentation and support systems",
        "Ongoing optimization and maintenance planning"
      ],
      hasGradient: false
    }
  ];

  const techColumns = [
    {
      title: "Machine Learning Frameworks",
      items: [
        "TensorFlow, PyTorch, Scikit-learn",
        "Custom model architectures",
        "MLOps and model lifecycle management"
      ]
    },
    {
      title: "Cloud Platforms & Infrastructure",
      items: [
        "AWS, Azure, Google Cloud, Hybrid Cloud",
        "Kubernetes and containerization",
        "Scalable microservices architecture"
      ]
    },
    {
      title: "AI Specializations",
      items: [
        "Large Language Models (LLMs)",
        "Computer Vision and Image Processing",
        "Natural Language Processing (NLP)",
        "Reinforcement Learning and Optimization"
      ]
    },
    {
      title: "Enterprise Integration",
      items: [
        "API-first development approach",
        "Legacy system integration",
        "Real-time data processing",
        "Security and compliance frameworks"
      ]
    }
  ];

  const advantageCards = [
    {
      title: "Technical Excellence",
      items: [
        "Cutting-edge AI research application",
        "Enterprise-grade security and scalability",
        "Proven development methodologies",
        "Quality assurance and testing protocols"
      ]
    },
    {
      title: "Business Focus",
      items: [
        "ROI-driven development approach",
        "Clear success metrics and KPIs",
        "Business process optimization",
        "Market-ready solution delivery"
      ]
    },
    {
      title: "Rapid Delivery",
      items: [
        "Accelerated development timelines",
        "Agile methodology with quick iterations",
        "Risk mitigation and contingency planning",
        "On-time, on-budget project completion"
      ]
    },
    {
      title: "Partnership Approach",
      items: [
        "Collaborative development process",
        "Transparent communication and updates",
        "Knowledge transfer and team enablement",
        "Long-term strategic support"
      ]
    }
  ];

  const consultationColumns = [
    {
      title: "Technical Consultation",
      items: [
        "30-Minute AI Development Assessment",
        "Technical feasibility",
        "Architecture recommendations",
        "Project timeline and approach"
      ]
    },
    {
      title: "Development Proposal",
      items: [
        "Comprehensive Development Proposal",
        "Detailed project specification",
        "Custom solution architecture",
        "Investment and timeline details"
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
              Custom AI Solutions That Transform
              <br />
              Business Potential
            </h1>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <MetricBox 
              value="15+" 
              label="AI Specialists" 
              delay={0}
            />
            <MetricBox 
              value="100+" 
              label="Experience (yrs)" 
              delay={200}
            />
            <MetricBox 
              value="Enterprise" 
              label="Security" 
              delay={400}
            />
            <MetricBox 
              value="12-16" 
              label="Delivery (wks)" 
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

      {/* Service Cards Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCards.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                features={service.features}
                icon={service.icon}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Proven Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Proven Process, Exceptional Results
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processPhases.map((phase, index) => (
              <ProcessPhase
                key={index}
                phaseNumber={phase.phaseNumber}
                title={phase.title}
                duration={phase.duration}
                activities={phase.activities}
                delay={index * 150}
                hasGradient={phase.hasGradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cutting-Edge AI Technologies Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Cutting-Edge AI Technologies, Enterprise-Ready Solutions
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techColumns.map((tech, index) => (
              <TechColumn
                key={index}
                title={tech.title}
                items={tech.items}
                delay={index * 150}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The YaaraLabs Development Advantage Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              The YaaraLabs Development Advantage
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantageCards.map((advantage, index) => (
              <AdvantageCard
                key={index}
                title={advantage.title}
                items={advantage.items}
                delay={index * 150}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Build Your AI Solution Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Ready to Build Your AI Solution?
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
              className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 text-base shadow-lg"
            >
              <span>SCHEDULE CONSULTATION</span>
              <ArrowRight className="w-4 h-4" />
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

export default CustomAISolutionsPage;
