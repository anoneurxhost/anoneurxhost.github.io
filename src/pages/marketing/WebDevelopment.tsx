import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import { Code, Layout, Smartphone, Star, DollarSign, Users, ArrowRight, Shield, Zap, Award } from "lucide-react";

const WebDevelopment = () => {
  return (
    <PageTransition>
      <div 
        className="universal-page-bg"
        
      >
        <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Modern Web Experiences
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Creating scalable web applications that deliver exceptional user experiences across all platforms
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
            Get a Free Quote
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Web Development Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:bg-white/10 transition-colors">
              <Code className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Custom Web Apps</h3>
              <p className="text-gray-300">Tailored web applications built to meet your specific business requirements</p>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:bg-white/10 transition-colors">
              <Smartphone className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">E-commerce Solutions</h3>
              <p className="text-gray-300">Full-featured online stores with payment processing and inventory management</p>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:bg-white/10 transition-colors">
              <Layout className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">SaaS Platforms</h3>
              <p className="text-gray-300">Scalable software-as-a-service solutions with subscription management</p>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:bg-white/10 transition-colors">
              <Zap className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">API Development</h3>
              <p className="text-gray-300">Robust backend APIs and microservices for seamless integrations</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-white">Our Technology Stack</h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            We use cutting-edge technologies to build fast, secure, and maintainable web applications
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-6 text-white">Frontend</h3>
              <div className="space-y-4">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS'].map((tech) => (
                  <div key={tech} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                    <span className="text-white font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-6 text-white">Backend</h3>
              <div className="space-y-4">
                {['Node.js', 'Express', 'Python', 'GraphQL'].map((tech) => (
                  <div key={tech} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                    <span className="text-white font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-6 text-white">Database</h3>
              <div className="space-y-4">
                {['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'].map((tech) => (
                  <div key={tech} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                    <span className="text-white font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Portfolio & Case Studies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-600 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">FinTech Dashboard</h3>
                <p className="text-gray-300 mb-4">Real-time financial analytics platform with advanced charting</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-green-400 text-sm">• 200% faster load times</span>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm">4.9/5</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">View Case Study</Button>
              </div>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">E-learning Platform</h3>
                <p className="text-gray-300 mb-4">Interactive educational platform with video streaming and assessments</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-green-400 text-sm">• 50K+ active users</span>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm">4.8/5</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">View Case Study</Button>
              </div>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-cyan-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">Healthcare Portal</h3>
                <p className="text-gray-300 mb-4">HIPAA-compliant patient management system with telemedicine features</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-green-400 text-sm">• 99.9% uptime</span>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm">4.9/5</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">View Case Study</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Specialties</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Performance Optimization</h3>
                  <p className="text-gray-300">Lightning-fast load times with advanced caching and optimization techniques</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Security</h3>
                  <p className="text-gray-300">Enterprise-grade security with encryption, authentication, and compliance</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Cloud Integration</h3>
                  <p className="text-gray-300">Seamless deployment and scaling with AWS, Azure, and Google Cloud</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Layout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">AI Features</h3>
                  <p className="text-gray-300">Integration of machine learning and AI capabilities into web applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Client Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Anoneurx delivered an exceptional web application that exceeded our expectations. 
                The performance and user experience are outstanding."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Sarah Johnson</p>
                  <p className="text-gray-400 text-sm">CTO, TechCorp</p>
                </div>
              </div>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "The team's expertise in modern web technologies helped us launch our platform 
                ahead of schedule with incredible results."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Michael Chen</p>
                  <p className="text-gray-400 text-sm">Founder, StartupX</p>
                </div>
              </div>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Professional, responsive, and delivered exactly what we needed. 
                Our new e-commerce platform has tripled our online sales."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Emily Rodriguez</p>
                  <p className="text-gray-400 text-sm">CEO, RetailPro</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss your project and create a web solution that drives your business forward
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
            Get a Free Quote
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default WebDevelopment;