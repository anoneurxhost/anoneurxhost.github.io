import{E as _,r as l,j as e,P as O,B as y,C as M,a as U,x as G,b as A,h as B,a8 as W,I as H,O as V}from"./index-BOmBk0HP.js";import{A as I}from"./arrow-left-BsORZBQB.js";import{E as z}from"./external-link-bG4IE8Cr.js";import{C as E}from"./chevron-right-D8D7sFeq.js";import{B as F}from"./bug-DaDuOedq.js";import{T as R}from"./triangle-alert-CphKU9jB.js";import{G as J}from"./globe-DbbL9_pf.js";import{G as X}from"./gamepad-2-k-ryV_vI.js";import{C as $}from"./cpu-C2fRw6df.js";import{C as K}from"./copy-B5uXZ-Me.js";import{C as Y}from"./chevron-up-CFh8y-he.js";import{T as Q}from"./thumbs-up-DbLPMq8P.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=_("List",[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=_("ThumbsDown",[["path",{d:"M17 14V2",key:"8ymqnk"}],["path",{d:"M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",key:"m61m77"}]]),te={stable:{label:"Stable",color:"bg-green-500/20 text-green-300 border-green-500/30",icon:B},beta:{label:"Beta",color:"bg-amber-500/20 text-amber-300 border-amber-500/30",icon:R},deprecated:{label:"Deprecated",color:"bg-red-500/20 text-red-300 border-red-500/30",icon:R}},k={"anoneurx-platform":{name:"Anoneurx Platform",icon:J,description:"Main web application and company platform",color:"from-blue-500/20 to-cyan-500/20",status:"stable",category:"Platform",versions:["v3.2.0 (latest)","v3.1.0","v3.0.0","v2.5.0"],currentVersion:"v3.2.0 (latest)",githubUrl:"https://github.com/anoneurx/platform",changelog:[{version:"v3.2.0",date:"2026-03-15",changes:["Added real-time notifications","New portfolio page","Performance optimizations with lazy loading"],type:"feature"},{version:"v3.1.0",date:"2026-02-20",changes:["Fixed authentication token refresh","Resolved dashboard loading states","Patched XSS vulnerability in content editor"],type:"fix"},{version:"v3.0.0",date:"2026-01-10",changes:["BREAKING: New API v3 endpoints","Migrated to Express 5","New role-based access control system"],type:"breaking"}],sections:[{title:"Getting Started",readingTime:"5 min",content:"The Anoneurx Platform is built with React, TypeScript, and Tailwind CSS. Follow these steps to set up your development environment and start building.",codeExamples:[{language:"bash",title:"Installation",code:`git clone https://github.com/anoneurx/platform.git
cd platform
npm install
npm run dev`,alternatives:[{lang:"bash (bun)",code:`git clone https://github.com/anoneurx/platform.git
cd platform
bun install
bun dev`}]},{language:"bash",title:"Environment Setup",code:`cp .env.example .env
# Edit .env with your configuration

# Required variables:
# VITE_API_URL=http://localhost:5000
# MONGODB_URI=mongodb://localhost:27017/anoneurx
# JWT_SECRET=your-secret-key
# JWT_EXPIRE=7d

npm run dev`}],subsections:[{title:"Prerequisites",content:`• Node.js 18+ (recommended: 20 LTS)
• npm, bun, or pnpm
• Git
• MongoDB 7+ (local or Atlas)
• VS Code with ESLint and Prettier extensions`},{title:"Project Structure",content:`src/pages/        — Page components (lazy loaded)
src/components/   — Reusable UI components
src/contexts/     — React context providers
src/hooks/        — Custom hooks
src/services/     — API service layer
src/layouts/      — Layout wrappers
server/           — Backend Express server
server/routes/    — API route definitions
server/models/    — Mongoose models
server/middleware/ — Auth, validation, rate limiting`}],faq:[{q:"What Node.js version is required?",a:"Node.js 18 or higher. We recommend using the latest LTS version (20.x)."},{q:"Can I use yarn instead of npm?",a:"Yes, yarn works fine. We also support bun and pnpm."},{q:"How do I connect to a remote database?",a:"Set MONGODB_URI in your .env file to your MongoDB Atlas connection string."}],relatedDocs:[{title:"API Reference",sectionIndex:1},{title:"Configuration",sectionIndex:3}]},{title:"API Reference",readingTime:"12 min",content:"The platform exposes a RESTful API for all backend operations. All endpoints are prefixed with /api and require authentication unless noted.",codeExamples:[{language:"typescript",title:"Authentication",code:`// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const { token, user } = await response.json();`,alternatives:[{lang:"python",code:`import requests

