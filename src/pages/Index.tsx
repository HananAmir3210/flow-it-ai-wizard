
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Twitter, Linkedin, Facebook, Star, CheckCircle, Users, Zap, Settings, ArrowRight, Bot, Workflow, FileText, Play, ChevronDown } from "lucide-react";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
      description: "Create comprehensive SOPs instantly with advanced AI that understands your business processes and industry requirements.",
      delay: "0ms"
    },
    {
      icon: <Workflow className="h-8 w-8 text-sopfuel-blue" />,
      title: "Visual Workflow Builder",
      description: "Design and visualize your processes with our intuitive drag-and-drop workflow builder and real-time collaboration tools.",
      delay: "200ms"
    },
    {
      icon: <Users className="h-8 w-8 text-sopfuel-blue" />,
      title: "Team Collaboration",
      description: "Share, review, and iterate on SOPs with your team in real-time with version control and role-based permissions.",
      delay: "400ms"
    },
    {
      icon: <FileText className="h-8 w-8 text-sopfuel-blue" />,
      title: "Smart Templates",
      description: "Access industry-specific templates that adapt to your needs, with customizable formats and automated compliance checks.",
      delay: "600ms"
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "$9",
      period: "/month",
      features: ["5 SOPs per month", "Basic AI templates", "Email support", "PDF export", "Team sharing"],
      popular: false,
      cta: "Start Basic",
      delay: "0ms"
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      features: ["Unlimited SOPs", "Advanced AI generation", "Workflow visualization", "Priority support", "Team collaboration", "Custom branding"],
      popular: true,
      cta: "Start Pro",
      delay: "200ms"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Everything in Pro", "Custom integrations", "Dedicated support", "Advanced analytics", "SSO & compliance", "Custom training"],
      popular: false,
      cta: "Contact Sales",
      delay: "400ms"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Operations Director",
      company: "TechFlow",
      content: "Sopfuel transformed how we document processes. What used to take weeks now takes hours. The AI understands our workflows perfectly.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      delay: "0ms"
    },
    {
      name: "Michael Chen",
      role: "COO",
      company: "StreamlineHQ",
      content: "The workflow visualization feature is game-changing. Our team can finally see the complete picture of our operations.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      delay: "200ms"
    },
    {
      name: "Emily Rodriguez",
      role: "Quality Manager",
      company: "Precision Co",
      content: "Implementation was seamless, and the results were immediate. Our process documentation is now consistent and professional.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      delay: "400ms"
    }
  ];

  const stats = [
    { value: "10,000+", label: "SOPs Created", delay: "0ms" },
    { value: "500+", label: "Companies", delay: "200ms" },
    { value: "99.9%", label: "Uptime", delay: "400ms" },
    { value: "24/7", label: "Support", delay: "600ms" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 transition-all duration-300">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="w-10 h-10 bg-sopfuel-blue rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-sopfuel-blue font-montserrat transition-colors duration-300 group-hover:text-sopfuel-green">
                Sopfuel
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-sopfuel-dark hover:text-sopfuel-blue transition-all duration-300 font-open-sans relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sopfuel-blue transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-sopfuel-dark hover:text-sopfuel-blue transition-all duration-300 font-open-sans relative group">
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sopfuel-blue transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-sopfuel-dark hover:text-sopfuel-blue transition-all duration-300 font-open-sans relative group">
                Testimonials
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sopfuel-blue transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-sopfuel-dark hover:text-sopfuel-blue transition-all duration-300 font-open-sans relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sopfuel-blue transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              <Button 
                onClick={handleGetStarted}
                className="bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white rounded-xl px-6 py-2.5 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
              >
                Start Free Trial
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="transition-transform duration-300 hover:scale-110"
              >
                <div className={`w-6 h-6 flex flex-col justify-center items-center transition-all duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}>
                  <span className={`block w-5 h-0.5 bg-sopfuel-blue transition-all duration-300 ${isMenuOpen ? 'rotate-90 translate-y-0' : '-translate-y-1'}`}></span>
                  <span className={`block w-5 h-0.5 bg-sopfuel-blue transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block w-5 h-0.5 bg-sopfuel-blue transition-all duration-300 ${isMenuOpen ? '-rotate-90 -translate-y-0' : 'translate-y-1'}`}></span>
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-4 space-y-4">
              <button onClick={() => { scrollToSection('features'); setIsMenuOpen(false); }} className="block text-sopfuel-dark hover:text-sopfuel-blue transition-colors duration-300 font-open-sans">Features</button>
              <button onClick={() => { scrollToSection('pricing'); setIsMenuOpen(false); }} className="block text-sopfuel-dark hover:text-sopfuel-blue transition-colors duration-300 font-open-sans">Pricing</button>
              <button onClick={() => { scrollToSection('testimonials'); setIsMenuOpen(false); }} className="block text-sopfuel-dark hover:text-sopfuel-blue transition-colors duration-300 font-open-sans">Testimonials</button>
              <button onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }} className="block text-sopfuel-dark hover:text-sopfuel-blue transition-colors duration-300 font-open-sans">Contact</button>
              <Button onClick={handleGetStarted} className="w-full bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white rounded-xl">
                Start Free Trial
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 bg-gradient-to-br from-white via-sopfuel-gray/20 to-sopfuel-blue/5 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-sopfuel-blue/5 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sopfuel-green/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 bg-sopfuel-blue/10 rounded-full mb-6 animate-bounce">
                <Zap className="h-4 w-4 text-sopfuel-blue mr-2" />
                <span className="text-sm font-medium text-sopfuel-blue">AI-Powered SOP Generation</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-sopfuel-blue mb-6 leading-tight font-montserrat">
                <span className="inline-block animate-fade-in" style={{ animationDelay: '0.2s' }}>Sopfuel:</span>
                <br />
                <span className="inline-block animate-fade-in bg-gradient-to-r from-sopfuel-blue to-sopfuel-green bg-clip-text text-transparent" style={{ animationDelay: '0.4s' }}>
                  Your AI-Powered
                </span>
                <br />
                <span className="inline-block animate-fade-in" style={{ animationDelay: '0.6s' }}>SOP Generator</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-sopfuel-dark/80 mb-6 leading-relaxed font-open-sans animate-fade-in" style={{ animationDelay: '0.8s' }}>
                Streamline Your Processes with Intelligent SOP Creation
              </p>
              
              <p className="text-lg text-sopfuel-dark/70 mb-10 font-open-sans animate-fade-in" style={{ animationDelay: '1s' }}>
                Transform your business workflows into clear, actionable Standard Operating Procedures in minutes with AI.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '1.2s' }}>
                <Button 
                  size="lg"
                  onClick={handleGetStarted}
                  className="bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white text-lg px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl transform group"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-sopfuel-blue text-sopfuel-blue hover:bg-sopfuel-blue hover:text-white text-lg px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 group"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '1.4s' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center animate-fade-in" style={{ animationDelay: stat.delay }}>
                    <div className="text-2xl font-bold text-sopfuel-blue font-montserrat">{stat.value}</div>
                    <div className="text-sm text-sopfuel-dark/70 font-open-sans">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-gradient-to-br from-sopfuel-blue/10 to-sopfuel-green/10 rounded-3xl p-8 backdrop-blur-sm transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop" 
                  alt="AI-powered workflow visualization"
                  className="w-full h-auto rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105"
                />
                
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl p-3 shadow-lg animate-bounce" style={{ animationDelay: '2s' }}>
                  <Bot className="h-6 w-6 text-sopfuel-blue" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-sopfuel-green rounded-xl p-3 shadow-lg animate-bounce" style={{ animationDelay: '3s' }}>
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-16 animate-bounce">
            <button onClick={() => scrollToSection('features')} className="text-sopfuel-blue hover:text-sopfuel-green transition-colors duration-300">
              <ChevronDown className="h-8 w-8" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-sopfuel-blue mb-6 font-montserrat animate-fade-in">
              Key Features
            </h2>
            <p className="text-xl text-sopfuel-dark/70 max-w-3xl mx-auto font-open-sans animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Everything you need to create, manage, and optimize your Standard Operating Procedures
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl group hover:-translate-y-4 animate-fade-in"
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-sopfuel-blue/5 rounded-2xl group-hover:bg-sopfuel-blue/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      {feature.icon}
                    </div>
                  </div>
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
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-sopfuel-gray/30 to-sopfuel-blue/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-sopfuel-blue mb-6 font-montserrat animate-fade-in">
              Pricing Plans
            </h2>
            <p className="text-xl text-sopfuel-dark/70 max-w-3xl mx-auto font-open-sans animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Choose the perfect plan for your team size and requirements
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative hover:shadow-2xl transition-all duration-500 rounded-2xl border-0 animate-fade-in group ${
                  plan.popular 
                    ? 'ring-2 ring-sopfuel-green shadow-xl scale-105 hover:scale-110' 
                    : 'shadow-lg hover:scale-105'
                }`}
                style={{ animationDelay: plan.delay }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-pulse">
                    <span className="bg-sopfuel-green text-white px-6 py-2 rounded-full text-sm font-medium font-open-sans">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl text-sopfuel-blue font-montserrat mb-4 group-hover:text-sopfuel-green transition-colors duration-300">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-sopfuel-blue group-hover:scale-110 transition-transform duration-300 inline-block">{plan.price}</span>
                    <span className="text-sopfuel-dark/70 font-open-sans">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sopfuel-dark font-open-sans group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${featureIndex * 50}ms` }}>
                        <CheckCircle className="h-5 w-5 text-sopfuel-green mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full rounded-xl py-3 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      plan.popular 
                        ? 'bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white' 
                        : 'bg-sopfuel-green hover:bg-sopfuel-green/90 text-white'
                    }`}
                    onClick={handleGetStarted}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-sopfuel-blue mb-6 font-montserrat animate-fade-in">
              What Our Users Say
            </h2>
            <p className="text-xl text-sopfuel-dark/70 max-w-3xl mx-auto font-open-sans animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Join thousands of teams who've transformed their operations with Sopfuel
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl group hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: testimonial.delay }}
              >
                <CardContent className="pt-8">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star 
                        key={starIndex} 
                        className="h-5 w-5 text-sopfuel-green fill-current group-hover:scale-110 transition-transform duration-300" 
                        style={{ transitionDelay: `${starIndex * 100}ms` }}
                      />
                    ))}
                  </div>
                  <p className="text-sopfuel-dark mb-8 italic font-open-sans leading-relaxed text-lg group-hover:text-sopfuel-blue/80 transition-colors duration-300">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full mr-4 object-cover transition-transform duration-300 group-hover:scale-110"
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
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-sopfuel-gray/30 to-sopfuel-green/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-sopfuel-blue mb-6 font-montserrat animate-fade-in">
              Contact Us
            </h2>
            <p className="text-xl text-sopfuel-dark/70 max-w-3xl mx-auto font-open-sans animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <Label htmlFor="contact-name" className="text-sopfuel-dark font-open-sans font-medium">Name</Label>
                    <Input
                      id="contact-name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="border-gray-200 rounded-xl mt-2 py-3 font-open-sans transition-all duration-300 focus:scale-105 focus:border-sopfuel-blue"
                      required
                    />
                  </div>
                  <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    <Label htmlFor="contact-email" className="text-sopfuel-dark font-open-sans font-medium">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="border-gray-200 rounded-xl mt-2 py-3 font-open-sans transition-all duration-300 focus:scale-105 focus:border-sopfuel-blue"
                      required
                    />
                  </div>
                  <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
                    <Label htmlFor="contact-message" className="text-sopfuel-dark font-open-sans font-medium">Message</Label>
                    <Textarea
                      id="contact-message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="border-gray-200 rounded-xl min-h-[150px] mt-2 py-3 font-open-sans transition-all duration-300 focus:scale-105 focus:border-sopfuel-blue"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white rounded-xl py-4 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in"
                    style={{ animationDelay: '1.2s' }}
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Social Media Links */}
            <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '1.4s' }}>
              <p className="text-sopfuel-dark/70 mb-8 font-open-sans text-lg">
                Connect with us on social media
              </p>
              <div className="flex justify-center space-x-8">
                <a 
                  href="https://linkedin.com/company/sopfuel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sopfuel-blue hover:text-sopfuel-green transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="h-8 w-8" />
                </a>
                <a 
                  href="https://twitter.com/sopfuel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sopfuel-blue hover:text-sopfuel-green transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-8 w-8" />
                </a>
                <a 
                  href="https://facebook.com/sopfuel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sopfuel-blue hover:text-sopfuel-green transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-8 w-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sopfuel-blue text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2 animate-fade-in">
              <div className="flex items-center mb-6 group cursor-pointer">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Bot className="h-6 w-6 text-sopfuel-blue" />
                </div>
                <span className="text-2xl font-bold font-montserrat group-hover:text-sopfuel-green transition-colors duration-300">
                  Sopfuel
                </span>
              </div>
              <p className="text-gray-300 font-open-sans leading-relaxed max-w-md">
                Streamline your processes with intelligent SOP creation powered by AI. Transform your business workflows into clear, actionable procedures.
              </p>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-semibold mb-6 font-montserrat text-lg">Product</h3>
              <ul className="space-y-3 text-gray-300 font-open-sans">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Pricing</button></li>
                <li><a href="/templates" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Templates</a></li>
                <li><a href="/docs/api" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">API</a></li>
              </ul>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="font-semibold mb-6 font-montserrat text-lg">Support</h3>
              <ul className="space-y-3 text-gray-300 font-open-sans">
                <li><a href="/help" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Help Center</a></li>
                <li><a href="/documentation" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Documentation</a></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Contact</button></li>
                <li><a href="/privacy-policy" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-300 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="font-open-sans">
              © {new Date().getFullYear()} Sopfuel. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Index;
