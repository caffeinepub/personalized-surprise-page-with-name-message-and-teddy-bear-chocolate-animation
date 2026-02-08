import { useEffect, useState, useRef } from 'react';

interface TeddyChocolateAnimationProps {
  soundArmed?: boolean;
  isMuted?: boolean;
}

export default function TeddyChocolateAnimation({ soundArmed = false, isMuted = false }: TeddyChocolateAnimationProps) {
  const [phase, setPhase] = useState<'idle' | 'anticipation' | 'bite' | 'chew' | 'satisfied'>('idle');
  const [mouthOpen, setMouthOpen] = useState(false);
  const [showSpeedLines, setShowSpeedLines] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showCrumbs, setShowCrumbs] = useState(false);
  const [showBiteImpact, setShowBiteImpact] = useState(false);
  const [showChewLines, setShowChewLines] = useState(false);
  const [blinkEyes, setBlinkEyes] = useState(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const audioContextRef = useRef<{ bite: HTMLAudioElement | null; chew: HTMLAudioElement | null }>({
    bite: null,
    chew: null,
  });
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Preload audio files
  useEffect(() => {
    if (!prefersReducedMotion) {
      const biteAudio = new Audio('/assets/audio/teddy-bite.mp3');
      const chewAudio = new Audio('/assets/audio/teddy-chew.mp3');
      
      biteAudio.preload = 'auto';
      chewAudio.preload = 'auto';
      
      audioContextRef.current.bite = biteAudio;
      audioContextRef.current.chew = chewAudio;
    }

    return () => {
      // Cleanup audio
      if (audioContextRef.current.bite) {
        audioContextRef.current.bite.pause();
        audioContextRef.current.bite = null;
      }
      if (audioContextRef.current.chew) {
        audioContextRef.current.chew.pause();
        audioContextRef.current.chew = null;
      }
    };
  }, [prefersReducedMotion]);

  // Play sound helper
  const playSound = (type: 'bite' | 'chew') => {
    if (prefersReducedMotion || !soundArmed || isMuted) return;
    
    const audio = audioContextRef.current[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => {
        console.log('Audio play prevented:', err);
      });
    }
  };

  useEffect(() => {
    // Clear any existing timers
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];

    if (prefersReducedMotion) {
      // Minimal animation for reduced motion
      const t1 = setTimeout(() => setPhase('satisfied'), 500);
      timersRef.current.push(t1);
      return;
    }

    // Anime-style multi-phase sequence with enhanced details
    const sequence = [
      // Start animation
      { delay: 100, action: () => setPhase('anticipation') },
      
      // Anticipation phase - eyes widen, lean back slightly
      { delay: 600, action: () => setBlinkEyes(true) },
      { delay: 750, action: () => setBlinkEyes(false) },
      
      // Bite phase - speed lines appear, mouth opens, BITE SOUND
      { delay: 1200, action: () => {
        setPhase('bite');
        setShowSpeedLines(true);
        setMouthOpen(true);
        playSound('bite');
      }},
      
      // Impact moment - bite impact overlay, sparkles
      { delay: 1350, action: () => setShowBiteImpact(true) },
      { delay: 1400, action: () => setShowSparkles(true) },
      { delay: 1600, action: () => setShowCrumbs(true) },
      { delay: 1700, action: () => setShowBiteImpact(false) },
      { delay: 1800, action: () => setShowSpeedLines(false) },
      
      // Chew phase - mouth open/close cycle with CHEW SOUNDS and motion lines
      { delay: 2000, action: () => {
        setPhase('chew');
        setMouthOpen(false);
      }},
      { delay: 2300, action: () => {
        setMouthOpen(true);
        setShowChewLines(true);
        playSound('chew');
      }},
      { delay: 2500, action: () => setShowChewLines(false) },
      { delay: 2600, action: () => setMouthOpen(false) },
      { delay: 2900, action: () => {
        setMouthOpen(true);
        setShowChewLines(true);
        playSound('chew');
      }},
      { delay: 3100, action: () => setShowChewLines(false) },
      { delay: 3200, action: () => setMouthOpen(false) },
      { delay: 3500, action: () => {
        setMouthOpen(true);
        setShowChewLines(true);
        playSound('chew');
      }},
      { delay: 3700, action: () => setShowChewLines(false) },
      { delay: 3800, action: () => setMouthOpen(false) },
      
      // Satisfied phase - sparkle eyes, content expression
      { delay: 4200, action: () => {
        setPhase('satisfied');
        setShowSparkles(true);
        setBlinkEyes(true);
      }},
      { delay: 4400, action: () => setBlinkEyes(false) },
      { delay: 4800, action: () => setShowSparkles(false) },
      { delay: 5200, action: () => setShowCrumbs(false) },
    ];

    sequence.forEach(({ delay, action }) => {
      const timer = setTimeout(action, delay);
      timersRef.current.push(timer);
    });

    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
    };
  }, [prefersReducedMotion, soundArmed, isMuted]);

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[350px] md:h-[450px] flex items-center justify-center">
      {/* Speed lines overlay */}
      {showSpeedLines && (
        <div className="anime-speed-lines">
          <img
            src="/assets/generated/anime-speed-lines.dim_1024x1024.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Bite impact overlay */}
      {showBiteImpact && (
        <div className="anime-bite-impact">
          <img
            src="/assets/generated/anime-bite-impact.dim_512x512.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Chew motion lines overlay */}
      {showChewLines && (
        <div className="anime-chew-lines">
          <img
            src="/assets/generated/anime-chew-lines.dim_512x512.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Teddy Bear with anime styling */}
      <div className={`teddy-container anime-phase-${phase} ${blinkEyes ? 'blink' : ''}`}>
        <img
          src="/assets/generated/teddy-anime.dim_1024x1024.png"
          alt="Cute teddy bear"
          className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl teddy-base"
        />
        
        {/* Mouth overlay - swap between open/closed */}
        {phase !== 'idle' && (
          <img
            src={mouthOpen 
              ? "/assets/generated/teddy-mouth-open.dim_1024x1024.png"
              : "/assets/generated/teddy-mouth-closed.dim_1024x1024.png"
            }
            alt=""
            className="w-64 h-64 md:w-80 md:h-80 object-contain absolute inset-0 teddy-mouth"
          />
        )}
      </div>

      {/* Chocolate Bar */}
      <div className={`chocolate-container anime-phase-${phase}`}>
        <img
          src="/assets/generated/chocolate-bar.dim_512x512.png"
          alt="Chocolate bar"
          className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-xl"
        />
      </div>

      {/* Sparkle overlay */}
      {showSparkles && (
        <div className="anime-sparkles">
          <img
            src="/assets/generated/anime-sparkle-overlay.dim_512x512.png"
            alt=""
            className="w-48 h-48 md:w-64 md:h-64 object-contain"
          />
        </div>
      )}

      {/* Chocolate crumbs */}
      {showCrumbs && (
        <div className="anime-crumbs">
          <img
            src="/assets/generated/chocolate-crumbs.dim_512x512.png"
            alt=""
            className="w-40 h-40 md:w-48 md:h-48 object-contain"
          />
        </div>
      )}

      {/* Floating hearts decoration */}
      <div className="hearts-decoration">
        <div className="heart-float heart-1">❤️</div>
        <div className="heart-float heart-2">💕</div>
        <div className="heart-float heart-3">💖</div>
        <div className="heart-float heart-4">💗</div>
        <div className="heart-float heart-5">❤️</div>
      </div>
    </div>
  );
}