response = requests.post('http://localhost:5000/api/auth/login', json={
    'email': email,
    'password': password
})
data = response.json()
token = data['token']`},{lang:"cURL",code:`curl -X POST http://localhost:5000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "pass123"}'`}]},{language:"typescript",title:"Protected Requests",code:`const response = await fetch('/api/users/me', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});`,alternatives:[{lang:"python",code:`response = requests.get('http://localhost:5000/api/users/me',
    headers={'Authorization': f'Bearer {token}'}
)`},{lang:"cURL",code:`curl http://localhost:5000/api/users/me \\
  -H "Authorization: Bearer YOUR_TOKEN"`}]}],subsections:[{title:"Authentication Endpoints",content:`POST /api/auth/login          — User login (returns JWT)
POST /api/auth/register       — New user registration
POST /api/auth/refresh        — Refresh JWT token
POST /api/auth/forgot-password — Request password reset
POST /api/auth/reset-password  — Reset password with token
POST /api/auth/verify-email    — Verify email address`},{title:"User Endpoints",content:`GET    /api/users/me    — Current user profile
PUT    /api/users/me    — Update profile
GET    /api/users       — List all users (admin only)
GET    /api/users/:id   — Get user by ID (admin only)
DELETE /api/users/:id   — Delete user (admin only)
PATCH  /api/users/:id/role — Update user role (admin only)`},{title:"Project Endpoints",content:`GET    /api/projects        — List projects
POST   /api/projects        — Create project
GET    /api/projects/:id    — Get project details
PUT    /api/projects/:id    — Update project
DELETE /api/projects/:id    — Delete project
POST   /api/projects/:id/submit — Submit project`}],faq:[{q:"What is the rate limit?",a:"100 requests per 15 minutes per IP for unauthenticated requests, 1000 for authenticated."},{q:"How do I handle token expiration?",a:"Use the /api/auth/refresh endpoint with your refresh token before the JWT expires (default: 7 days)."}],relatedDocs:[{title:"Error Handling",sectionIndex:4},{title:"Rate Limits",sectionIndex:6}]},{title:"Deployment",readingTime:"8 min",content:"The platform supports Docker deployment and CI/CD via GitHub Actions. Choose the deployment method that fits your infrastructure.",codeExamples:[{language:"bash",title:"Docker Build",code:`docker build -t anoneurx-platform .
docker run -p 3000:3000 \\
  -e NODE_ENV=production \\
  -e MONGODB_URI=your-mongodb-uri \\
  -e JWT_SECRET=your-secret \\
  anoneurx-platform`},{language:"yaml",title:"Docker Compose",code:`version: '3.8'
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
  mongo-data:`}],faq:[{q:"What are the minimum server requirements?",a:"2 CPU cores, 4GB RAM, 20GB disk for a small deployment. Scale up for production traffic."},{q:"Do you support Kubernetes?",a:"Yes, Helm charts are available in the /deploy/k8s directory."}]},{title:"Configuration",readingTime:"6 min",content:"The platform uses environment variables for configuration. All variables can be set in a .env file for local development or as environment variables in production.",codeExamples:[{language:"bash",title:"Environment Variables",code:`# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/anoneurx

# Authentication
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# File Upload
MAX_FILE_SIZE=10485760  # 10MB
UPLOAD_DIR=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW=900000  # 15 min
RATE_LIMIT_MAX=100

