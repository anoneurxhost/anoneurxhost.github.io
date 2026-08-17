
import DashboardLayout from "@/layouts/DashboardLayout";
import ProjectsSection from "@/components/dashboard/ProjectsSection";

const DashboardProjects = () => {
  return (
    <DashboardLayout title="Project Management">
      <ProjectsSection />
    </DashboardLayout>
  );
};

export default DashboardProjects;
