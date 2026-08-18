# Anoneurx Web SCO (Search Catalog Overview)

A comprehensive searchable overview of all routes, features, and search capabilities across the Anoneurx platform.

---

## 🏠 HOME & MARKETING

### Main Entry Points
- **Home** `/` - Marketing homepage (Index component)
- **About** `/about` - About the platform
- **CEO Profile** `/ceo` - CEO (Muhammad Qasim) profile
- **Contact** `/contact` - Contact form & support
- **Privacy Policy** `/privacy` - Privacy terms
- **Terms of Service** `/terms` - Service terms
- **Support** `/support` - Support resources
- **Cookies** `/cookies` - Cookie policy

### Key Products & Services
- **Artificial Intelligence** `/artificial-intelligence`
- **Robotics Systems** `/robotics-systems`
- **Web Development** `/web-development`
- **Blockchain Systems** `/blockchain-systems`
- **Operating Systems** `/operating-systems`
- **Space Projects** `/space-projects`
- **Arcadeum** `/arcadeum` - Community/gaming platform

---

## 🏢 BLACKWALL (OS & Infrastructure)

### Blackwall OS
- **Landing Page** `/blackwall` - Blackwall OS main page
- **Download** `/blackwall/download` - Download Blackwall
- **Features** `/blackwall/features` - Feature overview
- **Screenshots** `/blackwall/screenshots` - Visual showcase
- **Showcase** `/blackwall/showcase` - Live demos
- **About** `/blackwall/about` - About Blackwall
- **FAQ** `/blackwall/faq` - Frequently asked questions
- **Docs** `/docs/blackwall` - Documentation
- **Architecture** `/blackwall/architecture` - System architecture
- **Security** `/blackwall/security` - Security details
- **Performance** `/blackwall/performance` - Performance specs
- **Install Guide** `/blackwall/install` - Installation instructions
- **Support** `/blackwall/support` - Technical support
- **Contact** `/blackwall/contact` - Contact support
- **Login** `/blackwall/login` - Blackwall auth

### Blackwall Server
- **Server Dashboard** `/blackwall/server` - Main server page

---

## ☁️ CLOUD (Infrastructure & Compute)

### Main Cloud
- **Cloud Home** `/cloud` - Cloud services landing
- **Products** `/cloud/products` - Cloud product offerings
- **Pricing** `/cloud/pricing` - Pricing information
- **Docs** `/cloud/docs` - Cloud documentation
- **Status** `/cloud/status` - Service status
- **Security** `/cloud/security` - Security information
- **Contact** `/cloud/contact` - Cloud support contact
- **Login** `/cloud/login` - Cloud auth

### Cloud Compute
- **Virtual Machines** `/cloud/compute/virtual-machines`
- **GPU Servers** `/cloud/compute/gpu-servers`
- **Bare Metal** `/cloud/compute/bare-metal`
- **Kubernetes** `/cloud/compute/kubernetes`

### Cloud Storage
- **Object Storage** `/cloud/storage/object`
- **Block Storage** `/cloud/storage/block`
- **Backup Vault** `/cloud/storage/backup`
- **Archive Storage** `/cloud/storage/archive`

### Cloud Connect (Console)
- **Cloud Connect Login** `/cloud/connect/auth` → redirects to `/auth?mode=connect`
- **Connect Home** `/cloud/connect` - Connect dashboard home
- **Dashboard** `/cloud/connect/dashboard` - Main dashboard
- **Network** `/cloud/connect/network` - Network management
- **Storage** `/cloud/connect/storage` - Storage management
- **Users** `/cloud/connect/users` - User management
- **Firewall** `/cloud/connect/firewall` - Firewall settings
- **Terminal** `/cloud/connect/terminal` - Terminal access
- **SSH Keys** `/cloud/connect/ssh-keys` - SSH key management
- **Webhooks** `/cloud/connect/webhooks` - Webhook configuration
- **Settings** `/cloud/connect/settings` - Cloud Connect settings
- **Discover** `/cloud/connect/discover` - Resource discovery

---

## 💳 PAY (Payment & Banking)

