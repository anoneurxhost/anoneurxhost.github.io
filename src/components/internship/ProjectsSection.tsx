import { ExternalLink, Github, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <Code2 className="mr-2 w-5 h-5 text-purple-400" />
        Projects Portfolio
      </h3>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">{project.title}</h4>
                <p className="text-gray-300 mb-4">{project.description}</p>
              </div>
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm">View Code</span>
                </a>
              )}
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-400 mb-2">Technologies Used:</h5>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <Badge 
                    key={techIndex} 
                    className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;