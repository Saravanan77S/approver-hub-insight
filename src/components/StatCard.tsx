
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType = 'neutral',
  className
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
            {change && (
              <p className={cn(
                "text-sm mt-1",
                changeType === 'positive' && "text-green-600",
                changeType === 'negative' && "text-red-600",
                changeType === 'neutral' && "text-gray-600"
              )}>
                {change}
              </p>
            )}
          </div>
          <div className="p-3 rounded-full bg-blue-50 text-admin-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
