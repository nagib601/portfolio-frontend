import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import image from '../img/looking-moga-2.png';

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
};

const SectionTitle = ({ label, title }) => {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className="text-center mb-16"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <p className="font-mono text-sm mb-3 tracking-widest uppercase" style={{ color: 'var(--accent)', opacity: 0.6 }}>{label}</p>
      <h2 className="text-3xl md:text-4xl font-bold font-mono">
        <span style={{ color: 'var(--accent)' }}>{'<'}</span>
        {title}
        <span className="text-purple-500">{'/>'}</span>
      </h2>
      <div className="w-24 h-[2px] mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(to right, var(--accent), #a855f7)' }}></div>
    </div>
  );
};

const TimelineItem = ({ item, index, isDark }) => {
  const [ref, visible] = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(30px)',
        transition: `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms`,
      }}
    >
      <div
        className="absolute left-[18px] w-4 h-4 rounded-full border-2"
        style={{
          borderColor: 'var(--accent)',
          background: isDark ? '#050505' : '#f0f4ff',
          boxShadow: '0 0 10px var(--accent-shadow)',
          marginTop: '24px',
        }}
      />
      <div
        className="p-6 rounded-xl border transition-all duration-300"
        style={{
          background: isDark ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.8)',
          borderColor: isDark ? '#1f2937' : '#e5e7eb',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.boxShadow = '0 0 20px var(--accent-shadow)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = isDark ? '#1f2937' : '#e5e7eb';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="font-mono text-xs px-3 py-1 rounded-full text-white" style={{ background: 'var(--accent)' }}>
            {item.type === 'edu' ? '🎓 Education' : '💼 Experience'}
          </span>
          <span className="font-mono text-xs" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>{item.year}</span>
        </div>
        <h3 className="text-lg font-bold mb-1">{item.title}</h3>
        <p className="font-mono text-sm mb-2" style={{ color: 'var(--accent)' }}>{item.place}</p>
        <p className="text-sm leading-relaxed" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>{item.desc}</p>
      </div>
    </div>
  );
};

const HobbyCard = ({ hobby, index, isDark }) => {
  const [ref, visible] = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className="p-6 rounded-xl border text-center cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms, border-color 0.3s, box-shadow 0.3s`,
        background: isDark ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.8)',
        borderColor: isDark ? '#1f2937' : '#e5e7eb',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.boxShadow = '0 0 20px var(--accent-shadow)';
        e.currentTarget.style.transform = 'translateY(-6px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = isDark ? '#1f2937' : '#e5e7eb';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="text-4xl mb-3">{hobby.icon}</div>
      <h3 className="font-bold font-mono mb-2" style={{ color: 'var(--accent)' }}>{hobby.label}</h3>
      <p className="text-sm leading-relaxed" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>{hobby.desc}</p>
    </div>
  );
};

const StatCard = ({ stat, index, isDark }) => {
  const [ref, visible] = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className="text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}
    >
      <p className="text-4xl md:text-5xl font-bold font-mono mb-2" style={{ color: 'var(--accent)' }}>
        {stat.value}
      </p>
      <p className="font-mono text-sm" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>{stat.label}</p>
    </div>
  );
};

