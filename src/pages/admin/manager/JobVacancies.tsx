
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

// Mock job vacancy data
const mockJobVacancies = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    status: "active",
    requirements: "5+ years of React experience, TypeScript knowledge required",
    applicants: 12,
    createdAt: "2023-04-01"
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    location: "New York",
    status: "active",
    requirements: "3+ years of UI/UX experience, Figma proficiency",
    applicants: 8,
    createdAt: "2023-04-02"
  },
  {
    id: 3,
    title: "Project Manager",
    department: "Operations",
    location: "Chicago",
    status: "closed",
    requirements: "PMP certification, 5+ years of experience in Agile methodology",
    applicants: 15,
    createdAt: "2023-03-15"
  }
];

export const JobVacancies: React.FC = () => {
  const [vacancies, setVacancies] = useState(mockJobVacancies);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVacancy, setCurrentVacancy] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    requirements: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openNewVacancyForm = () => {
    setFormData({
      title: "",
      department: "",
      location: "",
      requirements: ""
    });
    setIsEditing(false);
    setOpen(true);
  };

  const openEditVacancyForm = (vacancy: any) => {
    setFormData({
      title: vacancy.title,
      department: vacancy.department,
      location: vacancy.location,
      requirements: vacancy.requirements
    });
    setCurrentVacancy(vacancy);
    setIsEditing(true);
    setOpen(true);
  };

  const handleSubmit = () => {
    if (isEditing && currentVacancy) {
      // Edit existing vacancy
      setVacancies(prev => 
        prev.map(v => v.id === currentVacancy.id ? { ...v, ...formData } : v)
      );
      toast({
        title: "Job vacancy updated",
        description: "The job vacancy has been successfully updated."
      });
    } else {
      // Create new vacancy
      const newVacancy = {
        id: vacancies.length + 1,
        ...formData,
        status: "active",
        applicants: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setVacancies(prev => [...prev, newVacancy]);
      toast({
        title: "Job vacancy created",
        description: "New job vacancy has been successfully posted."
      });
    }
    setOpen(false);
  };

  const deleteVacancy = (id: number) => {
    setVacancies(prev => prev.filter(v => v.id !== id));
    toast({
      title: "Job vacancy removed",
      description: "The job vacancy has been removed successfully.",
      variant: "destructive"
    });
  };

  const toggleVacancyStatus = (id: number) => {
    setVacancies(prev => 
      prev.map(v => v.id === id ? { ...v, status: v.status === 'active' ? 'closed' : 'active' } : v)
    );
    toast({
      title: "Status updated",
      description: "Job vacancy status has been updated successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Job Vacancies</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewVacancyForm}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Vacancy
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Job Vacancy" : "Create New Job Vacancy"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g., Engineering"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Remote, New York"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Enter job requirements and qualifications"
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>{isEditing ? "Update" : "Post"} Vacancy</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Vacancies</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vacancies.map((vacancy) => (
                <TableRow key={vacancy.id}>
                  <TableCell className="font-medium">{vacancy.title}</TableCell>
                  <TableCell>{vacancy.department}</TableCell>
                  <TableCell>{vacancy.location}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={vacancy.status === 'active' ? 'default' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => toggleVacancyStatus(vacancy.id)}
                    >
                      {vacancy.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{vacancy.applicants}</TableCell>
                  <TableCell>{vacancy.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openEditVacancyForm(vacancy)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteVacancy(vacancy.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
