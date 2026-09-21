import{j as e,L as s,A as i}from"./index-DIjsZlte.js";import{S as a}from"./SectionHeading-CAiarJ2O.js";import{S as r}from"./StackDiagram-CH7VKJpC.js";const n=[{id:"dashboard",title:"Connect Dashboard",description:"Browser-based control plane.",icon:e.jsx("span",{className:"text-blue-500 dark:text-blue-400",children:"⌜"})},{id:"layer",title:"Connection Layer",description:"Secure session transport with retries and backpressure.",icon:e.jsx("span",{className:"text-indigo-500 dark:text-indigo-400",children:"⇄"})},{id:"agent",title:"Anoneurx Connect Agent",description:"Persistent, identity-bound runtime on the server.",icon:e.jsx("span",{className:"text-emerald-500 dark:text-emerald-400",children:"⚙"})},{id:"linux",title:"Linux System",description:"Terminal, files, processes, services, logs and network.",icon:e.jsx("span",{className:"text-amber-500 dark:text-amber-400",children:"⊞"})}],d=()=>e.jsxs("div",{className:"flex flex-col",children:[e.jsx("section",{className:"relative pt-20 pb-16 px-4 sm:pt-28 sm:pb-24",children:e.jsxs("div",{className:"container-responsive",children:[e.jsx(a,{eyebrow:"Architecture",title:"How Connect works.",description:"A layered architecture where the dashboard orchestrates the Agent, and the Agent manages the Linux system."}),e.jsx("div",{className:"mt-12",children:e.jsx(r,{steps:n})})]})}),e.jsx("section",{className:"py-16 px-4 sm:py-20 lg:py-24",children:e.jsxs("div",{className:"container-responsive space-y-16",children:[[{title:"Agent",desc:"Runs on the user's server. It is the bridge between the dashboard and the Linux system."},{title:"Identity",desc:"The Agent has a persistent cryptographic server identity that is verified before any management session is allowed."},{title:"Authentication",desc:"Only authenticated clients can establish management sessions. No session is created without proof of identity."},{title:"Authorization",desc:"Operations are checked against the session's capabilities. The Agent refuses actions outside its granted scope."},{title:"Operations",desc:"Terminal, files, services, processes, logs and system information are all exposed through the Agent connection."},{title:"Audit",desc:"Administrative actions can be tracked and attributed, providing a verifiable record of server activity."}].map(t=>e.jsxs("div",{className:"flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-start sm:gap-6 dark:border-white/[0.06]",children:[e.jsx("h3",{className:"shrink-0 text-lg font-semibold text-slate-900 dark:text-white",children:t.title}),e.jsx("p",{className:"text-slate-500 dark:text-slate-400",children:t.desc})]},t.title)),e.jsxs("div",{className:"rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/[0.08] dark:bg-[#060708]",children:[e.jsx("h4",{className:"text-sm font-semibold text-slate-900 dark:text-white",children:"Example architecture diagram"}),e.jsx("pre",{className:"mt-4 overflow-x-auto text-xs text-slate-600 dark:text-slate-400",children:`┌─────────────────┐
│ Connect Dashboard │
└────────┬────────┘
         │ Secure Session
         ▼
┌─────────────────┐
│ Connection Layer │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Connect Agent   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Linux System   │
│  (terminal,      │
│   files, proc...)│
└─────────────────┘`})]}),e.jsx("div",{className:"text-center",children:e.jsxs(s,{to:"/blacklink",className:"inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300",children:["Back to overview ",e.jsx(i,{className:"h-4 w-4"})]})})]})})]});export{d as default};
