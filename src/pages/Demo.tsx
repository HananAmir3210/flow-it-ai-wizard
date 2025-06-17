
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Play, Calendar, User, Mail, Phone } from 'lucide-react';

const Demo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demo request submitted:', formData);
    // Handle form submission here
  };

  return (
    <Layout title="Demo">
      <div className="space-y-8">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See FlowForge in action! Watch our demo video or schedule a personalized demonstration with our team.
          </p>
        </div>

        {/* Video Demo Section */}
        <Card className="overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Watch FlowForge in Action</CardTitle>
            <CardDescription>
              See how easy it is to create professional SOPs in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Demo Video Coming Soon
                </p>
                <Button>Watch Demo</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Demo Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-6 w-6" />
                <span>Request a Personalized Demo</span>
              </CardTitle>
              <CardDescription>
                Schedule a 30-minute demo with our team to see how FlowForge can transform your business processes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company
                  </label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your specific needs or questions"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Request Demo
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What You'll See</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      AI-powered SOP generation in real-time
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      Visual workflow creation and editing
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      Team collaboration features
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      Export and sharing options
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      Integration possibilities
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-300">
                    demo@flowforge.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-300">
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Available Mon-Fri, 9 AM - 6 PM EST
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Demo;
