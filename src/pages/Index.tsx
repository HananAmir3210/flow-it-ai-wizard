
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Youtube } from "lucide-react";

const Index = () => {
  const [goalInput, setGoalInput] = useState("");

  const handleGenerateSOP = () => {
    console.log("Generating SOP for:", goalInput);
    // This would integrate with AI in a real implementation
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI SOP Generator
          </div>
          <div className="flex gap-4 items-center">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Turn your goal into a workflow — in seconds
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform any business goal into a detailed step-by-step SOP and visual workflow diagram. 
            Let AI handle the planning while you focus on execution.
          </p>
          
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 max-w-2xl mx-auto border border-gray-100">
            <div className="flex flex-col gap-4">
              <Input
                placeholder="e.g., automate my client onboarding process"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="text-lg py-4 px-6 border-2 focus:border-blue-500 rounded-xl"
              />
              <Button 
                onClick={handleGenerateSOP}
                className="py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Generate SOP & Workflow
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">See it in action</h2>
          <p className="text-gray-600 text-lg">Here's what you get in seconds</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* SOP Preview */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📋 Generated SOP
              </CardTitle>
              <CardDescription>Detailed step-by-step procedures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 text-sm">
                <div className="font-semibold mb-2">Client Onboarding SOP</div>
                <div className="space-y-2 text-gray-700">
                  <div>1. Initial client consultation and needs assessment</div>
                  <div>2. Send welcome package and contracts</div>
                  <div>3. Set up project management tools</div>
                  <div>4. Schedule kickoff meeting</div>
                  <div>5. Create project timeline and milestones</div>
                  <div className="text-gray-500">+ 15 more detailed steps...</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Preview */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔄 Visual Workflow
              </CardTitle>
              <CardDescription>Interactive flowchart diagram</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 h-48 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Start</div>
                  <ArrowDown className="text-gray-400" size={20} />
                  <div className="bg-white border-2 border-blue-200 px-4 py-2 rounded-lg text-sm">Consultation</div>
                  <ArrowDown className="text-gray-400" size={20} />
                  <div className="bg-white border-2 border-purple-200 px-4 py-2 rounded-lg text-sm">Setup Tools</div>
                  <div className="text-gray-500 text-xs">+ Interactive diagram</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need to systematize your business</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From goal to execution-ready workflow in one seamless process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-2">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowUp className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-xl mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">Advanced AI breaks down complex goals into actionable steps</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-2">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Youtube className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-xl mb-2">Visual Workflows</h3>
              <p className="text-gray-600">Interactive flowcharts make complex processes easy to understand</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-2">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowDown className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-xl mb-2">Export & Share</h3>
              <p className="text-gray-600">Download PDFs or share links with your team instantly</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by business owners</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="text-yellow-400 mb-2">★★★★★</div>
                <p className="text-gray-700 mb-4">"This tool saved me hours of planning. What used to take days now happens in minutes."</p>
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-sm text-gray-500">Marketing Agency Owner</div>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="text-yellow-400 mb-2">★★★★★</div>
                <p className="text-gray-700 mb-4">"The visual workflows help my team understand processes immediately. Game changer!"</p>
                <div className="font-semibold">Mike Rodriguez</div>
                <div className="text-sm text-gray-500">Operations Manager</div>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="text-yellow-400 mb-2">★★★★★</div>
                <p className="text-gray-700 mb-4">"Finally, a tool that thinks like I do but works 100x faster. Incredible."</p>
                <div className="font-semibold">Emma Thompson</div>
                <div className="text-sm text-gray-500">Consultant</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-600 text-lg">Start free, scale when you're ready</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 p-8">
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription>Perfect for trying out the platform</CardDescription>
                <div className="text-4xl font-bold">$0<span className="text-lg text-gray-500">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li>✓ 5 SOPs per month</li>
                  <li>✓ Basic workflows</li>
                  <li>✓ PDF export</li>
                  <li>✓ Email support</li>
                </ul>
                <Button className="w-full" variant="outline">Get Started Free</Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-500 p-8 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">Most Popular</Badge>
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription>For growing teams and businesses</CardDescription>
                <div className="text-4xl font-bold">$29<span className="text-lg text-gray-500">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li>✓ Unlimited SOPs</li>
                  <li>✓ Advanced workflows</li>
                  <li>✓ Team collaboration</li>
                  <li>✓ Priority support</li>
                  <li>✓ Custom branding</li>
                </ul>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Start Pro Trial</Button>
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
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
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
    </div>
  );
};

export default Index;
