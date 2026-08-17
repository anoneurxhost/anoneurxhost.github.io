import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import { Rocket, Satellite, Globe, Star, Download, Upload, ArrowRight, Target, Award } from "lucide-react";

const SpaceProjects = () => {
  return (
    <PageTransition>
      <div 
        className="universal-page-bg"
        
      >
        <div className="relative z-10">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Exploring Beyond Earth with Innovation
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Pioneering the next frontier of human exploration with innovative space technologies
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
            Join Our Space Research
            <Star className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">Our Space Exploration Mission</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-16">
            We are dedicated to advancing humanity's understanding of space through cutting-edge research, 
            innovative technology development, and practical applications that benefit both space exploration 
            and life on Earth.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Exploration</h3>
              <p className="text-gray-300">Pushing the boundaries of human knowledge about the cosmos</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <Rocket className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Innovation</h3>
              <p className="text-gray-300">Developing breakthrough technologies for space missions</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Impact</h3>
              <p className="text-gray-300">Creating solutions that benefit both space and Earth applications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Focus Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:bg-white/10 transition-colors">
              <Satellite className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Satellites</h3>
              <p className="text-gray-300">Advanced satellite systems for communication, observation, and research</p>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:bg-white/10 transition-colors">
              <Globe className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Space Communication</h3>
              <p className="text-gray-300">Next-generation communication networks for deep space missions</p>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:bg-white/10 transition-colors">
              <Star className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">AI for Space</h3>
              <p className="text-gray-300">Artificial intelligence systems for autonomous space operations</p>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:bg-white/10 transition-colors">
              <Rocket className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Robotics for Missions</h3>
              <p className="text-gray-300">Robotic systems for exploration and maintenance in space environments</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Current Space Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Satellite className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">CubeSat Constellation</h3>
                <p className="text-gray-300 mb-4">Network of nanosatellites for Earth observation and climate monitoring</p>
                <div className="flex items-center text-green-400 mb-4">
                  <Award className="w-4 h-4 mr-2" />
                  <span className="text-sm">Phase 2 - Testing</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">View Project</Button>
              </div>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Star className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">Deep Space AI</h3>
                <p className="text-gray-300 mb-4">Machine learning algorithms for autonomous navigation and decision making</p>
                <div className="flex items-center text-yellow-400 mb-4">
                  <Award className="w-4 h-4 mr-2" />
                  <span className="text-sm">Development</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">Learn More</Button>
              </div>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
                <Rocket className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">Mars Mission Prep</h3>
                <p className="text-gray-300 mb-4">Conceptual systems for future Mars exploration and habitat construction</p>
                <div className="flex items-center text-blue-400 mb-4">
                  <Award className="w-4 h-4 mr-2" />
                  <span className="text-sm">Research Phase</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">Explore</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Research Papers Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Published Space Research</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
              <h3 className="text-2xl font-semibold mb-6 text-white">Recent Publications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <h4 className="font-semibold text-white">Autonomous Navigation in Deep Space</h4>
                    <p className="text-gray-300 text-sm">IEEE Aerospace Conference 2024</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <h4 className="font-semibold text-white">CubeSat Swarm Communication Protocols</h4>
                    <p className="text-gray-300 text-sm">Journal of Spacecraft Technology 2024</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <h4 className="font-semibold text-white">AI-Driven Space Debris Detection</h4>
                    <p className="text-gray-300 text-sm">Space Debris Research Quarterly 2024</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
              <h3 className="text-2xl font-semibold mb-6 text-white">Submit Your Research</h3>
              <p className="text-gray-300 mb-6">
                Collaborate with our space research team and contribute to advancing space technology. 
                We welcome submissions from researchers, students, and industry professionals.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full mb-4">
                <Upload className="w-4 h-4 mr-2" />
                Upload Research Paper
              </Button>
              <Button variant="outline" className="w-full">
                Research Guidelines
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-8 text-white">Future Vision: Moon & Mars</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Our long-term vision includes establishing sustainable human presence on the Moon and Mars, 
              with a focus on environmental sustainability and advanced life support systems.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-white">Lunar Base Development</h3>
                <p className="text-gray-300">Self-sustaining lunar habitats with advanced life support and resource utilization</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-white">Mars Terraforming Research</h3>
                <p className="text-gray-300">Long-term atmospheric engineering and ecosystem development studies</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-white">Sustainable Space Operations</h3>
                <p className="text-gray-300">Zero-waste space missions and renewable energy systems for space applications</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-lg p-8 border border-blue-500/30">
              <h3 className="text-2xl font-bold mb-4 text-white">Sustainability Goals</h3>
              <p className="text-gray-300 mb-6">
                We're committed to developing space technologies that are environmentally sustainable 
                and contribute to the preservation of both Earth and space environments.
              </p>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• Carbon-neutral launch systems</li>
                <li>• Recyclable spacecraft materials</li>
                <li>• Closed-loop life support systems</li>
                <li>• Space debris mitigation</li>
              </ul>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Learn About Our Goals
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Reach for the Stars?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our mission to explore space and develop technologies that will shape the future of human exploration
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
            Join Our Space Research
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default SpaceProjects;