import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Clipboard, Repeat, Layout, Settings, CreditCard, HelpCircle, LogOut } from 'lucide-react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import MySOPs from '@/components/dashboard/MySOPs';
import VisualWorkflows from '@/components/dashboard/VisualWorkflows';
import GenerateNewSOP from '@/components/dashboard/GenerateNewSOP';
import AccountSettings from '@/components/dashboard/AccountSettings';
import BillingSection from '@/components/dashboard/BillingSection';
import SupportSection from '@/components/dashboard/SupportSection';

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
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />;
      case 'sops':
        return <MySOPs />;
      case 'workflows':
        return <VisualWorkflows />;
      case 'generate':
        return <GenerateNewSOP />;
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

  const handleLogout = () => {
    console.log('Logging out...');
    // Add smooth slide-out transition and navigate to landing page
    document.body.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    document.body.style.transform = 'translateX(100%)';
    
    setTimeout(() => {
      navigate('/');
      document.body.style.transform = 'translateX(0)';
      document.body.style.transition = '';
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background transition-all duration-500 ease-in-out">
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
              <Button variant="outline" size="sm">
                🌙 Theme
              </Button>
            </header>
            
            <main className="flex-1 p-6">
              {renderContent()}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
