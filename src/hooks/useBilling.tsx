
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface BillingData {
  subscribed: boolean;
  plan: string;
  status: string;
  subscription_end?: string;
  payment_method_last4?: string;
  payment_method_expiry?: string;
}

export const useBilling = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [billingData, setBillingData] = useState<BillingData>({
    subscribed: false,
    plan: 'Free',
    status: 'inactive'
  });
  const [loading, setLoading] = useState(false);

  const checkSubscription = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Mock subscription check - simulate checking a local database
      const { data: mockData, error } = await supabase
        .from('billing')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      const currentBilling = mockData || {
        current_plan: 'Free',
        subscription_status: 'inactive',
        plan_end_date: null
      };
      
      setBillingData({
        subscribed: currentBilling.subscription_status === 'active',
        plan: currentBilling.current_plan || 'Free',
        status: currentBilling.subscription_status || 'inactive',
        subscription_end: currentBilling.plan_end_date,
        payment_method_last4: currentBilling.subscription_status === 'active' ? '4242' : undefined,
        payment_method_expiry: currentBilling.subscription_status === 'active' ? '12/28' : undefined
      });
    } catch (error: any) {
      console.error('Error checking subscription:', error);
      toast({
        title: "Error checking subscription",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCheckout = async (planName: string, priceId: string | null) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a plan.",
        variant: "destructive",
      });
      return;
    }

    if (!priceId) {
      toast({
        title: "Free Plan Selected",
        description: "You're already on the free plan!",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Mock payment simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update billing in database with proper type casting
      const subscriptionEnd = new Date();
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);
      
      // Ensure planName matches the expected enum type
      const validPlan = planName as 'Free' | 'Pro' | 'Team';
      
      const { error } = await supabase
        .from('billing')
        .upsert({
          user_id: user.id,
          current_plan: validPlan,
          subscription_status: 'active',
          plan_end_date: subscriptionEnd.toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      
      // Update local state
      setBillingData({
        subscribed: true,
        plan: planName,
        status: 'active',
        subscription_end: subscriptionEnd.toISOString(),
        payment_method_last4: '4242',
        payment_method_expiry: '12/28'
      });
      
      toast({
        title: "Subscription Activated!",
        description: `You've successfully subscribed to the ${planName} plan.`,
      });
    } catch (error: any) {
      console.error('Error creating subscription:', error);
      toast({
        title: "Error creating subscription",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openCustomerPortal = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Mock portal - simulate cancelling subscription
      const { error } = await supabase
        .from('billing')
        .update({
          subscription_status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setBillingData(prev => ({
        ...prev,
        subscribed: false,
        status: 'cancelled',
        plan: 'Free'
      }));
      
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription has been cancelled. You can resubscribe anytime.",
      });
    } catch (error: any) {
      console.error('Error managing subscription:', error);
      toast({
        title: "Error managing subscription",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

  return {
    billingData,
    loading,
    checkSubscription,
    createCheckout,
    openCustomerPortal
  };
};
