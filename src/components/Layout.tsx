
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = "FlowForge" }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 lg:py-6">
        <nav className="flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
            aria-label="Navigate to home page"
          >
            <img 
              src="/lovable-uploads/684a1ef7-80d1-4c48-86f8-3546b9693236.png" 
              alt="FlowForge Logo" 
              className="h-12 lg:h-16"
            />
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Button variant="ghost" onClick={() => navigate('/features')} className="text-sm lg:text-base">
              Features
            </Button>
            <Button variant="ghost" onClick={() => navigate('/pricing')} className="text-sm lg:text-base">
              Pricing
            </Button>
            <Button onClick={handleGetStarted} className="text-sm lg:text-base">
              {user ? "Dashboard" : "Get Started"}
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {title && title !== "FlowForge" && (
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {title}
            </h1>
          )}
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 mt-auto">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div 
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleLogoClick}
                aria-label="Navigate to home page"
              >
                <img 
                  src="/lovable-uploads/684a1ef7-80d1-4c48-86f8-3546b9693236.png" 
                  alt="FlowForge Logo" 
                  className="h-10"
                />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Turn prompts into processes — instantly. Transform your business workflows into clear, actionable Standard Operating Procedures with the power of AI.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com/placeholder" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 transform hover:scale-110"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a 
                  href="https://linkedin.com/company/placeholder" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 transform hover:scale-110"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Product</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigate('/features')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/pricing')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/demo')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    Demo
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/docs/api')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    API Documentation
                  </button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigate('/about')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/blog')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/careers')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Support</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigate('/help')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/community')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    Community
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/privacy-policy')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/terms-of-service')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} FlowForge. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <button 
                onClick={() => navigate('/privacy-policy')}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
              >
                Privacy
              </button>
              <button 
                onClick={() => navigate('/terms-of-service')}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
              >
                Terms
              </button>
              <button 
                onClick={() => navigate('/cookies')}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
