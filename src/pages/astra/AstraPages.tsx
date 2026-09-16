import { AstraPageShell } from "./AstraSection";
import WhatIs from "./sections/WhatIs";
import LearningLoop from "./sections/LearningLoop";
import Scale from "./sections/Scale";
import Architecture from "./sections/Architecture";
import SelfLearning from "./sections/SelfLearning";
import Memory from "./sections/Memory";
import Research from "./sections/Research";
import Status from "./sections/Status";
import Log from "./sections/Log";
import Roadmap from "./sections/Roadmap";
import Philosophy from "./sections/Philosophy";
import Lab from "./sections/Lab";
import Contribution from "./sections/Contribution";

export const WhatIsPage = () => (
  <AstraPageShell current="/astra/what-is">
    <WhatIs />
  </AstraPageShell>
);

export const LearningLoopPage = () => (
  <AstraPageShell current="/astra/learning-loop">
    <LearningLoop />
  </AstraPageShell>
);

export const ScalePage = () => (
  <AstraPageShell current="/astra/scale">
    <Scale />
  </AstraPageShell>
);

export const ArchitecturePage = () => (
  <AstraPageShell current="/astra/architecture">
    <Architecture />
  </AstraPageShell>
);

export const SelfLearningPage = () => (
  <AstraPageShell current="/astra/self-learning">
    <SelfLearning />
  </AstraPageShell>
);

export const MemoryPage = () => (
  <AstraPageShell current="/astra/memory">
    <Memory />
  </AstraPageShell>
);

export const ResearchPage = () => (
  <AstraPageShell current="/astra/research">
    <Research />
  </AstraPageShell>
);

export const StatusPage = () => (
  <AstraPageShell current="/astra/status">
    <Status />
  </AstraPageShell>
);

export const LogPage = () => (
  <AstraPageShell current="/astra/log">
    <Log />
  </AstraPageShell>
);

export const RoadmapPage = () => (
  <AstraPageShell current="/astra/roadmap">
    <Roadmap />
  </AstraPageShell>
);

export const PhilosophyPage = () => (
  <AstraPageShell current="/astra/philosophy">
    <Philosophy />
  </AstraPageShell>
);

export const LabPage = () => (
  <AstraPageShell current="/astra/lab">
    <Lab />
  </AstraPageShell>
);

export const ContributePage = () => (
  <AstraPageShell current="/astra/contribute">
    <Contribution />
  </AstraPageShell>
);