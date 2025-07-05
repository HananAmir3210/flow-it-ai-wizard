
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Bot, Shield, Eye, Lock, FileText } from "lucide-react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

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
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl lg:text-6xl font-bold text-sopfuel-blue mb-6 font-montserrat">
                Privacy Policy
              </h1>
              <p className="text-xl text-sopfuel-dark/70 font-open-sans">
                Last updated: January 1, 2024
              </p>
            </div>

            {/* Privacy Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-0 shadow-lg rounded-2xl text-center">
                <CardContent className="pt-8">
                  <Shield className="h-12 w-12 text-sopfuel-blue mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-sopfuel-blue mb-2 font-montserrat">Data Protection</h3>
                  <p className="text-sm text-sopfuel-dark/70 font-open-sans">We use industry-standard encryption to protect your data</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg rounded-2xl text-center">
                <CardContent className="pt-8">
                  <Eye className="h-12 w-12 text-sopfuel-blue mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-sopfuel-blue mb-2 font-montserrat">Transparency</h3>
                  <p className="text-sm text-sopfuel-dark/70 font-open-sans">Clear information about how we collect and use data</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg rounded-2xl text-center">
                <CardContent className="pt-8">
                  <Lock className="h-12 w-12 text-sopfuel-blue mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-sopfuel-blue mb-2 font-montserrat">Your Control</h3>
                  <p className="text-sm text-sopfuel-dark/70 font-open-sans">You have full control over your personal information</p>
                </CardContent>
              </Card>
            </div>

            {/* Privacy Policy Content */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none font-open-sans">
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold text-sopfuel-blue mb-4 font-montserrat">Information We Collect</h2>
                    <p className="text-sopfuel-dark/80 mb-4">
                      We collect information you provide directly to us, such as when you create an account, 
                      use our services, or contact us for support.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-sopfuel-dark/80">
                      <li>Account information (name, email address, password)</li>
                      <li>SOPs and content you create using our service</li>
                      <li>Usage data and analytics</li>
                      <li>Communication preferences and support interactions</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold text-sopfuel-blue mb-4 font-montserrat">How We Use Your Information</h2>
                    <p className="text-sopfuel-dark/80 mb-4">
                      We use the information we collect to provide, maintain, and improve our services:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-sopfuel-dark/80">
                      <li>To provide and operate the Sopfuel service</li>
                      <li>To improve and personalize your experience</li>
                      <li>To communicate with you about service updates</li>
                      <li>To provide customer support and respond to inquiries</li>
                      <li>To ensure security and prevent fraud</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold text-sopfuel-blue mb-4 font-montserrat">Information Sharing</h2>
                    <p className="text-sopfuel-dark/80 mb-4">
                      We do not sell, trade, or rent your personal information to third parties. 
                      We may share your information only in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-sopfuel-dark/80">
                      <li>With your explicit consent</li>
                      <li>To comply with legal obligations</li>
                      <li>To protect our rights and prevent fraud</li>
                      <li>With service providers under strict confidentiality agreements</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold text-sopfuel-blue mb-4 font-montserrat">Data Security</h2>
                    <p className="text-sopfuel-dark/80 mb-4">
                      We implement appropriate technical and organizational measures to protect your 
                      personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold text-sopfuel-blue mb-4 font-montserrat">Your Rights</h2>
                    <p className="text-sopfuel-dark/80 mb-4">
                      You have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-sopfuel-dark/80">
                      <li>Access and update your personal information</li>
                      <li>Delete your account and associated data</li>
                      <li>Export your data in a portable format</li>
                      <li>Opt out of marketing communications</li>
                      <li>Contact us with privacy concerns</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold text-sopfuel-blue mb-4 font-montserrat">Contact Us</h2>
                    <p className="text-sopfuel-dark/80">
                      If you have any questions about this Privacy Policy, please contact us at:
                      <br />
                      Email: privacy@sopfuel.com
                      <br />
                      Address: 123 Privacy Street, San Francisco, CA 94107
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="text-center mt-12">
              <Button 
                size="lg"
                onClick={() => navigate('/contact')}
                className="bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white text-lg px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              >
                <FileText className="mr-2 h-5 w-5" />
                Have Questions? Contact Us
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
