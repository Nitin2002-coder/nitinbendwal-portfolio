import { Award, Briefcase, Code, Download, Mail, MousePointerClick, Shield, TrendingUp, Zap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const codeSnippets = [
  "import { MernStackDeveloper } from 'Nitin.dev';",
  "",
  "const developer = new MernStackDeveloper({",
  "  name: 'Nitin Bendwal',",
  "  stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],",
  "  focus: 'Building scalable web applications',",
  "  status: 'Open to new opportunities'",
  "});",
  "",
  "await developer.launchPortfolio();",
  "// Featured: E-commerce, SaaS, Enterprise, Startup MVPs",
  "",
  "developer.connect();",
  "console.log('Let us build something exceptional together!');"
];

const codeSnippet = codeSnippets.join("\n");

const getTerminalLineColor = (line) => {
  if (/\b(error|failed|exception)\b/i.test(line)) {
    return "#ff6b6b";
  }

  if (/^\s*(import|from)\b/.test(line) || /['"].*['"]/.test(line)) {
    return "#7aa2ff";
  }

  if (/^\s*(await|developer\.|console\.|const)\b/.test(line)) {
    return "#00ff9d";
  }

  return "#e6edf3";
};

const renderTerminalText = (text) =>
  text.split("\n").map((line, index, lines) => (
    <span key={`${line}-${index}`} style={{ color: getTerminalLineColor(line) }}>
      {line}
      {index < lines.length - 1 ? "\n" : ""}
    </span>
  ));

const typingRoles = [
  "MERN Stack Developer",
  "Problem Solver",
  "Tech Enthusiast",
  "Software Engineer",
  "AI/ML Enthusiast",
  "Code Explorer"
];

export const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeletingRole, setIsDeletingRole] = useState(false);

  const achievements = [
    { number: "MERN", label: "Stack", icon: <Shield className="h-3 w-3" /> },
    { number: "5+", label: "Projects", icon: <TrendingUp className="h-3 w-3" /> },
    { number: "DSA", label: "Problem Solving", icon: <Award className="h-3 w-3" /> },
    { number: "Open", label: "to Software Engineering Roles", icon: <Zap className="h-3 w-3" /> }
  ];

  useEffect(() => {
    const text = codeSnippet;
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index));
      index += 1;

      if (index > text.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const role = typingRoles[currentRole];
    const isRoleComplete = displayedRole === role;
    const isRoleEmpty = displayedRole === "";
    const delay = isRoleComplete && !isDeletingRole ? 1500 : isDeletingRole ? 45 : 85;

    const timer = setTimeout(() => {
      if (!isDeletingRole && displayedRole.length < role.length) {
        setDisplayedRole(role.slice(0, displayedRole.length + 1));
        return;
      }

      if (!isDeletingRole && isRoleComplete) {
        setIsDeletingRole(true);
        return;
      }

      if (isDeletingRole && !isRoleEmpty) {
        setDisplayedRole(role.slice(0, displayedRole.length - 1));
        return;
      }

      setIsDeletingRole(false);
      setCurrentRole((prev) => (prev + 1) % typingRoles.length);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentRole, displayedRole, isDeletingRole]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
      ref={ref}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/35 to-primary/10" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        </div>

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg"
            style={{
              width: Math.random() * 60 + 20 + "px",
              height: Math.random() * 60 + 20 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              rotate: Math.random() * 360
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 60],
              x: [0, (Math.random() - 0.5) * 40],
              opacity: [0.1, 0.25, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}

        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-primary/10 to-purple-600/10 blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-400/10 to-emerald-500/10 blur-[100px]"
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container max-w-[1280px] mx-auto w-full mt-16 sm:mt-0 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.5 } }
          }}
        >
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 space-y-5">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm"
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}
            >
              <Briefcase className="h-4 w-4" /> Open to Software Engineering Roles
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight max-w-[700px]"
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}
            >
              <span className="block text-foreground">I&apos;m Nitin</span>
              <motion.span
                className="hero-role-text flex items-center justify-center lg:justify-start min-h-[1.2em] w-full min-w-[18ch] whitespace-nowrap bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ backgroundSize: "200% 100%" }}
              >
                {displayedRole}
                <motion.span
                  aria-hidden="true"
                  className="ml-1 inline-block text-primary"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  |
                </motion.span>
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground leading-8 max-w-[650px]"
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}
            >
              Building modern and responsive web applications using React, Node.js, and MongoDB.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}
            >
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="text-center p-5 min-h-[115px] rounded-2xl bg-background/60 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 flex flex-col justify-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {achievement.icon}
                    <div className="text-2xl font-bold text-foreground">{achievement.number}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{achievement.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}
            >
              <motion.a
                href="#projects"
                className="group relative overflow-hidden h-12 px-6 rounded-2xl font-semibold bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code className="h-5 w-5" />
                <span>View Projects</span>
                <TrendingUp className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                className="group relative overflow-hidden h-12 px-6 rounded-2xl font-semibold border border-primary/50 text-foreground hover:border-primary transition-all duration-300 bg-background/80 backdrop-blur-sm text-sm flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="h-4 w-4" />
                <span>Resume</span>
              </motion.a>

              <motion.a
                href="mailto:nitinbendwal030@gmail.com"
                className="group relative overflow-hidden h-12 px-6 rounded-2xl font-semibold border border-border text-muted-foreground hover:border-primary/30 transition-all duration-300 bg-background/60 backdrop-blur-sm text-sm flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-4 w-4" />
                <span>Contact Me</span>
              </motion.a>
            </motion.div>

            <motion.div
              className="mt-6 text-center lg:text-left"
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}
            >
              <div className="text-sm text-muted-foreground">
                <span className="text-primary font-semibold">Actively Learning</span> MERN Stack Development & DSA
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-terminal-shell flex-1 flex justify-center items-center w-full mt-[-20px] overflow-visible pr-5 max-lg:pr-0"
            variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}
          >
            <div className="hero-terminal-card relative w-full max-w-[520px] min-h-[560px] flex-shrink-0 scale-[0.90] lg:scale-[0.92] xl:scale-[0.95] translate-x-[120px] overflow-visible">
              <motion.div
                className="w-full min-h-[560px] group transition-all duration-500 overflow-hidden flex flex-col p-5"
                style={{
                  borderRadius: "24px",
                  background: "rgba(15,15,20,0.92)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.35)"
                }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="flex items-center gap-4 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full shadow-sm" style={{ background: "#ff5f56" }} />
                    <div className="h-3 w-3 rounded-full shadow-sm" style={{ background: "#ffbd2e" }} />
                    <div className="h-3 w-3 rounded-full shadow-sm" style={{ background: "#27c93f" }} />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-sm font-mono font-semibold text-muted-foreground">portfolio.js</div>
                  </div>
                  <div className="w-4 h-4 bg-green-400/20 rounded-full animate-pulse" />
                </div>

                <div
                  className="text-[12px] leading-5 flex-1 rounded-[18px] overflow-hidden flex flex-col justify-start items-start"
                  style={{
                    height: "auto",
                    minHeight: "420px",
                    background: "rgba(10,10,15,0.96)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    fontFamily: "'Fira Code', monospace",
                    fontWeight: 500,
                    letterSpacing: "0.3px",
                    caretColor: "#00ff9d"
                  }}
                >
                  <div className="p-5 w-full h-full m-0 whitespace-pre-wrap break-words overflow-auto">
                    <pre className="m-0 whitespace-pre-wrap break-words [overflow-wrap:break-word] font-[inherit] text-[12px] leading-5 text-[#e6edf3]">{renderTerminalText(displayText)}<motion.span
                      aria-hidden="true"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1 text-[#00ff9d] inline-block align-middle"
                    >
                      |
                    </motion.span></pre>
                  </div>
                </div>

                <motion.div
                  className="absolute -bottom-3 -right-3 w-14 h-14 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center border-2 border-background shadow-2xl scale-[0.92]"
                  animate={{ y: [0, -5, 0], rotate: [0, -2, 0], scale: [1, 1.03, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Code className="h-5 w-5 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -top-3 -left-3 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-border shadow-lg flex items-center gap-2 scale-[0.92]"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.5, type: "spring" }}
                >
                  <Award className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-semibold text-foreground">Solutions</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-border shadow-lg text-center scale-[0.92]"
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 2, type: "spring" }}
                >
                  <div className="text-xs font-mono text-muted-foreground">Built with</div>
                  <div className="text-sm font-bold text-foreground">Modern Tech</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 1, 0], y: [0, 6, 0, -6] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
      >
        <motion.div
          className="text-xs text-primary mb-3 flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <MousePointerClick className="h-3 w-3" />
          <span>Explore Technical Portfolio</span>
        </motion.div>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border-2 border-primary/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
