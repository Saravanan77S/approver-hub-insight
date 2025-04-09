
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Search, 
  FileText, 
  Users, 
  ChevronDown, 
  ChevronUp,
  Eye 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Mock data
const userReports = [
  { id: '1', reportType: 'Account Issue', reportedBy: 'John Doe', status: 'pending', date: '2023-04-08', priority: 'high' },
  { id: '2', reportType: 'Profile Error', reportedBy: 'Sarah Smith', status: 'resolved', date: '2023-04-07', priority: 'medium' },
  { id: '3', reportType: 'Payment Problem', reportedBy: 'Mike Johnson', status: 'investigating', date: '2023-04-06', priority: 'high' },
  { id: '4', reportType: 'Can\'t Update Profile', reportedBy: 'Emily Chen', status: 'pending', date: '2023-04-05', priority: 'low' },
  { id: '5', reportType: 'Login Issues', reportedBy: 'Alex Williams', status: 'resolved', date: '2023-04-04', priority: 'medium' },
];

const managerReports = [
  { id: '1', reportType: 'Dashboard Access', reportedBy: 'Linda Brown', status: 'pending', date: '2023-04-08', priority: 'high' },
  { id: '2', reportType: 'Analytics Data Error', reportedBy: 'Mark Davis', status: 'resolved', date: '2023-04-07', priority: 'high' },
  { id: '3', reportType: 'User Management Issue', reportedBy: 'Robert Jones', status: 'investigating', date: '2023-04-06', priority: 'medium' },
];

const monthlyReportData = [
  { name: 'Jan', users: 20, managers: 5 },
  { name: 'Feb', users: 15, managers: 8 },
  { name: 'Mar', users: 25, managers: 12 },
  { name: 'Apr', users: 30, managers: 10 },
  { name: 'May', users: 18, managers: 7 },
  { name: 'Jun', users: 22, managers: 9 },
];

const reportTypeData = [
  { name: 'Account Issues', value: 35 },
  { name: 'Profile Errors', value: 25 },
  { name: 'Payment Problems', value: 20 },
  { name: 'Login Issues', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Filter and sort functions
  const filterReports = (reports: any[]) => {
    return reports
      .filter(report => {
        // Search filter
        if (searchQuery && !Object.values(report).some(value => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )) {
          return false;
        }
        
        // Status filter
        if (statusFilter !== 'all' && report.status !== statusFilter) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sort
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (aValue < bValue) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
  };
  
  const filteredUserReports = filterReports(userReports);
  const filteredManagerReports = filterReports(managerReports);

  // Status Badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let variant: "default" | "secondary" | "destructive" | "outline" = "default";
    
    switch (status) {
      case 'resolved':
        variant = "default";
        break;
      case 'pending':
        variant = "secondary";
        break;
      case 'investigating':
        variant = "outline";
        break;
      default:
        variant = "default";
    }
    
    return (
      <Badge variant={variant} className="capitalize">
        {status}
      </Badge>
    );
  };
  
  // Priority Badge component
  const PriorityBadge = ({ priority }: { priority: string }) => {
    let className = "capitalize";
    
    switch (priority) {
      case 'high':
        className += " bg-red-100 text-red-800 border-red-200";
        break;
      case 'medium':
        className += " bg-yellow-100 text-yellow-800 border-yellow-200";
        break;
      case 'low':
        className += " bg-green-100 text-green-800 border-green-200";
        break;
      default:
        className += " bg-gray-100 text-gray-800 border-gray-200";
    }
    
    return (
      <Badge variant="outline" className={className}>
        {priority}
      </Badge>
    );
  };
  
  // Table Header with sorting component
  const SortableHeader = ({ field, children }: { field: string, children: React.ReactNode }) => {
    return (
      <TableHead 
        className="cursor-pointer hover:bg-muted/50"
        onClick={() => handleSort(field)}
      >
        <div className="flex items-center gap-1">
          {children}
          {sortField === field && (
            sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
          )}
        </div>
      </TableHead>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reports Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Reports</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyReportData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#2563eb" name="User Reports" />
                <Bar dataKey="managers" fill="#64748b" name="Manager Reports" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Report Types Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reportTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {reportTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="search" 
            placeholder="Search reports..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="user" className="mt-6">
        <TabsList>
          <TabsTrigger value="user" className="flex items-center gap-2">
            <Users size={16} />
            User Reports
          </TabsTrigger>
          <TabsTrigger value="manager" className="flex items-center gap-2">
            <FileText size={16} />
            Manager Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="user" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <SortableHeader field="reportType">Report Type</SortableHeader>
                    <SortableHeader field="reportedBy">Reported By</SortableHeader>
                    <SortableHeader field="status">Status</SortableHeader>
                    <SortableHeader field="priority">Priority</SortableHeader>
                    <SortableHeader field="date">Date</SortableHeader>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUserReports.map((report, index) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{report.reportType}</TableCell>
                      <TableCell>{report.reportedBy}</TableCell>
                      <TableCell>
                        <StatusBadge status={report.status} />
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority={report.priority} />
                      </TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredUserReports.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        No reports found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manager" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <SortableHeader field="reportType">Report Type</SortableHeader>
                    <SortableHeader field="reportedBy">Reported By</SortableHeader>
                    <SortableHeader field="status">Status</SortableHeader>
                    <SortableHeader field="priority">Priority</SortableHeader>
                    <SortableHeader field="date">Date</SortableHeader>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredManagerReports.map((report, index) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{report.reportType}</TableCell>
                      <TableCell>{report.reportedBy}</TableCell>
                      <TableCell>
                        <StatusBadge status={report.status} />
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority={report.priority} />
                      </TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredManagerReports.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        No reports found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
