
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2, CreditCard, Calendar, RefreshCw, AlertCircle } from 'lucide-react';
import { useBilling } from '@/hooks/useBilling';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: ['5 SOPs per month', 'Basic workflows', 'Email support'],
    priceId: null,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    features: ['Unlimited SOPs', 'Advanced workflows', 'Priority support', 'Team collaboration'],
    priceId: 'mock_pro_price',
  },
  {
    name: 'Team',
    price: '$99',
    period: '/month',
    features: ['Everything in Pro', 'Admin controls', 'Advanced analytics', 'Custom integrations'],
    priceId: 'mock_team_price',
  },
];

const BillingSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { billingData, loading, checkSubscription, createCheckout, openCustomerPortal } = useBilling();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, [user]);

  const loadInvoices = async () => {
    if (!user) return;

    try {
      setLoadingInvoices(true);
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', user.id)
        .order('invoice_date', { ascending: false })
        .limit(5);

      if (error) throw error;
      setInvoices(data || []);
    } catch (error: any) {
      console.error('Error loading invoices:', error);
    } finally {
      setLoadingInvoices(false);
    }
  };

  const handlePlanUpgrade = (planName: string, priceId: string | null) => {
    if (!priceId) {
      toast({
        title: "Free Plan",
        description: "You're already on the free plan!",
      });
      return;
    }

    createCheckout(planName, priceId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCurrentPlanData = () => {
    return plans.find(plan => plan.name === billingData.plan) || plans[0];
  };

  const currentPlan = getCurrentPlanData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <Button
          variant="outline"
          onClick={checkSubscription}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Status
        </Button>
      </div>

      {/* Mock Payment Notice */}
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-200">Demo Mode</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This is a demonstration billing system. No real payments are processed. 
                In production, this would integrate with payment providers like Stripe, PayPal, or local payment gateways.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Current Plan
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{currentPlan.name} Plan</h3>
              <p className="text-muted-foreground">
                {currentPlan.price}{currentPlan.period}
                {billingData.subscription_end && billingData.subscribed && (
                  <span> • Renews on {formatDate(billingData.subscription_end)}</span>
                )}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Status: <span className="capitalize">{billingData.status}</span>
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant={billingData.subscribed ? "default" : "secondary"}>
                {billingData.subscribed ? 'Active' : 'Inactive'}
              </Badge>
              {billingData.subscribed && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openCustomerPortal}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrent = plan.name === billingData.plan;
            return (
              <Card key={plan.name} className={isCurrent ? 'border-primary' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    {isCurrent && <Badge>Current</Badge>}
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={isCurrent ? "outline" : "default"} 
                    className="w-full"
                    disabled={isCurrent || loading}
                    onClick={() => handlePlanUpgrade(plan.name, plan.priceId)}
                  >
                    {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    {isCurrent ? 'Current Plan' : 'Subscribe'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Payment Method - Only show if subscribed */}
      {billingData.subscribed && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  DEMO
                </div>
                <div>
                  <p className="font-medium">
                    {billingData.payment_method_last4 ? 
                      `•••• •••• •••• ${billingData.payment_method_last4}` : 
                      'Demo payment method'
                    }
                  </p>
                  {billingData.payment_method_expiry && (
                    <p className="text-sm text-muted-foreground">
                      Expires {billingData.payment_method_expiry}
                    </p>
                  )}
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={openCustomerPortal}
                disabled={loading}
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Invoice History
            {loadingInvoices && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No invoices found</p>
              <p className="text-sm">Your invoice history will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{invoice.invoice_number}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(invoice.invoice_date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">${(invoice.amount / 100).toFixed(2)}</span>
                    <Badge variant="outline">{invoice.status}</Badge>
                    {invoice.download_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(invoice.download_url, '_blank')}
                      >
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSection;
