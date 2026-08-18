import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Github, Star } from "lucide-react";
import OSPage from "./OSPage";
import { projects } from "./data";

const OSProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((entry) => entry.id === id);

  if (!project) {
    return (
      <OSPage>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white">
          <h1 className="text-2xl font-semibold">Project not found</h1>
          <Link to="/opensource/projects" className="mt-4 inline-block text-blue-300">Back to projects</Link>
        </div>
      </OSPage>
    );
  }

  return (
    <OSPage>
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <Link to="/opensource/projects" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Project</p>
            <h1 className="mt-2 text-4xl font-bold text-white">{project.name}</h1>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-2 text-sm text-blue-100">
            <Star className="h-4 w-4" /> {project.stars.toLocaleString()} stars
          </div>
        </div>

        <p className="mb-6 text-lg text-slate-300">{project.description}</p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Language</p>
            <p className="mt-2 text-lg font-semibold text-white">{project.language}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Tags</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200">{tag}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Repository</p>
            <a href={`https://github.com/anoneurx/${project.id}`} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200">
              <Github className="h-4 w-4" /> Open on GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/20 p-5">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-white">
            <BookOpen className="h-5 w-5 text-blue-300" /> README
          </h2>
          <pre className="overflow-x-auto whitespace-pre-wrap text-sm text-slate-300">
{`# ${project.name}

${project.description}

## Highlights
- Community-maintained and open by default.
- Built with ${project.language}.
- Designed for secure, scalable deployment.

## Status
Active development with public releases, review workflows, and contributor onboarding.`}
          </pre>
        </div>
      </div>
    </OSPage>
  );
};

export default OSProjectDetail;
