export type ResearchArea = {
  id: string;
  name: string;
  icon: string;
  description: string;
  problemCount: number;
};

export type Problem = {
  id: string;
  code: string;
  title: string;
  areas: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  status: "Open" | "In Progress" | "Solved";
  suitableFor: string[];
  teamSize: string;
  description: string;
  whyItMatters: string;
  researchGap: string;
  researchQuestions: string[];
  technologies: string[];
  skills: string[];
  supervisor: string;
  deliverables: string[];
};

export type ResearchPaper = {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  date: string;
  category: "Published" | "Ongoing" | "Preprint" | "Experiments" | "Technical Report";
  area: string;
  abstract: string;
  problemId?: string;
};

export type LabProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  area: string;
  status: "Prototype" | "Active" | "Maintenance";
  problemId?: string;
  researchers: string[];
};

export type Researcher = {
  id: string;
  username: string;
  name: string;
  role: "Research Lead" | "Student Researcher" | "Contributor";
  areas: string[];
  bio: string;
  contributions: number;
};

export const researchAreas: ResearchArea[] = [
  { id: "ai-ml", name: "AI & Machine Learning", icon: "Brain", description: "Intelligent systems, deep learning, NLP, and computer vision research.", problemCount: 4 },
  { id: "cybersecurity", name: "Cybersecurity", icon: "Shield", description: "Threat detection, secure systems, cryptography, and privacy engineering.", problemCount: 3 },
  { id: "robotics", name: "Robotics", icon: "Bot", description: "Autonomous navigation, manipulation, and human-robot interaction.", problemCount: 2 },
  { id: "autonomous-systems", name: "Autonomous Systems", icon: "Cpu", description: "Self-driving, drone systems, and multi-agent coordination.", problemCount: 2 },
  { id: "systems-os", name: "Systems & OS", icon: "Server", description: "Operating systems, distributed computing, and performance optimization.", problemCount: 2 },
  { id: "data-science", name: "Data Science", icon: "Database", description: "Data pipelines, analytics, visualization, and statistical modeling.", problemCount: 1 },
  { id: "iot-edge", name: "IoT & Edge", icon: "Wifi", description: "Edge computing, sensor networks, and embedded intelligence.", problemCount: 1 },
  { id: "ai-safety", name: "AI Safety", icon: "AlertTriangle", description: "Alignment, robustness, interpretability, and value learning.", problemCount: 2 },
];

