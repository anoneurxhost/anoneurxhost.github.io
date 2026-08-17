import DashboardLayout from "@/layouts/DashboardLayout";
import SubmittedProjectsSection from "@/components/dashboard/SubmittedProjectsSection";

const DashboardSubmittedProjects = () => {
  return (
    <DashboardLayout title="Submitted Projects">
      <SubmittedProjectsSection />
    </DashboardLayout>
  );
};

export default DashboardSubmittedProjects;