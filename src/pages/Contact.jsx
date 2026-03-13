import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

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

const ContactCard = ({ c, isDark }) => (
  <div
    onClick={() => window.open(c.href, '_blank')}
    className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 cursor-pointer"
    style={{
      background: 'transparent',
      borderColor: isDark ? '#1f2937' : '#e5e7eb',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--accent)';
      e.currentTarget.style.boxShadow = '0 0 16px var(--accent-shadow)';
      e.currentTarget.style.background = 'var(--accent-shadow)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = isDark ? '#1f2937' : '#e5e7eb';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.background = 'transparent';
    }}
  >
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: 'var(--accent-shadow)', color: 'var(--accent)' }}
    >
      {c.icon}
    </div>
    <div>
      <p className="font-mono text-xs" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>{c.label}</p>
      <p className="font-mono text-sm font-medium" style={{ color: isDark ? '#f3f4f6' : '#111827' }}>{c.value}</p>
    </div>
  </div>
);

const Contact = () => {
  const { isDark } = useTheme();
  const [leftRef, leftVisible] = useScrollReveal(0.1);
  const [rightRef, rightVisible] = useScrollReveal(0.1);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const contacts = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      label: 'Email',
      value: 'chakibalnagib1@gmail.com',
      href: 'mailto:chakibalnagib1@gmail.com',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      label: 'GitHub',
      value: 'github.com/nagib601',
      href: 'https://github.com/nagib601',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      label: 'WhatsApp',
      value: '+880 1326-223601',
      href: 'https://wa.me/8801326223601',
    },
  ];

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: `1px solid ${isDark ? '#1f2937' : '#e5e7eb'}`,
    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
    color: isDark ? '#f3f4f6' : '#111827',
    fontFamily: 'monospace',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };

  const handleFocus = e => {
    e.target.style.borderColor = 'var(--accent)';
    e.target.style.boxShadow = '0 0 0 3px var(--accent-shadow)';
  };

  const handleBlur = e => {
    e.target.style.borderColor = isDark ? '#1f2937' : '#e5e7eb';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div
      className="overflow-hidden relative transition-colors duration-300 min-h-screen flex items-center"
      style={{ color: isDark ? 'white' : '#111827', background: 'transparent' }}
    >
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.5); }
        }
        .name-gradient {
          background: linear-gradient(90deg, var(--accent), #a855f7, var(--accent));
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease-in-out infinite;
        }
      `}</style>

      <div className="w-full px-4 md:px-16 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div
            ref={leftRef}
            className="space-y-6"
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            <div>
              <div
                className="inline-block px-3 py-1 rounded-full font-mono text-xs mb-4 border"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-shadow)' }}
              >
                Get In Touch
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                Let us Build <span className="name-gradient">Something Cool.</span>
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                I am open to <span className="font-medium" style={{ color: 'var(--accent)' }}>freelance projects</span>, full-time opportunities, and collaborations. Feel free to reach out anytime.
              </p>
            </div>

            <div className="space-y-3">
              {contacts.map((c, i) => (
                <ContactCard key={i} c={c} isDark={isDark} />
              ))}
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>Follow Us</p>
              <div className="flex gap-3">
                {[
                  { href: 'https://github.com/nagib601', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
                  { href: 'https://linkedin.com/in/nagib601', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { href: 'https://wa.me/8801326223601', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
                ].map((s, i) => (
                  <div
                    key={i}
                    onClick={() => window.open(s.href, '_blank')}
                    className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
                    style={{
                      border: `1px solid ${isDark ? '#1f2937' : '#e5e7eb'}`,
                      background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                      color: isDark ? '#9ca3af' : '#6b7280',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.color = 'var(--accent)';
                      e.currentTarget.style.boxShadow = '0 0 12px var(--accent-shadow)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = isDark ? '#1f2937' : '#e5e7eb';
                      e.currentTarget.style.color = isDark ? '#9ca3af' : '#6b7280';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {s.icon}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs"
              style={{
                background: isDark ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.8)',
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                boxShadow: '0 0 15px var(--accent-shadow)',
              }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full bg-green-500"
                style={{ animation: 'blink 1.2s ease-in-out infinite', boxShadow: '0 0 6px #22c55e' }}
              ></span>
              Available for freelance work
            </div>
          </div>

          {/* RIGHT */}
          <div
            ref={rightRef}
            className="p-6 rounded-2xl border"
            style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
              borderColor: isDark ? '#1f2937' : '#e5e7eb',
              backdropFilter: 'blur(12px)',
              boxShadow: `0 0 60px var(--accent-shadow), inset 0 0 0 1px ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
            }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <div className="text-5xl">✅</div>
                <h3 className="text-xl font-bold font-mono" style={{ color: 'var(--accent)' }}>Message Sent!</h3>
                <p className="font-mono text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Thank you for reaching out. I will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 px-6 py-2 rounded-md font-mono text-sm border-2 transition-all duration-300"
                  style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-shadow)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold font-mono mb-5">
                  <span style={{ color: 'var(--accent)' }}>{'// '}</span>
                  Send a Message
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-xs mb-1.5 block" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>NAME</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                    <div>
                      <label className="font-mono text-xs mb-1.5 block" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>EMAIL</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-xs mb-1.5 block" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>SUBJECT</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Project inquiry, collaboration..." style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <div>
                    <label className="font-mono text-xs mb-1.5 block" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>MESSAGE</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." rows={3} style={{ ...inputStyle, resize: 'none' }} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !form.name || !form.email || !form.message}
                    className="relative w-full py-3 rounded-md font-semibold font-mono overflow-hidden group border-2 transition-all duration-300"
                    style={{
                      borderColor: 'var(--accent)',
                      color: 'var(--accent)',
                      boxShadow: '0 0 12px var(--accent-shadow)',
                      opacity: (!form.name || !form.email || !form.message) ? 0.5 : 1,
                      cursor: (!form.name || !form.email || !form.message) ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={e => { if (form.name && form.email && form.message) e.currentTarget.style.boxShadow = '0 0 28px var(--accent-shadow)'; }}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 12px var(--accent-shadow)'}
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      {loading ? 'Sending...' : 'Send Message →'}
                    </span>
                    <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ background: 'var(--accent)' }}></span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;