import { useState, useMemo } from "react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Globe, Gamepad2, Brain, Cpu, Search, ChevronRight, ChevronDown,
  BookOpen, Code, Copy, Check, ArrowLeft, ArrowRight, ExternalLink, Clock,
  ThumbsUp, ThumbsDown, GitBranch, AlertTriangle, CheckCircle2,
  Zap, Shield, Settings, Webhook, Timer, Bug, ChevronUp, List
} from "lucide-react";

interface DocSection {
  title: string;
  content: string;
  readingTime?: string;
  codeExamples?: { language: string; code: string; title: string; alternatives?: { lang: string; code: string }[] }[];
  image?: string;
  subsections?: { title: string; content: string; codeExamples?: { language: string; code: string; title: string; alternatives?: { lang: string; code: string }[] }[] }[];
  faq?: { q: string; a: string }[];
  relatedDocs?: { title: string; sectionIndex: number }[];
}

interface ChangelogEntry { version: string; date: string; changes: string[]; type: "feature" | "fix" | "breaking" }

interface ProjectDoc {
  name: string;
  icon: any;
  description: string;
  color: string;
  status: "stable" | "beta" | "deprecated";
  versions: string[];
  currentVersion: string;
  githubUrl: string;
  changelog: ChangelogEntry[];
  sections: DocSection[];
  category: string;
}

const statusConfig = {
  stable: { label: "Stable", color: "bg-green-500/20 text-green-300 border-green-500/30", icon: CheckCircle2 },
  beta: { label: "Beta", color: "bg-amber-500/20 text-amber-300 border-amber-500/30", icon: AlertTriangle },
  deprecated: { label: "Deprecated", color: "bg-red-500/20 text-red-300 border-red-500/30", icon: AlertTriangle },
};

