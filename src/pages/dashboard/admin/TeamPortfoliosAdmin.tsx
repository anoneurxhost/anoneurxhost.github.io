import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Plus, Trash2, Save, Edit3, Search, ExternalLink, Image as ImageIcon, Upload, Loader2, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  fetchAllPortfolios, fetchPortfolio, savePortfolio, deletePortfolio,
  subscribe, emptyPortfolio, uploadTeamMedia,
} from '@/lib/teamStore';
import type { TeamPortfolio, ProjectItem } from '@/data/teamPortfolios';
import { useAuth } from '@/contexts/AuthContext';

const ALLOWED_ADMIN_ROLES = ['ceo', 'hr', 'hod'];

const AccessDenied: React.FC<{ roles: string[] }> = ({ roles }) => (
  <div className="min-h-[70vh] flex items-center justify-center p-6">
    <div className="max-w-md w-full text-center bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-2xl">
      <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
        <ShieldAlert className="w-7 h-7 text-amber-300" />
      </div>
      <h2 className="text-xl font-semibold text-white">Access restricted</h2>
      <p className="text-sm text-white/60 mt-2">
        Managing team portfolios is limited to <span className="text-white/90">CEO, HR, and HOD</span> roles.
      </p>
      <p className="text-xs text-white/40 mt-3">Your roles: {roles.length ? roles.join(', ') : 'none'}</p>
      <Button asChild variant="outline" className="mt-6 border-white/10 bg-white/[0.03]">
        <Link to="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  </div>
);

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 64);
const csvToList = (v: string) => v.split(',').map((x) => x.trim()).filter(Boolean);
const listToCsv = (l: string[]) => (l || []).join(', ');

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-xs uppercase tracking-wider text-white/60">{label}</Label>
    {children}
  </div>
);

