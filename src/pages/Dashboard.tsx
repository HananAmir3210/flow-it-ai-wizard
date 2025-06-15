
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Clipboard, Repeat, Layout, Settings, CreditCard, HelpCircle, LogOut, Moon, Sun, User } from 'lucide-react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import MySOPs from '@/components/dashboard/MySOPs';
import VisualWorkflows from '@/components/dashboard/VisualWorkflows';
import GenerateNewSOP from '@/components/dashboard/GenerateNewSOP';
import AccountSettings from '@/components/dashboard/AccountSettings';
import BillingSection from '@/components/dashboard/BillingSection';
import SupportSection from '@/components/dashboard/SupportSection';
import ProfileModal from '@/components/ProfileModal';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  { id: 'overview', label: 'Dashboard Overview', icon: Home },
  { id: 'sops', label: 'My SOPs', icon: Clipboard },
  { id: 'workflows', label: 'Visual Workflows', icon: Repeat },
  { id: 'generate', label: 'Generate New SOP', icon: Layout },
  { id: 'settings', label: 'Account Settings', icon: Settings },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'support', label: 'Support', icon: HelpCircle },
];

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const mockUser = {
    name: "Hanan",
    email: "hanan@example.com"
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview onNavigate={setActiveSection} />;
      case 'sops':
        return <MySOPs />;
      case 'workflows':
        return <VisualWorkflows />;
      case 'generate':
        return <GenerateNewSOP onSOPCreated={() => setActiveSection('sops')} />;
      case 'settings':
        return <AccountSettings />;
      case 'billing':
        return <BillingSection />;
      case 'support':
        return <SupportSection />;
      default:
        return <DashboardOverview onNavigate={setActiveSection} />;
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
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
          <Sidebar className="border-r">
            <SidebarHeader className="border-b p-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-primary"></div>
                <span className="font-semibold">AI SOP Generator</span>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => setActiveSection(item.id)}
                      isActive={activeSection === item.id}
                      className="w-full justify-start"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleLogout}
                    className="w-full justify-start text-destructive hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-2 border-b bg-background px-4">
              <SidebarTrigger />
              <div className="flex-1" />
              <div className="text-sm text-muted-foreground hidden sm:block">
                Welcome back, Hanan 👋
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsProfileModalOpen(true)}>
                <User className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Profile</span>
              </Button>
              <Button variant="outline" size="sm" onClick={toggleTheme}>
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="ml-2 hidden sm:inline">Theme</span>
              </Button>
            </header>
            
            <main className="flex-1 p-4 md:p-6 overflow-auto">
              {renderContent()}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={mockUser}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleTheme}
        onLogout={handleLogout}
        onViewAccount={() => setActiveSection('settings')}
      />
    </div>
  );
};

export default Dashboard;