const projectDocs: Record<string, ProjectDoc> = {
  "anoneurx-platform": {
    name: "Anoneurx Platform",
    icon: Globe,
    description: "Main web application and company platform",
    color: "from-blue-500/20 to-cyan-500/20",
    status: "stable",
    category: "Platform",
    versions: ["v3.2.0 (latest)", "v3.1.0", "v3.0.0", "v2.5.0"],
    currentVersion: "v3.2.0 (latest)",
    githubUrl: "https://github.com/anoneurx/platform",
    changelog: [
      { version: "v3.2.0", date: "2026-03-15", changes: ["Added real-time notifications", "New portfolio page", "Performance optimizations with lazy loading"], type: "feature" },
      { version: "v3.1.0", date: "2026-02-20", changes: ["Fixed authentication token refresh", "Resolved dashboard loading states", "Patched XSS vulnerability in content editor"], type: "fix" },
      { version: "v3.0.0", date: "2026-01-10", changes: ["BREAKING: New API v3 endpoints", "Migrated to Express 5", "New role-based access control system"], type: "breaking" },
    ],
    sections: [
      {
        title: "Getting Started",
        readingTime: "5 min",
        content: "The Anoneurx Platform is built with React, TypeScript, and Tailwind CSS. Follow these steps to set up your development environment and start building.",
        codeExamples: [
          { language: "bash", title: "Installation", code: "git clone https://github.com/anoneurx/platform.git\ncd platform\nnpm install\nnpm run dev", alternatives: [{ lang: "bash (bun)", code: "git clone https://github.com/anoneurx/platform.git\ncd platform\nbun install\nbun dev" }] },
          { language: "bash", title: "Environment Setup", code: "cp .env.example .env\n# Edit .env with your configuration\n\n# Required variables:\n# VITE_API_URL=http://localhost:5000\n# MONGODB_URI=mongodb://localhost:27017/anoneurx\n# JWT_SECRET=your-secret-key\n# JWT_EXPIRE=7d\n\nnpm run dev" },
        ],
        subsections: [
          { title: "Prerequisites", content: "• Node.js 18+ (recommended: 20 LTS)\n• npm, bun, or pnpm\n• Git\n• MongoDB 7+ (local or Atlas)\n• VS Code with ESLint and Prettier extensions" },
          { title: "Project Structure", content: "src/pages/        — Page components (lazy loaded)\nsrc/components/   — Reusable UI components\nsrc/contexts/     — React context providers\nsrc/hooks/        — Custom hooks\nsrc/services/     — API service layer\nsrc/layouts/      — Layout wrappers\nserver/           — Backend Express server\nserver/routes/    — API route definitions\nserver/models/    — Mongoose models\nserver/middleware/ — Auth, validation, rate limiting" },
        ],
        faq: [
          { q: "What Node.js version is required?", a: "Node.js 18 or higher. We recommend using the latest LTS version (20.x)." },
          { q: "Can I use yarn instead of npm?", a: "Yes, yarn works fine. We also support bun and pnpm." },
          { q: "How do I connect to a remote database?", a: "Set MONGODB_URI in your .env file to your MongoDB Atlas connection string." },
        ],
        relatedDocs: [{ title: "API Reference", sectionIndex: 1 }, { title: "Configuration", sectionIndex: 3 }],
      },
      {
        title: "API Reference",
        readingTime: "12 min",
        content: "The platform exposes a RESTful API for all backend operations. All endpoints are prefixed with /api and require authentication unless noted.",
        codeExamples: [
          { language: "typescript", title: "Authentication", code: `// Login\nconst response = await fetch('/api/auth/login', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ email, password })\n});\nconst { token, user } = await response.json();`, alternatives: [{ lang: "python", code: `import requests\n\nresponse = requests.post('http://localhost:5000/api/auth/login', json={\n    'email': email,\n    'password': password\n})\ndata = response.json()\ntoken = data['token']` }, { lang: "cURL", code: `curl -X POST http://localhost:5000/api/auth/login \\\n  -H "Content-Type: application/json" \\\n  -d '{"email": "user@example.com", "password": "pass123"}'` }] },
          { language: "typescript", title: "Protected Requests", code: `const response = await fetch('/api/users/me', {\n  headers: {\n    'Authorization': \`Bearer \${token}\`,\n    'Content-Type': 'application/json'\n  }\n});`, alternatives: [{ lang: "python", code: `response = requests.get('http://localhost:5000/api/users/me',\n    headers={'Authorization': f'Bearer {token}'}\n)` }, { lang: "cURL", code: `curl http://localhost:5000/api/users/me \\\n  -H "Authorization: Bearer YOUR_TOKEN"` }] },
        ],
        subsections: [
          { title: "Authentication Endpoints", content: "POST /api/auth/login          — User login (returns JWT)\nPOST /api/auth/register       — New user registration\nPOST /api/auth/refresh        — Refresh JWT token\nPOST /api/auth/forgot-password — Request password reset\nPOST /api/auth/reset-password  — Reset password with token\nPOST /api/auth/verify-email    — Verify email address" },
          { title: "User Endpoints", content: "GET    /api/users/me    — Current user profile\nPUT    /api/users/me    — Update profile\nGET    /api/users       — List all users (admin only)\nGET    /api/users/:id   — Get user by ID (admin only)\nDELETE /api/users/:id   — Delete user (admin only)\nPATCH  /api/users/:id/role — Update user role (admin only)" },
          { title: "Project Endpoints", content: "GET    /api/projects        — List projects\nPOST   /api/projects        — Create project\nGET    /api/projects/:id    — Get project details\nPUT    /api/projects/:id    — Update project\nDELETE /api/projects/:id    — Delete project\nPOST   /api/projects/:id/submit — Submit project" },
        ],
        faq: [
          { q: "What is the rate limit?", a: "100 requests per 15 minutes per IP for unauthenticated requests, 1000 for authenticated." },
          { q: "How do I handle token expiration?", a: "Use the /api/auth/refresh endpoint with your refresh token before the JWT expires (default: 7 days)." },
        ],
        relatedDocs: [{ title: "Error Handling", sectionIndex: 4 }, { title: "Rate Limits", sectionIndex: 6 }],
      },
      {
        title: "Deployment",
        readingTime: "8 min",
        content: "The platform supports Docker deployment and CI/CD via GitHub Actions. Choose the deployment method that fits your infrastructure.",
        codeExamples: [
          { language: "bash", title: "Docker Build", code: "docker build -t anoneurx-platform .\ndocker run -p 3000:3000 \\\n  -e NODE_ENV=production \\\n  -e MONGODB_URI=your-mongodb-uri \\\n  -e JWT_SECRET=your-secret \\\n  anoneurx-platform" },
          { language: "yaml", title: "Docker Compose", code: "version: '3.8'\nservices:\n  app:\n    build: .\n    ports:\n      - '3000:3000'\n    environment:\n      - NODE_ENV=production\n      - MONGODB_URI=mongodb://db:27017/anoneurx\n      - JWT_SECRET=${JWT_SECRET}\n    depends_on:\n      - db\n    restart: unless-stopped\n  db:\n    image: mongo:7\n    volumes:\n      - mongo-data:/data/db\n    restart: unless-stopped\nvolumes:\n  mongo-data:" },
        ],
        faq: [
          { q: "What are the minimum server requirements?", a: "2 CPU cores, 4GB RAM, 20GB disk for a small deployment. Scale up for production traffic." },
          { q: "Do you support Kubernetes?", a: "Yes, Helm charts are available in the /deploy/k8s directory." },
        ],
      },
      {
        title: "Configuration",
        readingTime: "6 min",
        content: "The platform uses environment variables for configuration. All variables can be set in a .env file for local development or as environment variables in production.",
        codeExamples: [
          { language: "bash", title: "Environment Variables", code: "# Server\nPORT=5000\nNODE_ENV=development\n\n# Database\nMONGODB_URI=mongodb://localhost:27017/anoneurx\n\n# Authentication\nJWT_SECRET=your-super-secret-key\nJWT_EXPIRE=7d\nJWT_REFRESH_EXPIRE=30d\n\n# File Upload\nMAX_FILE_SIZE=10485760  # 10MB\nUPLOAD_DIR=./uploads\n\n# Rate Limiting\nRATE_LIMIT_WINDOW=900000  # 15 min\nRATE_LIMIT_MAX=100\n\n# CORS\nCORS_ORIGIN=http://localhost:5173\n\n# Logging\nLOG_LEVEL=debug" },
        ],
        subsections: [
          { title: "Required Variables", content: "MONGODB_URI — MongoDB connection string (required)\nJWT_SECRET — Secret key for JWT signing (required)\nNODE_ENV — Environment: development, production, test" },
          { title: "Optional Variables", content: "PORT — Server port (default: 5000)\nLOG_LEVEL — Logging level: debug, info, warn, error\nMAX_FILE_SIZE — Maximum upload size in bytes\nRATE_LIMIT_MAX — Max requests per window" },
        ],
      },
      {
        title: "Error Handling",
        readingTime: "4 min",
        content: "The API returns consistent error responses with appropriate HTTP status codes. All errors include a message and optional error code.",
        codeExamples: [
          { language: "json", title: "Error Response Format", code: `{\n  "success": false,\n  "error": {\n    "code": "VALIDATION_ERROR",\n    "message": "Email is required",\n    "details": [\n      { "field": "email", "message": "Email is required" }\n    ]\n  }\n}` },
          { language: "typescript", title: "Error Handling in Client", code: `try {\n  const response = await api.post('/auth/login', credentials);\n  return response.data;\n} catch (error) {\n  if (error.response?.status === 401) {\n    // Invalid credentials\n  } else if (error.response?.status === 429) {\n    // Rate limited - retry after delay\n  } else {\n    // Unexpected error\n  }\n}` },
        ],
        subsections: [
          { title: "HTTP Status Codes", content: "200 — Success\n201 — Created\n400 — Bad Request (validation error)\n401 — Unauthorized (missing/invalid token)\n403 — Forbidden (insufficient permissions)\n404 — Not Found\n409 — Conflict (duplicate resource)\n429 — Too Many Requests (rate limited)\n500 — Internal Server Error" },
        ],
      },
      {
        title: "Webhooks",
        readingTime: "5 min",
        content: "Configure webhooks to receive real-time notifications about events in the platform. Webhooks deliver HTTP POST requests to your specified URL.",
        codeExamples: [
          { language: "json", title: "Webhook Payload", code: `{\n  "event": "project.submitted",\n  "timestamp": "2026-03-15T10:30:00Z",\n  "data": {\n    "projectId": "proj_123",\n    "title": "AI Dashboard",\n    "submittedBy": "user_456"\n  },\n  "signature": "sha256=abc123..."\n}` },
          { language: "typescript", title: "Verify Webhook Signature", code: `import crypto from 'crypto';\n\nfunction verifyWebhook(payload: string, signature: string, secret: string) {\n  const expected = crypto\n    .createHmac('sha256', secret)\n    .update(payload)\n    .digest('hex');\n  return crypto.timingSafeEqual(\n    Buffer.from(signature),\n    Buffer.from(\`sha256=\${expected}\`)\n  );\n}` },
        ],
        subsections: [
          { title: "Available Events", content: "project.created     — New project created\nproject.submitted    — Project submitted for review\nproject.approved     — Project approved\nuser.registered      — New user registration\nuser.role_changed    — User role updated\napplication.received — New internship application\nleave.requested      — Leave request submitted\nleave.approved       — Leave request approved" },
        ],
      },
      {
        title: "Rate Limits",
        readingTime: "3 min",
        content: "The API enforces rate limits to ensure fair usage and protect against abuse. Limits vary by authentication status and endpoint type.",
        codeExamples: [
          { language: "text", title: "Rate Limit Headers", code: "X-RateLimit-Limit: 100\nX-RateLimit-Remaining: 95\nX-RateLimit-Reset: 1711025400\nRetry-After: 120  # Only included when rate limited" },
        ],
        subsections: [
          { title: "Limits by Tier", content: "Unauthenticated:  100 requests / 15 minutes\nAuthenticated:    1,000 requests / 15 minutes\nAdmin:            5,000 requests / 15 minutes\nFile Upload:      20 requests / hour\nAuth Endpoints:   10 requests / 15 minutes (login, register)" },
        ],
      },
    ],
  },
  arcadeum: {
    name: "Arcadeum",
    icon: Gamepad2,
    description: "Gaming and entertainment platform",
    color: "from-purple-500/20 to-pink-500/20",
    status: "beta",
    category: "Entertainment",
    versions: ["v2.0.0-beta (latest)", "v1.5.0", "v1.0.0"],
    currentVersion: "v2.0.0-beta (latest)",
    githubUrl: "https://github.com/anoneurx/arcadeum",
    changelog: [
      { version: "v2.0.0-beta", date: "2026-03-01", changes: ["New multiplayer engine", "WebSocket-based real-time events", "Tournament system"], type: "feature" },
      { version: "v1.5.0", date: "2026-01-15", changes: ["Fixed leaderboard ranking algorithm", "Improved achievement unlock reliability"], type: "fix" },
    ],
    sections: [
      { title: "Getting Started", readingTime: "4 min", content: "Arcadeum is our gaming and entertainment platform. It provides APIs for game integration, leaderboards, achievements, and multiplayer sessions.", codeExamples: [{ language: "bash", title: "Quick Start", code: "npm install @anoneurx/arcadeum-sdk" }, { language: "typescript", title: "SDK Initialization", code: `import { Arcadeum } from '@anoneurx/arcadeum-sdk';\n\nconst arcadeum = new Arcadeum({\n  apiKey: 'your-api-key',\n  gameId: 'your-game-id',\n  environment: 'production'\n});\n\nawait arcadeum.initialize();`, alternatives: [{ lang: "python", code: `from arcadeum import ArcadeumClient\n\nclient = ArcadeumClient(\n    api_key='your-api-key',\n    game_id='your-game-id'\n)\nclient.initialize()` }] }], faq: [{ q: "Is Arcadeum free to use?", a: "Yes, the free tier supports up to 1,000 monthly active players. Contact us for higher limits." }] },
      { title: "Leaderboards API", readingTime: "6 min", content: "Create and manage leaderboards for your games with real-time updates, time-based rankings, and custom scoring algorithms.", codeExamples: [{ language: "typescript", title: "Submit Score", code: `await arcadeum.leaderboard.submitScore({\n  playerId: 'player-123',\n  score: 9500,\n  metadata: { level: 12, time: '2:34' }\n});`, alternatives: [{ lang: "cURL", code: `curl -X POST https://api.arcadeum.dev/v2/scores \\\n  -H "Authorization: Bearer YOUR_KEY" \\\n  -d '{"playerId":"player-123","score":9500}'` }] }, { language: "typescript", title: "Get Rankings", code: `const top100 = await arcadeum.leaderboard.getTopScores({\n  limit: 100,\n  timeframe: 'weekly',\n  includeMetadata: true\n});\n\nconsole.log(top100.entries);` }] },
      { title: "Achievements", readingTime: "4 min", content: "Define and track player achievements with customizable unlock conditions, tiers, and rewards.", codeExamples: [{ language: "typescript", title: "Unlock Achievement", code: `await arcadeum.achievements.unlock({\n  playerId: 'player-123',\n  achievementId: 'first-win',\n  metadata: { score: 9500 }\n});\n\nconst playerAchievements = await arcadeum.achievements.list('player-123');` }] },
      { title: "Multiplayer", readingTime: "8 min", content: "Create real-time multiplayer sessions with WebSocket-based communication, matchmaking, and lobby management.", codeExamples: [{ language: "typescript", title: "Create Session", code: `const session = await arcadeum.multiplayer.createSession({\n  maxPlayers: 4,\n  gameMode: 'battle-royale',\n  region: 'us-east'\n});\n\nsession.on('playerJoined', (player) => {\n  console.log(\`\${player.name} joined!\`);\n});\n\nsession.on('gameEvent', (event) => {\n  // Handle real-time game events\n});` }] },
    ],
  },
  "ai-engine": {
    name: "AI Engine",
    icon: Brain,
    description: "Machine learning and AI API services",
    color: "from-green-500/20 to-emerald-500/20",
    status: "stable",
    category: "AI & ML",
    versions: ["v4.1.0 (latest)", "v4.0.0", "v3.5.0"],
    currentVersion: "v4.1.0 (latest)",
    githubUrl: "https://github.com/anoneurx/ai-engine",
    changelog: [
      { version: "v4.1.0", date: "2026-03-10", changes: ["Added streaming responses for text generation", "New image segmentation model", "50% faster inference"], type: "feature" },
    ],
    sections: [
      { title: "Getting Started", readingTime: "5 min", content: "The AI Engine provides REST APIs for text generation, image analysis, predictive modeling, and embeddings. Supports both Python and TypeScript SDKs.", codeExamples: [{ language: "bash", title: "Installation", code: "pip install anoneurx-ai\n# or\nnpm install @anoneurx/ai-sdk" }, { language: "python", title: "Python Quick Start", code: `from anoneurx_ai import AIEngine\n\nclient = AIEngine(api_key="your-key")\n\nresponse = client.generate(\n    prompt="Explain quantum computing",\n    max_tokens=500,\n    temperature=0.7\n)\nprint(response.text)`, alternatives: [{ lang: "typescript", code: `import { AIEngine } from '@anoneurx/ai-sdk';\n\nconst ai = new AIEngine({ apiKey: 'your-key' });\n\nconst response = await ai.generate({\n  prompt: 'Explain quantum computing',\n  maxTokens: 500,\n  temperature: 0.7\n});\nconsole.log(response.text);` }] }] },
      { title: "Text Generation", readingTime: "7 min", content: "Generate text using state-of-the-art language models with customizable parameters, streaming, and function calling.", codeExamples: [{ language: "typescript", title: "Streaming Response", code: `const stream = await ai.generate({\n  prompt: 'Write a technical blog post about...',\n  stream: true,\n  model: 'anoneurx-large'\n});\n\nfor await (const chunk of stream) {\n  process.stdout.write(chunk.text);\n}` }, { language: "python", title: "Function Calling", code: `response = client.generate(\n    prompt="What's the weather in Tokyo?",\n    functions=[{\n        "name": "get_weather",\n        "parameters": {\n            "location": {"type": "string"},\n            "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}\n        }\n    }]\n)` }] },
      { title: "Image Analysis", readingTime: "5 min", content: "Analyze images for object detection, classification, segmentation, and content understanding with high accuracy.", codeExamples: [{ language: "python", title: "Image Classification", code: `result = client.vision.classify(\n    image_url="https://example.com/image.jpg",\n    labels=["cat", "dog", "bird"],\n    confidence_threshold=0.8\n)\n\nfor prediction in result.predictions:\n    print(f"{prediction.label}: {prediction.confidence:.2%}")` }] },
      { title: "Embeddings", readingTime: "4 min", content: "Generate vector embeddings for text, images, and documents. Use for semantic search, clustering, and similarity matching.", codeExamples: [{ language: "python", title: "Generate Embeddings", code: `embeddings = client.embeddings.create(\n    input=["Hello world", "How are you?"],\n    model="embed-v3"\n)\n\nimport numpy as np\nsim = np.dot(embeddings[0], embeddings[1])\nprint(f"Similarity: {sim:.4f}")` }] },
    ],
  },
  "robotics-sdk": {
    name: "Robotics SDK",
    icon: Cpu,
    description: "Hardware integration and robotics control",
    color: "from-amber-500/20 to-orange-500/20",
    status: "beta",
    category: "Hardware",
    versions: ["v1.2.0-beta (latest)", "v1.1.0", "v1.0.0"],
    currentVersion: "v1.2.0-beta (latest)",
    githubUrl: "https://github.com/anoneurx/robotics-sdk",
    changelog: [
      { version: "v1.2.0-beta", date: "2026-02-28", changes: ["LiDAR sensor support", "Path planning algorithms", "ROS2 bridge integration"], type: "feature" },
    ],
    sections: [
      { title: "Getting Started", readingTime: "5 min", content: "The Robotics SDK provides Python libraries for controlling hardware, sensors, and actuators. Compatible with Arduino, Raspberry Pi, and ROS2.", codeExamples: [{ language: "bash", title: "Installation", code: "pip install anoneurx-robotics\n# Requires Python 3.10+\n# Optional: pip install anoneurx-robotics[ros2] for ROS2 support" }, { language: "python", title: "Basic Setup", code: `from anoneurx_robotics import Robot, Servo, Sensor\n\nrobot = Robot(port='/dev/ttyUSB0', baudrate=115200)\nrobot.connect()\n\nservo = Servo(pin=9, min_angle=0, max_angle=180)\nrobot.attach(servo)\n\nservo.move(90, speed=0.5)` }], faq: [{ q: "Which boards are supported?", a: "Arduino Uno/Mega/Nano, Raspberry Pi 3/4/5, ESP32, and any serial-compatible microcontroller." }, { q: "Can I use this with ROS2?", a: "Yes! Install with pip install anoneurx-robotics[ros2] for ROS2 bridge support." }] },
      { title: "Sensor Integration", readingTime: "6 min", content: "Read data from various sensors including ultrasonic, IMU, temperature, pressure, and LiDAR with unified APIs.", codeExamples: [{ language: "python", title: "Reading Sensors", code: `from anoneurx_robotics import UltrasonicSensor, IMU, TemperatureSensor\n\nsonar = UltrasonicSensor(trigger_pin=7, echo_pin=8)\ndistance = sonar.read()\n\nimu = IMU(address=0x68)\norientation = imu.get_orientation()\nprint(f"Roll: {orientation.roll:.1f}° Pitch: {orientation.pitch:.1f}°")\n\ntemp = TemperatureSensor(pin=2, model='DHT22')\nprint(f"Temp: {temp.celsius:.1f}°C Humidity: {temp.humidity:.1f}%")` }] },
      { title: "Motion Control", readingTime: "5 min", content: "Control motors, servos, and actuators with precise positioning, PID control, and trajectory planning.", codeExamples: [{ language: "python", title: "Motor Control", code: `from anoneurx_robotics import DCMotor, MotorController, PIDController\n\ncontroller = MotorController()\nmotor_left = DCMotor(pins=(3, 4), encoder_pin=2)\nmotor_right = DCMotor(pins=(5, 6), encoder_pin=7)\n\npid = PIDController(kp=1.0, ki=0.1, kd=0.05)\ncontroller.drive(\n    motor_left, motor_right,\n    speed=0.75, direction='forward',\n    pid_controller=pid\n)` }] },
      { title: "Path Planning", readingTime: "7 min", content: "Plan and execute paths using A*, RRT, and potential field algorithms. Supports obstacle avoidance and SLAM mapping.", codeExamples: [{ language: "python", title: "A* Path Planning", code: `from anoneurx_robotics.navigation import AStarPlanner, GridMap\n\ngrid = GridMap(resolution=0.05)\ngrid.update_from_lidar(lidar.scan())\n\nplanner = AStarPlanner(grid)\npath = planner.plan(\n    start=(0, 0),\n    goal=(5.0, 3.0),\n    diagonal=True\n)\n\nrobot.follow_path(path, speed=0.3)` }] },
    ],
  },
};

