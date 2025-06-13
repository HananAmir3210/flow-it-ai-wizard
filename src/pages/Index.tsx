
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Youtube, Menu, X, User } from "lucide-react";
import { generateSOPFromPrompt, SOPResponse } from "@/utils/openai";
import WorkflowVisualization from "@/components/WorkflowVisualization";
import WorkflowModal from "@/components/WorkflowModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const [goalInput, setGoalInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<SOPResponse | null>(null);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Refs for smooth scrolling
  const featuresRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  // Load prompt history from localStorage on component mount
  React.useEffect(() => {
    const history = localStorage.getItem('prompt-history');
    if (history) {
      setPromptHistory(JSON.parse(history));
    }
  }, []);

  const handleGenerateSOP = async () => {
    if (!goalInput.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await generateSOPFromPrompt(goalInput);
      setGeneratedContent(response);
      
      // Save to prompt history
      const newHistory = [goalInput, ...promptHistory.slice(0, 9)]; // Keep last 10
      setPromptHistory(newHistory);
      localStorage.setItem('prompt-history', JSON.stringify(newHistory));
      
    } catch (error) {
      console.error('Error generating SOP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogin = (email: string, password: string) => {
    // Placeholder login logic
    console.log('Login:', email, password);
    setUser({ name: email.split('@')[0], email });
  };

  const handleSignup = (email: string, password: string, confirmPassword: string) => {
    // Placeholder signup logic
    console.log('Signup:', email, password, confirmPassword);
    setUser({ name: email.split('@')[0], email });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI SOP Generator
          </div>
          <div className="flex gap-4 items-center">
            <Button 
              variant="ghost"
              onClick={() => scrollToSection(featuresRef)}
              className="dark:text-gray-300 dark:hover:text-white"
            >
              Features
            </Button>
            <Button 
              variant="ghost"
              onClick={() => scrollToSection(pricingRef)}
              className="dark:text-gray-300 dark:hover:text-white"
            >
              Pricing
            </Button>
            <Button onClick={() => scrollToSection(promptRef)}>
              Get Started
            </Button>
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <User size={16} />
                  <span className="text-sm dark:text-gray-300">{user.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setIsAuthModalOpen(true)}>
                Login / Sign Up
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-gray-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
            Turn your goal into a workflow — in seconds
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform any business goal into a detailed step-by-step SOP and visual workflow diagram. 
            Let AI handle the planning while you focus on execution.
          </p>
          
          {/* Input Section */}
          <div ref={promptRef} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16 max-w-2xl mx-auto border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col gap-4">
              <Input
                placeholder="e.g., automate my client onboarding process"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="text-lg py-4 px-6 border-2 focus:border-blue-500 rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && handleGenerateSOP()}
              />
              <Button 
                onClick={handleGenerateSOP}
                disabled={!goalInput.trim() || isLoading}
                className="py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? "Generating..." : "Generate SOP & Workflow"}
              </Button>
              
              {/* Prompt History */}
              {promptHistory.length > 0 && (
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Recent prompts:</p>
                  <div className="flex flex-wrap gap-2">
                    {promptHistory.slice(0, 3).map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setGoalInput(prompt)}
                        className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors dark:text-gray-300"
                      >
                        {prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Generated Content Section */}
      {(isLoading || generatedContent) && (
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">Your Generated Content</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Here's your AI-generated SOP and workflow</p>
          </div>
          
          {isLoading ? (
            <LoadingSpinner message="AI is crafting your SOP and workflow..." />
          ) : generatedContent && (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Generated SOP */}
              <Card className="border-2 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    📋 {generatedContent.sop.title}
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">AI-generated step-by-step procedure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-sm max-h-96 overflow-y-auto">
                    <div className="space-y-4">
                      {generatedContent.sop.steps.map((step) => (
                        <div key={step.number} className="border-l-4 border-blue-500 pl-4">
                          <div className="font-semibold text-gray-900 dark:text-gray-100">
                            {step.number}. {step.title}
                          </div>
                          <div className="text-gray-700 dark:text-gray-300 mt-1">{step.description}</div>
                          {step.details && (
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-xs mt-2 ml-2">
                              {step.details.map((detail, idx) => (
                                <li key={idx}>{detail}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      📄 Export PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      🔗 Share Link
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Generated Workflow */}
              <Card className="border-2 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    🔄 Visual Workflow
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">Interactive flowchart diagram</CardDescription>
                </CardHeader>
                <CardContent>
                  <WorkflowVisualization 
                    steps={generatedContent.workflow} 
                    isPreview={true}
                    onStartClick={() => setIsWorkflowModalOpen(true)}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      )}

      {/* Preview Section (original static content) */}
      {!generatedContent && !isLoading && (
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">See it in action</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Here's what you get in seconds</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* SOP Preview */}
            <Card className="border-2 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  📋 Generated SOP
                </CardTitle>
                <CardDescription className="dark:text-gray-300">Detailed step-by-step procedures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-sm">
                  <div className="font-semibold mb-2 dark:text-gray-100">Client Onboarding SOP</div>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <div>1. Initial client consultation and needs assessment</div>
                    <div>2. Send welcome package and contracts</div>
                    <div>3. Set up project management tools</div>
                    <div>4. Schedule kickoff meeting</div>
                    <div>5. Create project timeline and milestones</div>
                    <div className="text-gray-500 dark:text-gray-400">+ 15 more detailed steps...</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Workflow Preview */}
            <Card className="border-2 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  🔄 Visual Workflow
                </CardTitle>
                <CardDescription className="dark:text-gray-300">Interactive flowchart diagram</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg p-4 h-48 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Start</div>
                    <ArrowDown className="text-gray-400" size={20} />
                    <div className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-400 px-4 py-2 rounded-lg text-sm dark:text-gray-200">Consultation</div>
                    <ArrowDown className="text-gray-400" size={20} />
                    <div className="bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-400 px-4 py-2 rounded-lg text-sm dark:text-gray-200">Setup Tools</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">+ Interactive diagram</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section ref={featuresRef} className="bg-white dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">Everything you need to systematize your business</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              From goal to execution-ready workflow in one seamless process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-2 dark:bg-gray-800 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowUp className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="font-semibold text-xl mb-2 dark:text-white">AI-Powered Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">Advanced AI breaks down complex goals into actionable steps</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-2 dark:bg-gray-800 dark:border-gray-700">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Youtube className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="font-semibold text-xl mb-2 dark:text-white">Visual Workflows</h3>
              <p className="text-gray-600 dark:text-gray-300">Interactive flowcharts make complex processes easy to understand</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-2 dark:bg-gray-800 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowDown className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h3 className="font-semibold text-xl mb-2 dark:text-white">Export & Share</h3>
              <p className="text-gray-600 dark:text-gray-300">Download PDFs or share links with your team instantly</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">Loved by business owners</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="pt-0">
                <div className="text-yellow-400 mb-2">★★★★★</div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">"This tool saved me hours of planning. What used to take days now happens in minutes."</p>
                <div className="font-semibold dark:text-white">Sarah Chen</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Marketing Agency Owner</div>
              </CardContent>
            </Card>
            
            <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="pt-0">
                <div className="text-yellow-400 mb-2">★★★★★</div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">"The visual workflows help my team understand processes immediately. Game changer!"</p>
                <div className="font-semibold dark:text-white">Mike Rodriguez</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Operations Manager</div>
              </CardContent>
            </Card>
            
            <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="pt-0">
                <div className="text-yellow-400 mb-2">★★★★★</div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">"Finally, a tool that thinks like I do but works 100x faster. Incredible."</p>
                <div className="font-semibold dark:text-white">Emma Thompson</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Consultant</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section ref={pricingRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">Simple, transparent pricing</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Start free, scale when you're ready</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 p-8 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl dark:text-white">Free</CardTitle>
                <CardDescription className="dark:text-gray-300">Perfect for trying out the platform</CardDescription>
                <div className="text-4xl font-bold dark:text-white">$0<span className="text-lg text-gray-500 dark:text-gray-400">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8 dark:text-gray-300">
                  <li>✓ 5 SOPs per month</li>
                  <li>✓ Basic workflows</li>
                  <li>✓ PDF export</li>
                  <li>✓ Email support</li>
                </ul>
                <Button className="w-full" variant="outline" onClick={() => scrollToSection(promptRef)}>
                  Get Started Free
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-500 p-8 relative dark:bg-gray-800 dark:border-blue-400">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">Most Popular</Badge>
              <CardHeader>
                <CardTitle className="text-2xl dark:text-white">Pro</CardTitle>
                <CardDescription className="dark:text-gray-300">For growing teams and businesses</CardDescription>
                <div className="text-4xl font-bold dark:text-white">$29<span className="text-lg text-gray-500 dark:text-gray-400">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8 dark:text-gray-300">
                  <li>✓ Unlimited SOPs</li>
                  <li>✓ Advanced workflows</li>
                  <li>✓ Team collaboration</li>
                  <li>✓ Priority support</li>
                  <li>✓ Custom branding</li>
                </ul>
                <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={() => scrollToSection(promptRef)}>
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to systematize your business?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of business owners who've streamlined their operations</p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
            onClick={() => scrollToSection(promptRef)}
          >
            Start Building Workflows Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">AI SOP Generator</div>
            <p className="text-gray-400 mb-4">Transform goals into workflows with AI</p>
            <div className="text-sm text-gray-400">© 2024 AI SOP Generator. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* Workflow Modal */}
      {generatedContent && (
        <WorkflowModal
          isOpen={isWorkflowModalOpen}
          onClose={() => setIsWorkflowModalOpen(false)}
          steps={generatedContent.workflow}
          title={generatedContent.sop.title}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
};

export default Index;
