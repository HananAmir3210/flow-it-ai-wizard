
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Book, HelpCircle, Send, ExternalLink } from 'lucide-react';

const SupportSection = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const faqItems = [
    {
      question: 'How do I create my first SOP?',
      answer: 'Navigate to "Generate New SOP" and describe your process. Our AI will create a comprehensive SOP for you.',
    },
    {
      question: 'Can I export my workflows?',
      answer: 'Yes! You can export workflows as PNG, PDF, or editable formats from the Visual Workflows section.',
    },
    {
      question: 'What is included in the Pro plan?',
      answer: 'Pro plan includes unlimited SOPs, advanced workflows, priority support, and export options.',
    },
    {
      question: 'How do I change my billing information?',
      answer: 'Go to Billing section and click "Update Payment Method" to modify your billing details.',
    },
  ];

  const handleSubmitTicket = () => {
    if (!ticketSubject || !ticketCategory || !ticketMessage) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Submitting support ticket:', { ticketSubject, ticketCategory, ticketMessage });
    // Implementation for ticket submission
    setTicketSubject('');
    setTicketCategory('');
    setTicketMessage('');
    alert('Support ticket submitted successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Support Center</h1>
        <p className="text-muted-foreground">Get help and find answers to your questions</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Book className="mx-auto h-8 w-8 text-blue-500 mb-3" />
            <h3 className="font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Comprehensive guides and tutorials
            </p>
            <Button variant="outline" size="sm">
              <ExternalLink size={14} className="mr-1" />
              View Docs
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageSquare className="mx-auto h-8 w-8 text-green-500 mb-3" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Chat with our support team
            </p>
            <Button variant="outline" size="sm">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <HelpCircle className="mx-auto h-8 w-8 text-purple-500 mb-3" />
            <h3 className="font-semibold mb-2">Video Tutorials</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Step-by-step video guides
            </p>
            <Button variant="outline" size="sm">
              <ExternalLink size={14} className="mr-1" />
              Watch Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Submit Ticket */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Support Ticket</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <Input
              placeholder="Brief description of your issue"
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select value={ticketCategory} onValueChange={setTicketCategory}>
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
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Please describe your issue in detail..."
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmitTicket} className="flex items-center space-x-2">
            <Send size={16} />
            <span>Submit Ticket</span>
          </Button>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h4 className="font-medium mb-2">{item.question}</h4>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Email Support</h4>
              <p className="text-sm text-muted-foreground mb-1">support@aisopgenerator.com</p>
              <p className="text-xs text-muted-foreground">Response within 24 hours</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Business Hours</h4>
              <p className="text-sm text-muted-foreground mb-1">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              <p className="text-xs text-muted-foreground">Weekend support for urgent issues</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportSection;
