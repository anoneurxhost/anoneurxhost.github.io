/**
 * Anoneurx Lab blog.
 *
 * The lab blog in Google Research style: short, accessible write-ups of the
 * work happening inside the lab, written for a general technical audience.
 * Every post maps back to a problem, project or paper on the site.
 */

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type LabBlogPost = {
  slug: string;
  title: string;
  /** Short uppercase category shown above the title, Google Research style. */
  category: string;
  /** ISO date of publication. */
  date: string;
  authors: string[];
  readTime: string;
  /** One-sentence summary used on cards and in meta descriptions. */
  excerpt: string;
  sections: BlogSection[];
  relatedProblemId?: string;
  relatedProjectSlug?: string;
};

export const labBlogPosts: LabBlogPost[] = [
  {
    slug: "robot-perception-self-trust",
    title: "Grounding robot perception in doubt",
    category: "Robotics",
    date: "2026-09-12",
    authors: ["Muhammad Qasim"],
    readTime: "7 min read",
    excerpt:
      "A robot that cannot tell when its own perception is unreliable is a hazard. We argue for a self-trust layer that reasons about contradictions across sensors — and acts on them.",
    relatedProblemId: "anxron8cvd",
    sections: [
      {
        heading: "Perception is only as good as its fallback",
        paragraphs: [
          "An autonomous robot rarely fails because one sensor broke. It fails because two sensors disagree — the camera reports a clear path while the LiDAR sees an obstacle, or the IMU records motion the controller never commanded — and the fusion layer quietly averages the confusion into a bad decision.",
          "Current stacks treat these disagreements as calibration problems to tune away. But a disagreement is also information: it is often the earliest signal that perception itself is compromised, spoofed, or failing.",
        ],
      },
      {
        heading: "A Perception Reliability Score",
        paragraphs: [
          "Our proposed self-trust layer maintains a Perception Reliability Score: a continuously updated estimate of how much the robot should believe its own senses. The score is derived from contradiction patterns across camera, LiDAR, IMU and expected physical trajectories — not from any single sensor.",
          "What makes this different from classical sensor fusion is what the score controls. It does not merely re-weight inputs; it changes behaviour. As the score degrades, the robot escalates through a policy ladder: continue with reduced confidence, slow down, restrict its motion envelope, or come to a controlled stop.",
        ],
      },
      {
        heading: "The hard questions",
        paragraphs: [
          "Three questions shape the research agenda. First, what formal notion of self-trust captures reliability across conflicting sensor streams without collapsing into noise? Second, how fast must the cross-sensor analysis run to stay useful for real-time control — we believe under ten milliseconds is the right budget. Third, how should the policy ladder be tuned so a degrading robot is safe without becoming useless?",
          "If those questions have good answers, a robot that can doubt itself is safer than one that never does. The full problem statement, including the evaluation scenarios we plan to publish, is on the problem board.",
        ],
      },
    ],
  },
  {
    slug: "self-learning-security-baseline",
    title: "Teaching a system its own definition of normal",
    category: "Cybersecurity",
    date: "2026-08-30",
    authors: ["Muhammad Qasim"],
    readTime: "8 min read",
    excerpt:
      "Hand-written security rules go stale the moment a deployment changes. We report early lessons from building a security baseline that learns itself — and the poisoning traps we are designing against.",
    relatedProblemId: "anxcsv9lxp",
    relatedProjectSlug: "anx-sentinel",
    sections: [
      {
        heading: "Rules rot quietly",
        paragraphs: [
          "Every manually authored security baseline carries an expiry date that nobody writes down. The rule was correct for the workload it was written against; six months later the deployment has scaled, traffic has changed shape, and the rule is either silent (because it matches nothing) or screaming (because it matches everything).",
          "The obvious fix is to learn the baseline from observed behaviour. The obvious fix is also dangerous: a system that learns what normal looks like will cheerfully absorb an attacker's behaviour as normal too.",
        ],
      },
      {
        heading: "Frequency is not normality",
        paragraphs: [
          "The single most valuable idea from our first round of experiments is to separate behaviour that is frequent from behaviour that is normative. Frequent-but-unhealthy states — a leaking process, a degraded replica — look statistically identical to healthy ones. A baseline that treats frequency as validity will defend a system on its way to failure quite confidently.",
          "Our approach is to maintain two models: a descriptive model of what happens, and a normative model of what should happen, constrained by invariants the operators can express cheaply (what may talk to what, what should never restart). Deviations from the normative model are trusted more than surprises in the descriptive one.",
        ],
      },
      {
        heading: "What comes next",
        paragraphs: [
          "The open question is poisoning resistance: can a baseline evolve continuously while staying provably resistant to an adversary who is inside the feedback loop? We are publishing our staged pre-attack dataset and the evaluation harness so the comparison can be reproduced. The problem statement on the board lists the exact metrics we care about.",
        ],
      },
    ],
  },
  {
    slug: "quantizing-bert-256kb",
    title: "Fitting a language model into 256 kilobytes",
    category: "AI",
    date: "2026-07-18",
    authors: ["Student Team C", "Muhammad Qasim"],
    readTime: "6 min read",
    excerpt:
      "Keyword spotting on a microcontroller used to justify throwing the model away. Our 4.2-bit BERT reaches 94.1% accuracy inside 256 KB of RAM. Here is what the accuracy-vs-bits curve actually looks like.",
    relatedProblemId: "anxrp004",
    sections: [
      {
        heading: "The bit-width cliff",
        paragraphs: [
          "Post-training quantization stays flat through 8 bits, wobbles at 4, and falls off a cliff at 3. What matters in practice is where every task sits on that curve. For keyword spotting on a BERT-tiny-class architecture, we found the curve stays flat much further than common wisdom suggests — but only if the per-layer bit allocation is allowed to differ.",
          "A uniform 4-bit shrink costs roughly nine points of accuracy on our benchmark. A mixed-precision assignment that keeps attention projections at 8 bits and lets feed-forward blocks drop to 2 recovers almost all of it inside the same memory budget.",
        ],
      },
      {
        heading: "Where the memory actually goes",
        paragraphs: [
          "On a Cortex-M4 the weights are only half the story. Activation buffers, the quantization scale tables and the tokenizer vocabulary each conspire to consume multiples of what the network needs. The winning trick was a vocabulary-pruned, integer-indexed tokenizer that removed more bytes than every quantization trick combined.",
        ],
      },
      {
        heading: "Reproduce it",
        paragraphs: [
          "The toolkit, the per-layer bit assignments and the hardware benchmark harness are open source. If you deploy models on microcontroller-class hardware, the accuracy-vs-latency sweep across targets is the part we most want people to check.",
        ],
      },
    ],
  },
  {
    slug: "federated-learning-privacy-accounting",
    title: "Privacy accounting in practice: federated learning for chest X-rays",
    category: "AI",
    date: "2026-06-20",
    authors: ["Student Team B", "Muhammad Qasim"],
    readTime: "9 min read",
    excerpt:
      "Differential privacy gives federated learning a formal guarantee — and a brutal trade-off screen. We walk through what DP budgets mean when twelve simulated hospitals train one medical imaging model.",
    relatedProblemId: "anxrp002",
    sections: [
      {
        heading: "Why hospitals cannot just share data",
        paragraphs: [
          "Rare diseases need large datasets. Hospitals cannot combine datasets, because regulations are written to prevent exactly that. Federated learning — one model, many sites, gradients instead of records — looks like the escape hatch, but gradient inversion attacks have shown the escape hatch leaks.",
        ],
      },
      {
        heading: "What the noise budget buys",
        paragraphs: [
          "Differential privacy comes in one currency: utility spent per unit of guarantee. On chest X-ray classification across twelve simulated hospital nodes, our DP-FLMed experiments place the usable frontier squarely around strong ε values with gradient clipping — every attempt to buy more accuracy at a weaker ε produced models we would not defend in front of a clinical reviewer.",
          "The uncomfortable finding is that the noise calibration question is dataset shape, not architecture. Non-IID splits across hospitals changed the optimal noise multiplier more than changing the encoder did.",
        ],
      },
      {
        heading: "Open evaluation",
        paragraphs: [
          "We will publish the privacy-utility Pareto frontier for MIMIC-CXR and CheXpert splits as part of the problem's deliverables, including the accounting configuration that produced every point on the curve. If your threat model differs from ours, you will be able to re-price the frontier instead of re-running the training.",
        ],
      },
    ],
  },
  {
    slug: "adversarial-code-assistants",
    title: "Attacking the assistant: how LLM code tools can be steered into writing vulnerabilities",
    category: "AI Safety",
    date: "2026-05-02",
    authors: ["Student Team E"],
    readTime: "10 min read",
    excerpt:
      "We catalogued the prompt shapes that steer LLM code assistants toward insecure output — and found that the defense that mattered was not the one everyone expected.",
    relatedProblemId: "anxrp005",
    sections: [
      {
        heading: "New software supply chains have old failure modes",
        paragraphs: [
          "AI code assistants are already inside millions of pull requests. Any systematic tendency to produce vulnerable code under adversarial pressure is therefore a supply-chain risk at industrial scale — not a demo curiosity.",
          "Our taxonomy organises attack surface by workflow position: attacks inside the prompt, attacks through the repository context the assistant reads, and attacks through the test loop that an assistant uses to validate itself. The third one is the most interesting, and the most disturbing.",
        ],
      },
      {
        heading: "Defenses: fine-tuning vs detection",
        paragraphs: [
          "We evaluated five defenses across three assistant families. Fine-tuning on curated secure-output data shifted the failure rate but did not remove it; input sanitization caught the obvious shapes and missed the contextual ones, which know how to look like normal code.",
          "The defense that moved the needle most was also the least glamorous: a semantics-aware scanner that checks generated code for the property the model was asked for, and flags drift. Assistant behavior is not something to trust at inference time; it is something to verify.",
        ],
      },
      {
        heading: "What we are publishing",
        paragraphs: [
          "The adversarial benchmark, the per-defense results and the audit protocol ship as the problem's deliverables. Assistants will keep getting better — we want the security bar to rise at the same pace.",
        ],
      },
    ],
  },
  {
    slug: "cyber-physical-threat-horizon",
    title: "Measuring the threat horizon: how much warning is enough?",
    category: "Cyber-Physical Security",
    date: "2026-04-14",
    authors: ["Muhammad Qasim"],
    readTime: "7 min read",
    excerpt:
      "Between the first anomalous signal and the physical damage there is a window. We want to measure it, score it in real time, and make it a first-class security metric.",
    relatedProblemId: "anxrok3fwt",
    sections: [
      {
        heading: "The window is the product",
        paragraphs: [
          "For a cyber-physical system, the interval between the earliest reliable signal of an attack and the first physical consequence is the entire design budget for mitigation. Detection at T—when the collision is already happening—is a naming error pretending to be a defense.",
          "The Cyber-Physical Threat Horizon asks: how long is that window, in practice, across the signals a real system has? Not in a paper's idealised threat model, but for vehicles, drones and industrial robots under real workloads.",
        ],
      },
      {
        heading: "Which signals stay informative",
        paragraphs: [
          "Early results from staged scenarios suggest the usable signals change character as the attack progresses: network anomalies fade quickly, sensor timing drift persists longer, and unexpected command-sequence structure is the most durable signal of all. A working horizon score will need to be a composition, not a single detector.",
        ],
      },
      {
        heading: "A metric we want the field to adopt",
        paragraphs: [
          "Deliverables include a warning-time benchmark across simulated attack scenarios and the formal definition of the horizon score. Our goal is modest and ambitious at once: that 'expected warning time' joins boot time and latency as metric people quote when they buy or build a robot.",
        ],
      },
    ],
  },
  {
    slug: "why-we-publish-open-problems",
    title: "Why we publish our open problems",
    category: "Lab Culture",
    date: "2026-03-05",
    authors: ["Muhammad Qasim"],
    readTime: "5 min read",
    excerpt:
      "Every problem in our board is published with its research gap, its weaknesses and its unanswered questions. That is deliberate — here is what it buys the lab and our collaborators.",
    sections: [
      {
        heading: "A problem statement is a contract",
        paragraphs: [
          "Most research pain starts before the research: an unclear problem, an unmeasurable goal, a supervisor who expects a different deliverable. Our problem board exists to remove that starting friction. Each problem publishes its scope, its supervisor, its skills and its deliverables — so joining the lab is a decision with a visible shape.",
        ],
      },
      {
        heading: "Why publish the gaps too",
        paragraphs: [
          "We also publish what existing solutions cannot do and the questions that remain. This feels exposed, and should. A gap written down publicly can be proven wrong by a stranger on the internet — which is the best review mechanism we know of.",
        ],
      },
      {
        heading: "How to claim one",
        paragraphs: [
          "Browse the board, filter by your area and skill, and read the statement end to end. Then apply: you will work the problem with a named supervisor, a scoped first milestone and a review cadence. If none of the listed problems fit you, the fellowship route takes self-directed proposals against the same standards.",
        ],
      },
    ],
  },
  {
    slug: "astra-learning-loop",
    title: "The ASTRA learning loop: a model that studies its own experience",
    category: "AI Research",
    date: "2026-02-11",
    authors: ["Muhammad Qasim"],
    readTime: "8 min read",
    excerpt:
      "ASTRA is our research project on self-learning AI — a model built to remember its experience, judge what worked, and improve behaviour across episodes. Here is the loop that makes it work.",
    relatedProjectSlug: "dp-flmed",
    sections: [
      {
        heading: "Learning after training",
        paragraphs: [
          "The common recipe for improving a model is: collect data, annotate, retrain. ASTRA targets what happens between epochs of the real world — the model records what it perceived, how it acted, what happened next, and distils that record into durable capability without a full retraining round.",
          "The loop has six stations: perceive, reason, act, record, reflect, improve. Reflection is the only expensive station, and it runs only on episodes the model itself flags as instructive — surprising, costly, or contradictory.",
        ],
      },
      {
        heading: "Honesty about scale",
        paragraphs: [
          "ASTRA runs at 20 billion parameters today and is architecturally aimed at a 1T target — we state both numbers because a scale claim that hides the current value is a marketing claim, not a research position.",
        ],
      },
      {
        heading: "Follow or challenge it",
        paragraphs: [
          "Every module behind the loop (continual learning, task generation, self-evaluation, memory, skill compounding) is an open research module with its own problem statement on the board. We would rather be checked than admired.",
        ],
      },
    ],
  },
];

export const labBlogCategories = Array.from(new Set(labBlogPosts.map((post) => post.category)));

export const findLabBlogPost = (slug?: string): LabBlogPost | undefined =>
  labBlogPosts.find((post) => post.slug === slug);

/** Sorts posts newest first, formatted as the card row shows them. */
export const postSortKey = (post: LabBlogPost): number => new Date(post.date).getTime() ?? 0;

export const sortedLabBlogPosts = [...labBlogPosts].sort(
  (a, b) => postSortKey(b) - postSortKey(a),
);

/** Reads an ISO date as a display date (e.g. "September 12, 2026"). */
export const formatPostDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
