/**
 * The staff consoles deliberately share the participant portal's presentation
 * primitives so the two surfaces are literally the same visual language.
 */
export {
  PortalPage as StaffPage,
  PortalSection as StaffSection,
  PageHeader,
  StatCard,
  ProgressBar,
  EmptyState,
  fadeUp,
  stagger,
} from "@/pages/portal/components/ui";
export { StatsGrid, type StatItem } from "@/pages/portal/components/StatsGrid";
