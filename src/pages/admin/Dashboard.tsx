
import React from 'react';
import StatCard from '@/components/StatCard';
import ComplaintCard from '@/components/ComplaintCard';
import UserApprovalCard from '@/components/UserApprovalCard';
import { BarChart, Users, FileText, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
const data = [
  { name: 'Jan', users: 65, managers: 28, complaints: 42 },
  { name: 'Feb', users: 59, managers: 32, complaints: 37 },
  { name: 'Mar', users: 80, managers: 30, complaints: 45 },
  { name: 'Apr', users: 81, managers: 40, complaints: 52 },
  { name: 'May', users: 56, managers: 36, complaints: 49 },
  { name: 'Jun', users: 55, managers: 30, complaints: 38 },
  { name: 'Jul', users: 40, managers: 25, complaints: 43 },
];

const recentComplaints = [
  {
    id: '1',
    title: 'Inappropriate Content Reported',
    description: 'A user has reported inappropriate content in the job listing section. The post contains misleading information about job requirements.',
    user: { name: 'John Doe' },
    date: '2 hours ago',
    status: 'pending' as const
  },
  {
    id: '2',
    title: 'Account Access Issues',
    description: 'Multiple users reporting they cannot access their accounts after the recent system update.',
    user: { name: 'Sarah Smith' },
    date: '5 hours ago',
    status: 'verified' as const
  },
  {
    id: '3',
    title: 'False Job Information',
    description: 'A job posting has been flagged for containing false information about salary and benefits.',
    user: { name: 'David Johnson' },
    date: '1 day ago',
    status: 'rejected' as const
  }
];

const pendingApprovals = [
  {
    id: '1',
    name: 'Thomas Anderson',
    email: 'thomas@example.com',
    phone: '+1 234 567 890',
    role: 'user' as const,
    date: '2 hours ago',
    status: 'pending' as const
  },
  {
    id: '2',
    name: 'Emily Clark',
    email: 'emily@example.com',
    phone: '+1 987 654 321',
    role: 'manager' as const,
    date: '1 day ago',
    status: 'pending' as const
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="1,254" 
          icon={<Users size={24} />} 
          change="+12% from last month" 
          changeType="positive" 
        />
        <StatCard 
          title="Active Jobs" 
          value="526" 
          icon={<BarChart size={24} />} 
          change="+5% from last month" 
          changeType="positive" 
        />
        <StatCard 
          title="Reports" 
          value="48" 
          icon={<FileText size={24} />} 
          change="-3% from last month" 
          changeType="negative" 
        />
        <StatCard 
          title="Pending Complaints" 
          value="35" 
          icon={<AlertCircle size={24} />} 
          change="+7 new today" 
          changeType="neutral" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="users">
              <TabsList className="mb-4">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="complaints">Complaints</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#2563eb" name="Users" />
                    <Bar dataKey="managers" fill="#64748b" name="Managers" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="jobs" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#2563eb" name="Created" />
                    <Bar dataKey="managers" fill="#64748b" name="Completed" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="complaints" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="complaints" fill="#ef4444" name="Complaints" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Approval Requests</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-3">
              {pendingApprovals.map(user => (
                <UserApprovalCard key={user.id} {...user} />
              ))}
              
              {pendingApprovals.length === 0 && (
                <p className="text-center py-4 text-gray-500">No pending approvals</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentComplaints.map(complaint => (
            <ComplaintCard key={complaint.id} {...complaint} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
