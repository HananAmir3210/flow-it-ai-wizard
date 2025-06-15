
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, GitBranch, CreditCard, Clock } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Total SOPs Created',
      value: '24',
      description: '+3 this month',
      icon: FileText,
      color: 'text-blue-600',
    },
    {
      title: 'Workflows Visualized',
      value: '18',
      description: '+2 this week',
      icon: GitBranch,
      color: 'text-green-600',
    },
    {
      title: 'Active Subscriptions',
      value: '1',
      description: 'Pro Plan',
      icon: CreditCard,
      color: 'text-purple-600',
    },
    {
      title: 'Last Activity',
      value: '2 hours ago',
      description: 'Generated Marketing SOP',
      icon: Clock,
      color: 'text-orange-600',
    },
  ];

  const recentActivity = [
    {
      action: 'Created new SOP',
      title: 'Customer Onboarding Process',
      time: '2 hours ago',
      category: 'Operations',
    },
    {
      action: 'Generated workflow',
      title: 'Marketing Campaign Launch',
      time: '1 day ago',
      category: 'Marketing',
    },
    {
      action: 'Updated SOP',
      title: 'Employee Training Protocol',
      time: '3 days ago',
      category: 'HR',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Hanan 👋</h1>
        <p className="text-blue-100">
          Ready to streamline your processes? Let's create some amazing SOPs today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest SOP and workflow activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {activity.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump into your most common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium">Generate New SOP</div>
              <div className="text-sm text-muted-foreground">Create a new standard operating procedure</div>
            </button>
            <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium">Create Workflow</div>
              <div className="text-sm text-muted-foreground">Visualize your process flow</div>
            </button>
            <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium">Browse Templates</div>
              <div className="text-sm text-muted-foreground">Start from pre-built SOP templates</div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
