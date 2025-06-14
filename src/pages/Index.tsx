import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">SaaS Platform</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Pricing
              </a>
              <a href="/account" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Account
              </a>
              <Button 
                variant="outline" 
                onClick={() => setIsAuthModalOpen(true)}
                className="border-gray-300 dark:border-gray-600"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            The Future of SaaS is Here
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Revolutionize your workflow with our cutting-edge platform.
          </p>
          <Button className="px-8 py-3 text-lg">Get Started</Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-10">
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
              <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Feature 1
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Description of feature 1.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
              <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Feature 2
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Description of feature 2.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
              <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Feature 3
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Description of feature 3.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-10">
            Pricing Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Basic
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Free
              </p>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 mb-4">
                <li>Feature 1</li>
                <li>Feature 2</li>
              </ul>
              <Button variant="outline">Get Started</Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Pro
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                $19/month
              </p>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 mb-4">
                <li>All Basic Features</li>
                <li>Feature 3</li>
                <li>Feature 4</li>
              </ul>
              <Button>Get Started</Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Enterprise
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Contact Us
              </p>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 mb-4">
                <li>All Pro Features</li>
                <li>Custom Features</li>
                <li>Dedicated Support</li>
              </ul>
              <Button variant="outline">Contact Us</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} SaaS Platform. All rights reserved.
          </p>
        </div>
      </footer>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Index;
