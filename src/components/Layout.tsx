
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = "Sopfuel" }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-sopfuel-gray to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 lg:py-6">
        <nav className="flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
            aria-label="Navigate to home page"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sopfuel-blue rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold text-sopfuel-blue font-montserrat">Sopfuel</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Button variant="ghost" onClick={() => navigate('/features')} className="text-sm lg:text-base text-sopfuel-dark hover:text-sopfuel-blue">
              Features
            </Button>
            <Button variant="ghost" onClick={() => navigate('/pricing')} className="text-sm lg:text-base text-sopfuel-dark hover:text-sopfuel-blue">
              Pricing
            </Button>
            <Button onClick={handleGetStarted} className="text-sm lg:text-base bg-sopfuel-blue hover:bg-sopfuel-blue/90 text-white">
              {user ? "Dashboard" : "Get Started"}
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {title && title !== "Sopfuel" && (
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sopfuel-blue mb-8 text-center font-montserrat">
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
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-sopfuel-blue rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <span className="text-xl font-bold text-sopfuel-blue font-montserrat">Sopfuel</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-open-sans">
                Turn prompts into processes — instantly. Transform your business workflows into clear, actionable Standard Operating Procedures with the power of AI.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com/sopfuel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sopfuel-blue dark:hover:text-sopfuel-green transition-all duration-300 transform hover:scale-110"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a 
                  href="https://linkedin.com/company/sopfuel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sopfuel-blue dark:hover:text-sopfuel-green transition-all duration-300 transform hover:scale-110"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-sopfuel-blue dark:text-white font-montserrat">Product</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigate('/features')}
                    className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/pricing')}
                    className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/demo')}
                    className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
                  >
                    Demo
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/docs/api')}
                    className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
                  >
                    API Documentation
                  </button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-sopfuel-blue dark:text-white font-montserrat">Company</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigate('/about')}
                    className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/blog')}
                    className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/careers')}
                    className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-sopfuel-blue dark:text-white font-montserrat">Support</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigate('/help')}
                    className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/community')}
                    className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
                  >
                    Community
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/privacy-policy')}
                    className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/terms-of-service')}
                    className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm font-open-sans">
              © {new Date().getFullYear()} Sopfuel. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <button 
                onClick={() => navigate('/privacy-policy')}
                className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
              >
                Privacy
              </button>
              <button 
                onClick={() => navigate('/terms-of-service')}
                className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
              >
                Terms
              </button>
              <button 
                onClick={() => navigate('/cookies')}
                className="text-gray-600 dark:text-gray-300 hover:text-sopfuel-blue dark:hover:text-white transition-colors text-sm font-open-sans"
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
