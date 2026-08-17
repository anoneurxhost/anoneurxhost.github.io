import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award,
  Download,
  X
} from "lucide-react";

interface InternDetailModalProps {
  intern: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: (id: string) => void;
}

const InternDetailModal = ({ intern, open, onOpenChange, onDelete }: InternDetailModalProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!intern) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": return "bg-success text-success-foreground";
      case "Under Review": return "bg-warning text-warning-foreground";
      case "Rejected": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(intern.applicationId);
      onOpenChange(false);
      setShowDeleteConfirm(false);
    }
  };

  const downloadCertificate = () => {
    // Simulate certificate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${intern.name}_certificate.pdf`;
    link.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-sm bg-transparent border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <User className="w-6 h-6" />
            Intern Details
          </DialogTitle>
          <DialogDescription>
            Comprehensive view of intern application and status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Full Name:</span>
                    <span>{intern.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <span className="text-blue-600">{intern.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Phone:</span>
                    <span>{intern.phone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">University:</span>
                    <span>{intern.university}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Program:</span>
                    <span>{intern.program}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Status:</span>
                    <Badge className={getStatusColor(intern.status)}>
                      {intern.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Application Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Application ID:</span>
                  <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {intern.applicationId}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Submitted Date:</span>
                  <span>{intern.submittedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Expected Decision:</span>
                  <span>{intern.expectedDecision}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4">
            <div className="flex gap-2">
              {intern.status === "Accepted" && (
                <Button onClick={downloadCertificate} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Certificate
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              {!showDeleteConfirm ? (
                <Button 
                  variant="destructive" 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Delete Intern
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    Confirm Delete
                  </Button>
                </div>
              )}
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InternDetailModal;