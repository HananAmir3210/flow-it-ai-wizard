
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { User, Edit3, Settings, LogOut, Sun, Moon, ArrowLeft, Trash2, Globe, Bell } from "lucide-react";

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
  const [accountName, setAccountName] = React.useState(user?.name || "");
  const [accountEmail, setAccountEmail] = React.useState(user?.email || "");
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [language, setLanguage] = React.useState("en");
  const [themePreference, setThemePreference] = React.useState(isDarkMode ? "dark" : "light");
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [inAppNotifications, setInAppNotifications] = React.useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  React.useEffect(() => {
    if (user?.name) {
      setEditedName(user.name);
      setAccountName(user.name);
    }
    if (user?.email) {
      setAccountEmail(user.email);
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
    console.log("Saving account settings:", {
      name: accountName,
      email: accountEmail,
      language,
      themePreference,
      emailNotifications,
      inAppNotifications
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      console.error("Passwords don't match");
      return;
    }
    if (newPassword.length < 6) {
      console.error("Password must be at least 6 characters");
      return;
    }
    console.log("Changing password");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      console.log("Deleting account");
      setShowDeleteConfirm(false);
      onClose();
    } else {
      setShowDeleteConfirm(true);
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
        <DialogTitle className="sr-only">Profile Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Manage your profile and account settings
        </DialogDescription>
        
        <div className="relative w-full h-full">
          {/* Profile Panel */}
          <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
            showAccountSettings ? '-translate-x-full' : 'translate-x-0'
          }`}>
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
          <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
            showAccountSettings ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="h-full overflow-y-auto">
              <DialogHeader className="p-6 pb-4 border-b dark:border-gray-700">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToProfile}
                    className="mr-2 p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold dark:text-white">Account Settings</h2>
                </div>
              </DialogHeader>

              <div className="p-6 space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="account-name">Full Name</Label>
                      <Input
                        id="account-name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="account-email">Email</Label>
                      <Input
                        id="account-email"
                        value={accountEmail}
                        onChange={(e) => setAccountEmail(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Change Password */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                    Change Password
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="old-password">Current Password</Label>
                      <Input
                        id="old-password"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      size="sm" 
                      onClick={handleChangePassword}
                      disabled={!oldPassword || !newPassword || !confirmPassword}
                    >
                      Update Password
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Preferences */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                    Preferences
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        <Label htmlFor="theme-preference">Theme</Label>
                      </div>
                      <select
                        id="theme-preference"
                        value={themePreference}
                        onChange={(e) => {
                          setThemePreference(e.target.value);
                          if (e.target.value === "dark" && !isDarkMode) {
                            onToggleDarkMode();
                          } else if (e.target.value === "light" && isDarkMode) {
                            onToggleDarkMode();
                          }
                        }}
                        className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Notifications */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                    Notification Settings
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        <Label htmlFor="app-notifications">In-App Notifications</Label>
                      </div>
                      <Switch
                        id="app-notifications"
                        checked={inAppNotifications}
                        onCheckedChange={setInAppNotifications}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Save Button */}
                <Button onClick={handleSaveAccountSettings} className="w-full">
                  Save Changes
                </Button>

                <Separator />

                {/* Delete Account */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-red-600 dark:text-red-400 uppercase tracking-wide">
                    Danger Zone
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleDeleteAccount}
                      className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {showDeleteConfirm ? "Click Again to Confirm" : "Delete Account"}
                    </Button>
                  </div>
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
