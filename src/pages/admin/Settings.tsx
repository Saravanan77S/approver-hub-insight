
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your admin panel preferences and settings</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your general administrator settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Admin Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-name">Admin Name</Label>
                    <Input id="admin-name" value="Admin User" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input id="admin-email" type="email" value="admin@example.com" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-approve-users" className="block">Auto-approve new users</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically approve new user registrations
                      </p>
                    </div>
                    <Switch id="auto-approve-users" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="require-manager-approval" className="block">Require manager approval</Label>
                      <p className="text-sm text-muted-foreground">
                        Require manager approval for new job postings
                      </p>
                    </div>
                    <Switch id="require-manager-approval" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics-tracking" className="block">Analytics tracking</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable analytics tracking for user behavior
                      </p>
                    </div>
                    <Switch id="analytics-tracking" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how you receive notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-user-notify" className="block">New user registrations</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a new user registers
                      </p>
                    </div>
                    <Switch id="new-user-notify" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-complaint-notify" className="block">New complaints</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a new complaint is filed
                      </p>
                    </div>
                    <Switch id="new-complaint-notify" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="report-notify" className="block">System reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly system reports
                      </p>
                    </div>
                    <Switch id="report-notify" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="urgent-complaints" className="block">Urgent complaints</Label>
                      <p className="text-sm text-muted-foreground">
                        Show real-time notifications for urgent complaints
                      </p>
                    </div>
                    <Switch id="urgent-complaints" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="system-updates" className="block">System updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about system updates and maintenance
                      </p>
                    </div>
                    <Switch id="system-updates" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and access settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="mt-2">Update Password</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-2fa" className="block">Enable 2FA</Label>
                      <p className="text-sm text-muted-foreground">
                        Secure your account with two-factor authentication
                      </p>
                    </div>
                    <Switch id="enable-2fa" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Two-factor authentication adds an extra layer of security to your account. Once enabled, you'll need to provide a code from your phone in addition to your password when logging in.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Session Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-logout" className="block">Auto Logout</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out after period of inactivity
                      </p>
                    </div>
                    <Switch id="auto-logout" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logout-time">Logout After (minutes)</Label>
                    <Input id="logout-time" type="number" defaultValue="30" min="5" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>
                Manage API keys and integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Keys</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Admin API Key</Label>
                    <div className="flex gap-2">
                      <Input id="api-key" value="api_47xJ9U2PLs58KwnM12hFdSq" readOnly className="flex-1" />
                      <Button variant="outline">Copy</Button>
                      <Button variant="outline" className="text-red-500">Regenerate</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last used: 3 hours ago
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Webhooks</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Notification Webhook URL</Label>
                    <Input id="webhook-url" placeholder="https://your-webhook-url.com/endpoint" />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <Label htmlFor="enable-webhook" className="block">Enable Webhook</Label>
                      <p className="text-sm text-muted-foreground">
                        Send real-time events to your webhook endpoint
                      </p>
                    </div>
                    <Switch id="enable-webhook" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button>Save API Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
