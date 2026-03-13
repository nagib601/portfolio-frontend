import { Link } from 'react-router-dom';
import { useTheme, accentColors } from '../context/ThemeContext';
import { useState } from 'react';
import Logo from '../logo/Logo.jsx';

const Header = () => {
  const { isDark, setIsDark, accent, setAccent } = useTheme();
  const [colorOpen, setColorOpen] = useState(false);

  return (
    <div className={`flex items-center border-b px-8 py-0 h-[60px] transition-colors duration-300 ${
      isDark
        ? 'bg-[#0a0a0a] border-gray-800 text-white'
        : 'bg-white border-gray-200 text-gray-900'
    }`}>

      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-30 ml-5">
          <Logo />
        </Link>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Nav + Online Status */}
      <ul className="flex items-center font-mono text-sm gap-2">
        
        {/* Home Link */}
        {/* Online Status Badge - Next to Home */}
        <li className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors duration-300 ${
          isDark
            ? 'bg-gray-900 border-gray-800 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
            : 'bg-cyan-50 border-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
        }`}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5`}
              style={{
                background: isDark ? '#22c55e' : '#06b6d4',
                boxShadow: isDark ? '0 0 8px #22c55e' : '0 0 8px rgba(6,182,212,0.6)'
              }}
            ></span>
          </span>
          <span className="text-xs font-mono"
            style={{ color: isDark ? '#4ade80' : '#0891b2' }}
          >
            Online & Ready
          </span>
        </li>
        <li><Link to="/" className="px-3 py-1 transition-colors hover:text-[var(--accent)]">Home</Link></li>
        
        

        {/* Other Navigation Links */}
        <li><Link to="/about" className="px-3 py-1 transition-colors hover:text-[var(--accent)]">About</Link></li>
        <li><Link to="/projects" className="px-3 py-1 transition-colors hover:text-[var(--accent)]">Projects</Link></li>
        <li><Link to="/contact" className="px-3 py-1 transition-colors hover:text-[var(--accent)]">Contact</Link></li>
      </ul>

      {/* Dark/Light Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ml-4 ${
          isDark
            ? 'bg-gray-900 border-gray-700 hover:border-[var(--accent)] text-yellow-300'
            : 'bg-gray-100 border-gray-300 hover:border-[var(--accent)] text-gray-700'
        }`}
        title={isDark ? 'Light Mode' : 'Dark Mode'}
      >
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.354a.75.75 0 0 1 .75.75V7a.75.75 0 0 1-1.5 0V5.104a.75.75 0 0 1 .75-.75ZM12 17a.75.75 0 0 1 .75.75V19a.75.75 0 0 1-1.5 0v-1.25A.75.75 0 0 1 12 17ZM19 12a.75.75 0 0 1-.75.75H17a.75.75 0 0 1 0-1.5h1.25A.75.75 0 0 1 19 12ZM7 12a.75.75 0 0 1-.75.75H5a.75.75 0 0 1 0-1.5h1.25A.75.75 0 0 1 7 12ZM16.95 7.05a.75.75 0 0 1 0 1.06l-.884.884a.75.75 0 1 1-1.06-1.06l.883-.884a.75.75 0 0 1 1.06 0ZM8.994 15.006a.75.75 0 0 1 0 1.06l-.884.884a.75.75 0 1 1-1.06-1.06l.883-.884a.75.75 0 0 1 1.06 0ZM16.95 16.95a.75.75 0 0 1-1.06 0l-.884-.883a.75.75 0 1 1 1.06-1.06l.884.883a.75.75 0 0 1 0 1.06ZM8.994 8.994a.75.75 0 0 1-1.06 0l-.884-.883a.75.75 0 0 1 1.06-1.06l.884.883a.75.75 0 0 1 0 1.06ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1Z"/>
          </svg>
        )}
      </button>

      {/* Theme Color Button */}
      <div className="relative">
        <button
          onClick={() => setColorOpen(!colorOpen)}
          className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ml-2 ${
            isDark
              ? 'bg-gray-900 border-gray-700 hover:border-[var(--accent)]'
              : 'bg-gray-100 border-gray-300 hover:border-[var(--accent)]'
          }`}
          title="Theme Color"
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ background: `var(--accent)`, boxShadow: `0 0 8px var(--accent-shadow)` }}
          />
        </button>

        {colorOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setColorOpen(false)} />
            <div className={`absolute right-0 top-12 z-50 rounded-2xl border p-4 shadow-2xl w-52 ${
              isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <p className="font-mono text-xs mb-3" style={{ color: 'var(--accent)' }}>ACCENT COLOR</p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(accentColors).map(([key, color]) => (
                  <button
                    key={key}
                    onClick={() => { setAccent(key); setColorOpen(false); }}
                    className="w-8 h-8 rounded-full transition-all duration-200 hover:scale-110"
                    style={{
                      background: color.value,
                      boxShadow: accent === key
                        ? `0 0 0 3px ${isDark ? '#0f0f0f' : '#fff'}, 0 0 0 5px ${color.value}`
                        : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default Header;