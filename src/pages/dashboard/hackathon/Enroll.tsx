import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { FormInput, FormTextarea, FormSelect } from "@/components/forms/FormField";
import { useFormValidation, nameSchema, emailSchema, phoneSchema } from "@/hooks/useFormValidation";
import { z } from "zod";

const teamMemberSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  role: z.string().min(1, "Role is required"),
});

const enrollmentSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  university: z.string().min(2, "University name is required"),
  experience: z.string().min(1, "Please select experience level"),
  skills: z.string().min(10, "Please describe your skills (min 10 characters)"),
  teamFormation: z.string().min(1, "Please select team formation preference"),
  teamMembers: z.array(teamMemberSchema).max(3, "Maximum 3 team members allowed"),
  projectIdea: z.string().min(50, "Please describe your project idea (min 50 characters)"),
  hackathonEvent: z.string().min(1, "Please select a hackathon event"),
  tshirtSize: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  emergencyContact: phoneSchema,
}).refine((data) => {
  if (data.teamFormation === "I have a team already") {
    return data.teamMembers.length > 0;
  }
  return true;
}, {
  message: "At least one team member is required when you have a team",
  path: ["teamMembers"],
}).refine((data) => {
  const allEmails = [data.email, ...data.teamMembers.map(member => member.email)];
  return allEmails.length === new Set(allEmails).size;
}, {
  message: "Duplicate email addresses are not allowed",
  path: ["teamMembers"],
});

type FormData = z.infer<typeof enrollmentSchema>;

type TeamMember = {
  name: string;
  email: string;
  role: string;
};

