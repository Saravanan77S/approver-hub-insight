
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobVacancies } from './manager/JobVacancies';
import { JobRequests } from './manager/JobRequests';

const Manager: React.FC = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Manager Portal</h1>
      
      <Tabs defaultValue="vacancies" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="vacancies">Job Vacancies</TabsTrigger>
          <TabsTrigger value="requests">Job Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vacancies">
          <JobVacancies />
        </TabsContent>
        
        <TabsContent value="requests">
          <JobRequests />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Manager;