### Banking Layer (formerly /pay prefix)
- **Banking Home** `/pay` - Main banking page
- **Features** `/pay/features` - Banking features
- **Security** `/pay/security` - Security details
- **About** `/pay/about` - About banking
- **Download** `/pay/download` - Download banking app
- **FAQ** `/pay/faq` - Frequently asked questions
- **Dashboard** `/pay/dashboard` - Banking account dashboard (requires auth)
- **Business Dashboard** `/pay/business` - Business account dashboard (requires auth)
- **Account Types** `/pay/account/:type` - Account type dashboard (requires auth)
- **Open Account** `/pay/open-account` - Account signup (requires auth)
- **Signup** `/pay/signup` - Redirect to auth
- **Contact** `/pay/contact` - Banking support
- **Support** `/pay/support` - Banking support resources
- **Login** `/pay/login` - Banking auth

### Payment Checkout
- **Checkout** `/checkout` - Payment checkout page
- **Payment (legacy)** `/payment` → redirects to `/checkout`

---

## 📚 EDUCATION

### University & Courses
- **University** `/university` - University overview
- **Courses** `/courses` - All courses listing
- **Course Detail** `/courses/:courseId` - Individual course page
- **Enroll** `/courses/:courseId/enroll` - Course enrollment form
- **Faculty** `/faculty` - Faculty/Professors directory
- **Professors** `/professors` → redirects to `/faculty`

### University Modules
- **Open Source Module** `/university/opensource`
- **Blackwall Module** `/university/blackwall`
- **Pay Module** `/university/pay`
- **Cloud Module** `/university/cloud`
- **Module Support** `/university/contact` & `

Welcome to React Native!

Visit documentation
/university/support`

### Module Pages
- **Generic Module Support** `/common/ModuleSupportPage`

---

## 👥 COMMUNITY & PEOPLE

### People & Team
- **People Directory** `/people` - Team/people listing
- **People Legacy** `/team` → redirects to `/people`
- **Team Member Profile** `/people/:name` - Individual profile
- **Team Member by Dept** `/people/:dept/:name` - Departmental profile
- **Legacy Profile Routes** `/team/:dept/:name` & `/team/:name` → legacy redirects

### Faculty Profiles
- **Faculty Profile** `/faculty/:department/:name` - Individual faculty profile

---

## 🎓 INTERNSHIP PROGRAM

### Internship Pages
- **Internships Listing** `/internships` - All internships
- **Internships (careers)** `/careers/internships` - Career hub internships
- **Apply** `/internships/apply` - Internship application (requires auth)
- **Apply by ID** `/internships/apply/:id` - Specific internship application (requires auth)
- **Apply (careers routes)** `/careers/internships/apply` & `/careers/internship/apply`
- **Verify** `/internship-verify` - Internship verification
- **Verify Auth** `/intern/verify` - Public verification page

### Intern Directory & Profiles
- **Interns Listing** `/intern` - Public intern directory
- **Intern Verification** `/intern/verify` - Verify intern status
- **Intern Profile** `/intern/:internId` - Individual intern profile
- **Intern by Name** `/intern/:department/:name` - Intern profile by department
- **Search Interns** - Use SearchFilterBar on `/intern` page (name, department, status)

### Intern Dashboard (Protected)
- **Dashboard** `/dashboard/intern` - Intern main dashboard
- **Certifications** `/dashboard/intern/certifications` - Earned certifications

---

## 🔍 SEARCH FUNCTIONALITY

### Public Search - Interns
**Location:** `/intern` page
**Search By:** Name, department, status, bio, location
**Features:**
- Live search input with real-time filtering
- Department filter dropdown (All, Engineering, Research, etc.)
- Status filter (All, Active, Completed)
- Brand-aware ranking (surfaces relevant results first)

**Example:** Type "Machine Learning" or "Alex" or filter by "Engineering" department

### Public Search - Faculty
**Location:** `/faculty` page
**Search By:** Name, department, expertise
**Features:**
- SearchFilterBar component for live filtering
- Department-based organization
- Placeholder: "Search faculty — try 'Anoneurx University'"