const SkillCard = ({ item, isDark }) => (
  <div
    className="p-4 rounded-xl border transition-all duration-300"
    style={{
      background: isDark ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.8)',
      borderColor: isDark ? '#1f2937' : '#e5e7eb',
      backdropFilter: 'blur(8px)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--accent)';
      e.currentTarget.style.boxShadow = '0 0 15px var(--accent-shadow)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = isDark ? '#1f2937' : '#e5e7eb';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xl">{item.icon}</span>
      <p className="font-mono font-bold text-sm" style={{ color: isDark ? '#f3f4f6' : '#111827' }}>{item.title}</p>
    </div>
    <p className="text-xs leading-relaxed" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>{item.skills}</p>
  </div>
);

const About = () => {
  const { isDark } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [heroRef, heroVisible] = useScrollReveal(0.1);
  const [statsRef] = useScrollReveal(0.1);

  const stats = [
    { value: '6+', label: 'Months Experience' },
    { value: '10+', label: 'Projects Built' },
    { value: '6+', label: 'Technologies' },
    { value: '100%', label: 'Dedication' },
  ];

  const skillCards = [
    { icon: '🖥️', title: 'Frontend', skills: 'React, Tailwind CSS, JavaScript, HTML/CSS' },
    { icon: '⚙️', title: 'Backend', skills: 'Node.js, Express.js, MongoDB' },
    { icon: '🔧', title: 'Tools', skills: 'Git, GitHub, Firebase, VS Code' },
    { icon: '📚', title: 'Learning', skills: 'Next.js, TypeScript, PostgreSQL' },
  ];

  const hobbies = [
    { icon: '💻', label: 'Coding', desc: 'Building side projects and exploring new technologies' },
    { icon: '🎮', label: 'Gaming', desc: 'Strategy and open-world games to sharpen problem-solving' },
    { icon: '📚', label: 'Reading', desc: 'Tech blogs, docs, and self-improvement books' },
    { icon: '🎵', label: 'Music', desc: 'Listening to lo-fi while coding late at night' },
    { icon: '🌐', label: 'Open Source', desc: 'Exploring GitHub and contributing to community projects' },
    { icon: '🎨', label: 'UI Design', desc: 'Crafting clean, pixel-perfect interfaces' },
  ];

  const timeline = [
    {
      year: '2024 - Present',
      title: 'MERN Stack Developer',
      place: 'Freelance / Independent',
      desc: 'Building full-stack web applications using MongoDB, Express, React, and Node.js with 6 months of hands-on experience.',
      type: 'work',
    },
    {
      year: 'Sep 2024',
      title: 'Started Web Development Journey',
      place: 'Online Platforms',
      desc: 'Began learning HTML, CSS, JavaScript, and gradually moved into modern frameworks.',
      type: 'work',
    },
    {
      year: '2026 - Present',
      title: 'Higher Secondary Certificate (HSC)',
      place: 'Bangladesh',
      desc: 'Currently pursuing higher education while simultaneously developing professional skills.',
      type: 'edu',
    },
  ];

  return (
    <div
      className="overflow-hidden relative transition-colors duration-300"
      style={{ color: isDark ? 'white' : '#111827', background: 'transparent' }}
    >
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.5); }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 15px var(--accent-shadow); }
          50% { box-shadow: 0 0 28px var(--accent-shadow); }
        }
        .name-gradient {
          background: linear-gradient(90deg, var(--accent), #a855f7, var(--accent));
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease-in-out infinite;
        }
        .avatar-float {
          animation: floatY 5s ease-in-out infinite;
        }
        .social-icon:hover {
          transform: scale(1.15) translateY(-3px);
        }
      `}</style>

      {/* HERO */}
      <div className="px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Avatar */}
          <div
            ref={heroRef}
            className="flex justify-center"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                  opacity: 0.2,
                  filter: 'blur(30px)',
                  transform: 'scale(1.3)',
                }}
              />
              <div
                className="relative w-64 h-64 md:w-80 md:h-87 rounded-2xl border-2 avatar-float overflow-hidden cursor-pointer"
                style={{
                  borderColor: 'var(--accent)',
                  boxShadow: '0 0 40px var(--accent-shadow)',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <img
                  src={image}
                  alt="Chakib Al Nagib"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: hovered ? 'blur(4px) brightness(0.4)' : 'blur(0px) brightness(1)',
                    transition: 'filter 0.4s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }}
                >
                  <p className="font-mono text-xs text-white tracking-widest uppercase" style={{ opacity: 0.7 }}>Find me on</p>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div
                      className="social-icon"
                      onClick={() => window.open('https://github.com/nagib601', '_blank')}
                      style={{
                        cursor: 'pointer',
                        padding: '14px',
                        borderRadius: '14px',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                        transition: 'transform 0.2s ease, background 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    >
                      <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div
                      className="social-icon"
                      onClick={() => window.open('https://linkedin.com/in/nagib601', '_blank')}
                      style={{
                        cursor: 'pointer',
                        padding: '14px',
                        borderRadius: '14px',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#0a66c2',
                        transition: 'transform 0.2s ease, background 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    >
                      <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge */}
              
            </div>
          </div>

          {/* Bio */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            }}
          >
            <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color: 'var(--accent)', opacity: 0.6 }}>About Me</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              I am <span className="name-gradient">Chakib Al Nagib</span>
            </h1>
            <div className="space-y-4" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
              <p className="text-lg leading-relaxed">
                A passionate <span className="font-medium" style={{ color: 'var(--accent)' }}>MERN Stack Developer</span> who loves turning ideas into real, functional web experiences. Self-taught and driven by curiosity.
              </p>
              <p className="font-mono text-xs tracking-widest uppercase mt-2 mb-1" style={{ color: 'var(--accent)', opacity: 0.6 }}>Technical Arsenal</p>
              <div className="grid grid-cols-2 gap-3">
                {skillCards.map((item, i) => (
                  <SkillCard key={i} item={item} isDark={isDark} />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/contact"
                className="relative px-8 py-3 rounded-md font-semibold font-mono overflow-hidden group border-2 transition-all duration-300"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent)', boxShadow: '0 0 12px var(--accent-shadow)' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 28px var(--accent-shadow)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 12px var(--accent-shadow)'}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Hire Me</span>
                <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-sm" style={{ background: 'var(--accent)' }}></span>
              </Link>
              <Link
                to="/contact"
                className="relative px-8 py-3 rounded-md font-semibold font-mono overflow-hidden group border-2 transition-all duration-300"
                style={{ borderColor: isDark ? '#4b5563' : '#d1d5db', color: isDark ? '#d1d5db' : '#4b5563' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 0 20px var(--accent-shadow)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Download CV</span>
                <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-sm" style={{ background: 'var(--accent)' }}></span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div
        ref={statsRef}
        className="px-4 md:px-8 py-12 border-y"
        style={{ borderColor: isDark ? '#1f2937' : '#e5e7eb' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} isDark={isDark} />
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="px-4 md:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <SectionTitle label="My Journey" title="Experience and Education" />
          <div className="relative">
            <div
              className="absolute left-6 top-0 bottom-0 w-[2px]"
              style={{ background: 'linear-gradient(to bottom, var(--accent), #a855f7)' }}
            />
            <div className="space-y-10 pl-16">
              {timeline.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} isDark={isDark} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HOBBIES */}
      <div className="px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <SectionTitle label="Beyond Coding" title="Hobbies and Interests" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {hobbies.map((hobby, i) => (
              <HobbyCard key={i} hobby={hobby} index={i} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;