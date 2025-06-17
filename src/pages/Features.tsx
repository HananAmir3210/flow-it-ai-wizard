
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Workflow, Edit, Download, Share, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Generation",
      description: "Transform simple descriptions into comprehensive SOPs using advanced AI technology that understands your business needs."
    },
    {
      icon: Workflow,
      title: "Visual Workflows",
      description: "Automatically generate flowcharts and visual representations to make complex procedures easy to understand and follow."
    },
    {
      icon: Edit,
      title: "Interactive Editing",
      description: "Edit and customize your SOPs with our intuitive interface. Add steps, modify content, and reorganize workflows effortlessly."
    },
    {
      icon: Download,
      title: "Multi-Format Export",
      description: "Export your SOPs in multiple formats including PDF, Word, and HTML to fit your organization's needs."
    },
    {
      icon: Share,
      title: "Team Collaboration",
      description: "Share SOPs with your team, collect feedback, and maintain version control for all your business processes."
    },
    {
      icon: Zap,
      title: "Quick Implementation",
      description: "Go from idea to implementation in minutes, not hours. Our streamlined process gets you results fast."
    }
  ];

  return (
    <Layout title="Features">
      <div className="space-y-8">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the powerful features that make FlowForge the best choice for creating and managing your Standard Operating Procedures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Why Choose FlowForge?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Save Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Reduce SOP creation time from hours to minutes with our AI-powered generation system.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Improve Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ensure consistency and completeness across all your business processes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Enhance Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enable seamless teamwork with shared workspaces and real-time collaboration features.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Scale Efficiently</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Grow your business with standardized processes that scale with your organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Features;
