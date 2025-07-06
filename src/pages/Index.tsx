import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Twitter, Linkedin, Facebook, Star, CheckCircle, Users, Zap, Settings, ArrowRight, Bot, Workflow, FileText, Play, ChevronDown } from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.4, 0, 0.2, 1] as const
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: [0.4, 0, 0.6, 1] as const
  }
};

const pulseGlow = {
  boxShadow: [
    "0 0 20px rgba(0, 51, 102, 0.1)",
    "0 0 40px rgba(0, 51, 102, 0.2)",
    "0 0 20px rgba(0, 51, 102, 0.1)"
  ],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: [0.4, 0, 0.6, 1] as const
  }
};

// Background animation variants
const backgroundFloat = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1] as const
    }
  }
};

const gradientShift = {
  animate: {
    background: [
      "linear-gradient(135deg, rgba(0, 51, 102, 0.1) 0%, rgba(102, 204, 153, 0.1) 50%, rgba(0, 51, 102, 0.05) 100%)",
      "linear-gradient(135deg, rgba(102, 204, 153, 0.1) 0%, rgba(0, 51, 102, 0.1) 50%, rgba(102, 204, 153, 0.05) 100%)",
      "linear-gradient(135deg, rgba(0, 51, 102, 0.1) 0%, rgba(102, 204, 153, 0.1) 50%, rgba(0, 51, 102, 0.05) 100%)"
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1] as const
    }
  }
};

// Large blur card background animation
const blurCardAnimation = {
  animate: {
    background: [
      "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)",
      "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.05) 100%)",
      "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)"
    ],
    y: [0, -10, 0],
    scale: [1, 1.005, 1],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1] as const
    }
  }
};

