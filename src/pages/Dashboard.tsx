

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Clipboard, Layout, Settings, CreditCard, HelpCircle, LogOut, Moon, Sun, User } from 'lucide-react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import MySOPs from '@/components/dashboard/MySOPs';
import GenerateNewSOP from '@/components/dashboard/GenerateNewSOP';
import AccountSettings from '@/components/dashboard/AccountSettings';
import BillingSection from '@/components/dashboard/BillingSection';
import SupportSection from '@/components/dashboard/SupportSection';
import ProfileModal from '@/components/ProfileModal';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import type { Database } from '@/integrations/supabase/types';

type SOP = Database['public']['Tables']['sops']['Row'];

const menuItems = [
  { id: 'overview', label: 'Dashboard Overview', icon: Home },
  { id: 'sops', label: 'My SOPs', icon: Clipboard },
  { id: 'generate', label: 'Generate SOP & Workflow', icon: Layout },
  { id: 'settings', label: 'Account Settings', icon: Settings },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'support', label: 'Support', icon: HelpCircle },
];

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingSOP, setEditingSOP] = useState<SOP | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut, user } = useAuth();

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <DashboardOverview 
            onNavigateToSOPs={() => setActiveSection('sops')}
            onNavigateToGenerate={() => setActiveSection('generate')}
            onNavigateToWorkflows={() => setActiveSection('generate')}
          />
        );
      case 'sops':
        return (
          <MySOPs 
            onEdit={(sop) => {
              setEditingSOP(sop);
              setActiveSection('generate');
            }}
          />
        );
      case 'generate':
        return (
          <GenerateNewSOP 
            editingSOP={editingSOP}
            onSOPCreated={() => setActiveSection('sops')}
            onClearEdit={() => setEditingSOP(null)}
          />
        );
      case 'settings':
        return <AccountSettings />;
      case 'billing':
        return <BillingSection />;
      case 'support':
        return <SupportSection />;
      default:
        return <DashboardOverview />;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    toast({
      title: `${isDarkMode ? 'Light' : 'Dark'} mode activated`,
      description: `Switched to ${isDarkMode ? 'light' : 'dark'} theme.`,
    });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-background'}`}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar className="border-r hidden md:block">
            <SidebarHeader className="border-b p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded bg-primary"></div>
                <span className="font-semibold text-sm sm:text-base truncate">AI SOP Generator</span>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => {
                        setActiveSection(item.id);
                        if (item.id !== 'generate') {
                          setEditingSOP(null);
                        }
                      }}
                      isActive={activeSection === item.id}
                      className="w-full justify-start text-sm sm:text-base"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="truncate">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleLogout}
                    className="w-full justify-start text-destructive hover:text-destructive text-sm sm:text-base"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1">
            <header className="sticky top-0 z-10 flex h-14 sm:h-16 items-center gap-2 border-b bg-background px-3 sm:px-4">
              <SidebarTrigger className="md:hidden" />
              <div className="flex-1" />
              <div className="text-xs sm:text-sm text-muted-foreground hidden lg:block">
                Welcome back, {user?.email?.split('@')[0] || 'User'} 👋
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsProfileModalOpen(true)}
                className={`text-xs sm:text-sm btn-touch ${isDarkMode ? 'text-gray-300 hover:text-white' : ''}`}
              >
                <User className="h-4 w-4" />
                <span className="ml-1 sm:ml-2 hidden sm:inline">Profile</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleTheme}
                className={`text-xs sm:text-sm btn-touch ${isDarkMode ? 'text-gray-300 hover:text-white' : ''}`}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className={`ml-1 sm:ml-2 hidden lg:inline ${isDarkMode ? 'text-gray-300' : ''}`}>
                  {isDarkMode ? 'Light' : 'Dark'} Mode
                </span>
              </Button>
            </header>
            
            <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
              {renderContent()}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={{ name: user?.email?.split('@')[0] || 'User', email: user?.email || '' }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleTheme}
        onLogout={handleLogout}
        onViewAccount={() => {
          setActiveSection('settings');
          setIsProfileModalOpen(false);
        }}
      />
    </div>
  );
};

export default Dashboard;