export const problems: Problem[] = [
  {
    id: "anx-rp-001",
    code: "ANX-RP-001",
    title: "Early Security Warning for Autonomous Systems",
    areas: ["Cybersecurity", "AI", "Robotics"],
    difficulty: "Advanced",
    status: "Open",
    suitableFor: ["CS", "SE", "DS", "AI", "Robotics"],
    teamSize: "2-4",
    description: "Develop an early warning system that detects security anomalies in autonomous vehicle sensor networks before they propagate to decision-making layers.",
    whyItMatters: "Autonomous vehicles process millions of sensor readings per second. A compromised sensor can lead to catastrophic failures. Current intrusion detection systems are too slow for real-time autonomous navigation.",
    researchGap: "Existing IDS focus on network-level threats but ignore sensor-level adversarial attacks specific to autonomous driving pipelines.",
    researchQuestions: [
      "How can we detect adversarial sensor inputs in under 10ms?",
      "What ML architectures are suitable for streaming anomaly detection on edge hardware?",
      "How do we minimize false positives without missing novel attack vectors?",
    ],
    technologies: ["Rust", "Python", "TensorRT", "ROS2", "CAN Bus"],
    skills: ["Machine Learning", "Systems Programming", "Real-time Systems"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "Research paper on lightweight anomaly detection for AV sensors",
      "Open-source Rust library for CAN bus anomaly detection",
      "Benchmark suite comparing detection latency vs accuracy tradeoffs",
    ],
  },
  {
    id: "anx-rp-002",
    code: "ANX-RP-002",
    title: "Federated Learning Privacy in Healthcare Data",
    areas: ["AI", "Cybersecurity"],
    difficulty: "Expert",
    status: "Open",
    suitableFor: ["AI", "DS", "CS"],
    teamSize: "3-5",
    description: "Design a federated learning framework that enables cross-hospital model training while provably preserving patient privacy through differential privacy guarantees.",
    whyItMatters: "Hospitals cannot share patient data due to regulations, yet rare diseases require large datasets for accurate diagnosis. Federated learning offers a path but current implementations leak gradient information.",
    researchGap: "Most FL frameworks either sacrifice too much utility for privacy or provide insufficient privacy guarantees against gradient inversion attacks.",
    researchQuestions: [
      "What is the optimal noise calibration for medical imaging FL?",
      "Can we prove differential privacy bounds for transformer architectures?",
      "How do we handle non-IID medical data distributions across hospitals?",
    ],
    technologies: ["PyTorch", "Flower", "OpenDP", "FHIR", "gRPC"],
    skills: ["Deep Learning", "Cryptography", "Distributed Systems"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "FL framework with formal privacy guarantees for medical data",
      "Evaluation on MIMIC-CXR and CheXpert datasets",
      "Privacy-utility Pareto frontier analysis",
    ],
  },
  {
    id: "anx-rp-003",
    code: "ANX-RP-003",
    title: "Real-time SLAM for Indoor Drone Navigation",
    areas: ["Robotics", "AI"],
    difficulty: "Advanced",
    status: "In Progress",
    suitableFor: ["Robotics", "CS", "AI"],
    teamSize: "2-3",
    description: "Build a lightweight SLAM system that runs on resource-constrained drone hardware for GPS-denied indoor navigation.",
    whyItMatters: "Indoor drones for warehouse inspection and emergency response need reliable localization without GPS. Current SLAM solutions are too computationally expensive for small drones.",
    researchGap: "Existing visual-inertial SLAM systems require GPU acceleration that lightweight drones cannot provide.",
    researchQuestions: [
      "Can we achieve sub-10cm accuracy with only IMU + monocular camera?",
      "How much can we compress the map representation without losing loop closure?",
      "What is the minimum compute requirement for real-time operation?",
    ],
    technologies: ["C++", "OpenCV", "Eigen", "PX4", "ARM Cortex"],
    skills: ["Computer Vision", "Linear Algebra", "Embedded Systems"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "Lightweight SLAM implementation in C++",
      "Comparison paper against ORB-SLAM3 on drone benchmarks",
      "Flight test dataset with ground truth",
    ],
  },
  {
    id: "anx-rp-004",
    code: "ANX-RP-004",
    title: "Neural Network Quantization for Edge AI",
    areas: ["AI", "Systems"],
    difficulty: "Intermediate",
    status: "Open",
    suitableFor: ["AI", "CS", "SE"],
    teamSize: "1-2",
    description: "Investigate and develop mixed-precision quantization techniques that maintain model accuracy while enabling inference on microcontroller-class hardware.",
    whyItMatters: "Deploying AI on IoT devices requires models small enough to fit in kilobytes of memory. Current quantization methods cause significant accuracy drops on complex tasks.",
    researchGap: "Post-training quantization methods don't generalize well across architectures. Task-aware quantization for multi-task models is underexplored.",
    researchQuestions: [
      "What is the minimum bit-width for BERT-family models on keyword spotting?",
      "Can we use NAS to find quantization-friendly architectures?",
      "How do quantization errors compound across multi-stage pipelines?",
    ],
    technologies: ["TensorFlow Lite", "ONNX", "Cortex-M", "RISC-V"],
    skills: ["Deep Learning", "Embedded Systems", "Optimization"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "Quantization toolkit for edge deployment",
      "Accuracy vs latency benchmark across hardware targets",
      "Paper on task-aware mixed-precision strategies",
    ],
  },
  {
    id: "anx-rp-005",
    code: "ANX-RP-005",
    title: "Adversarial Robustness of Code Generation Models",
    areas: ["AI Safety", "Cybersecurity"],
    difficulty: "Expert",
    status: "Open",
    suitableFor: ["CS", "AI", "SE"],
    teamSize: "2-3",
    description: "Study how LLM-based code assistants can be manipulated to generate vulnerable or malicious code, and develop defenses.",
    whyItMatters: "As developers increasingly rely on AI code assistants, adversarial prompts that generate insecure code pose a systemic risk to software supply chains.",
    researchGap: "No systematic study exists on adversarial attacks targeting code generation models in real-world development workflows.",
    researchQuestions: [
      "What prompt modifications cause code models to generate SQL injection vulnerabilities?",
      "Can we detect adversarial inputs to code models at inference time?",
      "How do fine-tuning defenses compare to input sanitization approaches?",
    ],
    technologies: ["Python", "HuggingFace", "Semgrep", "LLVM"],
    skills: ["NLP", "Software Security", "Formal Methods"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "Adversarial benchmark for code generation models",
      "Defense mechanism with provable robustness guarantees",
      "Security audit framework for AI-assisted codebases",
    ],
  },
  {
    id: "anx-rp-006",
    code: "ANX-RP-006",
    title: "Zero-Knowledge Proofs for IoT Device Authentication",
    areas: ["Cybersecurity", "IoT"],
    difficulty: "Advanced",
    status: "Open",
    suitableFor: ["CS", "SE", "DS"],
    teamSize: "2-4",
    description: "Implement lightweight zero-knowledge proof protocols for authenticating IoT devices without revealing device identity or credentials.",
    whyItMatters: "IoT devices in smart homes and industrial settings leak identity information during authentication, enabling tracking and targeted attacks.",
    researchGap: "Standard ZKP protocols are too heavy for resource-constrained IoT devices. Lightweight alternatives lack formal security proofs.",
    researchQuestions: [
      "What is the minimum proof size achievable on ARM Cortex-M4?",
      "Can we compose ZKPs for multi-factor IoT authentication?",
      "How do we handle key rotation without breaking the zero-knowledge property?",
    ],
    technologies: ["Rust", "Arkworks", "MQTT", "ESP32"],
    skills: ["Cryptography", "Embedded Systems", "Protocol Design"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "ZKP library optimized for microcontrollers",
      "Security proof in the UC framework",
      "Benchmark on real IoT hardware",
    ],
  },
  {
    id: "anx-rp-007",
    code: "ANX-RP-007",
    title: "Semantic Code Search in Large Monorepos",
    areas: ["AI", "Data Science"],
    difficulty: "Intermediate",
    status: "In Progress",
    suitableFor: ["CS", "SE", "AI"],
    teamSize: "2-3",
    description: "Build a semantic code search engine that understands intent rather than keywords, enabling developers to find relevant code across millions of lines.",
    whyItMatters: "Large codebases are impossible to navigate with keyword search. Developers waste hours finding existing implementations that could be reused.",
    researchGap: "Existing code search tools are either syntactic (AST-based) or use basic embedding similarity without understanding code semantics.",
    researchQuestions: [
      "How do we represent code semantics that capture both structure and behavior?",
      "What embedding architecture works best for cross-language code search?",
      "How do we handle code that evolves over time?",
    ],
    technologies: ["Python", "Tree-sitter", "FAISS", "LangChain"],
    skills: ["NLP", "Information Retrieval", "Compilers"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "Code search engine supporting 10+ languages",
      "Evaluation on CodeSearchNet benchmark",
      "VS Code extension prototype",
    ],
  },
  {
    id: "anx-rp-008",
    code: "ANX-RP-008",
    title: "Formal Verification of Smart Contract Compositions",
    areas: ["Cybersecurity", "Systems"],
    difficulty: "Expert",
    status: "Open",
    suitableFor: ["CS", "SE"],
    teamSize: "2-3",
    description: "Develop automated formal verification tools that can prove safety properties of composed smart contracts across DeFi protocols.",
    whyItMatters: "DeFi protocols compose like Lego blocks. A vulnerability in one contract can cascade across the entire ecosystem, as seen in billion-dollar hacks.",
    researchGap: "Current verification tools analyze individual contracts in isolation, missing cross-contract reentrancy and state inconsistency bugs.",
    researchQuestions: [
      "How do we model cross-contract state transitions formally?",
      "Can we scale model checking to compositions of 100+ contracts?",
      "What abstraction techniques make verification tractable for gas-optimized code?",
    ],
    technologies: ["Solidity", "Coq", "K Framework", "Foundry"],
    skills: ["Formal Methods", "Blockchain", "Theorem Proving"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "Verification tool for cross-contract properties",
      "Case studies on major DeFi protocols",
      "Automated bug discovery pipeline",
    ],
  },
  {
    id: "anxosQ7MKR",
    code: "ANX-OS-001",
    title: "Before the Breach",
    areas: ["Cybersecurity", "Systems", "AI"],
    difficulty: "Expert",
    status: "Open",
    suitableFor: ["CS", "SE", "Cybersecurity", "DS", "AI", "OS"],
    teamSize: "3-5",
    description: "Investigate whether subtle behavioral changes at the operating-system level can identify a measurable pre-attack state before an actual compromise occurs, rather than detecting the attack only after it has begun.",
    whyItMatters: "Standard defenses observe systems in two states: normal and compromised. By the time an attack is detected, an adversary may already hold credentials, persistence, or data. If a measurable Pre-Attack Behavioral State exists — detectable drift in system behavior before the boundary is crossed — defenses could engage before the real cost of compromise is paid. This reframes security from reaction toward early warning at the operating-system layer.",
    researchGap: "The key research challenge is defining and validating a measurable Pre-Attack Behavioral State rather than simply detecting an attack after it begins. Existing intrusion detection leans heavily on known signatures and established indicators of compromise; the transition region between normal operation and active compromise remains comparatively underexplored, and it is unclear which telemetry streams carry the earliest reliable signal.",
    researchQuestions: [
      "Which OS-level signals — syscalls, scheduling behavior, memory access patterns, I/O latency — drift earliest and most consistently during a pre-attack phase?",
      "Can a single behavioral index reliably separate benign system noise from measurable pre-attack drift?",
      "How much lead time is realistically available between the first detected pre-attack state and the first confirmed compromise event?",
      "Which learning architectures stay stable across heterogeneous workloads while remaining sensitive to pre-attack anomalies?",
    ],
    technologies: ["Rust", "eBPF", "Linux", "Python", "scikit-learn"],
    skills: ["Systems Programming", "Machine Learning", "Anomaly Detection", "Threat Modeling"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "Formal definition and experimental validation of a Pre-Attack Behavioral State",
      "Open-source OS telemetry dataset from staged pre-attack experiments",
      "Research paper analyzing detection lead time versus false-positive rates",
    ],
  },
  {
    id: "anxbwT4XPL",
    code: "ANX-BW-001",
    title: "Self-Defending OS",
    areas: ["Systems", "Cybersecurity", "AI"],
    difficulty: "Expert",
    status: "Open",
    suitableFor: ["OS", "Cybersecurity", "Systems", "AI"],
    teamSize: "3-5",
    description: "Investigate an operating-system architecture that continuously learns system behavior, constructs a runtime security model, detects behavioral deviation, and adaptively changes defensive policies without human intervention.",
    whyItMatters: "Security today is a stack of isolated external tools layered on top of an operating system. An OS that treats security as an intrinsic capability could respond at kernel speed to behavior it has learned to reason about. Behavior-Adaptive OS Security asks whether a system can model its own process, memory, network, filesystem, privilege, and syscall behavior, and turn that model into adaptive defense — not a collection of external products.",
    researchGap: "The research challenge is whether an OS can build and maintain a trustworthy runtime model of its own behavior across multiple domains and then act on deviations quickly enough to matter. Static policy engines and signature-based tools are mature, but a closed loop where learned behavioral risk directly drives changing defensive policy remains a largely open systems and AI problem.",
    researchQuestions: [
      "How do we construct a behavioral security model of a running OS that is expressive yet fast enough for in-kernel evaluation?",
      "What is the minimum telemetry set needed to detect meaningful behavioral deviation without flooding the model with noise?",
      "How can defensive policies adapt at runtime without hurting legitimate workloads or enabling self-inflicted denial of service?",
      "How do we validate that a learned risk state corresponds to real adversary behavior rather than a spurious correlation?",
    ],
    technologies: ["Rust", "eBPF", "seccomp", "XGBoost", "Linux Kernel"],
    skills: ["Operating Systems", "Systems Programming", "Machine Learning", "Threat Modeling"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "Design and prototype of a behavior-adaptive OS security layer",
      "Open-source evaluation harness for adaptive defense under attack scenarios",
      "Research paper on Behavior-Adaptive OS Security",
    ],
  },
  {
    id: "anxroN8CVD",
    code: "ANX-RO-001",
    title: "Robot Self-Trust",
    areas: ["Robotics", "Cybersecurity", "AI"],
    difficulty: "Expert",
    status: "Open",
    suitableFor: ["Robotics", "Computer Vision", "AI", "Cybersecurity", "Embedded"],
    teamSize: "2-4",
    description: "Investigate whether an autonomous robot can determine when its own perception of reality has become unreliable or potentially compromised by reasoning about contradictions across its sensors and expected physical behavior.",
    whyItMatters: "An autonomous robot that cannot tell when it is being deceived is a hazard. Perception is only trustworthy if the machine can reason about contradictions in its own inputs — a camera showing a clear path while LiDAR reports an obstacle, or an IMU recording motion the controller never commanded. A Robotic Self-Trust Layer gives the robot a way to doubt itself and act accordingly.",
    researchGap: "Sensor fusion for robustness has a long history, but explicitly reasoning about contradictions as a clue that perception is compromised — producing a Perception Reliability Score that feeds behavior — remains underexplored, particularly as a defense against spoofed or corrupted sensor streams.",
    researchQuestions: [
      "What formal notion of self-trust captures reliability across conflicting sensor streams?",
      "Can contradiction patterns between camera, LiDAR, IMU, and expected physical trajectories reliably detect corrupted or spoofed perception?",
      "How should a robot behave as its Perception Reliability Score degrades — halt, degrade gracefully, or fall back to a safe mode?",
      "How fast must cross-sensor trust analysis run to remain useful for real-time control?",
    ],
    technologies: ["ROS2", "OpenCV", "LiDAR", "IMU", "Bayesian Networks"],
    skills: ["Sensor Fusion", "Computer Vision", "Probabilistic Reasoning", "Embedded Systems"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "Cross-sensor trust analysis framework for autonomous robots",
      "Evaluation on simulated and real-world perception-contradiction scenarios",
      "Research paper defining and assessing the Robotic Self-Trust Layer",
    ],
  },
  {
    id: "anxbwR6ZQM",
    code: "ANX-BW-002",
    title: "Black Wall for Robots",
    areas: ["Robotics", "Cybersecurity", "Systems"],
    difficulty: "Expert",
    status: "Open",
    suitableFor: ["OS", "Robotics", "Cybersecurity", "Embedded", "Systems"],
    teamSize: "3-5",
    description: "Investigate a cyber-physical security architecture where a secure runtime — Black Wall — prevents compromised software from producing physically dangerous robot behavior, even when an attacker technically controls that software.",
    whyItMatters: "For a robot, software compromise is dangerous precisely because of the physical consequences it can command. In the Black Wall model a compromised process may execute — but a secure runtime sitting between the operating system and robotics middleware enforces hard physical-safety constraints. The system protects not only software integrity but the physical world the software can touch.",
    researchGap: "Conventional security largely stops at software integrity and data confidentiality. Cyber-Physical Containment — enforcing bounds on the physical effects of software, so that no compromise can translate into unsafe motion or command — sits at a frontier where OS security, robotics middleware, and safety engineering must be co-designed.",
    researchQuestions: [
      "What are the minimal physical-safety invariants a secure runtime must enforce at the middleware boundary?",
      "How can a secure runtime preserve real-time robotics guarantees while enforcing safety policies?",
      "How can we reason formally that a compromised application cannot command an unsafe physical action?",
      "What is the enforcement overhead on typical robotics middleware under real workloads?",
    ],
    technologies: ["Rust", "ROS2", "seccomp", "eBPF", "Linux"],
    skills: ["Robotics Middleware", "Safety Engineering", "Formal Methods", "Rust"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "Black Wall secure-runtime architecture for robotics middleware",
      "Safety invariant library and enforcement prototype",
      "Research paper on Cyber-Physical Containment",
    ],
  },
  {
    id: "anxroK3FWT",
    code: "ANX-RO-002",
    title: "Cyber-Physical Threat Horizon",
    areas: ["Robotics", "Cybersecurity", "Systems"],
    difficulty: "Expert",
    status: "Open",
    suitableFor: ["Robotics", "Cybersecurity", "AI", "Control Systems", "Embedded"],
    teamSize: "2-4",
    description: "Investigate whether cyber-physical systems can predict a dangerous physical consequence several seconds before it occurs, by tracking the earliest reliable cyber signals along the attack timeline.",
    whyItMatters: "The interval between the first anomalous signal and physical damage is the only window in which a system can protect itself and the people around it. If a robot can recognize a threat at T−10s instead of reacting at T, mitigation becomes possible rather than reactionary. The Cyber-Physical Threat Horizon is the attempt to measure, predict, and use that window.",
    researchGap: "How much measurable warning time exists between the earliest reliable cyber signal and the eventual physical consequence — and whether that window can be formalized as a usable security metric — remains a largely open empirical and modeling question that crosses cybersecurity, robotics, and control theory.",
    researchQuestions: [
      "How much measurable warning time exists between the earliest reliable cyber signal and the eventual physical consequence?",
      "Which signals — network anomalies, sensor timing drift, unexpected command sequences, navigation inconsistency — remain informative at each point in the threat timeline?",
      "Can a single Threat Horizon score be derived, in real time, from the earliest available signals?",
      "How does the effective horizon vary across vehicles, drones, and industrial robotic systems?",
    ],
    technologies: ["ROS2", "Kalman Filtering", "Time-Series Analytics", "eBPF"],
    skills: ["Control Systems", "Signal Processing", "Anomaly Detection", "Cybersecurity"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "Definition and experimental evaluation of the Cyber-Physical Threat Horizon metric",
      "Warning-time benchmark across simulated cyber-physical attack scenarios",
      "Research paper analyzing the measured warning window before physical consequences",
    ],
  },
  {
    id: "anxcsV9LXP",
    code: "ANX-CS-001",
    title: "Self-Learning Security Baseline",
    areas: ["Cybersecurity", "AI", "Robotics"],
    difficulty: "Expert",
    status: "Open",
    suitableFor: ["AI", "Cybersecurity", "Robotics", "DS", "Embedded"],
    teamSize: "2-4",
    description: "Investigate whether an autonomous system can learn its own operational security baseline from observed normal behavior — and keep updating it — instead of relying on manually written security rules.",
    whyItMatters: "Manually authored security rules do not scale to the diversity of modern autonomous systems, and they go stale the moment a deployment changes. A system that learns its own baseline of normal behavior could detect deviations it was never explicitly told to watch for — if it can do so without being fooled into treating attacker behavior as normal.",
    researchGap: "The critical challenge is learning and adapting without accidentally absorbing attacker behavior into the baseline. Poisoning resistance, continual learning, and autonomous anomaly reasoning around a self-learned model remain frontier problems — and the point where learning and security quality are hardest to reconcile.",
    researchQuestions: [
      "How can a system distinguish its learned normative behavior from behavior that merely occurs frequently?",
      "What continual-learning strategies let a baseline evolve while remaining resistant to poisoning?",
      "Can autonomous anomaly reasoning estimate security risk from deviations without an analyst in the loop?",
      "How do self-learned baselines compare with curated rule-based baselines under adversarial conditions?",
    ],
    technologies: ["Python", "PyTorch", "scikit-learn", "Kafka", "Prometheus"],
    skills: ["Machine Learning", "Anomaly Detection", "Time-Series Analysis", "Cybersecurity"],
    supervisor: "Muhammad Qasim",
    deliverables: [
      "Self-learning baseline framework for autonomous systems",
      "Open-source evaluation against poisoning and concept-drift scenarios",
      "Research paper on poisoning-resistant autonomous security baselines",
    ],
  },
];

