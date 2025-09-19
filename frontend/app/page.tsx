"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Brain, Mail, MessageSquare, Ticket, TrendingUp, ArrowRight, Database, Settings, Shield, Zap, Phone, Share2 } from 'lucide-react';
import {Header} from '@/components/Header/Header';
import * as THREE from 'three';
import './globals.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

declare global {
  interface Window {
    THREE: typeof THREE;
  }
}

interface MetricBoxProps {
  value: string;
  label: string;
  delay: number;
}

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  buttonText: string;
  delay: number;
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
      { threshold: 0.3 } // Trigger when 30% of the element is visible
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
    const duration = 1000; // 1 second
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;
    const increment = numericValue / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const currentValue = Math.min(increment * currentStep, numericValue);
      setAnimatedValue(Math.floor(currentValue) + suffix);

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedValue(value); // Ensure final value is exact
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <div 
      ref={boxRef}
      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-center border border-gray-700 hover:border-pink-500 transition-all duration-500 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="text-4xl md:text-5xl font-bold text-pink-400 mb-2 font-mono">
        {animatedValue}
      </div>
      <div className="text-lg text-gray-300 font-medium">
        {label}
      </div>
    </div>
  );
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, subtitle, description, features, buttonText, delay }) => {
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
        
        <button className="w-full bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2">
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
  const { data: session, status } = useSession();
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

  // Check authentication status and redirect if needed
  useEffect(() => {
    console.log("LandingPage: Status:", status, "Session:", !!session);
    
    if (status === "loading") return;
    
    // If user is authenticated, redirect to home page
    if (session) {
      console.log("LandingPage: Redirecting authenticated user to /home");
      router.replace('/home');
      return;
    }
  }, [session, status, router]);

  // Initialize Three.js background for non-authenticated users
  useEffect(() => {
    if (session) return; // Don't run if user is authenticated
    if (status === "loading") return; // Don't run while loading

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
  }, [session, status]);


  // If user is authenticated, don't render the landing page
  if (session) {
    return null;
  }

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('product-features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = () => {
    router.push('/login');
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
      title: "AI Product Development",
      subtitle: "Vision To Reality with Expert Engineering",
      description: "Transform breakthrough ideas into market-ready AI solutions. Our experienced AI teams leverage cutting-edge agentic, machine and deep learning frameworks to build scalable, enterprise-grade products to accelerate innovation cycles and create sustainable competitive advantages.",
      features: [
        "Custom AI/ML model development and deployment",
        "Intelligent automation and workflow optimization",
        "Agentic AI systems and autonomous decision-making"
      ],
      buttonText: "EXPLORE AI DEVELOPMENT"
    },
    {
      title: "Workforce AI Enablement",
      subtitle: "Building AI-Confident Organizations",
      description: "Our comprehensive training programs prepare everyone from executives to operations teams to harness AI effectively, ensuring your organization maximizes AI adoption and ROI.",
      features: [
        "Executive AI strategy and governance workshops",
        "Organization-wide AI literacy and adoption programs",
        "Business leader AI application masterclasses",
        "Technical team upskilling in AI/ML implementation"
      ],
      buttonText: "DISCOVER AI TRAINING"
    },
    {
      title: "AI Strategy Consulting",
      subtitle: "Navigate Your AI Journey with Expert Guidance",
      description: "Chart your path to AI transformation with strategic precision. Our senior AI consultants help you identify high-impact opportunities, develop implementation roadmaps, and ensure your AI initiatives deliver measurable business outcomes from day one.",
      features: [
        "AI readiness assessment and maturity evaluation",
        "Strategic roadmap development and prioritization",
        "Technology architecture design and vendor selection",
        "ROI optimization and performance measurement"
      ],
      buttonText: "GET AI ASSESSMENT"
    },
    {
      title: "AI-Powered Data Annotation Services",
      subtitle: "Transform Raw Data into AI-Ready Training Sets with Precision and Scale",
      description: "Accelerate your AI model development with expertly annotated datasets that deliver superior performance. Our advanced hybrid methodology combines cutting-edge AI automation with expert human validation, reducing annotation time by 40% while maintaining enterprise-grade accuracy for your machine learning initiatives.",
      features: [
        "40% Faster Turnaround - AI-first annotation with human precision",
        "99.5% Accuracy Standards - Enterprise-grade quality control protocols",
        "Scalable Solutions - From prototype datasets to production-scale annotation",
        "Global Expertise - Multi-industry annotation specialists"
      ],
      buttonText: "ACCELERATE AI TRAINING"
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

      {/* Navigation Bar - Public version without sidebar */}
      <Header transparent={true} isLoggedIn={false} onLoginClick={handleLoginClick} />

      {/* Hero Section */}
      <section className="relative z-30 h-screen flex items-center px-8">
        <div className="w-full transition-all duration-1000 opacity-100 translate-y-0">
          <div className="relative">
            <div className="mt-16">
              <h1 className="text-6xl md:text-8xl font-bold text-white text-left mb-8 font-br-firma tracking-tight" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                Transform Your Business with
                <span className="block">
                  AI Excellence
                </span>
              </h1>
            </div>
            
            <div className="flex justify-end">
              <p className="text-xl md:text-2xl text-white leading-tight text-right max-w-md font-br-firma" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                Strategy to Implementation,
                <br />
                AI solutions that drive real business
                <br />
                impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-30 bg-black main-content">
        {/* Product Features */}
        <section id="product-features" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Use Our Platform?</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                We don't just build AI systems—we build AI-ready organizations. Proven methodology delivering 100%+ knowledge improvement and measurable business impact for global enterprises.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-0">
              <MetricBox 
                value="+102%" 
                label="AI Knowledge Improvement" 
                delay={0}
              />
              <MetricBox 
                value="+$40M" 
                label="Business Impact" 
                delay={200}
              />
              <MetricBox 
                value="97%" 
                label="Satisfaction Rate" 
                delay={400}
              />
            </div>

          </div>
        </section>

        {/* Service Cards Section */}
        <section className="pt-0 pb-20 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {serviceCards.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  subtitle={service.subtitle}
                  description={service.description}
                  features={service.features}
                  buttonText={service.buttonText}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Deep AI Expertise Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Deep AI Expertise Across Domains</h2>
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

        {/* The YaaraLabs Advantage Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The YaaraLabs Advantage</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Why global leaders choose us as their trusted AI transformation partner
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {advantageCards.map((advantage, index) => (
                <AdvantageCard
                  key={index}
                  title={advantage.title}
                  features={advantage.features}
                  delay={index * 150}
                  isAlternate={index >= 2} // Bottom row gets alternate styling
                />
              ))}
            </div>
          </div>
        </section>

        {/* Driving AI Innovation Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Driving AI Innovation Across Global Enterprises</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Selective Engagements • High-Impact Focus • Innovation-Driven Results
              </p>
            </div>
            
            <div className="space-y-6">
              {innovationCards.map((innovation, index) => (
                <InnovationCard
                  key={index}
                  title={innovation.title}
                  description={innovation.description}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="py-12 px-4 bg-black border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <span className="text-white text-lg ml-2 font-semibold">Clariverse</span>
                </div>
                <p className="text-gray-400 max-w-md">Empowering businesses with AI-driven insights</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg">Contact</h4>
                <div className="space-y-3 text-gray-400">
                  <div>hello@yaaralabs.ai</div>
                </div>
              </div>
            </div>
                         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
               <p>© {new Date().getFullYear()} Clariverse. All rights reserved.</p>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;