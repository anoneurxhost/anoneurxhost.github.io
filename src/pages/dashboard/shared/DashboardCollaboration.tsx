import DashboardLayout from "@/layouts/DashboardLayout";
import CollaborationSection from "@/components/dashboard/CollaborationSection";

const DashboardCollaboration = () => {
  return (
    <DashboardLayout title="Collaboration Management">
      <CollaborationSection />
    </DashboardLayout>
  );
};

export default DashboardCollaboration;