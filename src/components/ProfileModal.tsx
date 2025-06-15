
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Edit3, Settings, LogOut, Sun, Moon, ArrowLeft, Eye, EyeOff } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string } | null;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
  onViewAccount: () => void;
}

const ProfileModal = ({
  isOpen,
  onClose,
  user,
  isDarkMode,
  onToggleDarkMode,
  onLogout,
  onViewAccount
}: ProfileModalProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState(user?.name || "");
  const [showAccountSettings, setShowAccountSettings] = React.useState(false);
  
  // Account settings state
  const [accountData, setAccountData] = React.useState({
    fullName: user?.name || "",
    email: user?.email || "",
    language: "en",
    theme: isDarkMode ? "dark" : "light",
    notifications: {
      email: true,
      inApp: true,
      marketing: false
    }
  });
  
  // Password change state
  const [passwordData, setPasswordData] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [showPasswords, setShowPasswords] = React.useState({
    old: false,
    new: false,
    confirm: false
  });

  React.useEffect(() => {
    if (user?.name) {
      setEditedName(user.name);
      setAccountData(prev => ({ ...prev, fullName: user.name, email: user.email }));
    }
  }, [user?.name, user?.email]);

  const handleSaveProfile = () => {
    console.log("Saving profile:", { name: editedName });
    setIsEditing(false);
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  const handleViewAccountSettings = () => {
    setShowAccountSettings(true);
  };

  const handleBackToProfile = () => {
    setShowAccountSettings(false);
  };

  const handleSaveAccountSettings = () => {
    console.log("Saving account settings:", accountData);
    // Update theme if changed
    if ((accountData.theme === "dark") !== isDarkMode) {
      onToggleDarkMode();
    }
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      console.error("Passwords don't match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      console.error("Password must be at least 8 characters");
      return;
    }
    console.log("Changing password");
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Deleting account");
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0 dark:bg-gray-900 overflow-hidden">
        <DialogTitle className="sr-only">Profile</DialogTitle>
        <DialogDescription className="sr-only">
          Manage your profile settings
        </DialogDescription>
        
        <div className="relative w-full h-full">
          {/* Main Profile Panel */}
          <div 
            className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
              showAccountSettings ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            <DialogHeader className="p-6 pb-4">
              {/* Avatar Section */}
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback className="bg-blue-500 text-white text-xl font-semibold">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                
                {/* Name Field */}
                <div className="w-full space-y-2">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-left block">Full Name</Label>
                      <Input
                        id="name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="text-center"
                      />
                      <div className="flex gap-2 justify-center">
                        <Button size="sm" onClick={handleSaveProfile}>
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {
                            setIsEditing(false);
                            setEditedName(user.name);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold dark:text-white">{user.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Email */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{user.email}</p>
              </div>
            </DialogHeader>

            <div className="px-6 space-y-4">
              {/* Account Button */}
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={handleViewAccountSettings}
              >
                <Settings className="w-4 h-4 mr-2" />
                View Account Settings
              </Button>

              <Separator />

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                  {isDarkMode ? (
                    <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Sun className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  )}
                  <Label htmlFor="dark-mode" className="text-sm font-medium dark:text-gray-300">
                    Dark Mode
                  </Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={onToggleDarkMode}
                />
              </div>

              <Separator />

              {/* Logout Button */}
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20" 
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </div>

            <div className="p-6 pt-4">
              {/* Footer space */}
            </div>
          </div>

          {/* Account Settings Panel */}
          <div 
            className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
              showAccountSettings ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="h-full overflow-y-auto">
              {/* Header */}
              <div className="p-6 pb-4 border-b dark:border-gray-700">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleBackToProfile}
                  className="mb-3"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Profile
                </Button>
                <h2 className="text-xl font-semibold dark:text-white">Account Settings</h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-white">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="account-name">Full Name</Label>
                      <Input
                        id="account-name"
                        value={accountData.fullName}
                        onChange={(e) => setAccountData(prev => ({ ...prev, fullName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="account-email">Email</Label>
                      <Input
                        id="account-email"
                        value={accountData.email}
                        readOnly
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Change Password */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-white">Change Password</h3>
                  <div className="space-y-3">
                    <div className="relative">
                      <Label htmlFor="old-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="old-password"
                          type={showPasswords.old ? "text" : "password"}
                          value={passwordData.oldPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPasswords(prev => ({ ...prev, old: !prev.old }))}
                        >
                          {showPasswords.old ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showPasswords.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        >
                          {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        >
                          {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button onClick={handlePasswordChange} className="w-full">
                      Change Password
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-white">Preferences</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select value={accountData.language} onValueChange={(value) => setAccountData(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <Select value={accountData.theme} onValueChange={(value) => setAccountData(prev => ({ ...prev, theme: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Notification Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-white">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="email-notifications"
                        checked={accountData.notifications.email}
                        onCheckedChange={(checked) => 
                          setAccountData(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, email: checked as boolean }
                          }))
                        }
                      />
                      <Label htmlFor="email-notifications">Email notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in-app-notifications"
                        checked={accountData.notifications.inApp}
                        onCheckedChange={(checked) => 
                          setAccountData(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, inApp: checked as boolean }
                          }))
                        }
                      />
                      <Label htmlFor="in-app-notifications">In-app notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="marketing-notifications"
                        checked={accountData.notifications.marketing}
                        onCheckedChange={(checked) => 
                          setAccountData(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, marketing: checked as boolean }
                          }))
                        }
                      />
                      <Label htmlFor="marketing-notifications">Marketing emails</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Save Settings */}
                <Button onClick={handleSaveAccountSettings} className="w-full">
                  Save Settings
                </Button>

                <Separator />

                {/* Danger Zone */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Danger Zone</h3>
                  <Button 
                    variant="outline" 
                    onClick={handleDeleteAccount}
                    className="w-full border-red-300 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
