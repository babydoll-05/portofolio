'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../../components/ui/Loader';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  organisasi: string;
  gdriveUrl: string;
  projectUrl: string;
  demoUrl: string;
  githubUrl: string;
  videoUrl: string;
}

const EMPTY_FORM: Omit<Project, 'id'> = {
  title: '',
  description: '',
  image: '🚀',
  tags: [],
  category: 'personal',
  organisasi: '',
  gdriveUrl: '',
  projectUrl: '',
  demoUrl: '',
  githubUrl: '',
  videoUrl: '',
};

const CATEGORIES = [
  { id: 'web3', label: 'Web3' },
  { id: 'organization', label: 'Organization' },
  { id: 'personal', label: 'Personal' },
  { id: 'open-source', label: 'Open Source' },
];

const EMOJIS = ['🚀','💡','🎨','🔗','🏢','✅','🌤️','🎭','💰','🎮','📱','🌍','⚡','🛠️','🔥'];

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [tagsInput, setTagsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [msg, setMsg] = useState('');
  const [iconTab, setIconTab] = useState<'emoji' | 'upload'>('emoji');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    if (res.status === 401) { router.push('/admin'); return; }
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setTagsInput('');
    setEditingId(null);
    setIconTab('emoji');
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setForm({ title: p.title, description: p.description, image: p.image, tags: p.tags, category: p.category, organisasi: p.organisasi || '', gdriveUrl: p.gdriveUrl || '', projectUrl: p.projectUrl || '', demoUrl: p.demoUrl || '', githubUrl: p.githubUrl || '', videoUrl: p.videoUrl || '' });
    setTagsInput(p.tags.join(', '));
    setEditingId(p.id);
    setIconTab(p.image.startsWith('/') ? 'upload' : 'emoji');
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (res.ok) {
      const { url } = await res.json();
      setForm(f => ({ ...f, image: url }));
    } else {
      setMsg('Gagal upload gambar ❌');
    }
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean) };

    const res = editingId
      ? await fetch(`/api/projects/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      : await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

    if (res.ok) {
      setMsg(editingId ? 'Project berhasil diupdate! ✅' : 'Project berhasil ditambahkan! ✅');
      setShowForm(false);
      fetchProjects();
    } else {
      setMsg('Gagal menyimpan ❌');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMsg('Project dihapus ✅');
      fetchProjects();
    }
    setDeleteConfirm(null);
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Kelola portofolio kamu</p>
          </div>
          <div className="flex gap-3">
            <a href="/" target="_blank" className="px-4 py-2 text-sm text-gray-300 border border-[#a855f7]/30 rounded-xl hover:border-[#a855f7] transition-all">
              🌐 Lihat Site
            </a>
            <button onClick={handleLogout} className="px-4 py-2 text-sm text-red-400 border border-red-400/30 rounded-xl hover:border-red-400 transition-all">
              Logout
            </button>
          </div>
        </div>

        {/* Alert */}
        <AnimatePresence>
          {msg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-4 p-3 bg-[#a855f7]/20 border border-[#a855f7]/40 rounded-xl text-white text-sm text-center">
              {msg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Section */}
        <div className="bg-[#130a24]/80 backdrop-blur-xl rounded-2xl border border-[#a855f7]/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">🗂️ Projects ({projects.length})</h2>
            <button onClick={openAdd}
              className="px-4 py-2 bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity">
              + Tambah Project
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10"><Loader /></div>
          ) : projects.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Belum ada project. Tambahkan yang pertama!</p>
          ) : (
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-4 bg-[#1a0e2e]/60 rounded-xl border border-[#a855f7]/10 hover:border-[#a855f7]/30 transition-all">
                  <span className="text-2xl">{p.image}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">{p.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-[#a855f7]/20 text-[#c084fc] rounded-full">{p.category}</span>
                      {p.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs text-gray-500">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openEdit(p)} className="px-3 py-1.5 text-xs text-[#c084fc] border border-[#a855f7]/30 rounded-lg hover:bg-[#a855f7]/10 transition-all">
                      ✏️ Edit
                    </button>
                    {deleteConfirm === p.id ? (
                      <div className="flex gap-1">
                        <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 text-xs text-white bg-red-500 rounded-lg">Hapus?</button>
                        <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 text-xs text-gray-400 border border-gray-600 rounded-lg">Batal</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(p.id)} className="px-3 py-1.5 text-xs text-red-400 border border-red-400/30 rounded-lg hover:bg-red-400/10 transition-all">
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#130a24] border border-[#a855f7]/30 rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">{editingId ? '✏️ Edit Project' : '➕ Tambah Project'}</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                {/* Icon picker */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Icon / Gambar</label>

                  {/* Tabs */}
                  <div className="flex gap-2 mb-3">
                    <button type="button" onClick={() => setIconTab('emoji')}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-all ${iconTab === 'emoji' ? 'bg-[#a855f7] text-white' : 'bg-[#1a0e2e] text-gray-400 border border-[#a855f7]/30 hover:border-[#a855f7]/60'}`}>
                      Emoji
                    </button>
                    <button type="button" onClick={() => setIconTab('upload')}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-all ${iconTab === 'upload' ? 'bg-[#a855f7] text-white' : 'bg-[#1a0e2e] text-gray-400 border border-[#a855f7]/30 hover:border-[#a855f7]/60'}`}>
                      Upload Gambar
                    </button>
                  </div>

                  {iconTab === 'emoji' ? (
                    <div className="flex flex-wrap gap-2">
                      {EMOJIS.map(e => (
                        <button type="button" key={e} onClick={() => setForm(f => ({ ...f, image: e }))}
                          className={`w-9 h-9 text-xl rounded-lg transition-all ${form.image === e ? 'bg-[#a855f7]/40 border border-[#a855f7]' : 'bg-[#1a0e2e] border border-transparent hover:border-[#a855f7]/40'}`}>
                          {e}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[#a855f7]/40 rounded-xl cursor-pointer hover:border-[#a855f7] transition-all bg-[#1a0e2e]">
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                        {uploading ? (
                          <p className="text-sm text-[#c084fc]">Mengupload...</p>
                        ) : form.image.startsWith('/') ? (
                          <div className="flex flex-col items-center gap-2">
                            <img src={form.image} alt="preview" className="h-16 w-auto object-contain rounded" />
                            <p className="text-xs text-gray-400">Klik untuk ganti gambar</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-gray-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <p className="text-xs">Klik untuk upload gambar</p>
                            <p className="text-xs text-gray-500">PNG, JPG, WebP</p>
                          </div>
                        )}
                      </label>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Judul *</label>
                  <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#1a0e2e] border border-[#a855f7]/30 focus:border-[#a855f7] outline-none text-white text-sm" placeholder={form.category === 'organization' ? 'Nama kegiatan/event...' : 'Nama project...'} />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Kategori</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#1a0e2e] border border-[#a855f7]/30 focus:border-[#a855f7] outline-none text-white text-sm">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>

                {form.category === 'organization' ? (
                  /* ===== FORM ORGANIZATION ===== */
                  <>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Organisasi *</label>
                      <input required value={form.organisasi} onChange={e => setForm(f => ({ ...f, organisasi: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-[#1a0e2e] border border-[#a855f7]/30 focus:border-[#a855f7] outline-none text-white text-sm" placeholder="Nama organisasi..." />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Deskripsi *</label>
                      <textarea required rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-[#1a0e2e] border border-[#a855f7]/30 focus:border-[#a855f7] outline-none text-white text-sm resize-none" placeholder="Deskripsi kegiatan..." />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-1">
                        Link Google Drive <span className="text-gray-500 text-xs">(opsional)</span>
                      </label>
                      <input type="url" value={form.gdriveUrl} onChange={e => setForm(f => ({ ...f, gdriveUrl: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-[#1a0e2e] border border-[#a855f7]/30 focus:border-[#a855f7] outline-none text-white text-sm" placeholder="https://drive.google.com/..." />
                    </div>
                  </>
                ) : (
                  /* ===== FORM PROJECT BIASA ===== */
                  <>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Deskripsi *</label>
                      <textarea required rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-[#1a0e2e] border border-[#a855f7]/30 focus:border-[#a855f7] outline-none text-white text-sm resize-none" placeholder="Deskripsi singkat project..." />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Tags (pisahkan dengan koma)</label>
                      <input value={tagsInput} onChange={e => setTagsInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#1a0e2e] border border-[#a855f7]/30 focus:border-[#a855f7] outline-none text-white text-sm" placeholder="React, Node.js, TypeScript..." />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Link Project</label>
                      <input type="url" value={form.projectUrl} onChange={e => setForm(f => ({ ...f, projectUrl: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-[#1a0e2e] border border-[#a855f7]/30 focus:border-[#a855f7] outline-none text-white text-sm" placeholder="https://dorahacks.io/..." />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Link Demo App/Web</label>
                      <input type="url" value={form.demoUrl} onChange={e => setForm(f => ({ ...f, demoUrl: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-[#1a0e2e] border border-[#a855f7]/30 focus:border-[#a855f7] outline-none text-white text-sm" placeholder="https://namaapp.com..." />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-1">GitHub URL</label>
                      <input type="url" value={form.githubUrl} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-[#1a0e2e] border border-[#a855f7]/30 focus:border-[#a855f7] outline-none text-white text-sm" placeholder="https://github.com/..." />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-1">
                        Link Video Demo <span className="text-gray-500 text-xs">(opsional)</span>
                      </label>
                      <input type="url" value={form.videoUrl} onChange={e => setForm(f => ({ ...f, videoUrl: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-[#1a0e2e] border border-[#a855f7]/30 focus:border-[#a855f7] outline-none text-white text-sm" placeholder="https://youtube.com/..." />
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)}
                    className="flex-1 py-2.5 text-sm text-gray-400 border border-gray-600 rounded-xl hover:border-gray-400 transition-all">
                    Batal
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex-1 py-2.5 text-sm text-white bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity font-semibold">
                    {saving ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
