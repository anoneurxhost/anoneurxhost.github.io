# ANONEURX PLATFORM — BACKEND DEVELOPER SPECIFICATION & API ARCHITECTURE DOCUMENT

**Domain:** `anoneurx.com`  
**Target Audience:** Backend Software Engineers, System Architects, DevOps Engineers  
**Specification Version:** `1.0.0`  
**Last Updated:** August 19, 2026  

---

## 1. Executive Summary & Architecture Overview

The **Anoneurx Platform** relies on a microservices-based API architecture designed for domain isolation, zero single point of failure (SPOF), high availability, and rapid frontend integration.

Each microservice operates on its own dedicated subdomain. If any backend microservice is offline or undergoing maintenance, the remaining microservices continue operating independently. The frontend web application is built with a resilient circuit-breaker engine that seamlessly falls back to mock responses per domain if a service is unreachable.

### 1.1 Microservice Subdomain Mapping

| Microservice | Base Subdomain | Primary Responsibility |
| :--- | :--- | :--- |
| **Authentication & Identity** | `https://auth.anoneurx.com` | User authentication, JWT issuance, OAuth2, RBAC permissions, profile management. |
| **Open Source Ecosystem** | `https://opensource.anoneurx.com` | Open source project registry, packages, releases, documentation, discussions, events, showcase. |
| **Core Platform API** | `https://api.anoneurx.com` | Corporate management, staff, interns, verification system, applications, notifications, financial records. |
| **Cloud & Console (Connect)** | `https://connect.anoneurx.com` | Node telemetry, SSH key management, firewall rules, storage mounts, system terminal execution. |

---

## 2. Environment Variables & Configuration

Every backend environment should consume standard environment settings matching the frontend configuration.

### 2.1 Backend `.env` Template

```env
# Server Runtime
PORT=5000
NODE_ENV=production
MAIN_DOMAIN=anoneurx.com
CORS_ORIGIN=https://anoneurx.com,https://www.anoneurx.com,http://localhost:5173

# Database & Caching
MONGODB_URI=mongodb+srv://admin:<password>@cluster0.anoneurx.mongodb.net/anoneurx_prod?retryWrites=true&w=majority
REDIS_URI=redis://default:<password>@redis.anoneurx.com:6379

# Authentication & JWT
JWT_SECRET=super-secret-jwt-key-anoneurx-2026-prod
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=super-secret-refresh-key-anoneurx
REFRESH_TOKEN_EXPIRES_IN=30d

# Microservice Base URLs (Internal Inter-Service Communication)
AUTH_SERVICE_URL=https://auth.anoneurx.com
OPENSOURCE_SERVICE_URL=https://opensource.anoneurx.com
CORE_SERVICE_URL=https://api.anoneurx.com
CONNECT_SERVICE_URL=https://connect.anoneurx.com

# S3 Object Storage (File Assets)
S3_BUCKET_NAME=anoneurx-media-assets
S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
```

---

## 3. Microservice 1: Authentication & Identity (`auth.anoneurx.com`)

Handles all identity management, authentication tokens, and user credentials.

### 3.1 Data Schemas & Models

#### User Model
```json
{
  "_id": "ObjectId / string",
  "name": "string",
  "email": "string (unique, indexed)",
  "passwordHash": "string (bcrypt/argon2)",
  "role": "string ('admin' | 'staff' | 'intern' | 'developer' | 'client')",
  "department": "string (optional)",
  "avatarUrl": "string (URL)",
  "isEmailVerified": "boolean",
  "createdAt": "ISO Date String",
  "updatedAt": "ISO Date String"
}
```

### 3.2 Endpoints Specification

#### `POST /api/v1/login`
Authenticates user credentials and returns a Bearer JWT.

* **Request Body:**
  ```json
  {
    "email": "user@anoneurx.com",
    "password": "SecretPassword123!"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_99182",
      "name": "Alex Morgan",
      "email": "alex.morgan@anoneurx.com",
      "role": "Engineer",
      "department": "AI & Systems Engineering",
      "avatarUrl": "https://images.unsplash.com/..."
    },
    "message": "Authenticated successfully"
  }
  ```
* **Error Response (401 Unauthorized):**
  ```json
  {
    "success": false,
    "message": "Invalid email or password"
  }
  ```

#### `POST /api/v1/signup`
Registers a new user account.

* **Request Body:**
  ```json
  {
    "name": "Jordan Lee",
    "email": "jordan.lee@anoneurx.com",
    "password": "StrongPassword123!"
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_99183",
      "name": "Jordan Lee",
      "email": "jordan.lee@anoneurx.com",
      "role": "Developer"
    },
    "message": "Account created successfully"
  }
  ```

#### `GET /api/v1/me`
Retrieves current authenticated session details.
* **Headers:** `Authorization: Bearer <token>`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "user": {
      "id": "usr_99182",
      "name": "Alex Morgan",
      "email": "alex.morgan@anoneurx.com",
      "role": "Engineer"
    }
  }
  ```

#### `PUT /api/v1/profile`
Updates current user profile metadata.
* **Headers:** `Authorization: Bearer <token>`
* **Request Body:**
  ```json
  {
    "name": "Alex Morgan",
    "avatarUrl": "https://images.unsplash.com/new-avatar.jpg"
  }
  ```

---

## 4. Microservice 2: Open Source Ecosystem (`opensource.anoneurx.com`)

Powers the Anoneurx open source community registry, software projects, repositories, packages, tools, and developer showcase.

### 4.1 Endpoints Specification

| Method | Endpoint | Description | Query Parameters / Payload |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/projects` | List all open source projects | `?tag=rust&limit=20` |
| `GET` | `/api/v1/projects/:id` | Get details for single project | - |
| `GET` | `/api/v1/organizations` | List ecosystem organizations | - |
| `GET` | `/api/v1/libraries` | List public code libraries | `?language=Rust` |
| `GET` | `/api/v1/packages` | List package manager modules | `?registry=npm` |
| `GET` | `/api/v1/templates` | List application starter templates | - |
| `GET` | `/api/v1/docs` | List technical document guides | `?category=Language` |
| `GET` | `/api/v1/posts` | List open source blog articles | `?page=1` |
| `GET` | `/api/v1/releases` | List software release changelogs | - |
| `GET` | `/api/v1/discussions` | List developer community RFCs | - |
| `GET` | `/api/v1/events` | List summits & virtual meetups | - |
| `GET` | `/api/v1/sponsors` | List ecosystem sponsors | - |
| `GET` | `/api/v1/contributors` | List top code contributors | - |
| `GET` | `/api/v1/showcase` | List projects built on Anoneurx | - |

