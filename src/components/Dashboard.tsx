
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu, X, Home, FileText, GitBranch, Lightbulb, Settings, CreditCard, Phone, LogOut } from 'lucide-react';
import DashboardOverview from './dashboard/DashboardOverview';
import MySOPs from './dashboard/MySOPs';
import VisualWorkflows from './dashboard/VisualWorkflows';
import GenerateNewSOP from './dashboard/GenerateNewSOP';
import AccountSettings from './dashboard/AccountSettings';
import BillingSection from './dashboard/BillingSection';
import SupportSection from './dashboard/SupportSection';

type DashboardSection = 'overview' | 'sops' | 'workflows' | 'generate' | 'settings' | 'billing' | 'support';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = [
    { id: 'overview', label: 'Dashboard', icon: Home },
    { id: 'sops', label: 'My SOPs', icon: FileText },
    { id: 'workflows', label: 'Visual Workflows', icon: GitBranch },
    { id: 'generate', label: 'Generate New SOP', icon: Lightbulb },
    { id: 'settings', label: 'Account Settings', icon: Settings },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'support', label: 'Support', icon: Phone },
  ];

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                AI SOP Generator
              </h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                className={`w-full justify-start ${!sidebarOpen ? 'px-2' : ''}`}
                onClick={() => setActiveSection(item.id as DashboardSection)}
              >
                <Icon size={20} className={sidebarOpen ? 'mr-3' : ''} />
                {sidebarOpen && <span>{item.label}</span>}
              </Button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className={`w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 ${!sidebarOpen ? 'px-2' : ''}`}
          >
            <LogOut size={20} className={sidebarOpen ? 'mr-3' : ''} />
            {sidebarOpen && <span>Log Out</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} />
          </Button>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
