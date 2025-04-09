
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Admin Approver Hub
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          A comprehensive platform for managing user approvals, complaints, and reports.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/admin">
            <Button size="lg">
              Go to Admin Dashboard
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
