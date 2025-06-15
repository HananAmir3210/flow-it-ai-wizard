
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Edit3, Settings, LogOut, Sun, Moon } from "lucide-react";

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

  React.useEffect(() => {
    if (user?.name) {
      setEditedName(user.name);
    }
  }, [user?.name]);

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    console.log("Saving profile:", { name: editedName });
    setIsEditing(false);
  };

  const handleLogout = () => {
    onLogout();
    onClose();
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
      <DialogContent className="sm:max-w-md p-0 gap-0 dark:bg-gray-900">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="sr-only">Profile</DialogTitle>
          <DialogDescription className="sr-only">
            Manage your profile settings
          </DialogDescription>
          
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
            onClick={() => {
              onViewAccount();
              onClose();
            }}
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
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
