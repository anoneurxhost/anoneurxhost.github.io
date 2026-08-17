import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InternshipApply from './InternshipApply';
import { toast } from '@/hooks/use-toast';

const ProtectedInternshipApply = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    
    if (!userData) {
      toast({
        title: "Authentication Required",
        description: "Please log in to apply for internships.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    const user = JSON.parse(userData);
    
    if (user.role !== "intern") {
      toast({
        title: "Access Denied",
        description: "Only interns can apply for internships.",
        variant: "destructive",
      });
      navigate("/internships");
      return;
    }
  }, [navigate]);

  return <InternshipApply />;
};

export default ProtectedInternshipApply;