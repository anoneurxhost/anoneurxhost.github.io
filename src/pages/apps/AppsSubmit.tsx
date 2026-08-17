import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Image as ImageIcon, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import AppsLayout from "./AppsLayout";
import { categories } from "./appsData";

const AppsSubmit = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("App submitted for review");
      setSubmitting(false);
      navigate("/apps/dashboard");
    }, 800);
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2 block">{label}</label>
      {children}
    </div>
  );

  const inputCls = "w-full h-10 px-4 rounded-lg bg-white/[0.04] border border-white/10 backdrop-blur-2xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400/40";

  return (
    <AppsLayout title="Submit App · Anoneurx Apps">
      <section className="px-4 pt-12 pb-20">
        <div className="container-responsive max-w-3xl">
          <h1 className="text-3xl font-bold text-white">Submit a New App</h1>
          <p className="text-sm text-slate-400 mt-2">Fill out the details below. Your app will be reviewed within 24-48 hours.</p>

          <form onSubmit={onSubmit} className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="App Name"><input required className={inputCls} placeholder="My Amazing App" /></Field>
              <Field label="Category">
                <select required className={inputCls}>
                  <option value="" className="bg-slate-900">Select a category</option>
                  {categories.map((c) => <option key={c.name} className="bg-slate-900">{c.name}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Description">
              <textarea required rows={4} className={`${inputCls} h-auto py-3`} placeholder="Tell users what your app does…" />
            </Field>

            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Platform">
                <select required className={inputCls}>
                  {["Web", "Windows", "macOS", "Linux", "Android", "iOS"].map((p) => <option key={p} className="bg-slate-900">{p}</option>)}
                </select>
              </Field>
              <Field label="Price (USD)"><input type="number" min={0} step="0.01" className={inputCls} placeholder="0 for free" /></Field>
              <Field label="Website"><input type="url" className={inputCls} placeholder="https://" /></Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Upload App File">
                <label className="flex items-center justify-center gap-2 h-10 rounded-lg border border-dashed border-white/15 bg-white/[0.02] text-xs text-slate-400 cursor-pointer hover:border-blue-400/40 hover:text-white transition">
                  <Upload className="h-4 w-4" /> Choose file
                  <input type="file" className="hidden" />
                </label>
              </Field>
              <Field label="Screenshots">
                <label className="flex items-center justify-center gap-2 h-10 rounded-lg border border-dashed border-white/15 bg-white/[0.02] text-xs text-slate-400 cursor-pointer hover:border-blue-400/40 hover:text-white transition">
                  <ImageIcon className="h-4 w-4" /> Upload images
                  <input type="file" multiple accept="image/*" className="hidden" />
                </label>
              </Field>
            </div>

            <Field label="Privacy Policy URL"><input type="url" className={inputCls} placeholder="https://yourapp.com/privacy" /></Field>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 hover:-translate-y-0.5 transition disabled:opacity-50"
            >
              {submitting ? "Submitting…" : <>Submit App <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
        </div>
      </section>
    </AppsLayout>
  );
};

export default AppsSubmit;
