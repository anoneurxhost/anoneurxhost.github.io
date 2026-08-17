import { useNavigate, useSearchParams } from "react-router-dom";
import { UnifiedApplyForm, FormType } from "@/components/forms/UnifiedApplyForm";
import ApplyShell from "@/components/ApplyShell";

const typeLabels: Record<string, string> = {
  fellowship: "Tech Fellowship",
  research_grant: "Research Grant",
  tech_partnership: "Tech Partnership",
  startup_incubation: "Startup Incubation",
  global_exchange: "Global Exchange Program",
  other_opportunity: "Other Opportunity",
};

const OtherOpportunitiesApply = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const type = (params.get("type") || "other_opportunity") as FormType;
  const label = typeLabels[type] || "Opportunity";

  return (
    <ApplyShell
      badge="Apply"
      title={`Apply for`}
      highlight={label}
      subtitle="Submit your application — we review every week."
      backTo="/careers/other-opportunities"
      backLabel="Back to opportunities"
    >
      <div className="max-w-4xl mx-auto">
        <UnifiedApplyForm
          formType={type}
          targetId={type}
          targetTitle={label}
          onSuccess={() => navigate("/careers/other-opportunities")}
          onCancel={() => navigate("/careers/other-opportunities")}
        />
      </div>
    </ApplyShell>
  );
};

export default OtherOpportunitiesApply;