// Reusable animated section component
const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -30]);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    setContactForm({ name: "", email: "", message: "" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Bot className="h-8 w-8 text-sopfuel-blue" />,
      title: "AI-Powered Generation",
      description: "Create comprehensive SOPs instantly with advanced AI that understands your business processes and industry requirements."
    },
    {
      icon: <Workflow className="h-8 w-8 text-sopfuel-blue" />,
      title: "Visual Workflow Builder",
      description: "Design and visualize your processes with our intuitive drag-and-drop workflow builder and real-time collaboration tools."
    },
    {
      icon: <Users className="h-8 w-8 text-sopfuel-blue" />,
      title: "Team Collaboration",
      description: "Share, review, and iterate on SOPs with your team in real-time with version control and role-based permissions."
    },
    {
      icon: <FileText className="h-8 w-8 text-sopfuel-blue" />,
      title: "Smart Templates",
      description: "Access industry-specific templates that adapt to your needs, with customizable formats and automated compliance checks."
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "$9",
      period: "/month",
      features: ["5 SOPs per month", "Basic AI templates", "Email support", "PDF export", "Team sharing"],
      popular: false,
      cta: "Start Basic"
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      features: ["Unlimited SOPs", "Advanced AI generation", "Workflow visualization", "Priority support", "Team collaboration", "Custom branding"],
      popular: true,
      cta: "Start Pro"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Everything in Pro", "Custom integrations", "Dedicated support", "Advanced analytics", "SSO & compliance", "Custom training"],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Operations Director",
      company: "TechFlow",
      content: "Sopfuel transformed how we document processes. What used to take weeks now takes hours. The AI understands our workflows perfectly.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "COO",
      company: "StreamlineHQ",
      content: "The workflow visualization feature is game-changing. Our team can finally see the complete picture of our operations.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Quality Manager",
      company: "Precision Co",
      content: "Implementation was seamless, and the results were immediate. Our process documentation is now consistent and professional.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const stats = [
    { value: "10,000+", label: "SOPs Created" },
    { value: "500+", label: "Companies" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative" style={{ scrollBehavior: 'smooth' }}>
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Main animated gradient background */}
        <motion.div 
          className="absolute inset-0"
          variants={gradientShift}
          animate="animate"
          style={{
            background: "linear-gradient(135deg, rgba(0, 51, 102, 0.08) 0%, rgba(102, 204, 153, 0.08) 50%, rgba(0, 51, 102, 0.04) 100%)"
          }}
        />
        
        {/* Floating gradient orbs */}
        <motion.div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(0, 51, 102, 0.15) 0%, rgba(0, 51, 102, 0.05) 50%, transparent 100%)",
            filter: "blur(40px)"
          }}
          variants={backgroundFloat}
          animate="animate"
        />
        
        <motion.div 
          className="absolute top-1/4 -right-40 w-80 h-80 rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(102, 204, 153, 0.15) 0%, rgba(102, 204, 153, 0.05) 50%, transparent 100%)",
            filter: "blur(60px)"
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
            scale: [1, 1.1, 1],
            transition: {
              duration: 12,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1] as const
            }
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 -left-60 w-72 h-72 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(0, 51, 102, 0.2) 0%, rgba(102, 204, 153, 0.1) 50%, transparent 100%)",
            filter: "blur(50px)"
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 0.9, 1],
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1] as const
            }
          }}
        />
        
        {/* Premium Large Glassmorphism Blur Card Background */}
        <motion.div 
          className="absolute top-20 left-4 right-4 bottom-20 mx-auto max-w-[95%] lg:max-w-[90%] xl:max-w-[85%] rounded-3xl backdrop-blur-3xl border border-white/20 shadow-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)",
            boxShadow: `
              0 32px 64px rgba(0, 0, 0, 0.05),
              0 16px 32px rgba(0, 0, 0, 0.04),
              0 8px 16px rgba(0, 0, 0, 0.03),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
          variants={blurCardAnimation}
          animate="animate"
        />
        
        {/* Glassmorphism elements */}
        <motion.div 
          className="absolute top-20 right-20 w-32 h-32 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
            transition: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
        
        <motion.div 
          className="absolute bottom-40 left-20 w-24 h-24 rounded-full backdrop-blur-xl bg-sopfuel-blue/5 border border-sopfuel-blue/10"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
            transition: {
              duration: 6,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1] as const
            }
          }}
        />
      </div>

      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* Fixed Navbar with backdrop blur */}
        <motion.header 
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
          className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100/50 z-50"
        >
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center space-x-3 group cursor-pointer" 
                onClick={() => scrollToSection('hero')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="w-10 h-10 bg-sopfuel-blue rounded-xl flex items-center justify-center"
                  animate={{
                    y: [-10, 10, -10],
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: [0.4, 0, 0.6, 1] as const
                    }
                  }}
                >
                  <Bot className="h-6 w-6 text-white" />
                </motion.div>
                <span className="text-2xl font-bold text-sopfuel-blue font-montserrat">
                  Sopfuel
                </span>
              </motion.div>
              
              <div className="hidden md:flex items-center space-x-8">
                {['features', 'pricing', 'testimonials', 'contact'].map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-sopfuel-dark hover:text-sopfuel-blue transition-all duration-300 font-open-sans relative group capitalize"
                    whileHover={{ y: -2 }}
                  >
                    {section}
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-sopfuel-blue group-hover:w-full transition-all duration-300"
                    />
                  </motion.button>
                ))}
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={handleGetStarted}
                    className="bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white rounded-xl px-6 py-2.5 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Free Trial
                  </Button>
                </motion.div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <motion.div 
                      className="w-6 h-6 flex flex-col justify-center items-center"
                      animate={isMenuOpen ? { rotate: 45 } : { rotate: 0 }}
                    >
                      <motion.span 
                        className="block w-5 h-0.5 bg-sopfuel-blue"
                        animate={isMenuOpen ? { rotate: 90, y: 0 } : { rotate: 0, y: -2 }}
                      />
                      <motion.span 
                        className="block w-5 h-0.5 bg-sopfuel-blue mt-1"
                        animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                      />
                      <motion.span 
                        className="block w-5 h-0.5 bg-sopfuel-blue mt-1"
                        animate={isMenuOpen ? { rotate: -90, y: 0 } : { rotate: 0, y: 2 }}
                      />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Mobile menu */}
            <motion.div 
              className="md:hidden overflow-hidden"
              initial={false}
              animate={isMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-4">
                {['features', 'pricing', 'testimonials', 'contact'].map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => { scrollToSection(section); setIsMenuOpen(false); }}
                    className="block text-sopfuel-dark hover:text-sopfuel-blue transition-colors duration-300 font-open-sans capitalize"
                    whileHover={{ x: 10 }}
                  >
                    {section}
                  </motion.button>
                ))}
                <Button onClick={handleGetStarted} className="w-full bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white rounded-xl">
                  Start Free Trial
                </Button>
              </div>
            </motion.div>
          </nav>
        </motion.header>

        {/* Hero Section */}
        <section id="hero" className="pt-32 pb-20 relative overflow-hidden">
          {/* Hero glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/70 backdrop-blur-sm" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div 
                  variants={fadeInUp}
                  className="inline-flex items-center px-4 py-2 bg-sopfuel-blue/10 backdrop-blur-sm rounded-full mb-6 border border-sopfuel-blue/20"
                  animate={pulseGlow}
                >
                  <Zap className="h-4 w-4 text-sopfuel-blue mr-2" />
                  <span className="text-sm font-medium text-sopfuel-blue">AI-Powered SOP Generation</span>
                </motion.div>
                
                <motion.h1 
                  variants={fadeInUp}
                  className="text-5xl lg:text-7xl font-bold text-sopfuel-blue mb-6 leading-tight font-montserrat"
                >
                  <motion.span 
                    className="inline-block"
                    animate={{ 
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{
                      background: "linear-gradient(45deg, #003366, #66CC99, #003366)",
                      backgroundSize: "200% 200%",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent"
                    }}
                  >
                    Sopfuel:
                  </motion.span>
                  <br />
                  <span className="inline-block">Your AI-Powered</span>
                  <br />
                  <span className="inline-block">SOP Generator</span>
                </motion.h1>
                
                <motion.p 
                  variants={fadeInUp}
                  className="text-xl lg:text-2xl text-sopfuel-dark/80 mb-6 leading-relaxed font-open-sans"
                >
                  Streamline Your Processes with Intelligent SOP Creation
                </motion.p>
                
                <motion.p 
                  variants={fadeInUp}
                  className="text-lg text-sopfuel-dark/70 mb-10 font-open-sans"
                >
                  Transform your business workflows into clear, actionable Standard Operating Procedures in minutes with AI.
                </motion.p>
                
                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg"
                      onClick={handleGetStarted}
                      className="bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white text-lg px-8 py-4 rounded-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    >
                      Start Your Free Trial
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-sopfuel-blue text-sopfuel-blue hover:bg-sopfuel-blue hover:text-white text-lg px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 group backdrop-blur-sm bg-white/50"
                    >
                      <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      Watch Demo
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Stats row */}
                <motion.div 
                  variants={staggerContainer}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {stats.map((stat, index) => (
                    <motion.div 
                      key={index} 
                      variants={fadeInUp}
                      className="text-center backdrop-blur-sm bg-white/30 rounded-lg p-3 border border-white/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div 
                        className="text-2xl font-bold text-sopfuel-blue font-montserrat"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-sopfuel-dark/70 font-open-sans">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="relative"
                style={{ y: y1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20"
                  animate={floatingAnimation}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop" 
                    alt="AI-powered workflow visualization"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Floating elements */}
                  <motion.div 
                    className="absolute -top-4 -left-4 bg-white/80 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/30"
                    animate={{ 
                      y: [-5, 5, -5],
                      rotate: [-2, 2, -2]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Bot className="h-6 w-6 text-sopfuel-blue" />
                  </motion.div>
                  <motion.div 
                    className="absolute -bottom-4 -right-4 bg-sopfuel-green/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-sopfuel-green/30"
                    animate={{ 
                      y: [5, -5, 5],
                      rotate: [2, -2, 2]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Zap className="h-6 w-6 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div 
              className="flex justify-center mt-16"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.button 
                onClick={() => scrollToSection('features')} 
                className="text-sopfuel-blue hover:text-sopfuel-green transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <ChevronDown className="h-8 w-8" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative">
          {/* Section glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/60 backdrop-blur-sm" />
          
          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <motion.h2 
                className="text-4xl lg:text-5xl font-bold text-sopfuel-blue mb-6 font-montserrat"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                Key Features
              </motion.h2>
              <motion.p 
                className="text-xl text-sopfuel-dark/70 max-w-3xl mx-auto font-open-sans"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Everything you need to create, manage, and optimize your Standard Operating Procedures
              </motion.p>
            </AnimatedSection>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl group h-full bg-white/60 backdrop-blur-md border border-white/20">
                    <CardHeader className="text-center pb-4">
                      <motion.div 
                        className="flex justify-center mb-4"
                        animate={floatingAnimation}
                      >
                        <motion.div 
                          className="p-4 bg-sopfuel-blue/10 backdrop-blur-sm rounded-2xl group-hover:bg-sopfuel-blue/20 transition-all duration-300 border border-sopfuel-blue/20"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        >
                          {feature.icon}
                        </motion.div>
                      </motion.div>
                      <CardTitle className="text-xl text-sopfuel-blue font-montserrat group-hover:text-sopfuel-green transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sopfuel-dark/70 font-open-sans leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 relative">
          {/* Section glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-sopfuel-gray/20 via-sopfuel-blue/5 to-sopfuel-gray/20 backdrop-blur-sm" />
          
          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-sopfuel-blue mb-6 font-montserrat">
                Pricing Plans
              </h2>
              <p className="text-xl text-sopfuel-dark/70 max-w-3xl mx-auto font-open-sans">
                Choose the perfect plan for your team size and requirements
              </p>
            </AnimatedSection>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: plan.popular ? 1.02 : 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`relative shadow-xl transition-all duration-500 rounded-2xl border-0 group ${
                    plan.popular 
                      ? 'ring-2 ring-sopfuel-green shadow-2xl scale-105' 
                      : 'shadow-lg hover:shadow-2xl'
                  }`}>
                    {plan.popular && (
                      <motion.div 
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="bg-sopfuel-green text-white px-6 py-2 rounded-full text-sm font-medium font-open-sans shadow-lg">
                          Most Popular
                        </span>
                      </motion.div>
                    )}
                    <CardHeader className="text-center pb-8">
                      <CardTitle className="text-2xl text-sopfuel-blue font-montserrat mb-4 group-hover:text-sopfuel-green transition-colors duration-300">
                        {plan.name}
                      </CardTitle>
                      <motion.div 
                        className="mb-6"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-5xl font-bold text-sopfuel-blue">{plan.price}</span>
                        <span className="text-sopfuel-dark/70 font-open-sans">{plan.period}</span>
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li 
                            key={featureIndex} 
                            className="flex items-start text-sopfuel-dark font-open-sans"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <CheckCircle className="h-5 w-5 text-sopfuel-green mr-3 flex-shrink-0 mt-0.5" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          className={`w-full rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 ${
                            plan.popular 
                              ? 'bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white' 
                              : 'bg-sopfuel-green hover:bg-sopfuel-green/90 text-white'
                          }`}
                          onClick={handleGetStarted}
                        >
                          {plan.cta}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 relative">
          {/* Section glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/70 backdrop-blur-sm" />
          
          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-sopfuel-blue mb-6 font-montserrat">
                What Our Users Say
              </h2>
              <p className="text-xl text-sopfuel-dark/70 max-w-3xl mx-auto font-open-sans">
                Join thousands of teams who've transformed their operations with Sopfuel
              </p>
            </AnimatedSection>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, rotateY: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl group h-full bg-white/60 backdrop-blur-md border border-white/20">
                    <CardContent className="pt-8">
                      <motion.div 
                        className="flex mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {[...Array(5)].map((_, starIndex) => (
                          <motion.div
                            key={starIndex}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: starIndex * 0.1 }}
                          >
                            <Star className="h-5 w-5 text-sopfuel-green fill-current" />
                          </motion.div>
                        ))}
                      </motion.div>
                      <p className="text-sopfuel-dark mb-8 italic font-open-sans leading-relaxed text-lg group-hover:text-sopfuel-blue/80 transition-colors duration-300">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center">
                        <motion.img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full mr-4 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div>
                          <p className="font-semibold text-sopfuel-blue font-montserrat group-hover:text-sopfuel-green transition-colors duration-300">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-sopfuel-dark/70 font-open-sans">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative">
          {/* Section glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-sopfuel-gray/20 via-sopfuel-green/5 to-sopfuel-gray/20 backdrop-blur-sm" />
          
          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-sopfuel-blue mb-6 font-montserrat">
                Contact Us
              </h2>
              <p className="text-xl text-sopfuel-dark/70 max-w-3xl mx-auto font-open-sans">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </AnimatedSection>
            
            <div className="max-w-2xl mx-auto">
              <AnimatedSection>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card className="border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-500 bg-white/60 backdrop-blur-md border border-white/20">
                    <CardContent className="p-8">
                      <form onSubmit={handleContactSubmit} className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <Label htmlFor="contact-name" className="text-sopfuel-dark font-open-sans font-medium">Name</Label>
                          <Input
                            id="contact-name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            className="border-gray-200 rounded-xl mt-2 py-3 font-open-sans transition-all duration-300 focus:scale-105 focus:border-sopfuel-blue"
                            required
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <Label htmlFor="contact-email" className="text-sopfuel-dark font-open-sans font-medium">Email</Label>
                          <Input
                            id="contact-email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            className="border-gray-200 rounded-xl mt-2 py-3 font-open-sans transition-all duration-300 focus:scale-105 focus:border-sopfuel-blue"
                            required
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <Label htmlFor="contact-message" className="text-sopfuel-dark font-open-sans font-medium">Message</Label>
                          <Textarea
                            id="contact-message"
                            value={contactForm.message}
                            onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                            className="border-gray-200 rounded-xl min-h-[150px] mt-2 py-3 font-open-sans transition-all duration-300 focus:scale-105 focus:border-sopfuel-blue"
                            required
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            type="submit" 
                            className="w-full bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white rounded-xl py-4 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            Send Message
                          </Button>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
              
              {/* Social Media Links */}
              <AnimatedSection className="text-center mt-12">
                <p className="text-sopfuel-dark/70 mb-8 font-open-sans text-lg">
                  Connect with us on social media
                </p>
                <div className="flex justify-center space-x-8">
                  {[
                    { icon: Linkedin, href: "https://linkedin.com/company/sopfuel", label: "LinkedIn" },
                    { icon: Twitter, href: "https://twitter.com/sopfuel", label: "Twitter" },
                    { icon: Facebook, href: "https://facebook.com/sopfuel", label: "Facebook" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sopfuel-blue hover:text-sopfuel-green transition-all duration-300"
                      aria-label={`Follow us on ${social.label}`}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <social.icon className="h-8 w-8" />
                    </motion.a>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-sopfuel-blue/95 backdrop-blur-md text-white py-16 relative border-t border-sopfuel-blue/20">
          <div className="container mx-auto px-6">
            <motion.div 
              className="grid md:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp} className="md:col-span-2">
                <motion.div 
                  className="flex items-center mb-6 group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3"
                    animate={floatingAnimation}
                  >
                    <Bot className="h-6 w-6 text-sopfuel-blue" />
                  </motion.div>
                  <span className="text-2xl font-bold font-montserrat group-hover:text-sopfuel-green transition-colors duration-300">
                    Sopfuel
                  </span>
                </motion.div>
                <p className="text-gray-300 font-open-sans leading-relaxed max-w-md">
                  Streamline your processes with intelligent SOP creation powered by AI. Transform your business workflows into clear, actionable procedures.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <h3 className="font-semibold mb-6 font-montserrat text-lg">Product</h3>
                <ul className="space-y-3 text-gray-300 font-open-sans">
                  {['Features', 'Pricing', 'Templates', 'API'].map((item, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button className="hover:text-white transition-colors duration-300">
                        {item}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <h3 className="font-semibold mb-6 font-montserrat text-lg">Support</h3>
                <ul className="space-y-3 text-gray-300 font-open-sans">
                  {['Help Center', 'Documentation', 'Contact', 'Privacy Policy'].map((item, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button className="hover:text-white transition-colors duration-300">
                        {item}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-open-sans">
                © {new Date().getFullYear()} Sopfuel. All rights reserved.
              </p>
            </motion.div>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Index;
