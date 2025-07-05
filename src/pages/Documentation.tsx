
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Bot, Code, Book, Zap, Key, Globe } from "lucide-react";

const Documentation = () => {
  const navigate = useNavigate();

  const docSections = [
    {
      icon: <Zap className="h-8 w-8 text-sopfuel-blue" />,
      title: "Quick Start",
      description: "Get up and running with Sopfuel in minutes",
      items: ["Installation", "First SOP", "Basic Configuration", "Account Setup"]
    },
    {
      icon: <Code className="h-8 w-8 text-sopfuel-blue" />,
      title: "API Reference",
      description: "Complete API documentation and examples",
      items: ["Authentication", "Endpoints", "Response Formats", "Rate Limits"]
    },
    {
      icon: <Book className="h-8 w-8 text-sopfuel-blue" />,
      title: "User Guide",
      description: "Comprehensive guide to all features",
      items: ["SOP Creation", "Templates", "Collaboration", "Export Options"]
    },
    {
      icon: <Globe className="h-8 w-8 text-sopfuel-blue" />,
      title: "Integrations",
      description: "Connect Sopfuel with your existing tools",
      items: ["Slack Integration", "Microsoft Teams", "Google Workspace", "Zapier"]
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
              <Button variant="ghost" onClick={() => navigate('/help-center')} className="font-open-sans">Help Center</Button>
              <Button variant="ghost" onClick={() => navigate('/api')} className="font-open-sans">API</Button>
              <Button onClick={() => navigate('/')} className="bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white rounded-xl px-6 py-2.5 font-medium">
                Back to Home
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
              Documentation
            </h1>
            <p className="text-xl text-sopfuel-dark/70 max-w-3xl mx-auto font-open-sans">
              Everything you need to build, integrate, and customize Sopfuel for your organization
            </p>
          </div>

          {/* Documentation Sections */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {docSections.map((section, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group hover:-translate-y-2 cursor-pointer">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-sopfuel-blue/5 rounded-2xl group-hover:bg-sopfuel-blue/10 transition-colors">
                      {section.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-sopfuel-blue font-montserrat">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sopfuel-dark/70 font-open-sans leading-relaxed mb-4">
                    {section.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-sm text-sopfuel-blue hover:text-sopfuel-blue/80 cursor-pointer font-open-sans">
                        • {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* API Quick Reference */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-sopfuel-blue mb-8 text-center font-montserrat">
              API Quick Reference
            </h2>
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-sopfuel-blue mb-4 font-montserrat">Base URL</h3>
                      <code className="bg-sopfuel-blue/5 px-4 py-2 rounded-lg text-sm font-mono">
                        https://api.sopfuel.com/v1
                      </code>
                      
                      <h3 className="text-xl font-semibold text-sopfuel-blue mb-4 mt-6 font-montserrat">Authentication</h3>
                      <code className="bg-sopfuel-blue/5 px-4 py-2 rounded-lg text-sm font-mono">
                        Authorization: Bearer YOUR_API_KEY
                      </code>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-sopfuel-blue mb-4 font-montserrat">Common Endpoints</h3>
                      <div className="space-y-2 text-sm font-open-sans">
                        <div className="flex justify-between">
                          <span className="text-green-600 font-semibold">POST</span>
                          <span>/sops</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-600 font-semibold">GET</span>
                          <span>/sops</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-600 font-semibold">GET</span>
                          <span>/sops/:id</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-yellow-600 font-semibold">PUT</span>
                          <span>/sops/:id</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-sopfuel-blue/5 to-sopfuel-green/5 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-sopfuel-blue mb-4 font-montserrat">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-sopfuel-dark/70 mb-8 font-open-sans">
              Explore our comprehensive documentation and start building today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/api')}
                className="bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white text-lg px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              >
                <Key className="mr-2 h-5 w-5" />
                API Documentation
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-sopfuel-blue text-sopfuel-blue hover:bg-sopfuel-blue hover:text-white text-lg px-8 py-4 rounded-xl font-medium transition-all duration-200"
                onClick={() => navigate('/help-center')}
              >
                <Book className="mr-2 h-5 w-5" />
                User Guide
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
