import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Upload, Sparkles, FileText, CheckCircle2, AlertTriangle, XCircle,
  Search, Target, BriefcaseBusiness, Award, ArrowRight, RotateCcw,
  Download, ChevronRight, Zap, ShieldCheck, BrainCircuit, Menu, X
} from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "./styles.css";

const demoResume = `ISHANI SHARMA
Computer Science Student | React Developer

EDUCATION
B.Tech Computer Science Engineering, Lovely Professional University
CGPA: 9.6

SKILLS
C++, JavaScript, React, HTML, CSS, Git, GitHub, Data Structures, Algorithms, Cybersecurity

PROJECTS
FinTrack - Personal Finance Dashboard
Built a responsive React dashboard for income, expenses, budgets and data visualization using Recharts and LocalStorage.

Dual Solar Tracking System
Developed an ECE project that automatically adjusts a solar panel orientation toward the strongest light source.

EXPERIENCE
Cybersecurity Awareness Training
Trained students and individuals on cybersecurity fundamentals, phishing awareness and safe online practices.

ACHIEVEMENTS
Strong academic performance with consistent focus on software development and problem solving.`;

const roles = [
  {name:"Frontend Developer", keywords:["react","javascript","html","css","git","responsive","api","redux","typescript"], weight:1},
  {name:"Software Developer", keywords:["c++","java","javascript","data structures","algorithms","git","sql","api","testing"], weight:1},
  {name:"Full Stack Developer", keywords:["react","javascript","node","express","mongodb","sql","api","git","rest"], weight:1},
  {name:"Cybersecurity Intern", keywords:["cybersecurity","phishing","network","security","linux","authentication","vulnerability","owasp"], weight:1}
];

const suggestions = [
  "Add measurable impact to project bullets (for example: users, performance, time saved or accuracy).",
  "Include links to GitHub and deployed projects beside project titles.",
  "For software roles, add 2–3 concrete examples of data structures or algorithms you have implemented.",
  "Keep technical skills grouped by language, framework, tools and concepts for faster recruiter scanning."
];

function analyze(text) {
  const t=text.toLowerCase();
  const has=(word)=>t.includes(word);
  const skills=["C++","JavaScript","React","HTML","CSS","Git","GitHub","Data Structures","Algorithms","Node.js","SQL","Python","Cybersecurity","REST API","MongoDB","TypeScript"];
  const found=skills.filter(s=>has(s.toLowerCase()));
  const missing=skills.filter(s=>!has(s.toLowerCase())).slice(0,6);
  const sections={
    "Contact & Header": has("@")||has("linkedin")||has("github") ? 90:65,
    "Education": has("education")||has("university")||has("college") ? 95:55,
    "Skills": has("skills") ? 92:55,
    "Projects": has("projects")||has("project") ? 94:50,
    "Experience": has("experience")||has("intern")||has("training") ? 86:52,
    "Achievements": has("achievement")||has("certification") ? 78:50
  };
  const keywordScore=Math.min(98, Math.round(55 + found.length*3.2));
  const sectionScore=Math.round(Object.values(sections).reduce((a,b)=>a+b,0)/Object.values(sections).length);
  const impactScore=Math.min(95, Math.round(48 + (has("%")?12:0) + (has("built")?8:0) + (has("developed")?8:0) + (has("implemented")?8:0)));
  const formattingScore= text.length>700 && text.length<6500 ? 91 : 74;
  const overall=Math.round(keywordScore*.35+sectionScore*.3+impactScore*.2+formattingScore*.15);
  return {overall, found, missing, sections, keywordScore, sectionScore, impactScore, formattingScore};
}

