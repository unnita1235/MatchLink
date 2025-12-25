"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/components/theme-provider";
import { User, Bell, Shield, Palette, Trash2, Moon, Sun, Monitor, Loader2 } from "lucide-react";
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Account settings schema
const accountSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters"),
});

// Password change schema
const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type AccountFormValues = z.infer<typeof accountSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Notification preferences state
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailMatches: true,
    emailMessages: true,
    emailUpdates: false,
    pushNotifications: true,
  });

  // Privacy preferences state
  const [privacyPrefs, setPrivacyPrefs] = useState({
    profileVisibility: "everyone",
    showOnlineStatus: true,
    allowMessagesFrom: "matches",
  });

  // Account form
  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      displayName: user?.displayName || "",
    },
  });

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (user?.displayName) {
      accountForm.reset({ displayName: user.displayName });
    }
  }, [user, accountForm]);

  // Handle account update
  async function onAccountSubmit(data: AccountFormValues) {
    if (!user) return;
    setLoading(true);
    try {
      await updateProfile(user, { displayName: data.displayName });
      toast({
        title: "Profile updated",
        description: "Your display name has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update profile.",
      });
    } finally {
      setLoading(false);
    }
  }

  // Handle password change
  async function onPasswordSubmit(data: PasswordFormValues) {
    if (!user || !user.email) return;
    setPasswordLoading(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, data.currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, data.newPassword);
      passwordForm.reset();
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.code === "auth/wrong-password"
          ? "Current password is incorrect."
          : error.message || "Failed to change password.",
      });
    } finally {
      setPasswordLoading(false);
    }
  }

  // Handle account deletion
  async function handleDeleteAccount() {
    try {
      await user?.delete();
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.code === "auth/requires-recent-login"
          ? "Please sign out and sign back in before deleting your account."
          : error.message || "Failed to delete account.",
      });
    }
  }

  return (
    <div className="flex flex-col h-full">
      <header className="bg-card border-b p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-headline font-semibold text-primary">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and application preferences.
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Account Settings</CardTitle>
              </div>
              <CardDescription>
                Update your account information and credentials.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-4">
                  <FormField
                    control={accountForm.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the name that will be displayed to other users.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormLabel>Email</FormLabel>
                    <Input value={user?.email || ""} disabled className="mt-2" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Email cannot be changed.
                    </p>
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </form>
              </Form>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Change Password</h4>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" variant="outline" disabled={passwordLoading}>
                      {passwordLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Change Password
                    </Button>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>
                Customize how MatchLink looks on your device.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="font-medium">Theme</label>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred color scheme.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-4 w-4 mr-1" />
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-4 w-4 mr-1" />
                      Dark
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("system")}
                    >
                      <Monitor className="h-4 w-4 mr-1" />
                      System
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Choose what updates you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="font-medium">New Match Emails</label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you have a new match.
                  </p>
                </div>
                <Switch
                  checked={notificationPrefs.emailMatches}
                  onCheckedChange={(checked) =>
                    setNotificationPrefs((prev) => ({ ...prev, emailMatches: checked }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="font-medium">Message Notifications</label>
                  <p className="text-sm text-muted-foreground">
                    Receive email when someone sends you a message.
                  </p>
                </div>
                <Switch
                  checked={notificationPrefs.emailMessages}
                  onCheckedChange={(checked) =>
                    setNotificationPrefs((prev) => ({ ...prev, emailMessages: checked }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="font-medium">Product Updates</label>
                  <p className="text-sm text-muted-foreground">
                    Stay informed about new features and improvements.
                  </p>
                </div>
                <Switch
                  checked={notificationPrefs.emailUpdates}
                  onCheckedChange={(checked) =>
                    setNotificationPrefs((prev) => ({ ...prev, emailUpdates: checked }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="font-medium">Push Notifications</label>
                  <p className="text-sm text-muted-foreground">
                    Enable browser push notifications.
                  </p>
                </div>
                <Switch
                  checked={notificationPrefs.pushNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationPrefs((prev) => ({ ...prev, pushNotifications: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Privacy</CardTitle>
              </div>
              <CardDescription>
                Control your privacy and visibility settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="font-medium">Profile Visibility</label>
                  <p className="text-sm text-muted-foreground">
                    Who can see your profile.
                  </p>
                </div>
                <Select
                  value={privacyPrefs.profileVisibility}
                  onValueChange={(value) =>
                    setPrivacyPrefs((prev) => ({ ...prev, profileVisibility: value }))
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="matches">Matches Only</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="font-medium">Show Online Status</label>
                  <p className="text-sm text-muted-foreground">
                    Let others see when you&apos;re online.
                  </p>
                </div>
                <Switch
                  checked={privacyPrefs.showOnlineStatus}
                  onCheckedChange={(checked) =>
                    setPrivacyPrefs((prev) => ({ ...prev, showOnlineStatus: checked }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="font-medium">Allow Messages From</label>
                  <p className="text-sm text-muted-foreground">
                    Who can send you messages.
                  </p>
                </div>
                <Select
                  value={privacyPrefs.allowMessagesFrom}
                  onValueChange={(value) =>
                    setPrivacyPrefs((prev) => ({ ...prev, allowMessagesFrom: value }))
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="matches">Matches Only</SelectItem>
                    <SelectItem value="nobody">Nobody</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-destructive" />
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </div>
              <CardDescription>
                Irreversible and destructive actions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="font-medium">Delete Account</label>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data.
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}