### Public Search - People
**Location:** `/people` page
**Search By:** Name, department, role
**Features:**
- Team member filtering and discovery
- Department-based navigation

### Portal Global Search
**Location:** `/portal/search` (requires auth)
**Search Across:** Courses, tasks, projects, certificates, events, people
**Features:**
- Unified search across all enrolled programs
- Quick filter links:
  - All Projects
  - All Courses
  - All Tasks
  - All Team Members
  - All Certificates
- Browsable index by category
- Search results grouped by type (Project, Course, Task, Certificate, etc.)

**Access:** For authenticated portal users

---

## 💼 CAREERS & OPPORTUNITIES

### Career Hub
- **Career Hub** `/careers` - Main careers page
- **Join Us** `/careers/join` - Join our team

### Hackathon
- **Hackathon Listing** `/hackathon` - Hackathon overview
- **Hackathon Verify** `/hackathon/verify` - Verify hackathon participation
- **Hackathon Enroll** `/hackathon/enroll` - Enroll in hackathon
- **Careers Hackathon** `/careers/hackathon` - Career track hackathon
- **Careers Hackathon Verify** `/careers/hackathon/verify`
- **Careers Hackathon Apply** `/careers/hackathon/apply` (requires auth)

### Dev Team
- **Join Dev Team** `/careers/join-dev-team` - Development team opportunities
- **Verify** `/careers/join-dev-team/verify` - Verify dev team status
- **Apply** `/careers/join-dev-team/apply` (requires auth)

### Other Opportunities
- **Opportunities** `/careers/other-opportunities`
- **Verify** `/careers/other-opportunities/verify`
- **All Opportunities** `/other-opportunities`
- **Apply** `/opportunities/apply` (requires auth)

### Specific Opportunities
- **Fellowships** `/opportunities/fellowships` - Fellowship programs
- **Research Grants** `/opportunities/research-grants` - Research grant opportunities
- **Tech Partnerships** `/opportunities/tech-partnerships` - Partnership programs
- **Startup Incubation** `/opportunities/startup-incubation` - Startup programs
- **Global Exchange** `/opportunities/global-exchange` - Exchange programs
- **Investment Opportunities** `/investment-opportunities` - Investment opportunities
- **Partnership Inquiry** `/partnership-inquiry` - Partnership inquiries

---

## 📖 RESEARCH & CONTENT

### Research
- **Research Hub** `/research` - Research overview
- **Read Paper** `/read/:id` - View research paper
- **Read Paper (legacy)** `/read-paper/:id` & `/research/read/:id` → redirect to `/read/:id`
- **Share Paper** `/share/paper/:id` & `/share/read/:id` & `/share/:id` → all to `/read/:id`
- **View in Journal** `/view-in-journal`
- **Strategic KPIs** `/strategic-kpis` - Strategic performance indicators

### Blogs
- **All Blogs** `/blogs/all` - Blog listing
- **Our Blogs** `/blogs` - Featured blogs
- **Read Blog** `/blog/:id` - Individual blog post

### Collaboration
- **Collaboration** `/collaboration` - Collaboration overview
- **Collaboration Form** `/collaboration/form` - General form
- **Collaboration Form (typed)** `/collaboration/form/:type` (requires auth)

### Documentation
- **Documentation Hub** `/documentation` - Main docs
- **Getting Started** `/docs/getting-started`
- **API Reference** `/docs/api-reference`
- **Deployment** `/docs/deployment`
- **Project Docs** `/docs/project/:projectId`

### ATLAS (Language)
- **ATLAS Home** `/atlas` - ATLAS programming language
- **ATLAS Docs** `/docs/atlas` - ATLAS documentation

---

## 🛠️ DEVELOPER & COMMUNITY

