import{j as e,B as j,x as d,ac as w,y as N,d as C,ad as S,z as A,r as c,b as v,D as I,J as o,C as x,a as p,v as k,P,ae as D}from"./index-CDlEK5GC.js";import{I as E}from"./input-dL0Gpgh1.js";import{C as u}from"./circle-check-big-C9t7HUz9.js";import{M as R}from"./mail-Dtjvf9y6.js";import{P as T}from"./phone-Cj7THq9U.js";import{S as F}from"./star-Cu0ndk7N.js";import{E as L}from"./jspdf.es.min-FzSFQtYl.js";import U from"./html2canvas.esm-CBrSDip1.js";import{L as O}from"./loader-circle-PnfRdGqT.js";import{F as z}from"./file-check-CA4-7O5j.js";import{A as G}from"./arrow-left-p8lRcpPW.js";const M=({status:t,applicationId:a,program:s,submittedDate:r})=>{const i=n=>{switch(n){case"Accepted":return e.jsx(u,{className:"w-8 h-8 text-green-400"});case"Under Review":return e.jsx(d,{className:"w-8 h-8 text-yellow-400"});case"Rejected":return e.jsx(w,{className:"w-8 h-8 text-red-400"});default:return e.jsx(d,{className:"w-8 h-8 text-gray-400"})}},l=n=>{switch(n){case"Accepted":return"bg-green-500/20 text-green-300 border-green-500/30";case"Under Review":return"bg-yellow-500/20 text-yellow-300 border-yellow-500/30";case"Rejected":return"bg-red-500/20 text-red-300 border-red-500/30";default:return"bg-gray-500/20 text-gray-300 border-gray-500/30"}};return e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("div",{className:"flex justify-center mb-4",children:i(t)}),e.jsx("h1",{className:"text-3xl font-bold text-white mb-2",children:"Internship Application Status"}),e.jsx(j,{className:`text-lg px-6 py-2 ${l(t)}`,children:t}),e.jsx("div",{className:"border-t border-gray-700 pt-6 mt-6",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-gray-400 text-sm mb-1",children:"Application ID"}),e.jsx("p",{className:"text-white font-mono text-lg",children:a})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-gray-400 text-sm mb-1",children:"Program"}),e.jsx("p",{className:"text-white font-medium text-lg",children:s})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-gray-400 text-sm mb-1",children:"Applied Date"}),e.jsx("p",{className:"text-white font-medium text-lg",children:r})]})]})})]})},W=({name:t,email:a,phone:s,university:r,program:i,status:l})=>e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center space-x-4 mb-6",children:[e.jsx("div",{className:"w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center",children:e.jsx(N,{className:"w-8 h-8 text-white"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-white",children:t}),e.jsx("p",{className:"text-gray-400",children:"Internship Candidate"})]}),l==="Accepted"&&e.jsx("div",{className:"ml-auto",children:e.jsx(C,{className:"w-8 h-8 text-yellow-400"})})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg",children:[e.jsx(R,{className:"w-5 h-5 text-blue-400 flex-shrink-0"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-400 text-sm",children:"Email Address"}),e.jsx("p",{className:"text-white font-medium",children:a})]})]}),e.jsxs("div",{className:"flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg",children:[e.jsx(T,{className:"w-5 h-5 text-blue-400 flex-shrink-0"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-400 text-sm",children:"Phone Number"}),e.jsx("p",{className:"text-white font-medium",children:s})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg",children:[e.jsx(S,{className:"w-5 h-5 text-blue-400 flex-shrink-0"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-400 text-sm",children:"University"}),e.jsx("p",{className:"text-white font-medium",children:r})]})]}),e.jsxs("div",{className:"flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg",children:[e.jsx(F,{className:"w-5 h-5 text-blue-400 flex-shrink-0"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-400 text-sm",children:"Program Applied"}),e.jsx("p",{className:"text-white font-medium",children:i})]})]})]})]})]}),$=({submittedDate:t,expectedDecision:a,status:s})=>{const r=i=>{switch(i){case"Accepted":return e.jsx(u,{className:"w-5 h-5 text-green-400"});case"Under Review":return e.jsx(d,{className:"w-5 h-5 text-yellow-400"});case"Rejected":return e.jsx(w,{className:"w-5 h-5 text-red-400"});default:return e.jsx(d,{className:"w-5 h-5 text-gray-400"})}};return e.jsxs("div",{children:[e.jsxs("h3",{className:"text-xl font-bold text-white mb-6 flex items-center",children:[e.jsx(A,{className:"mr-2 w-5 h-5 text-blue-400"}),"Application Timeline"]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border-l-4 border-blue-400",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-3 h-3 bg-blue-400 rounded-full"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Application Submitted"}),e.jsx("p",{className:"text-gray-400 text-sm",children:t})]})]}),e.jsx(u,{className:"w-5 h-5 text-green-400"})]}),e.jsxs("div",{className:`flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border-l-4 ${s==="Under Review"?"border-yellow-400":s==="Accepted"?"border-green-400":"border-red-400"}`,children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-3 h-3 rounded-full ${s==="Under Review"?"bg-yellow-400":s==="Accepted"?"bg-green-400":"bg-red-400"}`}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Internship Completed"}),e.jsx("p",{className:"text-gray-400 text-sm",children:a})]})]}),r(s)]})]})]})},B=({status:t,expectedDecision:a})=>{const r=(()=>{switch(t){case"Accepted":return{icon:e.jsx(u,{className:"w-12 h-12 mx-auto mb-4 text-green-400"}),title:"🎉 Congratulations!",message:"Your internship application has been accepted. You will receive further instructions via email soon.",badge:{text:"Welcome to the team!",className:"bg-green-500/20 text-green-300 border-green-500/30"},containerClass:"bg-green-500/10 border-green-500/20 text-green-300"};case"Under Review":return{icon:e.jsx(d,{className:"w-12 h-12 mx-auto mb-4 text-yellow-400"}),title:"⏳ Application Under Review",message:`Your application is currently being reviewed by our team. Expected decision by: ${a}`,badge:{text:"Stay tuned!",className:"bg-yellow-500/20 text-yellow-300 border-yellow-500/30"},containerClass:"bg-yellow-500/10 border-yellow-500/20 text-yellow-300"};case"Rejected":return{icon:e.jsx(w,{className:"w-12 h-12 mx-auto mb-4 text-red-400"}),title:"Application Update",message:"Thank you for your interest. While your application was not selected this time, we encourage you to apply for future opportunities.",badge:{text:"Keep trying!",className:"bg-red-500/20 text-red-300 border-red-500/30"},containerClass:"bg-red-500/10 border-red-500/20 text-red-300"};default:return{icon:e.jsx(d,{className:"w-12 h-12 mx-auto mb-4 text-gray-400"}),title:"Status Pending",message:"Your application status will be updated soon.",badge:{text:"Pending",className:"bg-gray-500/20 text-gray-300 border-gray-500/30"},containerClass:"bg-gray-500/10 border-gray-500/20 text-gray-300"}}})();return e.jsx("div",{className:`p-6 rounded-lg border ${r.containerClass}`,children:e.jsxs("div",{className:"text-center",children:[r.icon,e.jsx("h3",{className:"text-xl font-bold mb-2",children:r.title}),e.jsx("p",{className:"mb-4",children:r.message}),e.jsx(j,{className:r.badge.className,children:r.badge.text})]})})},_=t=>`
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row p-8 relative">
  <div class="flex flex-col max-w-3xl space-y-6">
    <div class="flex items-center space-x-4">
      <img
        src="https://i.postimg.cc/43nP784d/Whats-App-Image-2025-07-20-at-12-00-05-PM.jpg""
        alt="Logo with blue angled brackets symbol"
        class="w-10 h-10 object-contain"
        width="40"
        height="40"
      />
      <div>
        <h1 class="text-3xl font-extrabold leading-tight">ANONEURX</h1>
        <p class="italic text-sm mt-0.5">Empowering Future Innovators</p>
      </div>
    </div>

    <h2 class="text-xl font-normal">CERTIFICATE OF COMPLETION</h2>

    <p class="text-base leading-relaxed">
      This certifies that <strong>${t.name}</strong> has successfully completed the
      <strong>Web Development Internship Program at Next-Gen Developers</strong>, held from
      <strong>Day/M 2025</strong> to <strong>D/M 2025</strong>.
    </p>

    <p class="text-base leading-relaxed">
      During this time, the intern demonstrated applied skills in
      <strong>front-end and back-end development</strong>, responsive design, and collaborative problem-solving within a dynamic tech environment.
    </p>

    <p class="text-base leading-relaxed">
      We applaud their contribution and growth throughout the program.<br />
      <strong>Reference ID:</strong> NDG-WE-25-A2
    </p>

    <p class="italic mt-6">Issued by Next-Gen Developers</p>
  </div>

  <div class="flex flex-col justify-end items-center md:items-end max-w-xl w-full mt-12 md:mt-0 md:ml-auto">
    <img
      src="https://storage.googleapis.com/a1aa/image/6c52d8cd-3578-4974-471b-cd8a2c83f01a.jpg"
      alt="Signature of Authorized Signatory Sobia Kousar in white on black background"
      class="w-60 h-auto mb-2 object-contain"
      width="240"
      height="80"
    />
    <p class="text-center text-base leading-tight">
      Authorized Signatory<br />
      Sobia Kousar
    </p>
  </div>
</div>


  <div class="w-[297mm] h-[210mm] print:m-0" style="font-family: 'Arial', sans-serif;">
  <!-- Background Pattern -->
  <img src="/>

  <!-- Header -->
  <div class="relative z-10 flex items-center justify-between p-8">
    <div class="flex items-center space-x-6">
      <!-- Logo -->
      <div class="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
        <span class="text-white text-xl font-bold">&lt;&gt;</span>
      </div>
      <div>
        <h1 class="text-3xl font-bold text-white tracking-wide">ANONEURX</h1>
        <p class="text-blue-200 text-sm italic mt-1">Empowering Future Innovators</p>
      </div>
    </div>
    <div class="text-right text-white">
      <p class="text-sm opacity-75">Certificate ID</p>
      <p class="font-mono text-lg">NDG-WE-25-A2</p>
    </div>
  </div>

  <!-- Main Content -->
  <div class="relative z-10 px-16 py-8">
    <!-- Certificate Title -->
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-white mb-4 tracking-wider">CERTIFICATE OF COMPLETION</h2>
      <div class="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
    </div>

    <!-- Certificate Body -->
    <div class="max-w-4xl mx-auto text-center space-y-6">
      <p class="text-xl text-blue-100">This certifies that</p>

      <!-- Intern Name -->
      <div class="my-8">
        <h3 class="text-5xl font-bold text-white mb-2 border-b-2 border-blue-400 pb-2 inline-block"></h3>
      </div>

      <p class="text-xl text-blue-100">has successfully completed the</p>

      <!-- Program Name -->
      <div class="my-6">
        <h4 class="text-3xl font-bold text-blue-300">Web Development Internship Program</h4>
      </div>

      <p class="text-lg text-blue-200">
        held from ${t.startDate||"June 2025"} to ${t.endDate||"August 2025"} at Next-Gen Developers, demonstrating applied skills in
        <span class="font-semibold text-white">front-end and back-end development</span>,
        responsive design, and collaborative problem-solving within a dynamic tech environment.
      </p>

      <p class="text-lg text-blue-200 mt-6">
        We applaud their contribution and growth throughout the program.
      </p>
    </div>

    <!-- Bottom Section -->
    <div class="flex justify-between items-end mt-16">
      <!-- Left Side - Date -->
      <div class="text-white">
        <p class="text-sm text-blue-200">Date of Completion</p>
        <p class="text-lg font-semibold">${new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</p>
      </div>

      <!-- Right Side - Signature -->
      <div class="text-right text-white">
        <div class="border-b-2 border-white w-48 mb-2"></div>
        <p class="text-lg font-semibold">Sobia Kosar</p>
        <p class="text-sm text-blue-200">Authorized Signatory</p>
        <p class="text-xs text-blue-300 mt-1">Next-Gen Developers</p>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="absolute bottom-4 left-0 right-0 text-center">
    <p class="text-xs text-blue-300">This certificate verifies the successful completion of the internship program at Next-Gen Developers</p>
  </div>
</div>

  `,H=async t=>{const a=document.createElement("div");a.innerHTML=_(t),a.style.position="absolute",a.style.left="-9999px",a.style.top="-9999px",a.style.width="297mm",a.style.height="210mm";const s=document.createElement("style");s.textContent=`
    @import url('https://cdn.tailwindcss.com');
  `,document.body.appendChild(s),document.body.appendChild(a);try{const r=await U(a.firstElementChild,{width:1123,height:794,scale:2,useCORS:!0,backgroundColor:null}),i=new L({orientation:"landscape",unit:"mm",format:"a4"}),l=r.toDataURL("image/png"),n=i.internal.pageSize.getWidth(),h=i.internal.pageSize.getHeight();i.addImage(l,"PNG",0,0,n,h),i.save(`${t.name}_Internship_Certificate.pdf`)}finally{document.body.removeChild(a),document.body.removeChild(s)}},Y=({internData:t})=>{const[a,s]=c.useState(!1);c.useState(!1);const r=async()=>{s(!0);try{await H(t),o.success("Certificate downloaded successfully!")}catch(i){console.error("Error generating certificate:",i),o.error("Failed to generate certificate. Please try again.")}finally{s(!1)}};return e.jsx("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:t.status==="Accepted"&&e.jsx(v,{onClick:r,disabled:a,className:"bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg",children:a?e.jsxs(e.Fragment,{children:[e.jsx(O,{className:"mr-2 w-5 h-5 animate-spin"}),"Generating..."]}):e.jsxs(e.Fragment,{children:[e.jsx(I,{className:"mr-2 w-5 h-5"}),"Download Certificate"]})})})},K=({internData:t})=>e.jsxs("div",{className:"max-w-4xl mx-auto space-y-8",children:[e.jsx(x,{className:"card-professional",children:e.jsx(p,{className:"p-8",children:e.jsx(M,{status:t.status,applicationId:t.applicationId,program:t.program,submittedDate:t.submittedDate})})}),e.jsx(x,{className:"card-professional",children:e.jsx(p,{className:"p-8",children:e.jsx(W,{name:t.name,email:t.email,phone:t.phone,university:t.university,program:t.program,status:t.status})})}),e.jsx(x,{className:"card-professional",children:e.jsx(p,{className:"p-8",children:e.jsx($,{submittedDate:t.submittedDate,expectedDecision:t.expectedDecision,status:t.status})})}),e.jsx(x,{className:"card-professional",children:e.jsx(p,{className:"p-6",children:e.jsx(B,{status:t.status,expectedDecision:t.expectedDecision})})}),e.jsx(Y,{internData:t})]}),ne=()=>{const[t,a]=c.useState(""),[s,r]=c.useState(null),[i,l]=c.useState(!1),[n,h]=c.useState(!1),y=async m=>{if(m.preventDefault(),!t.trim()){o.error("Please enter an Application ID or email address");return}l(!0),r(null);try{await new Promise(f=>setTimeout(f,800));const{applicationApi:g}=await D(async()=>{const{applicationApi:f}=await import("./api-DGPIEjIm.js");return{applicationApi:f}},[]),b=await g.search(t,"internship");b.success&&b.data?(r(b.data),h(!0),o.success("Application found successfully!")):o.error("No internship application found with this ID, email, or name")}catch(g){console.error("Error searching for application:",g),o.error("Error searching for application. Please try again.")}finally{l(!1)}};return n?(()=>{if(!s)return null;const m={applicationId:s.applicationId,name:s.name,email:s.email,phone:s.phone,university:s.university,program:s.program,yearOfStudy:s.yearOfStudy,gpa:s.gpa,portfolioLink:s.portfolioLink,linkedinProfile:s.linkedinProfile,githubProfile:s.githubProfile,previousExperience:s.previousExperience,projects:s.projects,skills:s.skills,optionalSkills:s.optionalSkills,motivation:s.motivation,status:s.status,submittedDate:s.submittedDate,expectedDecision:s.expectedDecision||""};return e.jsx(P,{children:e.jsxs("div",{className:"universal-page-bg",children:[e.jsx("div",{className:"absolute inset-0 bg-black/60 backdrop-blur-sm"}),e.jsxs("div",{className:"relative z-10 max-w-6xl mx-auto space-y-8",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs(v,{variant:"outline",onClick:()=>h(!1),className:"text-white border-white/30 hover:bg-white/10 backdrop-blur-md bg-white/5",children:[e.jsx(G,{className:"mr-2 w-4 h-4"}),"New Search"]})}),e.jsx(K,{internData:m})]})]})})})():e.jsxs("div",{className:"universal-page-bg",children:[e.jsx("div",{className:"absolute inset-0 bg-black/60 backdrop-blur-sm"}),e.jsx("div",{className:"relative z-10 min-h-screen flex flex-col",children:e.jsx("div",{className:"flex-1 flex items-center justify-center px-4 py-12",children:e.jsxs("div",{className:"w-full max-w-2xl",children:[e.jsxs("div",{className:"text-center mb-12",children:[e.jsx("div",{className:"mx-auto w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-6",children:e.jsx(z,{className:"w-10 h-10 text-white"})}),e.jsx("h1",{className:"text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent",children:"Verify Your Internship"}),e.jsx("p",{className:"text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed",children:"Enter your application ID or email to instantly check your internship status and download certificates"})]}),e.jsxs(x,{className:"bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-transparent"}),e.jsxs(p,{className:"relative z-10 p-8",children:[e.jsx("form",{onSubmit:y,className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("label",{className:"block text-white font-medium text-lg",children:"Application ID or Email Address"}),e.jsxs("div",{className:"relative",children:[e.jsx(E,{value:t,onChange:m=>a(m.target.value),className:"bg-white/10 border-white/30 text-white placeholder-gray-300 h-14 text-lg px-6 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300",placeholder:"e.g., INT-2024-001 or john@email.com"}),e.jsx(v,{className:"absolute bg-transparent right-4 top-4 h-6 w-6 text-white hover:bg-white/10 focus:bg-white/20 rounded-full p-0",type:"button",onClick:()=>a(""),children:e.jsx(k,{})})]})]})}),e.jsxs("div",{className:"mt-8 p-6 bg-white/5 rounded-xl border border-white/10",children:[e.jsx("h3",{className:"text-white font-semibold mb-3",children:"💡 Quick Tips:"}),e.jsxs("ul",{className:"text-gray-300 text-sm space-y-2",children:[e.jsx("li",{children:"• Use your application ID (e.g., INT-2024-001)"}),e.jsx("li",{children:"• Or enter the email you used for registration"}),e.jsx("li",{children:"• Partial searches are supported"})]})]})]})]})]})})})]})};export{ne as default};
