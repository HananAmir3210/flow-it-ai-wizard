
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Bot, Workflow, Users, FileText, Zap, Settings, ArrowRight } from "lucide-react";

const Features = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const features = [
    {
      icon: <Bot className="h-12 w-12 text-sopfuel-blue" />,
      title: "AI-Powered Generation",
      description: "Create comprehensive SOPs instantly with advanced AI that understands your business processes and industry requirements.",
      details: [
        "Natural language processing for process understanding",
        "Industry-specific templates and best practices",
        "Automated step sequencing and organization",
        "Smart content suggestions and improvements"
      ]
    },
    {
      icon: <Workflow className="h-12 w-12 text-sopfuel-blue" />,
      title: "Visual Workflow Builder",
      description: "Design and visualize your processes with our intuitive drag-and-drop workflow builder and real-time collaboration tools.",
      details: [
        "Drag-and-drop interface for easy editing",
        "Flowchart and diagram generation",
        "Process mapping visualization",
        "Integration with existing tools"
      ]
    },
    {
      icon: <Users className="h-12 w-12 text-sopfuel-blue" />,
      title: "Team Collaboration",
      description: "Share, review, and iterate on SOPs with your team in real-time with version control and role-based permissions.",
      details: [
        "Real-time collaborative editing",
        "Comment and feedback system",
        "Version history and rollback",
        "Role-based access control"
      ]
    },
    {
      icon: <FileText className="h-12 w-12 text-sopfuel-blue" />,
      title: "Smart Templates",
      description: "Access industry-specific templates that adapt to your needs, with customizable formats and automated compliance checks.",
      details: [
        "50+ industry-specific templates",
        "Customizable formatting options",
        "Compliance requirement checks",
        "Export to multiple formats"
      ]
    },
    {
      icon: <Zap className="h-12 w-12 text-sopfuel-blue" />,
      title: "Quick Implementation",
      description: "Go from idea to implementation in minutes with streamlined processes and automated quality assurance.",
      details: [
        "Instant SOP generation",
        "Quality assurance checks",
        "Automated formatting",
        "One-click publishing"
      ]
    },
    {
      icon: <Settings className="h-12 w-12 text-sopfuel-blue" />,
      title: "Advanced Customization",
      description: "Tailor every aspect of your SOPs with advanced customization options and branding controls.",
      details: [
        "Custom branding and styling",
        "Advanced formatting controls",
        "Integration capabilities",
        "API access for developers"
      ]
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
              <Button variant="ghost" onClick={() => navigate('/pricing')} className="font-open-sans">Pricing</Button>
              <Button variant="ghost" onClick={() => navigate('/contact')} className="font-open-sans">Contact</Button>
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
              Powerful Features
            </h1>
            <p className="text-xl text-sopfuel-dark/70 max-w-3xl mx-auto font-open-sans">
              Everything you need to create, manage, and optimize your Standard Operating Procedures with the power of AI
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-sopfuel-blue/5 rounded-2xl group-hover:bg-sopfuel-blue/10 transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-sopfuel-blue font-montserrat">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sopfuel-dark/70 font-open-sans leading-relaxed mb-4">
                    {feature.description}
                  </CardDescription>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-sm text-sopfuel-dark/60 font-open-sans">
                        <div className="w-1.5 h-1.5 bg-sopfuel-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-sopfuel-blue/5 to-sopfuel-green/5 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-sopfuel-blue mb-4 font-montserrat">
              Ready to Transform Your Processes?
            </h2>
            <p className="text-lg text-sopfuel-dark/70 mb-8 font-open-sans">
              Join thousands of teams who've streamlined their operations with Sopfuel
            </p>
            <Button 
              size="lg"
              onClick={handleGetStarted}
              className="bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white text-lg px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 group"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Features;
