# n2n Workflow Automation Platform

> **n2n** is a full-stack, visual workflow automation engine that enables users to connect triggers, AI models, HTTP requests, web search services, and conditional logic through an interactive drag-and-drop canvas built with React Flow and Node.js.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture & Tech Stack](#architecture-tech-stack)
- [Feature Matrix & Implementation Status](#feature-matrix-implementation-status)
- [Node Types & Execution Capabilities](#node-types-execution-capabilities)
- [Directory Structure](#directory-structure)
- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Setup & Installation Instructions](#setup-installation-instructions)
- [API Reference](#api-reference)
- [Workflow Execution Engine Data Flow](#workflow-execution-engine-data-flow)
- [Known Limitations & Current Scope](#known-limitations-current-scope)
- [License](#license)

---

<a id="overview"></a>
## 🔍 Overview

`n2n` is designed to streamline process automation by enabling users to design workflows visually on a web-based node editor and execute them asynchronously on a backend engine. 

Workflows consist of **Triggers** (initiating events), **Actions** (AI execution, HTTP calls, search, email), and **Conditions** (branching logic). The engine processes nodes sequentially using graph traversal (Breadth-First Search) and pipes outputs from upstream parent nodes directly into downstream child nodes.

---

<a id="architecture-tech-stack"></a>
## 🛠️ Architecture & Tech Stack

### Technology Components

| Layer | Component / Library | Version | Description |
| :--- | :--- | :--- | :--- |
| **Frontend** | React | `^19.2.8` | Core UI library |
| **Frontend** | TypeScript | `~6.0.2` | Type safety across client components |
| **Frontend** | Vite | `^8.2.0` | Fast build tool and dev server |
| **Frontend** | `@xyflow/react` (React Flow) | `^12.11.2` | Drag-and-drop visual workflow canvas |
| **Frontend** | Tailwind CSS | `^4.3.3` | Utility-first CSS styling framework |
| **Frontend** | React Router DOM | `^7.18.2` | SPA routing (`/`, `/login`, `/dashboard`, `/create-workflow`) |
| **Frontend** | Axios | `^1.19.0` | Client HTTP request handler |
| **Frontend** | React Toastify | `^11.1.0` | Interactive notifications |
| **Backend** | Node.js / Express | `^5.2.1` | REST API backend server running on port `8000` |
| **Backend** | Mongoose / MongoDB | `^9.9.3` | Data modeling & database persistence |
| **Backend** | Google GenAI SDK | `^2.21.0` | AI generation powered by `gemini-3.8-flash` |
| **Backend** | Tavily Core SDK | `^0.7.9` | Advanced web search execution engine |
| **Backend** | JSON Web Token (`jsonwebtoken`) | `^9.0.3` | Bearer token authentication |

---

<a id="feature-matrix-implementation-status"></a>
## 📊 Feature Matrix & Implementation Status

> ⚠️ **Note on Project Scope**: To maintain transparency, all features are categorized by their exact implementation state below.

| Feature | Category | Implementation Status | Technical Details |
| :--- | :--- | :--- | :--- |
| User Signup & Login | Authentication | ✅ Implemented | JWT bearer token authentication storing user state in `localStorage` |
| Node Registry | Backend Service | ✅ Implemented | API endpoint (`GET /nodes`) returning available nodes from MongoDB |
| Visual Workflow Editor | Canvas | ✅ Implemented | React Flow canvas with custom nodes, handles, pan, zoom, fit view |
| Node Parameters Panel | Editor Sheet | ✅ Implemented | Side drawer for editing node metadata (prompts, headers, URLs, keys) |
| Workflow Save & Persist | Persistence | ✅ Implemented | Saves node graph and connection edges to MongoDB (`Workflow` model) |
| BFS Engine Traversal | Workflow Engine | ✅ Implemented | Iterative queue-based execution traversing connected edges |
| Data Piping Between Nodes | Workflow Engine | ✅ Implemented | Parent node output injected as input payload into downstream node prompt/request |
| AI Generation Node | Action Engine | ✅ Implemented | Executes via `@google/genai` using model `gemini-3.8-flash` |
| HTTP Request Node | Action Engine | ✅ Implemented | Supports `GET`, `POST`, `PUT`, `DELETE`, `PATCH` via Axios |
| Web Search Node | Action Engine | ✅ Implemented | Executes web search via `@tavily/core` SDK with depth control |
| If / Else Branching | Condition Node | 🟡 Canvas UI Ready | Visual node definition & parameter configuration created |
| Send Email Node | Action Node | 🟡 Canvas UI Ready | Parameter sheet configured; backend switch case currently stubbed |
| Password Encryption (Bcrypt) | Auth Security | 🟡 Pending Integration | Plaintext matching currently used in database auth handler |
| Background Cron Scheduler | Trigger Engine | 🟡 Pending Integration | Manual trigger execution active; schedule UI ready |

---

<a id="node-types-execution-capabilities"></a>
## 🧩 Node Types & Execution Capabilities

The system categorizes nodes into three primary groups:

| Category | Node Type | UI Name | Configuration Parameters | Backend Handling | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Trigger** | `formsubmit` | Form Submit | Custom form fields & trigger conditions | Starts workflow execution flow | ✅ Supported |
| **Trigger** | `manual` | Manual Trigger | Manual trigger button configuration | Initiates workflow payload | ✅ Supported |
| **Trigger** | `schedule` | Schedule Trigger | Time intervals / schedule string | Defines workflow execution timing | 🟡 UI Config Ready |
| **Action** | `aichat` | AI Chat | Model provider (`gemini-3.8-flash`), API key, Prompt | Sends prompt + parent data to Google GenAI | ✅ Active |
| **Action** | `httprequest` | HTTP Request | HTTP Method, URL, JSON Headers, JSON Body | Executes HTTP call via Axios & returns output | ✅ Active |
| **Action** | `websearch` | Web Search | Search Query / Topic string | Executes Tavily search (`depth: advanced`) | ✅ Active |
| **Action** | `sendemail` | Send Email | Sender (`from`), Recipient (`to`), Subject, Body | Metadata updated in node state | 🟡 UI Config Ready |
| **Condition** | `ifelse` | If / Else | Boolean expression / Comparison fields | Node graph branching indicator | 🟡 UI Config Ready |

---

<a id="directory-structure"></a>
## 📁 Directory Structure

```text
n2n/
├── backend/
│   ├── auth/
│   │   └── auth.ts                # Express JWT authorization middleware
│   ├── packages/
│   │   └── db/
│   │       └── db.ts              # Mongoose schemas (User, Workflow, Node, Trigger, Action)
│   ├── src/
│   │   ├── types/
│   │   │   └── index.d.ts         # Custom Express request interface extensions
│   │   ├── engine.ts              # Core workflow execution engine helper logic
│   │   └── index.ts               # Express server, route definitions & node execution handlers
│   ├── .env                       # Backend environment configuration
│   ├── package.json               # Backend dependencies & script definitions
│   └── tsconfig.json              # TypeScript compiler configuration
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ui/                # Shadcn UI primitives (button, sheet, input, etc.)
    │   │   ├── Navbar.tsx         # Application top header navigation bar
    │   │   ├── Parameters.tsx     # Node configuration side sheet drawer
    │   │   └── Triggersheet.tsx   # Available nodes catalog drawer
    │   ├── context/
    │   │   └── appcontext.tsx     # Global React Context state provider
    │   ├── lib/
    │   │   └── utils.ts           # Class merging utilities (clsx / tailwind-merge)
    │   ├── nodes/
    │   │   ├── Actions/           # AIChatResponse, Email, HttpRequest, WebSearch
    │   │   ├── Triggers/          # Formsubmit, Manual, Schedule
    │   │   └── conditions/        # ifElse
    │   ├── pages/
    │   │   ├── CreateWorkFlow.tsx # React Flow drag-and-drop workspace canvas
    │   │   ├── Dashboard.tsx      # User workflow management dashboard
    │   │   ├── Home.tsx           # Application landing page
    │   │   └── Login.tsx          # Authentication page (Login & Signup)
    │   ├── types/
    │   │   └── types.ts           # Flow Node & Edge TypeScript interface declarations
    │   ├── App.tsx                # Main route layout wrapper
    │   ├── index.css              # Global styles & Tailwind CSS imports
    │   └── main.tsx               # Entry application root renderer
    ├── .env                       # Frontend environment configuration
    ├── package.json               # Frontend dependencies & Vite scripts
    └── vite.config.ts             # Vite bundler configuration
```

---

<a id="prerequisites"></a>
## ⚡ Prerequisites

Before setting up `n2n`, ensure you have the following installed on your system:

- **Node.js**: Version `18.x` or `20.x` higher recommended
- **npm**: Version `9.x` or higher
- **MongoDB**: Access to a local instance or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster connection URI
- **Tavily API Key**: Required for Web Search node functionality ([Tavily AI](https://tavily.com/))
- **Google Gemini API Key**: Required for AI Chat node execution ([Google AI Studio](https://aistudio.google.com/))

---

<a id="environment-configuration"></a>
## ⚙️ Environment Configuration

### Backend Environment Variables (`backend/.env`)

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=8000

# Tavily Web Search API Key
websearch_url=YOUR_TAVILY_API_KEY_HERE

# Database Connection (If overridden dynamically)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/n2n
```

### Frontend Environment Variables (`frontend/.env`)

Create a `.env` file in the `frontend/` directory:

```env
# Backend API Base Endpoint URL
VITE_BACKEND_URL=http://localhost:8000
```

---

<a id="setup-installation-instructions"></a>
## 🚀 Setup & Installation Instructions

Follow these step-by-step instructions to get the application running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/hrdpaliwal93/n2n.git
cd n2n
```

### 2. Set Up the Backend Server

```bash
# Navigate to backend directory
cd backend

# Install project dependencies
npm install

# Start the backend server (Compiles TypeScript & launches Node server)
npm start
```

> The backend server will initialize on `http://localhost:8000`.

### 3. Set Up the Frontend Client

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install client dependencies
npm install

# Start the Vite development server
npm run dev
```

> Open your browser and navigate to `http://localhost:5173` (or the URL displayed in your terminal).

---

<a id="api-reference"></a>
## 📡 API Reference

### Authentication & User Routes

| Endpoint | Method | Headers | Body Parameters | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/signup` | `POST` | `Content-Type: application/json` | `{ "username": "...", "password": "..." }` | Registers a new user account |
| `/login` | `POST` | `Content-Type: application/json` | `{ "username": "...", "password": "..." }` | Authenticates user and returns JWT token |

### Workflow & Node Management Routes

| Endpoint | Method | Headers | Body Parameters | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/nodes` | `GET` | None | None | Retrieves all registered node type schemas |
| `/workflows` | `GET` | `Authorization: Bearer <token>` | None | Returns all saved workflows created by the user |
| `/execute-workflow` | `POST` | `Authorization: Bearer <token>` | `{ "workflow": { "Nodes": [...], "Edges": [...] }, "workflowid": "..." }` | Saves workflow state & executes node graph |

---

<a id="workflow-execution-engine-data-flow"></a>
## 🔄 Workflow Execution Engine Data Flow

```text
[ Trigger Node ] (Initializes execution)
       │
       ▼
[ Queue Push ] ──► [ Process Node via BFS ]
                         │
                         ├─► AI Chat Node ──────► Calls Google Gemini API
                         ├─► HTTP Request Node ──► Executes Axios Request
                         └─► Web Search Node ───► Executes Tavily Search API
                         │
       ┌─────────────────┘
       ▼
[ Store Result in runData ] ──► [ Pass Result to Child Node Input ] ──► [ Enqueue Next Edge Target ]
```

1. **Trigger Identification**: The backend locates the entry `trigger` node.
2. **BFS Graph Traversal**: Nodes are processed sequentially using a FIFO queue.
3. **Data Context Propagation**: When an edge connects Node A to Node B, Node A's output payload is passed to Node B as `input`.
4. **Result Aggregation**: A JSON mapping (`runData`) holding execution output for each node is returned to the frontend editor.

---

<a id="known-limitations-current-scope"></a>
## 📌 Known Limitations & Current Scope

To prevent misrepresentation, the following capabilities represent current design boundaries:

- **Plaintext Auth Credentials**: The current authorization module compares user credentials directly in MongoDB without password hashing (`bcrypt`).
- **Send Email Node Handler**: The `sendemail` node interface exists in the frontend editor and database schema; the backend execution case is stubbed (`case 'sendemail': {} break;`).
- **Scheduled Trigger Execution**: The `schedule` node allows time metadata configuration in the UI; automated cron runner functionality is under active development.
- **Sequential Node Execution**: The workflow engine processes nodes sequentially via BFS traversal; true parallel multi-branch execution is planned for upcoming releases.

---

<a id="license"></a>
## 📜 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
