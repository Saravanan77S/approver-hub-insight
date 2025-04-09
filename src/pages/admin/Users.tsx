
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserApprovalCard from '@/components/UserApprovalCard';
import { Search, UserPlus, Download } from 'lucide-react';

// Mock data
const pendingUsers = [
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
  },
  {
    id: '3',
    name: 'Michael Wong',
    email: 'michael@example.com',
    phone: '+1 456 789 012',
    role: 'user' as const,
    date: '2 days ago',
    status: 'pending' as const
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 567 890 123',
    role: 'manager' as const,
    date: '3 days ago',
    status: 'pending' as const
  }
];

const approvedUsers = [
  {
    id: '5',
    name: 'James Wilson',
    email: 'james@example.com',
    phone: '+1 678 901 234',
    role: 'user' as const,
    date: '1 week ago',
    status: 'approved' as const
  },
  {
    id: '6',
    name: 'Jessica Brown',
    email: 'jessica@example.com',
    phone: '+1 789 012 345',
    role: 'manager' as const,
    date: '2 weeks ago',
    status: 'approved' as const
  }
];

const rejectedUsers = [
  {
    id: '7',
    name: 'Robert Taylor',
    email: 'robert@example.com',
    phone: '+1 890 123 456',
    role: 'user' as const,
    date: '3 days ago',
    status: 'rejected' as const
  }
];

const Users: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // Filter functions
  const filterBySearch = (user: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.includes(query)
    );
  };
  
  const filterByRole = (user: any) => {
    if (roleFilter === 'all') return true;
    return user.role === roleFilter;
  };
  
  const filteredPending = pendingUsers.filter(user => filterBySearch(user) && filterByRole(user));
  const filteredApproved = approvedUsers.filter(user => filterBySearch(user) && filterByRole(user));
  const filteredRejected = rejectedUsers.filter(user => filterBySearch(user) && filterByRole(user));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="search" 
            placeholder="Search users..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
              {filteredPending.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
              {filteredApproved.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
              {filteredRejected.length}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          {filteredPending.map(user => (
            <UserApprovalCard key={user.id} {...user} />
          ))}
          {filteredPending.length === 0 && (
            <p className="text-center py-6 text-gray-500">No pending users found matching your criteria</p>
          )}
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-4">
          {filteredApproved.map(user => (
            <UserApprovalCard key={user.id} {...user} />
          ))}
          {filteredApproved.length === 0 && (
            <p className="text-center py-6 text-gray-500">No approved users found matching your criteria</p>
          )}
        </TabsContent>
        
        <TabsContent value="rejected" className="space-y-4">
          {filteredRejected.map(user => (
            <UserApprovalCard key={user.id} {...user} />
          ))}
          {filteredRejected.length === 0 && (
            <p className="text-center py-6 text-gray-500">No rejected users found matching your criteria</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;
