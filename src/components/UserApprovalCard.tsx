
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreVertical, Mail, Phone } from 'lucide-react';

interface UserApprovalCardProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'manager';
  avatarUrl?: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const UserApprovalCard: React.FC<UserApprovalCardProps> = ({
  id,
  name,
  email,
  phone,
  role,
  avatarUrl,
  date,
  status
}) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{name}</h3>
                <Badge variant="outline" className="capitalize">
                  {role}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center text-xs text-gray-500">
                  <Mail size={12} className="mr-1" />
                  {email}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Phone size={12} className="mr-1" />
                  {phone}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={
              status === 'approved' ? 'default' : 
              status === 'rejected' ? 'destructive' : 'secondary'
            }>
              {status}
            </Badge>
            <Button variant="ghost" size="icon">
              <MoreVertical size={16} />
            </Button>
          </div>
        </div>
        
        {status === 'pending' && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm"
            >
              View Profile
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-green-600 hover:bg-green-700"
            >
              Approve
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-red-600 hover:bg-red-700"
            >
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserApprovalCard;
