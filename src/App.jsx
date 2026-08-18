import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimationControls } from "motion/react";
import { Lock, Unlock, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

// ─── Question Bank ────────────────────────────────────────────────────────────

const BANK = [
  // Bollywood
  { category: "Bollywood", q: "Which 1995 Bollywood film has played uninterrupted at Mumbai's Maratha Mandir cinema for over 25 years?", a: "dilwale dulhania le jayenge", alts: ["ddlj"] },
  { category: "Bollywood", q: "Who directed the 2001 Oscar-nominated Bollywood epic Lagaan?", a: "ashutosh gowariker" },
  { category: "Bollywood", q: "In which 1987 Bollywood film does the villain deliver: 'Mogambo Khush Hua'?", a: "mr india" },
  { category: "Bollywood", q: "Which actor played the titular role of Devdas in the acclaimed 2002 film?", a: "shah rukh khan", alts: ["srk"] },
  { category: "Bollywood", q: "Which actor played Maratha warrior Bajirao in Sanjay Leela Bhansali's 2015 epic?", a: "ranveer singh" },
  { category: "Bollywood", q: "In Munna Bhai M.B.B.S., what is Munna's real profession before becoming a doctor?", a: "don", alts: ["gangster", "goon", "mafia"] },
  { category: "Bollywood", q: "In 3 Idiots, what is Rancho's real name?", a: "phunsukh wangdu", alts: ["phunsukh", "wangdu"] },
  { category: "Bollywood", q: "In Yeh Jawaani Hai Deewani, what is Bunny's dream profession?", a: "traveler", alts: ["photographer", "traveller"] },
  { category: "Bollywood", q: "In Zindagi Na Milegi Dobara, which country do the friends travel through?", a: "spain" },

  // Hollywood
  { category: "Hollywood", q: "How many Academy Awards did James Cameron's Titanic (1997) win at the Oscars?", a: "11", alts: ["eleven"] },
  { category: "Hollywood", q: "Who played Tony Stark — Iron Man — across the Marvel Cinematic Universe?", a: "robert downey jr", alts: ["robert downey junior", "rdj"] },
  { category: "Hollywood", q: "In what year was Christopher Nolan's The Dark Knight released?", a: "2008" },
  { category: "Hollywood", q: "Which beloved 1939 film features the line: 'There's no place like home'?", a: "the wizard of oz", alts: ["wizard of oz"] },
  { category: "Hollywood", q: "Which director made Inception, Interstellar, and Oppenheimer?", a: "christopher nolan", alts: ["nolan"] },
  { category: "Hollywood", q: "In The Matrix, which color pill does Neo choose?", a: "red", alts: ["red pill"] },
  { category: "Hollywood", q: "In Avatar, what is the name of the blue species on Pandora?", a: "na'vi", alts: ["navi"] },

  // Music
  { category: "Music", q: "Who released Thriller in 1982 — the best-selling album in history?", a: "michael jackson", alts: ["mj"] },
  { category: "Music", q: "Which legendary band performed Bohemian Rhapsody, fronted by Freddie Mercury?", a: "queen" },
  { category: "Music", q: "Which American city is widely celebrated as the birthplace of jazz music?", a: "new orleans" },
  { category: "Music", q: "Who holds the title 'King of Rock and Roll'?", a: "elvis presley", alts: ["elvis"] },
  { category: "Music", q: "Who sang the iconic Bollywood song 'Kesariya'?", a: "arijit singh", alts: ["arijit"] },
  { category: "Music", q: "Which movie features the Oscar-winning song 'Naatu Naatu'?", a: "rrr" },

  // Riddles
  { category: "Riddles", q: "I have cities but no houses, mountains but no trees, water but no fish. What am I?", a: "a map", alts: ["map"] },
  { category: "Riddles", q: "The more you take, the more you leave behind. What am I?", a: "footsteps", alts: ["steps"] },
  { category: "Riddles", q: "What has hands but cannot clap?", a: "a clock", alts: ["clock", "watch"] },
  { category: "Riddles", q: "I'm tall when young and short when old. What am I?", a: "a candle", alts: ["candle"] },
  { category: "Riddles", q: "What has keys but opens no doors, and space but no room?", a: "a keyboard", alts: ["keyboard", "piano"] },
  { category: "Riddles", q: "What can travel around the world while staying in one corner?", a: "a stamp", alts: ["stamp", "postage stamp"] },

  // Technology
  { category: "Technology", q: "In what year did Steve Jobs unveil the very first iPhone?", a: "2007" },
  { category: "Technology", q: "Who created the Python programming language?", a: "guido van rossum", alts: ["guido", "van rossum"] },
  { category: "Technology", q: "What is the smallest single unit of digital information?", a: "bit" },
  { category: "Technology", q: "Which company acquired YouTube in 2006 for $1.65 billion?", a: "google", alts: ["alphabet"] },
  { category: "Technology", q: "What is often referred to as the 'brain' of a computer?", a: "cpu", alts: ["processor", "central processing unit"] },
  { category: "Technology", q: "What programming language was created with the motto 'Write Once, Run Anywhere'?", a: "java" },
];

const TOTAL_TIME = 30;
const MAX_ATTEMPTS = 3;

const CAT_COLOR = {
  Bollywood: "#f0826a",
  Hollywood: "#7ab4d4",
  Music: "#a98fd4",
  Riddles: "#5dbfa8",
  Technology: "#6b9fd4",
};

// ─── Utilities ────────────────────────────────────────────────────────────────

function normalize(s) {
  return String(s || "").toLowerCase().trim().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ");
}

function checkAnswer(player, q) {
  const p = normalize(player);
  if (!p) return false;
  const strip = (s) => s.replace(/^(a |an |the )/, "").trim();
  return [q.a, ...(q.alts ?? [])].map(normalize).some((c) => {
    const ps = strip(p);
    const cs = strip(c);
    return ps === cs || p === c || (ps.length >= 3 && cs.includes(ps)) || (cs.length >= 3 && ps.includes(cs));
  });
}

function pickThree() {
  const cats = ["Bollywood", "Hollywood", "Music", "Riddles", "Technology"];
  return [...cats].sort(() => Math.random() - 0.5).slice(0, 3).map((cat) => {
    const pool = BANK.filter((q) => q.category === cat);
    return pool[Math.floor(Math.random() * pool.length)];
  });
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

function fireConfetti() {
  const colors = ["#b89558", "#c4a464", "#e8d080", "#f0e8c0", "#ffffff", "#00AEEF"];
  const base = { spread: 65, startVelocity: 40, gravity: 0.85, colors };
  try {
    confetti({ ...base, particleCount: 70, angle: 60, origin: { x: 0.04, y: 0.52 } });
    confetti({ ...base, particleCount: 70, angle: 120, origin: { x: 0.96, y: 0.52 } });
    setTimeout(() => {
      confetti({ ...base, particleCount: 40, angle: 90, origin: { x: 0.5, y: 0.28 }, spread: 100 });
    }, 300);
  } catch (e) {
    console.error(e);
  }
}

// ─── OWASP Wasp Icon & Badge ──────────────────────────────────────────────────

function WaspIcon({ size = 12 }) {
  return (
    <svg width={size} height={Math.round(size * 1.5)} viewBox="0 0 14 21" fill="none">
      <ellipse cx="4.5" cy="7.5" rx="4.5" ry="2.2" fill="rgba(0,174,239,0.28)" transform="rotate(-18 4.5 7.5)" />
      <ellipse cx="9.5" cy="7.5" rx="4.5" ry="2.2" fill="rgba(0,174,239,0.28)" transform="rotate(18 9.5 7.5)" />
      <ellipse cx="7" cy="8.2" rx="2.4" ry="3.2" fill="#00AEEF" opacity="0.65" />
      <ellipse cx="7" cy="14.5" rx="2.1" ry="3.5" fill="#00AEEF" opacity="0.6" />
      <rect x="4.9" y="13" width="4.2" height="0.75" rx="0.38" fill="#80d8f8" opacity="0.5" />
      <rect x="5" y="15" width="4" height="0.75" rx="0.38" fill="#80d8f8" opacity="0.5" />
      <line x1="6.2" y1="5.3" x2="4.2" y2="2.2" stroke="#00AEEF" strokeWidth="0.7" opacity="0.7" />
      <line x1="7.8" y1="5.3" x2="9.8" y2="2.2" stroke="#00AEEF" strokeWidth="0.7" opacity="0.7" />
      <circle cx="4.1" cy="1.8" r="0.8" fill="#00AEEF" opacity="0.8" />
      <circle cx="9.9" cy="1.8" r="0.8" fill="#00AEEF" opacity="0.8" />
    </svg>
  );
}

function OWASPBadge() {
  return (
    <div className="flex items-center justify-center gap-2 pt-3 pb-6 select-none" style={{ opacity: 0.38 }}>
      <WaspIcon size={11} />
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: "#00AEEF", letterSpacing: "0.28em" }}>
        OWASP STUDENT CHAPTER · THAPAR
      </span>
    </div>
  );
}

