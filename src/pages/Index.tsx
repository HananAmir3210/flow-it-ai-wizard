import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AuthModal from "@/components/AuthModal";
import FeatureModal from "@/components/FeatureModal";
import SOPModal from "@/components/SOPModal";
import PaymentModal from "@/components/PaymentModal";
import WorkflowModal from "@/components/WorkflowModal";
import InteractiveWorkflowModal from "@/components/InteractiveWorkflowModal";
import PricingDropdown from "@/components/PricingDropdown";
import LoadingSpinner from "@/components/LoadingSpinner";
import AuthWrapper from "@/components/AuthWrapper";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Twitter, Linkedin } from "lucide-react";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [isSOPModalOpen, setIsSOPModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isInteractiveWorkflowModalOpen, setIsInteractiveWorkflowModalOpen] = useState(false);
  const [isPricingDropdownOpen, setIsPricingDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const pricingButtonRef = useRef<HTMLButtonElement>(null);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSOPGeneration = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
      toast({
        title: "Redirecting to Dashboard",
        description: "You can generate your SOP from the dashboard.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewSampleWorkflow = () => {
    setIsWorkflowModalOpen(true);
  };

  const handlePricingClick = () => {
    setIsPricingDropdownOpen(!isPricingDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pricingButtonRef.current && !pricingButtonRef.current.contains(event.target as Node)) {
        setIsPricingDropdownOpen(false);
      }
    };

    if (isPricingDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPricingDropdownOpen]);

  const workflowSteps = [
    { id: '1', title: 'Start Process', type: 'start' as const, next: ['2'] },
    { id: '2', title: 'Gather Requirements', type: 'process' as const, next: ['3'] },
    { id: '3', title: 'Quality Check?', type: 'decision' as const, next: ['4', '5'] },
    { id: '4', title: 'Approve', type: 'process' as const, next: ['6'] },
    { id: '5', title: 'Revise', type: 'process' as const, next: ['2'] },
    { id: '6', title: 'Complete', type: 'end' as const }
  ];

  const mockSOP = {
    title: "Sample Customer Onboarding Process",
    steps: [
      {
        number: 1,
        title: "Initial Contact",
        description: "Receive and acknowledge customer inquiry within 24 hours",
        details: ["Log inquiry in CRM system", "Send acknowledgment email", "Assign to appropriate team member"]
      },
      {
        number: 2,
        title: "Requirements Gathering",
        description: "Conduct detailed needs assessment with the customer",
        details: ["Schedule discovery call", "Complete needs assessment form", "Document specific requirements"]
      },
      {
        number: 3,
        title: "Proposal Creation",
        description: "Create customized proposal based on customer requirements",
        details: ["Draft initial proposal", "Review with internal team", "Send to customer for review"]
      }
    ]
  };

  const sampleFeature = {
    title: "AI-Powered Generation",
    description: "Generate comprehensive SOPs using advanced AI technology",
    details: "Our advanced AI analyzes your process description and creates detailed, professional SOPs tailored to your specific needs. The system uses natural language processing to understand your workflow and automatically structures it into clear, actionable steps.",
    example: "Simply describe your process like 'I want to create a customer onboarding workflow' and our AI will generate a complete SOP with numbered steps, detailed descriptions, and implementation guidelines."
  };

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="container mx-auto px-4 py-4 lg:py-6">
          <nav className="flex items-center justify-between">
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <img 
                src="/lovable-uploads/684a1ef7-80d1-4c48-86f8-3546b9693236.png" 
                alt="FlowForge Logo" 
                className="h-12 lg:h-16"
              />
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Button variant="ghost" onClick={() => setIsFeatureModalOpen(true)} className="text-sm lg:text-base">
                Features
              </Button>
              <div className="relative">
                <Button 
                  ref={pricingButtonRef}
                  variant="ghost" 
                  onClick={handlePricingClick}
                  className={`text-sm lg:text-base ${isPricingDropdownOpen ? "bg-accent" : ""}`}
                >
                  Pricing
                </Button>
                <PricingDropdown 
                  isOpen={isPricingDropdownOpen} 
                  onClose={() => setIsPricingDropdownOpen(false)} 
                />
              </div>
              <Button onClick={handleGetStarted} className="text-sm lg:text-base">
                {user ? "Dashboard" : "Get Started"}
              </Button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-8 lg:py-16">
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
              Turn prompts into processes —
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block lg:inline"> instantly</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into clear, actionable Standard Operating Procedures in minutes, not hours. 
              Simply describe your workflow and FlowForge creates comprehensive documentation automatically.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 lg:gap-4 max-w-md sm:max-w-none mx-auto">
              <Button 
                size="lg" 
                onClick={handleSOPGeneration} 
                disabled={isLoading}
                className="w-full sm:w-auto text-sm lg:text-base"
              >
                {isLoading ? <LoadingSpinner /> : "Generate Your First SOP"}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleViewSampleWorkflow}
                className="w-full sm:w-auto text-sm lg:text-base"
              >
                View Sample Workflow
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12 lg:mb-16">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1" onClick={() => setIsFeatureModalOpen(true)}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg lg:text-xl">
                  <span className="text-2xl mr-2" role="img" aria-label="Robot">🤖</span>
                  AI-Powered Generation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm lg:text-base">
                  Our advanced AI analyzes your process description and creates detailed, professional SOPs tailored to your specific needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1" onClick={handleViewSampleWorkflow}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg lg:text-xl">
                  <span className="text-2xl mr-2" role="img" aria-label="Chart">📊</span>
                  Visual Workflows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm lg:text-base">
                  Automatically generate flowcharts and visual representations of your processes to make complex procedures easy to understand.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1" onClick={() => setIsInteractiveWorkflowModalOpen(true)}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg lg:text-xl">
                  <span className="text-2xl mr-2" role="img" aria-label="Cycle">🔄</span>
                  Interactive Editing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm lg:text-base">
                  Edit and customize your SOPs with our intuitive interface. Add steps, modify content, and export in multiple formats.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white rounded-lg shadow-lg p-6 lg:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">Ready to Streamline Your Operations?</h2>
            <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">Join thousands of businesses already using FlowForge</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 lg:gap-4 max-w-md sm:max-w-none mx-auto">
              <Button 
                size="lg" 
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full sm:w-auto text-sm lg:text-base"
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setIsInteractiveWorkflowModalOpen(true)}
                className="w-full sm:w-auto text-sm lg:text-base"
              >
                Try Interactive Demo
              </Button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
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

        {/* Modals */}
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
        />
        <FeatureModal 
          isOpen={isFeatureModalOpen} 
          onClose={() => setIsFeatureModalOpen(false)}
          feature={sampleFeature}
        />
        <SOPModal 
          isOpen={isSOPModalOpen} 
          onClose={() => setIsSOPModalOpen(false)}
          sop={mockSOP}
        />
        <PaymentModal 
          isOpen={isPaymentModalOpen} 
          onClose={() => setIsPaymentModalOpen(false)} 
        />
        <WorkflowModal
          isOpen={isWorkflowModalOpen}
          onClose={() => setIsWorkflowModalOpen(false)}
          steps={workflowSteps}
          title="Sample Customer Onboarding Process"
        />
        <InteractiveWorkflowModal
          isOpen={isInteractiveWorkflowModalOpen}
          onClose={() => setIsInteractiveWorkflowModalOpen(false)}
          steps={workflowSteps}
          title="Interactive Demo"
        />
      </div>
    </AuthWrapper>
  );
};

export default Index;
