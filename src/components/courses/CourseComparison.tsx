import React from 'react';
import { X, Clock, Star, Users, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  rating: number;
  students: string;
  instructor: string;
  level: string;
  image: string;
}

interface CourseComparisonProps {
  courses: Course[];
  selected: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
}

const curriculumData: Record<string, { modules: string[]; prerequisites: string[]; outcomes: string[] }> = {
  'neural-networks': {
    modules: ['Deep Learning Foundations', 'CNNs & RNNs', 'GANs & Autoencoders', 'Model Optimization'],
    prerequisites: ['Linear Algebra', 'Python', 'Probability & Statistics'],
    outcomes: ['Build production ML models', 'Design neural architectures', 'Deploy AI systems'],
  },
  'robotics-kinematics': {
    modules: ['Forward Kinematics', 'Inverse Kinematics', 'Trajectory Planning', 'Sensor Fusion'],
    prerequisites: ['Calculus', 'Physics', 'Basic Programming'],
    outcomes: ['Program robot arms', 'Design motion systems', 'Integrate sensors'],
  },
  'kernel-development': {
    modules: ['Kernel Architecture', 'Memory Management', 'Process Scheduling', 'Device Drivers'],
    prerequisites: ['C Programming', 'Computer Architecture', 'Data Structures'],
    outcomes: ['Write kernel modules', 'Debug OS internals', 'Build device drivers'],
  },
  'blockchain-infra': {
    modules: ['Consensus Mechanisms', 'Smart Contracts', 'DeFi Protocols', 'Layer 2 Solutions'],
    prerequisites: ['Cryptography Basics', 'Networking', 'JavaScript/Solidity'],
    outcomes: ['Deploy smart contracts', 'Build DApps', 'Audit blockchain security'],
  },
  'aerospace-101': {
    modules: ['Orbital Mechanics', 'Propulsion Systems', 'Structural Analysis', 'Mission Design'],
    prerequisites: ['Physics', 'Calculus', 'Engineering Fundamentals'],
    outcomes: ['Design spacecraft systems', 'Calculate orbital trajectories', 'Plan space missions'],
  },
  'quantum-fundamentals': {
    modules: ['Quantum States', 'Quantum Gates', 'Quantum Algorithms', 'Error Correction'],
    prerequisites: ['Linear Algebra', 'Quantum Physics', 'Complex Analysis'],
    outcomes: ['Implement quantum algorithms', 'Use quantum simulators', 'Understand quantum advantage'],
  },
  'cybersecurity-ops': {
    modules: ['Threat Analysis', 'Penetration Testing', 'Incident Response', 'Security Architecture'],
    prerequisites: ['Networking', 'Linux Administration', 'Scripting'],
    outcomes: ['Conduct security audits', 'Build defense systems', 'Respond to incidents'],
  },
  'data-science-ml': {
    modules: ['Statistical Analysis', 'Feature Engineering', 'Model Selection', 'Big Data Processing'],
    prerequisites: ['Statistics', 'Python', 'SQL'],
    outcomes: ['Build data pipelines', 'Create predictive models', 'Visualize insights'],
  },
  'cloud-architecture': {
    modules: ['Cloud Fundamentals', 'Microservices', 'CI/CD Pipelines', 'Infrastructure as Code'],
    prerequisites: ['Linux', 'Networking', 'Docker Basics'],
    outcomes: ['Architect cloud solutions', 'Automate deployments', 'Manage infrastructure'],
  },
  'computer-vision': {
    modules: ['Image Processing', 'Object Detection', 'Segmentation', '3D Vision'],
    prerequisites: ['Python', 'Linear Algebra', 'Basic ML'],
    outcomes: ['Build vision pipelines', 'Train detection models', 'Deploy CV applications'],
  },
  'embedded-systems': {
    modules: ['Microcontrollers', 'RTOS', 'Sensor Integration', 'IoT Protocols'],
    prerequisites: ['C/C++', 'Electronics Basics', 'Digital Logic'],
    outcomes: ['Design embedded systems', 'Program microcontrollers', 'Build IoT devices'],
  },
  'nlp-transformers': {
    modules: ['Text Processing', 'Word Embeddings', 'Transformer Architecture', 'Fine-tuning LLMs'],
    prerequisites: ['Python', 'Linear Algebra', 'Basic ML'],
    outcomes: ['Build NLP pipelines', 'Fine-tune language models', 'Deploy text AI systems'],
  },
};

