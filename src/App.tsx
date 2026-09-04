import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import PageLoader from './components/PageLoader';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ConnectSessionProvider } from './pages/cloud/connect/ConnectSession';
import { NavigationProvider } from './contexts/NavigationContext';
import { AuthProvider } from './contexts/AuthContext';
import { PortalProvider } from './pages/portal/PortalContext';
import RequireAuth from './components/RequireAuth';

/** Legacy paper URLs (/read-paper/:id, /research/read/:id) → canonical /read/:id */
const LegacyPaperRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/read/${id}`} replace />;
};

/** Legacy /team/... profile URLs → canonical /people/... */
const LegacyTeamMemberRedirect = () => {
  const { dept, name } = useParams();
  if (dept && name) return <Navigate to={`/people/${dept}/${name}`} replace />;
  if (name) return <Navigate to={`/people/${name}`} replace />;
  return <Navigate to="/people" replace />;
};

// Layouts (keep static - they wrap everything)
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import StaffLayout from './layouts/staff/StaffLayout';
import StaffRoleGuard from './layouts/staff/StaffRoleGuard';
import StaffHomeRedirect from './layouts/staff/StaffHomeRedirect';

// Lazy-loaded Public Pages
import Index from './pages/marketing/Index';
const About = React.lazy(() => import('./pages/marketing/About'));
const Sponsors = React.lazy(() => import('./pages/marketing/Sponsors'));
const BlackwallServer = React.lazy(() => import('./pages/blackwall/BlackwallServer'));

const Collaboration = React.lazy(() => import('./pages/collaboration/Collaboration'));
const CollaborationForm = React.lazy(() => import('./pages/collaboration/CollaborationForm'));

const CareerHub = React.lazy(() => import('./pages/career/CareerHub'));
const JoinUs = React.lazy(() => import('./pages/career/JoinUs'));
const BlogsAll = React.lazy(() => import('./pages/blogs/BlogsAll'));
const ReadBlog = React.lazy(() => import('./pages/blogs/ReadBlog'));
const Research = React.lazy(() => import('./pages/research/Research'));
const ReadPaper = React.lazy(() => import('./pages/research/ReadPaper'));
const ViewInJournal = React.lazy(() => import('./pages/research/ViewInJournal'));
const Contact = React.lazy(() => import('./pages/marketing/Contact'));
const Team = React.lazy(() => import('./pages/community/Team'));
const TeamPortfolio = React.lazy(() => import('./pages/community/TeamPortfolio'));
const OurBlogs = React.lazy(() => import('./pages/blogs/OurBlogs'));
const TeamPortfoliosAdmin = React.lazy(() => import('./pages/dashboard/admin/TeamPortfoliosAdmin'));
const Internships = React.lazy(() => import('./pages/career/Internships'));
const InternshipApply = React.lazy(() => import('./pages/career/InternshipApply'));
const Auth = React.lazy(() => import('./pages/auth/Auth'));
// Marketing pages
const PartnershipInquiry = React.lazy(() => import('./pages/collaboration/PartnershipInquiry'));
const InvestmentOpportunities = React.lazy(() => import('./pages/marketing/InvestmentOpportunities'));
const Arcadeum = React.lazy(() => import('./pages/community/Arcadeum'));
const ArtificialIntelligence = React.lazy(() => import('./pages/marketing/ArtificialIntelligence'));
const RoboticsSystems = React.lazy(() => import('./pages/marketing/RoboticsSystems'));
const SpaceProjects = React.lazy(() => import('./pages/projects/SpaceProjects'));
const WebDevelopment = React.lazy(() => import('./pages/marketing/WebDevelopment'));
const InternshipApplyPage = React.lazy(() => import('./pages/career/InternshipApplyPage'));
const ProtectedInternshipApply = React.lazy(() => import('./pages/career/ProtectedInternshipApply'));
const Verify = React.lazy(() => import('./pages/verify/Verify'));
const Community = React.lazy(() => import('./pages/community/Community'));
const Documentation = React.lazy(() => import('./pages/docs/Documentation'));
const University = React.lazy(() => import('./pages/courses/University'));
const Courses = React.lazy(() => import('./pages/courses/Courses'));
const BlockchainSystems = React.lazy(() => import('./pages/marketing/BlockchainSystems'));
const OperatingSystems = React.lazy(() => import('./pages/marketing/OperatingSystems'));
const PrivacyPolicy = React.lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/legal/TermsOfService'));
const Cookies = React.lazy(() => import('./pages/legal/Cookies'));
const Support = React.lazy(() => import('./pages/legal/Support'));
const SubmitProject = React.lazy(() => import('./pages/projects/SubmitProject'));
const SubmittedProjects = React.lazy(() => import('./pages/projects/SubmittedProjects'));
const Professors = React.lazy(() => import('./pages/courses/Professors'));
const FacultyProfile = React.lazy(() => import('./pages/faculty/FacultyProfile'));
const InternList = React.lazy(() => import('./pages/intern/InternList'));
const InternProfile = React.lazy(() => import('./pages/intern/InternProfile'));

const CEOProfile = React.lazy(() => import('./pages/marketing/CEO'));

// Documentation subpages
const DocsGettingStarted = React.lazy(() => import('./pages/docs/GettingStarted'));
const DocsApiReference = React.lazy(() => import('./pages/docs/ApiReference'));
const DocsDeployment = React.lazy(() => import('./pages/docs/Deployment'));

// Community subpages
const CommunityEvents = React.lazy(() => import('./pages/community/Events'));
const CommunityLeaderboard = React.lazy(() => import('./pages/community/Leaderboard'));
const CommunityForums = React.lazy(() => import('./pages/community/Forums'));
const DiscussionCategory = React.lazy(() => import('./pages/community/DiscussionCategory'));
const UpcomingEvents = React.lazy(() => import('./pages/community/UpcomingEvents'));
const EventDetails = React.lazy(() => import('./pages/community/EventDetails'));
const EventRegister = React.lazy(() => import('./pages/community/EventRegister'));
const PastEvents = React.lazy(() => import('./pages/community/PastEvents'));
const PastEventDetails = React.lazy(() => import('./pages/community/PastEventDetails'));
const HostEvent = React.lazy(() => import('./pages/community/HostEvent'));
const MentorshipApply = React.lazy(() => import('./pages/community/MentorshipApply'));

// Docs subpages
const ProjectDocs = React.lazy(() => import('./pages/docs/ProjectDocs'));

// Anoneurx Apps Marketplace
const AppsHome = React.lazy(() => import('./pages/apps/AppsHome'));
const AppsBrowse = React.lazy(() => import('./pages/apps/AppsBrowse'));
const AppsCategories = React.lazy(() => import('./pages/apps/AppsCategories'));
const AppsDevelopers = React.lazy(() => import('./pages/apps/AppsDevelopers'));
const AppsAbout = React.lazy(() => import('./pages/apps/AppsAbout'));
const AppsDashboard = React.lazy(() => import('./pages/apps/AppsDashboard'));
const AppsSubmit = React.lazy(() => import('./pages/apps/AppsSubmit'));

// Anoneurx Banking
const BankingLayout = React.lazy(() => import('./pages/banking/BankingLayout'));
const BankingHome = React.lazy(() => import('./pages/banking/BankingHome'));
const BankingFeatures = React.lazy(() => import('./pages/banking/BankingFeatures'));
const BankingSecurity = React.lazy(() => import('./pages/banking/BankingSecurity'));
const BankingDownload = React.lazy(() => import('./pages/banking/BankingDownload'));
const BankingDashboard = React.lazy(() => import('./pages/banking/BankingDashboard'));
const BankingBusinessDashboard = React.lazy(() => import('./pages/banking/BankingBusinessDashboard'));
const BankingSignup = React.lazy(() => import('./pages/banking/BankingSignup'));
const AppsPublisherDashboard = React.lazy(() => import('./pages/apps/AppsPublisherDashboard'));
const BankingFAQ = React.lazy(() => import('./pages/banking/BankingFAQ'));
const BankingAbout = React.lazy(() => import('./pages/banking/BankingAbout'));
const Notes = React.lazy(() => import('./pages/notes/Notes'));
const Pay = React.lazy(() => import('./pages/payment/Pay'));
const PayDashboard = React.lazy(() => import('./pages/payment/PayDashboard'));

// Black Wall OS pages
const Blackwall = React.lazy(() => import('./pages/blackwall/Blackwall'));
const BlackwallDownload = React.lazy(() => import('./pages/blackwall/BlackwallDownload'));
const BlackwallFeatures = React.lazy(() => import('./pages/blackwall/BlackwallFeatures'));
const BlackwallScreenshots = React.lazy(() => import('./pages/blackwall/BlackwallScreenshots'));
const BlackwallShowcase = React.lazy(() => import('./pages/blackwall/BlackwallShowcase'));
const BlackwallAbout = React.lazy(() => import('./pages/blackwall/BlackwallAbout'));
const BlackwallFAQ = React.lazy(() => import('./pages/blackwall/BlackwallFAQ'));
const BlackwallDocs = React.lazy(() => import('./pages/blackwall/BlackwallDocs'));
const BlackwallArchitecture = React.lazy(() => import('./pages/blackwall/BlackwallArchitecture'));
const BlackwallSecurity = React.lazy(() => import('./pages/blackwall/BlackwallSecurity'));
const BlackwallPerformance = React.lazy(() => import('./pages/blackwall/BlackwallPerformance'));
const BlackwallSupport = React.lazy(() => import('./pages/blackwall/BlackwallSupport'));
const BlackwallInstall = React.lazy(() => import('./pages/blackwall/BlackwallInstall'));
const Atlas = React.lazy(() => import('./pages/atlas/Atlas'));
const AtlasDocs = React.lazy(() => import('./pages/docs/AtlasDocs'));

// Nexora pages
const Nexora = React.lazy(() => import('./pages/nexora/Nexora'));
const NexoraHome = React.lazy(() => import('./pages/nexora/Nexora'));
const NexoraDownload = React.lazy(() => import('./pages/nexora/NexoraDownload'));
const NexoraFeatures = React.lazy(() => import('./pages/nexora/NexoraFeatures'));
const NexoraScreenshots = React.lazy(() => import('./pages/nexora/NexoraScreenshots'));
const NexoraAbout = React.lazy(() => import('./pages/nexora/NexoraAbout'));
const NexoraFAQ = React.lazy(() => import('./pages/nexora/NexoraFAQ'));
const NexoraDocs = React.lazy(() => import('./pages/nexora/NexoraDocs'));
const NexoraChangelog = React.lazy(() => import('./pages/nexora/NexoraChangelog'));
const NexoraCommunity = React.lazy(() => import('./pages/nexora/NexoraCommunity'));
const NexoraHelp = React.lazy(() => import('./pages/nexora/NexoraHelp'));
const ReportBug = React.lazy(() => import('./pages/bugs/ReportBug'));
const NexoraPrivacy = React.lazy(() => import('./pages/nexora/NexoraPrivacy'));
const NexoraTerms = React.lazy(() => import('./pages/nexora/NexoraTerms'));
const NexoraSecurity = React.lazy(() => import('./pages/nexora/NexoraSecurity'));
const NexoraCompare = React.lazy(() => import('./pages/nexora/NexoraCompare'));
const NexoraDevelopers = React.lazy(() => import('./pages/nexora/NexoraDevelopers'));
const NexoraBlog = React.lazy(() => import('./pages/nexora/NexoraBlog'));
const NexoraAI = React.lazy(() => import('./pages/nexora/NexoraAI'));
const NexoraSwitch = React.lazy(() => import('./pages/nexora/NexoraSwitch'));
const NexoraWhy = React.lazy(() => import('./pages/nexora/NexoraWhy'));

// Open Source module
const OpenSourceLayout = React.lazy(() => import('./pages/opensource/OpenSourceLayout'));
const OpenSourceHome = React.lazy(() => import('./pages/opensource/OpenSourceHome'));
const OSAbout = React.lazy(() => import('./pages/opensource/OSAbout'));
const OSProjects = React.lazy(() => import('./pages/opensource/OSProjects'));
const OSOrganizations = React.lazy(() => import('./pages/opensource/OSOrganizations'));
const OSLibraries = React.lazy(() => import('./pages/opensource/OSLibraries'));
const OSPackages = React.lazy(() => import('./pages/opensource/OSPackages'));
const OSTemplates = React.lazy(() => import('./pages/opensource/OSTemplates'));
const OSVSCodeExtensions = React.lazy(() => import('./pages/opensource/OSVSCodeExtensions'));
const OSShowcase = React.lazy(() => import('./pages/opensource/OSShowcase'));
const OSReleases = React.lazy(() => import('./pages/opensource/OSReleases'));
const OSRoadmaps = React.lazy(() => import('./pages/opensource/OSRoadmaps'));
const OSDiscussions = React.lazy(() => import('./pages/opensource/OSDiscussions'));
const OSRepos = React.lazy(() => import('./pages/opensource/OSRepos'));
const OSProjectDetail = React.lazy(() => import('./pages/opensource/OSProjectDetail'));
const OSRepoDetail = React.lazy(() => import('./pages/opensource/OSRepoDetail'));
const OSSearch = React.lazy(() => import('./pages/opensource/OSSearch'));
const ProjectSubPage = React.lazy(() => import('./pages/opensource/ProjectSubPage'));
const OSContact = React.lazy(() => import('./pages/opensource/OSContact'));
const OSSponsorshipInquiry = React.lazy(() => import('./pages/opensource/OSSponsorshipInquiry'));

// Contributions subpages
const ContributorsPage = React.lazy(() => import('./pages/contributions/Contributors'));
const RewardsPage = React.lazy(() => import('./pages/contributions/Rewards'));
const HowToContribute = React.lazy(() => import('./pages/contributions/HowToContribute'));
const ReviewProgress = React.lazy(() => import('./pages/contributions/ReviewProgress'));
const ArchitecturePage = React.lazy(() => import('./pages/contributions/Architecture'));
const SecurityPolicyPage = React.lazy(() => import('./pages/contributions/SecurityPolicy'));
const CodeOfConductPage = React.lazy(() => import('./pages/contributions/CodeOfConduct'));
const OSContribute = React.lazy(() => import('./pages/opensource/OSContribute'));
const OSContributeApply = React.lazy(() => import('./pages/opensource/OSContributeApply'));

// Shared module contact / support + university tracks
const ModuleSupportPage = React.lazy(() => import('./pages/common/ModuleSupportPage'));
const UniversityModulePage = React.lazy(() => import('./pages/courses/university/UniversityModulePage'));

// New Pages
const OtherOpportunities = React.lazy(() => import('./pages/career/OtherOpportunities'));
const Fellowships = React.lazy(() => import('./pages/opportunities/Fellowships'));
const ResearchGrants = React.lazy(() => import('./pages/opportunities/ResearchGrants'));
const TechPartnerships = React.lazy(() => import('./pages/opportunities/TechPartnerships'));
const StartupIncubation = React.lazy(() => import('./pages/opportunities/StartupIncubation'));
const GlobalExchange = React.lazy(() => import('./pages/opportunities/GlobalExchange'));
const StrategicKPIs = React.lazy(() => import('./pages/research/StrategicKPIs'));
const Hackathon = React.lazy(() => import('./pages/hackathon/Hackathon'));
const HackathonEnroll = React.lazy(() => import('./pages/hackathon/HackathonEnroll'));
const OtherOpportunitiesApply = React.lazy(() => import('./pages/opportunities/OtherOpportunitiesApply'));

// Cloud Pages
const CloudHome = React.lazy(() => import('./pages/cloud/CloudHome'));
const CloudProducts = React.lazy(() => import('./pages/cloud/CloudProducts'));
const CloudPricing = React.lazy(() => import('./pages/cloud/CloudPricing'));
const CloudDocs = React.lazy(() => import('./pages/cloud/CloudDocs'));
const CloudStatus = React.lazy(() => import('./pages/cloud/CloudStatus'));
const CloudSecurity = React.lazy(() => import('./pages/cloud/CloudSecurity'));

// Cloud Compute Pages
const VirtualMachines = React.lazy(() => import('./pages/cloud/compute/VirtualMachines'));
const GPUServers = React.lazy(() => import('./pages/cloud/compute/GPUServers'));
const BareMetal = React.lazy(() => import('./pages/cloud/compute/BareMetal'));
const Kubernetes = React.lazy(() => import('./pages/cloud/compute/Kubernetes'));

// Cloud Storage Pages
const ObjectStorage = React.lazy(() => import('./pages/cloud/storage/ObjectStorage'));
const BlockStorage = React.lazy(() => import('./pages/cloud/storage/BlockStorage'));
const BackupVault = React.lazy(() => import('./pages/cloud/storage/BackupVault'));
const ArchiveStorage = React.lazy(() => import('./pages/cloud/storage/ArchiveStorage'));

// Cloud Connect (Black Wall console)
const ConnectLayout = React.lazy(() => import('./pages/cloud/connect/ConnectLayout'));
const ConnectAuth = React.lazy(() => import('./pages/auth/ConnectAuth'));
const ConnectHome = React.lazy(() => import('./pages/cloud/connect/ConnectHome'));
const ConnectDashboard = React.lazy(() => import('./pages/cloud/connect/ConnectDashboard'));
const ConnectNetwork = React.lazy(() => import('./pages/cloud/connect/ConnectNetwork'));
const ConnectStorage = React.lazy(() => import('./pages/cloud/connect/ConnectStorage'));
const ConnectUsers = React.lazy(() => import('./pages/cloud/connect/ConnectUsers'));
const ConnectFirewall = React.lazy(() => import('./pages/cloud/connect/ConnectFirewall'));
const ConnectTerminal = React.lazy(() => import('./pages/cloud/connect/ConnectTerminal'));
const ConnectSettings = React.lazy(() => import('./pages/cloud/connect/ConnectSettings'));
const ConnectDiscover = React.lazy(() => import('./pages/cloud/connect/ConnectDiscover'));
const ConnectSSHKeys = React.lazy(() => import('./pages/cloud/connect/ConnectSSHKeys'));
const ConnectWebhooks = React.lazy(() => import('./pages/cloud/connect/ConnectWebhooks'));
const RequireConnectAuth = React.lazy(() => import('./pages/cloud/connect/RequireConnectAuth'));

// Career Pages
const CareersHackathon = React.lazy(() => import('./pages/careers/Hackathon'));
const CareersHackathonApply = React.lazy(() => import('./pages/careers/HackathonApply'));
const CareersJoinDevTeam = React.lazy(() => import('./pages/careers/JoinDevTeam'));
const CareersJoinDevTeamApply = React.lazy(() => import('./pages/careers/JoinDevTeamApply'));


const CourseDetail = React.lazy(() => import('./pages/courses/CourseDetail'));
const EnrollForm = React.lazy(() => import('./pages/courses/EnrollForm'));
const ChallengeDetail = React.lazy(() => import('./pages/community/ChallengeDetail'));

// Dashboard Pages
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const DashboardCEO = React.lazy(() => import('./pages/dashboard/ceo/DashboardCEO'));
const DashboardProfile = React.lazy(() => import('./pages/dashboard/user/DashboardProfile'));
const DashboardUsers = React.lazy(() => import('./pages/dashboard/user/DashboardUsers'));
const DashboardDepartments = React.lazy(() => import('./pages/dashboard/shared/DashboardDepartments'));
const DashboardFinance = React.lazy(() => import('./pages/dashboard/finance/DashboardFinance'));
const DashboardAnalytics = React.lazy(() => import('./pages/dashboard/shared/DashboardAnalytics'));
const DashboardProjects = React.lazy(() => import('./pages/dashboard/shared/DashboardProjects'));
const DashboardInternships = React.lazy(() => import('./pages/dashboard/intern/DashboardInternships'));
const DashboardResearch = React.lazy(() => import('./pages/dashboard/research/DashboardResearch'));
const DashboardAuditLogs = React.lazy(() => import('./pages/dashboard/shared/DashboardAuditLogs'));
const DashboardDocuments = React.lazy(() => import('./pages/dashboard/shared/DashboardDocuments'));
const DashboardSettings = React.lazy(() => import('./pages/dashboard/user/DashboardSettings'));
const DashboardHR = React.lazy(() => import('./pages/dashboard/hr/DashboardHR'));
const DashboardHOD = React.lazy(() => import('./pages/dashboard/hod/DashboardHOD'));
const DashboardEmployee = React.lazy(() => import('./pages/dashboard/employee/DashboardEmployee'));
const DashboardFaculty = React.lazy(() => import('./pages/dashboard/faculty/DashboardFaculty'));
const DashboardClient = React.lazy(() => import('./pages/dashboard/client/DashboardClient'));
const DashboardStudent = React.lazy(() => import('./pages/dashboard/student/DashboardStudent'));
const DashboardIntern = React.lazy(() => import('./pages/dashboard/intern/DashboardIntern'));
const DashboardResearchCollaborator = React.lazy(() => import('./pages/dashboard/research/DashboardResearchCollaborator'));
const DashboardAuditor = React.lazy(() => import('./pages/dashboard/auditor/DashboardAuditor'));
const DashboardChat = React.lazy(() => import('./pages/dashboard/shared/DashboardChat'));
const DashboardMessages = React.lazy(() => import('./pages/dashboard/shared/DashboardMessages'));
const DashboardNotifications = React.lazy(() => import('./pages/dashboard/shared/DashboardNotifications'));
const DashboardCollaboration = React.lazy(() => import('./pages/dashboard/shared/DashboardCollaboration'));
const DashboardSubmittedProjects = React.lazy(() => import('./pages/dashboard/shared/DashboardSubmittedProjects'));
const DashboardHREmployees = React.lazy(() => import('./pages/dashboard/hr/DashboardHREmployees'));
const DashboardHRPayroll = React.lazy(() => import('./pages/dashboard/hr/DashboardHRPayroll'));
const DashboardHRDocuments = React.lazy(() => import('./pages/dashboard/hr/DashboardHRDocuments'));
const DashboardHRLeave = React.lazy(() => import('./pages/dashboard/hr/DashboardHRLeave'));
const DashboardHRAddEmployee = React.lazy(() => import('./pages/dashboard/hr/DashboardHRAddEmployee'));
const DashboardHODStaff = React.lazy(() => import('./pages/dashboard/hod/DashboardHODStaff'));
const DashboardHODInterns = React.lazy(() => import('./pages/dashboard/hod/DashboardHODInterns'));
const DashboardHODPerformance = React.lazy(() => import('./pages/dashboard/hod/DashboardHODPerformance'));
const DashboardEmployeeTasks = React.lazy(() => import('./pages/dashboard/employee/DashboardEmployeeTasks'));
const DashboardEmployeePerformance = React.lazy(() => import('./pages/dashboard/employee/DashboardEmployeePerformance'));
const DashboardClientProjects = React.lazy(() => import('./pages/dashboard/client/DashboardClientProjects'));
const DashboardClientDocuments = React.lazy(() => import('./pages/dashboard/client/DashboardClientDocuments'));
const DashboardClientBilling = React.lazy(() => import('./pages/dashboard/client/DashboardClientBilling'));
const DashboardClientMeetings = React.lazy(() => import('./pages/dashboard/client/DashboardClientMeetings'));
const DashboardClientSettings = React.lazy(() => import('./pages/dashboard/client/DashboardClientSettings'));
const DashboardStudentCourses = React.lazy(() => import('./pages/dashboard/student/DashboardStudentCourses'));
const DashboardStudentAssignments = React.lazy(() => import('./pages/dashboard/student/DashboardStudentAssignments'));
const DashboardStudentSchedule = React.lazy(() => import('./pages/dashboard/student/DashboardStudentSchedule'));
const DashboardStudentResources = React.lazy(() => import('./pages/dashboard/student/DashboardStudentResources'));
const DashboardStudentProgress = React.lazy(() => import('./pages/dashboard/student/DashboardStudentProgress'));
const DashboardStudentProjects = React.lazy(() => import('./pages/dashboard/student/DashboardStudentProjects'));
const DashboardInternCertifications = React.lazy(() => import('./pages/dashboard/intern/DashboardInternCertifications'));
const DashboardStudentGrades = React.lazy(() => import('./pages/dashboard/student/DashboardStudentGrades'));
const DashboardHODBudget = React.lazy(() => import('./pages/dashboard/hod/DashboardHODBudget'));
const DashboardHODProjects = React.lazy(() => import('./pages/dashboard/hod/DashboardHODProjects'));
const DashboardHODAddStaff = React.lazy(() => import('./pages/dashboard/hod/DashboardHODAddStaff'));
const DashboardEmployeeDocuments = React.lazy(() => import('./pages/dashboard/employee/DashboardEmployeeDocuments'));
const DashboardEmployeeLeave = React.lazy(() => import('./pages/dashboard/employee/DashboardEmployeeLeave'));
const DashboardEmployeeSupport = React.lazy(() => import('./pages/dashboard/employee/DashboardEmployeeSupport'));
const DashboardAuditorFinance = React.lazy(() => import('./pages/dashboard/auditor/DashboardAuditorFinance'));
const DashboardAuditorHR = React.lazy(() => import('./pages/dashboard/auditor/DashboardAuditorHR'));
const DashboardAuditorSecurity = React.lazy(() => import('./pages/dashboard/auditor/DashboardAuditorSecurity'));
const DashboardAuditorReports = React.lazy(() => import('./pages/dashboard/auditor/DashboardAuditorReports'));
const DashboardAuditorCompliance = React.lazy(() => import('./pages/dashboard/auditor/DashboardAuditorCompliance'));
const DashboardContentManager = React.lazy(() => import('./pages/dashboard/content-manager/DashboardContentManager'));
const DashboardContentManagerPages = React.lazy(() => import('./pages/dashboard/content-manager/DashboardContentManagerPages'));
const DashboardContentManagerPortfolio = React.lazy(() => import('./pages/dashboard/content-manager/DashboardContentManagerPortfolio'));
const DashboardContentManagerProjects = React.lazy(() => import('./pages/dashboard/content-manager/DashboardContentManagerProjects'));
const DashboardContentManagerArcadeum = React.lazy(() => import('./pages/dashboard/content-manager/DashboardContentManagerArcadeum'));
const DashboardContentManagerMedia = React.lazy(() => import('./pages/dashboard/content-manager/DashboardContentManagerMedia'));
const DashboardContentManagerSettings = React.lazy(() => import('./pages/dashboard/content-manager/DashboardContentManagerSettings'));
const DashboardFinanceManager = React.lazy(() => import('./pages/dashboard/finance/DashboardFinanceManager'));
const DashboardFinanceManagerFeatures = React.lazy(() => import('./pages/dashboard/finance/DashboardFinanceManagerFeatures'));
const DashboardFinanceManagerCollaboration = React.lazy(() => import('./pages/dashboard/finance/DashboardFinanceManagerCollaboration'));
const DashboardFinanceManagerSalaries = React.lazy(() => import('./pages/dashboard/finance/DashboardFinanceManagerSalaries'));
const DashboardFinanceManagerInvestment = React.lazy(() => import('./pages/dashboard/finance/DashboardFinanceManagerInvestment'));
const DashboardFinanceManagerReports = React.lazy(() => import('./pages/dashboard/finance/DashboardFinanceManagerReports'));
const DashboardFinanceManagerSettings = React.lazy(() => import('./pages/dashboard/finance/DashboardFinanceManagerSettings'));
const DashboardHRAnalytics = React.lazy(() => import('./pages/dashboard/hr/DashboardHRAnalytics'));
const DashboardHRInternships = React.lazy(() => import('./pages/dashboard/hr/DashboardHRInternships'));
const DashboardStrategicKPIs = React.lazy(() => import('./pages/dashboard/research/StrategicKPIs'));
const DashboardHackathon = React.lazy(() => import('./pages/dashboard/shared/Hackathon'));
const DashboardHackathonVerify = React.lazy(() => import('./pages/dashboard/hackathon/Verify'));
const DashboardHackathonEnroll = React.lazy(() => import('./pages/dashboard/hackathon/Enroll'));
const DashboardCalendar = React.lazy(() => import('./pages/dashboard/shared/DashboardCalendar'));
// Unified Participant Portal
const PortalLayout = React.lazy(() => import('./pages/portal/PortalLayout'));
const PortalDashboard = React.lazy(() => import('./pages/portal/PortalDashboard'));
const UniversityModule = React.lazy(() => import('./pages/portal/university/UniversityModule'));
const InternshipModule = React.lazy(() => import('./pages/portal/internship/InternshipModule'));
const HackathonModule = React.lazy(() => import('./pages/portal/hackathon/HackathonModule'));
const ProjectsWorkspace = React.lazy(() => import('./pages/portal/shared/ProjectsWorkspace'));
const CertificatesLibrary = React.lazy(() => import('./pages/portal/shared/CertificatesLibrary'));
const DocumentsLibrary = React.lazy(() => import('./pages/portal/shared/DocumentsLibrary'));
const PortalCalendar = React.lazy(() => import('./pages/portal/shared/PortalCalendar'));
const PortalNotifications = React.lazy(() => import('./pages/portal/shared/PortalNotifications'));
const PortalMessages = React.lazy(() => import('./pages/portal/shared/PortalMessages'));
const PortalSearch = React.lazy(() => import('./pages/portal/shared/PortalSearch'));
const PortalProfile = React.lazy(() => import('./pages/portal/shared/PortalProfile'));
const PortalSettings = React.lazy(() => import('./pages/portal/shared/PortalSettings'));
const NotFound = React.lazy(() => import('./pages/other/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationProvider>
          <UserProvider>
            <NotificationProvider>
            <ConnectSessionProvider>
            <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<Index />} />
                
                {/* Open Source module */}
                <Route path="opensource" element={<OpenSourceLayout />}>
                  <Route index element={<OpenSourceHome />} />
                  <Route path="about" element={<OSAbout />} />
                  <Route path="projects" element={<OSProjects />} />
                  <Route path="organizations" element={<OSOrganizations />} />
                  <Route path="libraries" element={<OSLibraries />} />
                  <Route path="packages" element={<OSPackages />} />
                  <Route path="templates" element={<OSTemplates />} />
                  <Route path="vscode-extensions" element={<OSVSCodeExtensions />} />
                  <Route path="showcase" element={<OSShowcase />} />
                  <Route path="releases" element={<OSReleases />} />
                  <Route path="roadmaps" element={<OSRoadmaps />} />
                  <Route path="discussions" element={<OSDiscussions />} />
                  <Route path="repos" element={<OSRepos />} />
                  <Route path="search" element={<OSSearch />} />
                  <Route path=":id" element={<OSProjectDetail />} />
                  <Route path=":id/:subPage" element={<ProjectSubPage />} />
                  <Route path="repos/:id" element={<OSRepoDetail />} />
                  <Route path="sponsors" element={<Sponsors />} />
                  <Route path="sponcers" element={<Navigate to="/opensource/sponsors" replace />} />
                  <Route path="community" element={<Community />} />
                  <Route path="events" element={<CommunityEvents />} />
                  <Route path="events/upcoming" element={<UpcomingEvents />} />
                  <Route path="events/:eventId" element={<EventDetails />} />
                  <Route path="events/:eventId/register" element={<EventRegister />} />
                  <Route path="events/past" element={<PastEvents />} />
                  <Route path="events/past/:eventId" element={<PastEventDetails />} />
                  <Route path="events/host" element={<HostEvent />} />
                  <Route path="contributors" element={<ContributorsPage />} />
                  <Route path="contributers" element={<Navigate to="/opensource/contributors" replace />} />
                  <Route path="contribute" element={<OSContribute />} />
                  <Route path="contribute/apply" element={<OSContributeApply />} />
                  <Route path="contact" element={<OSContact />} />
                  <Route path="partnership-inquiry" element={<OSSponsorshipInquiry />} />
                  <Route path="support" element={<ModuleSupportPage configKey="opensource-support" />} />
                  <Route path="contributions" element={<Navigate to="/opensource/contribute" replace />} />
                  <Route path="contributions/how-to-contribute" element={<HowToContribute />} />
                  <Route path="contributions/review-progress" element={<ReviewProgress />} />
                  <Route path="contributions/architecture" element={<ArchitecturePage />} />
                  <Route path="contributions/security" element={<SecurityPolicyPage />} />
                  <Route path="contributions/code-of-conduct" element={<CodeOfConductPage />} />
                  <Route path="contributions/rewards" element={<RewardsPage />} />
                  <Route path="contributions/contributors" element={<Navigate to="/opensource/contributors" replace />} />
                </Route>
                <Route path="about" element={<About />} />
                <Route path="sponsors" element={<Navigate to="/opensource/sponsors" replace />} />
                <Route path="sponcers" element={<Navigate to="/opensource/sponsors" replace />} />
                <Route path="events" element={<Navigate to="/opensource/events" replace />} />
                <Route path="events/*" element={<Navigate to="/opensource/events" replace />} />
                <Route path="contributors" element={<Navigate to="/opensource/contributors" replace />} />
                <Route path="contributers" element={<Navigate to="/opensource/contributors" replace />} />
                <Route path="portfolio" element={<Navigate to="/" replace />} />
                <Route path="community" element={<Navigate to="/opensource/community" replace />} />
                <Route path="community/events" element={<Navigate to="/opensource/events" replace />} />
                <Route path="community/events/*" element={<Navigate to="/opensource/events" replace />} />
                <Route path="community/leaderboard" element={<CommunityLeaderboard />} />
                <Route path="community/mentorship" element={<MentorshipApply />} />
                <Route path="community/forums" element={<CommunityForums />} />
                <Route path="community/forums/:categoryId" element={<DiscussionCategory />} />
                <Route path="docs/project/:projectId" element={<ProjectDocs />} />
                <Route path="contributions/contributors" element={<Navigate to="/opensource/contributors" replace />} />
                <Route path="contributions/rewards" element={<RewardsPage />} />
                <Route path="contributions/how-to-contribute" element={<HowToContribute />} />
                <Route path="contributions/review-progress" element={<ReviewProgress />} />
                <Route path="contributions/architecture" element={<ArchitecturePage />} />
                <Route path="contributions/security" element={<SecurityPolicyPage />} />
                <Route path="contributions/code-of-conduct" element={<CodeOfConductPage />} />

                <Route path="careers/submissions" element={<SubmittedProjects />} />
                <Route path="collaboration" element={<Collaboration />} />
                <Route path="collaboration/form" element={<CollaborationForm />} />
                <Route path="collaboration/form/:type" element={<RequireAuth><CollaborationForm /></RequireAuth>} />
                <Route path="dev-team" element={<Navigate to="/people" replace />} />
                <Route path="careers" element={<CareerHub />} />
                <Route path="careers/hackathon" element={<CareersHackathon />} />
                <Route path="careers/hackathon/verify" element={<Navigate to="/verify?mode=hackathon" replace />} />
                <Route path="careers/hackathon/apply" element={<RequireAuth><CareersHackathonApply /></RequireAuth>} />
                <Route path="careers/join-dev-team" element={<CareersJoinDevTeam />} />
                <Route path="careers/join-dev-team/verify" element={<Navigate to="/verify?mode=dev-team" replace />} />
                <Route path="careers/join-dev-team/apply" element={<RequireAuth><CareersJoinDevTeamApply /></RequireAuth>} />
                <Route path="careers/other-opportunities/verify" element={<Navigate to="/verify?mode=other" replace />} />
                <Route path="careers/join" element={<JoinUs />} />
                <Route path="blogs/all" element={<BlogsAll />} />
                <Route path="blog/:id" element={<ReadBlog />} />
                <Route path="research" element={<Research />} />
                <Route path="read/:id" element={<ReadPaper />} />
                <Route path="read-paper/:id" element={<LegacyPaperRedirect />} />
                <Route path="research/read/:id" element={<LegacyPaperRedirect />} />
                <Route path="research/read-paper/:id" element={<LegacyPaperRedirect />} />
                <Route path="share/paper/:id" element={<ReadPaper />} />
                <Route path="share/read/:id" element={<ReadPaper />} />
                <Route path="share/:id" element={<ReadPaper />} />
                <Route path="view-in-journal" element={<ViewInJournal />} />
                <Route path="contact" element={<Contact />} />
                {/* Team → People rename (keep team routes as backwards-compatible aliases) */}
                <Route path="people" element={<Team />} />
                <Route path="people/muhammadqasim" element={<Navigate to="/ceo" replace />} />
                <Route path="people/:dept/muhammadqasim" element={<Navigate to="/ceo" replace />} />
                <Route path="people/:name" element={<TeamPortfolio />} />
                <Route path="people/:dept/:name" element={<TeamPortfolio />} />
                <Route path="team" element={<Navigate to="/people" replace />} />
                <Route path="team/:dept/:name" element={<LegacyTeamMemberRedirect />} />
                <Route path="team/:name" element={<LegacyTeamMemberRedirect />} />
                <Route path="ceo" element={<CEOProfile />} />
                {/* Faculty */}
                <Route path="faculty/:department/:name" element={<FacultyProfile />} />
                {/* Unified Verification Route */}
                <Route path="verify" element={<Verify />} />
                {/* Interns (public) */}
                <Route path="intern" element={<InternList />} />
                <Route path="intern/verify" element={<Navigate to="/verify?mode=internship" replace />} />
                <Route path="intern/:internId" element={<InternProfile />} />
                <Route path="intern/:department/:name" element={<InternProfile />} />

                <Route path="blogs" element={<OurBlogs />} />
                <Route path="our-dev-team" element={<Navigate to="/people" replace />} />
                <Route path="internships" element={<Internships />} />
                <Route path="careers/internships" element={<Internships />} />
                <Route path="internships/apply" element={<RequireAuth><InternshipApply /></RequireAuth>} />
                <Route path="careers/internships/apply" element={<RequireAuth><InternshipApply /></RequireAuth>} />
                <Route path="careers/internship/apply" element={<RequireAuth><InternshipApply /></RequireAuth>} />
                <Route path="internships/apply/:id" element={<RequireAuth><ProtectedInternshipApply /></RequireAuth>} />
                <Route path="internship-apply" element={<RequireAuth><InternshipApply /></RequireAuth>} />
                <Route path="internship-verify" element={<Navigate to="/verify?mode=internship" replace />} />
                <Route path="auth" element={<Auth />} />
                <Route path="login" element={<Auth />} />
                <Route path="signup" element={<Auth />} />

                {/* Anoneurx Pay (formerly /banking) — uses its own layout wrapper */}
                <Route path="banking" element={<Navigate to="/pay" replace />} />
                <Route path="banking/*" element={<Navigate to="/pay" replace />} />
                <Route path="pay" element={<BankingLayout />}>
                  <Route index element={<BankingHome />} />
                  <Route path="features" element={<BankingFeatures />} />
                  <Route path="security" element={<BankingSecurity />} />
                  <Route path="about" element={<BankingAbout />} />
                  <Route path="download" element={<BankingDownload />} />
                  <Route path="dashboard" element={<RequireAuth><PayDashboard /></RequireAuth>} />
                  <Route path="business" element={<RequireAuth><PayDashboard /></RequireAuth>} />
                  <Route path="account/:type" element={<RequireAuth><PayDashboard /></RequireAuth>} />
                  <Route path="signup" element={<Navigate to="/auth?mode=signup&redirect=%2Fpay%2Fopen-account" replace />} />
                  <Route path="open-account" element={<RequireAuth><BankingSignup /></RequireAuth>} />
                  <Route path="faq" element={<BankingFAQ />} />
                </Route>

                {/* Checkout (formerly /pay) */}
                <Route path="payment" element={<Navigate to="/checkout" replace />} />
                <Route path="checkout" element={<Pay />} />
                <Route path="notes" element={<Notes />} />
                <Route path="nexora" element={<Nexora />} />
                <Route path="nexora/download" element={<NexoraDownload />} />
                <Route path="nexora/features" element={<NexoraFeatures />} />
                <Route path="nexora/screenshots" element={<NexoraScreenshots />} />
                <Route path="nexora/about" element={<NexoraAbout />} />
                <Route path="nexora/faq" element={<NexoraFAQ />} />
                <Route path="docs/nexora" element={<NexoraDocs />} />
                <Route path="nexora/docs" element={<NexoraDocs />} />
                <Route path="nexora/changelog" element={<NexoraChangelog />} />
                <Route path="nexora/community" element={<NexoraCommunity />} />
                <Route path="nexora/help" element={<NexoraHelp />} />
                <Route path="reportbug/:product" element={<ReportBug />} />
                <Route path="reportbug" element={<ReportBug />} />
                <Route path="nexora/report-bug" element={<ReportBug />} />
                <Route path="nexora/privacy" element={<NexoraPrivacy />} />
                <Route path="nexora/terms" element={<NexoraTerms />} />
                <Route path="nexora/security" element={<NexoraSecurity />} />
                <Route path="nexora/compare" element={<NexoraCompare />} />
                <Route path="nexora/developers" element={<NexoraDevelopers />} />
                <Route path="nexora/blog" element={<NexoraBlog />} />
                <Route path="nexora-ai" element={<NexoraAI />} />
                <Route path="switch-to-nexora" element={<NexoraSwitch />} />
                <Route path="why-nexora" element={<NexoraWhy />} />
                <Route path="nexora/login" element={<Auth />} />
                <Route path="blackwall" element={<Blackwall />} />
                <Route path="blackwall/download" element={<BlackwallDownload />} />
                <Route path="blackwall/features" element={<BlackwallFeatures />} />
                <Route path="blackwall/screenshots" element={<BlackwallScreenshots />} />
                <Route path="blackwall/showcase" element={<BlackwallShowcase />} />
                <Route path="blackwall/about" element={<BlackwallAbout />} />
                <Route path="blackwall/faq" element={<BlackwallFAQ />} />
                <Route path="blackwall/architecture" element={<BlackwallArchitecture />} />
                <Route path="blackwall/security" element={<BlackwallSecurity />} />
                <Route path="blackwall/performance" element={<BlackwallPerformance />} />
                <Route path="blackwall/server" element={<BlackwallServer />} />
                <Route path="blackwall/support" element={<BlackwallSupport />} />
                <Route path="blackwall/install" element={<BlackwallInstall />} />
                <Route path="blackwall/login" element={<Auth />} />
                <Route path="docs/blackwall" element={<BlackwallDocs />} />
                

                {/* ATLAS language */}
                <Route path="atlas" element={<Atlas />} />
                <Route path="docs/atlas" element={<AtlasDocs />} />

                {/* Anoneurx Apps Marketplace */}
                <Route path="apps" element={<AppsHome />} />
                <Route path="apps/browse" element={<AppsBrowse />} />
                <Route path="apps/categories" element={<AppsCategories />} />
                <Route path="apps/developers" element={<AppsDevelopers />} />
                <Route path="apps/about" element={<AppsAbout />} />
                <Route path="apps/dashboard" element={<RequireAuth><AppsDashboard /></RequireAuth>} />
                <Route path="apps/publisher" element={<RequireAuth><AppsPublisherDashboard /></RequireAuth>} />
                <Route path="apps/submit" element={<RequireAuth><AppsSubmit /></RequireAuth>} />
                <Route path="apps/login" element={<Auth />} />

                {/* Cloud Routes */}
                <Route path="cloud" element={<CloudHome />} />
                <Route path="cloud/products" element={<CloudProducts />} />
                <Route path="cloud/pricing" element={<CloudPricing />} />
                <Route path="cloud/docs" element={<CloudDocs />} />
                <Route path="cloud/status" element={<CloudStatus />} />
                <Route path="cloud/security" element={<CloudSecurity />} />
                <Route path="cloud/login" element={<Auth />} />

                {/* Cloud Compute Routes */}
                <Route path="cloud/compute/virtual-machines" element={<VirtualMachines />} />
                <Route path="cloud/compute/gpu-servers" element={<GPUServers />} />
                <Route path="cloud/compute/bare-metal" element={<BareMetal />} />
                <Route path="cloud/compute/kubernetes" element={<Kubernetes />} />

                {/* Cloud Storage Routes */}
                <Route path="cloud/storage/object" element={<ObjectStorage />} />
                <Route path="cloud/storage/block" element={<BlockStorage />} />
                <Route path="cloud/storage/backup" element={<BackupVault />} />
                <Route path="cloud/storage/archive" element={<ArchiveStorage />} />
                <Route path="partnership-inquiry" element={<PartnershipInquiry />} />
                <Route path="investment-opportunities" element={<InvestmentOpportunities />} />
                <Route path="arcadeum" element={<Arcadeum />} />
                <Route path="artificial-intelligence" element={<ArtificialIntelligence />} />
                <Route path="robotics-systems" element={<RoboticsSystems />} />
                <Route path="space-projects" element={<SpaceProjects />} />
                <Route path="web-development" element={<WebDevelopment />} />
                <Route path="other-opportunities" element={<OtherOpportunities />} />
                <Route path="opportunities/fellowships" element={<Fellowships />} />
                <Route path="opportunities/research-grants" element={<ResearchGrants />} />
                <Route path="opportunities/tech-partnerships" element={<TechPartnerships />} />
                <Route path="opportunities/startup-incubation" element={<StartupIncubation />} />
                <Route path="opportunities/global-exchange" element={<GlobalExchange />} />
                <Route path="opportunities/apply" element={<RequireAuth><OtherOpportunitiesApply /></RequireAuth>} />
                <Route path="strategic-kpis" element={<StrategicKPIs />} />
                <Route path="hackathon" element={<Hackathon />} />
                <Route path="hackathon/verify" element={<Navigate to="/verify?mode=hackathon" replace />} />
                <Route path="hackathon/enroll" element={<HackathonEnroll />} />

                <Route path="university" element={<University />} />
                <Route path="courses" element={<Courses />} />
                <Route path="courses/:courseId" element={<CourseDetail />} />
                <Route path="courses/:courseId/enroll" element={<EnrollForm />} />
                <Route path="faculty" element={<Professors />} />
                <Route path="university/opensource" element={<UniversityModulePage moduleKey="opensource" />} />
                <Route path="university/blackwall" element={<UniversityModulePage moduleKey="blackwall" />} />
                <Route path="university/pay" element={<UniversityModulePage moduleKey="pay" />} />
                <Route path="university/cloud" element={<UniversityModulePage moduleKey="cloud" />} />
                <Route path="university/contact" element={<ModuleSupportPage configKey="university-contact" />} />
                <Route path="university/support" element={<ModuleSupportPage configKey="university-support" />} />
                <Route path="blackwall/contact" element={<ModuleSupportPage configKey="blackwall-contact" />} />
                <Route path="pay/contact" element={<ModuleSupportPage configKey="pay-contact" />} />
                <Route path="pay/support" element={<ModuleSupportPage configKey="pay-support" />} />
                <Route path="cloud/contact" element={<ModuleSupportPage configKey="cloud-contact" />} />
                <Route path="professors" element={<Navigate to="/faculty" replace />} />
                <Route path="blockchain-systems" element={<BlockchainSystems />} />
                <Route path="operating-systems" element={<OperatingSystems />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<TermsOfService />} />
                <Route path="support" element={<Support />} />
                <Route path="cookies" element={<Cookies />} />
                <Route path="challenge/:challengeId" element={<ChallengeDetail />} />
              </Route>

              {/* Private Routes */}
              <Route path="/dashboard" element={<PrivateLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<DashboardProfile />} />
                <Route path="content-manager" element={<DashboardContentManager />} />
                <Route path="content-manager/pages" element={<DashboardContentManagerPages />} />
                <Route path="content-manager/portfolio" element={<DashboardContentManagerPortfolio />} />
                <Route path="content-manager/projects" element={<DashboardContentManagerProjects />} />
                <Route path="content-manager/arcadeum" element={<DashboardContentManagerArcadeum />} />
                <Route path="content-manager/media" element={<DashboardContentManagerMedia />} />
                <Route path="content-manager/settings" element={<DashboardContentManagerSettings />} />
                <Route path="finance-manager" element={<DashboardFinanceManager />} />
                <Route path="finance-manager/features" element={<DashboardFinanceManagerFeatures />} />
                <Route path="finance-manager/collaboration" element={<DashboardFinanceManagerCollaboration />} />
                <Route path="finance-manager/salaries" element={<DashboardFinanceManagerSalaries />} />
                <Route path="finance-manager/investment" element={<DashboardFinanceManagerInvestment />} />
                <Route path="finance-manager/reports" element={<DashboardFinanceManagerReports />} />
                <Route path="finance-manager/settings" element={<DashboardFinanceManagerSettings />} />

                <Route path="users" element={<DashboardUsers />} />
                <Route path="departments" element={<DashboardDepartments />} />
                <Route path="finance" element={<DashboardFinance />} />
                <Route path="analytics" element={<DashboardAnalytics />} />
                <Route path="projects" element={<DashboardProjects />} />
                <Route path="internships" element={<DashboardInternships />} />
                <Route path="research" element={<DashboardResearch />} />
                <Route path="audit" element={<DashboardAuditLogs />} />
                <Route path="settings" element={<DashboardSettings />} />
                <Route path="calendar" element={<DashboardCalendar />} />
                {/* CEO / HR / HOD consoles live in their own role-scoped trees below */}

                <Route path="employee" element={<DashboardEmployee />} />
                <Route path="faculty" element={<DashboardFaculty />} />
                <Route path="employee/tasks" element={<DashboardEmployeeTasks />} />
                <Route path="employee/performance" element={<DashboardEmployeePerformance />} />
                <Route path="employee/documents" element={<DashboardEmployeeDocuments />} />
                <Route path="employee/leave" element={<DashboardEmployeeLeave />} />
                <Route path="employee/support" element={<DashboardEmployeeSupport />} />
                <Route path="employee/research" element={<DashboardResearch />} />
                <Route path="client" element={<DashboardClient />} />
                <Route path="client/projects" element={<DashboardClientProjects />} />
                <Route path="client/documents" element={<DashboardClientDocuments />} />
                <Route path="client/billing" element={<DashboardClientBilling />} />
                <Route path="client/meetings" element={<DashboardClientMeetings />} />
                <Route path="client/settings" element={<DashboardClientSettings />} />
                <Route path="student" element={<DashboardStudent />} />
                <Route path="student/courses" element={<DashboardStudentCourses />} />
                <Route path="student/assignments" element={<DashboardStudentAssignments />} />
                <Route path="student/grades" element={<DashboardStudentGrades />} />
                <Route path="student/schedule" element={<DashboardStudentSchedule />} />
                <Route path="student/resources" element={<DashboardStudentResources />} />
                <Route path="student/progress" element={<DashboardStudentProgress />} />
                <Route path="student/projects" element={<DashboardStudentProjects />} />
                <Route path="intern" element={<DashboardIntern />} />
                <Route path="intern/certifications" element={<DashboardInternCertifications />} />
                <Route path="research-collaborator" element={<DashboardResearchCollaborator />} />
                <Route path="auditor" element={<DashboardAuditor />} />
                <Route path="auditor/finance" element={<DashboardAuditorFinance />} />
                <Route path="auditor/hr" element={<DashboardAuditorHR />} />
                <Route path="auditor/security" element={<DashboardAuditorSecurity />} />
                <Route path="auditor/reports" element={<DashboardAuditorReports />} />
                <Route path="auditor/compliance" element={<DashboardAuditorCompliance />} />
                <Route path="strategic-kpis" element={<DashboardStrategicKPIs />} />
                <Route path="hackathon" element={<DashboardHackathon />} />
                <Route path="hackathon/verify" element={<DashboardHackathonVerify />} />
                <Route path="hackathon/enroll" element={<DashboardHackathonEnroll />} />
                <Route path="documents" element={<DashboardDocuments />} />
                <Route path="chat" element={<DashboardChat />} />
                <Route path="messages" element={<DashboardMessages />} />
                <Route path="notifications" element={<DashboardNotifications />} />
                <Route path="collaboration" element={<DashboardCollaboration />} />
                <Route path="submitted-projects" element={<DashboardSubmittedProjects />} />
              </Route>

              {/* ===== Staff consoles — shared UI, strictly one role per account ===== */}
              <Route
                path="/dashboard/ceo"
                element={
                  <StaffRoleGuard role="ceo">
                    <StaffLayout />
                  </StaffRoleGuard>
                }
              >
                <Route index element={<DashboardCEO />} />
                <Route path="chat" element={<DashboardChat />} />
                <Route path="users" element={<DashboardUsers />} />
                <Route path="departments" element={<DashboardDepartments />} />
                <Route path="finance" element={<DashboardFinance />} />
                <Route path="strategic-kpis" element={<DashboardStrategicKPIs />} />
                <Route path="analytics" element={<DashboardAnalytics />} />
                <Route path="projects" element={<DashboardProjects />} />
                <Route path="internships" element={<DashboardInternships />} />
                <Route path="research" element={<DashboardResearch />} />
                <Route path="content-manager" element={<DashboardContentManager />} />
                <Route path="team-portfolios" element={<TeamPortfoliosAdmin />} />
                <Route path="audit" element={<DashboardAuditLogs />} />
                <Route path="documents" element={<DashboardDocuments />} />
                <Route path="notifications" element={<DashboardNotifications />} />
                <Route path="profile" element={<DashboardProfile />} />
                <Route path="settings" element={<DashboardSettings />} />
              </Route>

              <Route
                path="/dashboard/hr"
                element={
                  <StaffRoleGuard role="hr">
                    <StaffLayout />
                  </StaffRoleGuard>
                }
              >
                <Route index element={<DashboardHR />} />
                <Route path="chat" element={<DashboardChat />} />
                <Route path="internships" element={<DashboardHRInternships />} />
                <Route path="employees" element={<DashboardHREmployees />} />
                <Route path="payroll" element={<DashboardHRPayroll />} />
                <Route path="documents" element={<DashboardHRDocuments />} />
                <Route path="documents-register" element={<DashboardDocuments />} />
                <Route path="leave" element={<DashboardHRLeave />} />
                <Route path="analytics" element={<DashboardHRAnalytics />} />
                <Route path="research" element={<DashboardResearch />} />
                <Route path="team-portfolios" element={<TeamPortfoliosAdmin />} />
                <Route path="add-employee" element={<DashboardHRAddEmployee />} />
                <Route path="notifications" element={<DashboardNotifications />} />
                <Route path="profile" element={<DashboardProfile />} />
                <Route path="settings" element={<DashboardSettings />} />
              </Route>

              <Route
                path="/dashboard/hod"
                element={
                  <StaffRoleGuard role="hod">
                    <StaffLayout />
                  </StaffRoleGuard>
                }
              >
                <Route index element={<DashboardHOD />} />
                <Route path="chat" element={<DashboardChat />} />
                <Route path="staff" element={<DashboardHODStaff />} />
                <Route path="interns" element={<DashboardHODInterns />} />
                <Route path="performance" element={<DashboardHODPerformance />} />
                <Route path="budget" element={<DashboardHODBudget />} />
                <Route path="projects" element={<DashboardHODProjects />} />
                <Route path="research" element={<DashboardResearch />} />
                <Route path="add-staff" element={<DashboardHODAddStaff />} />
                <Route path="team-portfolios" element={<TeamPortfoliosAdmin />} />
                <Route path="documents" element={<DashboardDocuments />} />
                <Route path="notifications" element={<DashboardNotifications />} />
                <Route path="profile" element={<DashboardProfile />} />
                <Route path="settings" element={<DashboardSettings />} />
              </Route>

              {/* Legacy flat staff links → the signed-in role's own console */}
              <Route path="/dashboard/team-portfolios" element={<StaffHomeRedirect to="team-portfolios" />} />
              <Route path="/dashboard/strategic-kpis" element={<StaffHomeRedirect to="strategic-kpis" />} />



              {/* Unified Participant Portal — one account, one profile, every program */}
              <Route
                path="/portal"
                element={
                  <RequireAuth>
                    <PortalProvider>
                      <PortalLayout />
                    </PortalProvider>
                  </RequireAuth>
                }
              >
                <Route index element={<PortalDashboard />} />
                <Route path="university/:section?" element={<UniversityModule />} />
                <Route path="internship/:section?" element={<InternshipModule />} />
                <Route path="hackathon/:section?" element={<HackathonModule />} />
                <Route path="projects" element={<ProjectsWorkspace />} />
                <Route path="certificates" element={<CertificatesLibrary />} />
                <Route path="documents" element={<DocumentsLibrary />} />
                <Route path="calendar" element={<PortalCalendar />} />
                <Route path="notifications" element={<PortalNotifications />} />
                <Route path="messages" element={<PortalMessages />} />
                <Route path="search" element={<PortalSearch />} />
                <Route path="profile" element={<PortalProfile />} />
                <Route path="settings" element={<PortalSettings />} />
              </Route>

              {/* Black Wall Cloud Connect — standalone console, no site nav/footer */}
              <Route path="/cloud/connect/auth" element={<Navigate to="/auth?mode=connect" replace />} />
              <Route path="/cloud/connect" element={<RequireConnectAuth><ConnectLayout /></RequireConnectAuth>}>
                <Route index element={<ConnectHome />} />
                <Route path="dashboard" element={<ConnectDashboard />} />
                <Route path="discover" element={<ConnectDiscover />} />
                <Route path="network" element={<ConnectNetwork />} />
                <Route path="storage" element={<ConnectStorage />} />
                <Route path="users" element={<ConnectUsers />} />
                <Route path="firewall" element={<ConnectFirewall />} />
                <Route path="terminal" element={<ConnectTerminal />} />
                <Route path="ssh-keys" element={<ConnectSSHKeys />} />
                <Route path="webhooks" element={<ConnectWebhooks />} />
                <Route path="settings" element={<ConnectSettings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
            </ConnectSessionProvider>
            </NotificationProvider>
          </UserProvider>
        </NavigationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
