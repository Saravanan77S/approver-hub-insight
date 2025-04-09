
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
import ComplaintCard from '@/components/ComplaintCard';
import { Search, Filter } from 'lucide-react';

// Mock data
const pendingComplaints = [
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
    title: 'User Profile Impersonation',
    description: 'There is a report of someone impersonating another user with a fake profile and posting misleading job offers.',
    user: { name: 'Mark Wilson' },
    date: '6 hours ago',
    status: 'pending' as const
  },
  {
    id: '3',
    title: 'Job Posting Scam',
    description: 'Multiple users have reported a suspicious job posting that asks for payment before interview.',
    user: { name: 'Emma Thompson' },
    date: '1 day ago',
    status: 'pending' as const
  }
];

const verifiedComplaints = [
  {
    id: '4',
    title: 'Account Access Issues',
    description: 'Multiple users reporting they cannot access their accounts after the recent system update.',
    user: { name: 'Sarah Smith' },
    date: '5 hours ago',
    status: 'verified' as const
  },
  {
    id: '5',
    title: 'Profile Picture Not Uploading',
    description: 'Users experiencing issues when trying to update their profile pictures. The system shows an error after upload.',
    user: { name: 'Alex Johnson' },
    date: '2 days ago',
    status: 'verified' as const
  }
];

const rejectedComplaints = [
  {
    id: '6',
    title: 'False Job Information',
    description: 'A job posting has been flagged for containing false information about salary and benefits.',
    user: { name: 'David Johnson' },
    date: '1 day ago',
    status: 'rejected' as const
  },
  {
    id: '7',
    title: 'Duplicate User Report',
    description: 'Report about duplicate user accounts was investigated and found to be different legitimate users with similar names.',
    user: { name: 'Michelle Parker' },
    date: '3 days ago',
    status: 'rejected' as const
  }
];

const Complaints: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Filter functions
  const filterBySearch = (complaint: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      complaint.title.toLowerCase().includes(query) ||
      complaint.description.toLowerCase().includes(query) ||
      complaint.user.name.toLowerCase().includes(query)
    );
  };
  
  const filterByDate = (complaint: any) => {
    if (dateFilter === 'all') return true;
    // This is simplified - in a real app you'd need proper date comparison
    if (dateFilter === 'today') return complaint.date.includes('hour');
    if (dateFilter === 'week') return !complaint.date.includes('week');
    if (dateFilter === 'month') return true; // Assuming all complaints are within a month
    return true;
  };
  
  const filteredPending = pendingComplaints.filter(complaint => 
    filterBySearch(complaint) && filterByDate(complaint)
  );
  
  const filteredVerified = verifiedComplaints.filter(complaint => 
    filterBySearch(complaint) && filterByDate(complaint)
  );
  
  const filteredRejected = rejectedComplaints.filter(complaint => 
    filterBySearch(complaint) && filterByDate(complaint)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Complaints Management</h1>
        <Button>
          <Filter className="mr-2 h-4 w-4" />
          Advanced Filters
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="search" 
            placeholder="Search complaints..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
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
          <TabsTrigger value="verified">
            Verified <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
              {filteredVerified.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
              {filteredRejected.length}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPending.map(complaint => (
              <ComplaintCard key={complaint.id} {...complaint} />
            ))}
            {filteredPending.length === 0 && (
              <div className="col-span-full">
                <p className="text-center py-6 text-gray-500">No pending complaints found matching your criteria</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="verified">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVerified.map(complaint => (
              <ComplaintCard key={complaint.id} {...complaint} />
            ))}
            {filteredVerified.length === 0 && (
              <div className="col-span-full">
                <p className="text-center py-6 text-gray-500">No verified complaints found matching your criteria</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="rejected">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRejected.map(complaint => (
              <ComplaintCard key={complaint.id} {...complaint} />
            ))}
            {filteredRejected.length === 0 && (
              <div className="col-span-full">
                <p className="text-center py-6 text-gray-500">No rejected complaints found matching your criteria</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Complaints;
