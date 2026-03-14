import React, { useEffect, useState } from 'react';
import { FiUsers, FiLayers, FiPlus, FiTrash2, FiActivity } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, today: 0, totalProjects: 0 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', image: '', link: '', description: '' });

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    try {
      const [statsRes, projRes] = await Promise.all([
        fetch(`${API_URL}/admin/viewers/stats`),
        fetch(`${API_URL}/admin/projects/all`)
      ]);
      const statsData = await statsRes.json();
      const projData = await projRes.json();

      if (statsData.success) setStats(statsData);
      if (projData.success) setProjects(projData.projects);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/admin/projects/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewProject({ title: '', image: '', link: '', description: '' });
        Swal.fire("Success", "Project added!", "success");
        fetchData();
      }
    } catch (err) {
      Swal.fire("Error", "Could not add project", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`${API_URL}/admin/projects/delete/${id}`, { method: 'DELETE' });
        fetchData();
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent italic">
              NAGIB_CONTROL_CENTER
            </h1>
            <p className="text-gray-500 font-mono text-sm tracking-widest mt-1">v2.0.4 - SYSTEM ACTIVE</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            <FiPlus /> Add Project
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Today's Views" value={stats.today} icon={<FiActivity className="text-emerald-400" />} color="emerald" />
          <StatCard label="Total Visitors" value={stats.total} icon={<FiUsers className="text-blue-400" />} color="blue" />
          <StatCard label="Live Projects" value={stats.totalProjects} icon={<FiLayers className="text-amber-400" />} color="amber" />
        </div>

        {/* Project List */}
        <div className="bg-[#0f0f0f] border border-gray-900 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
            Project Management
          </h2>
          
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-10 opacity-50 italic">Fetching from database...</div>
            ) : (
              projects.map((proj) => (
                <div key={proj._id} className="flex items-center justify-between p-4 bg-[#161616] border border-gray-800 rounded-2xl hover:border-blue-500/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <img src={proj.image} alt="" className="w-14 h-14 rounded-xl object-cover ring-2 ring-gray-800" />
                    <div>
                      <h4 className="font-bold text-gray-200 group-hover:text-blue-400 transition-colors">{proj.title}</h4>
                      <p className="text-xs text-gray-500 truncate max-w-[200px] md:max-w-sm">{proj.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(proj._id)}
                    className="p-3 bg-red-900/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#111111] border border-gray-800 w-full max-w-xl rounded-[2rem] overflow-hidden shadow-3xl">
              <div className="px-8 py-6 border-b border-gray-800 flex justify-between items-center">
                <h3 className="text-xl font-bold">Deploy New Project</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white text-2xl">&times;</button>
              </div>
              <form onSubmit={handleAddProject} className="p-8 space-y-5">
                <input 
                  type="text" placeholder="Project Name" required
                  className="w-full bg-[#0a0a0a] border border-gray-900 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all text-white"
                  value={newProject.title} onChange={(e)=>setNewProject({...newProject, title: e.target.value})}
                />
                <input 
                  type="text" placeholder="Thumbnail Image URL" required
                  className="w-full bg-[#0a0a0a] border border-gray-900 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all text-white"
                  value={newProject.image} onChange={(e)=>setNewProject({...newProject, image: e.target.value})}
                />
                <input 
                  type="text" placeholder="Live URL or Repository Link" required
                  className="w-full bg-[#0a0a0a] border border-gray-900 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all text-white"
                  value={newProject.link} onChange={(e)=>setNewProject({...newProject, link: e.target.value})}
                />
                <textarea 
                  placeholder="Tell something about this project..." rows="3" required
                  className="w-full bg-[#0a0a0a] border border-gray-900 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all text-white"
                  value={newProject.description} onChange={(e)=>setNewProject({...newProject, description: e.target.value})}
                ></textarea>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all">
                  PUSH TO DATABASE
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-[#0f0f0f] border border-gray-900 p-6 rounded-3xl shadow-xl transition-transform hover:scale-[1.02]">
    <div className="flex justify-between items-start mb-4">
      <span className="bg-gray-900 p-3 rounded-2xl text-xl">{icon}</span>
      <span className={`text-${color}-500 text-xs font-bold font-mono px-2 py-1 bg-${color}-500/10 rounded-lg`}>+LIVE</span>
    </div>
    <p className="text-gray-500 text-sm font-medium">{label}</p>
    <h2 className="text-4xl font-black mt-1">{value}</h2>
  </div>
);

export default Dashboard;