const CodeBlock = ({ code, language, title, alternatives }: {
  code: string; language: string; title: string;
  alternatives?: { lang: string; code: string }[];
}) => {
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState(language);
  const activeCode = activeLang === language ? code : alternatives?.find(a => a.lang === activeLang)?.code || code;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allLangs = [language, ...(alternatives?.map(a => a.lang) || [])];

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between bg-white/[0.04] rounded-t-lg px-4 py-2 border border-white/[0.08] border-b-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">{title}</span>
          {allLangs.length > 1 ? (
            <div className="flex gap-1">
              {allLangs.map(lang => (
                <button key={lang} onClick={() => setActiveLang(lang)} className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${activeLang === lang ? "bg-white/[0.1] border-white/[0.2] text-white/70" : "border-white/[0.06] text-white/30 hover:text-white/50"}`}>{lang}</button>
              ))}
            </div>
          ) : (
            <Badge className="bg-white/[0.06] border-white/[0.1] text-white/50 text-xs px-1.5 py-0">{language}</Badge>
          )}
        </div>
        <button onClick={handleCopy} className="text-white/30 hover:text-white/60 transition-colors">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <pre className="bg-black/50 backdrop-blur border border-white/[0.08] rounded-b-lg p-4 text-sm font-mono text-green-300/80 overflow-x-auto">{activeCode}</pre>
    </div>
  );
};

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/[0.06] rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[0.02] transition-colors">
        <span className="text-sm text-white/80">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-white/30 shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />}
      </button>
      {open && <div className="px-4 pb-3 text-sm text-white/50">{a}</div>}
    </div>
  );
};

const FeedbackWidget = () => {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  return (
    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/[0.06]">
      <span className="text-sm text-white/40">Was this helpful?</span>
      <button onClick={() => setFeedback("up")} className={`p-1.5 rounded-md transition-colors ${feedback === "up" ? "bg-green-500/20 text-green-400" : "text-white/30 hover:text-white/60 hover:bg-white/[0.04]"}`}><ThumbsUp className="w-4 h-4" /></button>
      <button onClick={() => setFeedback("down")} className={`p-1.5 rounded-md transition-colors ${feedback === "down" ? "bg-red-500/20 text-red-400" : "text-white/30 hover:text-white/60 hover:bg-white/[0.04]"}`}><ThumbsDown className="w-4 h-4" /></button>
      {feedback && <span className="text-xs text-white/30">Thanks for your feedback!</span>}
    </div>
  );
};

const Documentation = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChangelog, setShowChangelog] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set<string>();
    Object.values(projectDocs).forEach(p => cats.add(p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    let entries = Object.entries(projectDocs);
    if (activeCategory !== "All") {
      entries = entries.filter(([, doc]) => doc.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      entries = entries.filter(([, doc]) =>
        doc.name.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.sections.some(s => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q))
      );
    }
    return entries;
  }, [searchQuery, activeCategory]);

  const currentProject = selectedProject ? projectDocs[selectedProject] : null;
  const currentSection = currentProject ? currentProject.sections[selectedSection] : null;

  const toc = useMemo(() => {
    if (!currentSection) return [];
    const items: string[] = [currentSection.title];
    currentSection.subsections?.forEach(s => items.push(s.title));
    if (currentSection.faq?.length) items.push("FAQ");
    return items;
  }, [currentSection]);

  // If a project is selected, show the detail view
  if (selectedProject && currentProject && currentSection) {
    const project = currentProject;
    const section = currentSection;
    const StatusBadge = statusConfig[project.status];

    const changeTypeColor: Record<string, string> = { feature: "text-green-400", fix: "text-blue-400", breaking: "text-red-400" };
    const changeTypeLabel: Record<string, string> = { feature: "Feature", fix: "Bug Fix", breaking: "Breaking" };

    return (
      <PageTransition>
        <div className="min-h-screen">
          <section className="py-12 px-4 border-b border-white/[0.06]">
            <div className="container mx-auto max-w-7xl">
              <button onClick={() => { setSelectedProject(null); setSelectedSection(0); setShowChangelog(false); }} className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to all projects
              </button>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <project.icon className="w-6 h-6 text-white/80" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-bold text-white">{project.name}</h1>
                      <Badge className={`${StatusBadge.color} text-xs`}><StatusBadge.icon className="w-3 h-3 mr-1" /> {StatusBadge.label}</Badge>
                    </div>
                    <p className="text-sm text-white/50 mt-1">{project.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select value={selectedVersion || project.currentVersion} onChange={(e) => setSelectedVersion(e.target.value)} className="bg-white/[0.04] border border-white/[0.1] rounded-md text-xs text-white/60 px-2 py-1.5 appearance-none cursor-pointer">
                    {project.versions.map(v => <option key={v} value={v} className="bg-gray-900">{v}</option>)}
                  </select>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors px-2 py-1.5 rounded-md border border-white/[0.06] hover:border-white/[0.1]">
                    <ExternalLink className="w-3 h-3" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row">
            <aside className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06] p-4 lg:py-8 lg:pr-6">
              <nav className="space-y-0.5">
                {project.sections.map((sec, i) => (
                  <button key={sec.title} onClick={() => { setSelectedSection(i); setShowChangelog(false); }} className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${!showChangelog && selectedSection === i ? "text-white bg-white/[0.06] font-medium" : "text-white/40 hover:text-white/60 hover:bg-white/[0.02]"}`}>{sec.title}</button>
                ))}
                <button onClick={() => setShowChangelog(true)} className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${showChangelog ? "text-white bg-white/[0.06] font-medium" : "text-white/40 hover:text-white/60 hover:bg-white/[0.02]"}`}>Changelog</button>
              </nav>
            </aside>

            <main className="flex-1 p-4 lg:p-8 min-w-0">
              <div className="flex items-center gap-2 text-xs text-white/40 mb-8">
                <span>Docs</span><ChevronRight className="w-3 h-3" /><span>{project.name}</span><ChevronRight className="w-3 h-3" /><span className="text-white/70">{showChangelog ? "Changelog" : section.title}</span>
              </div>

              {showChangelog ? (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Changelog</h2>
                  <div className="space-y-4">
                    {project.changelog.map((entry) => (
                      <Card key={entry.version} className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                        <CardContent className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className="bg-white/[0.06] border-white/[0.1] text-white/70 text-xs">{entry.version}</Badge>
                            <span className="text-xs text-white/40">{entry.date}</span>
                            <Badge className={`text-xs ${changeTypeColor[entry.type]} bg-transparent border-current/30`}>{changeTypeLabel[entry.type]}</Badge>
                          </div>
                          <ul className="space-y-1.5">{entry.changes.map((c, i) => (<li key={i} className="text-sm text-white/60 flex items-start gap-2"><span className="text-white/20 mt-1.5">•</span> {c}</li>))}</ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                    {section.readingTime && <span className="flex items-center gap-1 text-xs text-white/30"><Clock className="w-3 h-3" /> {section.readingTime} read</span>}
                  </div>
                  <p className="text-white/60 leading-relaxed mb-8">{section.content}</p>
                  {section.codeExamples?.map((example, i) => <CodeBlock key={i} code={example.code} language={example.language} title={example.title} alternatives={example.alternatives} />)}
                  {section.subsections?.map((sub, i) => (
                    <div key={i} className="mt-8">
                      <h3 className="text-lg font-semibold text-white mb-3">{sub.title}</h3>
                      <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-5"><pre className="text-sm text-white/60 whitespace-pre-wrap font-sans leading-relaxed">{sub.content}</pre></div>
                      {sub.codeExamples?.map((example, j) => <div className="mt-4" key={j}><CodeBlock code={example.code} language={example.language} title={example.title} alternatives={example.alternatives} /></div>)}
                    </div>
                  ))}
                  {section.faq && section.faq.length > 0 && (
                    <div className="mt-10">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Bug className="w-4 h-4 text-white/40" /> FAQ & Troubleshooting</h3>
                      <div className="space-y-2">{section.faq.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}</div>
                    </div>
                  )}
                  {section.relatedDocs && section.relatedDocs.length > 0 && (
                    <div className="mt-8 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-xs text-white/40 block mb-2">Related Documentation</span>
                      <div className="flex flex-wrap gap-2">{section.relatedDocs.map((rel, i) => (<button key={i} onClick={() => setSelectedSection(rel.sectionIndex)} className="text-xs text-white/60 hover:text-white px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] transition-colors">{rel.title} →</button>))}</div>
                    </div>
                  )}
                  <FeedbackWidget />
                  <div className="flex justify-between mt-8 pt-8 border-t border-white/[0.06]">
                    {selectedSection > 0 ? <Button variant="ghost" onClick={() => setSelectedSection(selectedSection - 1)} className="text-white/50 hover:text-white gap-2"><ArrowLeft className="w-4 h-4" /> {project.sections[selectedSection - 1].title}</Button> : <div />}
                    {selectedSection < project.sections.length - 1 && <Button variant="ghost" onClick={() => setSelectedSection(selectedSection + 1)} className="text-white/50 hover:text-white gap-2">{project.sections[selectedSection + 1].title} <ChevronRight className="w-4 h-4" /></Button>}
                  </div>
                </div>
              )}
            </main>

            <aside className="hidden xl:block w-56 shrink-0 border-l border-white/[0.06] p-4 py-8 pl-6">
              <div className="sticky top-8">
                <div className="flex items-center gap-2 text-xs text-white/40 mb-4"><List className="w-3.5 h-3.5" /> On This Page</div>
                <nav className="space-y-1">
                  {toc.map((item, i) => (<div key={item} className={`text-xs py-1 ${i === 0 ? "text-white/70 font-medium" : "text-white/40 hover:text-white/60 cursor-pointer pl-2 border-l border-white/[0.06]"} transition-colors`}>{item}</div>))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </PageTransition>
    );
  }

  return null;
};

export default Documentation;
