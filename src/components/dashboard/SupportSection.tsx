
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Mail, Phone, Book } from 'lucide-react';

const SupportSection = () => {
  const [ticket, setTicket] = useState({
    subject: '',
    category: '',
    description: '',
    priority: '',
  });

  const handleSubmit = () => {
    console.log('Submitting support ticket:', ticket);
    // Implement ticket submission logic
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Options */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Get Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Phone Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Book className="h-4 w-4 mr-2" />
                Knowledge Base
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="link" className="h-auto p-0 justify-start">
                Getting Started Guide
              </Button>
              <Button variant="link" className="h-auto p-0 justify-start">
                Video Tutorials
              </Button>
              <Button variant="link" className="h-auto p-0 justify-start">
                API Documentation
              </Button>
              <Button variant="link" className="h-auto p-0 justify-start">
                Community Forum
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Support Ticket Form */}
        <Card>
          <CardHeader>
            <CardTitle>Submit a Support Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={ticket.subject}
                onChange={(e) => setTicket(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief description of your issue"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={ticket.category} onValueChange={(value) => setTicket(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="billing">Billing Question</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="account">Account Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={ticket.priority} onValueChange={(value) => setTicket(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={ticket.description}
                onChange={(e) => setTicket(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Please provide detailed information about your issue"
                className="min-h-32"
              />
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Submit Ticket
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between py-2 font-medium">
              How do I generate my first SOP?
              <span className="ml-2 transform transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              To generate your first SOP, navigate to the "Generate New SOP" section, describe your process, 
              select a category, and click "Generate SOP". Our AI will create a comprehensive SOP for you.
            </p>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between py-2 font-medium">
              Can I export my SOPs to different formats?
              <span className="ml-2 transform transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes! You can export your SOPs to PDF, Word, and HTML formats. Premium users also have access 
              to custom branding options.
            </p>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between py-2 font-medium">
              How do I upgrade my subscription?
              <span className="ml-2 transform transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              You can upgrade your subscription by going to the Billing section and selecting a new plan. 
              Changes take effect immediately.
            </p>
          </details>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportSection;
