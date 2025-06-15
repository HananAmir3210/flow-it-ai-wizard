import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Mail, Phone, Book, Loader2, ExternalLink } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SupportTicket = Database['public']['Tables']['support_tickets']['Row'];

const SupportSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);

  const [ticket, setTicket] = useState({
    subject: '',
    category: '',
    description: '',
    priority: '',
  });

  useEffect(() => {
    if (user) {
      loadTickets();
    }
  }, [user]);

  const loadTickets = async () => {
    if (!user) return;

    try {
      setTicketsLoading(true);
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTickets(data || []);
    } catch (error: any) {
      console.error('Error loading tickets:', error);
    } finally {
      setTicketsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a ticket",
        variant: "destructive",
      });
      return;
    }

    if (!ticket.subject || !ticket.category || !ticket.priority || !ticket.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from('support_tickets')
        .insert({
          user_id: user.id,
          subject: ticket.subject,
          category: ticket.category,
          priority: ticket.priority,
          description: ticket.description,
          status: 'open'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Support ticket submitted successfully",
      });

      setTicket({
        subject: '',
        category: '',
        description: '',
        priority: '',
      });

      loadTickets();
    } catch (error: any) {
      console.error('Error submitting ticket:', error);
      toast({
        title: "Error",
        description: "Failed to submit support ticket",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openLiveChat = () => {
    toast({
      title: "Live Chat",
      description: "Live chat feature would open here in a real application",
    });
  };

  const openEmailSupport = () => {
    window.open('mailto:support@aisopgenerator.com?subject=Support Request', '_blank');
  };

  const openPhoneSupport = () => {
    toast({
      title: "Phone Support",
      description: "Phone: +1 (555) 123-4567 | Available 9 AM - 5 PM EST",
    });
  };

  const openKnowledgeBase = () => {
    toast({
      title: "Knowledge Base",
      description: "Knowledge base would open here in a real application",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
              <Button variant="outline" className="w-full justify-start" onClick={openLiveChat}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={openEmailSupport}>
                <Mail className="h-4 w-4 mr-2" />
                Email Support
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={openPhoneSupport}>
                <Phone className="h-4 w-4 mr-2" />
                Phone Support
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={openKnowledgeBase}>
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
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={ticket.subject}
                onChange={(e) => setTicket(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief description of your issue"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
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
              <Label htmlFor="priority">Priority *</Label>
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
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={ticket.description}
                onChange={(e) => setTicket(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Please provide detailed information about your issue"
                className="min-h-32"
              />
            </div>

            <Button onClick={handleSubmit} className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Submit Ticket
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Previous Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Your Support Tickets
            {ticketsLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No support tickets found</p>
              <p className="text-sm">Your submitted tickets will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((supportTicket) => (
                <div key={supportTicket.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{supportTicket.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(supportTicket.created_at)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(supportTicket.priority)}>
                        {supportTicket.priority}
                      </Badge>
                      <Badge className={getStatusColor(supportTicket.status)}>
                        {supportTicket.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Category: {supportTicket.category}
                  </p>
                  <p className="text-sm">{supportTicket.description}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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
