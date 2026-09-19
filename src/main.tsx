import React, { Suspense, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Sparkles } from '@react-three/drei';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail, Menu, Phone, X } from 'lucide-react';
import './styles.css';

const resumeUrl = '/assets/Anurag_Chaudhary_Resume.pdf';
const photoUrl = '/assets/anurag-profile.png';

const navItems = [
  ['HOME', 'home'], ['ABOUT', 'about'], ['EXPERIENCE', 'experience'], ['PROJECTS', 'projects'],
  ['SKILLS', 'skills'], ['EDUCATION', 'education'], ['CONTACT', 'contact']
] as const;

function Scene() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.pointer.x * 0.08;
    group.current.rotation.x = -state.pointer.y * 0.04;
  });
  return (
    <group ref={group}>
      <ambientLight intensity={1.3} />
      <directionalLight position={[3, 3, 5]} intensity={2} />
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.7}>
        <mesh position={[2.6, 0.6, -1.2]} rotation={[0.5, 0.4, 0.2]}>
          <icosahedronGeometry args={[1.15, 1]} />
          <MeshDistortMaterial color="#8aa6ff" roughness={0.16} metalness={0.82} distort={0.18} speed={1.4} transparent opacity={0.55} />
        </mesh>
      </Float>
      <Float speed={0.7} rotationIntensity={0.18} floatIntensity={0.45}>
        <mesh position={[-3, -1.6, -2]} rotation={[0.2, 0.7, 0.3]}>
          <torusKnotGeometry args={[0.62, 0.08, 128, 24]} />
          <meshStandardMaterial color="#d4d9e8" emissive="#252c42" emissiveIntensity={0.5} metalness={0.95} roughness={0.22} />
        </mesh>
      </Float>
      <Sparkles count={90} scale={[12, 8, 8]} size={1.2} speed={0.25} opacity={0.45} />
    </group>
  );
}