### Open Source
- **Open Source Hub** `/opensource` - Open source home
- **About** `/opensource/about` - About open source
- **Projects** `/opensource/projects` - Open source projects
- **Organizations** `/opensource/organizations` - Partner organizations
- **Libraries** `/opensource/libraries` - Open source libraries
- **Packages** `/opensource/packages` - Package registry
- **Templates** `/opensource/templates` - Project templates
- **VS Code Extensions** `/opensource/vscode-extensions` - VS Code extensions
- **Showcase** `/opensource/showcase` - Community showcase
- **Sponsors** `/opensource/sponsors` - Open source sponsors
- **Contributors** `/opensource/contributors` - Contributor list
- **Contribute** `/opensource/contribute` - How to contribute
- **Contribute Apply** `/opensource/contribute/apply` - Contributor application
- **Support** `/opensource/support` - Open source support
- **Contact** `/opensource/contact` - Open source contact

### Contributions Hub
- **Contributions Rewards** `/contributions/rewards` - Contribution rewards
- **How to Contribute** `/contributions/how-to-contribute` - Contribution guide
- **Review Progress** `/contributions/review-progress` - Review pipeline
- **Architecture** `/contributions/architecture` - Architecture docs
- **Security Policy** `/contributions/security` - Security policy
- **Code of Conduct** `/contributions/code-of-conduct` - Community CoC
- **Contributors List** `/opensource/contributors` - All contributors

### Community
- **Community** `/community` - Community hub
- **Community (OS module)** `/opensource/community` - Open source community
- **Events** `/community/events` & `/opensource/events` - Community events
- **Upcoming Events** `/community/events/upcoming`
- **Event Details** `/community/events/:eventId`
- **Event Register** `/community/events/:eventId/register`
- **Past Events** `/community/events/past`
- **Past Event Details** `/community/events/past/:eventId`
- **Host Event** `/community/events/host` - Host an event
- **Leaderboard** `/community/leaderboard` - Community leaderboard
- **Mentorship** `/community/mentorship` - Mentorship programs
- **Forums** `/community/forums` - Discussion forums
- **Forum Category** `/community/forums/:categoryId` - Forum category
- **Challenges** `/challenge/:challengeId` - Community challenges

---

## 🎮 APPS & MARKETPLACE

### Apps Marketplace
- **Apps Home** `/apps` - Apps marketplace landing
- **Browse** `/apps/browse` - Browse all apps
- **Categories** `/apps/categories` - App categories
- **Developers** `/apps/developers` - Developer profiles
- **About** `/apps/about` - About apps marketplace
- **Submit App** `/apps/submit` (requires auth) - Submit your app
- **Publisher Dashboard** `/apps/publisher` (requires auth) - Publisher console
- **Dashboard** `/apps/dashboard` (requires auth) - App developer dashboard
- **Login** `/apps/login` - Apps auth

---

## 📱 NEXORA (OS)

### Nexora Operating System
- **Nexora Home** `/nexora` - Nexora OS landing
- **Download** `/nexora/download` - Download Nexora
- **Features** `/nexora/features` - Feature showcase
- **Screenshots** `/nexora/screenshots` - Visual showcase
- **About** `/nexora/about` - About Nexora
- **FAQ** `/nexora/faq` - FAQ
- **Docs** `/nexora/docs` - Documentation
- **Changelog** `/nexora/changelog` - Version history
- **Community** `/nexora/community` - Community
- **Help** `/nexora/help` - Help & support
- **Privacy** `/nexora/privacy` - Privacy policy
- **Terms** `/nexora/terms` - Terms of service
- **Security** `/nexora/security` - Security details
- **Compare** `/nexora/compare` - Feature comparison
- **Developers** `/nexora/developers` - Developer resources
- **Blog** `/nexora/blog` - Nexora blog
- **AI** `/nexora-ai` - Nexora AI features
- **Switch to Nexora** `/switch-to-nexora` - Migration guide
- **Why Nexora** `/why-nexora` - Why choose Nexora
- **Bug Reports** `/reportbug` & `/reportbug/:product` - Report bugs
- **Nexora Login** `/nexora/login` - Nexora auth

---

## 📊 DASHBOARD (Protected Routes)

### Main Dashboard
- **Dashboard Home** `/dashboard` - User dashboard hub

### User Dashboards
- **Profile** `/dashboard/profile` - User profile management
- **Settings** `/dashboard/settings` - User settings
- **Users** `/dashboard/users` - User management (admin)
- **Documents** `/dashboard/documents` - Document library
- **Calendar** `/dashboard/calendar` - Calendar & scheduling

