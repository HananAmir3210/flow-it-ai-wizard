
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, CreditCard, Lock, Link2, LogOut } from 'lucide-react';
import ProfileSection from '@/components/account/ProfileSection';
import BillingSection from '@/components/account/BillingSection';
import SecuritySection from '@/components/account/SecuritySection';
import ConnectedAccountsSection from '@/components/account/ConnectedAccountsSection';
import AccountActionsSection from '@/components/account/AccountActionsSection';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'connected', label: 'Connected', icon: Link2 },
    { id: 'account', label: 'Account', icon: LogOut },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your account preferences and settings
          </p>
        </div>

        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Desktop Tabs */}
              <div className="hidden md:block border-b border-gray-200 dark:border-gray-700">
                <TabsList className="grid w-full grid-cols-5 h-auto p-0 bg-transparent">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex items-center gap-2 py-4 px-6 text-sm font-medium data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                    >
                      <tab.icon size={16} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Mobile Dropdown */}
              <div className="md:hidden border-b border-gray-200 dark:border-gray-700 p-4">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {tabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                      {tab.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-6">
                <TabsContent value="profile" className="mt-0">
                  <ProfileSection />
                </TabsContent>

                <TabsContent value="billing" className="mt-0">
                  <BillingSection />
                </TabsContent>

                <TabsContent value="security" className="mt-0">
                  <SecuritySection />
                </TabsContent>

                <TabsContent value="connected" className="mt-0">
                  <ConnectedAccountsSection />
                </TabsContent>

                <TabsContent value="account" className="mt-0">
                  <AccountActionsSection />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;