function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.section id={id} className={`section ${className}`} initial={reduce ? false : { opacity: 0, y: 35 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
      {children}
    </motion.section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const reduce = useReducedMotion();

  const go = (id: string) => {
    setActive(id); setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className="site-shell">
      <div className="noise" aria-hidden="true" />
      <header className="nav-wrap">
        <nav className="nav glass" aria-label="Primary navigation">
          <button className="brand" onClick={() => go('home')} aria-label="Go to home"><span>AC</span><strong>Anurag</strong></button>
          <div className="nav-links">
            {navItems.map(([label, id]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}>{label}</button>)}
          </div>
          <button className="menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation">{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
        </nav>
        <AnimatePresence>
          {menuOpen && <motion.div className="mobile-menu glass" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}>
            {navItems.map(([label,id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
          </motion.div>}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-canvas" aria-hidden="true"><Canvas camera={{ position: [0, 0, 8], fov: 46 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}><Suspense fallback={null}><Scene/><OrbitControls enableZoom={false} enablePan={false} enableRotate={false}/></Suspense></Canvas></div>
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <motion.div className="eyebrow" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.1}}>DIPLOMA IN COMPUTER SCIENCE & ENGINEERING</motion.div>
            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.18}}><span>Anurag</span><br/>Chaudhary<span className="dot">.</span></motion.h1>
            <motion.p className="hero-copy" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.28}}>Motivated and hardworking Computer Science & Engineering diploma graduate with a strong interest in technology and a willingness to learn.</motion.p>
            <motion.div className="hero-actions" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.38}}>
              <button className="btn btn-primary" onClick={() => go('projects')}>View My Work <ArrowDown size={17}/></button>
              <a className="btn btn-ghost" href={resumeUrl} download>Download Resume <Download size={17}/></a>
            </motion.div>
            <motion.div className="hero-meta" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.6}}><span>BASTI, UTTAR PRADESH</span><span>OPEN TO ENTRY-LEVEL OPPORTUNITIES</span></motion.div>
          </div>
          <motion.div className="portrait-card" initial={{opacity:0,scale:.94,x:30}} animate={{opacity:1,scale:1,x:0}} transition={{duration:.8,delay:.2}}>
            <div className="portrait-glow" />
            <img src={photoUrl} alt="Professional portrait of Anurag Chaudhary" />
            <div className="portrait-label"><span>01</span><span>PROFILE</span></div>
          </motion.div>
        </section>

        <Section id="about" className="split-section">
          <div className="section-head"><span>01 / ABOUT</span><h2>Built to learn.<br/><em>Ready to contribute.</em></h2></div>
          <div className="about-grid">
            <div className="about-lead"><p>Seeking an entry-level opportunity where I can apply academic knowledge, build practical experience, work collaboratively, and contribute to organizational goals.</p><div className="line"/><span>CAREER FOCUS</span><p className="small">Computer science, IT support, software/technical operations, and other technology-oriented roles aligned with my education and skills.</p></div>
            <div className="card-stack">
              {['Self-motivated, hardworking and disciplined','Quick learner with a positive attitude toward new challenges','Willingness to develop practical and professional skills','Team-oriented approach focused on completing assigned work responsibly'].map((x,i)=><motion.div className="info-card glass" key={x} whileHover={{y:-5, rotateX:1, rotateY:i%2?1:-1}}><span>0{i+1}</span><p>{x}</p></motion.div>)}
            </div>
          </div>
        </Section>

        <Section id="experience">
          <div className="section-head"><span>02 / EXPERIENCE</span><h2>Starting the<br/><em>professional journey.</em></h2></div>
          <div className="timeline"><div className="timeline-line"/><div className="timeline-item glass"><div className="timeline-dot"/><div className="timeline-date">CURRENT / FRESHER</div><h3>Fresher</h3><p>Open to entry-level opportunities and practical learning.</p><span className="tag">ENTRY-LEVEL</span></div></div>
        </Section>

        <Section id="projects">
          <div className="section-head"><span>03 / PROJECTS</span><h2>A portfolio with<br/><em>room to grow.</em></h2></div>
          <div className="empty-feature glass"><div className="orb-placeholder"/><div><span className="mini-label">PROJECTS</span><h3>No projects listed in the supplied resume.</h3><p>This section is intentionally kept free of invented work. Add projects to the resume and this showcase can be populated with real project names, descriptions, technologies and links.</p></div></div>
        </Section>

        <Section id="skills">
          <div className="section-head"><span>04 / SKILLS</span><h2>Strengths &<br/><em>language.</em></h2></div>
          <div className="skills-grid">
            <div className="skill-card glass"><span>PROFESSIONAL STRENGTHS</span>{['Self-motivated','Hardworking','Disciplined','Quick learner','Positive attitude','Team-oriented'].map(s=><div className="skill-pill" key={s}>{s}</div>)}</div>
            <div className="skill-card glass"><span>LANGUAGES</span><div className="language-row"><b>Hindi</b><i/><b>English</b></div><p>No technical skill levels or percentages are stated in the resume.</p></div>
          </div>
        </Section>

        <Section id="education">
          <div className="section-head"><span>05 / EDUCATION</span><h2>The academic<br/><em>foundation.</em></h2></div>
          <div className="education-list">
            {[['2025','Diploma in Computer Science & Engineering','Shri Ramswaroop Memorial University, Lucknow','65%'],['2021','Intermediate','UP Board','65%'],['2019','High School','UP Board','72%']].map(([year,degree,inst,score],i)=><motion.div className="edu-row" key={year} whileHover={{x:8}}><span className="edu-year">{year}</span><div><h3>{degree}</h3><p>{inst}</p></div><strong>{score}</strong><span className="edu-index">0{i+1}</span></motion.div>)}
          </div>
        </Section>

        <Section id="contact" className="contact-section">
          <div className="contact-glow"/>
          <div className="section-head"><span>06 / CONTACT</span><h2>Let's build<br/><em>something meaningful.</em></h2></div>
          <div className="contact-grid">
            <div><p className="contact-intro">I am seeking an entry-level opportunity in computer science, IT support, software/technical operations, or another technology-oriented role aligned with my education and skills.</p><a className="email-link" href="mailto:anurag808129@gmail.com">anurag808129@gmail.com <ArrowUpRight size={19}/></a></div>
            <div className="contact-details"><a href="tel:8081291566"><Phone size={17}/>8081291566</a><a href="mailto:anurag808129@gmail.com"><Mail size={17}/>Email me</a><div><span>LOCATION</span><p>Basti, Uttar Pradesh, India</p></div><div><span>LANGUAGES</span><p>Hindi • English</p></div></div>
          </div>
          <div className="footer-bar"><span>© {new Date().getFullYear()} ANURAG CHAUDHARY</span><a href={resumeUrl} download>DOWNLOAD RESUME <Download size={14}/></a></div>
        </Section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
