import{j as e,P as h,L as n,m as c,B as p,C as o,a as r,b as u,r as j,I as w,g as b}from"./index-kK-1aUMO.js";import{A as l}from"./arrow-left-SdsMPUtu.js";import{L as x}from"./layers-DyB82Tqd.js";import{C as g}from"./copy-Cx0WuCVD.js";import{M as v}from"./monitor-DZsvUMUH.js";import{G as N}from"./globe-Bd2ejZ72.js";import{S as y}from"./server-d6G10G2E.js";import{D as f}from"./database-CN2RT0Mm.js";const m={hidden:{opacity:0,y:20},visible:{opacity:1,y:0}},d=({code:t})=>{const[i,s]=j.useState(!1),a=()=>{navigator.clipboard.writeText(t),s(!0),setTimeout(()=>s(!1),2e3)};return e.jsxs("div",{className:"relative",children:[e.jsx("button",{onClick:a,className:"absolute top-3 right-3 text-white/30 hover:text-white/60 transition-colors",children:i?e.jsx(w,{className:"w-3.5 h-3.5"}):e.jsx(g,{className:"w-3.5 h-3.5"})}),e.jsx("pre",{className:"bg-black/40 backdrop-blur border border-white/10 rounded-lg p-4 text-sm font-mono text-green-300/80 overflow-x-auto whitespace-pre",children:t})]})},C=[{name:"Presentation Layer",icon:v,color:"text-blue-400",items:["React Pages (Lazy Loaded)","Reusable UI Components (shadcn/ui)","Framer Motion Animations","Responsive Tailwind CSS Layouts"]},{name:"State & Context Layer",icon:N,color:"text-purple-400",items:["AuthContext — Authentication state","UserContext — User profile data","NotificationContext — Real-time alerts","NavigationContext — Route management"]},{name:"Service Layer",icon:y,color:"text-green-400",items:["API Service (Axios/Fetch)","Auth API — Login, Register, Token Refresh","Role API — RBAC Management","Certificate Service — PDF Generation"]},{name:"Backend Layer",icon:x,color:"text-amber-400",items:["Express.js REST API","Route → Middleware → Controller Pattern","JWT Authentication + RBAC","Rate Limiting & Input Validation"]},{name:"Data Layer",icon:f,color:"text-cyan-400",items:["MongoDB with Mongoose ODM","User, Project, Application Models","Role & Permission Models","File & Content Models"]},{name:"Security Layer",icon:b,color:"text-red-400",items:["Helmet.js — HTTP Security Headers","CORS Configuration","Mongo Sanitize — NoSQL Injection Prevention","Rate Limiting — DDoS Protection"]}],B=()=>e.jsx(h,{children:e.jsxs("div",{className:"min-h-screen",children:[e.jsxs("section",{className:"relative py-24 sm:py-32 px-4",children:[e.jsx("div",{className:"absolute inset-0 overflow-hidden",children:e.jsx("div",{className:"absolute top-1/4 right-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"})}),e.jsxs("div",{className:"container mx-auto max-w-5xl relative z-10",children:[e.jsxs(n,{to:"/contributions",className:"inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-8 transition-colors",children:[e.jsx(l,{className:"w-4 h-4"})," Back to Contributions"]}),e.jsxs(c.div,{initial:"hidden",animate:"visible",variants:m,transition:{duration:.5},children:[e.jsxs(p,{className:"mb-6 bg-white/[0.06] border-white/[0.1] text-white/80",children:[e.jsx(x,{className:"w-3 h-3 mr-1"})," Architecture"]}),e.jsx("h1",{className:"text-white mb-4",children:"Architecture Overview"}),e.jsx("p",{className:"text-lg text-white/60 max-w-2xl",children:"Understand the system design, layers, and how components interact."})]})]})]}),e.jsx("section",{className:"py-16 px-4",children:e.jsxs("div",{className:"container mx-auto max-w-5xl",children:[e.jsx("h2",{className:"text-white mb-8",children:"System Architecture"}),e.jsx(o,{className:"bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]",children:e.jsx(r,{className:"p-6",children:e.jsx(d,{code:`┌─────────────────────────────────────────────────┐
│                   Client (React)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │  Pages   │ │Components│ │    Contexts       │ │
│  │ (Lazy)   │ │  (UI)    │ │ (Auth/Notif/Nav)  │ │
│  └────┬─────┘ └──────────┘ └────────┬─────────┘ │
│       │                              │           │
│  ┌────▼──────────────────────────────▼─────────┐ │
│  │          Services / API Layer               │ │
│  └────────────────┬────────────────────────────┘ │
└───────────────────┼──────────────────────────────┘
                    │ HTTP / REST
┌───────────────────▼──────────────────────────────┐
│              Express.js Server                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │  Routes  │ │Middleware│ │   Controllers     │ │
│  │          │ │Auth/RBAC │ │                   │ │
│  └────┬─────┘ └──────────┘ └────────┬─────────┘ │
│       │                              │           │
│  ┌────▼──────────────────────────────▼─────────┐ │
│  │           Models (Mongoose/MongoDB)         │ │
│  └─────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘`})})})]})}),e.jsx("section",{className:"py-16 px-4",children:e.jsxs("div",{className:"container mx-auto max-w-5xl",children:[e.jsx("h2",{className:"text-white mb-8",children:"Application Layers"}),e.jsx("div",{className:"grid sm:grid-cols-2 lg:grid-cols-3 gap-5",children:C.map((t,i)=>e.jsx(c.div,{initial:"hidden",whileInView:"visible",viewport:{once:!0},variants:m,transition:{delay:i*.08,duration:.4},children:e.jsx(o,{className:"bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] h-full",children:e.jsxs(r,{className:"p-5",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:"w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center",children:e.jsx(t.icon,{className:`w-5 h-5 ${t.color}`})}),e.jsx("h3",{className:"text-white",children:t.name})]}),e.jsx("ul",{className:"space-y-2",children:t.items.map((s,a)=>e.jsxs("li",{className:"text-xs text-white/50 flex items-start gap-2",children:[e.jsx("span",{className:"text-white/20 mt-1",children:"•"})," ",s]},a))})]})})},t.name))})]})}),e.jsx("section",{className:"py-16 px-4",children:e.jsxs("div",{className:"container mx-auto max-w-4xl",children:[e.jsx("h2",{className:"text-white mb-8",children:"Project Structure"}),e.jsx(o,{className:"bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]",children:e.jsx(r,{className:"p-6",children:e.jsx(d,{code:`src/
├── pages/              # Page components (lazy loaded)
├── components/         # Reusable UI components
│   └── ui/             # shadcn/ui primitives
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── layouts/            # Layout wrappers
├── data/               # Static JSON data
├── utils/              # Utility functions
└── types/              # TypeScript type definitions

server/
├── routes/             # API route definitions
├── controllers/        # Request handlers
├── middleware/          # Auth, validation, rate limiting
├── models/             # Mongoose/MongoDB models
├── config/             # Database, logger, multer config
├── seeds/              # Database seed scripts
└── validators/         # Input validation schemas`})})})]})}),e.jsx("section",{className:"py-16 px-4",children:e.jsx("div",{className:"container mx-auto max-w-3xl text-center",children:e.jsx(n,{to:"/contributions",children:e.jsxs(u,{variant:"outline",className:"gap-2 border-white/[0.1] text-white/70 hover:bg-white/[0.06]",children:[e.jsx(l,{className:"w-3 h-3"})," Back to Contributions"]})})})})]})});export{B as default};
