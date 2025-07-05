import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Users, Briefcase, Settings, Heart, Shield, Zap, Download, Eye } from 'lucide-react';

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'HR & Onboarding',
    'Operations',
    'Customer Service',
    'Marketing',
    'Finance',
    'IT & Security',
    'Quality Assurance'
  ];

  const templates = [
    {
      id: 1,
      title: "Employee Onboarding Process",
      description: "Complete guide for welcoming new team members with all necessary steps and documentation.",
      category: "HR & Onboarding",
      icon: Users,
      steps: 12,
      estimatedTime: "2-3 days",
      difficulty: "Beginner",
      tags: ["HR", "Onboarding", "New Hire", "Documentation"],
      popular: true
    },
    {
      id: 2,
      title: "Customer Support Ticket Resolution",
      description: "Systematic approach to handling customer inquiries and resolving issues efficiently.",
      category: "Customer Service",
      icon: Heart,
      steps: 8,
      estimatedTime: "30-60 minutes",
      difficulty: "Intermediate",
      tags: ["Support", "Customer Service", "Tickets", "Resolution"],
      popular: true
    },
    {
      id: 3,
      title: "Monthly Financial Reporting",
      description: "Step-by-step process for generating accurate monthly financial reports and analysis.",
      category: "Finance",
      icon: Briefcase,
      steps: 15,
      estimatedTime: "4-6 hours",
      difficulty: "Advanced",
      tags: ["Finance", "Reporting", "Analysis", "Monthly"],
      popular: false
    },
    {
      id: 4,
      title: "IT Security Incident Response",
      description: "Comprehensive protocol for identifying, containing, and resolving security incidents.",
      category: "IT & Security",
      icon: Shield,
      steps: 10,
      estimatedTime: "1-4 hours",
      difficulty: "Advanced",
      tags: ["Security", "Incident", "Response", "IT"],
      popular: false
    },
    {
      id: 5,
      title: "Product Launch Campaign",
      description: "Complete marketing workflow for launching new products with maximum impact.",
      category: "Marketing",
      icon: Zap,
      steps: 20,
      estimatedTime: "2-4 weeks",
      difficulty: "Intermediate",
      tags: ["Marketing", "Launch", "Campaign", "Product"],
      popular: true
    },
    {
      id: 6,
      title: "Quality Control Inspection",
      description: "Standardized process for conducting thorough quality inspections and documentation.",
      category: "Quality Assurance",
      icon: Settings,
      steps: 14,
      estimatedTime: "1-2 hours",
      difficulty: "Intermediate",
      tags: ["Quality", "Inspection", "Control", "Standards"],
      popular: false
    },
    {
      id: 7,
      title: "Daily Operations Checklist",
      description: "Essential daily tasks and procedures to ensure smooth business operations.",
      category: "Operations",
      icon: FileText,
      steps: 6,
      estimatedTime: "30 minutes",
      difficulty: "Beginner",
      tags: ["Operations", "Daily", "Checklist", "Routine"],
      popular: true
    },
    {
      id: 8,
      title: "Remote Work Setup Guide",
      description: "Complete guide for setting up productive remote work environments and processes.",
      category: "HR & Onboarding",
      icon: Users,
      steps: 9,
      estimatedTime: "1-2 hours",
      difficulty: "Beginner",
      tags: ["Remote", "Setup", "Work", "Guide"],
      popular: false
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-sopfuel-green text-white';
      case 'Intermediate': return 'bg-yellow-500 text-white';
      case 'Advanced': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Layout title="Templates">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-sopfuel-blue mb-6 font-montserrat">
            SOP Templates Library
          </h2>
          <p className="text-xl text-sopfuel-dark/70 max-w-4xl mx-auto font-open-sans">
            Jump-start your process documentation with our professionally crafted SOP templates. 
            Choose from industry-specific templates and customize them to fit your needs.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search templates by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 rounded-xl border-gray-200 font-open-sans"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl font-open-sans ${
                  selectedCategory === category 
                    ? 'bg-sopfuel-blue text-white' 
                    : 'border-sopfuel-blue text-sopfuel-blue hover:bg-sopfuel-blue hover:text-white'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center border-0 shadow-lg rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-sopfuel-blue mb-1 font-montserrat">
                {templates.length}
              </div>
              <div className="text-sm text-sopfuel-dark/70 font-open-sans">
                Total Templates
              </div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-sopfuel-blue mb-1 font-montserrat">
                {categories.length - 1}
              </div>
              <div className="text-sm text-sopfuel-dark/70 font-open-sans">
                Categories
              </div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-sopfuel-blue mb-1 font-montserrat">
                {templates.filter(t => t.popular).length}
              </div>
              <div className="text-sm text-sopfuel-dark/70 font-open-sans">
                Popular
              </div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-sopfuel-blue mb-1 font-montserrat">
                Free
              </div>
              <div className="text-sm text-sopfuel-dark/70 font-open-sans">
                All Templates
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group hover:-translate-y-2">
              {template.popular && (
                <div className="absolute -top-3 -right-3 z-10">
                  <Badge className="bg-sopfuel-green text-white font-open-sans">
                    Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-sopfuel-blue/5 rounded-2xl group-hover:bg-sopfuel-blue/10 transition-colors">
                    <template.icon className="h-8 w-8 text-sopfuel-blue" />
                  </div>
                  <Badge className={getDifficultyColor(template.difficulty)}>
                    {template.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-sopfuel-blue font-montserrat mb-2">
                  {template.title}
                </CardTitle>
                <CardDescription className="text-sopfuel-dark/70 font-open-sans leading-relaxed">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-sopfuel-dark/70 font-open-sans">
                  <span>{template.steps} steps</span>
                  <span>{template.estimatedTime}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-sopfuel-gray text-sopfuel-dark">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-sopfuel-gray text-sopfuel-dark">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white rounded-xl font-open-sans"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Use Template
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-sopfuel-blue text-sopfuel-blue hover:bg-sopfuel-blue hover:text-white rounded-xl"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-sopfuel-blue/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sopfuel-blue mb-2 font-montserrat">
              No templates found
            </h3>
            <p className="text-sopfuel-dark/70 font-open-sans">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-sopfuel-blue to-sopfuel-blue/90 text-white border-0 rounded-2xl">
          <CardContent className="pt-8 text-center">
            <h3 className="text-2xl font-bold mb-4 font-montserrat">
              Need a Custom Template?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto font-open-sans">
              Can't find the perfect template for your needs? Our AI can generate custom SOPs 
              tailored specifically to your business processes and requirements.
            </p>
            <Button 
              className="bg-sopfuel-green hover:bg-sopfuel-green/90 text-white rounded-xl px-8 py-3 font-open-sans"
            >
              Generate Custom SOP
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Templates;