
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Bot, Search, Book, MessageCircle, Video, FileQuestion } from "lucide-react";

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      icon: <Book className="h-8 w-8 text-sopfuel-blue" />,
      title: "Getting Started",
      description: "Learn the basics of using Sopfuel",
      articles: ["Quick Start Guide", "Creating Your First SOP", "Understanding Templates", "Account Setup"]
    },
    {
      icon: <FileQuestion className="h-8 w-8 text-sopfuel-blue" />,
      title: "SOP Creation",
      description: "Master the art of SOP creation with AI",
      articles: ["AI Generation Tips", "Best Practices", "Customization Options", "Quality Guidelines"]
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-sopfuel-blue" />,
      title: "Collaboration",
      description: "Working with teams and sharing SOPs",
      articles: ["Team Management", "Sharing & Permissions", "Comments & Reviews", "Version Control"]
    },
    {
      icon: <Video className="h-8 w-8 text-sopfuel-blue" />,
      title: "Tutorials",
      description: "Step-by-step video guides",
      articles: ["Video Tutorials", "Webinar Recordings", "Feature Demos", "Case Studies"]
    }
  ];

  const popularArticles = [
    "How to create your first SOP with AI",
    "Understanding SOP templates and customization",
    "Setting up team collaboration",
    "Exporting and sharing your SOPs",
    "Troubleshooting common issues",
    "API integration guide"
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
              <Button variant="ghost" onClick={() => navigate('/contact')} className="font-open-sans">Contact</Button>
              <Button variant="ghost" onClick={() => navigate('/documentation')} className="font-open-sans">Documentation</Button>
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
              Help Center
            </h1>
            <p className="text-xl text-sopfuel-dark/70 max-w-3xl mx-auto mb-8 font-open-sans">
              Find answers, get support, and learn how to make the most of Sopfuel
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sopfuel-dark/40" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-sopfuel-blue/20 focus:border-sopfuel-blue"
              />
            </div>
          </div>

          {/* Help Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {helpCategories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group hover:-translate-y-2 cursor-pointer">
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
                    {category.articles.map((article, articleIndex) => (
                      <div key={articleIndex} className="text-sm text-sopfuel-blue hover:text-sopfuel-blue/80 cursor-pointer font-open-sans">
                        • {article}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Popular Articles */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-sopfuel-blue mb-8 text-center font-montserrat">
              Popular Articles
            </h2>
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {popularArticles.map((article, index) => (
                      <div key={index} className="flex items-center p-4 hover:bg-sopfuel-blue/5 rounded-xl cursor-pointer transition-colors">
                        <div className="w-2 h-2 bg-sopfuel-green rounded-full mr-4"></div>
                        <span className="text-sopfuel-dark font-open-sans">{article}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Support */}
          <div className="text-center bg-gradient-to-br from-sopfuel-blue/5 to-sopfuel-green/5 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-sopfuel-blue mb-4 font-montserrat">
              Still Need Help?
            </h2>
            <p className="text-lg text-sopfuel-dark/70 mb-8 font-open-sans">
              Our support team is here to assist you with any questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/contact')}
                className="bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white text-lg px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              >
                Contact Support
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-sopfuel-blue text-sopfuel-blue hover:bg-sopfuel-blue hover:text-white text-lg px-8 py-4 rounded-xl font-medium transition-all duration-200"
              >
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;