# CORS
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=debug`}],subsections:[{title:"Required Variables",content:`MONGODB_URI — MongoDB connection string (required)
JWT_SECRET — Secret key for JWT signing (required)
NODE_ENV — Environment: development, production, test`},{title:"Optional Variables",content:`PORT — Server port (default: 5000)
LOG_LEVEL — Logging level: debug, info, warn, error
MAX_FILE_SIZE — Maximum upload size in bytes
RATE_LIMIT_MAX — Max requests per window`}]},{title:"Error Handling",readingTime:"4 min",content:"The API returns consistent error responses with appropriate HTTP status codes. All errors include a message and optional error code.",codeExamples:[{language:"json",title:"Error Response Format",code:`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [
      { "field": "email", "message": "Email is required" }
    ]
  }
}`},{language:"typescript",title:"Error Handling in Client",code:`try {
  const response = await api.post('/auth/login', credentials);
  return response.data;
} catch (error) {
  if (error.response?.status === 401) {
    // Invalid credentials
  } else if (error.response?.status === 429) {
    // Rate limited - retry after delay
  } else {
    // Unexpected error
  }
}`}],subsections:[{title:"HTTP Status Codes",content:`200 — Success
201 — Created
400 — Bad Request (validation error)
401 — Unauthorized (missing/invalid token)
403 — Forbidden (insufficient permissions)
404 — Not Found
409 — Conflict (duplicate resource)
429 — Too Many Requests (rate limited)
500 — Internal Server Error`}]},{title:"Webhooks",readingTime:"5 min",content:"Configure webhooks to receive real-time notifications about events in the platform. Webhooks deliver HTTP POST requests to your specified URL.",codeExamples:[{language:"json",title:"Webhook Payload",code:`{
  "event": "project.submitted",
  "timestamp": "2026-03-15T10:30:00Z",
  "data": {
    "projectId": "proj_123",
    "title": "AI Dashboard",
    "submittedBy": "user_456"
  },
  "signature": "sha256=abc123..."
}`},{language:"typescript",title:"Verify Webhook Signature",code:`import crypto from 'crypto';

