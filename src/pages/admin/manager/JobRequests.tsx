
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Check, X, Eye, Phone } from 'lucide-react';
import { UserProfileDetail } from './UserProfileDetail';

// Mock job requests data
const mockJobRequests = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    applicant: {
      id: 101,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1234567890",
      avatar: "",
      skills: ["React", "TypeScript", "CSS", "HTML", "JavaScript"],
      experience: "7 years in frontend development",
      education: "BS in Computer Science",
      portfolio: "https://janesmith.dev",
      availability: "Immediate"
    },
    appliedAt: "2023-04-05",
    status: "pending"
  },
  {
    id: 2,
    jobTitle: "UI/UX Designer",
    applicant: {
      id: 102,
      name: "Mark Johnson",
      email: "mark@example.com",
      phone: "+1987654321",
      avatar: "",
      skills: ["Figma", "Adobe XD", "User Research", "Wireframing"],
      experience: "5 years in UX design",
      education: "Master's in Interaction Design",
      portfolio: "https://markjohnson.design",
      availability: "2 weeks notice"
    },
    appliedAt: "2023-04-03",
    status: "pending"
  },
  {
    id: 3,
    jobTitle: "Project Manager",
    applicant: {
      id: 103,
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "+1567891234",
      avatar: "",
      skills: ["Agile", "Scrum", "JIRA", "Risk Management", "Budgeting"],
      experience: "8 years in project management",
      education: "MBA, PMP Certified",
      portfolio: "https://linkedin.com/in/sarahwilliams",
      availability: "1 month notice"
    },
    appliedAt: "2023-03-28",
    status: "accepted"
  }
];

export const JobRequests: React.FC = () => {
  const [requests, setRequests] = useState(mockJobRequests);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

  const viewApplicantProfile = (applicant: any) => {
    setSelectedApplicant(applicant);
    setIsProfileOpen(true);
  };

  const updateRequestStatus = (id: number, status: 'accepted' | 'rejected') => {
    setRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status } : req)
    );
    
    const request = requests.find(req => req.id === id);
    
    if (request) {
      if (status === 'accepted') {
        toast({
          title: "Application accepted",
          description: `${request.applicant.name} has been accepted for the ${request.jobTitle} position. An SMS notification has been sent.`
        });
      } else {
        toast({
          title: "Application rejected",
          description: `${request.applicant.name}'s application for ${request.jobTitle} has been rejected.`
        });
      }
    }
  };

  const sendSMS = (phone: string) => {
    toast({
      title: "SMS sent",
      description: `A message has been sent to ${phone}.`
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Job Applications</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Pending and Processed Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Job Position</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={request.applicant.avatar} alt={request.applicant.name} />
                        <AvatarFallback>{request.applicant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{request.applicant.name}</div>
                        <div className="text-sm text-muted-foreground">{request.applicant.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{request.jobTitle}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {request.applicant.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {request.applicant.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{request.applicant.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{request.appliedAt}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        request.status === 'accepted' ? 'default' : 
                        request.status === 'rejected' ? 'destructive' : 
                        'secondary'
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => viewApplicantProfile(request.applicant)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => sendSMS(request.applicant.phone)}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      
                      {request.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                            onClick={() => updateRequestStatus(request.id, 'accepted')}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          
                          <Button 
                            variant="outline"
                            size="sm"
                            className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                            onClick={() => updateRequestStatus(request.id, 'rejected')}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Applicant Profile</DialogTitle>
          </DialogHeader>
          
          {selectedApplicant && <UserProfileDetail user={selectedApplicant} />}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProfileOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
