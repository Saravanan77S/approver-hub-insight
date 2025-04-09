
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComplaintCardProps {
  id: string;
  title: string;
  description: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
  date: string;
  status: 'pending' | 'verified' | 'rejected';
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({
  id,
  title,
  description,
  user,
  date,
  status
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <Badge variant={
            status === 'verified' ? 'default' : 
            status === 'rejected' ? 'destructive' : 'secondary'
          }>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium">{user.name}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar size={12} className="mr-1" />
            {date}
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            View Details
          </Button>
          
          {status === 'pending' && (
            <>
              <Button 
                variant="default" 
                size="sm" 
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Verify
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Reject
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplaintCard;
