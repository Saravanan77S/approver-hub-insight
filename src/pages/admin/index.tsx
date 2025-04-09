
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import Dashboard from './Dashboard';
import Users from './Users';
import Complaints from './Complaints';
import Reports from './Reports';
import Settings from './Settings';

const AdminRoutes: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