export const researchPapers: ResearchPaper[] = [
  {
    id: "paper-001",
    slug: "lightweight-anomaly-detection-av",
    title: "Lightweight Anomaly Detection for Autonomous Vehicle Sensor Networks",
    authors: ["Muhammad Qasim", "Student Team A"],
    date: "2026-03-15",
    category: "Published",
    area: "Cybersecurity",
    abstract: "We present a novel approach to real-time anomaly detection in autonomous vehicle sensor networks using streaming random projections. Our method achieves 97.3% detection rate with under 8ms latency on edge hardware.",
    problemId: "anx-rp-001",
  },
  {
    id: "paper-002",
    slug: "federated-learning-medical-imaging",
    title: "Privacy-Preserving Federated Learning for Medical Imaging",
    authors: ["Student Team B", "Muhammad Qasim"],
    date: "2026-06-20",
    category: "Preprint",
    area: "AI",
    abstract: "We propose DP-FLMed, a federated learning framework with formal differential privacy guarantees for chest X-ray classification across 12 simulated hospital nodes.",
    problemId: "anx-rp-002",
  },
  {
    id: "paper-003",
    slug: "quantization-edge-bert",
    title: "Mixed-Precision Quantization of BERT for Keyword Spotting on Microcontrollers",
    authors: ["Student Team C"],
    date: "2026-01-10",
    category: "Published",
    area: "AI",
    abstract: "We demonstrate that a 4.2-bit average precision BERT model can achieve 94.1% accuracy on keyword spotting while fitting within 256KB RAM on Cortex-M4.",
    problemId: "anx-rp-004",
  },
  {
    id: "paper-004",
    slug: "zkp-iot-auth",
    title: "Efficient Zero-Knowledge Proofs for IoT Device Authentication",
    authors: ["Student Team D", "Muhammad Qasim"],
    date: "2026-08-01",
    category: "Ongoing",
    area: "Cybersecurity",
    abstract: "Work in progress on lightweight Schnorr-based ZKP protocols optimized for ESP32-class devices with formal security analysis in the UC framework.",
    problemId: "anx-rp-006",
  },
  {
    id: "paper-005",
    slug: "adversarial-code-generation",
    title: "Adversarial Attacks on LLM Code Assistants: A Systematic Study",
    authors: ["Student Team E"],
    date: "2026-09-01",
    category: "Technical Report",
    area: "AI Safety",
    abstract: "We present a taxonomy of adversarial attacks against code generation models and evaluate 5 defense mechanisms across 3 major LLM-based code assistants.",
    problemId: "anx-rp-005",
  },
];