// ─── Typography Helpers ───────────────────────────────────────────────────────

const MONO = { fontFamily: "'JetBrains Mono', monospace" };
const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" };
const BODY = { fontFamily: "'DM Sans', sans-serif" };

// ═══════════════════════════════════════════════════════════════════════════════
//  REACT BITS COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function ShinyText({
  children,
  speed = 4,
  color = "#d8d4cc",
  shimmer = "rgba(255,255,255,0.88)",
  className = "",
  style = {},
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        backgroundImage: `linear-gradient(
          110deg,
          ${color} 0%,
          ${color} 33%,
          ${shimmer} 50%,
          ${color} 67%,
          ${color} 100%
        )`,
        backgroundSize: "250% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: `shineMove ${speed}s linear infinite`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(184,149,88,0.13)",
}) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    ref.current.style.setProperty("--spot-color", spotlightColor);
  };

  return (
    <div ref={ref} className={`card-spotlight ${className}`} onMouseMove={handleMouseMove}>
      {children}
    </div>
  );
}

function BlurText({
  text = "",
  delay = 40,
  className = "",
  style = {},
}) {
  const words = String(text).split(" ");
  return (
    <span className={className} style={{ ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="blur-word"
          style={{ marginRight: "0.28em" }}
          initial={{ filter: "blur(10px)", opacity: 0, y: -18 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{
            delay: Math.min((i * delay) / 1000, 0.7),
            duration: 0.52,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function CountUp({
  to,
  from = 0,
  duration = 1.4,
  delay = 0,
}) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = Date.now();
      const ms = duration * 1000;
      const tick = () => {
        const p = Math.min((Date.now() - start) / ms, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(from + eased * (to - from)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [to, from, duration, delay]);

  return <>{val}</>;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  GAME COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function VaultDoor({
  unlocked,
  size = 220,
  dialMode = "done",
  onCrackComplete,
}) {
  const dialControls = useAnimationControls();
  const onCrackRef = useRef(onCrackComplete);
  useEffect(() => {
    onCrackRef.current = onCrackComplete;
  });

  useEffect(() => {
    dialControls.stop();
    if (dialMode === "idle") {
      dialControls.start({
        rotate: 360,
        transition: { duration: 9, repeat: Infinity, ease: "linear" },
      });
    } else if (dialMode === "cracking") {
      dialControls.start({
        rotate: [0, -40, 70, -110, 170, -35, 440, 720],
        transition: {
          duration: 1.7,
          times: [0, 0.1, 0.24, 0.4, 0.57, 0.7, 0.88, 1],
          ease: "easeInOut",
        },
      }).then(() => {
        onCrackRef.current?.();
      });
    }
    return () => {
      dialControls.stop();
    };
  }, [dialMode, dialControls]);

  const uid = useRef(`vd-${Math.random().toString(36).slice(2)}`).current;

  return (
    <motion.div
      animate={unlocked ? { rotate: -20, scale: 1.05 } : { rotate: 0, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "22% 50%" }}
    >
      <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
        <defs>
          <radialGradient id={`${uid}-outer`} cx="38%" cy="30%" r="68%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#3e3e52" />
            <stop offset="100%" stopColor="#1a1a24" />
          </radialGradient>
          <radialGradient id={`${uid}-disk`} cx="42%" cy="36%" r="65%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#2a2a3a" />
            <stop offset="100%" stopColor="#181822" />
          </radialGradient>
          <radialGradient id={`${uid}-hub`} cx="40%" cy="35%" r="70%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#282838" />
            <stop offset="100%" stopColor="#181826" />
          </radialGradient>
          <filter id={`${uid}-shadow`} x="-18%" y="-18%" width="136%" height="136%">
            <feDropShadow dx="2" dy="5" stdDeviation="10" floodColor="#00000075" />
          </filter>
        </defs>

        {unlocked && (
          <motion.circle
            cx="110"
            cy="110"
            r="107"
            fill="none"
            stroke="#b89558"
            strokeWidth="1.5"
            initial={{ opacity: 0, r: 104 }}
            animate={{ opacity: [0.5, 0.15, 0.4, 0.1], r: [104, 112, 108, 110] }}
            transition={{ duration: 1.8, times: [0, 0.4, 0.7, 1] }}
          />
        )}

        <circle cx="110" cy="110" r="104" fill={`url(#${uid}-outer)`} stroke="#323244" strokeWidth="1.5" filter={`url(#${uid}-shadow)`} />
        <circle cx="110" cy="110" r="103.2" fill="none" stroke="#484858" strokeWidth="0.4" opacity="0.5" />

        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg - 22.5) * (Math.PI / 180);
          const bx = 110 + 89 * Math.cos(rad);
          const by = 110 + 89 * Math.sin(rad);
          return (
            <motion.g
              key={i}
              animate={unlocked ? { opacity: 0.45, scale: 0.88 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.055 }}
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <circle cx={bx} cy={by} r="7.5" fill="#131319" stroke="#2e2e3e" strokeWidth="1" />
              <circle cx={bx} cy={by} r="4" fill="#0d0d13" stroke="#222232" strokeWidth="0.5" />
              <circle cx={bx} cy={by} r="1.5" fill="#343444" />
            </motion.g>
          );
        })}

        <circle cx="110" cy="110" r="76" fill={`url(#${uid}-disk)`} stroke="#2a2a3c" strokeWidth="1.5" />

        {/* Animated Combination Dial */}
        <motion.g animate={dialControls} style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
          <circle cx="110" cy="110" r="63" fill="none" stroke={unlocked ? "#5a4020" : "#202030"} strokeWidth="12" />
          <circle cx="110" cy="110" r="56.5" fill="none" stroke={unlocked ? "#6a5030" : "#303044"} strokeWidth="0.5" />
          <circle cx="110" cy="110" r="69.5" fill="none" stroke={unlocked ? "#6a5030" : "#2c2c40"} strokeWidth="0.5" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = i * 15 * (Math.PI / 180);
            const major = i % 6 === 0;
            const r1 = 58;
            const r2 = major ? 52.5 : 55.5;
            return (
              <line
                key={i}
                x1={110 + r1 * Math.cos(angle)}
                y1={110 + r1 * Math.sin(angle)}
                x2={110 + r2 * Math.cos(angle)}
                y2={110 + r2 * Math.sin(angle)}
                stroke={unlocked ? "#b89558" : "#484858"}
                strokeWidth={major ? "1.4" : "0.65"}
                opacity={unlocked ? 0.55 : 0.65}
              />
            );
          })}
          <circle cx="110" cy="47" r="2.5" fill={unlocked ? "#b89558" : "#383848"} opacity="0.9" />
        </motion.g>

        <circle cx="110" cy="110" r="46" fill="#1b1b27" stroke="#28283a" strokeWidth="1" />
        <rect x="107.5" y="79" width="5" height="62" rx="2.5" fill="#252535" stroke="#323244" strokeWidth="0.4" />
        <rect x="79" y="107.5" width="62" height="5" rx="2.5" fill="#252535" stroke="#323244" strokeWidth="0.4" />
        <rect x="108" y="79" width="1.5" height="62" rx="0.75" fill="#3a3a4e" opacity="0.6" />
        <rect x="79" y="108" width="62" height="1.5" rx="0.75" fill="#3a3a4e" opacity="0.6" />

        <circle cx="110" cy="110" r="15" fill={`url(#${uid}-hub)`} stroke={unlocked ? "#b89558" : "#28283e"} strokeWidth="1.5" />
        <motion.circle
          cx="110"
          cy="110"
          r="9"
          animate={{ fill: unlocked ? "#c4983a" : "#161622" }}
          transition={{ duration: 0.6 }}
          stroke={unlocked ? "#c4a045" : "#242434"}
          strokeWidth="1"
        />
        <motion.circle
          cx="110"
          cy="110"
          r="3.5"
          animate={{ fill: unlocked ? "#e8cc70" : "#20202e" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <path d="M 48 56 Q 66 37 94 33" stroke="#565668" strokeWidth="0.8" fill="none" opacity="0.35" strokeLinecap="round" />
        <path d="M 38 75 Q 30 88 30 105" stroke="#484858" strokeWidth="0.5" fill="none" opacity="0.2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

function LockRow({ lockIndex, unlockedCount }) {
  return (
    <div className="flex items-center justify-center">
      {[0, 1, 2].map((i) => {
        const done = i < unlockedCount;
        const active = i === lockIndex && !done;
        return (
          <div key={i} className="flex items-center">
            <motion.div
              initial={false}
              animate={{ opacity: done ? 1 : active ? 1 : 0.28 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-1.5"
              style={{ color: done ? "#b89558" : active ? "#c4a464" : "#404050" }}
            >
              <motion.div animate={active ? { opacity: [0.5, 1, 0.5] } : {}} transition={{ repeat: Infinity, duration: 1.8 }}>
                {done ? <Unlock size={17} strokeWidth={1.5} /> : <Lock size={17} strokeWidth={1.5} />}
              </motion.div>
              <span style={{ ...MONO, fontSize: "9px", letterSpacing: "0.32em", color: done ? "#b89558" : active ? "#908868" : "#383848" }}>
                0{i + 1}
              </span>
            </motion.div>
            {i < 2 && (
              <motion.div
                initial={false}
                animate={{ opacity: i < unlockedCount ? 1 : 0.2 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-px mx-3"
                style={{ backgroundColor: i < unlockedCount ? "#7a6030" : "#282838" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function AttemptDots({ remaining }) {
  return (
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{ opacity: i < remaining ? 1 : 0.1, scale: i < remaining ? 1 : 0.65 }}
          transition={{ duration: 0.35 }}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: i < remaining ? "#b89558" : "#3a3a4a" }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════

export default function App() {
  const [gameState, setGameState] = useState("landing");
  const [questions, setQuestions] = useState([]);
  const [lockIndex, setLockIndex] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [failReason, setFailReason] = useState("time");
  const [busy, setBusy] = useState(false);
  const [successPhase, setSuccessPhase] = useState("cracking");
  const [finalTime, setFinalTime] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (gameState !== "playing") return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          setFailReason("time");
          setGameState("failure");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [gameState]);

  useEffect(() => {
    if (gameState === "playing" && !busy) {
      const t = setTimeout(() => inputRef.current?.focus(), 90);
      return () => clearTimeout(t);
    }
  }, [gameState, lockIndex, busy]);

  useEffect(() => {
    if (gameState === "success") {
      setSuccessPhase("cracking");
    }
  }, [gameState]);

  const startGame = () => {
    const picked = pickThree();
    setQuestions(picked);
    setLockIndex(0);
    setUnlockedCount(0);
    setAttempts(MAX_ATTEMPTS);
    setTimeLeft(TOTAL_TIME);
    setAnswer("");
    setFeedback(null);
    setBusy(false);
    setGameState("playing");
  };

  const submit = () => {
    if (!answer.trim() || busy) return;
    const ok = checkAnswer(answer, questions[lockIndex]);
    setBusy(true);

    if (ok) {
      setFeedback("correct");
      setTimeout(() => {
        setFeedback(null);
        setAnswer("");
        setBusy(false);
        const next = unlockedCount + 1;
        setUnlockedCount(next);
        if (next >= 3) {
          setFinalTime(timeLeft);
          setGameState("success");
        } else {
          setLockIndex((l) => l + 1);
        }
      }, 900);
    } else {
      setFeedback("wrong");
      const na = attempts - 1;
      setAttempts(na);
      setTimeout(() => {
        setFeedback(null);
        setAnswer("");
        setBusy(false);
        if (na <= 0) {
          setFailReason("attempts");
          setGameState("failure");
        }
      }, 900);
    }
  };

  const handleCrackComplete = () => {
    setSuccessPhase("open");
    fireConfetti();
  };

  const timerPct = (timeLeft / TOTAL_TIME) * 100;
  const timerColor = timeLeft > 10 ? "#b89558" : timeLeft > 5 ? "#d46a30" : "#cc3838";
  const timerUrgent = timeLeft <= 5;

  return (
    <div className="min-h-screen bg-[#17171f] text-[#dddad3] overflow-x-hidden select-none" style={BODY}>
      {/* Feedback screen flash overlays */}
      <AnimatePresence>
        {feedback === "wrong" && (
          <motion.div
            key="f-wrong"
            className="fixed inset-0 pointer-events-none"
            style={{ backgroundColor: "rgba(180,28,28,0.14)", zIndex: 200 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
        {feedback === "correct" && (
          <motion.div
            key="f-correct"
            className="fixed inset-0 pointer-events-none"
            style={{ backgroundColor: "rgba(184,149,88,0.1)", zIndex: 200 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* ──────────────────── LANDING SCREEN ──────────────────── */}
        {gameState === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.975 }}
            transition={{ duration: 0.45 }}
            className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center relative"
            style={{ background: "radial-gradient(ellipse 90% 55% at 50% 0%, #1e1e2e 0%, #17171f 65%)" }}
          >
            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="mb-10"
            >
              <ShinyText
                speed={6}
                color="#484858"
                shimmer="#8a8898"
                style={{ ...MONO, fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase" }}
              >
                Cyber Vault — Security Challenge
              </ShinyText>
            </motion.div>

            {/* Vault with breathing glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.78, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-10"
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0.05, 0.18, 0.05], scale: [1.3, 1.6, 1.3] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "radial-gradient(circle, rgba(184,149,88,1) 0%, transparent 65%)" }}
              />
              <VaultDoor unlocked={false} size={220} dialMode="idle" />
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.55 }}
              className="uppercase leading-none mb-4"
              style={{ ...DISPLAY, fontSize: "clamp(2.8rem, 9vw, 4.8rem)", fontWeight: 700, letterSpacing: "0.065em" }}
            >
              <span style={{ color: "#d8d4cc" }}>The Vault Is </span>
              <ShinyText
                speed={3}
                color="#d8d4cc"
                shimmer="rgba(255,255,255,0.96)"
                style={{ ...DISPLAY, fontWeight: 700, fontSize: "inherit", letterSpacing: "inherit" }}
              >
                Locked
              </ShinyText>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.52, duration: 0.45 }}
              className="flex flex-col items-center gap-4 mb-9"
            >
              <div className="w-14 h-px" style={{ backgroundColor: "rgba(184,149,88,0.28)" }} />
              <p className="uppercase tracking-[0.28em] text-zinc-500" style={{ ...MONO, fontSize: "10px" }}>
                3 challenges&nbsp;&nbsp;·&nbsp;&nbsp;3 attempts&nbsp;&nbsp;·&nbsp;&nbsp;30 seconds
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={startGame}
              className="px-12 py-4 font-bold uppercase cursor-pointer transition-colors"
              style={{
                ...DISPLAY,
                fontSize: "1.05rem",
                letterSpacing: "0.26em",
                backgroundColor: "#b89558",
                color: "#160e04",
                boxShadow: "0 4px 20px rgba(184,149,88,0.25)",
              }}
            >
              <ShinyText speed={2.5} color="#160e04" shimmer="#7a4a00" style={{ ...DISPLAY, fontWeight: 700, fontSize: "inherit", letterSpacing: "inherit" }}>
                Begin Cracking
              </ShinyText>
            </motion.button>

            {/* Category Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2"
            >
              {["Bollywood", "Hollywood", "Music", "Riddles", "Technology"].map((cat) => (
                <span
                  key={cat}
                  className="uppercase tracking-wider"
                  style={{ ...MONO, fontSize: "9px", color: CAT_COLOR[cat], opacity: 0.5 }}
                >
                  {cat}
                </span>
              ))}
            </motion.div>

            <OWASPBadge />
          </motion.div>
        )}

        {/* ──────────────────── PLAYING SCREEN ──────────────────── */}
        {gameState === "playing" && questions.length > 0 && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="min-h-screen flex flex-col"
          >
            {/* Top Timer Bar */}
            <div className="h-[3px] relative overflow-hidden flex-shrink-0" style={{ backgroundColor: "#101018" }}>
              <motion.div
                className="absolute inset-y-0 left-0"
                animate={{ width: `${timerPct}%` }}
                transition={{ duration: 0.92, ease: "linear" }}
                style={{ backgroundColor: timerColor, transition: "background-color 0.6s" }}
              />
              {timerUrgent && (
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  style={{ backgroundColor: "#cc3838" }}
                />
              )}
            </div>

            {/* Header */}
            <header className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2.5 min-w-[80px]">
                <span className="text-zinc-600 uppercase tracking-widest" style={{ ...MONO, fontSize: "9px" }}>Time</span>
                <motion.span
                  key={`t-${timerUrgent ? "u" : "n"}`}
                  animate={timerUrgent ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                  transition={timerUrgent ? { duration: 0.55, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                  className="tabular-nums font-medium text-xl"
                  style={{ ...MONO, color: timerColor, transition: "color 0.5s", display: "inline-block" }}
                >
                  {String(timeLeft).padStart(2, "0")}
                </motion.span>
              </div>

              <span className="text-zinc-700 uppercase tracking-[0.38em]" style={{ ...MONO, fontSize: "9px" }}>Cyber Vault</span>

              <div className="flex flex-col items-end gap-1.5 min-w-[80px]">
                <span className="text-zinc-600 uppercase tracking-widest" style={{ ...MONO, fontSize: "9px" }}>Attempts</span>
                <AttemptDots remaining={attempts} />
              </div>
            </header>

            {/* Game Area */}
            <main className="flex-1 flex flex-col items-center justify-center px-5 py-10">
              <div className="w-full max-w-[580px]">
                <div className="flex justify-center mb-10">
                  <LockRow lockIndex={lockIndex} unlockedCount={unlockedCount} />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={lockIndex}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: feedback === "wrong" ? [-8, 8, -6, 6, -3, 3, 0] : 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{
                      duration: 0.28,
                      x: feedback === "wrong" ? { duration: 0.44, times: [0, 0.15, 0.3, 0.5, 0.68, 0.84, 1] } : { duration: 0.28 },
                    }}
                    className="w-full"
                  >
                    {/* SpotlightCard wraps the question panel */}
                    <SpotlightCard spotlightColor="rgba(184,149,88,0.13)" className="p-6">
                      {/* Meta Row */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-zinc-600 uppercase tracking-[0.36em]" style={{ ...MONO, fontSize: "9px" }}>
                          Lock {String(lockIndex + 1).padStart(2, "0")} / 03
                        </span>
                        <span
                          className="uppercase tracking-wider font-medium"
                          style={{ ...MONO, fontSize: "9px", color: CAT_COLOR[questions[lockIndex].category] }}
                        >
                          {questions[lockIndex].category}
                        </span>
                      </div>

                      {/* BlurText on question */}
                      <p
                        className="mb-7"
                        style={{ ...DISPLAY, fontSize: "clamp(1.5rem, 4vw, 2.05rem)", fontWeight: 500, letterSpacing: "0.01em", lineHeight: 1.28 }}
                      >
                        <BlurText text={questions[lockIndex].q} delay={38} />
                      </p>

                      <div className="h-px mb-6" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />

                      {/* Answer Input */}
                      <div className="relative mb-4">
                        <label className="block text-zinc-600 uppercase tracking-[0.36em] mb-3" style={{ ...MONO, fontSize: "9px" }}>
                          Your Answer
                        </label>
                        <input
                          ref={inputRef}
                          type="text"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && submit()}
                          disabled={busy}
                          placeholder="Enter your answer…"
                          className="w-full bg-transparent pb-2.5 pt-0.5 text-lg text-[#dddad3] placeholder:text-zinc-700 focus:outline-none border-0 border-b"
                          style={{
                            ...BODY,
                            borderColor: feedback === "correct" ? "#b89558" : feedback === "wrong" ? "#cc3838" : "rgba(255,255,255,0.1)",
                            transition: "border-color 0.22s",
                          }}
                        />
                        <AnimatePresence>
                          {feedback && (
                            <motion.p
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 tracking-wide"
                              style={{ ...MONO, fontSize: "10px", color: feedback === "correct" ? "#b89558" : "#cc3838" }}
                            >
                              {feedback === "correct" ? "✓  Correct — releasing lock" : "✗  Wrong — attempt lost"}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Submit CTA */}
                      <div className="mt-9">
                        <motion.button
                          onClick={submit}
                          disabled={!answer.trim() || busy}
                          whileHover={{ scale: !busy && answer.trim() ? 1.012 : 1 }}
                          whileTap={{ scale: !busy && answer.trim() ? 0.978 : 1 }}
                          className="w-full py-4 font-bold uppercase tracking-[0.22em] cursor-pointer disabled:cursor-not-allowed transition-colors"
                          style={{
                            ...DISPLAY,
                            fontSize: "0.95rem",
                            backgroundColor: !answer.trim() || busy ? "#1c1c28" : feedback === "correct" ? "#8a6c30" : "#7a5c22",
                            color: !answer.trim() || busy ? "#303042" : "#e4c878",
                            border: "1px solid",
                            borderColor: !answer.trim() || busy ? "#252535" : feedback === "correct" ? "#b89558" : "#604820",
                          }}
                        >
                          {answer.trim() && !busy ? (
                            <ShinyText speed={2} color="#e4c878" shimmer="#fff8e0" style={{ ...DISPLAY, fontWeight: 700, fontSize: "inherit", letterSpacing: "inherit" }}>
                              Verify Answer
                            </ShinyText>
                          ) : (
                            "Verify Answer"
                          )}
                        </motion.button>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>

            <OWASPBadge />
          </motion.div>
        )}

        {/* ──────────────────── SUCCESS SCREEN ──────────────────── */}
        {gameState === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center relative"
            style={{ background: "radial-gradient(ellipse 80% 55% at 50% 28%, #201a0c 0%, #17171f 62%)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-8"
            >
              {successPhase === "open" && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: [0, 0.22, 0.1], scale: [1.2, 1.7, 1.5] }}
                  transition={{ duration: 1.4 }}
                  style={{ background: "radial-gradient(circle, rgba(184,149,88,1) 0%, transparent 65%)" }}
                />
              )}
              {successPhase === "cracking" && (
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-full"
                  animate={{ opacity: [0.05, 0.2, 0.05], scale: [1.1, 1.35, 1.1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  style={{ background: "radial-gradient(circle, rgba(184,149,88,1) 0%, transparent 65%)" }}
                />
              )}
              <VaultDoor
                unlocked={successPhase === "open"}
                size={220}
                dialMode={successPhase === "cracking" ? "cracking" : "done"}
                onCrackComplete={handleCrackComplete}
              />
            </motion.div>

            <AnimatePresence mode="wait">
              {successPhase === "cracking" && (
                <motion.div
                  key="cracking-msg"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.65, repeat: Infinity }}
                    style={{ ...MONO, fontSize: "11px", color: "#b89558", letterSpacing: "0.4em" }}
                    className="uppercase"
                  >
                    Cracking Combination…
                  </motion.p>
                </motion.div>
              )}

              {successPhase === "open" && (
                <motion.div
                  key="success-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <p className="uppercase tracking-[0.46em] mb-3" style={{ ...MONO, fontSize: "10px", color: "#b89558" }}>
                    Access Granted
                  </p>

                  <h2
                    className="uppercase leading-none mb-5"
                    style={{ ...DISPLAY, fontSize: "clamp(2.6rem, 8vw, 4.2rem)", fontWeight: 700, letterSpacing: "0.07em" }}
                  >
                    <ShinyText speed={2.2} color="#c4a464" shimmer="#fff4cc" style={{ ...DISPLAY, fontWeight: 700, fontSize: "inherit", letterSpacing: "inherit" }}>
                      Vault Unlocked
                    </ShinyText>
                  </h2>

                  <div className="h-px w-12 mx-auto mb-5" style={{ backgroundColor: "rgba(184,149,88,0.38)" }} />
                  <p className="text-zinc-500 uppercase tracking-[0.3em] mb-1" style={{ ...MONO, fontSize: "10px" }}>
                    All 3 locks cracked
                  </p>

                  {finalTime > 0 && (
                    <p style={{ ...MONO, fontSize: "11px", color: "#8a6830" }}>
                      <CountUp from={0} to={finalTime} duration={1.2} delay={0.3} />s remaining
                    </p>
                  )}

                  <div className="mt-8 flex flex-col items-center gap-6">
                    <div className="flex gap-5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.35 }}
                        >
                          <Unlock size={19} strokeWidth={1.5} style={{ color: "#b89558" }} />
                        </motion.div>
                      ))}
                    </div>
                    <button
                      onClick={startGame}
                      className="flex items-center gap-2.5 px-10 py-3.5 font-bold uppercase tracking-[0.22em] cursor-pointer transition-colors"
                      style={{ ...DISPLAY, fontSize: "0.95rem", backgroundColor: "#b89558", color: "#160e04" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#caa960")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#b89558")}
                    >
                      <RotateCcw size={14} /> Try Another Vault
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <OWASPBadge />
          </motion.div>
        )}

        {/* ──────────────────── FAILURE SCREEN ──────────────────── */}
        {gameState === "failure" && (
          <motion.div
            key="failure"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center"
            style={{ background: "radial-gradient(ellipse 75% 50% at 50% 28%, #1c1218 0%, #17171f 62%)" }}
          >
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 0.28, x: [0, -6, 5, -4, 3, 0] }}
              transition={{ opacity: { delay: 0.1, duration: 0.8 }, x: { delay: 0.2, duration: 0.5 } }}
              className="mb-10 grayscale"
            >
              <VaultDoor unlocked={false} size={220} dialMode="done" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <p className="uppercase tracking-[0.46em] mb-3" style={{ ...MONO, fontSize: "10px", color: "#b03838" }}>
                {failReason === "time" ? "Time Expired" : "Attempts Exhausted"}
              </p>
              <h2
                className="uppercase leading-none mb-5"
                style={{ ...DISPLAY, fontSize: "clamp(2.3rem, 7vw, 3.8rem)", fontWeight: 700, letterSpacing: "0.07em", color: "#7c7870" }}
              >
                Vault Remains<br />Locked
              </h2>
              <div className="h-px w-12 mx-auto mb-5" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
              <p className="text-zinc-600 text-sm leading-relaxed max-w-[280px] mx-auto" style={BODY}>
                {failReason === "time"
                  ? "The 30-second window closed before all 3 locks were cracked."
                  : "You used all 3 attempts. The vault has sealed itself."}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78, duration: 0.4 }} className="mt-10">
              <button
                onClick={startGame}
                className="flex items-center gap-2.5 px-10 py-3.5 font-bold uppercase tracking-[0.22em] cursor-pointer transition-colors"
                style={{ ...DISPLAY, fontSize: "0.95rem", border: "1px solid rgba(255,255,255,0.1)", color: "#787080", backgroundColor: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
                  e.currentTarget.style.color = "#b0a8b8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "#787080";
                }}
              >
                <RotateCcw size={14} /> Try Another Vault
              </button>
            </motion.div>

            <OWASPBadge />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}