### Role-Specific Dashboards

#### CEO Dashboard
- **CEO Home** `/dashboard/ceo`
- **Analytics** `/dashboard/ceo/analytics`
- **Strategic KPIs** `/dashboard/ceo/strategic-kpis`
- **Finance** `/dashboard/ceo/finance`
- **Users** `/dashboard/ceo/users`
- **Departments** `/dashboard/ceo/departments`
- **Projects** `/dashboard/ceo/projects`
- **Internships** `/dashboard/ceo/internships`
- **Research** `/dashboard/ceo/research`
- **Content Manager** `/dashboard/ceo/content-manager`
- **Team Portfolios** `/dashboard/ceo/team-portfolios`
- **Audit Logs** `/dashboard/ceo/audit`
- **Chat** `/dashboard/ceo/chat`
- **Notifications** `/dashboard/ceo/notifications`
- **Profile** `/dashboard/ceo/profile`

#### HR Dashboard
- **HR Home** `/dashboard/hr`
- **Internships** `/dashboard/hr/internships`
- **Employees** `/dashboard/hr/employees`
- **Payroll** `/dashboard/hr/payroll`
- **Documents** `/dashboard/hr/documents`
- **Leave Management** `/dashboard/hr/leave`
- **Add Employee** `/dashboard/hr/add-employee`
- **Analytics** `/dashboard/hr/analytics`
- **Research** `/dashboard/hr/research`
- **Team Portfolios** `/dashboard/hr/team-portfolios`
- **Chat** `/dashboard/hr/chat`
- **Notifications** `/dashboard/hr/notifications`
- **Profile** `/dashboard/hr/profile`

#### HOD (Head of Department) Dashboard
- **HOD Home** `/dashboard/hod`
- **Staff** `/dashboard/hod/staff`
- **Interns** `/dashboard/hod/interns`
- **Performance** `/dashboard/hod/performance`
- **Budget** `/dashboard/hod/budget`
- **Projects** `/dashboard/hod/projects`
- **Add Staff** `/dashboard/hod/add-staff`
- **Research** `/dashboard/hod/research`
- **Team Portfolios** `/dashboard/hod/team-portfolios`
- **Documents** `/dashboard/hod/documents`
- **Chat** `/dashboard/hod/chat`
- **Notifications** `/dashboard/hod/notifications`
- **Profile** `/dashboard/hod/profile`

#### Employee Dashboard
- **Employee Home** `/dashboard/employee`
- **Tasks** `/dashboard/employee/tasks`
- **Performance** `/dashboard/employee/performance`
- **Documents** `/dashboard/employee/documents`
- **Leave** `/dashboard/employee/leave`
- **Support** `/dashboard/employee/support`
- **Research** `/dashboard/employee/research`

#### Faculty Dashboard
- **Faculty Home** `/dashboard/faculty`

#### Student Dashboard
- **Student Home** `/dashboard/student`
- **Courses** `/dashboard/student/courses`
- **Assignments** `/dashboard/student/assignments`
- **Grades** `/dashboard/student/grades`
- **Schedule** `/dashboard/student/schedule`
- **Resources** `/dashboard/student/resources`
- **Progress** `/dashboard/student/progress`
- **Projects** `/dashboard/student/projects`

#### Intern Dashboard
- **Intern Home** `/dashboard/intern`
- **Certifications** `/dashboard/intern/certifications`

#### Client Dashboard
- **Client Home** `/dashboard/client`
- **Projects** `/dashboard/client/projects`
- **Documents** `/dashboard/client/documents`
- **Billing** `/dashboard/client/billing`
- **Meetings** `/dashboard/client/meetings`
- **Settings** `/dashboard/client/settings`

#### Research Collaborator Dashboard
- **Research Collaborator** `/dashboard/research-collaborator`

#### Auditor Dashboard
- **Auditor Home** `/dashboard/auditor`
- **Finance Audit** `/dashboard/auditor/finance`
- **HR Audit** `/dashboard/auditor/hr`
- **Security Audit** `/dashboard/auditor/security`
- **Reports** `/dashboard/auditor/reports`
- **Compliance** `/dashboard/auditor/compliance`