export const labProjects: LabProject[] = [
  {
    id: "proj-001",
    slug: "anx-sentinel",
    title: "ANX Sentinel",
    description: "Real-time anomaly detection library for autonomous vehicle CAN bus networks. Written in Rust for zero-cost abstractions and deterministic performance.",
    area: "Cybersecurity",
    status: "Active",
    problemId: "anx-rp-001",
    researchers: ["Muhammad Qasim", "Student Team A"],
  },
  {
    id: "proj-002",
    slug: "dp-flmed",
    title: "DP-FLMed",
    description: "Federated learning framework with differential privacy guarantees for medical imaging. Built on Flower with formal privacy accounting.",
    area: "AI",
    status: "Prototype",
    problemId: "anx-rp-002",
    researchers: ["Student Team B", "Muhammad Qasim"],
  },
  {
    id: "proj-003",
    slug: "edgelang",
    title: "EdgeLang",
    description: "A domain-specific language for programming quantized neural networks on microcontrollers. Compiles to TFLite and ONNX.",
    area: "AI",
    status: "Prototype",
    problemId: "anx-rp-004",
    researchers: ["Student Team C"],
  },
];

export const researchers: Researcher[] = [
  {
    id: "person-001",
    username: "muhammadqasim",
    name: "Muhammad Qasim",
    role: "Research Lead",
    areas: ["AI", "Systems", "Cybersecurity"],
    bio: "Founder and Research Lead at Anoneurx Lab. Focused on building technology that matters — from autonomous systems to privacy-preserving AI.",
    contributions: 42,
  },
  {
    id: "person-002",
    username: "student-researcher-a",
    name: "Student Researcher A",
    role: "Student Researcher",
    areas: ["Cybersecurity", "Robotics"],
    bio: "CS undergraduate working on real-time security systems for autonomous vehicles.",
    contributions: 8,
  },
  {
    id: "person-003",
    username: "student-researcher-b",
    name: "Student Researcher B",
    role: "Student Researcher",
    areas: ["AI", "Data Science"],
    bio: "AI researcher specializing in federated learning and privacy-preserving machine learning.",
    contributions: 5,
  },
  {
    id: "person-004",
    username: "student-researcher-c",
    name: "Student Researcher C",
    role: "Contributor",
    areas: ["AI", "Systems"],
    bio: "Embedded systems enthusiast exploring neural network deployment on microcontrollers.",
    contributions: 3,
  },
];

