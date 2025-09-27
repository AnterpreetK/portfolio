import React, { useState, useEffect } from 'react';
import { User, Briefcase, Code, Terminal, FolderOpen, Folder, Mail, Coffee, Zap, Minimize, Maximize, X, Github, Globe, Cpu, Star, Home, FileText, MessageCircle, Linkedin, Twitter } from 'lucide-react';
import { projects } from './utils/projects';
import { skills } from './utils/skills';
import { fileSystem } from './utils/fileSystem';
import './styles/globals.css';
import './styles/variables.css';
import './styles/Portfolio.css';
import Clouds from './components/Clouds';

const Portfolio = () => {
  const [activeWindow, setActiveWindow] = useState('about');
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([
    'projects',
    'skills',
    'terminal',
    'explorer',
    'contact',
  ]);
  const [time, setTime] = useState(new Date());
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    '> System initialized',
    '> Portfolio v3.0 loaded',
    '> Type "help" for commands'
  ]);
  const [fileExplorerPath, setFileExplorerPath] = useState('/home/janhvi');
  type Project = {
    id: number;
    name: string;
    tech: string[];
    description: string;
    github: string;
    year: string;
    live?: string;
  };
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // REMOVE THE HARDCODED projects, skills, and fileSystem objects from here
  // They're now imported from the files above

  const handleTerminalCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = terminalInput.toLowerCase().trim();
      let response = '';
      
      switch(command) {
        case 'help':
          response = 'Commands: about | skills | projects | contact | clear | date';
          break;
        case 'about':
          response = 'Janhvi - 3rd Year CS Student | Full-Stack Developer | Tech Enthusiast';
          break;
        case 'skills':
          response = 'Primary: React, Node.js, Python | Learning: ML, Cloud Computing';
          break;
        case 'projects':
          response = `${projects.length} projects completed | Type "ls projects" for list`;
          break;
        case 'ls projects':
          response = projects.map(p => p.name).join(' | ');
          break;
        case 'contact':
          response = 'Email: janhvi@example.com | LinkedIn: /in/janhvi';
          break;
        case 'clear':
          setTerminalHistory(['> Terminal cleared']);
          setTerminalInput('');
          return;
        case 'date':
          response = new Date().toString();
          break;
        default:
          response = `Command not found: ${command}. Type "help" for commands`;
      }
      
      setTerminalHistory([...terminalHistory, `> ${terminalInput}`, response]);
      setTerminalInput('');
    }
  };

  type WindowProps = {
    id: string;
    title: string;
    children: React.ReactNode;
    icon: React.ComponentType<{ className?: string }>;
  };

  const Window = ({ id, title, children, icon: Icon }: WindowProps) => {
    if (minimizedWindows.includes(id)) return null;
    
    return (
      <div className={`absolute ${id === activeWindow ? 'z-30' : 'z-20'} 
        ${id === 'about' ? 'top-10 left-10' : ''}
        ${id === 'projects' ? 'top-20 right-10' : ''}
        ${id === 'skills' ? 'bottom-20 left-10' : ''}
        ${id === 'terminal' ? 'bottom-10 right-10' : ''}
        ${id === 'contact' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : ''}
        ${id === 'explorer' ? 'top-32 left-32' : ''}
        w-11/12 md:w-auto`}
        onClick={() => setActiveWindow(id)}>
        <div className="bg-white rounded-lg shadow-2xl border-2 border-gray-800 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-400 to-cyan-400 p-2 flex justify-between items-center cursor-move">
            <div className="flex items-center space-x-2">
              <Icon className="w-4 h-4 text-gray-800" />
              <span className="text-sm font-bold text-gray-800">{title}</span>
            </div>
            <div className="flex space-x-1">
              <button 
                onClick={() => setMinimizedWindows([...minimizedWindows, id])}
                className="w-5 h-5 bg-yellow-400 rounded-full border border-gray-700 hover:bg-yellow-500 transition-colors">
                <Minimize className="w-3 h-3 mx-auto" />
              </button>
              <button className="w-5 h-5 bg-green-400 rounded-full border border-gray-700 hover:bg-green-500 transition-colors">
                <Maximize className="w-3 h-3 mx-auto" />
              </button>
              <button
                onClick={() => setMinimizedWindows([...minimizedWindows, id])}
                className="w-5 h-5 bg-red-400 rounded-full border border-gray-700 hover:bg-red-500 transition-colors"
              >
                <X className="w-3 h-3 mx-auto" />
              </button>
            </div>
          </div>
          <div className="bg-gray-50 max-h-96 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const Desktop = () => (
    <>
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 space-y-4 z-10">
        <button 
          onClick={() => {
            setActiveWindow('about');
            setMinimizedWindows(minimizedWindows.filter(w => w !== 'about'));
          }}
          className="flex flex-col items-center p-2 hover:bg-white/30 rounded transition-colors">
          <User className="w-12 h-12 text-gray-700 mb-1" />
          <span className="text-xs text-gray-700">About Me</span>
        </button>
        <button 
          onClick={() => {
            setActiveWindow('projects');
            setMinimizedWindows(minimizedWindows.filter(w => w !== 'projects'));
          }}
          className="flex flex-col items-center p-2 hover:bg-white/30 rounded transition-colors">
          <Folder className="w-12 h-12 text-gray-700 mb-1" />
          <span className="text-xs text-gray-700">Projects</span>
        </button>
        <button 
          onClick={() => {
            setActiveWindow('skills');
            setMinimizedWindows(minimizedWindows.filter(w => w !== 'skills'));
          }}
          className="flex flex-col items-center p-2 hover:bg-white/30 rounded transition-colors">
          <Code className="w-12 h-12 text-gray-700 mb-1" />
          <span className="text-xs text-gray-700">Skills</span>
        </button>
        <button 
          onClick={() => {
            setActiveWindow('terminal');
            setMinimizedWindows(minimizedWindows.filter(w => w !== 'terminal'));
          }}
          className="flex flex-col items-center p-2 hover:bg-white/30 rounded transition-colors">
          <Terminal className="w-12 h-12 text-gray-700 mb-1" />
          <span className="text-xs text-gray-700">Terminal</span>
        </button>
        <button 
          onClick={() => {
            setActiveWindow('explorer');
            setMinimizedWindows(minimizedWindows.filter(w => w !== 'explorer'));
          }}
          className="flex flex-col items-center p-2 hover:bg-white/30 rounded transition-colors">
          <FolderOpen className="w-12 h-12 text-gray-700 mb-1" />
          <span className="text-xs text-gray-700">File Explorer</span>
        </button>
        <button 
          onClick={() => {
            setActiveWindow('contact');
            setMinimizedWindows(minimizedWindows.filter(w => w !== 'contact'));
          }}
          className="flex flex-col items-center p-2 hover:bg-white/30 rounded transition-colors">
          <Mail className="w-12 h-12 text-gray-700 mb-1" />
          <span className="text-xs text-gray-700">Contact</span>
        </button>
      </div>

      {/* Windows */}
      <Window id="about" title="ANTER'S PORTFOLIO.EXE" icon={User}>
        <div className="p-6 w-96">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Hi! Welcome to my portfolio!</h2>
              {/* <p className="text-sm text-gray-600">Digital Me v3.0</p> */}
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <p className="text-gray-700">
              I'm Anterpreet Kaur, a passionate 3rd-year Computer Science student with a deep love for creating innovative digital solutions.
            </p>
            <p className="text-gray-700">
              I specialize in full-stack web development with expertise in modern JavaScript frameworks, cloud technologies, and emerging AI/ML applications.
            </p>
            <div className="bg-cyan-50 p-3 rounded border border-cyan-200">
              <p className="text-xs text-gray-600 font-mono">
                while(alive) &#123;<br/>
                &nbsp;&nbsp;eat();<br/>
                &nbsp;&nbsp;sleep();<br/>
                &nbsp;&nbsp;code();<br/>
                &nbsp;&nbsp;repeat();<br/>
                &#125;
              </p>
            </div>
          </div>
        </div>
      </Window>

      <Window id="projects" title="PROJECT_MANAGER.APP" icon={Briefcase}>
        <div className="p-6 w-96 md:w-[500px]">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Recent Projects</h3>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} 
                className="bg-white p-3 rounded border border-gray-200 hover:border-cyan-400 transition-colors cursor-pointer"
                onClick={() => setSelectedProject(project)}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{project.name}</h4>
                  <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">{project.year}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-3 text-xs">
                  {project.github && (
                    <a className="flex items-center space-x-1 text-gray-600 hover:text-cyan-600">
                      <Github className="w-3 h-3" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.live && (
                    <a className="flex items-center space-x-1 text-gray-600 hover:text-cyan-600">
                      <Globe className="w-3 h-3" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Window>

      <Window id="skills" title="SKILLS.CONFIG" icon={Cpu}>
        <div className="p-6 w-96 md:w-[500px]">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Technical Skills</h3>
          <div className="space-y-3">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="bg-white p-3 rounded border border-gray-200">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">{category}</h4>
                <div className="flex flex-wrap gap-1">
                  {items.map((skill, i) => (
                    <span key={i} className="text-xs bg-gradient-to-r from-cyan-50 to-teal-50 text-gray-700 px-2 py-1 rounded border border-cyan-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded border border-purple-200">
            <p className="text-xs text-gray-600">
              <Star className="w-3 h-3 inline mr-1 text-yellow-500" />
              Currently learning: Rust, Kubernetes, Three.js, AI/ML
            </p>
          </div>
        </div>
      </Window>

      <Window id="terminal" title="TERMINAL.SH" icon={Terminal}>
        <div className="p-4 w-96 bg-black text-green-400 font-mono text-xs">
          <div className="h-48 overflow-y-auto mb-2">
            {terminalHistory.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <div className="flex items-center">
            <span className="mr-2">janhvi@portfolio:~$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyPress={handleTerminalCommand}
              className="flex-1 bg-transparent outline-none text-green-400"
              placeholder="type 'help'"
            />
          </div>
        </div>
      </Window>

      <Window id="explorer" title="FILE_EXPLORER.BIN" icon={FolderOpen}>
        <div className="p-4 w-96">
          <div className="flex items-center space-x-2 mb-3 text-xs bg-gray-100 p-2 rounded">
            <Home className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">{fileExplorerPath}</span>
          </div>
          <div className="space-y-1">
            {Object.entries(fileSystem['/home/anterpreet'].children).map(([name, item]) => (
              <div key={name} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer text-sm">
                {item.type === 'folder' ? (
                  <Folder className="w-4 h-4 text-yellow-600" />
                ) : (
                  <FileText className="w-4 h-4 text-gray-600" />
                )}
                <span className="text-gray-700">{name}</span>
{'size' in item && <span className="text-xs text-gray-500 ml-auto">{(item as any).size}</span>}              </div>
            ))}
          </div>
        </div>
      </Window>

      <Window id="contact" title="CONTACT_ME.MSG" icon={MessageCircle}>
        <div className="p-6 w-96">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Let's Connect!</h3>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={contactFormData.name}
              onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-cyan-400"
            />
            <input
              type="email"
              placeholder="your.email@example.com"
              value={contactFormData.email}
              onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-cyan-400"
            />
            <textarea
              placeholder="Your message..."
              rows={4}
              value={contactFormData.message}
              onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-cyan-400"
            />
            <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-2 rounded hover:from-cyan-600 hover:to-teal-600 transition-colors text-sm font-semibold">
              Send Message
            </button>
          </form>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-2">Connect with me:</p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </Window>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-gray-800 to-gray-900 border-t-2 border-gray-700 px-2 py-1 flex justify-between items-center z-40">
        <div className="flex items-center space-x-2">
          <button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-3 py-1 rounded text-xs font-bold hover:from-cyan-600 hover:to-teal-600 transition-colors">
            START
          </button>
          <div className="flex space-x-1">
            {minimizedWindows.map(w => (
              <button
                key={w}
                onClick={() => {
                  setMinimizedWindows(minimizedWindows.filter(win => win !== w));
                  setActiveWindow(w);
                }}
                className="bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 transition-colors">
                {w}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3 text-white text-xs">
          <Coffee className="w-4 h-4" />
          <span className="font-mono">{time.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Easter Egg Spotify Widget */}
      <div className="absolute bottom-16 right-4 bg-black/80 backdrop-blur text-white p-3 rounded-lg flex items-center space-x-3 z-30">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div className="text-xs">
          <p className="font-semibold">Now Playing</p>
          <p className="text-gray-300">Lofi Beats to Code To</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cyan-100 via-teal-100 to-cyan-200 overflow-hidden">
      <Clouds />
      <Desktop />
    </div>
  );
};

export default Portfolio;