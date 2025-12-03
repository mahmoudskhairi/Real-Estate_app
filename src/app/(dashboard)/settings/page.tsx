"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Save,
  Moon,
  Sun,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", email: "", phone: "" });
  const [phoneError, setPhoneError] = useState("");
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [systemInfo, setSystemInfo] = useState({
    totalUsers: 0,
    totalLeads: 0,
    totalClients: 0,
    dbStatus: 'Checking...',
    lastUpdate: new Date(),
  });

  useEffect(() => {
    fetchUserData();
    fetchSystemInfo();
    
    // Update system info every 30 seconds
    const interval = setInterval(fetchSystemInfo, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUserData = async () => {
    try {
      console.log('Fetching user data from /api/auth/me');
      const response = await fetch('/api/auth/me');
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('User data received:', data);
        setUser(data);
        setProfileData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
        });
        setNotifications({
          email: data.emailNotifications ?? true,
          push: data.pushNotifications ?? false,
          sms: data.smsNotifications ?? true,
        });
        const userTheme = (data.theme || 'dark') as 'dark' | 'light';
        setTheme(userTheme);
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(userTheme);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to fetch user:', response.status, errorData);
        toast.error('Failed to load user: ' + (errorData.error || 'Unauthorized'));
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('Failed to load user data: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemInfo = async () => {
    try {
      const [usersRes, leadsRes, clientsRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/leads'),
        fetch('/api/clients'),
      ]);

      const users = usersRes.ok ? await usersRes.json() : [];
      const leads = leadsRes.ok ? await leadsRes.json() : [];
      const clients = clientsRes.ok ? await clientsRes.json() : [];

      setSystemInfo({
        totalUsers: Array.isArray(users) ? users.length : 0,
        totalLeads: Array.isArray(leads) ? leads.length : 0,
        totalClients: Array.isArray(clients) ? clients.length : 0,
        dbStatus: 'Connected',
        lastUpdate: new Date(),
      });
    } catch (error) {
      console.error('Error fetching system info:', error);
      setSystemInfo(prev => ({ ...prev, dbStatus: 'Error' }));
    }
  };

  const validatePhone = (phone: string): boolean => {
    // Check if phone is empty (optional field)
    if (!phone.trim()) return true;
    
    // Check if phone contains only valid characters and matches pattern
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
  };

  const handleProfileSave = async () => {
    if (!user?.id) {
      toast.error("User not loaded");
      return;
    }

    // Validate phone number before submission
    if (!validatePhone(profileData.phone)) {
      setPhoneError('Invalid phone number format. Please use a valid format like: +1 (555) 000-0000');
      toast.error('Invalid phone number format');
      return;
    }
    
    setPhoneError("");

    setSaving(true);
    try {
      console.log('Updating profile for user:', user.id, profileData);
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      console.log('Profile update response status:', response.status);
      const data = await response.json();
      console.log('Profile update response:', data);

      if (response.ok) {
        toast.success("Profile updated successfully!");
        await fetchUserData();
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Error updating profile: " + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!user?.id) {
      toast.error("User not loaded");
      return;
    }

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setSaving(true);
    try {
      console.log('Updating password for user:', user.id);
      const response = await fetch(`/api/users/${user.id}/password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      console.log('Password update response status:', response.status);
      const data = await response.json();
      console.log('Password update response:', data);

      if (response.ok) {
        toast.success("Password updated successfully!");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error("Error updating password: " + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleThemeToggle = async (checked: boolean) => {
    if (!user?.id) {
      toast.error("User not loaded");
      return;
    }

    const newTheme = checked ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Apply theme immediately
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(newTheme);
    
    // Save to database
    try {
      console.log('Updating theme for user:', user.id, 'to:', newTheme);
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: newTheme }),
      });

      console.log('Theme update response status:', response.status);
      const data = await response.json();
      console.log('Theme update response:', data);

      if (response.ok) {
        toast.success(`Switched to ${newTheme} mode`);
      } else {
        toast.error(data.message || "Failed to save theme preference");
        // Revert on error
        const oldTheme = checked ? 'dark' : 'light';
        setTheme(oldTheme);
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(oldTheme);
      }
    } catch (error) {
      console.error('Error saving theme:', error);
      toast.error("Error saving theme: " + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleNotificationChange = async (type: 'email' | 'push' | 'sms', checked: boolean) => {
    if (!user?.id) {
      toast.error("User not loaded");
      return;
    }

    // Update local state immediately
    setNotifications(prev => ({ ...prev, [type]: checked }));
    
    // Save to database
    try {
      const updateData: any = {};
      if (type === 'email') updateData.emailNotifications = checked;
      if (type === 'push') updateData.pushNotifications = checked;
      if (type === 'sms') updateData.smsNotifications = checked;
      
      console.log('Updating notification for user:', user.id, updateData);
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      console.log('Notification update response status:', response.status);
      const data = await response.json();
      console.log('Notification update response:', data);

      if (!response.ok) {
        toast.error(data.message || "Failed to save notification preference");
        // Revert on error
        setNotifications(prev => ({ ...prev, [type]: !checked }));
      }
    } catch (error) {
      console.error('Error saving notification preference:', error);
      toast.error("Error saving notification: " + (error instanceof Error ? error.message : 'Unknown error'));
      // Revert on error
      setNotifications(prev => ({ ...prev, [type]: !checked }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 dark:text-white dark:bg-none">Settings</h1>
        <p className="text-indigo-700 font-medium dark:text-slate-400 dark:font-normal">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="border-2 border-indigo-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 dark:text-white dark:bg-none">
              <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-indigo-900 font-semibold dark:text-slate-200 dark:font-normal">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="border-indigo-300 bg-white text-indigo-900 placeholder:text-indigo-400 focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-purple-900 font-semibold dark:text-slate-200 dark:font-normal">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="border-purple-300 bg-white text-purple-900 placeholder:text-purple-400 focus:border-purple-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-pink-900 font-semibold dark:text-slate-200 dark:font-normal">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9+\-() ]/g, '');
                    setProfileData({...profileData, phone: value});
                    // Clear error when user starts typing
                    if (phoneError) setPhoneError("");
                  }}
                  pattern="[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}"
                  placeholder="+1 (555) 000-0000"
                  className={`border-pink-300 bg-white text-pink-900 placeholder:text-pink-400 focus:border-pink-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500 ${phoneError ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {phoneError && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {phoneError}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-indigo-900 font-semibold dark:text-slate-200 dark:font-normal">
                  Role
                </Label>
                <Input
                  id="role"
                  value={user?.role || "Loading..."}
                  disabled
                  className="border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-500"
                />
              </div>
            </div>
            <Button
              onClick={handleProfileSave}
              disabled={saving}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-md disabled:opacity-50 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:from-transparent dark:to-transparent"
            >
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-2 border-cyan-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2 dark:text-white dark:bg-none">
              <Bell className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notif" className="text-cyan-900 font-semibold dark:text-slate-200 dark:font-normal">
                  Email Notifications
                </Label>
                <p className="text-sm text-cyan-700 dark:text-slate-400">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notif"
                checked={notifications.email}
                onCheckedChange={(checked) => handleNotificationChange('email', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notif" className="text-blue-900 font-semibold dark:text-slate-200 dark:font-normal">
                  Push Notifications
                </Label>
                <p className="text-sm text-blue-700 dark:text-slate-400">
                  Receive push notifications in browser
                </p>
              </div>
              <Switch
                id="push-notif"
                checked={notifications.push}
                onCheckedChange={(checked) => handleNotificationChange('push', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notif" className="text-indigo-900 font-semibold dark:text-slate-200 dark:font-normal">
                  SMS Notifications
                </Label>
                <p className="text-sm text-indigo-700 dark:text-slate-400">
                  Receive important updates via SMS
                </p>
              </div>
              <Switch
                id="sms-notif"
                checked={notifications.sms}
                onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
              />
            </div>
            <div className="pt-2 text-xs text-cyan-600 font-medium dark:text-slate-500 dark:font-normal">
              Note: Notification preferences are saved automatically
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-2 border-green-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2 dark:text-white dark:bg-none">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-green-900 font-semibold dark:text-slate-200 dark:font-normal">
                Current Password
              </Label>
              <Input
                id="current-password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="border-green-300 bg-white text-green-900 placeholder:text-green-400 focus:border-green-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-emerald-900 font-semibold dark:text-slate-200 dark:font-normal">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="border-emerald-300 bg-white text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-teal-900 font-semibold dark:text-slate-200 dark:font-normal">
                Confirm New Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="border-teal-300 bg-white text-teal-900 placeholder:text-teal-400 focus:border-teal-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>
            <Button
              onClick={handlePasswordUpdate}
              disabled={saving}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-md disabled:opacity-50 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:from-transparent dark:to-transparent"
            >
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="border-2 border-purple-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent flex items-center gap-2 dark:text-white dark:bg-none">
              <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex items-center gap-2">
                {theme === 'dark' ? <Moon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> : <Sun className="h-4 w-4 text-yellow-500" />}
                <div>
                  <Label className="text-purple-900 font-semibold dark:text-slate-200 dark:font-normal">{theme === 'dark' ? 'Dark' : 'Light'} Mode</Label>
                  <p className="text-sm text-purple-700 dark:text-slate-400">
                    Switch between dark and light themes
                  </p>
                </div>
              </div>
              <Switch
                checked={theme === 'light'}
                onCheckedChange={handleThemeToggle}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="border-2 border-orange-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2 dark:text-white dark:bg-none">
              <Database className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-orange-700 dark:text-slate-400 dark:font-normal">Total Users</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent dark:text-white dark:bg-none">{systemInfo.totalUsers}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-700 dark:text-slate-400 dark:font-normal">Total Leads</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent dark:text-white dark:bg-none">{systemInfo.totalLeads}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-yellow-700 dark:text-slate-400 dark:font-normal">Total Clients</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent dark:text-white dark:bg-none">{systemInfo.totalClients}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-orange-700 dark:text-slate-400 dark:font-normal">Database Status</p>
                <p className={`text-xl font-bold ${systemInfo.dbStatus === 'Connected' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {systemInfo.dbStatus}
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-orange-200 dark:border-slate-800">
              <p className="text-xs text-orange-600 font-medium dark:text-slate-500 dark:font-normal">
                Last updated: {systemInfo.lastUpdate.toLocaleTimeString()} • Auto-refreshes every 30s
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
