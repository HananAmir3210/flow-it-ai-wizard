
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, MessageSquare, Headphones } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@flowforge.com",
      description: "Send us an email and we'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Available Mon-Fri, 9 AM - 6 PM EST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Innovation Drive, San Francisco, CA 94107",
      description: "Schedule a visit to our headquarters"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 9 AM - 6 PM EST",
      description: "We're here to help during business hours"
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "Sales Inquiries",
      description: "Questions about pricing, features, or custom solutions",
      email: "sales@flowforge.com"
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Need help with your account or technical issues",
      email: "support@flowforge.com"
    },
    {
      icon: Mail,
      title: "General Questions",
      description: "Any other questions or feedback",
      email: "hello@flowforge.com"
    }
  ];

  return (
    <Layout title="Contact Us">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Have questions about FlowForge? We'd love to hear from you. 
            Our team is here to help you streamline your business processes.
          </p>
        </div>

        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Get in Touch</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                        <info.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {info.title}
                        </h3>
                        <p className="text-blue-600 font-medium mb-1">
                          {info.details}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Support Options */}
            <Card>
              <CardHeader>
                <CardTitle>Specific Support</CardTitle>
                <CardDescription>
                  Need help with something specific? Contact the right team directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportOptions.map((option, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <option.icon className="h-5 w-5 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {option.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        {option.description}
                      </p>
                      <a 
                        href={`mailto:${option.email}`}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {option.email}
                      </a>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Frequently Asked Questions</CardTitle>
            <CardDescription className="text-center">
              Quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  How quickly will I hear back?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Do you offer phone support?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Yes, phone support is available for Pro and Enterprise customers during business hours.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I schedule a demo?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Absolutely! Visit our demo page or mention it in your message to schedule a personalized demonstration.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Do you offer custom integrations?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Yes, we work with Enterprise customers to create custom integrations with existing tools and workflows.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Where is your data stored?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  All data is securely stored in SOC 2 compliant data centers with enterprise-grade encryption.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Do you have an affiliate program?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Yes! Contact our sales team to learn more about our partner and affiliate opportunities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Contact;