export const faqItems = [
  {
    question: "Who can join Anoneurx Lab?",
    answer: "Any university student with relevant skills in CS, AI, cybersecurity, robotics, or related fields. We welcome undergrads, Masters, and PhD students. No prior research experience is required for beginner-level problems.",
  },
  {
    question: "How do I choose a problem?",
    answer: "Browse the Problem Board and filter by your research area, difficulty level, and available time. Each problem card shows the required skills and suitable disciplines. If you're unsure, start with a Beginner or Intermediate problem.",
  },
  {
    question: "Do I need to be at a specific university?",
    answer: "No. Anoneurx Lab is open to students from any university worldwide. We operate remotely and asynchronously, with periodic sync meetings.",
  },
  {
    question: "How much time do I need to commit?",
    answer: "This depends on the problem difficulty. Beginner problems typically require 5-10 hours per week for 4-6 weeks. Advanced problems may require 15-20 hours per week for 3-6 months.",
  },
  {
    question: "Will I get credit for my research?",
    answer: "Yes. All contributions are tracked, and you'll receive a certificate of research participation. Published papers list all contributors as co-authors. We also provide recommendation letters for outstanding contributors.",
  },
  {
    question: "Can research become a product?",
    answer: "Absolutely. Anoneurx Lab follows a pipeline: Problem → Research → Prototype → Project → Product. Successful research can evolve into Anoneurx products or open-source tools.",
  },
  {
    question: "What tools and infrastructure does the lab provide?",
    answer: "Access to cloud compute (GPU servers), research datasets, mentorship from research leads, paper writing support, and a collaborative GitHub workspace.",
  },
  {
    question: "How is research evaluated?",
    answer: "Research is evaluated on novelty, rigor, reproducibility, and practical impact. We follow peer review practices internally, and aim to publish in recognized venues.",
  },
];