#### Content Manager Dashboard
- **Content Manager Home** `/dashboard/content-manager`
- **Pages** `/dashboard/content-manager/pages`
- **Portfolio** `/dashboard/content-manager/portfolio`
- **Projects** `/dashboard/content-manager/projects`
- **Arcadeum** `/dashboard/content-manager/arcadeum`
- **Media** `/dashboard/content-manager/media`
- **Settings** `/dashboard/content-manager/settings`

#### Finance Manager Dashboard
- **Finance Manager Home** `/dashboard/finance-manager`
- **Features** `/dashboard/finance-manager/features`
- **Collaboration** `/dashboard/finance-manager/collaboration`
- **Salaries** `/dashboard/finance-manager/salaries`
- **Investment** `/dashboard/finance-manager/investment`
- **Reports** `/dashboard/finance-manager/reports`
- **Settings** `/dashboard/finance-manager/settings`

#### Shared Dashboards
- **Departments** `/dashboard/departments`
- **Finance** `/dashboard/finance`
- **Analytics** `/dashboard/analytics`
- **Projects** `/dashboard/projects`
- **Internships** `/dashboard/internships`
- **Research** `/dashboard/research`
- **Audit Logs** `/dashboard/audit`
- **Chat** `/dashboard/chat`
- **Messages** `/dashboard/messages`
- **Notifications** `/dashboard/notifications`
- **Collaboration** `/dashboard/collaboration`
- **Submitted Projects** `/dashboard/submitted-projects`
- **Hackathon** `/dashboard/hackathon`
- **Hackathon Verify** `/dashboard/hackathon/verify`
- **Hackathon Enroll** `/dashboard/hackathon/enroll`

### Project Management
- **Careers Submissions** `/careers/submissions` - Submitted projects

---

## 🎯 PORTAL (Unified Participant Portal)

**Access:** `/portal` (requires authentication)

### Portal Main Sections
- **Portal Home** `/portal` - Portal dashboard
- **University Module** `/portal/university/:section?` - University courses & programs
- **Internship Module** `/portal/internship/:section?` - Internship programs
- **Hackathon Module** `/portal/hackathon/:section?` - Hackathon participation

### Portal Features
- **Projects** `/portal/projects` - All projects workspace
- **Certificates** `/portal/certificates` - Certificates library
- **Documents** `/portal/documents` - Documents library
- **Calendar** `/portal/calendar` - Calendar & events
- **Notifications** `/portal/notifications` - Notification center
- **Messages** `/portal/messages` - Message inbox
- **Search** `/portal/search` - Global search (see SEARCH FUNCTIONALITY section)
- **Profile** `/portal/profile` - Portal profile management
- **Settings** `/portal/settings` - Portal settings

---

## 🔐 AUTHENTICATION

### Auth Routes
- **Login/Signup** `/auth` - Main auth page
- **Login** `/login` - Direct login
- **Signup** `/signup` - Direct signup
- **Cloud Connect Auth** `/cloud/connect/auth` → redirects to `/auth?mode=connect`
- **Connect Auth** `/auth/connect` - Connect-specific auth
- **Apps Login** `/apps/login`
- **Blackwall Login** `/blackwall/login`
- **Pay Login** `/pay/login`
- **Cloud Login** `/cloud/login`
- **Nexora Login** `/nexora/login`

---

## 📝 OTHER PAGES

### Projects
- **Submit Project** `/careers/submissions` & `/projects/submit` - Submit your project
- **Submitted Projects** `/projects/submitted` - View submitted projects

### Notes
- **Notes** `/notes` - Note-taking application

### Error & Utility
- **404 Not Found** `*` (catch-all) - 404 error page
- **Report Bug** `/reportbug` & `/reportbug/:product` - Bug report form

---

## 🔄 LEGACY REDIRECTS

