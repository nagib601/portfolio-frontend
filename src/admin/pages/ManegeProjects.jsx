import React, { useEffect, useState } from 'react';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ total: 0, today: 0, totalProjects: 0 });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Updated Form State with Tech & Video
  const [project, setProject] = useState({ 
    title: '', image: '', link: '', description: '', tech: '', video: '' 
  });

  const API_BASE = "http://localhost:5000/admin";

  const fetchData = async () => {
    try {
      const [statsRes, projRes] = await Promise.all([
        fetch(`${API_BASE}/viewers/stats`),
        fetch(`${API_BASE}/projects/all`) // Updated Route
      ]);
      const statsData = await statsRes.json();
      const projData = await projRes.json();

      if (statsData.success) setStats(statsData);
      if (projData.success) setProjects(projData.projects);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Permanent Delete?")) {
      await fetch(`${API_BASE}/projects/delete/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/projects/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setProject({ title: '', image: '', link: '', description: '', tech: '', video: '' });
        fetchData();
      }
    } catch (err) {
      alert("Error adding project");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-10 border-b border-gray-900 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter">PROJECT_CONTROL_CENTER</h1>
            <p className="text-blue-500 text-xs mt-1 uppercase tracking-widest">Active nodes: {projects.length}</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition-all">
            + DEPLOY_NEW_PROJECT
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="text-center py-20 text-blue-500 animate-pulse">RESOURCES_LOADING...</div>
          ) : (
            projects.map((proj) => (
              <div key={proj._id} className="bg-[#111] border border-gray-800 p-4 rounded-xl flex items-center justify-between group hover:border-blue-500/40 transition-all">
                <div className="flex items-center gap-4">
                  <img src={proj.image} alt="" className="w-14 h-14 rounded object-cover border border-gray-800" />
                  <div>
                    <h3 className="text-white font-bold">{proj.title}</h3>
                    <p className="text-[10px] text-gray-500 font-mono truncate max-w-xs">{proj.link}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(proj._id)} className="text-gray-600 hover:text-red-500 text-xs font-bold border border-gray-800 px-3 py-1 rounded hover:border-red-500/50 transition-all">
                  TERMINATE
                </button>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] border border-gray-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gray-900/50 px-6 py-4 border-b border-gray-800 flex justify-between">
                <span className="text-xs font-bold text-blue-400">ENTRY_FORM.SH</span>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <input type="text" placeholder="Title" required className="w-full bg-black border border-gray-800 p-3 rounded-lg focus:border-blue-500 outline-none text-sm" value={project.title} onChange={(e)=>setProject({...project, title: e.target.value})} />
                <input type="text" placeholder="Image URL" required className="w-full bg-black border border-gray-800 p-3 rounded-lg focus:border-blue-500 outline-none text-sm" value={project.image} onChange={(e)=>setProject({...project, image: e.target.value})} />
                <input type="text" placeholder="Live/Github Link" required className="w-full bg-black border border-gray-800 p-3 rounded-lg focus:border-blue-500 outline-none text-sm" value={project.link} onChange={(e)=>setProject({...project, link: e.target.value})} />
                <input type="text" placeholder="Tech (e.g. React, Node, Tailwind)" className="w-full bg-black border border-gray-800 p-3 rounded-lg focus:border-blue-500 outline-none text-sm" value={project.tech} onChange={(e)=>setProject({...project, tech: e.target.value})} />
                <input type="text" placeholder="Video URL (Optional)" className="w-full bg-black border border-gray-800 p-3 rounded-lg focus:border-blue-500 outline-none text-sm" value={project.video} onChange={(e)=>setProject({...project, video: e.target.value})} />
                <textarea placeholder="Description..." rows="3" required className="w-full bg-black border border-gray-800 p-3 rounded-lg focus:border-blue-500 outline-none text-sm" value={project.description} onChange={(e)=>setProject({...project, description: e.target.value})} />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg">
                  PUSH_TO_PRODUCTION
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProjects;