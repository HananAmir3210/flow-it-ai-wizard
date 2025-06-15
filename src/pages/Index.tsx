import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AuthModal from "@/components/AuthModal";
import FeatureModal from "@/components/FeatureModal";
import ProfileModal from "@/components/ProfileModal";
import SOPModal from "@/components/SOPModal";
import PaymentModal from "@/components/PaymentModal";
import WorkflowModal from "@/components/WorkflowModal";
import InteractiveWorkflowModal from "@/components/InteractiveWorkflowModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSOPModalOpen, setIsSOPModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isInteractiveWorkflowModalOpen, setIsInteractiveWorkflowModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  const handleDashboardNavigation = () => {
    // Add slide-in transition and navigate to dashboard
    document.body.style.transition = 'transform 0.3s ease-out';
    document.body.style.transform = 'translateX(-100%)';
    
    setTimeout(() => {
      navigate('/dashboard');
      document.body.style.transform = 'translateX(0)';
    }, 300);
  };

  const handleSOPGeneration = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSOPModalOpen(true);
    toast({
      title: "SOP Generated!",
      description: "Your Standard Operating Procedure has been created successfully.",
    });
  };

  const workflowSteps = [
    { id: '1', title: 'Start Process', type: 'start' as const, next: ['2'] },
    { id: '2', title: 'Gather Requirements', type: 'process' as const, next: ['3'] },
    { id: '3', title: 'Quality Check?', type: 'decision' as const, next: ['4', '5'] },
    { id: '4', title: 'Approve', type: 'process' as const, next: ['6'] },
    { id: '5', title: 'Revise', type: 'process' as const, next: ['2'] },
    { id: '6', title: 'Complete', type: 'end' as const }
  ];

  // Mock data for modals
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg"
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-transform duration-300 ease-out">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">AI SOP Generator</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setIsFeatureModalOpen(true)}>
              Features
            </Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost" onClick={() => setIsProfileModalOpen(true)}>
              Profile
            </Button>
            <Button variant="outline" onClick={handleDashboardNavigation}>
              Dashboard
            </Button>
            <Button onClick={handleGetStarted}>Get Started</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Create Professional SOPs with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> AI Power</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your business processes into clear, actionable Standard Operating Procedures in minutes, not hours. 
            Our AI understands your workflow and creates comprehensive documentation automatically.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={handleSOPGeneration} disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : "Generate Your First SOP"}
            </Button>
            <Button size="lg" variant="outline" onClick={() => setIsWorkflowModalOpen(true)}>
              View Sample Workflow
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-2">🤖</span>
                AI-Powered Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our advanced AI analyzes your process description and creates detailed, professional SOPs tailored to your specific needs.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-2">📊</span>
                Visual Workflows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Automatically generate flowcharts and visual representations of your processes to make complex procedures easy to understand.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-2">🔄</span>
                Interactive Editing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Edit and customize your SOPs with our intuitive interface. Add steps, modify content, and export in multiple formats.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Streamline Your Operations?</h2>
          <p className="text-gray-600 mb-6">Join thousands of businesses already using AI SOP Generator</p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={() => setIsPaymentModalOpen(true)}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => setIsInteractiveWorkflowModalOpen(true)}>
              Try Interactive Demo
            </Button>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={(email, password) => {
          console.log('Login:', email, password);
          setIsAuthModalOpen(false);
        }}
        onSignup={(name, email, password) => {
          console.log('Signup:', name, email, password);
          setIsAuthModalOpen(false);
        }}
      />
      <FeatureModal 
        isOpen={isFeatureModalOpen} 
        onClose={() => setIsFeatureModalOpen(false)}
        feature={sampleFeature}
      />
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)}
        user={mockUser}
        isDarkMode={false}
        onToggleDarkMode={() => console.log('Toggle dark mode')}
        onLogout={() => console.log('Logout')}
        onViewAccount={() => console.log('View account')}
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
  );
};

export default Index;
