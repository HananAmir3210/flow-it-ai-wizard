
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { User, Mail, Lock, Globe, Palette, Bell, Trash2 } from 'lucide-react';

const AccountSettings = () => {
  const [profile, setProfile] = useState({
    fullName: 'Hanan',
    email: 'hanan@example.com',
    language: 'english',
    theme: 'light',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    inAppNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileUpdate = () => {
    console.log('Updating profile:', profile);
    // Implementation for profile update
  };

  const handlePasswordChange = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Changing password...');
    // Implementation for password change
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmed) {
      console.log('Deleting account...');
      // Implementation for account deletion
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security settings</p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User size={20} />
            <span>Profile Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <Input
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="Enter your email"
              type="email"
            />
          </div>
          <Button onClick={handleProfileUpdate}>Update Profile</Button>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock size={20} />
            <span>Change Password</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <Input
              type="password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <Input
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
            <Input
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              placeholder="Confirm new password"
            />
          </div>
          <Button onClick={handlePasswordChange}>Change Password</Button>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette size={20} />
            <span>Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <Select value={profile.language} onValueChange={(value) => setProfile({ ...profile, language: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <Select value={profile.theme} onValueChange={(value) => setProfile({ ...profile, theme: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell size={20} />
            <span>Notification Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Email Notifications</div>
              <div className="text-sm text-muted-foreground">Receive email updates about your SOPs</div>
            </div>
            <Switch
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">In-App Notifications</div>
              <div className="text-sm text-muted-foreground">Show notifications within the application</div>
            </div>
            <Switch
              checked={notifications.inAppNotifications}
              onCheckedChange={(checked) => setNotifications({ ...notifications, inAppNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Marketing Emails</div>
              <div className="text-sm text-muted-foreground">Receive product updates and tips</div>
            </div>
            <Switch
              checked={notifications.marketingEmails}
              onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Security Alerts</div>
              <div className="text-sm text-muted-foreground">Important security notifications</div>
            </div>
            <Switch
              checked={notifications.securityAlerts}
              onCheckedChange={(checked) => setNotifications({ ...notifications, securityAlerts: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <Trash2 size={20} />
            <span>Danger Zone</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="font-medium text-red-800 mb-2">Delete Account</div>
            <p className="text-sm text-red-600 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button 
              variant="outline" 
              className="border-red-300 text-red-600 hover:bg-red-50"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
