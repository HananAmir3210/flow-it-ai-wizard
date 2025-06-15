import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type SOPCategory = Database['public']['Enums']['sop_category'];

export const useSupabaseData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // SOPs functions
  const createSOP = async (data: {
    title: string;
    description: string;
    category: SOPCategory;
    generatedContent: string;
    tags?: string[];
    workflow_data?: any;
  }) => {
    if (!user) return { error: 'Not authenticated' };
    
    try {
      setLoading(true);
      const { data: sop, error } = await supabase
        .from('sops')
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description,
          category: data.category,
          generated_content: data.generatedContent,
          tags: data.tags || [],
          workflow_data: data.workflow_data || null
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "SOP Created",
        description: "Your SOP and workflow have been saved successfully.",
      });
      
      return { data: sop };
    } catch (error: any) {
      toast({
        title: "Error creating SOP",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const updateSOP = async (id: string, updates: any) => {
    if (!user) return { error: 'Not authenticated' };
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sops')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "SOP Updated",
        description: "Your SOP and workflow have been updated successfully.",
      });
      
      return { data };
    } catch (error: any) {
      toast({
        title: "Error updating SOP",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const deleteSOP = async (id: string) => {
    if (!user) return { error: 'Not authenticated' };
    
    try {
      setLoading(true);
      const { error } = await supabase
        .from('sops')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast({
        title: "SOP Deleted",
        description: "Your SOP has been deleted successfully.",
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Error deleting SOP",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Workflows functions
  const createWorkflow = async (data: {
    title: string;
    description: string;
    thumbnailUrl?: string;
  }) => {
    if (!user) return { error: 'Not authenticated' };
    
    try {
      setLoading(true);
      const { data: workflow, error } = await supabase
        .from('workflows')
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description,
          thumbnail_url: data.thumbnailUrl
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Workflow Created",
        description: "Your workflow has been saved successfully.",
      });
      
      return { data: workflow };
    } catch (error: any) {
      toast({
        title: "Error creating workflow",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // User profile functions
  const updateUserProfile = async (updates: any) => {
    if (!user) return { error: 'Not authenticated' };
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          ...updates
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      
      return { data };
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Billing functions
  const updateBilling = async (updates: any) => {
    if (!user) return { error: 'Not authenticated' };
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('billing')
        .upsert({
          user_id: user.id,
          ...updates
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Billing Updated",
        description: "Your billing information has been updated.",
      });
      
      return { data };
    } catch (error: any) {
      toast({
        title: "Error updating billing",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createSOP,
    updateSOP,
    deleteSOP,
    createWorkflow,
    updateUserProfile,
    updateBilling,
  };
};
