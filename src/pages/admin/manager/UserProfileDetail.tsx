
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Mail, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  ExternalLink, 
  Clock 
} from 'lucide-react';

interface UserProfileDetailProps {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    skills: string[];
    experience: string;
    education: string;
    portfolio: string;
    availability: string;
  };
}

export const UserProfileDetail: React.FC<UserProfileDetailProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
      <div className="md:col-span-1 flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <h3 className="text-lg font-semibold">{user.name}</h3>
        
        <div className="mt-4 space-y-3 w-full">
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{user.phone}</span>
          </div>
          
          {user.portfolio && (
            <div className="flex items-center text-sm">
              <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
              <a href={user.portfolio} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                Portfolio
              </a>
            </div>
          )}
          
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Availability: {user.availability}</span>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2 space-y-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            Experience
          </h4>
          <p className="text-sm">{user.experience}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            <GraduationCap className="h-4 w-4 mr-2" />
            Education
          </h4>
          <p className="text-sm">{user.education}</p>
        </div>
      </div>
    </div>
  );
};
