
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Twitter, Linkedin, Facebook, Star, CheckCircle, Users, Zap, Settings } from "lucide-react";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
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

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthModalOpen(true);
    toast({
      title: "Getting Started",
      description: "Please complete your registration in the signup modal.",
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    setContactForm({ name: "", email: "", message: "" });
  };

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-[#003366]" />,
      title: "AI-Driven Templates",
      description: "Generate comprehensive SOPs instantly using advanced AI technology tailored to your industry."
    },
    {
      icon: <Settings className="h-8 w-8 text-[#003366]" />,
      title: "Customization Options",
      description: "Fully customize your SOPs with drag-and-drop editing, role assignments, and workflow visualization."
    },
    {
      icon: <Users className="h-8 w-8 text-[#003366]" />,
      title: "Collaboration Tools",
      description: "Share, review, and collaborate on SOPs with your team in real-time with version control."
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "$9",
      period: "/month",
      features: ["5 SOPs per month", "Basic templates", "Email support", "PDF export"],
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      features: ["Unlimited SOPs", "Advanced AI templates", "Team collaboration", "Priority support", "Workflow visualization"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Custom solutions", "Dedicated support", "API access", "Advanced integrations", "Custom branding"],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      company: "TechStart Inc.",
      content: "Sopfuel transformed how we document our processes. What used to take hours now takes minutes!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "GrowthCorp",
      content: "The AI-powered generation is incredibly accurate. Our team productivity increased by 40%.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Quality Assurance Lead",
      company: "Precision Systems",
      content: "Outstanding tool for standardizing our quality processes. Highly recommended!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#003366] rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-[#003366]" style={{fontFamily: 'Montserrat, sans-serif'}}>
              Sopfuel
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-[#333333]">Features</Button>
            <Button variant="ghost" className="text-[#333333]">Pricing</Button>
            <Button 
              onClick={handleGetStarted} 
              className="bg-[#003366] hover:bg-[#002244] text-white"
            >
              {user ? "Dashboard" : "Get Started"}
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-[#003366] mb-6 leading-tight" style={{fontFamily: 'Montserrat, sans-serif'}}>
              Sopfuel: Your AI-Powered SOP Generator
            </h1>
            <p className="text-xl text-[#333333] mb-8 leading-relaxed" style={{fontFamily: 'Open Sans, sans-serif'}}>
              Streamline Your Processes with Intelligent SOP Creation
            </p>
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-[#003366] hover:bg-[#002244] text-white text-lg px-8 py-4 mb-8"
            >
              Start Your Free Trial
            </Button>
          </div>
          
          <div className="bg-[#F5F5F5] rounded-lg p-8">
            <h3 className="text-xl font-semibold text-[#003366] mb-6" style={{fontFamily: 'Montserrat, sans-serif'}}>
              Quick Sign Up
            </h3>
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-[#333333]">Name</Label>
                <Input
                  id="name"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                  className="border-gray-300"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-[#333333]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                  className="border-gray-300"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-[#333333]">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                  className="border-gray-300"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#66CC99] hover:bg-[#55BB88] text-white">
                Sign Up Free
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#F5F5F5] py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003366] text-center mb-16" style={{fontFamily: 'Montserrat, sans-serif'}}>
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-none">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-[#003366]" style={{fontFamily: 'Montserrat, sans-serif'}}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#333333]" style={{fontFamily: 'Open Sans, sans-serif'}}>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Video Section */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-[#003366] mb-8" style={{fontFamily: 'Montserrat, sans-serif'}}>
              See Sopfuel in Action
            </h3>
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#003366] rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                  </div>
                  <p className="text-[#333333]" style={{fontFamily: 'Open Sans, sans-serif'}}>
                    Demo Video Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003366] text-center mb-16" style={{fontFamily: 'Montserrat, sans-serif'}}>
            Pricing Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${plan.popular ? 'border-[#66CC99] border-2' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#66CC99] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-[#003366]" style={{fontFamily: 'Montserrat, sans-serif'}}>
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-[#003366]">{plan.price}</span>
                    <span className="text-[#333333]">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-[#333333]" style={{fontFamily: 'Open Sans, sans-serif'}}>
                        <CheckCircle className="h-5 w-5 text-[#66CC99] mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-[#003366] hover:bg-[#002244]' : 'bg-[#66CC99] hover:bg-[#55BB88]'} text-white`}
                    onClick={handleGetStarted}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#F5F5F5] py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003366] text-center mb-16" style={{fontFamily: 'Montserrat, sans-serif'}}>
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-none">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star key={starIndex} className="h-5 w-5 text-[#66CC99] fill-current" />
                    ))}
                  </div>
                  <p className="text-[#333333] mb-6 italic" style={{fontFamily: 'Open Sans, sans-serif'}}>
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-[#003366]" style={{fontFamily: 'Montserrat, sans-serif'}}>
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-[#333333]" style={{fontFamily: 'Open Sans, sans-serif'}}>
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
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003366] text-center mb-16" style={{fontFamily: 'Montserrat, sans-serif'}}>
            Contact Us
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card className="border-gray-200">
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="contact-name" className="text-[#333333]">Name</Label>
                    <Input
                      id="contact-name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email" className="text-[#333333]">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-message" className="text-[#333333]">Message</Label>
                    <Textarea
                      id="contact-message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="border-gray-300 min-h-[120px]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#003366] hover:bg-[#002244] text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Social Media Links */}
            <div className="text-center mt-12">
              <p className="text-[#333333] mb-6" style={{fontFamily: 'Open Sans, sans-serif'}}>
                Connect with us on social media
              </p>
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://linkedin.com/company/sopfuel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#003366] hover:text-[#66CC99] transition-colors transform hover:scale-110"
                >
                  <Linkedin className="h-8 w-8" />
                </a>
                <a 
                  href="https://twitter.com/sopfuel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#003366] hover:text-[#66CC99] transition-colors transform hover:scale-110"
                >
                  <Twitter className="h-8 w-8" />
                </a>
                <a 
                  href="https://facebook.com/sopfuel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#003366] hover:text-[#66CC99] transition-colors transform hover:scale-110"
                >
                  <Facebook className="h-8 w-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003366] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-2">
                  <span className="text-[#003366] font-bold">S</span>
                </div>
                <span className="text-xl font-bold" style={{fontFamily: 'Montserrat, sans-serif'}}>
                  Sopfuel
                </span>
              </div>
              <p className="text-gray-300" style={{fontFamily: 'Open Sans, sans-serif'}}>
                Streamline your processes with intelligent SOP creation powered by AI.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" style={{fontFamily: 'Montserrat, sans-serif'}}>Product</h3>
              <ul className="space-y-2 text-gray-300" style={{fontFamily: 'Open Sans, sans-serif'}}>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" style={{fontFamily: 'Montserrat, sans-serif'}}>Company</h3>
              <ul className="space-y-2 text-gray-300" style={{fontFamily: 'Open Sans, sans-serif'}}>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" style={{fontFamily: 'Montserrat, sans-serif'}}>Support</h3>
              <ul className="space-y-2 text-gray-300" style={{fontFamily: 'Open Sans, sans-serif'}}>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p style={{fontFamily: 'Open Sans, sans-serif'}}>
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
