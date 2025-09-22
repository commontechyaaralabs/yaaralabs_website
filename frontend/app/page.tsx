"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Brain, Mail, MessageSquare, Ticket, TrendingUp, ArrowRight, Database, Settings, Shield, Zap, Phone, Share2, Users, Target, Award, Globe } from 'lucide-react';
import {EnhancedHeader} from '@/components/Header/EnhancedHeader';
import {Footer} from '@/components/Footer';
import EnhancedFooter from '@/components/Footer/EnhancedFooter';
import {MetricBox} from '@/components/MetricBox';
import EnhancedServiceCard from '@/components/cards/EnhancedServiceCard';
import EnhancedMetricBox from '@/components/cards/EnhancedMetricBox';
import EnhancedHeroSection from '@/components/sections/EnhancedHeroSection';
import ScrollReveal from '@/components/animations/ScrollReveal';
import QuickReveal from '@/components/animations/QuickReveal';
import BackToTopButton from '@/components/ui/BackToTopButton';
import TestimonialsSlider from '@/components/sliders/TestimonialsSlider';
import * as THREE from 'three';
import './globals.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

declare global {
  interface Window {
    THREE: typeof THREE;
  }
}


interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  buttonText: string;
  delay: number;
  onClick?: () => void;
}

interface ExpertiseCardProps {
  title: string;
  features: string[];
  delay: number;
}

interface AdvantageCardProps {
  title: string;
  features: string[];
  delay: number;
  isAlternate: boolean;
}

interface InnovationCardProps {
  title: string;
  description: string;
  delay: number;
}


