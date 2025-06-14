
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Chrome, Slack, Link2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ConnectedAccountsSection = () => {
  const { toast } = useToast();
  const [connections, setConnections] = useState([
    { id: 'github', name: 'GitHub', icon: Github, connected: true, email: 'john.doe@github.com' },
    { id: 'google', name: 'Google', icon: Chrome, connected: true, email: 'john.doe@gmail.com' },
    { id: 'slack', name: 'Slack', icon: Slack, connected: false, email: null },
  ]);

  const handleConnect = async (serviceId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConnections(prev => 
        prev.map(conn => 
          conn.id === serviceId 
            ? { ...conn, connected: true, email: `john.doe@${serviceId}.com` }
            : conn
        )
      );
      toast({
        title: 'Account connected',
        description: `Successfully connected your ${connections.find(c => c.id === serviceId)?.name} account.`,
      });
    } catch (error) {
      toast({
        title: 'Connection failed',
        description: 'Failed to connect account. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDisconnect = async (serviceId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConnections(prev => 
        prev.map(conn => 
          conn.id === serviceId 
            ? { ...conn, connected: false, email: null }
            : conn
        )
      );
      toast({
        title: 'Account disconnected',
        description: `Successfully disconnected your ${connections.find(c => c.id === serviceId)?.name} account.`,
      });
    } catch (error) {
      toast({
        title: 'Disconnection failed',
        description: 'Failed to disconnect account. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Connected Accounts
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your connected accounts and integrations.
        </p>
      </div>

      {/* Connected Services */}
      <div className="space-y-4">
        {connections.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <service.icon size={20} className="text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    {service.connected && service.email ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Connected as {service.email}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Not connected
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {service.connected ? (
                    <>
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <Check size={16} />
                        <span className="text-sm font-medium">Connected</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(service.id)}
                      >
                        <X size={14} className="mr-1" />
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConnect(service.id)}
                    >
                      <Link2 size={14} className="mr-1" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Integration */}
      <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Link2 size={24} className="text-gray-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            Add New Integration
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Connect more services to enhance your workflow
          </p>
          <Button variant="outline" size="sm">
            Browse Integrations
          </Button>
        </CardContent>
      </Card>

      {/* Integration Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Why Connect Accounts?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              Single sign-on for faster login
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              Sync data across platforms
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              Enhanced collaboration features
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              Streamlined workflow automation
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectedAccountsSection;
