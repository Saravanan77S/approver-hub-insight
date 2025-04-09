
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AdminHeader: React.FC = () => {
  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Admin User</span>
          <Avatar>
            <AvatarImage src="" alt="Admin" />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
