const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#050505] overflow-hidden">
      
      <style>{`
        @keyframes slideGrid {
          0% { transform: translateY(0); }
          100% { transform: translateY(4rem); }
        }
        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.3; }
          100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
        }
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0) rotate(-45deg);
            opacity: 0;
            width: 0px;
          }
          5% { opacity: 1; width: var(--sw); }
          20% { opacity: 0.8; }
          100% {
            transform: translateX(-900px) translateY(900px) rotate(-45deg);
            opacity: 0;
            width: var(--sw);
          }
        }
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 0.06; }
          50% { transform: scale(1.15); opacity: 0.1; }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      {/* Cyan orb - top left */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '600px', height: '600px',
          top: '-150px', left: '-150px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
          animation: 'orbPulse 7s ease-in-out infinite',
        }}
      />

      {/* Purple orb - bottom right */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '700px', height: '700px',
          bottom: '-200px', right: '-200px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
          animation: 'orbPulse 9s ease-in-out infinite 2s',
        }}
      />

      {/* Moving grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.12 }}>
        <div
          className="absolute w-full h-[150%] top-[-25%]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #2a2a2a 1px, transparent 1px),
              linear-gradient(to bottom, #2a2a2a 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            animation: 'slideGrid 3s linear infinite',
            maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, #000 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, #000 30%, transparent 100%)',
          }}
        />
      </div>

      {/* Floating dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(24)].map((_, i) => {
          const size = Math.random() * 2.5 + 1;
          const cyan = Math.random() > 0.5;
          return (
            <div
              key={`dust-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                background: cyan ? 'rgba(6,182,212,0.7)' : 'rgba(168,85,247,0.5)',
                boxShadow: cyan ? '0 0 4px rgba(6,182,212,0.8)' : '0 0 4px rgba(168,85,247,0.6)',
                animation: `floatUp ${Math.random() * 12 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          );
        })}
      </div>

      {/* Shooting stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => {
          const sw = Math.random() * 140 + 70;
          return (
            <div
              key={`star-${i}`}
              className="absolute"
              style={{
                '--sw': `${sw}px`,
                background: 'linear-gradient(-45deg, rgba(255,255,255,0.9) 0%, rgba(6,182,212,0.3) 40%, transparent 100%)',
                filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.6))',
                top: `${Math.random() * 60 - 20}vh`,
                left: `${Math.random() * 100 + 10}%`,
                width: `${sw}px`,
                height: `${Math.random() * 1.5 + 1}px`,
                borderRadius: '999px',
                animation: `shootingStar ${Math.random() * 2 + 1.5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 25}s`,
                opacity: 0,
              }}
            />
          );
        })}
      </div>

      {/* Scan line */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          height: '2px',
          background: 'linear-gradient(to right, transparent, rgba(6,182,212,0.15), transparent)',
          animation: 'scanLine 8s linear infinite',
          animationDelay: '3s',
        }}
      />

    </div>
  );
};

export default BackgroundAnimation;