function verifyWebhook(payload: string, signature: string, secret: string) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(\`sha256=\${expected}\`)
  );
}`}],subsections:[{title:"Available Events",content:`project.created     — New project created
project.submitted    — Project submitted for review
project.approved     — Project approved
user.registered      — New user registration
user.role_changed    — User role updated
application.received — New internship application
leave.requested      — Leave request submitted
leave.approved       — Leave request approved`}]},{title:"Rate Limits",readingTime:"3 min",content:"The API enforces rate limits to ensure fair usage and protect against abuse. Limits vary by authentication status and endpoint type.",codeExamples:[{language:"text",title:"Rate Limit Headers",code:`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1711025400
Retry-After: 120  # Only included when rate limited`}],subsections:[{title:"Limits by Tier",content:`Unauthenticated:  100 requests / 15 minutes
Authenticated:    1,000 requests / 15 minutes
Admin:            5,000 requests / 15 minutes
File Upload:      20 requests / hour
Auth Endpoints:   10 requests / 15 minutes (login, register)`}]}]},arcadeum:{name:"Arcadeum",icon:X,description:"Gaming and entertainment platform",color:"from-purple-500/20 to-pink-500/20",status:"beta",category:"Entertainment",versions:["v2.0.0-beta (latest)","v1.5.0","v1.0.0"],currentVersion:"v2.0.0-beta (latest)",githubUrl:"https://github.com/anoneurx/arcadeum",changelog:[{version:"v2.0.0-beta",date:"2026-03-01",changes:["New multiplayer engine","WebSocket-based real-time events","Tournament system"],type:"feature"},{version:"v1.5.0",date:"2026-01-15",changes:["Fixed leaderboard ranking algorithm","Improved achievement unlock reliability"],type:"fix"}],sections:[{title:"Getting Started",readingTime:"4 min",content:"Arcadeum is our gaming and entertainment platform. It provides APIs for game integration, leaderboards, achievements, and multiplayer sessions.",codeExamples:[{language:"bash",title:"Quick Start",code:"npm install @anoneurx/arcadeum-sdk"},{language:"typescript",title:"SDK Initialization",code:`import { Arcadeum } from '@anoneurx/arcadeum-sdk';

const arcadeum = new Arcadeum({
  apiKey: 'your-api-key',
  gameId: 'your-game-id',
  environment: 'production'
});

await arcadeum.initialize();`,alternatives:[{lang:"python",code:`from arcadeum import ArcadeumClient

client = ArcadeumClient(
    api_key='your-api-key',
    game_id='your-game-id'
)
client.initialize()`}]}],faq:[{q:"Is Arcadeum free to use?",a:"Yes, the free tier supports up to 1,000 monthly active players. Contact us for higher limits."}]},{title:"Leaderboards API",readingTime:"6 min",content:"Create and manage leaderboards for your games with real-time updates, time-based rankings, and custom scoring algorithms.",codeExamples:[{language:"typescript",title:"Submit Score",code:`await arcadeum.leaderboard.submitScore({
  playerId: 'player-123',
  score: 9500,
  metadata: { level: 12, time: '2:34' }
});`,alternatives:[{lang:"cURL",code:`curl -X POST https://api.arcadeum.dev/v2/scores \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -d '{"playerId":"player-123","score":9500}'`}]},{language:"typescript",title:"Get Rankings",code:`const top100 = await arcadeum.leaderboard.getTopScores({
  limit: 100,
  timeframe: 'weekly',
  includeMetadata: true
});

console.log(top100.entries);`}]},{title:"Achievements",readingTime:"4 min",content:"Define and track player achievements with customizable unlock conditions, tiers, and rewards.",codeExamples:[{language:"typescript",title:"Unlock Achievement",code:`await arcadeum.achievements.unlock({
  playerId: 'player-123',
  achievementId: 'first-win',
  metadata: { score: 9500 }
});

const playerAchievements = await arcadeum.achievements.list('player-123');`}]},{title:"Multiplayer",readingTime:"8 min",content:"Create real-time multiplayer sessions with WebSocket-based communication, matchmaking, and lobby management.",codeExamples:[{language:"typescript",title:"Create Session",code:`const session = await arcadeum.multiplayer.createSession({
  maxPlayers: 4,
  gameMode: 'battle-royale',
  region: 'us-east'
});

session.on('playerJoined', (player) => {
  console.log(\`\${player.name} joined!\`);
});

session.on('gameEvent', (event) => {
  // Handle real-time game events
});`}]}]},"ai-engine":{name:"AI Engine",icon:W,description:"Machine learning and AI API services",color:"from-green-500/20 to-emerald-500/20",status:"stable",category:"AI & ML",versions:["v4.1.0 (latest)","v4.0.0","v3.5.0"],currentVersion:"v4.1.0 (latest)",githubUrl:"https://github.com/anoneurx/ai-engine",changelog:[{version:"v4.1.0",date:"2026-03-10",changes:["Added streaming responses for text generation","New image segmentation model","50% faster inference"],type:"feature"}],sections:[{title:"Getting Started",readingTime:"5 min",content:"The AI Engine provides REST APIs for text generation, image analysis, predictive modeling, and embeddings. Supports both Python and TypeScript SDKs.",codeExamples:[{language:"bash",title:"Installation",code:`pip install anoneurx-ai
# or
npm install @anoneurx/ai-sdk`},{language:"python",title:"Python Quick Start",code:`from anoneurx_ai import AIEngine

client = AIEngine(api_key="your-key")

response = client.generate(
    prompt="Explain quantum computing",
    max_tokens=500,
    temperature=0.7
)
print(response.text)`,alternatives:[{lang:"typescript",code:`import { AIEngine } from '@anoneurx/ai-sdk';

const ai = new AIEngine({ apiKey: 'your-key' });

const response = await ai.generate({
  prompt: 'Explain quantum computing',
  maxTokens: 500,
  temperature: 0.7
});
console.log(response.text);`}]}]},{title:"Text Generation",readingTime:"7 min",content:"Generate text using state-of-the-art language models with customizable parameters, streaming, and function calling.",codeExamples:[{language:"typescript",title:"Streaming Response",code:`const stream = await ai.generate({
  prompt: 'Write a technical blog post about...',
  stream: true,
  model: 'anoneurx-large'
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text);
}`},{language:"python",title:"Function Calling",code:`response = client.generate(
    prompt="What's the weather in Tokyo?",
    functions=[{
        "name": "get_weather",
        "parameters": {
            "location": {"type": "string"},
            "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
        }
    }]
)`}]},{title:"Image Analysis",readingTime:"5 min",content:"Analyze images for object detection, classification, segmentation, and content understanding with high accuracy.",codeExamples:[{language:"python",title:"Image Classification",code:`result = client.vision.classify(
    image_url="https://example.com/image.jpg",
    labels=["cat", "dog", "bird"],
    confidence_threshold=0.8
)

for prediction in result.predictions:
    print(f"{prediction.label}: {prediction.confidence:.2%}")`}]},{title:"Embeddings",readingTime:"4 min",content:"Generate vector embeddings for text, images, and documents. Use for semantic search, clustering, and similarity matching.",codeExamples:[{language:"python",title:"Generate Embeddings",code:`embeddings = client.embeddings.create(
    input=["Hello world", "How are you?"],
    model="embed-v3"
)

import numpy as np
sim = np.dot(embeddings[0], embeddings[1])
print(f"Similarity: {sim:.4f}")`}]}]},"robotics-sdk":{name:"Robotics SDK",icon:$,description:"Hardware integration and robotics control",color:"from-amber-500/20 to-orange-500/20",status:"beta",category:"Hardware",versions:["v1.2.0-beta (latest)","v1.1.0","v1.0.0"],currentVersion:"v1.2.0-beta (latest)",githubUrl:"https://github.com/anoneurx/robotics-sdk",changelog:[{version:"v1.2.0-beta",date:"2026-02-28",changes:["LiDAR sensor support","Path planning algorithms","ROS2 bridge integration"],type:"feature"}],sections:[{title:"Getting Started",readingTime:"5 min",content:"The Robotics SDK provides Python libraries for controlling hardware, sensors, and actuators. Compatible with Arduino, Raspberry Pi, and ROS2.",codeExamples:[{language:"bash",title:"Installation",code:`pip install anoneurx-robotics
# Requires Python 3.10+
# Optional: pip install anoneurx-robotics[ros2] for ROS2 support`},{language:"python",title:"Basic Setup",code:`from anoneurx_robotics import Robot, Servo, Sensor

robot = Robot(port='/dev/ttyUSB0', baudrate=115200)
robot.connect()

servo = Servo(pin=9, min_angle=0, max_angle=180)
robot.attach(servo)

servo.move(90, speed=0.5)`}],faq:[{q:"Which boards are supported?",a:"Arduino Uno/Mega/Nano, Raspberry Pi 3/4/5, ESP32, and any serial-compatible microcontroller."},{q:"Can I use this with ROS2?",a:"Yes! Install with pip install anoneurx-robotics[ros2] for ROS2 bridge support."}]},{title:"Sensor Integration",readingTime:"6 min",content:"Read data from various sensors including ultrasonic, IMU, temperature, pressure, and LiDAR with unified APIs.",codeExamples:[{language:"python",title:"Reading Sensors",code:`from anoneurx_robotics import UltrasonicSensor, IMU, TemperatureSensor

sonar = UltrasonicSensor(trigger_pin=7, echo_pin=8)
distance = sonar.read()

imu = IMU(address=0x68)
orientation = imu.get_orientation()
print(f"Roll: {orientation.roll:.1f}° Pitch: {orientation.pitch:.1f}°")

temp = TemperatureSensor(pin=2, model='DHT22')
print(f"Temp: {temp.celsius:.1f}°C Humidity: {temp.humidity:.1f}%")`}]},{title:"Motion Control",readingTime:"5 min",content:"Control motors, servos, and actuators with precise positioning, PID control, and trajectory planning.",codeExamples:[{language:"python",title:"Motor Control",code:`from anoneurx_robotics import DCMotor, MotorController, PIDController

controller = MotorController()
motor_left = DCMotor(pins=(3, 4), encoder_pin=2)
motor_right = DCMotor(pins=(5, 6), encoder_pin=7)

pid = PIDController(kp=1.0, ki=0.1, kd=0.05)
controller.drive(
    motor_left, motor_right,
    speed=0.75, direction='forward',
    pid_controller=pid
)`}]},{title:"Path Planning",readingTime:"7 min",content:"Plan and execute paths using A*, RRT, and potential field algorithms. Supports obstacle avoidance and SLAM mapping.",codeExamples:[{language:"python",title:"A* Path Planning",code:`from anoneurx_robotics.navigation import AStarPlanner, GridMap

grid = GridMap(resolution=0.05)
grid.update_from_lidar(lidar.scan())

planner = AStarPlanner(grid)
path = planner.plan(
    start=(0, 0),
    goal=(5.0, 3.0),
    diagonal=True
)

robot.follow_path(path, speed=0.3)`}]}]}},P=({code:c,language:d,title:s,alternatives:r})=>{var T;const[x,j]=l.useState(!1),[p,b]=l.useState(d),f=p===d?c:((T=r==null?void 0:r.find(o=>o.lang===p))==null?void 0:T.code)||c,N=()=>{navigator.clipboard.writeText(f),j(!0),setTimeout(()=>j(!1),2e3)},h=[d,...(r==null?void 0:r.map(o=>o.lang))||[]];return e.jsxs("div",{className:"mb-4",children:[e.jsxs("div",{className:"flex items-center justify-between bg-white/[0.04] rounded-t-lg px-4 py-2 border border-white/[0.08] border-b-0",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-xs text-white/40",children:s}),h.length>1?e.jsx("div",{className:"flex gap-1",children:h.map(o=>e.jsx("button",{onClick:()=>b(o),className:`text-xs px-2 py-0.5 rounded-full border transition-colors ${p===o?"bg-white/[0.1] border-white/[0.2] text-white/70":"border-white/[0.06] text-white/30 hover:text-white/50"}`,children:o},o))}):e.jsx(y,{className:"bg-white/[0.06] border-white/[0.1] text-white/50 text-xs px-1.5 py-0",children:d})]}),e.jsx("button",{onClick:N,className:"text-white/30 hover:text-white/60 transition-colors",children:x?e.jsx(H,{className:"w-3.5 h-3.5"}):e.jsx(K,{className:"w-3.5 h-3.5"})})]}),e.jsx("pre",{className:"bg-black/50 backdrop-blur border border-white/[0.08] rounded-b-lg p-4 text-sm font-mono text-green-300/80 overflow-x-auto",children:f})]})},ne=({q:c,a:d})=>{const[s,r]=l.useState(!1);return e.jsxs("div",{className:"border border-white/[0.06] rounded-lg overflow-hidden",children:[e.jsxs("button",{onClick:()=>r(!s),className:"w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[0.02] transition-colors",children:[e.jsx("span",{className:"text-sm text-white/80",children:c}),s?e.jsx(Y,{className:"w-4 h-4 text-white/30 shrink-0"}):e.jsx(V,{className:"w-4 h-4 text-white/30 shrink-0"})]}),s&&e.jsx("div",{className:"px-4 pb-3 text-sm text-white/50",children:d})]})},ae=()=>{const[c,d]=l.useState(null);return e.jsxs("div",{className:"flex items-center gap-4 mt-8 pt-6 border-t border-white/[0.06]",children:[e.jsx("span",{className:"text-sm text-white/40",children:"Was this helpful?"}),e.jsx("button",{onClick:()=>d("up"),className:`p-1.5 rounded-md transition-colors ${c==="up"?"bg-green-500/20 text-green-400":"text-white/30 hover:text-white/60 hover:bg-white/[0.04]"}`,children:e.jsx(Q,{className:"w-4 h-4"})}),e.jsx("button",{onClick:()=>d("down"),className:`p-1.5 rounded-md transition-colors ${c==="down"?"bg-red-500/20 text-red-400":"text-white/30 hover:text-white/60 hover:bg-white/[0.04]"}`,children:e.jsx(ee,{className:"w-4 h-4"})}),c&&e.jsx("span",{className:"text-xs text-white/30",children:"Thanks for your feedback!"})]})},xe=()=>{var S,C;const[c,d]=l.useState(null),[s,r]=l.useState(0),[x,j]=l.useState(""),[p,b]=l.useState(!1),[f,N]=l.useState(""),[h,T]=l.useState("All");l.useMemo(()=>{const n=new Set;return Object.values(k).forEach(a=>n.add(a.category)),["All",...Array.from(n)]},[]),l.useMemo(()=>{let n=Object.entries(k);if(h!=="All"&&(n=n.filter(([,a])=>a.category===h)),x){const a=x.toLowerCase();n=n.filter(([,m])=>m.name.toLowerCase().includes(a)||m.description.toLowerCase().includes(a)||m.sections.some(g=>g.title.toLowerCase().includes(a)||g.content.toLowerCase().includes(a)))}return n},[x,h]);const o=c?k[c]:null,u=o?o.sections[s]:null,L=l.useMemo(()=>{var a,m;if(!u)return[];const n=[u.title];return(a=u.subsections)==null||a.forEach(g=>n.push(g.title)),(m=u.faq)!=null&&m.length&&n.push("FAQ"),n},[u]);if(c&&o&&u){const n=o,a=u,m=te[n.status],g={feature:"text-green-400",fix:"text-blue-400",breaking:"text-red-400"},q={feature:"Feature",fix:"Bug Fix",breaking:"Breaking"};return e.jsx(O,{children:e.jsxs("div",{className:"min-h-screen",children:[e.jsx("section",{className:"py-12 px-4 border-b border-white/[0.06]",children:e.jsxs("div",{className:"container mx-auto max-w-7xl",children:[e.jsxs("button",{onClick:()=>{d(null),r(0),b(!1)},className:"inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-6",children:[e.jsx(I,{className:"w-4 h-4"})," Back to all projects"]}),e.jsxs("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between gap-4",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:`w-12 h-12 rounded-xl bg-gradient-to-br ${n.color} flex items-center justify-center`,children:e.jsx(n.icon,{className:"w-6 h-6 text-white/80"})}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("h1",{className:"text-3xl font-bold text-white",children:n.name}),e.jsxs(y,{className:`${m.color} text-xs`,children:[e.jsx(m.icon,{className:"w-3 h-3 mr-1"})," ",m.label]})]}),e.jsx("p",{className:"text-sm text-white/50 mt-1",children:n.description})]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("select",{value:f||n.currentVersion,onChange:t=>N(t.target.value),className:"bg-white/[0.04] border border-white/[0.1] rounded-md text-xs text-white/60 px-2 py-1.5 appearance-none cursor-pointer",children:n.versions.map(t=>e.jsx("option",{value:t,className:"bg-gray-900",children:t},t))}),e.jsxs("a",{href:n.githubUrl,target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors px-2 py-1.5 rounded-md border border-white/[0.06] hover:border-white/[0.1]",children:[e.jsx(z,{className:"w-3 h-3"})," GitHub"]})]})]})]})}),e.jsxs("div",{className:"container mx-auto max-w-7xl flex flex-col lg:flex-row",children:[e.jsx("aside",{className:"lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06] p-4 lg:py-8 lg:pr-6",children:e.jsxs("nav",{className:"space-y-0.5",children:[n.sections.map((t,i)=>e.jsx("button",{onClick:()=>{r(i),b(!1)},className:`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${!p&&s===i?"text-white bg-white/[0.06] font-medium":"text-white/40 hover:text-white/60 hover:bg-white/[0.02]"}`,children:t.title},t.title)),e.jsx("button",{onClick:()=>b(!0),className:`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${p?"text-white bg-white/[0.06] font-medium":"text-white/40 hover:text-white/60 hover:bg-white/[0.02]"}`,children:"Changelog"})]})}),e.jsxs("main",{className:"flex-1 p-4 lg:p-8 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-2 text-xs text-white/40 mb-8",children:[e.jsx("span",{children:"Docs"}),e.jsx(E,{className:"w-3 h-3"}),e.jsx("span",{children:n.name}),e.jsx(E,{className:"w-3 h-3"}),e.jsx("span",{className:"text-white/70",children:p?"Changelog":a.title})]}),p?e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-white mb-6",children:"Changelog"}),e.jsx("div",{className:"space-y-4",children:n.changelog.map(t=>e.jsx(M,{className:"bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]",children:e.jsxs(U,{className:"p-5",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx(y,{className:"bg-white/[0.06] border-white/[0.1] text-white/70 text-xs",children:t.version}),e.jsx("span",{className:"text-xs text-white/40",children:t.date}),e.jsx(y,{className:`text-xs ${g[t.type]} bg-transparent border-current/30`,children:q[t.type]})]}),e.jsx("ul",{className:"space-y-1.5",children:t.changes.map((i,w)=>e.jsxs("li",{className:"text-sm text-white/60 flex items-start gap-2",children:[e.jsx("span",{className:"text-white/20 mt-1.5",children:"•"})," ",i]},w))})]})},t.version))})]}):e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("h2",{className:"text-2xl font-bold text-white",children:a.title}),a.readingTime&&e.jsxs("span",{className:"flex items-center gap-1 text-xs text-white/30",children:[e.jsx(G,{className:"w-3 h-3"})," ",a.readingTime," read"]})]}),e.jsx("p",{className:"text-white/60 leading-relaxed mb-8",children:a.content}),(S=a.codeExamples)==null?void 0:S.map((t,i)=>e.jsx(P,{code:t.code,language:t.language,title:t.title,alternatives:t.alternatives},i)),(C=a.subsections)==null?void 0:C.map((t,i)=>{var w;return e.jsxs("div",{className:"mt-8",children:[e.jsx("h3",{className:"text-lg font-semibold text-white mb-3",children:t.title}),e.jsx("div",{className:"bg-white/[0.02] border border-white/[0.06] rounded-lg p-5",children:e.jsx("pre",{className:"text-sm text-white/60 whitespace-pre-wrap font-sans leading-relaxed",children:t.content})}),(w=t.codeExamples)==null?void 0:w.map((v,D)=>e.jsx("div",{className:"mt-4",children:e.jsx(P,{code:v.code,language:v.language,title:v.title,alternatives:v.alternatives})},D))]},i)}),a.faq&&a.faq.length>0&&e.jsxs("div",{className:"mt-10",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center gap-2",children:[e.jsx(F,{className:"w-4 h-4 text-white/40"})," FAQ & Troubleshooting"]}),e.jsx("div",{className:"space-y-2",children:a.faq.map((t,i)=>e.jsx(ne,{q:t.q,a:t.a},i))})]}),a.relatedDocs&&a.relatedDocs.length>0&&e.jsxs("div",{className:"mt-8 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]",children:[e.jsx("span",{className:"text-xs text-white/40 block mb-2",children:"Related Documentation"}),e.jsx("div",{className:"flex flex-wrap gap-2",children:a.relatedDocs.map((t,i)=>e.jsxs("button",{onClick:()=>r(t.sectionIndex),className:"text-xs text-white/60 hover:text-white px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] transition-colors",children:[t.title," →"]},i))})]}),e.jsx(ae,{}),e.jsxs("div",{className:"flex justify-between mt-8 pt-8 border-t border-white/[0.06]",children:[s>0?e.jsxs(A,{variant:"ghost",onClick:()=>r(s-1),className:"text-white/50 hover:text-white gap-2",children:[e.jsx(I,{className:"w-4 h-4"})," ",n.sections[s-1].title]}):e.jsx("div",{}),s<n.sections.length-1&&e.jsxs(A,{variant:"ghost",onClick:()=>r(s+1),className:"text-white/50 hover:text-white gap-2",children:[n.sections[s+1].title," ",e.jsx(E,{className:"w-4 h-4"})]})]})]})]}),e.jsx("aside",{className:"hidden xl:block w-56 shrink-0 border-l border-white/[0.06] p-4 py-8 pl-6",children:e.jsxs("div",{className:"sticky top-8",children:[e.jsxs("div",{className:"flex items-center gap-2 text-xs text-white/40 mb-4",children:[e.jsx(Z,{className:"w-3.5 h-3.5"})," On This Page"]}),e.jsx("nav",{className:"space-y-1",children:L.map((t,i)=>e.jsx("div",{className:`text-xs py-1 ${i===0?"text-white/70 font-medium":"text-white/40 hover:text-white/60 cursor-pointer pl-2 border-l border-white/[0.06]"} transition-colors`,children:t},t))})]})})]})]})})}return null};export{xe as default};