const Enroll = () => {
  const navigate = useNavigate();
  const { errors, validate } = useFormValidation(enrollmentSchema);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    experience: "",
    skills: "",
    teamFormation: "",
    teamMembers: [],
    projectIdea: "",
    hackathonEvent: "",
    tshirtSize: "",
    dietaryRestrictions: "",
    emergencyContact: ""
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const hackathonEvents = [
    { value: "AI Innovation Hackathon 2024", label: "AI Innovation Hackathon 2024" },
    { value: "Blockchain BuildOut 2024", label: "Blockchain BuildOut 2024" },
    { value: "Quantum Computing Challenge 2024", label: "Quantum Computing Challenge 2024" },
    { value: "Robotics Challenge 2024", label: "Robotics Challenge 2024" },
    { value: "Full-Stack Web Hackathon 2024", label: "Full-Stack Web Hackathon 2024" },
    { value: "Cybersecurity CTF Challenge 2024", label: "Cybersecurity CTF Challenge 2024" }
  ];

  const experienceLevels = [
    { value: "Beginner (0-1 years)", label: "Beginner (0-1 years)" },
    { value: "Intermediate (2-3 years)", label: "Intermediate (2-3 years)" },
    { value: "Advanced (4-5 years)", label: "Advanced (4-5 years)" },
    { value: "Expert (6+ years)", label: "Expert (6+ years)" }
  ];

  const teamFormationOptions = [
    { value: "I have a team already", label: "I have a team already" },
    { value: "I need teammates", label: "I need teammates" },
    { value: "I prefer to work solo", label: "I prefer to work solo" },
    { value: "I'm flexible", label: "I'm flexible" }
  ];

  const roleOptions = [
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "Full-Stack Developer", label: "Full-Stack Developer" },
    { value: "UI/UX Designer", label: "UI/UX Designer" },
    { value: "Data Scientist", label: "Data Scientist" },
    { value: "DevOps Engineer", label: "DevOps Engineer" },
    { value: "Project Manager", label: "Project Manager" },
    { value: "Other", label: "Other" }
  ];

  const tshirtSizes = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < 3) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { name: "", email: "", role: "" }]
      }));
    }
  };

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validate(formData)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration Submitted!",
      description: "Redirecting to payment...",
    });

    // Redirect to payment page with hackathon data
    setTimeout(() => {
      navigate(`/payment?product=${formData.hackathonEvent}&amount=50&category=Hackathon`);
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Personal Information</h3>
            <FormInput
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={(value) => handleInputChange("fullName", value)}
              placeholder="Enter your full name"
              error={errors.fullName}
              required
            />
            <FormInput
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              placeholder="your.email@example.com"
              error={errors.email}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="phone"
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(value) => handleInputChange("phone", value)}
                placeholder="+1 (555) 123-4567"
                error={errors.phone}
                required
              />
              <FormInput
                name="university"
                label="University/Organization"
                value={formData.university}
                onChange={(value) => handleInputChange("university", value)}
                placeholder="Your institution"
                error={errors.university}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Team & Experience</h3>
            <FormSelect
              name="hackathonEvent"
              label="Hackathon Event"
              value={formData.hackathonEvent}
              onChange={(value) => handleInputChange("hackathonEvent", value)}
              options={hackathonEvents}
              placeholder="Select hackathon event"
              error={errors.hackathonEvent}
              required
            />
            <FormSelect
              name="experience"
              label="Programming Experience"
              value={formData.experience}
              onChange={(value) => handleInputChange("experience", value)}
              options={experienceLevels}
              placeholder="Select your experience level"
              error={errors.experience}
              required
            />
            <FormSelect
              name="teamFormation"
              label="Team Formation"
              value={formData.teamFormation}
              onChange={(value) => handleInputChange("teamFormation", value)}
              options={teamFormationOptions}
              placeholder="Select team preference"
              error={errors.teamFormation}
              required
            />

            {formData.teamFormation === "I have a team already" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-white">Team Members</h4>
                  <div className="text-sm text-gray-400">
                    {formData.teamMembers.length}/3 members
                  </div>
                </div>

                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="text-white font-medium">Team Member {index + 1}</h5>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTeamMember(index)}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        name={`teamMember-${index}-name`}
                        label="Full Name"
                        value={member.name}
                        onChange={(value) => updateTeamMember(index, "name", value)}
                        placeholder="Enter team member's name"
                        required
                      />
                      <FormInput
                        name={`teamMember-${index}-email`}
                        label="Email Address"
                        type="email"
                        value={member.email}
                        onChange={(value) => updateTeamMember(index, "email", value)}
                        placeholder="team.member@example.com"
                        required
                      />
                    </div>

                    <FormSelect
                      name={`teamMember-${index}-role`}
                      label="Role"
                      value={member.role}
                      onChange={(value) => updateTeamMember(index, "role", value)}
                      options={roleOptions}
                      placeholder="Select role"
                      required
                    />
                  </div>
                ))}

                {formData.teamMembers.length < 3 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTeamMember}
                    className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10"
                  >
                    + Add Team Member
                  </Button>
                )}

                {errors.teamMembers && (
                  <p className="text-red-400 text-sm">{errors.teamMembers}</p>
                )}
              </div>
            )}

            <FormTextarea
              name="skills"
              label="Technical Skills"
              value={formData.skills}
              onChange={(value) => handleInputChange("skills", value)}
              placeholder="List your programming languages, frameworks, and tools..."
              error={errors.skills}
              required
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Project Idea</h3>
            <FormTextarea
              name="projectIdea"
              label="Describe Your Project Idea"
              value={formData.projectIdea}
              onChange={(value) => handleInputChange("projectIdea", value)}
              placeholder="What problem will you solve? What technologies will you use? What impact will it have?"
              rows={8}
              error={errors.projectIdea}
              required
            />
            <p className="text-sm text-gray-400">
              Describe your initial project concept, target problem, and potential solutions. This helps us match you with the right mentors and resources.
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                name="tshirtSize"
                label="T-Shirt Size (Optional)"
                value={formData.tshirtSize || ""}
                onChange={(value) => handleInputChange("tshirtSize", value)}
                options={tshirtSizes}
                placeholder="Select size"
              />
              <FormInput
                name="emergencyContact"
                label="Emergency Contact"
                type="tel"
                value={formData.emergencyContact}
                onChange={(value) => handleInputChange("emergencyContact", value)}
                placeholder="Emergency contact number"
                error={errors.emergencyContact}
                required
              />
            </div>
            <FormInput
              name="dietaryRestrictions"
              label="Dietary Restrictions (Optional)"
              value={formData.dietaryRestrictions || ""}
              onChange={(value) => handleInputChange("dietaryRestrictions", value)}
              placeholder="Any dietary requirements?"
            />
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Next Step: Payment</h4>
              <p className="text-gray-300 text-sm">
                After submitting this form, you'll be redirected to complete the $50 registration fee. This fee covers meals, swag, and access to all hackathon resources.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="universal-page-bg">
        <div className="universal-content min-h-screen py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Hackathon Registration
              </h1>
              <p className="text-xl text-gray-300">
                Step {currentStep} of {totalSteps}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>Personal Info</span>
                <span>Team & Skills</span>
                <span>Project Idea</span>
                <span>Payment</span>
              </div>
            </div>

            {/* Form Card */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  Complete Your Registration
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Fill in the details below to secure your spot
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      onClick={handleNext}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Submit & Pay
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Enroll;
