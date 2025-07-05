
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Bot, FileText, Building, Users, Truck, Shield, Heart, Briefcase } from "lucide-react";

const Templates = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const templateCategories = [
    {
      icon: <Building className="h-8 w-8 text-sopfuel-blue" />,
      title: "Manufacturing",
      description: "Production, quality control, and safety procedures",
      templates: ["Quality Control Checklist", "Equipment Maintenance", "Safety Protocols", "Production Line Setup"]
    },
    {
      icon: <Users className="h-8 w-8 text-sopfuel-blue" />,
      title: "Human Resources",
      description: "Employee onboarding, training, and management",
      templates: ["Employee Onboarding", "Performance Reviews", "Training Programs", "Disciplinary Actions"]
    },
    {
      icon: <Truck className="h-8 w-8 text-sopfuel-blue" />,
      title: "Logistics",
      description: "Supply chain, inventory, and distribution processes",
      templates: ["Inventory Management", "Shipping Procedures", "Supplier Onboarding", "Returns Processing"]
    },
    {
      icon: <Shield className="h-8 w-8 text-sopfuel-blue" />,
      title: "Compliance",
      description: "Regulatory compliance and audit procedures",
      templates: ["Audit Preparation", "Compliance Reporting", "Risk Assessment", "Document Control"]
    },
    {
      icon: <Heart className="h-8 w-8 text-sopfuel-blue" />,
      title: "Healthcare",
      description: "Patient care, safety, and administrative procedures",
      templates: ["Patient Intake", "Safety Protocols", "Emergency Response", "Equipment Sterilization"]
    },
    {
      icon: <Briefcase className="h-8 w-8 text-sopfuel-blue" />,
      title: "Finance",
      description: "Financial processes, reporting, and controls",
      templates: ["Invoice Processing", "Budget Planning", "Expense Reporting", "Financial Audits"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <div className="w-10 h-10 bg-sopfuel-blue rounded-xl flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-sopfuel-blue font-montserrat">Sopfuel</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" onClick={() => navigate('/features')} className="font-open-sans">Features</Button>
              <Button variant="ghost" onClick={() => navigate('/pricing')} className="font-open-sans">Pricing</Button>
              <Button onClick={handleGetStarted} className="bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white rounded-xl px-6 py-2.5 font-medium">
                Start Free Trial
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-sopfuel-blue mb-6 font-montserrat">
              SOP Templates
            </h1>
            <p className="text-xl text-sopfuel-dark/70 max-w-3xl mx-auto font-open-sans">
              Industry-specific templates to get you started quickly. Customize any template to match your unique processes.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {templateCategories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-sopfuel-blue/5 rounded-2xl group-hover:bg-sopfuel-blue/10 transition-colors">
                      {category.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-sopfuel-blue font-montserrat">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sopfuel-dark/70 font-open-sans leading-relaxed mb-4">
                    {category.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {category.templates.map((template, templateIndex) => (
                      <div key={templateIndex} className="flex items-center text-sm text-sopfuel-dark/60 font-open-sans">
                        <FileText className="h-4 w-4 text-sopfuel-green mr-2 flex-shrink-0" />
                        {template}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-sopfuel-blue text-sopfuel-blue hover:bg-sopfuel-blue hover:text-white"
                    onClick={handleGetStarted}
                  >
                    Browse Templates
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-br from-sopfuel-blue/5 to-sopfuel-green/5 rounded-3xl p-12 mb-16">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-sopfuel-blue mb-2 font-montserrat">150+</div>
                <div className="text-sopfuel-dark/70 font-open-sans">Ready-to-use templates</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-sopfuel-blue mb-2 font-montserrat">25+</div>
                <div className="text-sopfuel-dark/70 font-open-sans">Industry categories</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-sopfuel-blue mb-2 font-montserrat">98%</div>
                <div className="text-sopfuel-dark/70 font-open-sans">Template satisfaction rate</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-sopfuel-blue mb-4 font-montserrat">
              Start with a Template Today
            </h2>
            <p className="text-lg text-sopfuel-dark/70 mb-8 font-open-sans">
              Choose from our extensive library and customize to your needs
            </p>
            <Button 
              size="lg"
              onClick={handleGetStarted}
              className="bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white text-lg px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
            >
              Get Started with Templates
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Templates;
