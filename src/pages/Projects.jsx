import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // টেক স্ট্যাক যদি ডেটাবেসে স্ট্রিং হিসেবে থাকে তবে তাকে অ্যারে করা
  const techStack = Array.isArray(project.tech) ? project.tech : ["MERN", "React", "Node.js"];

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 
      ${project.featured ? 'md:col-span-2 md:row-span-2' : 'col-span-1'}
      ${
        isDark
          ? 'bg-white/[0.03] border border-white/10 hover:border-[var(--accent)] hover:shadow-[0_0_30px_var(--accent-shadow)]'
          : 'bg-white/60 backdrop-blur-xl border border-white hover:border-[var(--accent)] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:shadow-[var(--accent-shadow)]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Section */}
      <div className={`relative w-full overflow-hidden ${project.featured ? 'h-72 md:h-96' : 'h-48'}`}>
        <img
          src={project.image}
          alt={project.title}
          className={`h-full w-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Video Preview (যদি থাকে) */}
        {project.video && isHovered && (
          <div className="absolute inset-0 bg-black/20">
            <video
              src={project.video}
              autoPlay loop muted playsInline
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Hover Action Buttons */}
        <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-500 bg-black/40 backdrop-blur-sm ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <a href={project.link} target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-white hover:scale-110 transition-transform">
            <ExternalLink size={20} />
          </a>
          {/* যদি গিথুব লিঙ্ক আলাদা থাকে তবে এখানে দেবেন, নাহলে লিঙ্ক ব্যবহার করবেন */}
          <a href={project.link} target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black hover:scale-110 transition-transform">
            <Github size={20} />
          </a>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6 md:p-8">
        <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          {project.title}
        </h3>
        <p className={`mb-6 flex-grow text-sm md:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full 
              ${isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-700'}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { isDark } = useTheme();
  const [dbProjects, setDbProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডেটাবেস থেকে প্রজেক্ট নিয়ে আসা
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/admin/viewers/all-projects');
        const data = await res.json();
        if (data.success) {
          setDbProjects(data.projects);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="py-24 text-center text-blue-500 font-mono">LOADING_PROJECTS...</div>;

  return (
    <section className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Featured <span style={{ color: 'var(--accent)' }}>Projects</span>
        </h2>
        <p className={`max-w-2xl mx-auto text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Exploring the boundaries of MERN stack development through creative projects.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(0,_1fr)]">
        {dbProjects.map((project, index) => (
          // প্রথম প্রজেক্টটিকে featured স্টাইল দেওয়ার জন্য (ঐচ্ছিক)
          <ProjectCard key={project._id} project={{...project, featured: index === 0}} />
        ))}
        
        {dbProjects.length === 0 && (
            <div className="col-span-full text-center py-20 opacity-50 italic text-gray-500">
                No projects found in the database. Add some from admin panel.
            </div>
        )}
      </div>
    </section>
  );
};

export default Projects;