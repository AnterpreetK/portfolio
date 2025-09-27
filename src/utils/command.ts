import { useState } from 'react';
import { projects } from './projects';

export const useCommands = () => {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    '> System initialized',
    '> Portfolio v3.0 loaded',
    '> Type "help" for commands'
  ]);

  const handleTerminalCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const command = terminalInput.toLowerCase().trim();
      let response = '';
      
      switch(command) {
        case 'help':
          response = 'Commands: about | skills | projects | contact | clear | date';
          break;
        case 'about':
          response = 'Anterpreet - 3rd Year CS Student | Full-Stack Developer | Tech Enthusiast';
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
          response = 'Email: kanterpreet09@example.com | LinkedIn: /in/anterpreet09';
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
      
      setTerminalHistory(prev => [...prev, `> ${terminalInput}`, response]);
      setTerminalInput('');
    }
  };

  return {
    terminalInput,
    setTerminalInput,
    terminalHistory,
    handleTerminalCommand
  };
};
