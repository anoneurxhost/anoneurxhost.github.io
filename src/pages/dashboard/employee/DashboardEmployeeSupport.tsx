import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Clock, CheckCircle, AlertTriangle, Plus, Phone, Mail, HelpCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const DashboardEmployeeSupport = () => {
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [ticket, setTicket] = useState({
    subject: '',
    category: '',
    priority: '',
    description: ''
  });

  const supportTickets = [
    {
      id: 1,
      subject: "Password Reset Request",
      category: "IT Support",
      priority: "Medium",
      status: "In Progress",
      createdDate: "2024-06-20",
      lastUpdate: "2024-06-21"
    },
    {
      id: 2,
      subject: "Equipment Replacement",
      category: "Hardware",
      priority: "High",
      status: "Open",
      createdDate: "2024-06-18",
      lastUpdate: "2024-06-18"
    },
    {
      id: 3,
      subject: "Software Installation Request",
      category: "Software",
      priority: "Low",
      status: "Resolved",
      createdDate: "2024-06-15",
      lastUpdate: "2024-06-16"
    }
  ];

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "Contact IT support or use the self-service password reset portal.",
      category: "Account"
    },
    {
      question: "How do I request new equipment?",
      answer: "Submit a support ticket with category 'Hardware' and provide details of required equipment.",
      category: "Hardware"
    },
    {
      question: "What is the process for software installation?",
      answer: "Submit a request through the support portal with software details and business justification.",
      category: "Software"
    },
    {
      question: "How do I report a security incident?",
      answer: "Immediately contact the security team at security@company.com or call the emergency line.",
      category: "Security"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-green-600";
      case "In Progress": return "bg-blue-600";
      case "Open": return "bg-yellow-600";
      case "Closed": return "bg-gray-600";
      default: return "bg-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-600";
      case "Medium": return "bg-yellow-600";
      case "Low": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const handleSubmitTicket = () => {
    if (!ticket.subject || !ticket.category || !ticket.description) {
      toast("Please fill in all required fields");
      return;
    }

    toast("Support ticket submitted successfully!");
    setTicket({
      subject: '',
      category: '',
      priority: '',
      description: ''
    });
    setIsTicketOpen(false);
  };

  return (
    <DashboardLayout title="Employee Support">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-white/10 border-blue-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Employee Support Center</h2>
                <p className="text-blue-300">Get help with technical issues and workplace questions</p>
              </div>
              <Dialog open={isTicketOpen} onOpenChange={setIsTicketOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Ticket
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create Support Ticket</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Subject *</Label>
                      <Input
                        value={ticket.subject}
                        onChange={(e) => setTicket(prev => ({ ...prev, subject: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Brief description of the issue"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Category *</Label>
                        <select
                          value={ticket.category}
                          onChange={(e) => setTicket(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        >
                          <option value="">Select Category</option>
                          <option value="IT Support">IT Support</option>
                          <option value="Hardware">Hardware</option>
                          <option value="Software">Software</option>
                          <option value="Network">Network</option>
                          <option value="Security">Security</option>
                          <option value="HR">HR</option>
                          <option value="Facilities">Facilities</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-white">Priority</Label>
                        <select
                          value={ticket.priority}
                          onChange={(e) => setTicket(prev => ({ ...prev, priority: e.target.value }))}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        >
                          <option value="">Select Priority</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Critical">Critical</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-white">Description *</Label>
                      <Textarea
                        value={ticket.description}
                        onChange={(e) => setTicket(prev => ({ ...prev, description: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Detailed description of the issue"
                        rows={4}
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsTicketOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitTicket} className="bg-blue-600 hover:bg-blue-700">
                        Submit Ticket
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Quick Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6 text-center">
              <Phone className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Emergency Support</h3>
              <p className="text-xs text-gray-300 mb-3">24/7 emergency helpline</p>
              <Button variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/20">
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Email Support</h3>
              <p className="text-xs text-gray-300 mb-3">support@anoneurx.com</p>
              <Button variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500/20">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Live Chat</h3>
              <p className="text-xs text-gray-300 mb-3">Instant messaging support</p>
              <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/20">
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Support Tickets */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">My Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <Card key={ticket.id} className="bg-white/5 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-sm font-semibold text-white">{ticket.subject}</h3>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          <Badge className={getPriorityColor(ticket.priority)} variant="outline">
                            {ticket.priority}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          <span>{ticket.category}</span>
                          <span>Created: {ticket.createdDate}</span>
                          <span>Updated: {ticket.lastUpdate}</span>
                        </div>
                      </div>

                      <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-white/10">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <Card key={index} className="bg-white/5 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1">{faq.category}</Badge>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-white mb-1">{faq.question}</h4>
                        <p className="text-gray-300 text-sm">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardEmployeeSupport;