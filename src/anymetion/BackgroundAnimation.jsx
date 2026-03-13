import { useTheme } from '../context/ThemeContext';

const BackgroundAnimation = () => {
  const { isDark } = useTheme();

  return (
    <div
      className="fixed inset-0 z-[-1] overflow-hidden transition-colors duration-500"
      style={{
        background: isDark 
          ? '#050505' 
          : 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 25%, #faf7ff 50%, #f3f0ff 75%, #f8f9ff 100%)',
      }}
    >
      <style>
        {`
          @keyframes slideGrid {
            0% { transform: translateY(0); }
            100% { transform: translateY(4rem); }
          }

          @keyframes floatUp {
            0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
          }

          @keyframes shootingStar {
            0% {
              transform: translateX(0) translateY(0) rotate(135deg);
              opacity: 0;
              width: 0px;
            }
            8% {
              opacity: 1;
              width: var(--star-width);
            }
            85% {
              opacity: 0.8;
            }
            100% {
              transform: translateX(-60vw) translateY(100vh) rotate(135deg);
              opacity: 0;
              width: var(--star-width);
            }
          }

          @keyframes nebulaFloat1 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(40px, -30px) scale(1.05); }
            66% { transform: translate(-20px, 20px) scale(0.97); }
          }

          @keyframes nebulaFloat2 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(-50px, 30px) scale(1.08); }
            66% { transform: translate(30px, -20px) scale(0.95); }
          }

          @keyframes nebulaFloat3 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(20px, 40px) scale(1.06); }
          }

          @keyframes nebulaPulse {
            0%, 100% { opacity: var(--neb-min); }
            50% { opacity: var(--neb-max); }
          }
        `}
      </style>

      {/* --- Nebula Layer (Premium Light Mode) --- */}

      {/* Accent — top left */}
      <div style={{
        position: 'absolute',
        top: '-20%', left: '-15%',
        width: '70vw', height: '70vw',
        borderRadius: '50%',
        background: isDark 
          ? 'radial-gradient(circle, var(--accent) 0%, transparent 70%)'
          : 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
        opacity: isDark ? 0.15 : 0.12,
        filter: isDark ? 'blur(80px)' : 'blur(100px)',
        animation: 'nebulaFloat1 12s ease-in-out infinite, nebulaPulse 6s ease-in-out infinite',
        '--neb-min': isDark ? 0.15 : 0.10,
        '--neb-max': isDark ? 0.25 : 0.16,
        pointerEvents: 'none',
      }} />

      {/* Purple — bottom right */}
      <div style={{
        position: 'absolute',
        bottom: '-20%', right: '-15%',
        width: '65vw', height: '65vw',
        borderRadius: '50%',
        background: isDark 
          ? 'radial-gradient(circle, #a855f7 0%, transparent 70%)'
          : 'radial-gradient(circle, #d8b4fe 0%, transparent 70%)',
        opacity: isDark ? 0.13 : 0.11,
        filter: isDark ? 'blur(80px)' : 'blur(100px)',
        animation: 'nebulaFloat2 15s ease-in-out infinite, nebulaPulse 8s ease-in-out infinite 2s',
        '--neb-min': isDark ? 0.13 : 0.08,
        '--neb-max': isDark ? 0.22 : 0.14,
        pointerEvents: 'none',
      }} />

      {/* Accent — center */}
      <div style={{
        position: 'absolute',
        top: '30%', left: '40%',
        width: '40vw', height: '40vw',
        borderRadius: '50%',
        background: isDark 
          ? 'radial-gradient(circle, var(--accent) 0%, transparent 70%)'
          : 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
        opacity: isDark ? 0.07 : 0.08,
        filter: isDark ? 'blur(60px)' : 'blur(90px)',
        animation: 'nebulaFloat3 10s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Purple — top right */}
      <div style={{
        position: 'absolute',
        top: '-10%', right: '10%',
        width: '45vw', height: '45vw',
        borderRadius: '50%',
        background: isDark 
          ? 'radial-gradient(circle, #7c3aed 0%, transparent 70%)'
          : 'radial-gradient(circle, #c084fc 0%, transparent 70%)',
        opacity: isDark ? 0.1 : 0.10,
        filter: isDark ? 'blur(70px)' : 'blur(95px)',
        animation: 'nebulaFloat1 18s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />

      {/* Accent — bottom left */}
      <div style={{
        position: 'absolute',
        bottom: '5%', left: '5%',
        width: '35vw', height: '35vw',
        borderRadius: '50%',
        background: isDark 
          ? 'radial-gradient(circle, var(--accent) 0%, transparent 70%)'
          : 'radial-gradient(circle, #e0e7ff 0%, transparent 70%)',
        opacity: isDark ? 0.08 : 0.12,
        filter: isDark ? 'blur(60px)' : 'blur(85px)',
        animation: 'nebulaFloat2 14s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />

      {/* Floating Dust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              background: isDark 
                ? (Math.random() > 0.5 ? 'var(--accent)' : '#a855f7')
                : (Math.random() > 0.5 ? '#06b6d4' : '#c084fc'),
              opacity: isDark ? 0.5 : 0.35,
              boxShadow: isDark
                ? 'none'
                : `0 0 ${Math.random() * 6 + 3}px ${Math.random() > 0.5 ? 'rgba(6,182,212,0.4)' : 'rgba(192,132,252,0.4)'}`,
              animation: `floatUp ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Shooting Stars */}
      <div className="pointer-events-none">
        {[...Array(28)].map((_, i) => {
          const starWidth = Math.random() * 150 + 80;
          return (
            <div
              key={`star-${i}`}
              style={{
                position: 'fixed',
                '--star-width': `${starWidth}px`,
                background: isDark
                  ? 'linear-gradient(to left, rgba(255,255,255,0.8) 0%, rgba(180,220,255,0.4) 50%, transparent 100%)'
                  : 'linear-gradient(to left, rgba(6,182,212,0.7) 0%, rgba(6,182,212,0.2) 50%, transparent 100%)',
                filter: isDark
                  ? 'drop-shadow(0 0 2px rgba(180,220,255,0.6))'
                  : 'drop-shadow(0 0 3px rgba(6,182,212,0.5))',
                top: `${Math.random() * -10}vh`,
                left: `${Math.random() * 160}vw`,
                width: 'var(--star-width)',
                height: `${Math.random() * 1.5 + 0.5}px`,
                borderRadius: '999px',
                zIndex: -1,
                animation: `shootingStar ${Math.random() * 3 + 2}s linear infinite`,
                animationDelay: `${Math.random() * 6}s`,
                opacity: 0,
              }}
            ></div>
          );
        })}
      </div>

      {/* Moving Grid */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: isDark ? 0.06 : 0.04 }}
      >
        <div
          className="absolute w-[100%] h-[150%] top-[-25%]"
          style={{
            backgroundImage: isDark
              ? `linear-gradient(to right, #555 1px, transparent 1px), linear-gradient(to bottom, #555 1px, transparent 1px)`
              : `linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem',
            animation: 'slideGrid 2.5s linear infinite',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)'
          }}
        ></div>
      </div>

    </div>
  );
};

export default BackgroundAnimation;