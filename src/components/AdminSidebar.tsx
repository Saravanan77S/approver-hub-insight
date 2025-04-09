
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, AlertCircle, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AdminSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'User Approval', path: '/admin/users', icon: Users },
    { name: 'Complaints', path: '/admin/complaints', icon: AlertCircle },
    { name: 'Reports', path: '/admin/reports', icon: FileText },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className={cn(
      "h-screen bg-sidebar border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-[70px]" : "w-[250px]"
    )}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-lg font-bold text-admin-primary">Admin Hub</h1>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <nav className="px-2 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent group",
                  isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground"
                )}
                end={item.path === '/admin'}
              >
                <item.icon size={20} />
                {!collapsed && (
                  <span className="truncate">{item.name}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
