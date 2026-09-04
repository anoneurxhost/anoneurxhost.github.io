import{j as e,P as d,L as m,m as t,B as x,C as h,a as p,r as u,I as w}from"./index-R3YW14vS.js";import{A as b}from"./arrow-left-CJ4Fw7qk.js";import{C as j}from"./cloud-UcOK3FV_.js";import{C as a}from"./container-Cjc9TGXv.js";import{G as v}from"./git-branch-C9-cgr9h.js";import{S as N}from"./server-C1c418eA.js";import{C as f}from"./copy-3nY1aQLK.js";const s={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.5}}},i=({title:r,code:o})=>{const[l,n]=u.useState(!1),c=()=>{navigator.clipboard.writeText(o),n(!0),setTimeout(()=>n(!1),2e3)};return e.jsxs("div",{className:"rounded-lg overflow-hidden border border-white/[0.08]",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-2 bg-white/[0.04]",children:[e.jsx("span",{className:"text-xs text-white/40",children:r}),e.jsx("button",{onClick:c,className:"text-white/30 hover:text-white/60 transition-colors",children:l?e.jsx(w,{className:"w-3.5 h-3.5"}):e.jsx(f,{className:"w-3.5 h-3.5"})})]}),e.jsx("pre",{className:"p-4 bg-white/[0.02] overflow-x-auto text-sm text-white/70 font-mono",children:o})]})},E=()=>e.jsx(d,{children:e.jsx("div",{className:"min-h-screen py-20 px-4",children:e.jsxs("div",{className:"container mx-auto max-w-4xl",children:[e.jsxs(m,{to:"/docs",className:"inline-flex items-center gap-2 text-white/40 hover:text-white/70 mb-8 transition-colors",children:[e.jsx(b,{className:"w-4 h-4"})," Back to Documentation"]}),e.jsxs(t.div,{initial:"hidden",animate:"visible",variants:s,children:[e.jsxs(x,{className:"mb-4 bg-white/[0.06] border-white/[0.1] text-white/80",children:[e.jsx(j,{className:"w-3 h-3 mr-1"})," Deployment"]}),e.jsx("h1",{className:"text-3xl sm:text-4xl font-bold text-white mb-4",children:"Deployment Guide"}),e.jsx("p",{className:"text-white/50 mb-10 max-w-2xl",children:"Deploy with Docker, CI/CD via GitHub Actions, or manually to your own server."})]}),e.jsxs("div",{className:"space-y-10",children:[e.jsxs(t.div,{initial:"hidden",whileInView:"visible",viewport:{once:!0},variants:s,children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx(a,{className:"w-5 h-5 text-white/40"})," Docker Build"]}),e.jsx(i,{title:"bash",code:`docker build -t anoneurx-platform .
docker run -p 3000:3000 \\
  -e NODE_ENV=production \\
  -e MONGODB_URI=your-mongodb-uri \\
  -e JWT_SECRET=your-secret \\
  anoneurx-platform`})]}),e.jsxs(t.div,{initial:"hidden",whileInView:"visible",viewport:{once:!0},variants:s,children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx(a,{className:"w-5 h-5 text-white/40"})," Docker Compose"]}),e.jsx(i,{title:"docker-compose.yml",code:`version: '3.8'
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://db:27017/anoneurx
      - JWT_SECRET=\${JWT_SECRET}
    depends_on:
      - db
    restart: unless-stopped
  db:
    image: mongo:7
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped
volumes:
  mongo-data:`})]}),e.jsxs(t.div,{initial:"hidden",whileInView:"visible",viewport:{once:!0},variants:s,children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx(v,{className:"w-5 h-5 text-white/40"})," CI/CD with GitHub Actions"]}),e.jsx(i,{title:".github/workflows/deploy.yml",code:`name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Deploy to server
        run: |
          docker build -t anoneurx-platform .
          docker push your-registry/anoneurx-platform`})]}),e.jsxs(t.div,{initial:"hidden",whileInView:"visible",viewport:{once:!0},variants:s,children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx(N,{className:"w-5 h-5 text-white/40"})," Server Requirements"]}),e.jsx(h,{className:"bg-white/[0.03] border-white/[0.08]",children:e.jsxs(p,{className:"p-6 space-y-3 text-sm text-white/60",children:[e.jsxs("p",{children:[e.jsx("span",{className:"text-white/80 font-medium",children:"Small:"})," 2 CPU cores, 4GB RAM, 20GB disk"]}),e.jsxs("p",{children:[e.jsx("span",{className:"text-white/80 font-medium",children:"Medium:"})," 4 CPU cores, 8GB RAM, 50GB disk"]}),e.jsxs("p",{children:[e.jsx("span",{className:"text-white/80 font-medium",children:"Production:"})," 8+ CPU cores, 16GB+ RAM, 100GB+ SSD"]}),e.jsx("p",{className:"pt-2 text-white/40",children:"Kubernetes Helm charts are available in the /deploy/k8s directory."})]})})]})]})]})})});export{E as default};
