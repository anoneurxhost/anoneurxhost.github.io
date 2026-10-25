import type { Problem } from "./data";

/**
 * The Black Wall OS open research collection.
 *
 * These entries are research challenges, not shipped capabilities: no problem
 * is marked complete, no result is claimed and no date is invented. Identifiers
 * are descriptive slugs and double as the canonical URL under
 * /lab/problems/<id>. Numeric research codes are intentionally not used.
 *
 * Content lives here rather than in presentation components so the collection
 * page and the shared problem detail page render the same record.
 */
export const blackWallProblems: Problem[] = [
  {
    id: "secure-boot-integrity",
    slug: "secure-boot-integrity",
    collection: "black-wall",
    title: "Establishing a Verifiable Boot Chain for Black Wall",
    category: "Operating System Security",
    areas: ["Systems", "Cybersecurity"],
    difficulty: "Advanced",
    status: "Open Research Problem",
    description:
      "Establish a verifiable chain of trust from UEFI firmware through the bootloader to the running kernel, including signature verification, boot measurements and recovery from verification failures.",
    problemStatement:
      "Investigate how Black Wall can establish a verifiable chain of trust from UEFI firmware through the bootloader to the running kernel. Examine kernel authenticity, signature verification, boot measurements, handling of unauthorized images, and recovery from verification failures.",
    whyItMatters:
      "Boot is the earliest point at which persistent compromise can be established, and every later security control inherits whatever the boot path loaded. Without a verifiable chain from firmware to kernel, an unauthorised image can execute beneath the operating system's defences.",
    researchQuestions: [
      "Which components must be verified or measured, and in what order, for the chain from firmware to kernel to be continuous?",
      "How should Black Wall verify bootloader and kernel signatures, and what should happen when an image fails verification?",
      "Which TPM-backed measurements are available on supported platforms, and what do they actually attest?",
      "How can boot-integrity checks be reproduced across firmware, bootloader and kernel revisions?",
    ],
    researchObjectives: [
      "Define the trusted boot sequence.",
      "Evaluate UEFI Secure Boot and cryptographic signature verification.",
      "Investigate TPM-based measurements where supported.",
      "Design failure handling for unauthorized or corrupted boot components.",
      "Establish reproducible boot-integrity tests.",
    ],
    technicalChallenges: [
      "UEFI behaviour and available security features differ across firmware implementations and virtual machines.",
      "Key provisioning, rotation and revocation must remain usable without weakening verification.",
      "Distinguishing an authorised update from an unauthorised image requires a policy that also survives recovery workflows.",
      "A verification failure needs a recovery path that does not silently disable the chain of trust.",
    ],
    expectedOutcome:
      "A documented boot-integrity architecture with a threat model, verification procedures, and measurable security properties.",
    tags: ["secure boot", "uefi", "tpm", "measured boot", "chain of trust", "boot integrity"],
    relatedResearch: [
      "reliable-boot-architecture",
      "hardware-trust-boundaries",
      "system-integrity-monitoring",
    ],
  },
  {
    id: "reliable-boot-architecture",
    slug: "reliable-boot-architecture",
    collection: "black-wall",
    title: "A Reliable Boot Architecture for Virtualized and Physical Systems",
    category: "Operating System Engineering",
    areas: ["Systems", "IoT"],
    difficulty: "Advanced",
    status: "Under Investigation",
    statusNote:
      "Current evidence: a QEMU test reaches the TianoCore/OVMF firmware screen but does not visibly progress to Black Wall. The cause remains unresolved until the actual code and boot logs establish it; this record does not claim the kernel is broken.",
    description:
      "Investigate why Black Wall does not yet boot consistently across QEMU, UEFI-based physical machines and future hardware, and build stage-level diagnostics that separate firmware, bootloader, kernel and display failures.",
    problemStatement:
      "Investigate how Black Wall can boot reliably across QEMU, UEFI-based physical computers, and future hardware platforms. Study firmware compatibility, bootloader behavior, kernel loading, early diagnostics, and hardware initialization.",
    whyItMatters:
      "A security-oriented operating system has to boot reproducibly before any of its guarantees can be evaluated. When firmware, bootloader, kernel and display failures all present as a blank screen, diagnosis becomes guesswork and regressions go unnoticed.",
    researchQuestions: [
      "At which stage of the boot sequence does execution stop on each target platform?",
      "What diagnostics and serial logging can be enabled before the kernel and display stack are available?",
      "How should the ISO and EFI bootloader be validated independently of the kernel?",
      "Which virtual-machine and firmware combinations are needed to reproduce failures reliably?",
    ],
    researchObjectives: [
      "Identify the exact stage where boot failures occur.",
      "Implement early-boot diagnostics and serial logging.",
      "Validate the ISO and EFI bootloader.",
      "Develop a repeatable virtual-machine test matrix.",
      "Distinguish firmware, bootloader, kernel, and display failures.",
    ],
    technicalChallenges: [
      "There may be no visible console until firmware hands control to the bootloader or kernel.",
      "OVMF/TianoCore versions and machine configurations behave differently across QEMU setups.",
      "Serial output must be captured without assuming the operating system is running.",
      "A hang and a slow initialisation path can look identical without stage timestamps.",
    ],
    expectedOutcome:
      "A reproducible boot-validation framework, compatibility matrix, and diagnostic system.",
    tags: ["boot", "uefi", "qemu", "ovmf", "tianocore", "diagnostics"],
    relatedResearch: ["secure-boot-integrity", "fail-safe-os-recovery"],
  },
  {
    id: "kernel-memory-isolation",
    slug: "kernel-memory-isolation",
    collection: "black-wall",
    title: "Enforcing Memory Isolation in a Security-Oriented Operating System",
    category: "Kernel Security",
    areas: ["Systems", "Cybersecurity"],
    difficulty: "Expert",
    status: "Open Research Problem",
    description:
      "Restrict unauthorised memory access and contain kernel defects through stronger kernel/user boundaries, permission enforcement and component isolation.",
    problemStatement:
      "Investigate how Black Wall can restrict unauthorized memory access and reduce the consequences of kernel defects through stronger memory boundaries and component isolation.",
    whyItMatters:
      "A single kernel memory defect can reach any process, device or credential on the machine. Stronger boundaries reduce the distance a flaw can travel, making component compromise survivable rather than system-wide.",
    researchQuestions: [
      "Where should the kernel/user boundary sit, and which components genuinely need privileges beyond it?",
      "Which page-table permissions and write-protection mechanisms can be enforced consistently on supported hardware?",
      "How effective are guard pages, non-executable memory and capability-based access at containing memory errors?",
      "What overhead do stronger isolation boundaries impose on representative workloads?",
    ],
    researchObjectives: [
      "Define kernel and user-space memory boundaries.",
      "Evaluate page-table permissions and write protection.",
      "Investigate guard pages and non-executable memory.",
      "Explore capability-based memory access.",
      "Measure isolation effectiveness and performance overhead.",
    ],
    technicalChallenges: [
      "Memory-management features vary across physical platforms and virtual machines.",
      "Legitimate shared memory and device mappings complicate strict permission models.",
      "The page tables themselves must remain protected from the components they isolate.",
      "Capability checks add cost to hot kernel paths and fault handling.",
    ],
    expectedOutcome:
      "A memory-isolation design with documented security invariants and benchmarks.",
    tags: ["memory isolation", "kernel", "page tables", "capabilities", "w^x", "privilege separation"],
    relatedResearch: ["workload-isolation", "self-defending-operating-system"],
  },
  {
    id: "self-defending-operating-system",
    slug: "self-defending-operating-system",
    collection: "black-wall",
    title: "Designing a Self-Defending Operating System Architecture",
    category: "Defensive Security",
    areas: ["Cybersecurity", "AI", "Systems"],
    difficulty: "Expert",
    status: "Open Research Problem",
    description:
      "Design an operating-system architecture that continuously evaluates security conditions, detects suspicious system changes and applies controlled defensive responses.",
    problemStatement:
      "Investigate an operating-system architecture that continuously evaluates security conditions, detects suspicious system changes, and applies controlled defensive responses.",
    whyItMatters:
      "Most defensive tooling observes an operating system from outside it, with limited visibility below the interface it consumes. A system that reasons about its own state could detect and contain changes faster, provided its responses remain bounded and auditable.",
    researchQuestions: [
      "Which security events must the operating system collect to reason about its own state without overwhelming the system?",
      "What counts as a trusted baseline for critical components, and when may that baseline legitimately change?",
      "How should defensive policies be selected, applied and rolled back at runtime?",
      "What detection latency, false-positive rate and resource cost are acceptable for an automatic response?",
    ],
    researchObjectives: [
      "Define a security-event collection model.",
      "Establish trusted baselines for critical system components.",
      "Develop policy-based detection and response.",
      "Investigate tamper-evident security logs.",
      "Measure detection latency, false positives, and resource consumption.",
    ],
    technicalChallenges: [
      "Collection at kernel speed competes with the workloads the system is trying to protect.",
      "Baselines drift as software and configuration change, creating both false positives and blind spots.",
      "An automatic defensive response can itself become a denial-of-service vector if it is wrong.",
      "Tamper evidence depends on integrity guarantees that are themselves under investigation.",
    ],
    expectedOutcome:
      "A prototype defensive framework with an explicit threat model and reproducible evaluation results.",
    tags: ["self-defending os", "security events", "trusted baseline", "policy response", "tamper-evident logs"],
    relatedResearch: [
      "system-integrity-monitoring",
      "fail-safe-os-recovery",
      "anxbwt4xpl",
      "anxosq7mkr",
    ],
  },
  {
    id: "hardware-trust-boundaries",
    slug: "hardware-trust-boundaries",
    collection: "black-wall",
    title: "Establishing Trust Boundaries Between Black Wall and Hardware",
    category: "Hardware and System Security",
    areas: ["Systems", "Cybersecurity", "IoT"],
    difficulty: "Expert",
    status: "Open Research Problem",
    description:
      "Evaluate hardware trust, isolate peripherals and reduce the risks introduced by compromised firmware or unauthorised device access.",
    problemStatement:
      "Investigate how Black Wall can evaluate hardware trust, isolate peripherals, and reduce risks associated with compromised firmware or unauthorized device access.",
    whyItMatters:
      "The operating system cannot secure what the hardware silently controls. Firmware and peripherals sit below the kernel's usual visibility, so their trust assumptions have to be made explicit before device access can be constrained.",
    researchQuestions: [
      "Which hardware components must be trusted, and what evidence supports that trust on each supported platform?",
      "What TPM-backed measurements are available, and which trust decisions can reliably depend on them?",
      "Which devices can be isolated with an IOMMU, and what are the gaps when it is unavailable?",
      "How should device and driver privileges be restricted without making supported hardware unusable?",
    ],
    researchObjectives: [
      "Define hardware trust assumptions.",
      "Investigate TPM-backed measurements where available.",
      "Evaluate IOMMU-based isolation for supported devices.",
      "Restrict device and driver privileges.",
      "Document hardware-specific limitations.",
    ],
    technicalChallenges: [
      "IOMMU availability, granularity and behaviour differ across platforms and virtual machines.",
      "Device firmware is often opaque and may not expose measurements the OS can verify.",
      "Drivers need enough privilege to operate hardware yet should not inherit unrestricted memory access.",
      "Trust assumptions that hold in a VM may not hold on physical hardware.",
    ],
    expectedOutcome:
      "A hardware trust model and a prototype device-security policy framework.",
    tags: ["hardware trust", "tpm", "iommu", "device isolation", "firmware", "drivers"],
    relatedResearch: [
      "secure-boot-integrity",
      "kernel-memory-isolation",
      "workload-isolation",
    ],
  },
  {
    id: "robotics-security-architecture",
    slug: "robotics-security-architecture",
    collection: "black-wall",
    title: "A Security Architecture for Black Wall in Autonomous Robotic Systems",
    category: "Robotics and Embedded Systems Security",
    areas: ["Robotics", "Cybersecurity", "Systems"],
    difficulty: "Expert",
    status: "Open Research Problem",
    description:
      "Isolate robotic workloads, constrain actuator access, authenticate component communication and keep behaviour predictable when software or the network fails.",
    problemStatement:
      "Investigate how Black Wall can isolate robotic workloads, restrict actuator access, authenticate inter-component communication, and maintain predictable behavior during software or network failures.",
    whyItMatters:
      "In a robot, a software fault or compromise can become a physical hazard. Separating perception, planning and actuation, and constraining what each component may command, limits how far a failure can propagate into motion.",
    researchQuestions: [
      "Which components can be separated, and what interfaces must remain between perception, planning and actuation?",
      "How should access to motors and other actuators be mediated and constrained?",
      "What authentication is practical for inter-component communication on embedded hardware?",
      "How do isolation and real-time scheduling interact under normal and degraded operation?",
    ],
    researchObjectives: [
      "Separate perception, planning, and actuation components.",
      "Define access policies for motors and other actuators.",
      "Evaluate authenticated component communication.",
      "Investigate resource isolation and real-time scheduling.",
      "Develop simulated tests for unauthorized commands and component failures.",
    ],
    technicalChallenges: [
      "Real-time control paths leave little budget for mediation and authentication.",
      "Robotics middleware assumes permissive local communication that isolation can disrupt.",
      "Actuator constraints must be enforced without blocking legitimate recovery behaviour.",
      "Simulation has to reproduce timing and failure modes closely enough to be informative.",
    ],
    expectedOutcome:
      "A prototype security architecture for robotic workloads, evaluated in simulation before physical deployment.",
    tags: ["robotics", "actuator control", "component isolation", "real-time", "embedded security", "simulation"],
    relatedResearch: [
      "workload-isolation",
      "distributed-system-communication",
      "anxbwr6zqm",
      "anxron8cvd",
    ],
  },
  {
    id: "distributed-system-communication",
    slug: "distributed-system-communication",
    collection: "black-wall",
    title: "Authenticated and Resilient Communication for Distributed Black Wall Systems",
    category: "Network and Distributed Systems Security",
    areas: ["Cybersecurity", "Systems", "Robotics"],
    difficulty: "Advanced",
    status: "Open Research Problem",
    description:
      "Secure communication between distributed Black Wall machines and robotic nodes while limiting the impact of compromised nodes, interrupted connectivity and unauthorised commands.",
    problemStatement:
      "Investigate how distributed Black Wall machines and robotic nodes can communicate securely while limiting the impact of compromised nodes, interrupted connectivity, and unauthorized commands.",
    whyItMatters:
      "A distributed system is only as trustworthy as its weakest node. Without explicit identities, authorisation and failure handling, one compromised or disconnected node can issue commands that the rest of the system accepts.",
    researchQuestions: [
      "How are node identities established, and what trust relationships exist between them?",
      "Which operations require mutual authentication, and how should credentials be distributed?",
      "How can authorisation for remote operations survive a compromised peer?",
      "What should happen during replay attempts, credential rotation, revocation and disconnected operation?",
    ],
    researchObjectives: [
      "Define node identities and trust relationships.",
      "Evaluate mutually authenticated communication.",
      "Implement authorization policies for remote operations.",
      "Investigate replay protection, credential rotation, and revocation.",
      "Test communication failures and disconnected operation.",
    ],
    technicalChallenges: [
      "Identity provisioning has to work before a trustworthy network exists.",
      "Revocation and rotation must reach nodes that may already be offline or compromised.",
      "Disconnected operation conflicts with strict central authorisation.",
      "Failure handling must not turn a transient partition into a persistent security downgrade.",
    ],
    expectedOutcome:
      "A prototype authenticated communication framework and protocol-security evaluation.",
    tags: ["distributed systems", "mutual authentication", "authorisation", "replay protection", "credential rotation", "partition tolerance"],
    relatedResearch: [
      "robotics-security-architecture",
      "secure-os-updates",
      "fail-safe-os-recovery",
    ],
  },
  {
    id: "secure-os-updates",
    slug: "secure-os-updates",
    collection: "black-wall",
    title: "Verifiable Updates and Rollback Protection for Black Wall",
    category: "Software Supply Chain Security",
    areas: ["Systems", "Cybersecurity"],
    difficulty: "Advanced",
    status: "Open Research Problem",
    description:
      "Design an update architecture that verifies authenticity, resists unauthorised modification, recovers safely from interrupted installs and restricts unauthorised downgrades.",
    problemStatement:
      "Investigate an update architecture that verifies authenticity, prevents unauthorized modification, supports safe recovery from interrupted updates, and restricts unauthorized downgrades.",
    whyItMatters:
      "The update path is a direct route to every deployed system, and an interrupted or forged update can leave a device unbootable or permanently behind on fixes. Integrity, recovery and rollback policy have to be designed together.",
    researchQuestions: [
      "What must a signed update manifest cover so that the payload cannot be substituted or mixed across versions?",
      "How should atomic updates and A/B partitions behave when power is lost mid-installation?",
      "Which compatibility checks are needed before an update is allowed to replace a working system?",
      "How can legitimate recovery downgrades be distinguished from unauthorised rollback attacks?",
    ],
    researchObjectives: [
      "Design signed update manifests.",
      "Investigate atomic updates and A/B system partitions.",
      "Validate update compatibility and integrity.",
      "Test interrupted installation and recovery.",
      "Develop a rollback policy that preserves legitimate recovery options.",
    ],
    technicalChallenges: [
      "Power loss can occur at any point in the write, verification or boot-selection sequence.",
      "A/B partitioning consumes storage and requires a reliable selection mechanism.",
      "Rollback protection must still permit recovery from a genuinely bad release.",
      "Update metadata and the update client are themselves part of the trusted computing base.",
    ],
    expectedOutcome:
      "A secure-update prototype with integrity checks and reproducible recovery tests.",
    tags: ["secure updates", "signed manifests", "a/b partitions", "rollback protection", "supply chain", "recovery"],
    relatedResearch: ["secure-boot-integrity", "system-integrity-monitoring"],
  },
  {
    id: "privacy-preserving-telemetry",
    slug: "privacy-preserving-telemetry",
    collection: "black-wall",
    title: "Security Monitoring Without Unnecessary Data Collection",
    category: "Operating System Privacy",
    areas: ["Cybersecurity", "Data Science", "Systems"],
    difficulty: "Advanced",
    status: "Open Research Problem",
    description:
      "Provide useful security monitoring while minimising the collection, exposure and retention of sensitive system information.",
    problemStatement:
      "Investigate how Black Wall can provide useful security monitoring while minimizing the collection, exposure, and retention of sensitive information.",
    whyItMatters:
      "Security telemetry frequently captures far more than the event it is meant to detect, turning a monitoring system into a store of sensitive data. Minimising collection and retention reduces the value of that store to an attacker without giving up detection.",
    researchQuestions: [
      "Which fields are genuinely required to detect the target security events, and which can be discarded at source?",
      "How should access controls and retention limits be enforced over security events?",
      "What can be processed locally instead of being exported for central analysis?",
      "How much detection quality is lost when data is minimised, and how should that trade-off be measured?",
    ],
    researchObjectives: [
      "Define a minimal security-event schema.",
      "Establish access controls and retention policies.",
      "Evaluate local processing and data minimization.",
      "Protect log integrity.",
      "Measure the trade-off between privacy and detection quality.",
    ],
    technicalChallenges: [
      "The fields that aid detection are often the same fields that reveal sensitive behaviour.",
      "Local processing needs enough context without centralising raw events.",
      "Retention limits must be enforced even when consumers request more data.",
      "Log integrity mechanisms can preserve content that minimisation was meant to remove.",
    ],
    expectedOutcome:
      "A privacy-conscious telemetry design with documented data flows and evaluation criteria.",
    tags: ["privacy", "telemetry", "data minimisation", "retention", "security monitoring", "log integrity"],
    relatedResearch: ["system-integrity-monitoring", "self-defending-operating-system"],
  },
  {
    id: "workload-isolation",
    slug: "workload-isolation",
    collection: "black-wall",
    title: "Containing Untrusted Workloads Through OS-Level Isolation",
    category: "System Architecture and Security",
    areas: ["Systems", "Cybersecurity"],
    difficulty: "Advanced",
    status: "Open Research Problem",
    description:
      "Isolate applications and services with different trust levels, restrict access to sensitive resources and limit the consequences of a compromised workload.",
    problemStatement:
      "Investigate how Black Wall can isolate applications and services with different trust levels, restrict access to sensitive resources, and limit the consequences of compromised workloads.",
    whyItMatters:
      "Applications routinely run with more access than their function requires. Trust-level boundaries and explicit resource permissions reduce the blast radius when one workload is compromised.",
    researchQuestions: [
      "What trust levels are meaningful, and how is a workload assigned to one?",
      "How should capability-based permissions and sandboxing be expressed and enforced?",
      "Which filesystem, device and network access can be denied without breaking the workload?",
      "What CPU and memory limits are needed to contain abuse while preserving service quality?",
    ],
    researchObjectives: [
      "Define application trust levels.",
      "Evaluate capability-based permissions and sandboxing.",
      "Restrict filesystem, device, and network access.",
      "Establish CPU and memory resource limits.",
      "Test isolation boundaries under simulated compromise.",
    ],
    technicalChallenges: [
      "Real applications depend on implicit access that has to be discovered before it can be removed.",
      "Sandboxing and capability checks add latency to system-call and I/O paths.",
      "Resource limits can turn a compromised workload into a local denial-of-service.",
      "Isolation tests must be adversarial rather than limited to expected failure modes.",
    ],
    expectedOutcome:
      "A prototype workload-isolation framework with a threat model and performance measurements.",
    tags: ["workload isolation", "sandboxing", "capabilities", "resource limits", "trust levels", "containment"],
    relatedResearch: [
      "kernel-memory-isolation",
      "hardware-trust-boundaries",
      "robotics-security-architecture",
    ],
  },
  {
    id: "system-integrity-monitoring",
    slug: "system-integrity-monitoring",
    collection: "black-wall",
    title: "Tamper-Evident Integrity Monitoring for Critical OS Components",
    category: "Host Security and Integrity Monitoring",
    areas: ["Cybersecurity", "Systems"],
    difficulty: "Advanced",
    status: "Open Research Problem",
    description:
      "Detect unauthorised changes to protected files, executables, configuration and security policy, and distinguish them from legitimate updates.",
    problemStatement:
      "Investigate how Black Wall can detect unauthorized changes to protected files, executable components, configuration, and security policies.",
    whyItMatters:
      "Persistence usually requires changing something on disk or in policy. Integrity monitoring makes those changes visible, but only if it can tell an authorised update apart from an unexpected modification and record the evidence without itself being altered.",
    researchQuestions: [
      "Which components need integrity coverage, and at what granularity?",
      "How are trusted baselines and signed manifests created, stored and updated?",
      "How can authorised updates be distinguished from unexpected modifications without a manual decision every time?",
      "What monitoring overhead and detection latency are acceptable on a running system?",
    ],
    researchObjectives: [
      "Establish trusted baselines and signed manifests.",
      "Distinguish authorized updates from unexpected modifications.",
      "Investigate tamper-evident records.",
      "Evaluate monitoring overhead and detection latency.",
      "Develop reproducible integrity-verification tests.",
    ],
    technicalChallenges: [
      "Baselines must change with legitimate updates without becoming attacker-controlled.",
      "Continuous verification competes with normal I/O and can be expensive at fine granularity.",
      "Tamper-evident records require somewhere trustworthy to anchor their integrity.",
      "Detection latency depends on when a change is observed, not only on when it occurred.",
    ],
    expectedOutcome:
      "A prototype integrity-monitoring system with documented coverage and limitations.",
    tags: ["integrity monitoring", "signed manifests", "baselines", "tamper evidence", "detection latency"],
    relatedResearch: [
      "self-defending-operating-system",
      "secure-os-updates",
      "secure-boot-integrity",
    ],
  },
  {
    id: "fail-safe-os-recovery",
    slug: "fail-safe-os-recovery",
    collection: "black-wall",
    title: "Fail-Safe Operating-System Behavior Under Security and Hardware Failures",
    category: "Resilient Systems and Cyber-Physical Security",
    areas: ["Systems", "Cybersecurity", "Robotics"],
    difficulty: "Expert",
    status: "Open Research Problem",
    description:
      "Define how Black Wall should respond when security services, authentication, storage, networking or hardware fail, including controlled degraded operation and recovery.",
    problemStatement:
      "Investigate how Black Wall should respond when security services, authentication, storage, networking, or hardware components fail. Explore controlled degraded operation, recovery, and safety-preserving responses.",
    whyItMatters:
      "Security controls and safety properties can conflict during failure. A system that fails closed may become unavailable, while one that fails open may become unsafe, so the intended behaviour for each failure class has to be explicit.",
    researchQuestions: [
      "Which failure classes must be distinguished, and what recovery policy applies to each?",
      "Which dependencies are security-critical, and what happens when one becomes unavailable?",
      "What degraded operating modes can be defined without silently disabling protection?",
      "How should availability, recovery time and safety properties be evaluated under simulated failure?",
    ],
    researchObjectives: [
      "Define failure classes and recovery policies.",
      "Identify security-critical dependencies.",
      "Design explicit degraded operating modes.",
      "Simulate authentication, storage, networking, and monitoring failures.",
      "Evaluate availability, recovery time, and safety properties.",
    ],
    technicalChallenges: [
      "Fail-closed and fail-open responses both carry unacceptable consequences in some scenarios.",
      "Recovery actions depend on components that may be the ones that failed.",
      "Degraded modes enlarge the attack surface unless their permissions are constrained.",
      "Safety and availability need measurable criteria rather than informal expectations.",
    ],
    expectedOutcome:
      "A documented failure-handling model and a prototype demonstrating controlled recovery.",
    tags: ["fail-safe", "recovery", "degraded operation", "resilience", "availability", "safety"],
    relatedResearch: [
      "reliable-boot-architecture",
      "distributed-system-communication",
      "robotics-security-architecture",
      "anxbwr6zqm",
    ],
  },
];