const ImageUploader: React.FC<{ value?: string; onChange: (url: string) => void; folder?: string; label?: string }> = ({ value, onChange, folder = 'gallery', label = 'Image' }) => {
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const pick = () => ref.current?.click();
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadTeamMedia(file, folder);
      onChange(url);
      toast.success('Uploaded');
    } catch (err: any) {
      toast.error(err?.message || 'Upload failed');
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = '';
    }
  };
  return (
    <div className="flex items-center gap-3">
      {value ? (
        <img src={value} alt="preview" className="w-14 h-14 rounded-lg object-cover border border-white/10" />
      ) : (
        <div className="w-14 h-14 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/30">
          <ImageIcon className="w-5 h-5" />
        </div>
      )}
      <div className="flex-1 space-y-2">
        <Input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={`${label} URL`} className="bg-white/[0.04] border-white/10 text-xs" />
        <div className="flex gap-2">
          <input ref={ref} type="file" accept="image/*,video/*" hidden onChange={onFile} />
          <Button size="sm" variant="outline" onClick={pick} disabled={busy} className="border-white/10 bg-transparent text-xs">
            {busy ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Upload className="w-3.5 h-3.5 mr-1" />}
            {busy ? 'Uploading' : 'Upload'}
          </Button>
          {value && (
            <Button size="sm" variant="ghost" onClick={() => onChange('')} className="text-rose-300 hover:bg-rose-500/10 text-xs">
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const TeamPortfoliosAdmin: React.FC = () => {
  const { user } = useAuth();
  const userRoles = user?.roles || [];
  const isAllowed = userRoles.some((r) => ALLOWED_ADMIN_ROLES.includes(r));

  const [list, setList] = useState<TeamPortfolio[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [draft, setDraft] = useState<TeamPortfolio | null>(null);
  const [query, setQuery] = useState('');
  const [saving, setSaving] = useState(false);

  const reload = async () => setList(await fetchAllPortfolios());
  useEffect(() => { if (isAllowed) { reload(); const un = subscribe(reload); return un; } }, [isAllowed]);

  if (!isAllowed) return <AccessDenied roles={userRoles} />;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return list.filter((p) =>
      !q || p.name.toLowerCase().includes(q) || p.department.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q),
    );
  }, [list, query]);

  const startEdit = async (slug: string) => {
    const p = await fetchPortfolio(slug);
    if (!p) return;
    setSelectedSlug(slug);
    setDraft(JSON.parse(JSON.stringify(p)));
  };
  const startCreate = () => { setSelectedSlug(null); setDraft(emptyPortfolio('')); };

  const handleSave = async () => {
    if (!draft) return;
    const slug = draft.slug || slugify(draft.name);
    if (!slug) return toast.error('Name or slug required');
    setSaving(true);
    try {
      const next = { ...draft, slug };
      await savePortfolio(next);
      setSelectedSlug(slug);
      setDraft(next);
      toast.success(`Saved ${next.name || slug}`);
    } catch (err: any) {
      toast.error(err?.message || 'Save failed (are you signed in?)');
    } finally { setSaving(false); }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this portfolio?')) return;
    try {
      await deletePortfolio(slug);
      if (selectedSlug === slug) { setSelectedSlug(null); setDraft(null); }
      toast.success('Deleted');
    } catch (err: any) { toast.error(err?.message || 'Delete failed'); }
  };

  const patch = <K extends keyof TeamPortfolio>(key: K, value: TeamPortfolio[K]) => draft && setDraft({ ...draft, [key]: value });

  const updateProject = (idx: number, p: Partial<ProjectItem>) => {
    if (!draft) return;
    const next = [...draft.projects];
    next[idx] = { ...next[idx], ...p };
    patch('projects', next);
  };
  const addProject = () => draft && patch('projects', [...draft.projects, { title: '', description: '', tech: [], image: '' }]);
  const removeProject = (i: number) => draft && patch('projects', draft.projects.filter((_, idx) => idx !== i));

  const addMedia = () => draft && patch('media', [...(draft.media || []), { type: 'image', url: '', caption: '' }]);
  const updateMedia = (i: number, m: Partial<TeamPortfolio['media'][number]>) => {
    if (!draft) return;
    const next = [...(draft.media || [])];
    next[i] = { ...next[i], ...m };
    patch('media', next);
  };
  const removeMedia = (i: number) => draft && patch('media', (draft.media || []).filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Team Portfolios</h1>
          <p className="text-sm text-white/55">Create and edit portfolios shown at <code className="text-primary">/team/&lt;dept&gt;/&lt;slug&gt;</code>. Changes sync live to every visitor.</p>
        </div>
        <Button onClick={startCreate} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> New Portfolio
        </Button>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr] gap-6">
        <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl">
          <CardContent className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search portfolios…" className="pl-9 bg-white/[0.04] border-white/10" />
            </div>
            <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
              {filtered.map((p) => (
                <div
                  key={p.slug}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-colors ${selectedSlug === p.slug ? 'bg-primary/10 border-primary/40' : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'}`}
                  onClick={() => startEdit(p.slug)}
                >
                  <div className="flex items-center gap-3">
                    <img src={p.photo} alt={p.name} className="w-9 h-9 rounded-lg object-cover border border-white/10" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{p.name || <span className="text-white/40">Untitled</span>}</div>
                      <div className="text-[11px] text-white/50 truncate">{p.department || '—'}</div>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <p className="text-sm text-white/50 text-center py-6">No matches.</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl">
          <CardContent className="p-6">
            {!draft ? (
              <div className="text-center py-16 text-white/50">
                <Edit3 className="w-8 h-8 mx-auto mb-3 opacity-60" />
                Select a portfolio to edit, or create a new one.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h2 className="text-lg font-semibold">{draft.name || 'New portfolio'}</h2>
                  <div className="flex gap-2 flex-wrap">
                    {selectedSlug && (
                      <>
                        <Button asChild size="sm" variant="outline" className="border-white/10 bg-transparent">
                          <Link to={`/team/${(draft.department || 'team').toLowerCase().replace(/[^a-z0-9]+/g,'-')}/${draft.slug}`} target="_blank">
                            <ExternalLink className="w-4 h-4 mr-1.5" /> View
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(selectedSlug)} className="border-rose-500/30 text-rose-300 bg-transparent hover:bg-rose-500/10">
                          <Trash2 className="w-4 h-4 mr-1.5" /> Delete
                        </Button>
                      </>
                    )}
                    <Button size="sm" onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90">
                      {saving ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />}
                      Save
                    </Button>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Slug (URL)"><Input value={draft.slug} onChange={(e) => patch('slug', slugify(e.target.value))} className="bg-white/[0.04] border-white/10" /></Field>
                  <Field label="Department"><Input value={draft.department} onChange={(e) => patch('department', e.target.value)} className="bg-white/[0.04] border-white/10" /></Field>
                  <Field label="Name"><Input value={draft.name} onChange={(e) => patch('name', e.target.value)} className="bg-white/[0.04] border-white/10" /></Field>
                  <Field label="Title / Role"><Input value={draft.title} onChange={(e) => patch('title', e.target.value)} className="bg-white/[0.04] border-white/10" /></Field>
                  <Field label="Email"><Input value={draft.email} onChange={(e) => patch('email', e.target.value)} className="bg-white/[0.04] border-white/10" /></Field>
                  <Field label="Location"><Input value={draft.location} onChange={(e) => patch('location', e.target.value)} className="bg-white/[0.04] border-white/10" /></Field>
                  <div className="md:col-span-2">
                    <Field label="Profile Photo">
                      <ImageUploader value={draft.photo} onChange={(url) => patch('photo', url)} folder="photos" label="Photo" />
                    </Field>
                  </div>
                  <div className="md:col-span-2">
                    <Field label="Tagline"><Input value={draft.tagline} onChange={(e) => patch('tagline', e.target.value)} className="bg-white/[0.04] border-white/10" /></Field>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Field label="LinkedIn"><Input value={draft.linkedin || ''} onChange={(e) => patch('linkedin', e.target.value)} className="bg-white/[0.04] border-white/10" /></Field>
                  <Field label="GitHub"><Input value={draft.github || ''} onChange={(e) => patch('github', e.target.value)} className="bg-white/[0.04] border-white/10" /></Field>
                  <Field label="Website"><Input value={draft.website || ''} onChange={(e) => patch('website', e.target.value)} className="bg-white/[0.04] border-white/10" /></Field>
                </div>

                <Field label="Bio">
                  <Textarea value={draft.about.bio} onChange={(e) => patch('about', { ...draft.about, bio: e.target.value })} rows={4} className="bg-white/[0.04] border-white/10" />
                </Field>
                <Field label="Interests (comma-separated)">
                  <Input value={listToCsv(draft.about.interests)} onChange={(e) => patch('about', { ...draft.about, interests: csvToList(e.target.value) })} className="bg-white/[0.04] border-white/10" />
                </Field>

                <Field label="Availability">
                  <div className="grid md:grid-cols-3 gap-2">
                    {(['Consulting', 'Full-time roles', 'Speaking'] as const).map((label) => {
                      const cur = (draft.availability || []).find((a) => a.label === label);
                      const status = cur?.status || 'closed';
                      const setStatus = (s: 'open' | 'limited' | 'closed') => {
                        const others = (draft.availability || []).filter((a) => a.label !== label);
                        patch('availability', [...others, { label, status: s }]);
                      };
                      return (
                        <div key={label} className="flex items-center justify-between gap-2 p-2 rounded bg-white/[0.02] border border-white/[0.06]">
                          <span className="text-xs text-white/70">{label}</span>
                          <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="bg-white/[0.05] border border-white/10 rounded px-2 py-1 text-xs">
                            <option value="open">open</option>
                            <option value="limited">limited</option>
                            <option value="closed">closed</option>
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </Field>

                <div className="grid md:grid-cols-2 gap-4">
                  {(['core', 'languages', 'frameworks', 'tools', 'platforms', 'databases', 'cloud'] as const).map((k) => (
                    <Field key={k} label={`Skills · ${k}`}>
                      <Input value={listToCsv((draft.skills as any)[k] || [])} onChange={(e) => patch('skills', { ...draft.skills, [k]: csvToList(e.target.value) })} className="bg-white/[0.04] border-white/10" />
                    </Field>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs uppercase tracking-wider text-white/60">Projects Gallery</Label>
                    <Button size="sm" variant="outline" onClick={addProject} className="border-white/10 bg-transparent">
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Project
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {draft.projects.map((p, idx) => (
                      <Card key={idx} className="bg-white/[0.02] border-white/[0.06]">
                        <CardContent className="p-4 space-y-3">
                          <div className="grid md:grid-cols-2 gap-3">
                            <Input value={p.title} onChange={(e) => updateProject(idx, { title: e.target.value })} placeholder="Title" className="bg-white/[0.04] border-white/10" />
                            <div className="md:col-span-1">
                              <ImageUploader value={p.image} onChange={(url) => updateProject(idx, { image: url })} folder={`projects/${draft.slug}`} label="Project image" />
                            </div>
                          </div>
                          <Textarea value={p.description} onChange={(e) => updateProject(idx, { description: e.target.value })} placeholder="Description" rows={2} className="bg-white/[0.04] border-white/10" />
                          <div className="grid md:grid-cols-3 gap-3">
                            <Input value={listToCsv(p.tech || [])} onChange={(e) => updateProject(idx, { tech: csvToList(e.target.value) })} placeholder="Tech (comma-separated)" className="bg-white/[0.04] border-white/10" />
                            <Input value={p.demo || ''} onChange={(e) => updateProject(idx, { demo: e.target.value })} placeholder="Demo URL" className="bg-white/[0.04] border-white/10" />
                            <Input value={p.github || ''} onChange={(e) => updateProject(idx, { github: e.target.value })} placeholder="GitHub URL" className="bg-white/[0.04] border-white/10" />
                          </div>
                          <div className="flex justify-end">
                            <Button size="sm" variant="ghost" onClick={() => removeProject(idx)} className="text-rose-300 hover:bg-rose-500/10">
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {draft.projects.length === 0 && <p className="text-sm text-white/40 text-center py-4">No projects yet.</p>}
                  </div>
                </div>

                {/* Media gallery */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs uppercase tracking-wider text-white/60">Media Gallery (photos & videos)</Label>
                    <Button size="sm" variant="outline" onClick={addMedia} className="border-white/10 bg-transparent">
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Media
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {(draft.media || []).map((m, idx) => (
                      <Card key={idx} className="bg-white/[0.02] border-white/[0.06]">
                        <CardContent className="p-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <select value={m.type} onChange={(e) => updateMedia(idx, { type: e.target.value as 'image' | 'video' })} className="bg-white/[0.05] border border-white/10 rounded px-2 py-1 text-xs">
                              <option value="image">image</option>
                              <option value="video">video</option>
                            </select>
                            <Input value={m.caption || ''} onChange={(e) => updateMedia(idx, { caption: e.target.value })} placeholder="Caption" className="bg-white/[0.04] border-white/10 text-xs" />
                            <Button size="sm" variant="ghost" onClick={() => removeMedia(idx)} className="text-rose-300 hover:bg-rose-500/10">
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                          <ImageUploader value={m.url} onChange={(url) => updateMedia(idx, { url })} folder={`gallery/${draft.slug}`} label="Media" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Current focus (comma-separated)">
                    <Input value={listToCsv(draft.currentFocus)} onChange={(e) => patch('currentFocus', csvToList(e.target.value))} className="bg-white/[0.04] border-white/10" />
                  </Field>
                  <Field label="Now building (comma-separated)">
                    <Input value={listToCsv(draft.nowBuilding)} onChange={(e) => patch('nowBuilding', csvToList(e.target.value))} className="bg-white/[0.04] border-white/10" />
                  </Field>
                  <Field label="Favorite tech (comma-separated)">
                    <Input value={listToCsv(draft.favoriteTech)} onChange={(e) => patch('favoriteTech', csvToList(e.target.value))} className="bg-white/[0.04] border-white/10" />
                  </Field>
                  <Field label="Philosophy">
                    <Input value={draft.philosophy} onChange={(e) => patch('philosophy', e.target.value)} className="bg-white/[0.04] border-white/10" />
                  </Field>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamPortfoliosAdmin;
