
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, Save, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfileSection = () => {
  const { toast } = useToast();
  const [isLoading, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSaved(true);
      toast({
        title: 'Profile updated',
        description: 'Your profile information has been saved successfully.',
      });
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Profile Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Update your personal information and profile picture.
        </p>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src="" alt={formData.fullName} />
            <AvatarFallback className="text-lg font-semibold">
              {getInitials(formData.fullName)}
            </AvatarFallback>
          </Avatar>
          <Button
            size="sm"
            variant="outline"
            className="absolute -bottom-1 -right-1 h-8 w-8 p-0 rounded-full"
          >
            <Camera size={14} />
          </Button>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{formData.fullName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Click to change avatar</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <Input
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <Input
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number (Optional)
          </label>
          <Input
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            type="tel"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="min-w-[120px]"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Saving...
            </>
          ) : isSaved ? (
            <>
              <Check size={16} className="mr-2" />
              Saved!
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;
