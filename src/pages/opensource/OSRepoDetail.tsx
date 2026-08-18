import { Link, useParams } from "react-router-dom";
import { Activity, ArrowLeft, GitBranch, Users } from "lucide-react";
import OSPage from "./OSPage";
import { projects } from "./data";

const OSRepoDetail = () => {
  const { id } = useParams();
  const project = projects.find((entry) => entry.id === id);

  if (!project) {
    return (
      <OSPage>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white">
          <h1 className="text-2xl font-semibold">Repository not found</h1>
          <Link to="/opensource/repos" className="mt-4 inline-block text-blue-300">Back to repositories</Link>
        </div>
      </OSPage>
    );
  }

  return (
    <OSPage>
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <Link to="/opensource/repos" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to repositories
        </Link>

        <h1 className="text-4xl font-bold text-white">{project.name}</h1>
        <p className="mt-3 text-lg text-slate-300">{project.description}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
            <div className="flex items-center gap-2 text-slate-400"><GitBranch className="h-4 w-4" /> Language</div>
            <p className="mt-2 text-lg font-semibold text-white">{project.language}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
            <div className="flex items-center gap-2 text-slate-400"><Users className="h-4 w-4" /> Contributors</div>
            <p className="mt-2 text-lg font-semibold text-white">18 maintainers</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
            <div className="flex items-center gap-2 text-slate-400"><Activity className="h-4 w-4" /> Activity</div>
            <p className="mt-2 text-lg font-semibold text-white">High</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/20 p-5">
          <h2 className="text-xl font-semibold text-white">Language breakdown</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </OSPage>
  );
};

export default OSRepoDetail;