const CourseComparison: React.FC<CourseComparisonProps> = ({ courses, selected, onToggle, onClear }) => {
  const selectedCourses = courses.filter(c => selected.includes(c.id));

  if (selected.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        {/* Collapsed bar when 1 selected */}
        {selected.length < 2 && (
          <div className="bg-black/80 backdrop-blur-xl border-t border-white/10 p-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {selected.length}/3
                </Badge>
                <span className="text-sm text-gray-300">
                  Select {2 - selected.length} more course{selected.length === 0 ? 's' : ''} to compare
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={onClear} className="text-gray-400">
                Clear
              </Button>
            </div>
          </div>
        )}

        {/* Expanded comparison when 2-3 selected */}
        {selected.length >= 2 && (
          <div className="bg-black/90 backdrop-blur-xl border-t border-white/10 max-h-[80vh] overflow-y-auto">
            <div className="container mx-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Course Comparison</h3>
                <Button variant="ghost" size="sm" onClick={onClear} className="text-gray-400">
                  <X className="w-4 h-4 mr-1" /> Close
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="text-left text-sm font-medium text-gray-400 pb-4 pr-4 w-36">Feature</th>
                      {selectedCourses.map(c => (
                        <th key={c.id} className="text-left pb-4 px-4">
                          <div className="flex items-center gap-3">
                            <img src={c.image} alt={c.title} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <p className="text-sm font-semibold text-white">{c.title}</p>
                              <button onClick={() => onToggle(c.id)} className="text-xs text-red-400 hover:text-red-300 mt-0.5">Remove</button>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {/* Basic Info Rows */}
                    {([
                      { label: 'Category', icon: <GraduationCap className="w-4 h-4" />, key: 'category' },
                      { label: 'Duration', icon: <Clock className="w-4 h-4" />, key: 'duration' },
                      { label: 'Level', icon: <Star className="w-4 h-4" />, key: 'level' },
                      { label: 'Rating', icon: <Star className="w-4 h-4" />, key: 'rating' },
                      { label: 'Students', icon: <Users className="w-4 h-4" />, key: 'students' },
                      { label: 'Instructor', icon: <GraduationCap className="w-4 h-4" />, key: 'instructor' },
                    ] as const).map(row => (
                      <tr key={row.label} className="border-t border-white/5">
                        <td className="py-3 pr-4 text-gray-400 flex items-center gap-2">{row.icon}{row.label}</td>
                        {selectedCourses.map(c => (
                          <td key={c.id} className="py-3 px-4 text-white">
                            {String(c[row.key as keyof Course])}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Curriculum */}
                    <tr className="border-t border-white/10">
                      <td className="py-3 pr-4 text-primary font-medium" colSpan={selectedCourses.length + 1}>
                        Curriculum Modules
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-gray-400">Modules</td>
                      {selectedCourses.map(c => (
                        <td key={c.id} className="py-2 px-4">
                          <ul className="space-y-1">
                            {(curriculumData[c.id]?.modules || []).map((m, i) => (
                              <li key={i} className="text-gray-300 flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
                                {m}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    {/* Prerequisites */}
                    <tr className="border-t border-white/10">
                      <td className="py-3 pr-4 text-primary font-medium" colSpan={selectedCourses.length + 1}>
                        Prerequisites
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-gray-400">Required</td>
                      {selectedCourses.map(c => (
                        <td key={c.id} className="py-2 px-4">
                          <div className="flex flex-wrap gap-1.5">
                            {(curriculumData[c.id]?.prerequisites || []).map((p, i) => (
                              <Badge key={i} className="bg-white/[0.06] text-gray-300 border-white/10 text-xs">{p}</Badge>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Outcomes */}
                    <tr className="border-t border-white/10">
                      <td className="py-3 pr-4 text-primary font-medium" colSpan={selectedCourses.length + 1}>
                        Learning Outcomes
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-gray-400">Skills</td>
                      {selectedCourses.map(c => (
                        <td key={c.id} className="py-2 px-4">
                          <ul className="space-y-1">
                            {(curriculumData[c.id]?.outcomes || []).map((o, i) => (
                              <li key={i} className="text-gray-300 flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                                {o}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CourseComparison;