| Old Route | New Route | Type |
|-----------|-----------|------|
| `/team/:dept/:name` | `/people/:dept/:name` | Profile |
| `/team/:name` | `/people/:name` | Profile |
| `/team` | `/people` | Directory |
| `/read-paper/:id` | `/read/:id` | Paper |
| `/research/read/:id` | `/read/:id` | Paper |
| `/research/read-paper/:id` | `/read/:id` | Paper |
| `/share/paper/:id` | `/read/:id` | Paper |
| `/share/read/:id` | `/read/:id` | Paper |
| `/share/:id` | `/read/:id` | Paper |
| `/professors` | `/faculty` | Directory |
| `/org/sponcers` | `/opensource/sponsors` | Redirect |
| `/org/contributers` | `/opensource/contributors` | Redirect |
| `/banking` | `/pay` | Product |
| `/payment` | `/checkout` | Payment |
| `/careers/internship/apply` | `/careers/internships/apply` | Form |
| `/careers/internships/apply` | `/internships/apply` | Form |

---

## 📊 SEARCH CAPABILITIES SUMMARY

### Type-Specific Search

| What | Where | Search By | Type |
|------|-------|-----------|------|
| **Interns** | `/intern` | Name, dept, status, bio | Public |
| **Faculty** | `/faculty` | Name, department, expertise | Public |
| **People** | `/people` | Name, department, role | Public |
| **Everything** | `/portal/search` | All content, courses, tasks | Portal (Auth) |
| **Courses** | `/courses` | Name, description | Public |
| **Blogs** | `/blogs/all` | Title, content | Public |
| **Research** | `/research` | Paper title, author | Public |
| **Apps** | `/apps/browse` | App name, category | Public |
| **Community** | `/community/forums` | Discussion topics | Public |

### Advanced Search Features
- **Real-time filtering** on public directories
- **Multi-filter support** (e.g., department + status)
- **Search indexing** across portal (if enrolled)
- **Ranking algorithm** for relevance
- **Category-based** grouping in portal search
- **Quick filters** for rapid access

---

## 🗂️ ROUTE ORGANIZATION

### Public Routes (No Auth Required)
- Home `/`
- Marketing pages
- Blackwall/Nexora/Cloud/Pay product pages
- Public directories (intern, faculty, people)
- Public profiles
- Search pages
- Documentation
- Contact/support pages

### Protected Routes (Auth Required)
- All `/dashboard/*` routes
- All `/portal/*` routes
- `/cloud/connect/*` routes
- Application forms (careers, internships, etc.)
- User settings & profiles

### Public + Auth Optional
- Intern profiles (public profile, auth for dashboard)
- Research papers (view public, save when auth)
- Community forums (browse, post requires auth)

---

## 🎯 QUICK ACCESS GUIDE

**I want to...** | **Go to...**
---|---
Find an intern | `/intern` (search by name/dept)
Find faculty | `/faculty` (search by expertise)
Find team members | `/people` (search by department)
Search everything | `/portal/search` (if logged in)
Apply for internship | `/internships/apply` (requires login)
Use Black Wall Cloud | `/cloud/connect` (requires login)
Access payment/banking | `/pay/dashboard` (requires login)
View research papers | `/research` (browse or search)
Join the community | `/community` (forums, events, leaderboard)
Contribute to open source | `/opensource/contribute`
Report a bug | `/reportbug/:product`
Access my dashboard | `/dashboard` (requires login)
View my portal | `/portal` (requires login)

---

## 📈 STATISTICS

- **Total Public Routes:** 150+
- **Total Protected Routes:** 80+
- **Dashboard Variants:** 11 (CEO, HR, HOD, Employee, Faculty, Student, Intern, Client, Researcher, Auditor, Content Manager, Finance Manager)
- **Search Surfaces:** 5 major (interns, faculty, people, portal, global)
- **Product Sections:** 7 (Blackwall, Nexora, Cloud, Pay, Apps, Anoneurx, Open Source)
- **Auth Types:** 5+ (Main, Connect, Apps, Blackwall, Nexora specific)

---

**Last Updated:** 2026-08-18  
**Scope:** Complete Anoneurx platform web application  
**Format:** Searchable routing catalog with feature highlights