#### Sample Response format (`GET /api/v1/projects`):
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "id": "atlas",
      "name": "ATLAS Lang",
      "description": "Systems programming language with memory safety and zero-cost abstractions.",
      "language": "Rust",
      "stars": 12400,
      "tags": ["language", "compiler"]
    },
    {
      "id": "blackwall",
      "name": "Blackwall OS",
      "description": "Privacy-first operating system with hardened kernel and secure enclaves.",
      "language": "C / Rust",
      "stars": 9800,
      "tags": ["os", "security"]
    }
  ]
}
```

---

## 5. Microservice 3: Core Platform API (`api.anoneurx.com`)

Serves core business logic, personnel, intern verification portal, file management, applications, and system notifications.

### 5.1 Endpoints Specification

#### 1. Staff & Personnel Management
* `GET /api/staff` — List staff with filtering (`?department=&role=`).
* `POST /api/staff` — Add new staff member.
* `GET /api/staff/:id` — Get staff profile.
* `PUT /api/staff/:id` — Update staff profile.
* `DELETE /api/staff/:id` — Remove staff record.

#### 2. Departments & Analytics
* `GET /api/departments` — List departments.
* `GET /api/departments/:id/stats` — Department metrics.
* `GET /api/analytics/system` — Get system health metrics.
* `GET /api/analytics/monthly` — Aggregate monthly platform activity.

#### 3. Internships & Verification Portal
* `GET /api/interns` — List interns.
* `GET /api/interns/:id` — Get intern details.
* `GET /api/applications` — Retrieve applications.
* `POST /api/applications` — Submit new application.
* `PATCH /api/applications/:id/status` — Update application approval status.
* `GET /api/applications/search?q=ANX-2026-001` — Verification portal ID lookup.

#### 4. File Management & Assets
* `POST /api/files/upload` (Multipart Form-Data) — Upload single document/image.
* `POST /api/files/upload-multiple` — Batch file upload.
* `DELETE /api/files/:id` — Remove asset.

#### 5. Notifications Engine
* `GET /api/notifications/user/:userId` — Fetch user notifications.
* `PATCH /api/notifications/:id/read` — Mark notification read.
* `PATCH /api/notifications/user/:userId/read-all` — Mark all notifications read.
* `POST /api/notifications` — Broadcast notification.

---

## 6. Microservice 4: Cloud & Console (`connect.anoneurx.com`)

Powers server orchestration, host discovery, WireGuard networking, SSH keys, storage volume management, and live terminal interaction.

### 6.1 Endpoints Specification

* `POST /api/scan` — Subnet IP/Port scanner (`{ "cidr": "10.0.0.0/24", "ports": [22, 80, 443] }`).
* `POST /api/sessions` — Establish SSH / console session token.
* `GET /api/system/metrics` — Server CPU/Memory/Disk/Network metrics telemetry.
* `POST /api/system/power` — Perform system reboot/shutdown (`{ "action": "reboot" }`).
* `GET /api/network` — Network interfaces and routes overview.
* `GET /api/storage` — Disk volumes and mount states.
* `POST /api/storage/:id/mount` — Mount/unmount drive volume.
* `GET /api/ssh-keys` — List registered SSH public keys.
* `POST /api/ssh-keys/generate` — Generate fresh Ed25519 SSH keypair.
* `POST /api/terminal/exec` — Execute interactive shell command (`{ "command": "uname -a" }`).

---

## 7. Health Checks & System Monitoring

Each microservice MUST expose a lightweight `/healthz` endpoint for load balancers (Kubernetes / Nginx / AWS ALB).

### Health Check Endpoint Specification
* **URL:** `GET /healthz` (or `GET /api/v1/health`)
* **Expected HTTP Status:** `200 OK`
* **Response Body Schema:**
  ```json
  {
    "status": "healthy",
    "service": "auth.anoneurx.com",
    "timestamp": "2026-08-19T09:20:00.000Z",
    "uptimeSeconds": 86400,
    "databaseConnected": true,
    "redisConnected": true
  }
  ```

---

## 8. Cross-Origin Resource Sharing (CORS) & Security Guidelines

1. **Allowed Origins**:
   - `https://anoneurx.com`
   - `https://www.anoneurx.com`
   - `http://localhost:5173` (Development)
2. **Security Headers**:
   ```http
   X-Content-Type-Options: nosniff
   X-Frame-Options: DENY
   X-XSS-Protection: 1; mode=block
   Strict-Transport-Security: max-age=31536000; includeSubDomains
   Content-Security-Policy: default-src 'self' https://*.anoneurx.com
   ```
3. **Rate Limiting**:
   - Auth Endpoints (`auth.anoneurx.com`): Max **10 requests / minute** per IP.
   - Public Endpoints (`opensource.anoneurx.com`): Max **100 requests / minute** per IP.
   - Core API (`api.anoneurx.com`): Max **600 requests / minute** per authenticated user.
