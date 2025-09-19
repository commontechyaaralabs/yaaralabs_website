"use client";

import React, { useEffect, useRef } from 'react';
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


const HomePage: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number>(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showTransition, setShowTransition] = React.useState(false);
  const [pageLoadStartTime] = React.useState(Date.now());

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
      time: { value: 1.0 }
    };

    const fragmentShader = `
      uniform float time;
      varying vec2 vUv;
      void main( void ) {
        vec2 position = - 0.0 + 3.0 * vUv;
        float wave1 = abs( sin( position.x * position.y + time / 8.0 ) );
        float wave2 = abs( sin( position.x * position.y + time / 6.0 ) );
        float wave3 = abs( sin( position.x * position.y + time / 4.0 ) );
        
        float red = mix(0.7, 1.0, wave1) * wave2;
        float green = mix(0.2, 0.4, wave2) * wave3;
        float blue = mix(0.7, 0.9, wave3) * wave1;
        
        gl_FragColor = vec4( red, green, blue, 0.8 );
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

    const renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    container.appendChild(renderer.domElement);
    
    sceneRef.current = scene;
    rendererRef.current = renderer;

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
    
    // Check if page loading took longer than 500ms (indicating slow connection)
    const loadTime = Date.now() - pageLoadStartTime;
    const shouldShowLoading = loadTime > 500;
    
    if (shouldShowLoading) {
      setIsLoading(true);
      // Start transition after loading is complete
      const timer = setTimeout(() => {
        setShowTransition(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Transition duration
      }, 800); // Initial loading time
      
      return () => clearTimeout(timer);
    }
  }, [session, status, router, pageLoadStartTime]);

  // Initialize Three.js background for non-authenticated users
  useEffect(() => {
    if (session) return; // Don't run if user is authenticated
    if (isLoading) return; // Don't run while loading

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
  }, [session, isLoading]);

  // Show loading state while checking authentication
  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative">
        <div className="text-center">
          <div className={`w-24 h-24 relative mb-4 mx-auto transition-all duration-1000 ${
            showTransition ? 'opacity-30 scale-75' : 'opacity-60'
          }`}>
            <Image
              src="/yaaralogo-circle.png"
              alt="YAARA Logo"
              fill
              className="object-contain"
              priority
            />
            {/* Moving gradient overlay */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/30 to-transparent animate-gradient-move"></div>
            </div>
          </div>
          <p className={`text-gray-400 transition-opacity duration-500 ${
            showTransition ? 'opacity-0' : 'opacity-100'
          }`}>Loading...</p>
        </div>
      </div>
    );
  }

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

  const businessBenefits = [
    { icon: <Database className="w-6 h-6" />, title: "Cross-Channel Intelligence", description: "Unified analysis across email, chat, ticket, voice, and social media data" },
    { icon: <Settings className="w-6 h-6" />, title: "Automated Categorization", description: "Efficient routing and prioritization of customer issues" },
    { icon: <TrendingUp className="w-6 h-6" />, title: "Trend Identification", description: "Early detection of emerging problems and opportunities" },
    { icon: <Brain className="w-6 h-6" />, title: "Knowledge Discovery", description: "Surface insights missed in manual review processes" },
    { icon: <Shield className="w-6 h-6" />, title: "Quality Assurance", description: "Human verification ensures reliable outputs" },
    { icon: <Zap className="w-6 h-6" />, title: "Scalable Processing", description: "Handle growing volumes of customer communications" }
  ];

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#010101' }}>
      {/* Three.js Shader Background */}
      <div className="banner fixed inset-0 flex flex-col items-center justify-center text-center z-0 overflow-hidden bg-black" style={{ minHeight: '100vh' }}>
        <div 
          ref={containerRef}
          className="absolute inset-0 w-full h-full bg-black"
          style={{ minHeight: '100vh' }}
        />
      </div>

      {/* Navigation Bar - Public version without sidebar */}
      <Header 
        transparent={true} 
        isLoggedIn={false} 
        onLoginClick={handleLoginClick}
        className={`transition-all duration-1000 ${
          showTransition || !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      />

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
      <div className="relative z-30 bg-black">
        {/* Product Features */}
        <section id="product-features" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Use Our Platform?</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                We don't just build AI systems—we build AI-ready organizations. Proven methodology delivering 100%+ knowledge improvement and measurable business impact for global enterprises.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
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

        {/* Business Value Propositions */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Business Value Propositions</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                This system delivers comprehensive business benefits through sophisticated automated analysis 
                with human oversight for quality control and actionable insights
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businessBenefits.map((benefit, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300">
                  <div className="text-pink-400 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 px-4 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your AI Journey Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              See how Clariverse can transform your customer communications and drive business success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300">
                Schedule a Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
                Explore Case Studies
              </button>
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