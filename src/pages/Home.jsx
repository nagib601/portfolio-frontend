import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

// --- Custom Hooks ---
const useTypewriter = (words, speed = 80, pause = 2000) => {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIdx % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) setTimeout(() => setIsDeleting(true), pause);
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIdx((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words, speed, pause]);

  return text;
};

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

// --- Sub-Components ---
const SkillCard = ({ src, alt, label, delay, isDark }) => {
  const [ref, visible] = useScrollReveal();
  
  return (
    <div
      ref={ref}
      className={`group p-6 rounded-xl flex flex-col items-center justify-center gap-4 cursor-default border backdrop-blur-md transition-all duration-500
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        ${isDark ? 'bg-[#111111]/80 border-gray-800 hover:shadow-[0_0_20px_var(--accent-shadow)]' 
                 : 'bg-white/70 border-indigo-50 shadow-sm hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)]'}
        hover:-translate-y-2 hover:border-[var(--accent)]`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img
        src={src}
        alt={alt}
        className={`w-14 h-14 opacity-60 group-hover:opacity-100 transition-all duration-300
          ${alt === 'Express.js' && isDark ? 'invert' : ''}
          group-hover:drop-shadow-[0_0_10px_var(--accent)]`}
      />
      <span className={`font-mono text-sm transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {label}
      </span>
    </div>
  );
};

const DeveloperCodeBox = ({ isDark, isVisible }) => {
  const codeLines = [
    { text: <><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> <span style={{ color: 'var(--accent)' }}>=</span> {'{'}</>, indent: 0 },
    { text: <>name: <span className={isDark ? 'text-green-400' : 'text-cyan-600'}>'Nagib'</span>,</>, indent: 6 },
    { text: <>role: <span className={isDark ? 'text-green-400' : 'text-cyan-600'}>'MERN Dev'</span>,</>, indent: 6 },
    { text: <>github: <span className={isDark ? 'text-green-400' : 'text-cyan-600'}>'nagib601'</span>,</>, indent: 6 },
    { text: <>skills: [<span className={isDark ? 'text-green-400' : 'text-cyan-600'}>'MERN'</span>, <span className={isDark ? 'text-green-400' : 'text-cyan-600'}>'Firebase'</span>],</>, indent: 6 },
    { text: <>isOnline: <span className="text-orange-400">true</span> <span className="inline-block w-2 h-2 rounded-full bg-green-500 ml-1 animate-pulse shadow-[0_0_6px_#22c55e]"></span>,</>, indent: 6 },
    { text: <>{'};'}</>, indent: 0 },
  ];

  return (
    <div className={`relative w-full max-w-md rounded-xl p-6 flex flex-col border backdrop-blur-xl transition-all duration-700 delay-500 code-box-float
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
      ${isDark ? 'bg-[#0d0d0d]/90 border-gray-800' : 'bg-white/80 border-indigo-50 shadow-lg'}`}>
      
      <div className="flex gap-2 mb-5 pb-4 border-b border-inherit opacity-50">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-auto font-mono text-xs opacity-50">developer.js</span>
      </div>

      <div className={`font-mono text-sm md:text-base space-y-2 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
        {codeLines.map((line, i) => (
          <p key={i} className="transition-all duration-500"
             style={{ 
               paddingLeft: `${line.indent * 4}px`,
               opacity: isVisible ? 1 : 0,
               transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
               transitionDelay: `${800 + (i * 100)}ms` 
             }}>
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---
const Home = () => {
  const { isDark } = useTheme();
  const [heroVisible, setHeroVisible] = useState(false);
  const [skillsRef, skillsVisible] = useScrollReveal();
  const typedRole = useTypewriter(['MERN Stack Developer', 'React Developer', 'Node.js Engineer', 'Full Stack Developer']);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const skills = [
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React', label: 'React', delay: 0 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind', label: 'Tailwind CSS', delay: 80 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js', label: 'Node.js', delay: 160 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', alt: 'Express.js', label: 'Express.js', delay: 240 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB', label: 'MongoDB', delay: 320 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', alt: 'Firebase', label: 'Firebase', delay: 400 },
  ];

  return (
    <div className={`overflow-hidden relative transition-colors duration-300 min-h-screen ${isDark ? 'text-white' : 'text-slate-900'}`}>
      
      <style>{`
        @keyframes floatY { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .code-box-float { animation: floatY 5s ease-in-out infinite; }
        .name-gradient {
          background: linear-gradient(90deg, var(--accent), #a855f7, var(--accent));
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 4s ease-in-out infinite;
        }
        .cursor-blink {
          display: inline-block; width: 3px; height: 1em; background: var(--accent);
          margin-left: 4px; vertical-align: text-bottom; animation: blink 1s step-end infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pt-32 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className={`inline-block px-4 py-2 rounded-full border transition-all duration-700
              ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              ${isDark ? 'bg-gray-900/60 border-gray-700' : 'bg-white/60 border-indigo-50 shadow-sm'}`}>
              <span className="font-mono text-sm text-[var(--accent)]">
                &gt; console.log(<span className={isDark ? 'text-green-400' : 'text-cyan-600'}>"Hello, World!"</span>);
              </span>
            </div>

            <div className={`transition-all duration-700 delay-200 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Hi, I'm <br /> <span className="name-gradient">Nagib</span>
              </h1>
            </div>

            <div className={`transition-all duration-700 delay-400 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <h2 className="text-2xl md:text-3xl font-mono h-10">
                <span className="text-[var(--accent)]">{typedRole}</span>
                <span className="cursor-blink"></span>
              </h2>
            </div>

            <p className={`text-lg max-w-lg leading-relaxed transition-all duration-700 delay-500
              ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              I craft <span className="font-medium text-[var(--accent)]">scalable</span>, high-performance web applications with clean architecture and pixel-perfect UI.
            </p>

            <div className={`flex flex-wrap gap-4 pt-4 transition-all duration-700 delay-700 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <Link to="/contact" className="group relative px-8 py-3 rounded-md font-bold font-mono border-2 border-[var(--accent)] text-[var(--accent)] overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_var(--accent-shadow)]">
                <span className="relative z-10 group-hover:text-white transition-colors">Hire Me</span>
                <span className="absolute inset-0 bg-[var(--accent)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
              </Link>
              <Link to="/projects" className={`group relative px-8 py-3 rounded-md font-bold font-mono border-2 overflow-hidden transition-all duration-300
                ${isDark ? 'border-gray-700 text-gray-300 hover:border-[var(--accent)]' : 'border-slate-200 text-slate-700 hover:border-[var(--accent)]'}`}>
                <span className="relative z-10 group-hover:text-white transition-colors">View Projects</span>
                <span className="absolute inset-0 bg-[var(--accent)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <DeveloperCodeBox isDark={isDark} isVisible={heroVisible} />
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION (Updated Grid Layout) --- */}
      <section ref={skillsRef} className="py-24 px-6 max-w-5xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${skillsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="font-mono text-xs mb-3 tracking-[0.3em] uppercase text-[var(--accent)] opacity-70">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-bold font-mono">
            <span className="text-[var(--accent)]">&lt;</span> Tech Stack <span className="text-purple-500">/&gt;</span>
          </h2>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-[var(--accent)] to-purple-500"></div>
        </div>

        {/* ৩টি কলামের গ্রিড: যার ফলে ৬টি আইটেম থাকলে ৩x২ আকারে সাজাবে */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <SkillCard key={skill.alt} {...skill} isDark={isDark} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;