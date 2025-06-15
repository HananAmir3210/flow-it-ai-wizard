
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, FileText, Workflow, TrendingUp, Plus, Eye } from 'lucide-react';

interface DashboardOverviewProps {
  onNavigate?: (section: string) => void;
}

const DashboardOverview = ({ onNavigate }: DashboardOverviewProps) => {
  const stats = [
    {
      title: "Total SOPs",
      value: "12",
      description: "+2 from last month",
      icon: FileText,
      trend: "up"
    },
    {
      title: "Workflows Created", 
      value: "8",
      description: "+1 from last week",
      icon: Workflow,
      trend: "up"
    },
    {
      title: "Active Projects",
      value: "5",
      description: "3 pending review",
      icon: Activity,
      trend: "neutral"
    },
    {
      title: "Efficiency Gain",
      value: "45%",
      description: "Time saved this month",
      icon: TrendingUp,
      trend: "up"
    }
  ];

  const quickActions = [
    {
      title: "Generate New SOP",
      description: "Create a new Standard Operating Procedure",
      action: () => onNavigate?.('generate'),
      icon: Plus,
      color: "bg-blue-500"
    },
    {
      title: "View My SOPs",
      description: "Browse and manage your existing SOPs",
      action: () => onNavigate?.('sops'),
      icon: Eye,
      color: "bg-green-500"
    },
    {
      title: "Create Workflow",
      description: "Design a new visual workflow",
      action: () => onNavigate?.('workflows'),
      icon: Workflow,
      color: "bg-purple-500"
    }
  ];

  const recentActivity = [
    { action: "Created SOP", item: "Customer Support Protocol", time: "2 hours ago" },
    { action: "Updated workflow", item: "Onboarding Process", time: "1 day ago" },
    { action: "Exported SOP", item: "Quality Assurance Checklist", time: "2 days ago" },
    { action: "Generated SOP", item: "Marketing Campaign Setup", time: "3 days ago" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your SOPs.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-muted-foreground'}`}>
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into your most common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Card key={action.title} className="cursor-pointer hover:shadow-md transition-shadow" onClick={action.action}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <span className="font-medium">{activity.action}</span>
                    <span className="text-muted-foreground"> "{activity.item}"</span>
                  </div>
                  <span className="text-muted-foreground text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Tips to maximize your productivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-1">💡 Pro Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Use detailed descriptions when generating SOPs for better AI results.
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-1">🎯 Best Practice</h4>
                <p className="text-sm text-muted-foreground">
                  Organize your SOPs by categories to find them quickly later.
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-1">🚀 Feature Update</h4>
                <p className="text-sm text-muted-foreground">
                  New visual workflow designer is now available!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
