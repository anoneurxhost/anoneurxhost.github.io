import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Star, Users, BookOpen, CheckCircle, ArrowLeft, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import neuralImg from "@/assets/courses/neural-networks.jpg";
import roboticsImg from "@/assets/courses/robotics-kinematics.jpg";
import kernelImg from "@/assets/courses/kernel-development.jpg";
import blockchainImg from "@/assets/courses/blockchain-infra.jpg";
import aerospaceImg from "@/assets/courses/aerospace-101.jpg";
import quantumImg from "@/assets/courses/quantum-fundamentals.jpg";
import cybersecurityImg from "@/assets/courses/cybersecurity.jpg";
import dataScienceImg from "@/assets/courses/data-science.jpg";
import cloudImg from "@/assets/courses/cloud-computing.jpg";
import cvImg from "@/assets/courses/computer-vision.jpg";
import embeddedImg from "@/assets/courses/embedded-systems.jpg";
import nlpImg from "@/assets/courses/nlp.jpg";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const coursesData: Record<string, {
  title: string; category: string; duration: string; rating: number; students: string;
  instructor: string; level: string; description: string; image: string;
  prerequisites: string[];
  modules: { title: string; lessons: number; duration: string }[];
  outcomes: string[];
}> = {
  'neural-networks': {
    title: 'Advanced Neural Networks', category: 'AI', duration: '12 Weeks', rating: 4.9, students: '1,200+',
    instructor: 'Dr. Sarah Chen', level: 'Advanced', image: neuralImg,
    description: 'Dive deep into convolutional, recurrent, and transformer architectures. Learn to design, train, and deploy neural networks for real-world applications in computer vision, natural language processing, and generative AI.',
    prerequisites: ['Linear Algebra & Calculus', 'Python Programming', 'Machine Learning Fundamentals'],
    modules: [
      { title: 'Foundations of Deep Learning', lessons: 8, duration: '2 weeks' },
      { title: 'Convolutional Neural Networks', lessons: 10, duration: '2 weeks' },
      { title: 'Recurrent Networks & LSTMs', lessons: 8, duration: '2 weeks' },
      { title: 'Transformer Architecture', lessons: 12, duration: '2 weeks' },
      { title: 'Generative Models (GANs & VAEs)', lessons: 8, duration: '2 weeks' },
      { title: 'Deployment & Optimization', lessons: 6, duration: '2 weeks' },
    ],
    outcomes: ['Design custom neural network architectures', 'Train models on large-scale datasets', 'Deploy models to production environments', 'Understand attention mechanisms and transformers'],
  },
  'robotics-kinematics': {
    title: 'Robotics Kinematics', category: 'Robotics', duration: '10 Weeks', rating: 4.8, students: '850+',
    instructor: 'Prof. James Mitchell', level: 'Intermediate', image: roboticsImg,
    description: 'Master forward and inverse kinematics, trajectory planning, and motion control for robotic manipulators and mobile robots.',
    prerequisites: ['Physics (Mechanics)', 'Linear Algebra', 'Basic Programming'],
    modules: [
      { title: 'Robot Geometry & Frames', lessons: 6, duration: '2 weeks' },
      { title: 'Forward Kinematics', lessons: 8, duration: '2 weeks' },
      { title: 'Inverse Kinematics', lessons: 8, duration: '2 weeks' },
      { title: 'Trajectory Planning', lessons: 6, duration: '2 weeks' },
      { title: 'Motion Control & Dynamics', lessons: 8, duration: '2 weeks' },
    ],
    outcomes: ['Solve kinematic equations for robotic arms', 'Implement trajectory planners', 'Understand Jacobian-based control', 'Design motion profiles for smooth operation'],
  },
  'kernel-development': {
    title: 'Secure Kernel Development', category: 'OS', duration: '15 Weeks', rating: 4.7, students: '2,100+',
    instructor: 'Dr. Anton Volkov', level: 'Advanced', image: kernelImg,
    description: 'Build secure operating system kernels from scratch. Learn memory management, process scheduling, file systems, and security hardening techniques.',
    prerequisites: ['C Programming', 'Computer Architecture', 'Operating Systems Basics'],
    modules: [
      { title: 'Boot Process & Initialization', lessons: 6, duration: '2 weeks' },
      { title: 'Memory Management', lessons: 10, duration: '3 weeks' },
      { title: 'Process Scheduling', lessons: 8, duration: '2 weeks' },
      { title: 'File Systems', lessons: 8, duration: '2 weeks' },
      { title: 'Inter-Process Communication', lessons: 6, duration: '2 weeks' },
      { title: 'Security & Hardening', lessons: 10, duration: '2 weeks' },
      { title: 'Device Drivers', lessons: 6, duration: '2 weeks' },
    ],
    outcomes: ['Write a minimal OS kernel in C', 'Implement virtual memory', 'Design secure IPC mechanisms', 'Harden kernels against common exploits'],
  },
  'blockchain-infra': {
    title: 'Blockchain Infrastructure', category: 'Blockchain', duration: '8 Weeks', rating: 4.9, students: '1,500+',
    instructor: 'Prof. Liam Torres', level: 'Intermediate', image: blockchainImg,
    description: 'Understand blockchain internals, consensus mechanisms, smart contract development, and decentralized application architecture.',
    prerequisites: ['Data Structures', 'Cryptography Basics', 'JavaScript or Solidity'],
    modules: [
      { title: 'Blockchain Fundamentals', lessons: 6, duration: '1 week' },
      { title: 'Consensus Mechanisms', lessons: 8, duration: '2 weeks' },
      { title: 'Smart Contract Development', lessons: 10, duration: '2 weeks' },
      { title: 'DApp Architecture', lessons: 8, duration: '2 weeks' },
      { title: 'Security & Auditing', lessons: 6, duration: '1 week' },
    ],
    outcomes: ['Build and deploy smart contracts', 'Understand PoW, PoS, and BFT', 'Design decentralized applications', 'Audit contracts for vulnerabilities'],
  },
  'aerospace-101': {
    title: 'Aerospace Engineering 101', category: 'Space Tech', duration: '12 Weeks', rating: 5.0, students: '600+',
    instructor: 'Dr. Amara Okafor', level: 'Beginner', image: aerospaceImg,
    description: 'Introduction to aerospace engineering covering aerodynamics, propulsion, orbital mechanics, and spacecraft design fundamentals.',
    prerequisites: ['High School Physics', 'Basic Mathematics'],
    modules: [
      { title: 'Introduction to Flight', lessons: 6, duration: '2 weeks' },
      { title: 'Aerodynamics', lessons: 8, duration: '2 weeks' },
      { title: 'Propulsion Systems', lessons: 8, duration: '2 weeks' },
      { title: 'Orbital Mechanics', lessons: 8, duration: '2 weeks' },
      { title: 'Spacecraft Design', lessons: 6, duration: '2 weeks' },
      { title: 'Mission Planning', lessons: 6, duration: '2 weeks' },
    ],
    outcomes: ['Understand lift, drag, and thrust principles', 'Calculate orbital parameters', 'Design basic spacecraft subsystems', 'Plan a simple space mission'],
  },
  'quantum-fundamentals': {
    title: 'Quantum Computing Fundamentals', category: 'Physics', duration: '14 Weeks', rating: 4.8, students: '400+',
    instructor: 'Prof. Elena Ricci', level: 'Advanced', image: quantumImg,
    description: 'Explore quantum bits, quantum gates, entanglement, and quantum algorithms. Hands-on with simulators and real quantum hardware.',
    prerequisites: ['Linear Algebra', 'Complex Numbers', 'Basic Quantum Physics'],
    modules: [
      { title: 'Quantum Mechanics Review', lessons: 6, duration: '2 weeks' },
      { title: 'Qubits & Quantum States', lessons: 8, duration: '2 weeks' },
      { title: 'Quantum Gates & Circuits', lessons: 8, duration: '2 weeks' },
      { title: 'Entanglement & Teleportation', lessons: 6, duration: '2 weeks' },
      { title: 'Quantum Algorithms', lessons: 10, duration: '3 weeks' },
      { title: 'Quantum Error Correction', lessons: 6, duration: '1 week' },
      { title: 'Hands-on with Quantum Hardware', lessons: 6, duration: '2 weeks' },
    ],
    outcomes: ['Manipulate quantum states mathematically', "Implement Shor's and Grover's algorithms", 'Use quantum simulators', 'Understand quantum error correction codes'],
  },
  'cybersecurity-ops': {
    title: 'Cybersecurity Operations', category: 'Cybersecurity', duration: '10 Weeks', rating: 4.9, students: '1,800+',
    instructor: 'Dr. Maya Patel', level: 'Intermediate', image: cybersecurityImg,
    description: 'Master penetration testing, threat analysis, incident response, and security architecture. Learn to defend systems against modern cyber threats using industry-standard tools and frameworks.',
    prerequisites: ['Networking Fundamentals (TCP/IP)', 'Linux Command Line', 'Basic Programming (Python preferred)'],
    modules: [
      { title: 'Security Fundamentals & Threat Landscape', lessons: 8, duration: '1.5 weeks' },
      { title: 'Network Security & Firewalls', lessons: 10, duration: '2 weeks' },
      { title: 'Penetration Testing & Ethical Hacking', lessons: 12, duration: '2.5 weeks' },
      { title: 'Cryptography in Practice', lessons: 6, duration: '1 week' },
      { title: 'Incident Response & Forensics', lessons: 8, duration: '1.5 weeks' },
      { title: 'Security Architecture & Zero Trust', lessons: 8, duration: '1.5 weeks' },
    ],
    outcomes: ['Conduct penetration tests on web applications', 'Analyze and respond to security incidents', 'Implement zero-trust architecture', 'Use tools like Burp Suite, Metasploit, and Wireshark'],
  },
  'data-science-ml': {
    title: 'Data Science & Machine Learning', category: 'Data Science', duration: '16 Weeks', rating: 4.8, students: '3,200+',
    instructor: 'Prof. David Kim', level: 'Intermediate', image: dataScienceImg,
    description: 'From data wrangling to model deployment. Master statistical analysis, machine learning algorithms, and data visualization using Python, Pandas, and Scikit-learn.',
    prerequisites: ['Statistics & Probability', 'Python Programming', 'Basic Linear Algebra'],
    modules: [
      { title: 'Data Wrangling with Pandas', lessons: 8, duration: '2 weeks' },
      { title: 'Exploratory Data Analysis & Visualization', lessons: 10, duration: '2 weeks' },
      { title: 'Statistical Inference & Hypothesis Testing', lessons: 8, duration: '2 weeks' },
      { title: 'Supervised Learning (Regression & Classification)', lessons: 12, duration: '3 weeks' },
      { title: 'Unsupervised Learning & Clustering', lessons: 8, duration: '2 weeks' },
      { title: 'Feature Engineering & Model Selection', lessons: 8, duration: '2 weeks' },
      { title: 'Model Deployment & MLOps', lessons: 8, duration: '2 weeks' },
      { title: 'Capstone Project', lessons: 4, duration: '1 week' },
    ],
    outcomes: ['Clean and transform raw datasets', 'Build predictive models with Scikit-learn', 'Create interactive dashboards and visualizations', 'Deploy ML models using Flask and Docker'],
  },
  'cloud-architecture': {
    title: 'Cloud Architecture & DevOps', category: 'Cloud', duration: '10 Weeks', rating: 4.7, students: '2,400+',
    instructor: 'Dr. Rachel Foster', level: 'Intermediate', image: cloudImg,
    description: 'Design scalable cloud infrastructure using AWS, Docker, and Kubernetes. Learn CI/CD pipelines, infrastructure-as-code, and monitoring for production systems.',
    prerequisites: ['Linux Administration', 'Networking Basics', 'Version Control (Git)'],
    modules: [
      { title: 'Cloud Computing Concepts', lessons: 6, duration: '1 week' },
      { title: 'AWS Core Services (EC2, S3, RDS, Lambda)', lessons: 10, duration: '2 weeks' },
      { title: 'Docker & Containerization', lessons: 8, duration: '2 weeks' },
      { title: 'Kubernetes Orchestration', lessons: 10, duration: '2 weeks' },
      { title: 'CI/CD Pipelines (GitHub Actions, Jenkins)', lessons: 6, duration: '1 week' },
      { title: 'Infrastructure as Code (Terraform)', lessons: 8, duration: '2 weeks' },
    ],
    outcomes: ['Architect highly available cloud systems', 'Containerize and orchestrate microservices', 'Automate deployments with CI/CD', 'Manage infrastructure with Terraform'],
  },
  'computer-vision': {
    title: 'Computer Vision & Image Processing', category: 'AI', duration: '11 Weeks', rating: 4.9, students: '950+',
    instructor: 'Dr. Sarah Chen', level: 'Advanced', image: cvImg,
    description: 'Explore image classification, object detection, segmentation, and generative vision models. Build real-world CV applications using PyTorch and OpenCV.',
    prerequisites: ['Python Programming', 'Neural Networks Basics', 'Linear Algebra'],
    modules: [
      { title: 'Image Processing Fundamentals', lessons: 8, duration: '2 weeks' },
      { title: 'CNNs for Image Classification', lessons: 8, duration: '2 weeks' },
      { title: 'Object Detection (YOLO, SSD)', lessons: 10, duration: '2 weeks' },
      { title: 'Semantic & Instance Segmentation', lessons: 8, duration: '2 weeks' },
      { title: 'Video Analysis & Tracking', lessons: 6, duration: '1.5 weeks' },
      { title: 'Generative Vision (Diffusion Models)', lessons: 6, duration: '1.5 weeks' },
    ],
    outcomes: ['Build image classification pipelines', 'Implement real-time object detection', 'Train segmentation models for medical imaging', 'Generate images using diffusion models'],
  },
  'embedded-systems': {
    title: 'Embedded Systems & IoT', category: 'Robotics', duration: '12 Weeks', rating: 4.6, students: '720+',
    instructor: 'Prof. James Mitchell', level: 'Intermediate', image: embeddedImg,
    description: 'Design and program embedded systems using ARM microcontrollers. Build IoT solutions with sensor networks, RTOS, and wireless communication protocols.',
    prerequisites: ['C Programming', 'Basic Electronics', 'Digital Logic'],
    modules: [
      { title: 'Microcontroller Architecture (ARM Cortex)', lessons: 8, duration: '2 weeks' },
      { title: 'Peripheral Interfaces (GPIO, UART, SPI, I2C)', lessons: 10, duration: '2 weeks' },
      { title: 'Real-Time Operating Systems (FreeRTOS)', lessons: 8, duration: '2 weeks' },
      { title: 'Sensor Integration & Signal Processing', lessons: 8, duration: '2 weeks' },
      { title: 'Wireless Protocols (BLE, LoRa, MQTT)', lessons: 8, duration: '2 weeks' },
      { title: 'IoT Platform & Cloud Integration', lessons: 6, duration: '2 weeks' },
    ],
    outcomes: ['Program ARM Cortex-M microcontrollers', 'Build real-time embedded applications', 'Design IoT sensor networks', 'Implement wireless communication protocols'],
  },
  'nlp-transformers': {
    title: 'NLP & Transformer Models', category: 'AI', duration: '10 Weeks', rating: 4.8, students: '1,100+',
    instructor: 'Dr. Aisha Rahman', level: 'Advanced', image: nlpImg,
    description: 'Master natural language processing from tokenization to large language models. Fine-tune transformers for text classification, summarization, translation, and question answering.',
    prerequisites: ['Python Programming', 'Deep Learning Basics', 'Linear Algebra'],
    modules: [
      { title: 'Text Preprocessing & Tokenization', lessons: 6, duration: '1.5 weeks' },
      { title: 'Word Embeddings (Word2Vec, GloVe)', lessons: 8, duration: '1.5 weeks' },
      { title: 'Sequence Models (RNN, LSTM, GRU)', lessons: 8, duration: '2 weeks' },
      { title: 'Attention & Transformer Architecture', lessons: 10, duration: '2 weeks' },
      { title: 'Fine-Tuning LLMs (BERT, GPT)', lessons: 8, duration: '1.5 weeks' },
      { title: 'RAG & Prompt Engineering', lessons: 6, duration: '1.5 weeks' },
    ],
    outcomes: ['Build text classification and NER pipelines', 'Fine-tune BERT and GPT models', 'Implement retrieval-augmented generation', 'Design production NLP systems'],
  },
};

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? coursesData[courseId] : null;

  if (!course) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-24 pb-16 flex items-center justify-center text-white">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Course Not Found</h1>
            <p className="text-base text-gray-400">The course you're looking for doesn't exist.</p>
            <Button asChild><Link to="/courses">Browse Courses</Link></Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return '';
    }
  };

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons, 0);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 bg-transparent">
        <div className="container-responsive text-white">
          <div className="max-w-4xl mx-auto space-y-10">
            <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Courses
            </Link>

            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="rounded-2xl overflow-hidden aspect-video">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" width={800} height={512} />
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/20 text-primary border-primary/20 text-xs">{course.category}</Badge>
                <Badge className={`text-xs ${getLevelColor(course.level)}`}>{course.level}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{course.title}</h1>
              <p className="text-base text-gray-300 leading-relaxed">{course.description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{course.duration}</span>
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />{course.rating}</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{course.students} students</span>
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{totalLessons} lessons</span>
              </div>
              <p className="text-sm text-gray-400">Instructor: <span className="text-white font-medium">{course.instructor}</span></p>
            </motion.div>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Curriculum</h2>
              <div className="space-y-3">
                {course.modules.map((mod, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}>
                    <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">{i + 1}</div>
                          <div>
                            <p className="text-base font-medium text-white">{mod.title}</p>
                            <p className="text-sm text-gray-400">{mod.lessons} lessons · {mod.duration}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Prerequisites</h2>
              <ul className="space-y-2">
                {course.prerequisites.map((prereq, i) => (
                  <li key={i} className="flex items-center gap-2 text-base text-gray-300">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" /> {prereq}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2 text-base text-gray-300">
                    <GraduationCap className="w-4 h-4 text-green-400 shrink-0 mt-1" /> {outcome}
                  </div>
                ))}
              </div>
            </section>

            <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
              <CardContent className="p-8 text-center space-y-4">
                <h2 className="text-2xl font-semibold">Ready to Start Learning?</h2>
                <p className="text-base text-gray-300">Join {course.students} students already enrolled in this course.</p>
                <Button size="lg" className="px-8" asChild>
                  <Link to={`/courses/${courseId}/enroll`}>Apply Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CourseDetail;