export const guideSections = [
  {
    title: "How to Select a Problem",
    content: "Start by identifying your strengths and interests. Browse the Problem Board, filter by area and difficulty, and read the problem statements carefully. Choose a problem where you can contribute meaningfully while learning something new.",
  },
  {
    title: "Literature Review",
    content: "Before diving into solutions, read existing papers and approaches. Use Google Scholar, arXiv, and Semantic Scholar. Aim to read 15-20 relevant papers. Create a literature matrix comparing methods, datasets, and results.",
  },
  {
    title: "Finding Research Gaps",
    content: "Every problem in the Lab has a documented research gap. Your job is to validate and refine it. Look for assumptions in existing work that don't hold, datasets that are outdated, or evaluation metrics that miss important aspects.",
  },
  {
    title: "Designing Experiments",
    content: "Follow the scientific method. Formulate hypotheses, design controlled experiments, choose appropriate baselines, and define clear evaluation metrics. Document everything in a research log.",
  },
  {
    title: "Writing a Paper",
    content: "Structure: Abstract → Introduction → Related Work → Method → Experiments → Conclusion. Write the abstract last. Use clear, concise language. Every claim must be backed by evidence.",
  },
  {
    title: "Git/GitHub Workflow",
    content: "All research code lives on GitHub. Use feature branches, write descriptive commit messages, and open PRs for review. Tag releases with paper versions for reproducibility.",
  },
  {
    title: "Research Ethics",
    content: "Follow ethical guidelines for human subjects research, data privacy, and responsible disclosure. If your research involves datasets with personal information, ensure IRB compliance.",
  },
  {
    title: "Publishing",
    content: "Aim for workshops and conferences in your field. We support submission to arXiv for preprints. The Lab can provide feedback on manuscripts and help with submission logistics.",
  },
];