function App(){
  const [text,setText]=useState("");
  const [job,setJob]=useState("Frontend Developer");
  const [result,setResult]=useState(null);
  const [active,setActive]=useState("Analyze");
  const [mobile,setMobile]=useState(false);
  const [fileName,setFileName]=useState("");

  const analysis=result||analyze(demoResume);
  const role=roles.find(r=>r.name===job)||roles[0];
  const jobMatch=useMemo(()=>{
    const lower=(text||demoResume).toLowerCase();
    const matched=role.keywords.filter(k=>lower.includes(k));
    return Math.round(Math.min(96, 38 + matched.length/role.keywords.length*58));
  },[text,role]);

  function run(){
    const input=text.trim()||demoResume;
    setResult(analyze(input));
    setActive("Results");
  }
  function loadDemo(){setText(demoResume);setFileName("demo-resume.txt");setResult(null);setActive("Analyze")}
  function handleFile(e){
    const file=e.target.files?.[0]; if(!file)return;
    setFileName(file.name);
    if(file.type==="text/plain"){
      const reader=new FileReader();
      reader.onload=ev=>setText(String(ev.target.result||""));
      reader.readAsText(file);
    } else {
      setText("PDF/DOCX selected: " + file.name + "\\n\\nFor this browser-only demo, paste the extracted resume text below or use the sample resume.");
    }
  }
  function exportReport(){
    const a=document.createElement("a");
    const report=`ResumeForge AI Analysis\\n\\nOverall ATS Score: ${analysis.overall}/100\\nJob Match (${job}): ${jobMatch}%\\n\\nDetected Skills: ${analysis.found.join(", ")}\\n\\nSuggested Skills: ${analysis.missing.join(", ")}\\n\\nRecommendations:\\n${suggestions.map((x,i)=>`${i+1}. ${x}`).join("\\n")}`;
    a.href=URL.createObjectURL(new Blob([report],{type:"text/plain"}));
    a.download="resumeforge-analysis.txt"; a.click();
  }

  return <div className="app">
    <header className="topbar">
      <div className="brand"><div className="logo"><BrainCircuit size={21}/></div><div><b>ResumeForge <span>AI</span></b><small>Career intelligence</small></div></div>
      <nav className="desktop-nav">{["Analyze","Results","Job Match"].map(n=><button className={active===n?"active":""} key={n} onClick={()=>setActive(n)}>{n}</button>)}</nav>
      <button className="menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
    </header>
    {mobile && <div className="mobile-nav">{["Analyze","Results","Job Match"].map(n=><button key={n} onClick={()=>{setActive(n);setMobile(false)}}>{n}</button>)}</div>}

    <main>
      <section className="hero">
        <div className="hero-copy"><div className="pill"><Sparkles size={13}/> AI-assisted resume intelligence</div>
          <h1>Make your resume<br/><em>work harder.</em></h1>
          <p>Analyze your resume against modern hiring signals, discover skill gaps, and get practical improvements before you apply.</p>
          <div className="hero-actions"><button className="primary" onClick={()=>document.getElementById("workspace").scrollIntoView({behavior:"smooth"})}>Analyze my resume <ArrowRight size={17}/></button><button className="ghost" onClick={loadDemo}>Try sample resume</button></div>
          <div className="trust"><span><ShieldCheck size={14}/> Private browser analysis</span><span><Zap size={14}/> Instant results</span></div>
        </div>
        <div className="hero-card"><div className="score-ring"><strong>87</strong><span>ATS score</span></div><div className="hero-mini"><div><b>Frontend Developer</b><span>Strong match</span></div><strong>91%</strong></div><div className="mini-bars"><i style={{width:"88%"}}/><i style={{width:"72%"}}/><i style={{width:"94%"}}/></div></div>
      </section>

      <section id="workspace" className="workspace">
        <div className="section-title"><div><span className="eyebrow">01 · RESUME INPUT</span><h2>Upload your resume</h2><p>Paste your resume text or load the included sample.</p></div><button className="reset" onClick={()=>{setText("");setFileName("");setResult(null)}}><RotateCcw size={14}/> Reset</button></div>
        <div className="input-grid">
          <div className="card upload-card">
            <label className="dropzone"><input type="file" accept=".txt,.pdf,.doc,.docx" onChange={handleFile}/><div className="upload-icon"><Upload size={22}/></div><b>{fileName||"Drop your resume here"}</b><span>{fileName?"File selected":"or click to browse · PDF, DOCX, TXT"}</span></label>
            <div className="or"><span>OR</span></div>
            <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Paste your resume text here..."/>
            <div className="input-foot"><span>{text.length} characters</span><button className="primary" onClick={run}><Sparkles size={16}/> Analyze resume</button></div>
          </div>
          <div className="card role-card"><div className="card-heading"><div className="iconbox"><Target size={18}/></div><div><h3>Target role</h3><span>Customize your analysis</span></div></div>
            <p className="muted">Choose the role you're applying for. ResumeForge compares your skills with common role requirements.</p>
            <select value={job} onChange={e=>setJob(e.target.value)}>{roles.map(r=><option key={r.name}>{r.name}</option>)}</select>
            <div className="role-preview"><span>Matching signals</span>{role.keywords.slice(0,6).map(k=><i key={k}>{k}</i>)}</div>
          </div>
        </div>
      </section>

      {(active==="Results" || result) && <section className="results">
        <div className="section-title"><div><span className="eyebrow">02 · ANALYSIS</span><h2>Resume health report</h2><p>Clear signals from your resume content.</p></div><button className="secondary" onClick={exportReport}><Download size={15}/> Export report</button></div>
        <div className="result-grid">
          <div className="card score-card"><div className="score-big"><strong>{analysis.overall}</strong><span>/ 100</span></div><div><h3>Overall ATS readiness</h3><p>{analysis.overall>=80?"Strong foundation — a few targeted improvements can make it even better.":"Good start — focus on keywords, measurable impact and section completeness."}</p></div><div className="score-line"><i style={{width:`${analysis.overall}%`}}/></div></div>
          <div className="card">
            <div className="card-heading"><div className="iconbox green"><CheckCircle2 size={18}/></div><div><h3>Detected skills</h3><span>{analysis.found.length} skills found</span></div></div>
            <div className="chips">{analysis.found.map(s=><span key={s}>{s}</span>)}</div>
            <div className="missing"><AlertTriangle size={15}/><b>Consider adding:</b><span>{analysis.missing.join(" · ")}</span></div>
          </div>
        </div>
        <div className="analysis-grid">
          <div className="card"><div className="card-heading"><div className="iconbox"><Award size={18}/></div><div><h3>Section health</h3><span>How complete each section appears</span></div></div><div className="radar"><ResponsiveContainer width="100%" height="280"><RadarChart data={Object.entries(analysis.sections).map(([subject,A])=>({subject, A}))}><PolarGrid/><PolarAngleAxis dataKey="subject" tick={{fontSize:10,fill:"#8a90a0"}}/><Radar dataKey="A" stroke="#6c5ce7" fill="#6c5ce7" fillOpacity=".18"/></RadarChart></ResponsiveContainer></div></div>
          <div className="card"><div className="card-heading"><div className="iconbox orange"><Zap size={18}/></div><div><h3>Optimization signals</h3><span>Key areas that affect your score</span></div></div><div className="signal"><span>Keyword coverage</span><b>{analysis.keywordScore}%</b><i><u style={{width:`${analysis.keywordScore}%`}}/></i></div><div className="signal"><span>Section completeness</span><b>{analysis.sectionScore}%</b><i><u style={{width:`${analysis.sectionScore}%`}}/></i></div><div className="signal"><span>Impact language</span><b>{analysis.impactScore}%</b><i><u style={{width:`${analysis.impactScore}%`}}/></i></div><div className="signal"><span>Formatting readiness</span><b>{analysis.formattingScore}%</b><i><u style={{width:`${analysis.formattingScore}%`}}/></i></div></div>
        </div>
      </section>}

      {active==="Job Match" && <section className="jobmatch">
        <div className="section-title"><div><span className="eyebrow">03 · JOB MATCH</span><h2>Role compatibility</h2><p>Compare your resume with a target role.</p></div></div>
        <div className="job-grid"><div className="card match-card"><div className="match-circle"><strong>{jobMatch}%</strong><span>match</span></div><h3>{job}</h3><p>Based on {role.keywords.length} common hiring signals for this role.</p><button className="primary" onClick={()=>{setActive("Analyze");document.getElementById("workspace").scrollIntoView({behavior:"smooth"})}}>Improve my match <ArrowRight size={16}/></button></div>
          <div className="card"><div className="card-heading"><div className="iconbox"><BriefcaseBusiness size={18}/></div><div><h3>Role signals</h3><span>Skills commonly associated with {job}</span></div></div><div className="keyword-list">{role.keywords.map(k=><div key={k}><span>{(text||demoResume).toLowerCase().includes(k)?<CheckCircle2 size={15}/>:<XCircle size={15}/>}</span>{k}<small>{(text||demoResume).toLowerCase().includes(k)?"Found":"Missing"}</small></div>)}</div></div>
        </div>
      </section>}

      <section className="recommendations">
        <div><span className="eyebrow">QUICK WINS</span><h2>Make your next application stronger.</h2></div>
        <div className="quick-grid">{suggestions.map((s,i)=><div className="quick" key={s}><span>0{i+1}</span><p>{s}</p><ChevronRight size={15}/></div>)}</div>
      </section>
    </main>
    <footer><span>ResumeForge AI</span><span>Portfolio project · Browser-based analysis · No resume data is uploaded</span></footer>
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);