const ServiceCard: React.FC<ServiceCardProps> = ({ title, subtitle, description, features, buttonText, delay, onClick }) => {
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
      { threshold: 0.2 } // Trigger when 20% of the element is visible
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
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)'
      }}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-lg text-purple-300 font-medium">{subtitle}</p>
        </div>
        
        <p className="text-gray-300 leading-relaxed">
          {description}
        </p>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        <button 
          onClick={onClick}
          className="w-full bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ title, features, delay }) => {
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
      className={`overflow-hidden rounded-xl transition-all duration-700 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="bg-gray-800 p-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <div 
        className="p-6 text-white"
        style={{
          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%)'
        }}
      >
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="text-sm leading-relaxed">
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdvantageCard: React.FC<AdvantageCardProps> = ({ title, features, delay, isAlternate }) => {
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
      className={`rounded-xl p-8 transition-all duration-700 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${
        isAlternate 
          ? 'bg-gradient-to-br from-purple-900 to-blue-900 border border-purple-700' 
          : 'bg-gray-800 border border-gray-700'
      }`}
    >
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                isAlternate ? 'bg-white' : 'bg-purple-400'
              }`}></div>
              <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InnovationCard: React.FC<InnovationCardProps> = ({ title, description, delay }) => {
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
      className={`overflow-hidden rounded-xl transition-all duration-700 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Purple Header */}
      <div 
        className="px-8 py-6"
        style={{
          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%)'
        }}
      >
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      
      {/* Dark Gray Body */}
      <div className="bg-gray-800 px-8 py-8">
        <p className="text-white leading-relaxed text-left">
          {description}
        </p>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number>(0);
  const [animationOpacity, setAnimationOpacity] = useState(0);

  const initShaderBackground = () => {
    if (!containerRef.current || !window.THREE) return;

    const container = containerRef.current;
    const scene = new window.THREE.Scene();
    const clock = new window.THREE.Clock();
    
    const camera = new window.THREE.OrthographicCamera( 
      window.innerWidth / -2, 
      window.innerWidth / 2, 
      window.innerHeight / 2, 
      window.innerHeight / -2, 
      -5000, 
      5000 
    );
    camera.position.set(30, 30, 30);
    camera.updateProjectionMatrix();
    camera.lookAt(scene.position);

    const cubeSize = 80;
    const geometry = new window.THREE.BoxGeometry(1, cubeSize * 4, 1);
    
    const uniforms = {
      time: { value: 1.0 },
      opacity: { value: 0.0 }
    };

    const fragmentShader = `
      uniform float time;
      uniform float opacity;
      varying vec2 vUv;
      void main( void ) {
        vec2 position = - 0.0 + 3.0 * vUv;
        float wave1 = abs( sin( position.x * position.y + time / 8.0 ) );
        float wave2 = abs( sin( position.x * position.y + time / 6.0 ) );
        float wave3 = abs( sin( position.x * position.y + time / 4.0 ) );
        
        float red = mix(0.7, 1.0, wave1) * wave2;
        float green = mix(0.2, 0.4, wave2) * wave3;
        float blue = mix(0.7, 0.9, wave3) * wave1;
        
        gl_FragColor = vec4( red, green, blue, opacity );
      }
    `;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const material = new window.THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true
    });

    const meshes: THREE.Mesh[] = [];
    for (let i = 0; i < 2000; i++) {
      const mesh = new window.THREE.Mesh(geometry, material);
      mesh.position.z = i * 4 - cubeSize * 50;
      mesh.rotation.z = i * 0.01;
      scene.add(mesh);
      meshes.push(mesh);
    }

    const renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    container.appendChild(renderer.domElement);
    
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Start fade-in animation
    const fadeInDuration = 200; // 0.2 seconds - very quick
    const startTime = Date.now();
    
    const fadeIn = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / fadeInDuration, 1);
      // Use linear progression for fastest reveal
      const opacity = progress * 0.8; // Max opacity of 0.8 for the shader
      setAnimationOpacity(opacity);
      uniforms.opacity.value = opacity;
      
      if (progress < 1) {
        requestAnimationFrame(fadeIn);
      }
    };
    
    requestAnimationFrame(fadeIn);

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      uniforms.time.value += delta * 2;
      
      camera.rotation.x += delta * 0.05;
      camera.rotation.z += delta * 0.05;
      
      meshes.forEach((object, i) => {
        object.rotation.x += 0.02;
        object.rotation.z += 0.02;
        object.rotation.y += delta * 0.4 * (i % 2 ? 1 : -1);
      });
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.left = window.innerWidth / -2;
      camera.right = window.innerWidth / 2;
      camera.top = window.innerHeight / 2;
      camera.bottom = window.innerHeight / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  // Handle hash navigation for expertise section
  useEffect(() => {
    const handleHashNavigation = () => {
      if (window.location.hash === '#expertise-section') {
        const expertiseSection = document.getElementById('expertise-section');
        if (expertiseSection) {
          setTimeout(() => {
            expertiseSection.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Check for hash on component mount
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  // Initialize Three.js background
  useEffect(() => {

    // Check if Three.js is already loaded
    if (window.THREE) {
      initShaderBackground();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      initShaderBackground();
    };
    document.head.appendChild(script);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('product-features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleAIDevelopmentClick = () => {
    router.push('/product_development');
  };

  const handleAITrainingClick = () => {
    router.push('/AI_Training');
  };

  const handleDataAnnotationClick = () => {
    router.push('/Data_Annotation');
  };

  const handleTermsConditionsClick = () => {
    router.push('/Terms-and-conditions');
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  const productFeatures = [
    {
      icon: <Mail className="w-12 h-12" />,
      title: "Email Analysis",
      description: "Automatically categorize and prioritize emails to streamline customer support"
    },
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: "Chat Insights",
      description: "Extract key insights from chat conversations to enhance customer engagement"
    },
    {
      icon: <Ticket className="w-12 h-12" />,
      title: "Ticket Management",
      description: "Smart ticket classification for faster resolution and better resource allocation"
    },
    {
      icon: <Phone className="w-12 h-12" />,
      title: "Voice Transcript",
      description: "Convert and analyze voice conversations to understand customer sentiment and needs"
    },
    {
      icon: <Share2 className="w-12 h-12" />,
      title: "Social Media",
      description: "Monitor and analyze social media interactions to track brand sentiment and trends"
    }
  ];


  const serviceCards = [
    {
      id: 1,
      title: "AI WORKFORCE ENABLEMENT",
      subtitle: "Build AI-Confident Organizations from Ground Up",
      description: "Transform every level of your organization with our proven three-tier methodology: AI Literacy (Foundation) → AI Champions (Intermediate) → AI Strategy Partners (Leadership). Our banking-focused curriculum delivers measurable results in weeks, not months.",
      features: [
        "3-tier training pyramid (Foundation → Champions → Strategy Partners)",
        "Banking-specific use cases and curriculum",
        "Hands-on learning with no-code AI tools",
        "100%+ knowledge improvement guaranteed"
      ],
      buttonText: "DISCOVER AI TRAINING",
      icon: <Brain className="w-6 h-6" />,
      gradient: "from-purple-500/20 to-pink-500/20",
      onClick: handleAITrainingClick
    },
    {
      id: 2,
      title: "AI STRATEGY CONSULTING",
      subtitle: "Navigate Your AI Journey with Expert Guidance",
      description: "Chart your path to AI transformation with strategic precision. Our senior AI consultants combine boardroom strategy with hands-on implementation experience to ensure your AI initiatives deliver measurable ROI from day one.",
      features: [
        "AI readiness assessment and maturity evaluation",
        "Strategic roadmap development with clear milestones",
        "Technology architecture and vendor selection guidance",
        "ROI optimization and performance measurement"
      ],
      buttonText: "GET AI ASSESSMENT",
      icon: <Target className="w-6 h-6" />,
      gradient: "from-blue-500/20 to-purple-500/20",
      onClick: handleContactClick
    },
    {
      id: 3,
      title: "AI DEVELOPMENT SERVICES",
      subtitle: "From Vision to Production-Ready AI Solutions",
      description: "Accelerate your innovation with custom AI solutions built by practitioners who understand both technology and business impact. Our experienced development team creates scalable, enterprise-grade AI systems.",
      features: [
        "Custom AI/ML model development and deployment",
        "Intelligent automation and agentic AI systems",
        "Enterprise-grade architecture and security",
        "MLOps and model lifecycle management"
      ],
      buttonText: "EXPLORE AI DEVELOPMENT",
      icon: <Settings className="w-6 h-6" />,
      gradient: "from-green-500/20 to-blue-500/20",
      onClick: handleAIDevelopmentClick
    },
    {
      id: 4,
      title: "AI-POWERED DATA ANNOTATION SERVICES",
      subtitle: "Transform Raw Data into AI-Ready Training Sets with Precision and Scale",
      description: "Accelerate your AI model development with expertly annotated datasets that deliver superior performance. Our advanced hybrid methodology combines cutting-edge AI automation with expert human validation, reducing annotation time by 40% while maintaining enterprise-grade accuracy for your machine learning initiatives.",
      features: [
        "40% Faster Turnaround - AI-first annotation with human precision",
        "99.5% Accuracy Standards - Enterprise-grade quality control protocols",
        "Scalable Solutions - From prototype datasets to production-scale annotation",
        "Global Expertise - Multi-industry annotation specialists"
      ],
      buttonText: "ACCELERATE AI TRAINING",
      icon: <Database className="w-6 h-6" />,
      gradient: "from-pink-500/20 to-orange-500/20",
      onClick: handleDataAnnotationClick
    }
  ];

  const expertiseCards = [
    {
      title: "Machine & Deep Learning",
      features: [
        "Advanced neural network architectures",
        "Computer vision and NLP applications",
        "Predictive analytics and forecasting"
      ]
    },
    {
      title: "Generative AI & LLMs",
      features: [
        "Custom fine-tuning and deployment",
        "RAG systems and knowledge bases",
        "Multimodal AI applications"
      ]
    },
    {
      title: "Agentic AI Systems",
      features: [
        "Autonomous decision-making frameworks",
        "Intelligent workflow automation",
        "Multi-agent system architectures"
      ]
    },
    {
      title: "Enterprise AI Architecture",
      features: [
        "Scalable cloud-native or on premises solutions",
        "ML Ops and model governance",
        "Security and compliance frameworks"
      ]
    },
    {
      title: "Industry-Specific AI",
      features: [
        "Financial services and fintech",
        "Healthcare and life sciences",
        "Manufacturing and supply chain"
      ]
    },
    {
      title: "AI Strategy & Governance",
      features: [
        "Ethical AI framework development",
        "Risk assessment and mitigation",
        "Change management and adoption"
      ]
    }
  ];

  const advantageCards = [
    {
      title: "Expert Network",
      features: [
        "Senior AI Experts and Specialists",
        "Combined 100+ years of AI experience",
        "Former leaders from top tech companies",
        "Continuous research and innovation focus"
      ]
    },
    {
      title: "Partnership Approach",
      features: [
        "Boutique consulting model",
        "White-glove service delivery",
        "Long-term strategic relationships",
        "Transparent communication and collaboration"
      ]
    },
    {
      title: "Proven Excellence",
      features: [
        "Battle-tested methodologies",
        "Enterprise-grade security standards",
        "Comprehensive quality assurance",
        "Risk-mitigation expertise"
      ]
    },
    {
      title: "Global Outreach",
      features: [
        "Multi-timezone support coverage",
        "Cultural understanding across regions",
        "Local compliance and regulatory knowledge",
        "Scalable delivery capabilities"
      ]
    }
  ];

  const innovationCards = [
    {
      title: "Next-Generation Product Development",
      description: "Advancing AI-powered product capabilities for technology leaders, implementing cutting-edge machine learning frameworks to accelerate time-to-market and create sustainable competitive advantages."
    },
    {
      title: "Enterprise AI Transformation",
      description: "Guiding Fortune 1000 organizations through comprehensive AI adoption, from strategic planning to workforce enablement, ensuring successful integration across business functions."
    },
    {
      title: "Strategic AI Implementation",
      description: "Partnering with industry pioneers to develop custom AI solutions that redefine operational efficiency, customer experience, and business model innovation."
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Extremely thorough the subjects were. The trainer was fantastic explaining complicated concepts in the most simple way",
      author: "EVP",
      position: "Executive Vice President",
      company: "Fortune 500 Company"
    },
    {
      id: 2,
      quote: "The program was very hands-on. Instead of just theory, it highlighted real time use cases and step-by-step practical experience",
      author: "SVP",
      position: "Senior Vice President",
      company: "Fortune 500 Company"
    },
    {
      id: 3,
      quote: "Very beneficial and really builds confidence in how AI and LLM can be used in day to day work",
      author: "VP",
      position: "Vice President",
      company: "Fortune 500 Company"
    },
    {
      id: 4,
      quote: "The AI training transformed our entire team's approach to technology. We now see AI as an enabler, not a threat.",
      author: "CTO",
      position: "Chief Technology Officer",
      company: "Leading Indian Bank"
    },
    {
      id: 5,
      quote: "YaaraLabs didn't just train us on AI tools - they taught us how to think strategically about AI implementation.",
      author: "Head of Digital",
      position: "Head of Digital Transformation",
      company: "Global Enterprise"
    }
  ];

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#010101' }}>
      {/* Three.js Shader Background - Limited to hero section */}
      <div className="banner absolute inset-0 flex flex-col items-center justify-center text-center z-0 overflow-hidden bg-black" style={{ height: '100vh' }}>
        <div 
          ref={containerRef}
          className="absolute inset-0 w-full h-full bg-black transition-opacity duration-1000"
          style={{ 
            height: '100vh',
            opacity: animationOpacity
          }}
        />
        {/* Clean black overlay to cover animation cutoff */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none black-overlay"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.9) 90%, rgba(0,0,0,1) 100%)'
          }}
        />
      </div>

      {/* Enhanced Navigation Bar */}
      <EnhancedHeader transparent={true} isLoggedIn={false} onLoginClick={handleLoginClick} />

      {/* Enhanced Hero Section */}
      <EnhancedHeroSection onScrollToFeatures={scrollToFeatures} />

      {/* Main Content */}
      <div className="relative z-30 bg-black main-content">
        {/* Problem Statement Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <QuickReveal direction="up" delay={0} duration={0.6}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  70% of AI Implementation Failures Are People Problems, Not Technology Issues
                </h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Your teams need AI fluency to unlock the value of your AI investments
                </p>
              </div>
            </QuickReveal>

            <div className="grid md:grid-cols-3 gap-8">
              <QuickReveal direction="up" delay={100} duration={0.5}>
                <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-8 border border-purple-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
                  <h3 className="text-2xl font-bold text-white mb-4">Skills Gap Crisis</h3>
                  <div className="space-y-3 text-gray-200">
                    <p className="text-lg font-semibold">78% of banking professionals lack AI literacy</p>
                    <p className="text-lg font-semibold">60% of executives estimate workforce needs AI reskilling</p>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">Source: BCG 2025, McKinsey studies</p>
                </div>
              </QuickReveal>

              <QuickReveal direction="up" delay={200} duration={0.5}>
                <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-8 border border-purple-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
                  <h3 className="text-2xl font-bold text-white mb-4">Implementation Challenges</h3>
                  <div className="space-y-3 text-gray-200">
                    <p className="text-lg font-semibold">Teams struggle to evaluate AI solutions</p>
                    <p className="text-lg font-semibold">ROI prioritization and use cases get lost</p>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">Source: IBM AI Implementation Report</p>
                </div>
              </QuickReveal>

              <QuickReveal direction="up" delay={300} duration={0.5}>
                <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-8 border border-purple-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
                  <h3 className="text-2xl font-bold text-white mb-4">Workforce Anxiety</h3>
                  <div className="space-y-3 text-gray-200">
                    <p className="text-lg font-semibold">61% fear job displacement by AI</p>
                    <p className="text-lg font-semibold">Resistance to adopting AI solutions</p>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">Source: McKinsey Global AI Survey</p>
                </div>
              </QuickReveal>
            </div>
          </div>
        </section>

        {/* Proof Section */}
        <section id="product-features" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Proven Results with Global Enterprises</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Our clients achieve measurable transformation through systematic AI workforce development
              </p>
            </div>

            {/* Featured Case Study - Top Indian Bank */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 mb-16">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">Enterprise Transformation Case Study</h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Transformed 200+ enterprise professionals into AI champions through our three-tier methodology, delivering measurable business impact and organizational confidence.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <EnhancedMetricBox
                      value="+102%"
                      label="AI Knowledge Improvement"
                      delay={0}
                      icon={<TrendingUp className="w-6 h-6" />}
                      gradient="from-purple-500 to-pink-500"
                      isAnimated={false}
                    />
                    <EnhancedMetricBox
                      value="12+"
                      label="Use Cases Identified"
                      delay={100}
                      icon={<Target className="w-6 h-6" />}
                      gradient="from-blue-500 to-purple-500"
                      isAnimated={false}
                    />
                    <EnhancedMetricBox
                      value="$40M+"
                      label="Business Impact"
                      delay={200}
                      icon={<Award className="w-6 h-6" />}
                      gradient="from-green-500 to-blue-500"
                      isAnimated={false}
                    />
                    <EnhancedMetricBox
                      value="100%"
                      label="Participant Improvement"
                      delay={300}
                      icon={<Users className="w-6 h-6" />}
                      gradient="from-pink-500 to-orange-500"
                      isAnimated={false}
                    />
                  </div>

                  <button 
                    onClick={handleContactClick}
                    className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    style={{ backgroundColor: '#b90abd', color: '#ffffff' }}
                  >
                    See Our Training Impact
                  </button>
                </div>

                <div className="space-y-6">
                  <TestimonialsSlider 
                    testimonials={testimonials}
                    autoPlay={true}
                    autoPlayInterval={4000}
                  />
                </div>
              </div>
            </div>

            {/* Trust Bar */}
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-6">Trusted by Fortune 500 Companies and Global Enterprises</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="text-gray-500 font-semibold">Top Indian Bank</div>
                <div className="w-px h-6 bg-gray-600"></div>
                <div className="text-gray-500 font-semibold">Standard Chartered</div>
                <div className="w-px h-6 bg-gray-600"></div>
                <div className="text-gray-500 font-semibold">Visa</div>
              </div>
            </div>

          </div>
        </section>

        {/* Enhanced Service Cards Section */}
        <section className="pt-0 pb-20 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <QuickReveal direction="up" delay={0} duration={0.6}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our AI Solutions</h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Comprehensive AI services designed to transform your business from strategy to implementation
                </p>
              </div>
            </QuickReveal>
            
            <div className="grid md:grid-cols-2 gap-8">
              {serviceCards.map((service, index) => (
                <EnhancedServiceCard
                  key={service.id}
                  title={service.title}
                  subtitle={service.subtitle}
                  description={service.description}
                  features={service.features}
                  buttonText={service.buttonText}
                  delay={index * 100}
                  onClick={service.onClick}
                  icon={service.icon}
                  gradient={service.gradient}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Deep AI Expertise Section */}
        <section id="expertise-section" className="py-20 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Deep AI Expertise Across Domains</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Decades of experience from successful enterprise AI implementations
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {expertiseCards.map((expertise, index) => (
                <ExpertiseCard
                  key={index}
                  title={expertise.title}
                  features={expertise.features}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why YaaraLabs Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">AI Practitioners, Not Educators</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Real-world results from a team that builds AI systems, not just teaches about them
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">Industry Leadership</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#b90abd' }}></div>
                    <div>
                      <p className="font-semibold text-white">Ranjith Melarkode - 26+ years AI/Digital experience</p>
                      <p className="text-sm">Ex-CTO/SVP with production AI at scale</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#b90abd' }}></div>
                    <div>
                      <p className="font-semibold text-white">160M+ users (PVR Inox)</p>
                      <p className="text-sm">Production AI systems at enterprise scale</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#b90abd' }}></div>
                    <div>
                      <p className="font-semibold text-white">$18M+ verified ROI</p>
                      <p className="text-sm">Proven AI revenue generation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">TheNeural.ai Network</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#b90abd' }}></div>
                    <div>
                      <p className="font-semibold text-white">India's premier AI implementation community</p>
                      <p className="text-sm">Connecting practitioners, not theorists</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#b90abd' }}></div>
                    <div>
                      <p className="font-semibold text-white">200+ Years combined experience</p>
                      <p className="text-sm">CTO/CPO network across industries</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#b90abd' }}></div>
                    <div>
                      <p className="font-semibold text-white">Practitioner Network</p>
                      <p className="text-sm">Building India's AI implementation ecosystem</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">Adult Learning Excellence</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#b90abd' }}></div>
                    <div>
                      <p className="font-semibold text-white">Competency-based design</p>
                      <p className="text-sm">Practical industry playbooks and frameworks</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#b90abd' }}></div>
                    <div>
                      <p className="font-semibold text-white">Hands-on methodology</p>
                      <p className="text-sm">No-code AI tools for immediate application</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#b90abd' }}></div>
                    <div>
                      <p className="font-semibold text-white">Measurable outcomes</p>
                      <p className="text-sm">Tracked across 8 AI knowledge areas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Footer */}
        <Footer />
      </div>

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
};

export default HomePage;