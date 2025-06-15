
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, FileText, GitBranch, Clock, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalSOPs: number;
  workflowsCreated: number;
  activeProjects: number;
  efficiencyGain: number;
}

interface RecentActivity {
  id: string;
  action: string;
  timestamp: string;
  item: string;
}

interface DashboardOverviewProps {
  onNavigateToSOPs?: () => void;
  onNavigateToGenerate?: () => void;
  onNavigateToWorkflows?: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigateToSOPs,
  onNavigateToGenerate,
  onNavigateToWorkflows
}) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalSOPs: 0,
    workflowsCreated: 0,
    activeProjects: 0,
    efficiencyGain: 24
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const chartData = [
    { name: 'Jan', SOPs: 12, Workflows: 8 },
    { name: 'Feb', SOPs: 19, Workflows: 12 },
    { name: 'Mar', SOPs: 24, Workflows: 15 },
    { name: 'Apr', SOPs: 31, Workflows: 18 },
    { name: 'May', SOPs: 28, Workflows: 22 },
    { name: 'Jun', SOPs: 35, Workflows: 25 },
  ];

  useEffect(() => {
    if (user) {
      fetchDashboardData();
      
      // Set up real-time subscriptions
      const sopsChannel = supabase
        .channel('sops_changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'sops', filter: `user_id=eq.${user.id}` },
          () => fetchDashboardData()
        )
        .subscribe();

      const workflowsChannel = supabase
        .channel('workflows_changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'workflows', filter: `user_id=eq.${user.id}` },
          () => fetchDashboardData()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(sopsChannel);
        supabase.removeChannel(workflowsChannel);
      };
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch SOPs count
      const { count: sopsCount } = await supabase
        .from('sops')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch workflows count
      const { count: workflowsCount } = await supabase
        .from('workflows')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch recent SOPs for activity
      const { data: recentSOPs } = await supabase
        .from('sops')
        .select('id, title, created_at, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(10);

      // Fetch recent workflows for activity
      const { data: recentWorkflows } = await supabase
        .from('workflows')
        .select('id, title, created_at, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(5);

      // Update stats
      setStats({
        totalSOPs: sopsCount || 0,
        workflowsCreated: workflowsCount || 0,
        activeProjects: Math.max(1, Math.floor(((sopsCount || 0) + (workflowsCount || 0)) / 3)),
        efficiencyGain: Math.min(95, 24 + (sopsCount || 0) * 2)
      });

      // Generate recent activity
      const activities: RecentActivity[] = [];
      
      recentSOPs?.forEach(sop => {
        const wasUpdated = new Date(sop.updated_at) > new Date(sop.created_at);
        activities.push({
          id: sop.id,
          action: wasUpdated ? 'Updated SOP' : 'Created SOP',
          timestamp: wasUpdated ? sop.updated_at : sop.created_at,
          item: sop.title
        });
      });

      recentWorkflows?.forEach(workflow => {
        activities.push({
          id: workflow.id,
          action: 'Created Workflow',
          timestamp: workflow.created_at,
          item: workflow.title
        });
      });

      // Sort by timestamp and take latest 5
      activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setRecentActivity(activities.slice(0, 5));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.user_metadata?.full_name || 'User'}!</h1>
        <Badge variant="outline" className="text-sm">
          User ID: {user?.id?.slice(0, 8)}...
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SOPs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSOPs}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.max(0, stats.totalSOPs - 2)} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workflows Created</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.workflowsCreated}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.max(0, stats.workflowsCreated - 1)} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.max(0, Math.floor(stats.activeProjects / 2))} from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Gain</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.efficiencyGain}%</div>
            <p className="text-xs text-muted-foreground">
              +{Math.max(2, Math.floor(stats.efficiencyGain / 10))}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="SOPs" fill="#3b82f6" />
                <Bar dataKey="Workflows" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {activity.item}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatTimeAgo(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                  <p className="text-xs text-muted-foreground">Start creating SOPs to see activity here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-24 flex flex-col items-center justify-center space-y-2"
              onClick={onNavigateToGenerate}
            >
              <Zap className="h-6 w-6" />
              <span>Generate New SOP</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center space-y-2"
              onClick={onNavigateToSOPs}
            >
              <FileText className="h-6 w-6" />
              <span>View My SOPs</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center space-y-2"
              onClick={onNavigateToWorkflows}
            >
              <GitBranch className="h-6 w-6" />
              <span>Create Workflow</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">💡 Pro Tip</h3>
              <p className="text-sm text-blue-800">
                Start with simple processes and gradually build more complex SOPs as you get comfortable with the platform.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">🎯 Best Practice</h3>
              <p className="text-sm text-green-800">
                Use clear, descriptive titles and include relevant tags to make your SOPs easy to find and organize.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900 mb-2">🚀 Feature Update</h3>
              <p className="text-sm text-purple-800">
                Try the new visual workflow feature to create flowcharts alongside your SOPs for better clarity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
