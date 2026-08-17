import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CollaborationForm = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formConfig = {
    research: {
      title: "Submit Research Paper",
      description: "Share your research findings with the academic community",
      fields: ["title", "description", "category"],
      categories: ["AI & Machine Learning", "Robotics", "Web Development", "Space Technology", "Cybersecurity"]
    },
    startup: {
      title: "Submit Startup Idea",
      description: "Present your innovative business idea for funding opportunities",
      fields: ["title", "description", "category"],
      categories: ["Technology", "Healthcare", "Education", "Environment", "Finance"]
    },
    showcase: {
      title: "Showcase Project",
      description: "Display your technical projects and achievements",
      fields: ["title", "description", "category"],
      categories: ["Web Application", "Mobile App", "Desktop Software", "Hardware Project", "Game Development"]
    },
    writing: {
      title: "Submit Technical Article",
      description: "Contribute to our knowledge base with technical content",
      fields: ["title", "description", "category"],
      categories: ["Tutorial", "Best Practices", "Technology Review", "Case Study", "How-to Guide"]
    },
    opensource: {
      title: "Contribute to Open Source",
      description: "Share your open source projects and contributions",
      fields: ["title", "description", "category"],
      categories: ["Library/Framework", "Tool/Utility", "Application", "Documentation", "Bug Fix"]
    },
    innovation: {
      title: "Join Innovation Lab",
      description: "Propose experimental projects and research initiatives",
      fields: ["title", "description", "category"],
      categories: ["Experimental Tech", "Research Project", "Prototype", "Proof of Concept", "Innovation Challenge"]
    }
  };

  const config = formConfig[type as keyof typeof formConfig];

  if (!config) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Form Not Found</h1>
            <Link to="/collaboration">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Collaboration
              </Button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Submission Successful!",
        description: "Your submission has been received and will be reviewed by our team.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        title: "",
        description: "",
        category: "",
        file: null,
      });

      // Redirect to payment
      setTimeout(() => {
        navigate(`/payment?product=${formData.title}&amount=15&category=Collaboration`);
      }, 1500);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="relative z-10">
          <Navigation />

          <section className="py-12 px-4">
            <div className="container mx-auto max-w-2xl">
              <Link to="/collaboration">
                <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Collaboration
                </Button>
              </Link>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">
                    {config.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {config.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-white">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-white/5 border-white/20 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-white/5 border-white/20 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="title" className="text-white">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category" className="text-white">Category</Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white"
                        required
                      >
                        <option value="">Select a category</option>
                        {config.categories.map(cat => (
                          <option key={cat} value={cat} className="text-black">
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-white">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white min-h-32"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="file" className="text-white">
                        Upload File (Optional)
                      </Label>
                      <div className="mt-2">
                        <input
                          id="file"
                          name="file"
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                        />
                        <label
                          htmlFor="file"
                          className="flex items-center justify-center w-full p-4 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors"
                        >
                          <Upload className="w-6 h-6 text-gray-400 mr-2" />
                          <span className="text-gray-300">
                            {formData.file ? formData.file.name : "Click to upload file"}
                          </span>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </PageTransition>
  );
};

export default CollaborationForm;
